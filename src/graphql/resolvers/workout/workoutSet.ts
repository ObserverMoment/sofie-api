import {
  checkUserOwnsObject,
  checkAndReorderObjects,
  AccessScopeError,
  reorderItemsForInsertDelete,
} from '../../utils'
import {
  MutationCreateWorkoutSetArgs,
  MutationCreateWorkoutSetGeneratorArgs,
  MutationCreateWorkoutSetIntervalBuyInArgs,
  MutationDeleteWorkoutSetByIdArgs,
  MutationDeleteWorkoutSetGeneratorByIdArgs,
  MutationDeleteWorkoutSetIntervalBuyInByIdArgs,
  MutationDuplicateWorkoutSetByIdArgs,
  MutationReorderWorkoutSetsArgs,
  MutationUpdateWorkoutSetArgs,
  MutationUpdateWorkoutSetGeneratorArgs,
  MutationUpdateWorkoutSetIntervalBuyInArgs,
  SortPositionUpdated,
  WorkoutSet,
  WorkoutSetGenerator,
  WorkoutSetIntervalBuyIn,
} from '../../../generated/graphql'
import { Context } from '../../..'
import { ApolloError } from 'apollo-server-express'
import { Prisma, PrismaPromise } from '@prisma/client'

export const createWorkoutSet = async (
  r: any,
  { data }: MutationCreateWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.WorkoutSection.id,
    'workoutSection',
    authedUserId,
    prisma,
  )

  // Reorder other sets.
  await reorderItemsForInsertDelete({
    reorderType: 'insert',
    sortPosition: data.sortPosition,
    parentId: data.WorkoutSection.id,
    parentType: 'workoutSection',
    objectType: 'workoutSet',
    prisma: prisma,
  })

  // NOTE: Ideally this would be part of the above transaction so full rollback could occur in event of an error.
  const workoutSet = await prisma.workoutSet.create({
    data: {
      ...data,
      rounds: data.rounds || undefined,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSection: {
        connect: { id: data.WorkoutSection.id },
      },
    },
    select,
  })

  if (workoutSet) {
    return workoutSet as WorkoutSet
  } else {
    throw new ApolloError('createWorkoutSet: There was an issue.')
  }
}

export const duplicateWorkoutSetById = async (
  r: any,
  { id }: MutationDuplicateWorkoutSetByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Get original workout full data
  const original = await prisma.workoutSet.findFirst({
    where: { id, User: { id: authedUserId } },
    include: {
      WorkoutSection: {
        select: { id: true },
      },
      WorkoutMoves: {
        include: {
          Move: {
            select: { id: true },
          },
          Equipment: {
            select: { id: true },
          },
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError(
      'duplicateWorkoutSetById: Could not retrieve data for this workout.',
    )
  }

  // Reorder other sets.
  await reorderItemsForInsertDelete({
    reorderType: 'insert',
    sortPosition: original.sortPosition + 1,
    parentId: original.WorkoutSection.id,
    parentType: 'workoutSection',
    objectType: 'workoutSet',
    prisma: prisma,
  })

  // Create a new copy.
  const copy = await prisma.workoutSet.create({
    data: {
      rounds: original.rounds,
      sortPosition: original.sortPosition + 1,
      WorkoutSection: { connect: { id: original.WorkoutSection.id } },
      User: {
        connect: { id: authedUserId },
      },
      WorkoutMoves: {
        create: original.WorkoutMoves.map((wm) => ({
          reps: wm.reps,
          repType: wm.repType,
          distanceUnit: wm.distanceUnit || undefined,
          loadUnit: wm.loadUnit || undefined,
          loadAmount: wm.loadAmount || undefined,
          timeUnit: wm.timeUnit || undefined,
          sortPosition: wm.sortPosition,
          Equipment: wm.Equipment
            ? { connect: { id: wm.Equipment.id } }
            : undefined,
          Move: { connect: { id: wm.Move.id } },
          User: { connect: { id: authedUserId } },
        })),
      },
    },
    select,
  })

  if (copy) {
    return copy as WorkoutSet
  } else {
    throw new ApolloError('duplicateWorkoutSetById: There was an issue.')
  }
}

export const updateWorkoutSet = async (
  r: any,
  { data }: MutationUpdateWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutSet', authedUserId, prisma)
  const updated = await prisma.workoutSet.update({
    where: { id: data.id },
    data: {
      ...data,
      rounds: data.rounds || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutSet
  } else {
    throw new ApolloError('updateWorkoutSet: There was an issue.')
  }
}

export const deleteWorkoutSetById = async (
  r: any,
  { id }: MutationDeleteWorkoutSetByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // Get the IntervalBuyIn so that you can delete the corresponding WorkoutMove if it exists.
  // Cannot nested delete more than one level...awaiting Prisma to implement / release cascading deletes feature.
  const workoutSetForDeletion = await prisma.workoutSet.findUnique({
    where: { id },
    select: {
      userId: true,
      sortPosition: true,
      workoutSectionId: true,
      IntervalBuyIn: {
        select: {
          id: true,
          workoutMoveId: true,
        },
      },
    },
  })

  if (!workoutSetForDeletion) {
    throw new ApolloError(
      'deleteWorkoutSetById: Could not find this set for deletion.',
    )
  } else if (workoutSetForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const deleteIntervalWorkoutMove = workoutSetForDeletion.IntervalBuyIn
      ? prisma.workoutMove.delete({
          where: { id: workoutSetForDeletion.IntervalBuyIn.workoutMoveId },
        })
      : null
    const deleteIntervalBuyIn = workoutSetForDeletion.IntervalBuyIn
      ? prisma.workoutSetIntervalBuyIn.delete({
          where: { id: workoutSetForDeletion.IntervalBuyIn.id },
        })
      : null

    const deleteOtherChildren = prisma.workoutSet.update({
      where: { id },
      data: {
        Generators: { deleteMany: {} },
        WorkoutMoves: { deleteMany: {} },
      },
    })

    const deleteSet = prisma.workoutSet.delete({
      where: { id },
      select: { id: true },
    })

    const ops = [
      deleteIntervalWorkoutMove,
      deleteIntervalBuyIn,
      deleteOtherChildren,
      deleteSet,
    ].filter((x) => !!x) as PrismaPromise<any>[]

    const res = await prisma.$transaction(ops)
    const deletedSet = res[res.length - 1]

    if (deletedSet) {
      // Reorder remaining sets.
      await reorderItemsForInsertDelete({
        reorderType: 'delete',
        sortPosition: workoutSetForDeletion.sortPosition,
        parentId: workoutSetForDeletion.workoutSectionId,
        parentType: 'workoutSection',
        objectType: 'workoutSet',
        prisma: prisma,
      })

      return deletedSet.id
    } else {
      throw new ApolloError('deleteWorkoutSetById: There was an issue.')
    }
  }
}

export const createWorkoutSetIntervalBuyIn = async (
  r: any,
  { data }: MutationCreateWorkoutSetIntervalBuyInArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.WorkoutSet.id,
    'workoutSet',
    authedUserId,
    prisma,
  )

  const buyIn = await prisma.workoutSetIntervalBuyIn.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSet: {
        connect: { id: data.WorkoutSet.id },
      },
      WorkoutMove: {
        create: {
          ...data.WorkoutMove,
          distanceUnit: data.WorkoutMove.distanceUnit || undefined,
          loadUnit: data.WorkoutMove.loadUnit || undefined,
          timeUnit: data.WorkoutMove.timeUnit || undefined,
          User: {
            connect: { id: authedUserId },
          },
          WorkoutSet: {
            connect: { id: data.WorkoutSet.id },
          },
          Move: {
            connect: { id: data.WorkoutMove.Move.id },
          },
          Equipment: {
            connect: { id: data.WorkoutMove.Equipment?.id || undefined },
          },
        },
      },
    },
    select,
  })

  if (buyIn) {
    return buyIn as WorkoutSetIntervalBuyIn
  } else {
    throw new ApolloError('createWorkoutSetIntervalBuyIn: There was an issue.')
  }
}

export const updateWorkoutSetIntervalBuyIn = async (
  r: any,
  { data }: MutationUpdateWorkoutSetIntervalBuyInArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'workoutSetIntervalBuyIn',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutSetIntervalBuyIn.update({
    where: { id: data.id },
    data: {
      ...data,
      interval: data.interval || undefined,
      WorkoutMove: data.WorkoutMove
        ? {
            update: {
              ...data.WorkoutMove,
              distanceUnit: data.WorkoutMove.distanceUnit || undefined,
              loadUnit: data.WorkoutMove.loadUnit || undefined,
              loadAmount: data.WorkoutMove.loadAmount || undefined,
              timeUnit: data.WorkoutMove.timeUnit || undefined,
              repType: data.WorkoutMove.repType || undefined,
              reps: data.WorkoutMove.reps || undefined,
              Move: {
                connect: { id: data.WorkoutMove.Move?.id || undefined },
              },
              Equipment: {
                connect: { id: data.WorkoutMove.Equipment?.id || undefined },
              },
            },
          }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutSetIntervalBuyIn
  } else {
    throw new ApolloError('updateWorkoutSetIntervalBuyIn: There was an issue.')
  }
}

export const deleteWorkoutSetIntervalBuyInById = async (
  r: any,
  { id }: MutationDeleteWorkoutSetIntervalBuyInByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  const intervalBuyInForDeletion = await prisma.workoutSetIntervalBuyIn.findUnique(
    {
      where: { id },
      select: {
        userId: true,
        workoutMoveId: true,
      },
    },
  )

  if (!intervalBuyInForDeletion) {
    throw new ApolloError(
      'deleteWorkoutSetIntervalBuyInById: Could not find this set for deletion.',
    )
  } else if (intervalBuyInForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const ops = [
      prisma.workoutMove.delete({
        where: { id: intervalBuyInForDeletion.workoutMoveId },
      }),
      prisma.workoutSetIntervalBuyIn.delete({ where: { id } }),
    ]

    const [_, deletedBuyIn] = await prisma.$transaction(ops)

    if (deletedBuyIn) {
      return deletedBuyIn.id
    } else {
      throw new ApolloError(
        'deleteWorkoutSetIntervalBuyInById: There was an issue.',
      )
    }
  }
}

export const createWorkoutSetGenerator = async (
  r: any,
  { data }: MutationCreateWorkoutSetGeneratorArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.WorkoutSet.id,
    'workoutSet',
    authedUserId,
    prisma,
  )

  const workoutSetGenerator = await prisma.workoutSetGenerator.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSet: {
        connect: { id: data.WorkoutSet.id },
      },
    },
    select,
  })

  if (workoutSetGenerator) {
    return workoutSetGenerator as WorkoutSetGenerator
  } else {
    throw new ApolloError('createWorkoutSetGenerator: There was an issue.')
  }
}

export const updateWorkoutSetGenerator = async (
  r: any,
  { data }: MutationUpdateWorkoutSetGeneratorArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'workoutSetGenerator',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutSetGenerator.update({
    where: { id: data.id },
    data: {
      ...data,
      type: data.type || undefined,
      workoutMoveIndex: data.workoutMoveIndex || undefined,
      target: data.target || undefined,
      roundFrequency: data.roundFrequency || undefined,
      adjustAmount: data.adjustAmount || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutSetGenerator
  } else {
    throw new ApolloError('updateWorkoutSetGenerator: There was an issue.')
  }
}

export const deleteWorkoutSetGeneratorById = async (
  r: any,
  { id }: MutationDeleteWorkoutSetGeneratorByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutSetGenerator', authedUserId, prisma)

  const deleted = await prisma.workoutSetGenerator.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutSetGeneratorById: There was an issue.')
  }
}

export const reorderWorkoutSets = async (
  r: any,
  { data }: MutationReorderWorkoutSetsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: WorkoutSet[] = await checkAndReorderObjects<WorkoutSet>(
    data,
    'workoutSet',
    authedUserId,
    prisma,
    select,
  )

  if (updated) {
    return updated.map((u) => ({
      id: u.id,
      sortPosition: u.sortPosition,
    })) as SortPositionUpdated[]
  } else {
    throw new ApolloError('reorderWorkoutSets: There was an issue.')
  }
}

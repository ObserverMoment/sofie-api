import {
  checkUserOwnsObject,
  checkAndReorderObjects,
  AccessScopeError,
  reorderItemsForInsertDelete,
} from '../../utils'
import {
  MutationCreateWorkoutSetArgs,
  MutationCreateWorkoutSetWithWorkoutMovesArgs,
  MutationDeleteWorkoutSetByIdArgs,
  MutationDuplicateWorkoutSetByIdArgs,
  MutationReorderWorkoutSetsArgs,
  MutationUpdateWorkoutSetArgs,
  SortPositionUpdated,
  WorkoutSet,
} from '../../../generated/graphql'
import { Context } from '../../..'
import { ApolloError } from 'apollo-server-express'
import { PrismaPromise } from '@prisma/client'
import { updateWorkoutMetaData } from './utils'

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
      duration: data.duration || undefined,
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

export const createWorkoutSetWithWorkoutMoves = async (
  r: any,
  { data }: MutationCreateWorkoutSetWithWorkoutMovesArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.workoutSet.WorkoutSection.id,
    'workoutSection',
    authedUserId,
    prisma,
  )

  // Reorder other sets.
  await reorderItemsForInsertDelete({
    reorderType: 'insert',
    sortPosition: data.workoutSet.sortPosition,
    parentId: data.workoutSet.WorkoutSection.id,
    parentType: 'workoutSection',
    objectType: 'workoutSet',
    prisma: prisma,
  })

  // NOTE: Ideally this would be part of the above transaction so full rollback could occur in event of an error.
  const workoutSet = await prisma.workoutSet.create({
    data: {
      ...data.workoutSet,
      duration: data.workoutSet.duration || undefined,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSection: {
        connect: { id: data.workoutSet.WorkoutSection.id },
      },
      WorkoutMoves: {
        create: data.workoutMoves.map((wm) => ({
          reps: wm.reps,
          repType: wm.repType,
          distanceUnit: wm.distanceUnit || undefined,
          loadUnit: wm.loadUnit || undefined,
          loadAmount: wm.loadAmount,
          timeUnit: wm.timeUnit || undefined,
          sortPosition: wm.sortPosition,
          User: {
            connect: { id: authedUserId },
          },
          Equipment: wm.Equipment ? { connect: wm.Equipment } : undefined,
          Move: { connect: wm.Move },
        })),
      },
    },
    select,
  })

  if (workoutSet) {
    return workoutSet as WorkoutSet
  } else {
    throw new ApolloError(
      'createWorkoutSetWithWorkoutMoves: There was an issue.',
    )
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
      sortPosition: original.sortPosition + 1,
      duration: original.duration,
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
      duration: data.duration || undefined,
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
      /// Need the workoutId to be able to call the update workout meta data json method.
      WorkoutSection: { select: { workoutId: true } },
    },
  })

  if (!workoutSetForDeletion) {
    throw new ApolloError(
      'deleteWorkoutSetById: Could not find this set for deletion.',
    )
  } else if (workoutSetForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const deleteOtherChildren = prisma.workoutSet.update({
      where: { id },
      data: {
        WorkoutMoves: { deleteMany: {} },
      },
    })

    const deleteSet = prisma.workoutSet.delete({
      where: { id },
      select: { id: true },
    })

    const ops = [deleteOtherChildren, deleteSet].filter(
      (x) => !!x,
    ) as PrismaPromise<any>[]

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

      await updateWorkoutMetaData(
        prisma,
        workoutSetForDeletion.WorkoutSection.workoutId,
      )

      return deletedSet.id
    } else {
      throw new ApolloError('deleteWorkoutSetById: There was an issue.')
    }
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

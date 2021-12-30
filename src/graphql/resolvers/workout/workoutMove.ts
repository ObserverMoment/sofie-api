import { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutMoveArgs,
  MutationDeleteWorkoutMoveByIdArgs,
  MutationDuplicateWorkoutMoveByIdArgs,
  MutationReorderWorkoutMovesArgs,
  MutationUpdateWorkoutMoveArgs,
  MutationUpdateWorkoutMovesArgs,
  SortPositionUpdated,
  WorkoutMove,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  checkAndReorderObjects,
  reorderItemsForInsertDelete,
  checkUserAccessScopeMulti,
} from '../../utils'
import {
  updateWorkoutMetaData,
  updateWorkoutMetaDataFromWorkoutMove,
} from './utils'

export const createWorkoutMove = async (
  r: any,
  { data }: MutationCreateWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.WorkoutSet.id,
    'workoutSet',
    authedUserId,
    prisma,
  )

  // Reorder other workoutmoves if necessary.
  await reorderItemsForInsertDelete({
    reorderType: 'insert',
    sortPosition: data.sortPosition,
    parentId: data.WorkoutSet.id,
    parentType: 'workoutSet',
    objectType: 'workoutMove',
    prisma: prisma,
  })

  // Create the new workout move.
  // NOTE: Ideally this would be part of the above transaction so full rollback could occur in event of an error.
  const workoutMove = await prisma.workoutMove.create({
    data: {
      reps: data.reps,
      repType: data.repType,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      // Necessary extra check because 0 is falsey in js.
      loadAmount: data.loadAmount !== null ? data.loadAmount : undefined,
      timeUnit: data.timeUnit || undefined,
      sortPosition: data.sortPosition,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSet: {
        connect: data.WorkoutSet,
      },
      Move: { connect: data.Move },
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
    },
    select,
  })

  if (workoutMove) {
    await updateWorkoutMetaDataFromWorkoutMove(
      prisma,
      (workoutMove as WorkoutMove).id,
    )
    return workoutMove as WorkoutMove
  } else {
    throw new ApolloError('createWorkoutMove: There was an issue.')
  }
}

export const duplicateWorkoutMoveById = async (
  r: any,
  { id }: MutationDuplicateWorkoutMoveByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Get original workout full data
  const original = await prisma.workoutMove.findFirst({
    where: { id, User: { id: authedUserId } },
    include: {
      WorkoutSet: {
        select: { id: true },
      },
      Move: {
        select: { id: true },
      },
      Equipment: { select: { id: true } },
    },
  })

  if (!original) {
    throw new ApolloError(
      'duplicateWorkoutMoveById: Could not retrieve data for this workout.',
    )
  }

  // Reorder other workoutmoves if necessary.
  await reorderItemsForInsertDelete({
    reorderType: 'insert',
    sortPosition: original.sortPosition + 1,
    parentId: original.WorkoutSet.id,
    parentType: 'workoutSet',
    objectType: 'workoutMove',
    prisma: prisma,
  })

  // Create a new copy.
  const copy = await prisma.workoutMove.create({
    data: {
      reps: original.reps,
      repType: original.repType,
      distanceUnit: original.distanceUnit,
      loadUnit: original.loadUnit,
      // necessary extra check because
      loadAmount: original.loadAmount,
      timeUnit: original.timeUnit,
      sortPosition: original.sortPosition + 1,
      WorkoutSet: { connect: { id: original.WorkoutSet.id } },
      User: {
        connect: { id: authedUserId },
      },
      Equipment: original.Equipment
        ? { connect: { id: original.Equipment.id } }
        : undefined,
      Move: { connect: { id: original.Move.id } },
    } as Prisma.WorkoutMoveCreateInput,
    select,
  })

  if (copy) {
    return copy as WorkoutMove
  } else {
    throw new ApolloError('duplicateWorkoutMoveById: There was an issue.')
  }
}

export const updateWorkoutMove = async (
  r: any,
  { data }: MutationUpdateWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutMove', authedUserId, prisma)

  const updated = await prisma.workoutMove.update({
    where: { id: data.id },
    data: {
      ...data,
      repType: data.repType || undefined,
      reps: data.reps || undefined,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      timeUnit: data.timeUnit || undefined,
      // Necessary extra check because 0 is falsey in js.
      loadAmount: data.loadAmount !== null ? data.loadAmount : undefined,
      Move: data.Move ? { connect: data.Move } : undefined,
      // Equipment can be null - i.e no equipment, so it can only be ignored if not present in the data object.
      // passing null should disconnect any connected Equipment.
      Equipment: data.hasOwnProperty('Equipment')
        ? data.Equipment
          ? { connect: data.Equipment }
          : { disconnect: true }
        : undefined,
    },
    select,
  })

  if (updated) {
    /// If the move has been changed then the meta data needs to be re-generated.
    if (data.Move) {
      await updateWorkoutMetaDataFromWorkoutMove(
        prisma,
        (updated as WorkoutMove).id,
      )
    }
    return updated as WorkoutMove
  } else {
    throw new ApolloError('updateWorkoutMove: There was an issue.')
  }
}

/// Same as updateWorkoutMove but updates an array of workoutMoves.
export const updateWorkoutMoves = async (
  r: any,
  { data }: MutationUpdateWorkoutMovesArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const ids = data.map((wm) => wm.id)
  await checkUserAccessScopeMulti(ids, 'workoutMove', authedUserId, prisma)

  const updateOps = data.map((d) =>
    prisma.workoutMove.update({
      where: { id: d.id },
      data: {
        ...d,
        repType: d.repType || undefined,
        reps: d.reps || undefined,
        distanceUnit: d.distanceUnit || undefined,
        loadUnit: d.loadUnit || undefined,
        timeUnit: d.timeUnit || undefined,
        // Necessary extra check because 0 is falsey in js.
        loadAmount: d.loadAmount !== null ? d.loadAmount : undefined,
        Move: d.Move ? { connect: d.Move } : undefined,
        // Equipment can be null - i.e no equipment, so it can only be ignored if not present in the data object.
        // passing null should disconnect any connected Equipment.
        Equipment: d.hasOwnProperty('Equipment')
          ? d.Equipment
            ? { connect: d.Equipment }
            : { disconnect: true }
          : undefined,
      },
      select,
    }),
  )

  const allUpdated = await prisma.$transaction(updateOps)

  if (allUpdated) {
    /// If any move has been changed then the workout meta data needs to be re-generated.
    if (data.some((d) => d.Move)) {
      await updateWorkoutMetaDataFromWorkoutMove(
        prisma,
        (allUpdated[0] as WorkoutMove).id,
      )
    }
    return allUpdated as WorkoutMove[]
  } else {
    throw new ApolloError('updateWorkoutMoves: There was an issue.')
  }
}

export const deleteWorkoutMoveById = async (
  r: any,
  { id }: MutationDeleteWorkoutMoveByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutMove', authedUserId, prisma)

  const deleted = await prisma.workoutMove.delete({
    where: { id },
    select: {
      id: true,
      sortPosition: true,
      workoutSetId: true,
      /// Need the workoutId to be able to call the update workout meta data json method.
      WorkoutSet: {
        select: {
          WorkoutSection: { select: { workoutId: true } },
        },
      },
    },
  })

  if (deleted) {
    // Reorder remaining workoutmoves.
    await reorderItemsForInsertDelete({
      reorderType: 'delete',
      sortPosition: deleted.sortPosition,
      parentId: deleted.workoutSetId,
      parentType: 'workoutSet',
      objectType: 'workoutMove',
      prisma: prisma,
    })

    await updateWorkoutMetaData(
      prisma,
      deleted.WorkoutSet.WorkoutSection.workoutId,
    )

    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutMoveById: There was an issue.')
  }
}

export const reorderWorkoutMoves = async (
  r: any,
  { data }: MutationReorderWorkoutMovesArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: WorkoutMove[] = await checkAndReorderObjects<WorkoutMove>(
    data,
    'workoutMove',
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
    throw new ApolloError('reorderWorkoutMoves: There was an issue.')
  }
}

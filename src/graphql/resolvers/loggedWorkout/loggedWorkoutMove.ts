import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  LoggedWorkoutMove,
  MutationCreateLoggedWorkoutMoveArgs,
  MutationDeleteLoggedWorkoutMoveByIdArgs,
  MutationReorderLoggedWorkoutMovesArgs,
  MutationUpdateLoggedWorkoutMoveArgs,
} from '../../../generated/graphql'
import {
  checkAndReorderObjects,
  checkUserOwnsObject,
  reorderItemsForInsertDelete,
} from '../../utils'

export const createLoggedWorkoutMove = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.LoggedWorkoutSet.id,
    'loggedWorkoutSet',
    authedUserId,
    prisma,
  )

  const loggedWorkoutmove = await prisma.loggedWorkoutMove.create({
    data: {
      ...data,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      timeUnit: data.timeUnit || undefined,
      User: { connect: { id: authedUserId } },
      Move: {
        connect: data.Move,
      },
      Equipment: data.Equipment
        ? {
            connect: data.Equipment,
          }
        : undefined,
      LoggedWorkoutSet: {
        connect: data.LoggedWorkoutSet,
      },
    },
    select,
  })

  if (loggedWorkoutmove) {
    return loggedWorkoutmove as LoggedWorkoutMove
  } else {
    throw new ApolloError('createLoggedWorkoutMove: There was an issue.')
  }
}

export const updateLoggedWorkoutMove = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'loggedWorkoutMove', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutMove.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      timeUnit: data.timeUnit || undefined,
      reps: data.reps || undefined,
      Move: data.Move
        ? {
            connect: data.Move,
          }
        : undefined,
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
    return updated as LoggedWorkoutMove
  } else {
    throw new ApolloError('updateLoggedWorkoutMove: There was an issue.')
  }
}

export const deleteLoggedWorkoutMoveById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutMoveByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'loggedWorkoutMove', authedUserId, prisma)
  const deleted = await prisma.loggedWorkoutMove.delete({
    where: { id },
    select: { id: true, sortPosition: true, loggedWorkoutSetId: true },
  })

  if (deleted) {
    // Reorder remaining loggedWorkoutMoves.
    await reorderItemsForInsertDelete({
      reorderType: 'delete',
      sortPosition: deleted.sortPosition,
      parentId: deleted.loggedWorkoutSetId,
      parentType: 'loggedWorkoutSet',
      objectType: 'loggedWorkoutMove',
      prisma: prisma,
    })

    return deleted.id
  } else {
    throw new ApolloError('deleteLoggedWorkoutMoveById: There was an issue.')
  }
}

export const reorderLoggedWorkoutMoves = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutMovesArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: LoggedWorkoutMove[] =
    await checkAndReorderObjects<LoggedWorkoutMove>(
      data,
      'loggedWorkoutMove',
      authedUserId,
      prisma,
      select,
    )

  if (updated) {
    return updated
  } else {
    throw new ApolloError('reorderLoggedWorkoutMoves: There was an issue.')
  }
}

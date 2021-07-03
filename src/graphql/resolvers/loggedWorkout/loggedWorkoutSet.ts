import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  LoggedWorkoutSet,
  MutationCreateLoggedWorkoutSetArgs,
  MutationDeleteLoggedWorkoutSetByIdArgs,
  MutationReorderLoggedWorkoutSetsArgs,
  MutationUpdateLoggedWorkoutSetArgs,
} from '../../../generated/graphql'
import {
  AccessScopeError,
  checkAndReorderObjects,
  checkUserOwnsObject,
  reorderItemsForInsertDelete,
} from '../../utils'

export const createLoggedWorkoutSet = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.LoggedWorkoutSection.id,
    'loggedWorkoutSection',
    authedUserId,
    prisma,
  )

  const loggedWorkoutSet = await prisma.loggedWorkoutSet.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      LoggedWorkoutSection: {
        connect: data.LoggedWorkoutSection,
      },
    },
    select,
  })

  if (loggedWorkoutSet) {
    return loggedWorkoutSet as LoggedWorkoutSet
  } else {
    throw new ApolloError('createLoggedWorkoutSet: There was an issue.')
  }
}

export const updateLoggedWorkoutSet = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'loggedWorkoutSet', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutSet.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      roundsCompleted: data.roundsCompleted || undefined,
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutSet
  } else {
    throw new ApolloError('updateLoggedWorkoutSet: There was an issue.')
  }
}

//// Deletes the loggedWorkoutSet and its loggedWorkoutMoves
export const deleteLoggedWorkoutSetById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutSetByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  const loggedWorkoutSetForDeletion = await prisma.loggedWorkoutSet.findUnique({
    where: { id },
    select: {
      userId: true,
      sortPosition: true,
      loggedWorkoutSectionId: true,
    },
  })

  if (!loggedWorkoutSetForDeletion) {
    throw new ApolloError(
      'deleteLoggedWorkoutSetById: Could not find this set for deletion.',
    )
  } else if (loggedWorkoutSetForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const deleteLoggedWorkoutSet = prisma.loggedWorkoutSet.delete({
      where: { id },
      select: { id: true },
    })
    const deleteLoggedWorkoutMoves = prisma.loggedWorkoutMove.deleteMany({
      where: {
        LoggedWorkoutSet: { id },
      },
    })

    const [_, deleted] = await prisma.$transaction([
      deleteLoggedWorkoutMoves,
      deleteLoggedWorkoutSet,
    ])

    if (deleted) {
      // Reorder remaining sets.
      await reorderItemsForInsertDelete({
        reorderType: 'delete',
        sortPosition: loggedWorkoutSetForDeletion.sortPosition,
        parentId: loggedWorkoutSetForDeletion.loggedWorkoutSectionId,
        parentType: 'loggedWorkoutSection',
        objectType: 'loggedWorkoutSet',
        prisma: prisma,
      })

      return deleted.id
    } else {
      throw new ApolloError('deleteLoggedWorkoutSetById: There was an issue.')
    }
  }
}

export const reorderLoggedWorkoutSets = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutSetsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: LoggedWorkoutSet[] =
    await checkAndReorderObjects<LoggedWorkoutSet>(
      data,
      'loggedWorkoutSet',
      authedUserId,
      prisma,
      select,
    )

  if (updated) {
    return updated
  } else {
    throw new ApolloError('reorderLoggedWorkoutSets: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  LoggedWorkoutSection,
  MutationCreateLoggedWorkoutSectionArgs,
  MutationDeleteLoggedWorkoutSectionByIdArgs,
  MutationReorderLoggedWorkoutSectionsArgs,
  MutationUpdateLoggedWorkoutSectionArgs,
} from '../../../generated/graphql'
import { validateWorkoutSectionLapTimesMs } from '../../../lib/jsonValidation'
import {
  AccessScopeError,
  checkAndReorderObjects,
  checkUserOwnsObject,
  reorderItemsForInsertDelete,
} from '../../utils'

export const createLoggedWorkoutSection = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.LoggedWorkout.id,
    'loggedWorkout',
    authedUserId,
    prisma,
  )

  if (
    data.lapTimesMs != null &&
    !validateWorkoutSectionLapTimesMs(data.lapTimesMs)
  ) {
    throw new Error(
      'createLoggedWorkoutSection.validateWorkoutSectionLapTimesMs: Invalid JSON input shape.',
    )
  }

  const loggedWorkoutSection = await prisma.loggedWorkoutSection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSectionType: {
        connect: data.WorkoutSectionType,
      },
      LoggedWorkout: {
        connect: data.LoggedWorkout,
      },
    },
    select,
  })

  if (loggedWorkoutSection) {
    return loggedWorkoutSection as LoggedWorkoutSection
  } else {
    throw new ApolloError('createLoggedWorkoutSection: There was an issue.')
  }
}

export const updateLoggedWorkoutSection = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'loggedWorkoutSection',
    authedUserId,
    prisma,
  )

  if (
    data.lapTimesMs != null &&
    !validateWorkoutSectionLapTimesMs(data.lapTimesMs)
  ) {
    throw new Error(
      'updateLoggedWorkoutSection.validateWorkoutSectionLapTimesMs: Invalid JSON input shape.',
    )
  }

  const updated = await prisma.loggedWorkoutSection.update({
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
    return updated as LoggedWorkoutSection
  } else {
    throw new ApolloError('updateLoggedWorkoutSection: There was an issue.')
  }
}

//// Deletes the section and all of its children ////
export const deleteLoggedWorkoutSectionById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutSectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // To check user access, get descendant ids and to get media uris back.
  const sectionForDeletion = await prisma.loggedWorkoutSection.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      sortPosition: true,
      loggedWorkoutId: true,
    },
  })

  if (!sectionForDeletion || sectionForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const setsForDeletion = await prisma.loggedWorkoutSet.findMany({
      where: { loggedWorkoutSectionId: id },
      select: { id: true },
    })
    const setIds = setsForDeletion.map(({ id }) => id)

    const ops = [
      prisma.loggedWorkoutMove.deleteMany({
        where: { loggedWorkoutSetId: { in: setIds } },
      }),
      prisma.loggedWorkoutSet.deleteMany({
        where: { id: { in: setIds } },
      }),
      prisma.loggedWorkoutSection.delete({
        where: { id },
        select: { id: true },
      }),
    ]

    const [_, __, deleted] = await prisma.$transaction(ops)

    if (deleted) {
      // Reorder remaing sections.
      await reorderItemsForInsertDelete({
        reorderType: 'delete',
        sortPosition: sectionForDeletion.sortPosition,
        parentId: sectionForDeletion.loggedWorkoutId,
        parentType: 'loggedWorkout',
        objectType: 'loggedWorkoutSection',
        prisma: prisma,
      })

      return sectionForDeletion.id
    } else {
      throw new ApolloError(
        'deleteLoggedWorkoutSectionById: There was an issue.',
      )
    }
  }
}

export const reorderLoggedWorkoutSections = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutSectionsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: LoggedWorkoutSection[] =
    await checkAndReorderObjects<LoggedWorkoutSection>(
      data,
      'loggedWorkoutSection',
      authedUserId,
      prisma,
      select,
    )

  if (updated) {
    return updated
  } else {
    throw new ApolloError('reorderLoggedWorkoutSections: There was an issue.')
  }
}

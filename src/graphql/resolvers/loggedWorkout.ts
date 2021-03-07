import { ApolloError } from 'apollo-server'
import { Context } from '../..'
import {
  CreateLoggedWorkoutInput,
  CreateLoggedWorkoutMoveInLoggedSetInput,
  CreateLoggedWorkoutMoveInput,
  LoggedWorkout,
  LoggedWorkoutMove,
  LoggedWorkoutSection,
  LoggedWorkoutSet,
  MutationCreateLoggedWorkoutArgs,
  MutationCreateLoggedWorkoutMoveArgs,
  MutationCreateLoggedWorkoutSectionArgs,
  MutationCreateLoggedWorkoutSetArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationDeleteLoggedWorkoutMoveByIdArgs,
  MutationDeleteLoggedWorkoutSectionByIdArgs,
  MutationDeleteLoggedWorkoutSetByIdArgs,
  MutationReorderLoggedWorkoutMovesArgs,
  MutationReorderLoggedWorkoutSectionsArgs,
  MutationReorderLoggedWorkoutSetsArgs,
  MutationUpdateLoggedWorkoutArgs,
  MutationUpdateLoggedWorkoutMoveArgs,
  MutationUpdateLoggedWorkoutSectionArgs,
  MutationUpdateLoggedWorkoutSetArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../uploadcare'
import {
  AccessScopeError,
  checkAndReorderObjects,
  checkUserAccessScope,
} from '../utils'

//// Queries ////
export const userLoggedWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.loggedWorkout.findMany({
    where: {
      User: { id: authedUserId },
    },
    select,
  })

//// Mutations ////
/// Creates the full structure down to workout moves ////
export const createLoggedWorkout = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  validateCreateLoggedWorkoutInput(data)
  const loggedWorkout = await prisma.loggedWorkout.create({
    data: {
      ...data,
      User: {
        connect: {
          id: authedUserId,
        },
      },
      LoggedWorkoutSections: {
        create: data.LoggedWorkoutSections.map((section) => ({
          ...section,
          User: { connect: { id: authedUserId } },
          WorkoutSectionType: {
            connect: { id: section.WorkoutSectionType },
          },
          LoggedWorkoutSets: {
            create: section.LoggedWorkoutSets
              ? section.LoggedWorkoutSets.map((set) => ({
                  ...set,
                  User: { connect: { id: authedUserId } },
                  LoggedWorkoutMoves: {
                    create: set.LoggedWorkoutMoves.map((workoutMove) => ({
                      ...workoutMove,
                      distanceUnit: workoutMove.distanceUnit || undefined,
                      loadUnit: workoutMove.loadUnit || undefined,
                      User: { connect: { id: authedUserId } },
                      Equipment: {
                        connect: {
                          id: workoutMove.Equipment || undefined,
                        },
                      },
                      move: {
                        connect: { id: workoutMove.Move },
                      },
                    })),
                  },
                }))
              : undefined,
          },
        })),
      },
      Workout: {
        connect: { id: data.Workout || undefined },
      },
      GymProfile: {
        connect: { id: data.GymProfile || undefined },
      },
      ScheduledWorkout: {
        connect: { id: data.ScheduledWorkout || undefined },
      },
      // Connect to the enrolment (single instance of a user being enrolled in a plan)
      // And to the specific session (via workoutProgramWorkout) within the program.
      WorkoutProgramEnrolment: {
        connect: { id: data.WorkoutProgramEnrolment || undefined },
      },
      WorkoutProgramWorkout: {
        connect: { id: data.WorkoutProgramWorkout || undefined },
      },
    },
    select,
  })

  if (loggedWorkout) {
    return loggedWorkout as LoggedWorkout
  } else {
    throw new ApolloError('createLoggedWorkout: There was an issue.')
  }
}

export const updateLoggedWorkout = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserAccessScope(data.id, 'loggedWorkout', authedUserId, prisma)
  const updated = await prisma.loggedWorkout.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      name: data.name || undefined,
      GymProfile: {
        connect: { id: data.GymProfile || undefined },
      },
      ScheduledWorkout: {
        connect: { id: data.ScheduledWorkout || undefined },
      },
      // Connect to the enrolment (single instance of a user being enrolled in a plan)
      // And to the specific session within the plan (via workoutProgramWorkout).
      WorkoutProgramEnrolment: {
        connect: { id: data.WorkoutProgramEnrolment || undefined },
      },
      WorkoutProgramWorkout: {
        connect: { id: data.WorkoutProgramWorkout || undefined },
      },
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkout
  } else {
    throw new ApolloError('updateLoggedWorkout: There was an issue.')
  }
}

//// Deletes the logged workout AND all of its children ////
export const deleteLoggedWorkoutById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // Get original LoggedWorkout and all its sections.
  // To check user access, get descendant ids and to get media uris back.
  const logForDeletion = await prisma.loggedWorkout.findUnique({
    where: { id },
    select: {
      id: true,
      imageUri: true,
      userId: true,
    },
  })

  if (!logForDeletion || logForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const sectionsForDeletion = await prisma.loggedWorkoutSection.findMany({
      where: { loggedWorkoutId: id },
      select: { id: true },
    })
    const sectionIds = sectionsForDeletion.map(({ id }) => id)

    const setsForDeletion = await prisma.loggedWorkoutSet.findMany({
      where: { loggedWorkoutSectionId: { in: sectionIds } },
      select: { id: true },
    })
    const setIds = setsForDeletion.map(({ id }) => id)

    const ops = [
      prisma.loggedWorkoutMove.deleteMany({
        where: { loggedWorkoutSetId: { in: setIds } },
      }),
      prisma.loggedWorkoutSet.deleteMany({ where: { id: { in: setIds } } }),
      prisma.loggedWorkoutSection.deleteMany({
        where: { id: { in: sectionIds } },
      }),
      prisma.loggedWorkout.delete({ where: { id } }),
    ]

    const [_, __, ___, deleted] = await prisma.$transaction(ops)

    if (deleted) {
      if (logForDeletion.imageUri) {
        await deleteFiles([logForDeletion.imageUri])
      }
      return logForDeletion.id
    } else {
      throw new ApolloError('deleteLoggedWorkoutById: There was an issue.')
    }
  }
}

export const createLoggedWorkoutSection = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkoutSection = await prisma.loggedWorkoutSection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSectionType: {
        connect: { id: data.WorkoutSectionType },
      },
      LoggedWorkout: {
        connect: {
          id: data.LoggedWorkout,
        },
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
  await checkUserAccessScope(
    data.id,
    'loggedWorkoutSection',
    authedUserId,
    prisma,
  )
  const updated = await prisma.loggedWorkoutSection.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      timeTakenMs: data.timeTakenMs || undefined,
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
      prisma.loggedWorkoutSection.delete({ where: { id } }),
    ]

    const [_, __, deleted] = await prisma.$transaction(ops)

    if (deleted) {
      return sectionForDeletion.id
    } else {
      throw new ApolloError(
        'deleteLoggedWorkoutSectionById: There was an issue.',
      )
    }
  }
}

export const createLoggedWorkoutSet = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkoutSet = await prisma.loggedWorkoutSet.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      LoggedWorkoutSection: {
        connect: { id: data.LoggedWorkoutSection },
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
  await checkUserAccessScope(data.id, 'loggedWorkoutSet', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutSet.update({
    where: {
      id: data.id,
    },
    data,
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
  await checkUserAccessScope(id, 'loggedWorkoutSet', authedUserId, prisma)

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
    return deleted.id
  } else {
    throw new ApolloError('deleteLoggedWorkoutSetById: There was an issue.')
  }
}

export const createLoggedWorkoutMove = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkoutmove = await prisma.loggedWorkoutMove.create({
    data: {
      ...data,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      User: { connect: { id: authedUserId } },
      Move: {
        connect: { id: data.Move },
      },
      Equipment: {
        connect: { id: data.Equipment || undefined },
      },
      LoggedWorkoutSet: {
        connect: { id: data.LoggedWorkoutSet },
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
  await checkUserAccessScope(data.id, 'loggedWorkoutMove', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutMove.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      reps: data.reps || undefined,
      Move: {
        connect: { id: data.Move || undefined },
      },
      Equipment: {
        connect: { id: data.Equipment || undefined },
      },
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
  await checkUserAccessScope(id, 'loggedWorkoutMove', authedUserId, prisma)
  const deleted = await prisma.loggedWorkoutMove.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteLoggedWorkoutMoveById: There was an issue.')
  }
}

export const reorderLoggedWorkoutSections = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutSectionsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated = await checkAndReorderObjects<LoggedWorkoutSection>(
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

export const reorderLoggedWorkoutSets = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutSetsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated = await checkAndReorderObjects<LoggedWorkoutSet>(
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

export const reorderLoggedWorkoutMoves = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutMovesArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated = await checkAndReorderObjects<LoggedWorkoutMove>(
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

//// Input validation ////
/**
 * LoggedWorkoutMove Validation
 */
function validateCreateLoggedWorkoutInput(data: CreateLoggedWorkoutInput) {
  // Check all logged workout moves for valid inputs
  for (const section of data.LoggedWorkoutSections) {
    for (const set of section.LoggedWorkoutSets) {
      for (const workoutMove of set.LoggedWorkoutMoves) {
        validateLoggedWorkoutMoveInput(workoutMove)
      }
    }
  }
}

function validateLoggedWorkoutMoveInput(
  workoutMove:
    | CreateLoggedWorkoutMoveInput
    | CreateLoggedWorkoutMoveInLoggedSetInput,
) {
  if (
    (workoutMove.repType === 'DISTANCE' && !workoutMove.distanceUnit) ||
    (workoutMove.loadAmount && !workoutMove.loadUnit)
  ) {
    throw new ApolloError(
      'Invalid loggedWorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
    )
  }
}

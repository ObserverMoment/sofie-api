import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  CreateLoggedWorkoutInput,
  CreateLoggedWorkoutMoveInLoggedSetInput,
  CreateLoggedWorkoutMoveInput,
  LoggedWorkout,
  MutationCreateLoggedWorkoutArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationUpdateLoggedWorkoutArgs,
  QueryLoggedWorkoutByIdArgs,
  QueryUserLoggedWorkoutsArgs,
} from '../../../generated/graphql'
import { AccessScopeError, checkUserOwnsObject } from '../../utils'

//// Queries ////
export const userLoggedWorkouts = async (
  r: any,
  { take }: QueryUserLoggedWorkoutsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkouts = await prisma.loggedWorkout.findMany({
    where: {
      User: { id: authedUserId },
    },
    orderBy: {
      completedOn: 'desc',
    },
    take: take ?? 50,
    select,
  })
  return loggedWorkouts as LoggedWorkout[]
}

export const loggedWorkoutById = async (
  r: any,
  { id }: QueryLoggedWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkout: any = await prisma.loggedWorkout.findUnique({
    where: { id },
    select: {
      ...select,
      userId: true,
    },
  })

  if (loggedWorkout) {
    if (loggedWorkout.userId !== authedUserId) {
      throw new AccessScopeError()
    }

    return loggedWorkout as LoggedWorkout
  } else {
    throw new ApolloError('loggedWorkoutProgramById: There was an issue.')
  }
}

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
            connect: section.WorkoutSectionType,
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
                      timeUnit: workoutMove.timeUnit || undefined,
                      User: { connect: { id: authedUserId } },
                      Equipment: workoutMove.Equipment
                        ? {
                            connect: workoutMove.Equipment,
                          }
                        : undefined,
                      Move: {
                        connect: workoutMove.Move,
                      },
                    })),
                  },
                }))
              : undefined,
          },
        })),
      },
      Workout: data.Workout
        ? {
            connect: data.Workout,
          }
        : undefined,
      ScheduledWorkout: data.ScheduledWorkout
        ? {
            connect: data.ScheduledWorkout,
          }
        : undefined,
      GymProfile: data.GymProfile
        ? {
            connect: data.GymProfile,
          }
        : undefined,
      // Connect to the enrolment (single instance of a user being enrolled in a plan)
      // And to the specific session (via workoutProgramWorkout) within the program.
      WorkoutProgramEnrolment: data.WorkoutProgramEnrolment
        ? {
            connect: data.WorkoutProgramEnrolment,
          }
        : undefined,
      WorkoutProgramWorkout: data.WorkoutProgramWorkout
        ? {
            connect: data.WorkoutProgramWorkout,
          }
        : undefined,
    },
    select,
  })

  if (loggedWorkout) {
    return loggedWorkout as LoggedWorkout
  } else {
    throw new ApolloError('createLoggedWorkout: There was an issue.')
  }
}

/// Does not do any relation connecting
/// ScheduledWorkout, WorkoutProgramEnrolment or WorkoutProgramWorkout
export const updateLoggedWorkout = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'loggedWorkout', authedUserId, prisma)
  const updated = await prisma.loggedWorkout.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      name: data.name || undefined,
      // GymProfile can be null , so it can only be ignored if not present in the data object.
      // passing null should disconnect a connected GymProfile.
      GymProfile: data.hasOwnProperty('GymProfile')
        ? data.GymProfile
          ? { connect: data.GymProfile }
          : { disconnect: true }
        : undefined,
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
      return logForDeletion.id
    } else {
      throw new ApolloError('deleteLoggedWorkoutById: There was an issue.')
    }
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

import { PrismaClient } from '.prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  LifetimeLogStatsSummary,
  LoggedWorkout,
  LoggedWorkoutMove,
  LoggedWorkoutSection,
  LoggedWorkoutSet,
  MutationCreateLoggedWorkoutArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationUpdateLoggedWorkoutArgs,
  MutationUpdateLoggedWorkoutMoveArgs,
  MutationDeleteLoggedWorkoutMoveArgs,
  MutationUpdateLoggedWorkoutSectionArgs,
  MutationUpdateLoggedWorkoutSetArgs,
  QueryLifetimeLogStatsSummaryArgs,
  QueryLogCountByWorkoutArgs,
  QueryLoggedWorkoutByIdArgs,
  QueryUserLoggedWorkoutsArgs,
} from '../../generated/graphql'
import { notifyWorkoutOwnerOfLogEvent } from '../../lib/getStream'
import { checkUserOwnsObject } from '../utils'

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
    take: take ?? undefined,
    select,
  })
  return loggedWorkouts as LoggedWorkout[]
}

export const loggedWorkoutById = async (
  r: any,
  { id }: QueryLoggedWorkoutByIdArgs,
  { select, prisma }: Context,
) => {
  const loggedWorkout = await prisma.loggedWorkout.findUnique({
    where: { id },
    select,
  })

  if (loggedWorkout) {
    return loggedWorkout as LoggedWorkout
  } else {
    throw new ApolloError('loggedWorkoutById: There was an issue.')
  }
}

/// How many logs have been created against the workout.
export const logCountByWorkout = async (
  r: any,
  { id }: QueryLogCountByWorkoutArgs,
  { prisma }: Context,
) => {
  const workoutWithCount = await prisma.workout.findUnique({
    where: { id },
    select: {
      id: true,
      _count: {
        select: {
          LoggedWorkouts: true,
        },
      },
    },
  })

  if (workoutWithCount?._count) {
    return workoutWithCount._count.LoggedWorkouts
  } else {
    throw new ApolloError('logCountByWorkout: There was an issue.')
  }
}

export const lifetimeLogStatsSummary = async (
  r: any,
  { userId }: QueryLifetimeLogStatsSummaryArgs,
  { prisma }: Context,
) => {
  return calcLifetimeLogStatsSummary(userId, prisma)
}

//// Mutations ////
/// Nested create the LoggedWorkout and the LoggedWorkoutSections ////
export const createLoggedWorkout = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const shouldCreateCompletedWorkoutPlanDayWorkout =
    data.WorkoutPlanDayWorkout && data.WorkoutPlanEnrolment

  const loggedWorkout = await prisma.loggedWorkout.create({
    data: {
      completedOn: data.completedOn,
      name: data.name,
      note: data.note,
      User: {
        connect: {
          id: authedUserId,
        },
      },
      CompletedWorkoutPlanDayWorkout: shouldCreateCompletedWorkoutPlanDayWorkout
        ? {
            create: {
              WorkoutPlanDayWorkout: { connect: data.WorkoutPlanDayWorkout! },
              WorkoutPlanEnrolment: { connect: data.WorkoutPlanEnrolment! },
            },
          }
        : undefined,
      Workout: data.Workout
        ? {
            connect: data.Workout,
          }
        : undefined,
      WorkoutGoals: {
        connect: data.WorkoutGoals,
      },
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
      LoggedWorkoutSections: {
        create: data.LoggedWorkoutSections.map((section) => ({
          ...section,
          User: { connect: { id: authedUserId } },
          WorkoutSectionType: {
            connect: section.WorkoutSectionType,
          },
          LoggedWorkoutSets: {
            create: section.LoggedWorkoutSets.map((lws) => ({
              sectionRoundNumber: lws.sectionRoundNumber,
              sortPosition: lws.sortPosition,
              timeTakenSeconds: lws.timeTakenSeconds,
              User: { connect: { id: authedUserId } },
              LoggedWorkoutMoves: {
                create: lws.LoggedWorkoutMoves.map((lwm) => ({
                  sortPosition: lwm.sortPosition,
                  repType: lwm.repType,
                  reps: lwm.reps,
                  distanceUnit: lwm.distanceUnit || undefined,
                  loadAmount: lwm.loadAmount || undefined,
                  loadUnit: lwm.loadUnit || undefined,
                  timeUnit: lwm.timeUnit || undefined,
                  Equipment: lwm.Equipment
                    ? {
                        connect: lwm.Equipment,
                      }
                    : undefined,
                  Move: { connect: lwm.Move },
                  User: { connect: { id: authedUserId } },
                })),
              },
            })),
          },
        })),
      },
    },
    select: {
      ...select,
      // Get some workout info so that you can send a notification to the owner that a workout has been logged.
      Workout: {
        select: {
          id: true,
          name: true,
          User: {
            select: { id: true },
          },
        },
      },
    },
  })

  if (loggedWorkout) {
    /// Notify the owner of the workout that a log has been created against it.
    const workoutOwnerId = (loggedWorkout as any).Workout.User.id
    const workoutId = (loggedWorkout as any).Workout.id
    const workoutName = (loggedWorkout as any).Workout.name

    if (!workoutOwnerId || !workoutId || !workoutName) {
      throw new ApolloError(
        'Could not [notifyWorkoutOwnerOfLogEvent] as could not find the workout data needed in the select response object.',
      )
    }
    await notifyWorkoutOwnerOfLogEvent(
      authedUserId,
      workoutOwnerId,
      workoutId,
      workoutName,
    )

    return loggedWorkout as LoggedWorkout
  } else {
    throw new ApolloError('createLoggedWorkout: There was an issue.')
  }
}

/// Does not do any relation connecting / updating for ScheduledWorkout, WorkoutPlanEnrolment or WorkoutPlanWorkout.
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
      // GymProfile can be null, so it can only be ignored if not present in the data object.
      // passing null should disconnect a connected GymProfile.
      GymProfile: data.hasOwnProperty('GymProfile')
        ? data.GymProfile
          ? { connect: data.GymProfile }
          : { disconnect: true }
        : undefined,
      WorkoutGoals: data.hasOwnProperty('WorkoutGoals')
        ? { set: data.WorkoutGoals || [] }
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

//// Deletes the logged workout AND all of its logged workout sections via cascade ////
export const deleteLoggedWorkoutById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'loggedWorkout', authedUserId, prisma)

  const deleted = await prisma.loggedWorkout.delete({ where: { id } })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteLoggedWorkoutById: There was an issue.')
  }
}

//// Logged Workout Section ////
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

  const updated = await prisma.loggedWorkoutSection.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      timeTakenSeconds: data.timeTakenSeconds || undefined,
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutSection
  } else {
    throw new ApolloError('updateLoggedWorkoutSection: There was an issue.')
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
    data,
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutSet
  } else {
    throw new ApolloError('updateLoggedWorkoutSet: There was an issue.')
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
      repType: data.repType || undefined,
      distanceUnit: data.distanceUnit || undefined,
      loadAmount: data.loadAmount || undefined,
      loadUnit: data.loadUnit || undefined,
      timeUnit: data.timeUnit || undefined,
      Equipment: data.Equipment
        ? {
            connect: data.Equipment,
          }
        : undefined,
      Move: data.Move
        ? {
            connect: data.Move,
          }
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

export const deleteLoggedWorkoutMove = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'loggedWorkoutMove', authedUserId, prisma)

  const deleted = await prisma.loggedWorkoutMove.delete({
    where: {
      id,
    },
    select,
  })

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteLoggedWorkoutMove: There was an issue.')
  }
}

//// Utils ////
export async function calcLifetimeLogStatsSummary(
  userId: string,
  prisma: PrismaClient,
) {
  const loggedWorkouts = await prisma.loggedWorkout.findMany({
    where: { userId },
    select: {
      LoggedWorkoutSections: {
        select: {
          timeTakenSeconds: true,
        },
      },
    },
  })

  const sessionsLogged = loggedWorkouts.length

  const secondsWorked = loggedWorkouts.reduce((acum, nextLog) => {
    return (
      acum +
      nextLog.LoggedWorkoutSections.reduce((acum, nextSection) => {
        return nextSection.timeTakenSeconds !== null
          ? acum + nextSection.timeTakenSeconds
          : acum
      }, 0)
    )
  }, 0)

  if (loggedWorkouts) {
    return {
      sessionsLogged,
      minutesWorked: Math.round(secondsWorked / 60),
    } as LifetimeLogStatsSummary
  } else {
    throw new ApolloError('calcLifetimeLogStatsSummary: There was an issue.')
  }
}

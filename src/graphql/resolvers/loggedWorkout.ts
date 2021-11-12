import { PrismaClient } from '.prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  LifetimeLogStatsSummary,
  LoggedWorkout,
  LoggedWorkoutSection,
  MutationCreateLoggedWorkoutArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationUpdateLoggedWorkoutArgs,
  MutationUpdateLoggedWorkoutSectionArgs,
  QueryLifetimeLogStatsSummaryArgs,
  QueryLoggedWorkoutByIdArgs,
  QueryUserLoggedWorkoutsArgs,
} from '../../generated/graphql'
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
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'loggedWorkout', authedUserId, prisma)

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
  const loggedWorkout = await prisma.loggedWorkout.create({
    data: {
      ...data,
      User: {
        connect: {
          id: authedUserId,
        },
      },
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
          BodyAreas: section.BodyAreas
            ? {
                connect: section.BodyAreas,
              }
            : undefined,
          MoveTypes: section.MoveTypes
            ? {
                connect: section.MoveTypes,
              }
            : undefined,
        })),
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
      loggedWorkoutSectionData: data.loggedWorkoutSectionData || undefined,
      // For BodyAreas and MoveTypes.
      // If present then do not ignore if null or [].
      // Both null and [] will effectively clear all relations.
      BodyAreas: data.hasOwnProperty('BodyAreas')
        ? { set: data.BodyAreas || [] }
        : undefined,
      MoveTypes: data.hasOwnProperty('MoveTypes')
        ? { set: data.MoveTypes || [] }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutSection
  } else {
    throw new ApolloError('updateLoggedWorkoutSection: There was an issue.')
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

import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'

import {
  MutationCreateScheduledWorkoutArgs,
  MutationDeleteScheduledWorkoutByIdArgs,
  MutationUpdateScheduledWorkoutArgs,
  ScheduledWorkout,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'
import { selectForWorkoutSummary } from './selectDefinitions'
import { formatWorkoutSummary } from './workout/utils'

//// Queries ////
export const userScheduledWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const scheduledWorkouts: any = await prisma.scheduledWorkout.findMany({
    where: { userId: authedUserId },
    select: {
      ...select,
      Workout: {
        select: selectForWorkoutSummary,
      },
    },
  })

  const formatted = scheduledWorkouts.map((s: any) => ({
    ...s,
    Workout: formatWorkoutSummary(s.Workout),
  }))

  return formatted as ScheduledWorkout[]
}

//// Mutations ////
export const createScheduledWorkout = async (
  r: any,
  { data }: MutationCreateScheduledWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const scheduledWorkout: any = await prisma.scheduledWorkout.create({
    data: {
      ...data,
      Workout: {
        connect: data.Workout,
      },
      GymProfile: data.GymProfile
        ? {
            connect: data.GymProfile,
          }
        : undefined,
      WorkoutPlanEnrolment: data.WorkoutPlanEnrolment
        ? {
            connect: data.WorkoutPlanEnrolment,
          }
        : undefined,
      User: {
        connect: { id: authedUserId },
      },
    },
    select: {
      ...select,
      Workout: {
        select: selectForWorkoutSummary,
      },
    },
  })

  scheduledWorkout.Workout = formatWorkoutSummary(scheduledWorkout.Workout)

  if (scheduledWorkout) {
    return scheduledWorkout as ScheduledWorkout
  } else {
    throw new ApolloError('createScheduledWorkout: There was an issue.')
  }
}

export const updateScheduledWorkout = async (
  r: any,
  { data }: MutationUpdateScheduledWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'scheduledWorkout', authedUserId, prisma)

  const updated: any = await prisma.scheduledWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      Workout: data.Workout
        ? {
            connect: data.Workout,
          }
        : undefined,
      // GymProfile can be null, so it can only be ignored if not present in the data object.
      // passing null should disconnect a connected GymProfile.
      GymProfile: data.hasOwnProperty('GymProfile')
        ? data.GymProfile
          ? { connect: data.GymProfile }
          : { disconnect: true }
        : undefined,
      WorkoutPlanEnrolment: data.hasOwnProperty('WorkoutPlanEnrolment')
        ? data.WorkoutPlanEnrolment
          ? { connect: data.WorkoutPlanEnrolment }
          : { disconnect: true }
        : undefined,
      LoggedWorkout: data.LoggedWorkout
        ? {
            connect: data.LoggedWorkout,
          }
        : undefined,
    },
    select: {
      ...select,
      Workout: {
        select: selectForWorkoutSummary,
      },
    },
  })

  updated.Workout = formatWorkoutSummary(updated.Workout)

  if (updated) {
    return updated as ScheduledWorkout
  } else {
    throw new ApolloError('updateScheduledWorkout: There was an issue.')
  }
}

export const deleteScheduledWorkoutById = async (
  r: any,
  { id }: MutationDeleteScheduledWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'scheduledWorkout', authedUserId, prisma)

  const deleted = await prisma.scheduledWorkout.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteScheduledWorkoutById: There was an issue.')
  }
}

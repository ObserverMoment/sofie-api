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
  { authedUserId, prisma }: Context,
) => {
  const scheduledWorkouts = await prisma.scheduledWorkout.findMany({
    where: { userId: authedUserId },
    select: {
      id: true,
      createdAt: true,
      scheduledAt: true,
      note: true,
      loggedWorkoutId: true,
      workoutPlanDayWorkoutId: true,
      WorkoutPlanEnrolment: {
        select: {
          id: true,
          WorkoutPlan: {
            select: { id: true, name: true },
          },
        },
      },
      GymProfile: {
        include: {
          Equipments: true,
        },
      },
      Workout: {
        select: selectForWorkoutSummary,
      },
    },
  })

  const formatted = scheduledWorkouts.map((s) => ({
    id: s.id,
    createdAt: s.createdAt,
    scheduledAt: s.scheduledAt,
    note: s.note,
    loggedWorkoutId: s.loggedWorkoutId,
    workoutPlanName: s.WorkoutPlanEnrolment?.WorkoutPlan.name,
    workoutPlanEnrolmentId: s.WorkoutPlanEnrolment?.id,
    workoutPlanDayWorkoutId: s.workoutPlanDayWorkoutId,
    GymProfile: s.GymProfile,
    Workout: s.Workout ? formatWorkoutSummary(s.Workout) : null,
  }))

  return formatted as ScheduledWorkout[]
}

//// Mutations ////
export const createScheduledWorkout = async (
  r: any,
  { data }: MutationCreateScheduledWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  const scheduledWorkout = await prisma.scheduledWorkout.create({
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
      WorkoutPlanDayWorkout: data.WorkoutPlanDayWorkout
        ? {
            connect: data.WorkoutPlanDayWorkout,
          }
        : undefined,
      User: {
        connect: { id: authedUserId },
      },
    },
    select: {
      id: true,
      createdAt: true,
      scheduledAt: true,
      note: true,
      loggedWorkoutId: true,
      workoutPlanDayWorkoutId: true,
      WorkoutPlanEnrolment: {
        select: {
          id: true,
          WorkoutPlan: {
            select: { id: true, name: true },
          },
        },
      },
      GymProfile: {
        include: {
          Equipments: true,
        },
      },
      Workout: {
        select: selectForWorkoutSummary,
      },
    },
  })

  if (scheduledWorkout) {
    return {
      id: scheduledWorkout.id,
      createdAt: scheduledWorkout.createdAt,
      scheduledAt: scheduledWorkout.scheduledAt,
      note: scheduledWorkout.note,
      loggedWorkoutId: scheduledWorkout.loggedWorkoutId,
      workoutPlanName: scheduledWorkout.WorkoutPlanEnrolment?.WorkoutPlan.name,
      workoutPlanEnrolmentId: scheduledWorkout.WorkoutPlanEnrolment?.id,
      workoutPlanDayWorkoutId: scheduledWorkout.workoutPlanDayWorkoutId,
      GymProfile: scheduledWorkout.GymProfile,
      Workout: scheduledWorkout.Workout
        ? formatWorkoutSummary(scheduledWorkout.Workout)
        : null,
    } as ScheduledWorkout
  } else {
    throw new ApolloError('createScheduledWorkout: There was an issue.')
  }
}

export const updateScheduledWorkout = async (
  r: any,
  { data }: MutationUpdateScheduledWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'scheduledWorkout', authedUserId, prisma)

  const updated = await prisma.scheduledWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      // GymProfile can be null, so it can only be ignored if not present in the data object.
      // passing null should disconnect a connected GymProfile.
      GymProfile: data.hasOwnProperty('GymProfile')
        ? data.GymProfile
          ? { connect: data.GymProfile }
          : { disconnect: true }
        : undefined,
      LoggedWorkout: data.LoggedWorkout
        ? {
            connect: data.LoggedWorkout,
          }
        : undefined,
    },
    select: {
      id: true,
      createdAt: true,
      scheduledAt: true,
      note: true,
      loggedWorkoutId: true,
      workoutPlanDayWorkoutId: true,
      WorkoutPlanEnrolment: {
        select: {
          id: true,
          WorkoutPlan: {
            select: { id: true, name: true },
          },
        },
      },
      GymProfile: {
        include: {
          Equipments: true,
        },
      },
      Workout: {
        select: selectForWorkoutSummary,
      },
    },
  })

  if (updated) {
    return {
      id: updated.id,
      createdAt: updated.createdAt,
      scheduledAt: updated.scheduledAt,
      note: updated.note,
      loggedWorkoutId: updated.loggedWorkoutId,
      workoutPlanName: updated.WorkoutPlanEnrolment?.WorkoutPlan.name,
      workoutPlanEnrolmentId: updated.WorkoutPlanEnrolment?.id,
      workoutPlanDayWorkoutId: updated.workoutPlanDayWorkoutId,
      GymProfile: updated.GymProfile,
      Workout: updated.Workout ? formatWorkoutSummary(updated.Workout) : null,
    } as ScheduledWorkout
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

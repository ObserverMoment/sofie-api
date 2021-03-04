import { ScheduledWorkout } from '@prisma/client'
import { Context } from '../..'

import {
  MutationScheduleWorkoutArgs,
  MutationUnscheduleWorkoutArgs,
  MutationUpdateScheduledWorkoutArgs,
} from '../../generated/graphql'

//// Queries ////
export const userScheduledWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.scheduledWorkout.findMany({
    where: { userId: authedUserId },
    select,
  })

//// Mutations ////
export const scheduleWorkout = async (
  r: any,
  { data }: MutationScheduleWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.scheduledWorkout.create({
    data: {
      ...data,
      Workout: {
        connect: { id: data.Workout || undefined },
      },
      GymProfile: {
        connect: { id: data.GymProfile || undefined },
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

export const unscheduleWorkout = async (
  r: any,
  { scheduledWorkoutId }: MutationUnscheduleWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  const deleted: ScheduledWorkout = await prisma.scheduledWorkout.delete({
    where: {
      id: scheduledWorkoutId,
      User: { id: authedUserId },
    },
  })
  return deleted.id
}

export const updateScheduledWorkout = async (
  r: any,
  { data }: MutationUpdateScheduledWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.scheduledWorkout.update({
    where: {
      id: data.id,
      User: { id: authedUserId },
    },
    data: {
      ...data,
      Workout: {
        connect: { id: data.Workout || undefined },
      },
      GymProfile: {
        connect: { id: data.GymProfile || undefined },
      },
      LoggedWorkout: {
        connect: { id: data.LoggedWorkout || undefined },
      },
    },
    select,
  })

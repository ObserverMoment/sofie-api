import { ScheduledWorkout } from '@prisma/client'
import { Context } from '../..'

import {
  MutationScheduleWorkoutArgs,
  MutationUnscheduleWorkoutArgs,
  MutationUpdateScheduledWorkoutArgs,
} from '../../generated/graphql'

//// Queries
const scheduledWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.scheduledWorkout.findMany({
    where: {
      User: { id: authedUserId },
    },
    select,
  })

//// Mutations
const scheduleWorkout = async (
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

const unscheduleWorkout = async (
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

const updateScheduledWorkout = async (
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

export {
  scheduledWorkouts,
  scheduleWorkout,
  unscheduleWorkout,
  updateScheduledWorkout,
}

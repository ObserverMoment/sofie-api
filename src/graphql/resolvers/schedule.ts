import { ScheduledWorkout } from '@prisma/client'
import { Context } from '../..'

import {
  MutationScheduleWorkoutArgs,
  MutationUnscheduleWorkoutArgs,
  MutationUpdateScheduledWorkoutArgs,
  QueryScheduledWorkoutsArgs,
} from '../../generated/graphql'

//// Queries
const scheduledWorkouts = async (
  r: any,
  { authedUserId }: QueryScheduledWorkoutsArgs,
  { select, prisma }: Context,
) =>
  prisma.scheduledWorkout.findMany({
    where: {
      user: { id: authedUserId },
    },
    select,
  })

//// Mutations
const scheduleWorkout = async (
  r: any,
  { authedUserId, data }: MutationScheduleWorkoutArgs,
  { select, prisma }: Context,
) =>
  prisma.scheduledWorkout.create({
    data: {
      ...data,
      workout: data.workout
        ? {
            connect: { id: data.workout },
          }
        : undefined,
      gymProfile: data.gymProfile
        ? {
            connect: { id: data.gymProfile },
          }
        : undefined,
      user: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const unscheduleWorkout = async (
  r: any,
  { authedUserId, scheduledWorkoutId }: MutationUnscheduleWorkoutArgs,
  { prisma }: Context,
) => {
  const deleted: ScheduledWorkout = await prisma.scheduledWorkout.delete({
    where: {
      id: scheduledWorkoutId,
    },
  })
  return deleted.id
}

const updateScheduledWorkout = async (
  r: any,
  { authedUserId, data }: MutationUpdateScheduledWorkoutArgs,
  { select, prisma }: Context,
) =>
  prisma.scheduledWorkout.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      workout: data.workout
        ? {
            connect: { id: data.workout },
          }
        : undefined,
      gymProfile: data.gymProfile
        ? {
            connect: { id: data.gymProfile },
          }
        : undefined,
      loggedWorkout: data.loggedWorkout
        ? {
            connect: { id: data.loggedWorkout },
          }
        : undefined,
    },
    select,
  })

export {
  scheduledWorkouts,
  scheduleWorkout,
  unscheduleWorkout,
  updateScheduledWorkout,
}

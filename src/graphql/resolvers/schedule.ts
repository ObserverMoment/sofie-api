import { ApolloError } from 'apollo-server'
import { Context } from '../..'

import {
  MutationCreateScheduledWorkoutArgs,
  MutationDeleteScheduledWorkoutByIdArgs,
  MutationUpdateScheduledWorkoutArgs,
  ScheduledWorkout,
} from '../../generated/graphql'
import { checkUserAccessScope } from '../utils'

//// Queries ////
export const userScheduledWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const scheduledWorkouts = await prisma.scheduledWorkout.findMany({
    where: { userId: authedUserId },
    select,
  })
  return scheduledWorkouts as ScheduledWorkout[]
}

//// Mutations ////
export const createScheduledWorkout = async (
  r: any,
  { data }: MutationCreateScheduledWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const scheduledWorkout = await prisma.scheduledWorkout.create({
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
  await checkUserAccessScope(data.id, 'scheduledWorkout', authedUserId, prisma)

  const updated = await prisma.scheduledWorkout.update({
    where: { id: data.id },
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
  await checkUserAccessScope(id, 'scheduledWorkout', authedUserId, prisma)

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

import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateScheduledWorkoutsArgs,
  MutationDeleteScheduledWorkoutArgs,
  MutationUpdateScheduledWorkoutArgs,
  QueryUserScheduledWorkoutsArgs,
  ScheduledWorkout,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userScheduledWorkouts = async (
  r: any,
  { from, to }: QueryUserScheduledWorkoutsArgs,
  { select, authedUserId, prisma }: Context,
) => {
  const scheduled = await prisma.scheduledWorkout.findMany({
    where: {
      userId: authedUserId,
      scheduledAt: {
        gte: from,
        lt: to,
      },
    },
    select,
  })

  return scheduled as ScheduledWorkout[]
}

//// Mutations ////
export const createScheduledWorkouts = async (
  r: any,
  { data }: MutationCreateScheduledWorkoutsArgs,
  { select, authedUserId, prisma }: Context,
) => {
  try {
    const scheduled = await prisma.$transaction(
      data.map((i) =>
        prisma.scheduledWorkout.create({
          data: {
            ...i,
            ResistanceWorkout: i.ResistanceWorkout
              ? {
                  connect: i.ResistanceWorkout,
                }
              : undefined,
            CardioWorkout: i.CardioWorkout
              ? { connect: i.CardioWorkout }
              : undefined,
            GymProfile: i.GymProfile
              ? {
                  connect: i.GymProfile,
                }
              : undefined,
            User: {
              connect: { id: authedUserId },
            },
          },
          select,
        }),
      ),
    )

    if (scheduled.length) {
      return scheduled as ScheduledWorkout[]
    } else {
      throw new ApolloError('createScheduledWorkouts: There was an issue.')
    }
  } catch (e: any) {
    console.log(e.toString())
    throw new ApolloError('createScheduledWorkouts: There was an issue.')
  }
}

export const updateScheduledWorkout = async (
  r: any,
  { data }: MutationUpdateScheduledWorkoutArgs,
  { select, authedUserId, prisma }: Context,
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
    },
    select,
  })

  if (updated) {
    return updated as ScheduledWorkout
  } else {
    throw new ApolloError('updateScheduledWorkout: There was an issue.')
  }
}

export const deleteScheduledWorkout = async (
  r: any,
  { id }: MutationDeleteScheduledWorkoutArgs,
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
    throw new ApolloError('deleteScheduledWorkout: There was an issue.')
  }
}

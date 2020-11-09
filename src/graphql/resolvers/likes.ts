import { LikedWorkout } from '@prisma/client'
import { Context } from '../..'

import {
  MutationLikeWorkoutArgs,
  MutationUnlikeWorkoutArgs,
  QueryLikedWorkoutsArgs,
} from '../../generated/graphql'

//// Queries
const likedWorkouts = async (
  r: any,
  { authedUserId }: QueryLikedWorkoutsArgs,
  { prisma }: Context,
) => {
  const likedWorkouts: LikedWorkout[] = await prisma.likedWorkout.findMany({
    where: {
      user: { id: authedUserId },
    },
  })
  return likedWorkouts.map(
    (likedWorkout: LikedWorkout) => likedWorkout.workoutId,
  )
}

//// Mutations
const likeWorkout = async (
  r: any,
  { authedUserId, workoutId }: MutationLikeWorkoutArgs,
  { prisma }: Context,
) => {
  const likedWorkout: LikedWorkout = await prisma.likedWorkout.create({
    data: {
      user: {
        connect: { id: authedUserId },
      },
      workout: {
        connect: { id: workoutId },
      },
    },
  })
  return likedWorkout.workoutId
}

const unlikeWorkout = async (
  r: any,
  { authedUserId, workoutId }: MutationUnlikeWorkoutArgs,
  { prisma }: Context,
) => {
  const deletedLikedWorkout: LikedWorkout = await prisma.likedWorkout.delete({
    where: {
      userId_workoutId: {
        workoutId: workoutId,
        userId: authedUserId,
      },
    },
  })
  return deletedLikedWorkout.workoutId
}

export { likedWorkouts, likeWorkout, unlikeWorkout }

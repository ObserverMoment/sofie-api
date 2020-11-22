import { LikedWorkout, LikedWorkoutProgram } from '@prisma/client'
import { Context } from '../..'

import {
  MutationLikeWorkoutArgs,
  MutationLikeWorkoutProgramArgs,
  MutationUnlikeWorkoutArgs,
  MutationUnlikeWorkoutProgramArgs,
  QueryLikedWorkoutProgramsArgs,
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

const likedWorkoutPrograms = async (
  r: any,
  { authedUserId }: QueryLikedWorkoutProgramsArgs,
  { prisma }: Context,
) => {
  const likedWorkoutPrograms: LikedWorkoutProgram[] = await prisma.likedWorkoutProgram.findMany(
    {
      where: {
        user: { id: authedUserId },
      },
    },
  )
  return likedWorkoutPrograms.map(
    (likedWorkoutProgram: LikedWorkoutProgram) =>
      likedWorkoutProgram.workoutProgramId,
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

const likeWorkoutProgram = async (
  r: any,
  { authedUserId, workoutProgramId }: MutationLikeWorkoutProgramArgs,
  { prisma }: Context,
) => {
  const likedWorkoutProgram: LikedWorkoutProgram = await prisma.likedWorkoutProgram.create(
    {
      data: {
        user: {
          connect: { id: authedUserId },
        },
        workoutProgram: {
          connect: { id: workoutProgramId },
        },
      },
    },
  )
  return likedWorkoutProgram.workoutProgramId
}

const unlikeWorkoutProgram = async (
  r: any,
  { authedUserId, workoutProgramId }: MutationUnlikeWorkoutProgramArgs,
  { prisma }: Context,
) => {
  const deletedLikedWorkoutProgram: LikedWorkoutProgram = await prisma.likedWorkoutProgram.delete(
    {
      where: {
        userId_workoutProgramId: {
          workoutProgramId: workoutProgramId,
          userId: authedUserId,
        },
      },
    },
  )
  return deletedLikedWorkoutProgram.workoutProgramId
}

export {
  likedWorkouts,
  likeWorkout,
  unlikeWorkout,
  likedWorkoutPrograms,
  likeWorkoutProgram,
  unlikeWorkoutProgram,
}

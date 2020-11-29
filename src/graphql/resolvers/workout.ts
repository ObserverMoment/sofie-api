import {
  MutationCreateWorkoutArgs,
  MutationDeepUpdateWorkoutArgs,
  MutationDeleteWorkoutByIdArgs,
  MutationShallowUpdateWorkoutArgs,
  QueryPrivateWorkoutsArgs,
  QueryWorkoutByIdArgs,
  Workout,
} from '../../generated/graphql'

import { buildWorkoutSectionsData } from '../workoutBuilders'

import { checkWorkoutMediaForDeletion, deleteFiles } from '../../uploadcare'

import { Context } from '../..'

//// Queries ////
const officialWorkouts = async (r: any, a: any, { select, prisma }: Context) =>
  prisma.workout.findMany({
    where: { scope: 'OFFICIAL' },
    select,
  })

const publicWorkouts = async (r: any, a: any, { select, prisma }: Context) =>
  prisma.workout.findMany({
    where: {
      scope: 'PUBLIC',
    },
    select,
  })

const privateWorkouts = async (
  r: any,
  { authedUserId }: QueryPrivateWorkoutsArgs,
  { select, prisma }: Context,
) =>
  prisma.workout.findMany({
    where: {
      AND: [{ createdBy: { id: authedUserId } }, { scope: 'PRIVATE' }],
    },
    select,
  })

const workoutById = async (
  r: any,
  { workoutId }: QueryWorkoutByIdArgs,
  { select, prisma }: Context,
) =>
  prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    select,
  })

//// Mutations ////
const createWorkout = async (
  r: any,
  { authedUserId, data }: MutationCreateWorkoutArgs,
  { select, prisma }: Context,
) =>
  prisma.workout.create({
    data: {
      ...data,
      workoutSections: {
        create: buildWorkoutSectionsData(data.workoutSections),
      },
      workoutType: {
        connect: { id: data.workoutType || undefined },
      },
      createdBy: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const deepUpdateWorkout = async (
  r: any,
  { authedUserId, data }: MutationDeepUpdateWorkoutArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutMediaForDeletion(prisma, data)

  // 1. Delete all descendants - this will delete all workoutSections and their workoutMoves via cascade deletes.
  // https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'WorkoutSection',
    where: { workoutId: data.id },
    deleteParent: true, // If false, just the descendants will be deleted.
  })

  // 2. Run the new update and create fresh descendants.
  const updatedWorkout: Workout = await prisma.workout.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      workoutSections: {
        create: buildWorkoutSectionsData(data.workoutSections),
      },
      workoutType: {
        connect: { id: data.workoutType || undefined },
      },
    },
    select,
  })

  // Delete stale media from server if update was successful and media has changed.
  if (updatedWorkout && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }

  return updatedWorkout
}

const shallowUpdateWorkout = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateWorkoutArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutMediaForDeletion(prisma, data)

  // 1. Update workout.
  const updatedWorkout: Workout = await prisma.workout.update({
    where: {
      id: data.id,
    },
    data,
    select,
  })

  if (updatedWorkout && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }

  return updatedWorkout
}

const deleteWorkoutById = async (
  r: any,
  { authedUserId, workoutId }: MutationDeleteWorkoutByIdArgs,
  { prisma }: Context,
) => {
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'Workout',
    where: { id: workoutId },
    deleteParent: false, // If false, just the descendants will be deleted.
  })

  // Delete workout and get back uploaded media related files.
  const deletedWorkout: Workout = await prisma.workout.delete({
    where: { id: workoutId },
    select: {
      id: true,
      imageUrl: true,
      demoVideoUrl: true,
      demoVideoThumbUrl: true,
    },
  })

  // Check if there is media to be deleted from the uploadcare server.
  if (deletedWorkout) {
    const fileIdsForDeletion: string[] = []
    if (deletedWorkout.imageUrl) {
      fileIdsForDeletion.push(deletedWorkout.imageUrl)
    }
    if (deletedWorkout.demoVideoUrl) {
      fileIdsForDeletion.push(deletedWorkout.demoVideoUrl)
    }
    if (deletedWorkout.demoVideoThumbUrl) {
      fileIdsForDeletion.push(deletedWorkout.demoVideoThumbUrl)
    }
    if (fileIdsForDeletion.length > 0) {
      await deleteFiles(fileIdsForDeletion)
    }
    return deletedWorkout.id
  } else {
    return null
  }
}

export {
  officialWorkouts,
  publicWorkouts,
  privateWorkouts,
  workoutById,
  createWorkout,
  deepUpdateWorkout,
  shallowUpdateWorkout,
  deleteWorkoutById,
}

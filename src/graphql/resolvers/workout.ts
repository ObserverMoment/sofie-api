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

import {
  checkThenDeleteWorkoutImageFile,
  checkThenDeleteWorkoutVideoFiles,
  checkWorkoutMediaForDeletion,
} from '../../uploadcare'

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
  { id }: QueryWorkoutByIdArgs,
  { select, prisma }: Context,
) =>
  prisma.workout.findOne({
    where: {
      id,
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
  // 1. Delete all descendants - this will delete all workoutMoves via cascade deletes.
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

  if (updatedWorkout) {
    // 3. Check media deletion last once we know that full transactional update is completed.
    await checkWorkoutMediaForDeletion(prisma, data)
  }

  // 3. Update and rebuild new object.
  return updatedWorkout
}

const shallowUpdateWorkout = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateWorkoutArgs,
  { select, prisma }: Context,
) => {
  // 1. Update workout.
  const updateWorkout: Workout = await prisma.workout.update({
    where: {
      id: data.id,
    },
    data,
    select,
  })

  // 2. Check media deletion once you know that the main transaction has succeeded.
  await checkWorkoutMediaForDeletion(prisma, data)

  return updateWorkout
}

const deleteWorkoutById = async (
  r: any,
  { authedUserId, workoutId }: MutationDeleteWorkoutByIdArgs,
  { prisma }: Context,
) => {
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  const deletedWorkout: Workout = await prisma.onDelete({
    model: 'Workout',
    where: { id: workoutId },
    deleteParent: true, // If false, just the descendants will be deleted.
    returnFields: {
      id: true,
      imageUrl: true,
      demoVideoUrl: true,
      demoVideoThumbUrl: true,
    },
  })

  if (deletedWorkout) {
    await checkThenDeleteWorkoutImageFile(prisma, deletedWorkout.imageUrl)
    await checkThenDeleteWorkoutVideoFiles(
      prisma,
      deletedWorkout.demoVideoUrl,
      deletedWorkout.demoVideoThumbUrl,
    )
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

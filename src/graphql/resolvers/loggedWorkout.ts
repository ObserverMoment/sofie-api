import { Context } from '../..'
import {
  LoggedWorkout,
  MutationCreateLoggedWorkoutArgs,
  MutationDeepUpdateLoggedWorkoutArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationShallowUpdateLoggedWorkoutArgs,
  QueryLoggedWorkoutsArgs,
} from '../../generated/graphql'
import {
  checkLoggedWorkoutMediaForDeletion,
  deleteFiles,
} from '../../uploadcare'
import { buildWorkoutSectionsData } from '../workoutBuilders'

//// Queries
const loggedWorkouts = async (
  r: any,
  { authedUserId }: QueryLoggedWorkoutsArgs,
  { select, prisma }: Context,
) =>
  prisma.loggedWorkout.findMany({
    where: {
      completedBy: { id: authedUserId },
    },
    select,
  })

//// Mutations
const createLoggedWorkout = async (
  r: any,
  { authedUserId, data }: MutationCreateLoggedWorkoutArgs,
  { select, prisma }: Context,
) =>
  prisma.loggedWorkout.create({
    data: {
      ...data,
      completedBy: {
        connect: {
          id: authedUserId,
        },
      },
      workoutType: {
        connect: { id: data.workoutType },
      },
      gymProfile: data.gymProfile
        ? {
            connect: { id: data.gymProfile },
          }
        : undefined,
      workoutSections: {
        create: buildWorkoutSectionsData(data.workoutSections),
      },
      originalWorkout: {
        connect: { id: data.originalWorkout },
      },
    },
    select,
  })

const deepUpdateLoggedWorkout = async (
  r: any,
  { authedUserId, data }: MutationDeepUpdateLoggedWorkoutArgs,
  { select, prisma }: Context,
) => {
  // 1. Delete all descendants - this will delete all workoutMoves via cascade deletes.
  // https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'WorkoutSection',
    where: { loggedWorkoutId: data.id },
    deleteParent: true, // If false, just the descendants will be deleted.
  })

  // 2. Run the new update and create fresh descendants.
  const updatedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        gymProfile: data.gymProfile
          ? {
              connect: { id: data.gymProfile },
            }
          : undefined,
        workoutSections: {
          create: buildWorkoutSectionsData(data.workoutSections),
        },
      },
      select,
    },
  )

  // 3. Check for media deletion last - once you know that the rest of the transaction has been successful.
  if (updatedLoggedWorkout) {
    await checkLoggedWorkoutMediaForDeletion(prisma, data)
  }

  return updatedLoggedWorkout
}

const shallowUpdateLoggedWorkout = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateLoggedWorkoutArgs,
  { select, prisma }: Context,
) => {
  // 2. Run the new update and create fresh descendants.
  const updatedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        gymProfile: data.gymProfile
          ? {
              connect: { id: data.gymProfile },
            }
          : undefined,
      },
      select,
    },
  )

  // 3. Check for media deletion last - once you know that the rest of the transaction has been successful.
  if (updatedLoggedWorkout) {
    await checkLoggedWorkoutMediaForDeletion(prisma, data)
  }

  return updatedLoggedWorkout
}

const deleteLoggedWorkoutById = async (
  r: any,
  { authedUserId, loggedWorkoutId }: MutationDeleteLoggedWorkoutByIdArgs,
  { prisma }: Context,
) => {
  // https://github.com/paljs/prisma-tools/issues/152
  // Get the workout first before deleting in - you will need access to the media fields to check them for deletion once the main delete is completed.
  // This can be removed once the above issue is resolved.
  const loggedWorkoutForDeletion: LoggedWorkout = await prisma.loggedWorkout.findOne(
    {
      where: { id: loggedWorkoutId },
    },
  )

  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  // This is currently returning null...
  // https://github.com/paljs/prisma-tools/issues/152
  const deletedLoggedWorkout: LoggedWorkout = await prisma.onDelete({
    model: 'LoggedWorkout',
    where: { id: loggedWorkoutId },
    deleteParent: true, // If false, just the descendants will be deleted.
  })

  // Once the above issue is resolved - replace this with the original media check below.
  await deleteFiles([
    loggedWorkoutForDeletion.videoUrl,
    loggedWorkoutForDeletion.videoThumbUrl,
  ] as string[])
  await deleteFiles([loggedWorkoutForDeletion.imageUrl] as string[])

  // // Remove any media on the server.
  // if (deletedLoggedWorkout.videoUrl) {
  //   await deleteFiles([
  //     deletedLoggedWorkout.videoUrl,
  //     deletedLoggedWorkout.videoThumbUrl,
  //   ] as string[])
  // }

  // if (deletedLoggedWorkout.imageUrl) {
  //   await deleteFiles([deletedLoggedWorkout.imageUrl] as string[])
  // }

  return loggedWorkoutForDeletion.id
}

export {
  loggedWorkouts,
  createLoggedWorkout,
  deepUpdateLoggedWorkout,
  shallowUpdateLoggedWorkout,
  deleteLoggedWorkoutById,
}

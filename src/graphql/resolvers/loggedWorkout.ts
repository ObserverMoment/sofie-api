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
      workoutSections: {
        create: buildWorkoutSectionsData(data.workoutSections),
      },
      originalWorkout: {
        connect: { id: data.originalWorkout },
      },
      gymProfile: data.gymProfile
        ? {
            connect: { id: data.gymProfile },
          }
        : undefined,
      scheduledWorkout: data.scheduledWorkout
        ? {
            connect: { id: data.scheduledWorkout },
          }
        : undefined,
      // Connect to the enrolment (single instance of a user being enrolled in a plan)
      // And to the specific session (via workoutProgramWorkout) within the program.
      workoutProgramEnrolment: data.workoutProgramEnrolment
        ? {
            connect: { id: data.workoutProgramEnrolment },
          }
        : undefined,
      workoutProgramWorkout: data.workoutProgramWorkout
        ? {
            connect: { id: data.workoutProgramWorkout },
          }
        : undefined,
    },
    select,
  })

const deepUpdateLoggedWorkout = async (
  r: any,
  { authedUserId, data }: MutationDeepUpdateLoggedWorkoutArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkLoggedWorkoutMediaForDeletion(prisma, data)

  // Delete all descendants - this will delete all workoutSections and their workoutMoves via cascade deletes.
  // https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'WorkoutSection',
    where: { loggedWorkoutId: data.id },
    deleteParent: true, // If false, just the descendants will be deleted.
  })

  // Run the new update and create fresh descendants.
  const updatedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        workoutSections: {
          create: buildWorkoutSectionsData(data.workoutSections),
        },
        gymProfile: data.gymProfile
          ? {
              connect: { id: data.gymProfile },
            }
          : undefined,
        scheduledWorkout: data.scheduledWorkout
          ? {
              connect: { id: data.scheduledWorkout },
            }
          : undefined,
        workoutProgramWorkout: data.workoutProgramWorkout
          ? {
              connect: { id: data.workoutProgramWorkout },
            }
          : undefined,
      },
      select,
    },
  )

  // Delete stale media from server if update was successful and media has changed.
  if (updatedLoggedWorkout && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }

  return updatedLoggedWorkout
}

const shallowUpdateLoggedWorkout = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateLoggedWorkoutArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkLoggedWorkoutMediaForDeletion(prisma, data)

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
        scheduledWorkout: data.scheduledWorkout
          ? {
              connect: { id: data.scheduledWorkout },
            }
          : undefined,
        workoutProgramWorkout: data.workoutProgramWorkout
          ? {
              connect: { id: data.workoutProgramWorkout },
            }
          : undefined,
      },
      select,
    },
  )

  if (updatedLoggedWorkout && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }

  return updatedLoggedWorkout
}

const deleteLoggedWorkoutById = async (
  r: any,
  { authedUserId, loggedWorkoutId }: MutationDeleteLoggedWorkoutByIdArgs,
  { prisma }: Context,
) => {
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'LoggedWorkout',
    where: { id: loggedWorkoutId },
    deleteParent: false, // If false, just the descendants will be deleted.
  })

  // Delete workout and get back uploaded media related files.
  const deletedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.delete(
    {
      where: { id: loggedWorkoutId },
      select: {
        id: true,
        imageUrl: true,
        videoUrl: true,
        videoThumbUrl: true,
      },
    },
  )

  // Check if there is media to be deleted from the uploadcare server.
  if (deletedLoggedWorkout) {
    const fileIdsForDeletion: string[] = []
    if (deletedLoggedWorkout.imageUrl) {
      fileIdsForDeletion.push(deletedLoggedWorkout.imageUrl)
    }
    if (deletedLoggedWorkout.videoUrl) {
      fileIdsForDeletion.push(deletedLoggedWorkout.videoUrl)
    }
    if (deletedLoggedWorkout.videoThumbUrl) {
      fileIdsForDeletion.push(deletedLoggedWorkout.videoThumbUrl)
    }
    if (fileIdsForDeletion.length > 0) {
      await deleteFiles(fileIdsForDeletion)
    }
    return deletedLoggedWorkout.id
  } else {
    return null
  }
}

export {
  loggedWorkouts,
  createLoggedWorkout,
  deepUpdateLoggedWorkout,
  shallowUpdateLoggedWorkout,
  deleteLoggedWorkoutById,
}

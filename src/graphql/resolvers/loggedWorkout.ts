import { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server'
import { Context } from '../..'
import {
  CreateLoggedWorkoutInput,
  LoggedWorkout,
  MutationCreateLoggedWorkoutArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationUpdateLoggedWorkoutArgs,
  UpdateLoggedWorkoutInput,
} from '../../generated/graphql'
import {
  checkLoggedWorkoutMediaForDeletion,
  deleteFiles,
} from '../../uploadcare'
import { buildLoggedWorkoutSectionsData } from '../workoutBuilders'

//// Queries
const loggedWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.loggedWorkout.findMany({
    where: {
      User: { id: authedUserId },
    },
    select,
  })

//// Mutations
const createLoggedWorkout = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  validateLoggedWorkoutInput(data)
  const input: Prisma.LoggedWorkoutCreateInput = {
    ...data,
    User: {
      connect: {
        id: authedUserId,
      },
    },
    LoggedWorkoutSections: {
      create: buildLoggedWorkoutSectionsData(data.LoggedWorkoutSections),
    },
    Workout: {
      connect: { id: data.Workout },
    },
    GymProfile: {
      connect: { id: data.GymProfile || undefined },
    },
    ScheduledWorkout: {
      connect: { id: data.ScheduledWorkout || undefined },
    },
    // Connect to the enrolment (single instance of a user being enrolled in a plan)
    // And to the specific session (via workoutProgramWorkout) within the program.
    WorkoutProgramEnrolment: {
      connect: { id: data.WorkoutProgramEnrolment || undefined },
    },
    WorkoutProgramWorkout: {
      connect: { id: data.WorkoutProgramWorkout || undefined },
    },
  }
  return prisma.loggedWorkout.create({
    data: input,
    select,
  })
}

const updateLoggedWorkout = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  validateLoggedWorkoutInput(data)
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkLoggedWorkoutMediaForDeletion(prisma, data)

  if (data.LoggedWorkoutSections) {
    // Deep update required
    // Delete all descendants - this will delete all loggedWorkoutSections, their sets and their workoutMoves via cascade deletes.
    // https://paljs.com/plugins/delete/
    await prisma.onDelete({
      model: 'LoggedWorkoutSection',
      where: {
        loggedWorkoutId: data.id,
        LoggedWorkout: { userId: authedUserId },
      },
      deleteParent: true, // If false, just the descendants will be deleted.
    })
  }

  // Run the new update and create fresh descendants.
  const updatedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.update(
    {
      where: {
        id: data.id,
        userId: authedUserId,
      },
      data: {
        ...data,
        LoggedWorkoutSections: data.LoggedWorkoutSections
          ? {
              create: buildLoggedWorkoutSectionsData(
                data.LoggedWorkoutSections,
              ),
            }
          : undefined,
        GymProfile: {
          connect: { id: data.GymProfile || undefined },
        },
        ScheduledWorkout: {
          connect: { id: data.ScheduledWorkout || undefined },
        },
        // Connect to the enrolment (single instance of a user being enrolled in a plan)
        // And to the specific session (via workoutProgramWorkout) within the program.
        WorkoutProgramEnrolment: {
          connect: { id: data.WorkoutProgramEnrolment || undefined },
        },
        WorkoutProgramWorkout: {
          connect: { id: data.WorkoutProgramWorkout || undefined },
        },
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

const deleteLoggedWorkoutById = async (
  r: any,
  { loggedWorkoutId }: MutationDeleteLoggedWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'LoggedWorkout',
    where: { id: loggedWorkoutId, User: { id: authedUserId } },
    deleteParent: false, // If false, just the descendants will be deleted.
  })

  // Delete workout and get back uploaded media related files.
  const deletedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.delete(
    {
      where: { id: loggedWorkoutId, User: { id: authedUserId } },
      select: {
        id: true,
        imageUri: true,
        videoUri: true,
        videoThumbUri: true,
      },
    },
  )

  const fileIdsForDeletion: string[] = [
    deletedLoggedWorkout.videoUri,
    deletedLoggedWorkout.videoThumbUri,
    deletedLoggedWorkout.imageUri,
  ].filter((x) => !!x) as string[]

  // Check if there is media to be deleted from the uploadcare server.
  if (deletedLoggedWorkout) {
    if (fileIdsForDeletion.length > 0) {
      await deleteFiles(fileIdsForDeletion)
    }
    return deletedLoggedWorkout.id
  } else {
    return null
  }
}

//// Input validation ////
/**
 * LoggedWorkoutMove Validation
 */
function validateLoggedWorkoutInput(
  data: CreateLoggedWorkoutInput | UpdateLoggedWorkoutInput,
) {
  // Check all logged workout moves for valid inputs
  if (
    data.LoggedWorkoutSections &&
    data.LoggedWorkoutSections.some((section) =>
      section.LoggedWorkoutSets.some((set) =>
        set.LoggedWorkoutMoves.some(
          (workoutMove) =>
            (workoutMove.repType === 'DISTANCE' && !workoutMove.distanceUnit) ||
            (workoutMove.loadAmount && !workoutMove.loadUnit),
        ),
      ),
    )
  ) {
    throw new ApolloError(
      'Invalid loggedWorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
    )
  }
}

export {
  loggedWorkouts,
  createLoggedWorkout,
  updateLoggedWorkout,
  deleteLoggedWorkoutById,
}

import { WorkoutProgramWorkout } from '@prisma/client'
import { Context } from '../..'
import {
  CreateWorkoutProgramWorkoutInput,
  MutationAddEnrolmentToWorkoutProgramArgs,
  MutationCreateWorkoutProgramArgs,
  MutationDeleteWorkoutProgramByIdArgs,
  MutationRemoveEnrolmentFromWorkoutProgramArgs,
  MutationUpdateWorkoutProgramArgs,
  QueryUserWorkoutProgramEnrolmentsArgs,
  QueryWorkoutProgramByIdArgs,
  UpdateWorkoutProgramInput,
  UpdateWorkoutProgramWorkoutInput,
  WorkoutProgram,
} from '../../generated/graphql'
import {
  checkWorkoutProgramMediaForDeletion,
  deleteFiles,
} from '../../uploadcare'

//// Queries
const officialWorkoutPrograms = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: { scope: 'OFFICIAL' },
    select,
  })

const publicWorkoutPrograms = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: { scope: 'PUBLIC' },
    select,
  })

const userWorkoutPrograms = async (
  r: any,
  a: any,
  { authedUserId, prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: {
      Creator: { id: authedUserId },
    },
    select,
  })

const workoutProgramById = async (
  r: any,
  { workoutProgramId }: QueryWorkoutProgramByIdArgs,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findUnique({
    where: { id: workoutProgramId },
    select,
  })

// Gets all a users enrolments for a given workoutProgram.
// Users can enrol in a plan multiple times if they want.
const userWorkoutProgramEnrolments = async (
  r: any,
  { workoutProgramId }: QueryUserWorkoutProgramEnrolmentsArgs,
  { authedUserId, prisma, select }: Context,
) =>
  prisma.workoutProgramEnrolment.findMany({
    where: {
      User: { id: authedUserId },
      WorkoutProgram: { id: workoutProgramId },
    },
    select,
  })

//// Mutations
const createWorkoutProgram = async (
  r: any,
  { data }: MutationCreateWorkoutProgramArgs,
  { authedUserId, select, prisma }: Context,
) => {
  return prisma.workoutProgram.create({
    data: {
      ...data,
      Creator: {
        connect: { id: authedUserId },
      },
      workoutGoals: {
        connect: data.WorkoutGoals
          ? data.WorkoutGoals.map((id) => ({ id }))
          : [],
      },
      workoutProgramWorkouts: {
        create: data.WorkoutProgramWorkouts.map((pw) => ({
          ...pw,
          Workout: {
            connect: { id: pw.Workout },
          },
        })),
      },
    },
    select,
  })
}

// For deepUpdateWorkoutProgram resolver. Segment workoutProgramWorkout inputs by process type depending on prior existence in the DB.
interface WorkoutProgramWorkoutUpdates {
  create: CreateWorkoutProgramWorkoutInput[]
  update: UpdateWorkoutProgramWorkoutInput[]
  delete: string[]
}

//// Main Resolver - Can run a deep or a shallow update depending on which fields are provided.
const updateWorkoutProgram = async (
  r: any,
  { data }: MutationUpdateWorkoutProgramArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutProgramMediaForDeletion(prisma, data)

  if (data.WorkoutProgramWorkouts) {
    // Deep update
    return deepUpdateWorkoutProgram(data, prisma, select, fileIdsForDeletion)
  } else {
    return shallowUpdateWorkoutProgram(data, prisma, select, fileIdsForDeletion)
  }
}

const deepUpdateWorkoutProgram = async (
  data: UpdateWorkoutProgramInput,
  prisma: any,
  select: any,
  fileIdsForDeletion: string[] | null,
) => {
  // Check which workoutProgramWorkouts existed prior to this update.
  const previousWorkoutProgramWorkoutIds: string[] = (
    await prisma.workoutProgramWorkout.findMany({
      where: {
        workoutProgramId: data.id,
      },
      select: {
        id: true,
      },
    })
  ).map((wpw: WorkoutProgramWorkout) => wpw.id)

  // Double check workoutprogramWorkouts exists and if not return and empty update object.
  const wpwUpdates: WorkoutProgramWorkoutUpdates = data.WorkoutProgramWorkouts
    ? data.WorkoutProgramWorkouts.reduce(
        (
          acum: WorkoutProgramWorkoutUpdates,
          nextWpw: UpdateWorkoutProgramWorkoutInput,
        ) => {
          if (
            nextWpw.id &&
            previousWorkoutProgramWorkoutIds.includes(nextWpw.id)
          ) {
            // Remove the id from list of wpws that need to be deleted.
            // i.e. old wpw idss that are not found in the updated array.
            acum.delete = acum.delete.filter((id) => id != nextWpw.id)
            // update required
            acum.update.push(nextWpw)
          } else if (!nextWpw.id) {
            // New wpws that are to be created will not have ids - this field will be null.
            // create required
            // Remove the null id field so it does not error when prisma call is made.
            delete nextWpw.id
            acum.create.push(nextWpw)
          }
          return acum
        },
        {
          create: [],
          update: [],
          delete: previousWorkoutProgramWorkoutIds, // Start with the full previous list of ids and then remove any that are included in the update data.
        } as WorkoutProgramWorkoutUpdates,
      )
    : { create: [], update: [], delete: [] }

  const updatedWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        workoutGoals: {
          set: data.WorkoutGoals ? data.WorkoutGoals.map((id) => ({ id })) : [],
        },
        workoutProgramWorkouts: data.WorkoutProgramWorkouts
          ? {
              create: wpwUpdates.create.map((pw) => ({
                ...pw,
                workout: {
                  connect: { id: pw.Workout },
                },
              })),
              update: wpwUpdates.update.map((pw) => ({
                where: { id: pw.id },
                data: {
                  ...pw,
                  workout: {
                    connect: { id: pw.Workout },
                  },
                },
              })),
              delete: wpwUpdates.delete.map((id) => ({ id })),
            }
          : null,
      },
      select,
    },
  )

  // Delete stale media from server if update was successful and media has changed.
  if (updatedWorkoutProgram && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }

  return updatedWorkoutProgram
}

const shallowUpdateWorkoutProgram = async (
  data: UpdateWorkoutProgramInput,
  prisma: any,
  select: any,
  fileIdsForDeletion: string[] | null,
) => {
  const updatedWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        workoutGoals: {
          set: data.WorkoutGoals ? data.WorkoutGoals.map((id) => ({ id })) : [],
        },
      },
      select,
    },
  )

  if (updatedWorkoutProgram && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }

  return updatedWorkoutProgram
}

const deleteWorkoutProgramById = async (
  r: any,
  { workoutProgramId }: MutationDeleteWorkoutProgramByIdArgs,
  { prisma }: Context,
) => {
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'WorkoutProgram',
    where: { id: workoutProgramId },
    deleteParent: false, // If false, just the descendants will be deleted.
  })

  // Delete workoutProgram and get back uploaded media related files.
  const deletedWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.delete(
    {
      where: { id: workoutProgramId },
      select: {
        id: true,
        imageUri: true,
        videoUri: true,
        videoThumbUri: true,
      },
    },
  )

  // Check if there is media to be deleted from the uploadcare server.
  if (deletedWorkoutProgram) {
    const fileIdsForDeletion: string[] = []
    if (deletedWorkoutProgram.coverImageUri) {
      fileIdsForDeletion.push(deletedWorkoutProgram.coverImageUri)
    }
    if (deletedWorkoutProgram.introVideoUri) {
      fileIdsForDeletion.push(deletedWorkoutProgram.introVideoUri)
    }
    if (deletedWorkoutProgram.introVideoThumbUri) {
      fileIdsForDeletion.push(deletedWorkoutProgram.introVideoThumbUri)
    }
    if (fileIdsForDeletion.length > 0) {
      await deleteFiles(fileIdsForDeletion)
    }
    return deletedWorkoutProgram.id
  } else {
    return null
  }
}

//// Enrolments ////
const addEnrolmentToWorkoutProgram = async (
  r: any,
  { workoutProgramId }: MutationAddEnrolmentToWorkoutProgramArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.workoutProgram.update({
    where: { id: workoutProgramId },
    data: {
      enrolments: {
        create: {
          user: {
            connect: { id: authedUserId },
          },
        },
      },
    },
    select,
  })

const removeEnrolmentFromWorkoutProgram = async (
  r: any,
  {
    workoutProgramId,
    workoutProgramEnrolmentId,
  }: MutationRemoveEnrolmentFromWorkoutProgramArgs,
  { select, prisma }: Context,
) => {
  await prisma.workoutProgramEnrolment.delete({
    where: {
      id: workoutProgramEnrolmentId,
    },
  })

  return prisma.workoutProgram.findUnique({
    where: { id: workoutProgramId },
    select,
  })
}

export {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  userWorkoutPrograms,
  workoutProgramById,
  userWorkoutProgramEnrolments,
  createWorkoutProgram,
  updateWorkoutProgram,
  deleteWorkoutProgramById,
  addEnrolmentToWorkoutProgram,
  removeEnrolmentFromWorkoutProgram,
}

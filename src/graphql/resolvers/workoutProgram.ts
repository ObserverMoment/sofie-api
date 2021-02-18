import { WorkoutProgramWorkout } from '@prisma/client'
import { Context } from '../..'
import {
  CreateWorkoutProgramWorkoutInput,
  MutationAddEnrolmentToWorkoutProgramArgs,
  MutationCreateWorkoutProgramArgs,
  MutationDeepUpdateWorkoutProgramArgs,
  MutationDeleteWorkoutProgramByIdArgs,
  MutationRemoveEnrolmentFromWorkoutProgramArgs,
  MutationShallowUpdateWorkoutProgramArgs,
  QueryUserWorkoutProgramEnrolmentsArgs,
  QueryWorkoutProgramByIdArgs,
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
      createdById: authedUserId,
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
      user: { id: authedUserId },
      workoutProgram: { id: workoutProgramId },
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
      createdBy: {
        connect: { id: authedUserId },
      },
      workoutGoals: {
        connect: data.workoutGoals.map((id) => ({ id })),
      },
      workoutProgramWorkouts: {
        create: data.workoutProgramWorkouts.map((pw) => ({
          ...pw,
          workout: {
            connect: { id: pw.workout },
          },
        })),
      },
    },
    select,
  })
}

// For deepUpdateWorkoutProgram resolver. Segment inputs by process type depending on prior existence in the DB.
interface WorkoutProgramWorkoutUpdates {
  create: CreateWorkoutProgramWorkoutInput[]
  update: UpdateWorkoutProgramWorkoutInput[]
  delete: string[]
}

const deepUpdateWorkoutProgram = async (
  r: any,
  { data }: MutationDeepUpdateWorkoutProgramArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutProgramMediaForDeletion(prisma, data)

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

  const wpwUpdates: WorkoutProgramWorkoutUpdates = data.workoutProgramWorkouts.reduce(
    (
      acum: WorkoutProgramWorkoutUpdates,
      nextWpw: UpdateWorkoutProgramWorkoutInput,
    ) => {
      if (nextWpw.id && previousWorkoutProgramWorkoutIds.includes(nextWpw.id)) {
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

  const updatedWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        workoutGoals: {
          set: data.workoutGoals.map((id) => ({ id })),
        },
        workoutProgramWorkouts: {
          create: wpwUpdates.create.map((pw) => ({
            ...pw,
            workout: {
              connect: { id: pw.workout },
            },
          })),
          update: wpwUpdates.update.map((pw) => ({
            where: { id: pw.id },
            data: {
              ...pw,
              workout: {
                connect: { id: pw.workout },
              },
            },
          })),
          delete: wpwUpdates.delete.map((id) => ({ id })),
        },
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
  r: any,
  { data }: MutationShallowUpdateWorkoutProgramArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutProgramMediaForDeletion(prisma, data)

  const updatedWorkoutProgram: WorkoutProgram = await prisma.workoutProgram.update(
    {
      where: {
        id: data.id,
      },
      data: {
        ...data,
        workoutGoals: {
          set: data.workoutGoals.map((id) => ({ id })),
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
        imageUrl: true,
        videoUrl: true,
        videoThumbUrl: true,
      },
    },
  )

  // Check if there is media to be deleted from the uploadcare server.
  if (deletedWorkoutProgram) {
    const fileIdsForDeletion: string[] = []
    if (deletedWorkoutProgram.imageUrl) {
      fileIdsForDeletion.push(deletedWorkoutProgram.imageUrl)
    }
    if (deletedWorkoutProgram.videoUrl) {
      fileIdsForDeletion.push(deletedWorkoutProgram.videoUrl)
    }
    if (deletedWorkoutProgram.videoThumbUrl) {
      fileIdsForDeletion.push(deletedWorkoutProgram.videoThumbUrl)
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
  deepUpdateWorkoutProgram,
  shallowUpdateWorkoutProgram,
  deleteWorkoutProgramById,
  addEnrolmentToWorkoutProgram,
  removeEnrolmentFromWorkoutProgram,
}

import { Context } from '../..'
import {
  MutationAddEnrolmentToWorkoutProgramArgs,
  MutationCreateWorkoutProgramArgs,
  MutationDeepUpdateWorkoutProgramArgs,
  MutationDeleteWorkoutProgramByIdArgs,
  MutationRemoveEnrolmentFromWorkoutProgramArgs,
  MutationShallowUpdateWorkoutProgramArgs,
  QueryPrivateWorkoutProgramsArgs,
  QueryWorkoutProgramByIdArgs,
  QueryWorkoutProgramEnrolmentsByUserArgs,
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

const privateWorkoutPrograms = async (
  r: any,
  { authedUserId }: QueryPrivateWorkoutProgramsArgs,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: {
      scope: 'PRIVATE',
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

// gets all a users enrolments for a given workoutProgram.
// Users can enrol in a plan multiple times if they want.
const workoutProgramEnrolmentsByUser = async (
  r: any,
  { authedUserId, workoutProgramId }: QueryWorkoutProgramEnrolmentsByUserArgs,
  { prisma, select }: Context,
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
  { authedUserId, data }: MutationCreateWorkoutProgramArgs,
  { select, prisma }: Context,
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

const deepUpdateWorkoutProgram = async (
  r: any,
  { authedUserId, data }: MutationDeepUpdateWorkoutProgramArgs,
  { select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutProgramMediaForDeletion(prisma, data)

  // 1. Delete all descendant WorkoutProgramWorkouts.
  // Not using cascade deletes here as that would also cause enrolments and reviews to be deleted.
  await prisma.workoutProgramWorkout.deleteMany({
    where: {
      workoutProgramId: data.id,
    },
  })

  // 2. Run the new update and create fresh descendants.
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
          create: data.workoutProgramWorkouts.map((pw) => ({
            ...pw,
            workout: {
              connect: { id: pw.workout },
            },
          })),
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
  { authedUserId, data }: MutationShallowUpdateWorkoutProgramArgs,
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
  { authedUserId, workoutProgramId }: MutationDeleteWorkoutProgramByIdArgs,
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
  { authedUserId, workoutProgramId }: MutationAddEnrolmentToWorkoutProgramArgs,
  { select, prisma }: Context,
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
    authedUserId,
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
  privateWorkoutPrograms,
  workoutProgramById,
  workoutProgramEnrolmentsByUser,
  createWorkoutProgram,
  deepUpdateWorkoutProgram,
  shallowUpdateWorkoutProgram,
  deleteWorkoutProgramById,
  addEnrolmentToWorkoutProgram,
  removeEnrolmentFromWorkoutProgram,
}

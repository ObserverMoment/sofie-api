import { Context } from '../..'
import {
  MutationCreateWorkoutProgramArgs,
  MutationDeepUpdateWorkoutProgramArgs,
  MutationDeleteWorkoutProgramByIdArgs,
  MutationShallowUpdateWorkoutProgramArgs,
  QueryPrivateWorkoutProgramsArgs,
  WorkoutProgram,
} from '../../generated/graphql'
import { checkWorkoutMediaForDeletion } from '../../uploadcare'

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
      programWorkouts: {
        create: data.programWorkouts.map((pw) => ({
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
  // 1. Delete all descendant WorkoutProgramWorkouts.
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
        programWorkouts: {
          create: data.programWorkouts.map((pw) => ({
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

  if (updatedWorkoutProgram) {
    // 3. Check media deletion last once we know that full transactional update is completed.
    console.log('TODO!!!!!')
    console.log(
      '// 3. Check media deletion last once we know that full transactional update is completed.',
    )
  }

  return updatedWorkoutProgram
}

const shallowUpdateWorkoutProgram = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateWorkoutProgramArgs,
  { select, prisma }: Context,
) => {
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

  if (updatedWorkoutProgram) {
    console.log('TODO!!!!!')
    console.log(
      'Check media deletion last once we know that full transactional update is completed.',
    )
  }

  return updatedWorkoutProgram
}

const deleteWorkoutProgramById = async (
  r: any,
  { authedUserId, workoutProgramId }: MutationDeleteWorkoutProgramByIdArgs,
  { prisma }: Context,
) => {
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  const deletedWorkoutProgram: WorkoutProgram = await prisma.onDelete({
    model: 'WorkoutProgram',
    where: { id: workoutProgramId },
    deleteParent: true, // If false, just the descendants will be deleted.
    returnFields: {
      id: true,
      imageUrl: true,
      videoUrl: true,
      videoThumbUrl: true,
    },
  })

  if (deletedWorkoutProgram) {
    console.log('TODO!!!!!')
    console.log(
      'Check media deletion last once we know that full transactional update is completed.',
    )
    return deletedWorkoutProgram.id
  } else {
    return null
  }
}

export {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  privateWorkoutPrograms,
  createWorkoutProgram,
  deepUpdateWorkoutProgram,
  shallowUpdateWorkoutProgram,
  deleteWorkoutProgramById,
}

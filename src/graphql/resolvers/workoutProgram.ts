import { Context } from '../..'
import {
  MutationCreateWorkoutProgramArgs,
  QueryPrivateWorkoutProgramsArgs,
} from '../../generated/graphql'

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

export {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  privateWorkoutPrograms,
  createWorkoutProgram,
}

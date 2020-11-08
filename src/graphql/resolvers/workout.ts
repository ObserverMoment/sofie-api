import {
  MutationCreateWorkoutArgs,
  MutationDeepUpdateWorkoutArgs,
  QueryPrivateWorkoutsArgs,
  QueryWorkoutByIdArgs,
} from '../../generated/graphql'

import { buildWorkoutSectionsData } from '../workoutBuilders'

import { Context } from '../../types'
import { checkWorkoutMediaForDeletion } from '../../uploadcare'

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
    },
    select,
  })

const deepUpdateWorkout = async (
  r: any,
  { authedUserId, data }: MutationDeepUpdateWorkoutArgs,
  { select, prisma }: Context,
) => {
  // 1. Check media deletion.
  await checkWorkoutMediaForDeletion(prisma, data)
  // 2. Delete all descendents - should delete all workoutMoves via cascade deletes.
  // https://paljs.com/plugins/delete/
  await prisma.workoutSection.deleteMany({
    where: {
      workout: {
        id: data.id,
      },
    },
  })
  // 3. Update and rebuild new object.
  return prisma.workout.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      workoutSections: {
        create: buildWorkoutSectionsData(data.workoutSections),
      },
    },
    select,
  })
}

export {
  officialWorkouts,
  publicWorkouts,
  privateWorkouts,
  workoutById,
  createWorkout,
  deepUpdateWorkout,
}

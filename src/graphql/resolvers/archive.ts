import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  Move,
  MutationArchiveCustomMoveByIdArgs,
  MutationArchiveWorkoutByIdArgs,
  MutationArchiveWorkoutPlanByIdArgs,
  MutationUnarchiveCustomMoveByIdArgs,
  MutationUnarchiveWorkoutByIdArgs,
  MutationUnarchiveWorkoutPlanByIdArgs,
  Workout,
  WorkoutPlan,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Workouts, Plans and Moves etc where archived = true ////
///////////////////
///// Queries /////
///////////////////
export const userArchivedWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const workouts = await prisma.workout.findMany({
    where: {
      userId: authedUserId,
      archived: true,
    },
    select,
  })

  return workouts as Workout[]
}

export const userArchivedWorkoutPlans = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      userId: authedUserId,
      archived: true,
    },
    select,
  })

  return workoutPlans as WorkoutPlan[]
}

export const userArchivedCustomMoves = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const customMoves = await prisma.move.findMany({
    where: {
      userId: authedUserId,
      archived: true,
      scope: 'CUSTOM',
    },
    select,
  })

  return customMoves as Move[]
}

/////////////////////
///// Mutations /////
/////////////////////
export const archiveWorkoutById = async (
  r: any,
  { id }: MutationArchiveWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workout', authedUserId, prisma)

  const archived = await prisma.workout.update({
    where: { id },
    data: { archived: true },
    select,
  })

  if (archived) {
    return archived as Workout
  } else {
    throw new ApolloError('archiveWorkoutById: There was an issue.')
  }
}

export const unarchiveWorkoutById = async (
  r: any,
  { id }: MutationUnarchiveWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workout', authedUserId, prisma)

  const unarchived = await prisma.workout.update({
    where: { id },
    data: { archived: false },
    select,
  })

  if (unarchived) {
    return unarchived as Workout
  } else {
    throw new ApolloError('unarchiveWorkoutById: There was an issue.')
  }
}

export const archiveWorkoutPlanById = async (
  r: any,
  { id }: MutationArchiveWorkoutPlanByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlan', authedUserId, prisma)

  const archived = await prisma.workoutPlan.update({
    where: { id },
    data: { archived: true },
    select,
  })

  if (archived) {
    return archived as WorkoutPlan
  } else {
    throw new ApolloError('archiveWorkoutPlanById: There was an issue.')
  }
}

export const unarchiveWorkoutPlanById = async (
  r: any,
  { id }: MutationUnarchiveWorkoutPlanByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlan', authedUserId, prisma)

  const unarchived = await prisma.workoutPlan.update({
    where: { id },
    data: { archived: false },
    select,
  })

  if (unarchived) {
    return unarchived as WorkoutPlan
  } else {
    throw new ApolloError('unarchiveWorkoutPlanById: There was an issue.')
  }
}

export const archiveCustomMoveById = async (
  r: any,
  { id }: MutationArchiveCustomMoveByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'move', authedUserId, prisma)

  const archived = await prisma.move.update({
    where: { id },
    data: { archived: true },
    select,
  })

  if (archived) {
    return archived as Move
  } else {
    throw new ApolloError('archiveCustomMoveById: There was an issue.')
  }
}

export const unarchiveCustomMoveById = async (
  r: any,
  { id }: MutationUnarchiveCustomMoveByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'move', authedUserId, prisma)

  const unarchived = await prisma.move.update({
    where: { id },
    data: { archived: false },
    select,
  })

  if (unarchived) {
    return unarchived as Move
  } else {
    throw new ApolloError('archiveCustomMoveById: There was an issue.')
  }
}

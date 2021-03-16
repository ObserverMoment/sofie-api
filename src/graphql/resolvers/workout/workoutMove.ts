import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutMoveArgs,
  MutationDeleteWorkoutMoveByIdArgs,
  MutationReorderWorkoutMovesArgs,
  MutationUpdateWorkoutMoveArgs,
  WorkoutMove,
} from '../../../generated/graphql'
import { checkUserOwnsObject, checkAndReorderObjects } from '../../utils'

export const createWorkoutMove = async (
  r: any,
  { data }: MutationCreateWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(data.WorkoutSet, 'workoutSet', authedUserId, prisma)

  const workoutMove = await prisma.workoutMove.create({
    data: {
      ...data,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      User: {
        connect: { id: authedUserId },
      },
      Move: { connect: { id: data.Move } },
      Equipment: { connect: { id: data.Equipment || undefined } },
    },
    select,
  })

  if (workoutMove) {
    return workoutMove as WorkoutMove
  } else {
    throw new ApolloError('createWorkoutMove: There was an issue.')
  }
}

export const updateWorkoutMove = async (
  r: any,
  { data }: MutationUpdateWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutMove', authedUserId, prisma)

  const updated = await prisma.workoutMove.update({
    where: { id: data.id },
    data: {
      ...data,
      repType: data.repType || undefined,
      reps: data.reps || undefined,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      Move: data.Move ? { connect: { id: data.Move } } : undefined,
      Equipment: data.Equipment
        ? { connect: { id: data.Equipment } }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutMove
  } else {
    throw new ApolloError('updateWorkoutMove: There was an issue.')
  }
}

export const deleteWorkoutMoveById = async (
  r: any,
  { id }: MutationDeleteWorkoutMoveByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutMove', authedUserId, prisma)

  const deleted = await prisma.workoutMove.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutMoveById: There was an issue.')
  }
}

export const reorderWorkoutMoves = async (
  r: any,
  { data }: MutationReorderWorkoutMovesArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: WorkoutMove[] = await checkAndReorderObjects<WorkoutMove>(
    data,
    'workoutMove',
    authedUserId,
    prisma,
    select,
  )

  if (updated) {
    return updated
  } else {
    throw new ApolloError('reorderWorkoutMoves: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutMoveArgs,
  MutationDeleteWorkoutMoveByIdArgs,
  MutationReorderWorkoutMovesArgs,
  MutationUpdateWorkoutMoveArgs,
  SortPositionUpdated,
  WorkoutMove,
} from '../../../generated/graphql'
import { checkUserOwnsObject, checkAndReorderObjects } from '../../utils'

export const createWorkoutMove = async (
  r: any,
  { data }: MutationCreateWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(
    data.WorkoutSet.id,
    'workoutSet',
    authedUserId,
    prisma,
  )

  // Update all sort orders for all other workout moves in the set.
  // Do this before creating the new workoutMove to avoid incorrectly adjusting its sortPosition after being created.
  try {
    // All workoutMoves with sortPosition greater than or equal to the new workoutMove will be affected.
    // When creating a new workoutMove at the end of the set this list will be empty.
    const affectedWorkoutMoves = await prisma.workoutMove.findMany({
      where: {
        workoutSetId: data.WorkoutSet.id,
        sortPosition: {
          gte: data.sortPosition,
        },
      },
      select: {
        id: true,
        sortPosition: true,
      },
    })

    await prisma.$transaction(
      affectedWorkoutMoves.map(({ id, sortPosition }) =>
        prisma.workoutSection.update({
          where: { id },
          data: {
            sortPosition: sortPosition + 1,
          },
        }),
      ),
    )
  } catch (e) {
    console.log(e)
    throw new ApolloError(
      'createWorkoutMove: There was an issue reordering the workout moves.',
    )
  }

  console.log(data.loadUnit)

  // Create the new workout move.
  // NOTE: Ideally this would be part of the above transaction so full rollback could occur in event of an error.
  const workoutMove = await prisma.workoutMove.create({
    data: {
      ...data,
      distanceUnit: data.distanceUnit || undefined,
      loadUnit: data.loadUnit || undefined,
      timeUnit: data.timeUnit || undefined,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSet: {
        connect: { id: data.WorkoutSet.id },
      },
      Move: { connect: { id: data.Move.id } },
      Equipment: data.Equipment
        ? { connect: { id: data.Equipment.id } }
        : undefined,
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
      timeUnit: data.timeUnit || undefined,
      loadAmount: data.loadAmount || undefined,
      Move: data.Move ? { connect: { id: data.Move.id } } : undefined,
      Equipment: data.Equipment
        ? { connect: { id: data.Equipment.id } }
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
    return updated.map((u) => ({
      id: u.id,
      sortPosition: u.sortPosition,
    })) as SortPositionUpdated[]
  } else {
    throw new ApolloError('reorderWorkoutMoves: There was an issue.')
  }
}

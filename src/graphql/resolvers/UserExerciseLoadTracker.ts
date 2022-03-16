import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  MutationCreateUserExerciseLoadTrackerArgs,
  MutationDeleteUserExerciseLoadTrackerArgs,
  UserExerciseLoadTracker,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userExerciseLoadTrackers = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const trackers = await prisma.userExerciseLoadTracker.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return trackers as UserExerciseLoadTracker[]
}

//// Mutations ////
export const createUserExerciseLoadTracker = async (
  r: any,
  { data }: MutationCreateUserExerciseLoadTrackerArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const tracker = await prisma.userExerciseLoadTracker.create({
    data: {
      ...data,
      Move: { connect: data.Move },
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
      User: { connect: { id: authedUserId } },
    },
    select,
  })

  if (tracker) {
    return tracker as UserExerciseLoadTracker
  } else {
    throw new ApolloError('createUserExerciseLoadTracker: There was an issue.')
  }
}

export const deleteUserExerciseLoadTracker = async (
  r: any,
  { id }: MutationDeleteUserExerciseLoadTrackerArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userExerciseLoadTracker', authedUserId, prisma)

  const deleted = await prisma.userExerciseLoadTracker.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteUserExerciseLoadTracker: There was an issue.')
  }
}

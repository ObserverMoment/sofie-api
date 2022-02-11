import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  MutationCreateUserGoalArgs,
  MutationDeleteUserGoalArgs,
  MutationUpdateUserGoalArgs,
  UserGoal,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

///// Queries //////
export const userGoals = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userGoals = await prisma.userGoal.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return userGoals as UserGoal[]
}

///// Mutations //////
export const createUserGoal = async (
  r: any,
  { data }: MutationCreateUserGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const goal = await prisma.userGoal.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (goal) {
    return goal as UserGoal
  } else {
    throw new ApolloError('createUserGoal: There was an issue.')
  }
}

export const updateUserGoal = async (
  r: any,
  { data }: MutationUpdateUserGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userGoal', authedUserId, prisma)

  const updated = await prisma.userGoal.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserGoal
  } else {
    throw new ApolloError('updateUserGoal: There was an issue.')
  }
}

export const deleteUserGoal = async (
  r: any,
  { id }: MutationDeleteUserGoalArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userGoal', authedUserId, prisma)

  const deleted = await prisma.userGoal.delete({
    where: { id },
  })

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteUserGoal: There was an issue.')
  }
}

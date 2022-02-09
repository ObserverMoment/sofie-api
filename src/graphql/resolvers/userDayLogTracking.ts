import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateUserDayLogMoodArgs,
  MutationDeleteUserDayLogMoodArgs,
  UserDayLogMood,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userDayLogMoods = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const moods = await prisma.userDayLogMood.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return moods as UserDayLogMood[]
}

//// Mutations ////
//// Moods ////
export const createUserDayLogMood = async (
  r: any,
  { data }: MutationCreateUserDayLogMoodArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const mood = await prisma.userDayLogMood.create({
    data: {
      ...data,
      tags: data.tags || undefined,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (mood) {
    return mood as UserDayLogMood
  } else {
    throw new ApolloError('createUserDayLogMood: There was an issue.')
  }
}

export const deleteUserDayLogMood = async (
  r: any,
  { id }: MutationDeleteUserDayLogMoodArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userDayLogMood', authedUserId, prisma)

  const updated = await prisma.userDayLogMood.delete({
    where: { id },
    select: { id: true },
  })

  if (updated) {
    return updated.id
  } else {
    throw new ApolloError('deleteUserDayLogMood: There was an issue.')
  }
}

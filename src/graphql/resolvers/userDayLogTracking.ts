import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateUserDayLogMoodArgs,
  MutationUpdateUserDayLogMoodArgs,
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

export const updateUserDayLogMood = async (
  r: any,
  { data }: MutationUpdateUserDayLogMoodArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userDayLogMood', authedUserId, prisma)

  const updated = await prisma.userDayLogMood.update({
    where: { id: data.id },
    data: {
      ...data,
      moodScore: data.moodScore || undefined,
      energyScore: data.energyScore || undefined,
      // Pass an empty array to clear the tags. Passing null will be ignored.
      tags:
        data.hasOwnProperty('tags') && data.tags !== null
          ? data.tags
          : undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserDayLogMood
  } else {
    throw new ApolloError('updateUserDayLogMood: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateUserDayLogArgs,
  MutationCreateUserDayLogMoodArgs,
  MutationCreateUserGoalArgs,
  MutationDeleteUserDayLogArgs,
  MutationDeleteUserDayLogMoodArgs,
  MutationDeleteUserGoalArgs,
  MutationUpdateUserDayLogArgs,
  MutationUpdateUserDayLogMoodArgs,
  MutationUpdateUserGoalArgs,
  UserDayLog,
  UserDayLogMood,
  UserGoal,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userDayLogs = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userDayLogs = await prisma.userDayLog.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return userDayLogs as UserDayLog[]
}

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

//// Mutations ////
//// UserDayLogs ////
export const createUserDayLog = async (
  r: any,
  { data }: MutationCreateUserDayLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const userDayLog = await prisma.userDayLog.create({
    data: {
      ...data,
      meditationMinutes: data.meditationMinutes || undefined,
      stretchingMinutes: data.stretchingMinutes || undefined,
      User: {
        connect: { id: authedUserId },
      },
      UserDayLogMood: data.UserDayLogMood
        ? {
            create: {
              ...data.UserDayLogMood,
              tags: data.UserDayLogMood.tags || undefined,
              User: {
                connect: { id: authedUserId },
              },
            },
          }
        : undefined,
    },
    select,
  })

  if (userDayLog) {
    return userDayLog as UserDayLog
  } else {
    throw new ApolloError('createUserDayLog: There was an issue.')
  }
}

export const updateUserDayLog = async (
  r: any,
  { data }: MutationUpdateUserDayLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userDayLog', authedUserId, prisma)

  const updated = await prisma.userDayLog.update({
    where: { id: data.id },
    data: {
      ...data,
      meditationMinutes: data.meditationMinutes || undefined,
      stretchingMinutes: data.stretchingMinutes || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserDayLog
  } else {
    throw new ApolloError('updateUserDayLog: There was an issue.')
  }
}

export const deleteUserDayLog = async (
  r: any,
  { id }: MutationDeleteUserDayLogArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userDayLog', authedUserId, prisma)

  const deleted = await prisma.userDayLog.delete({
    where: { id },
  })

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteUserDayLog: There was an issue.')
  }
}

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
      UserDayLog: {
        connect: data.UserDayLog,
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

export const deleteUserDayLogMood = async (
  r: any,
  { id }: MutationDeleteUserDayLogMoodArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userDayLogMood', authedUserId, prisma)

  const deleted = await prisma.userDayLogMood.delete({
    where: { id },
  })

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteUserDayLogMood: There was an issue.')
  }
}

//// Goals ////
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

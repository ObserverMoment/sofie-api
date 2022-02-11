import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateUserDayLogMoodArgs,
  MutationCreateUserEatWellLogArgs,
  MutationCreateUserMeditationLogArgs,
  MutationCreateUserSleepWellLogArgs,
  MutationDeleteUserDayLogMoodArgs,
  MutationUpdateUserEatWellLogArgs,
  MutationUpdateUserMeditationLogArgs,
  MutationUpdateUserSleepWellLogArgs,
  UserDayLogMood,
  UserEatWellLog,
  UserMeditationLog,
  UserSleepWellLog,
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

export const userEatWellLogs = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const logs = await prisma.userEatWellLog.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return logs as UserEatWellLog[]
}

export const userSleepWellLogs = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const logs = await prisma.userSleepWellLog.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return logs as UserSleepWellLog[]
}

export const userMeditationLogs = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const logs = await prisma.userMeditationLog.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return logs as UserMeditationLog[]
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

//// Meditations ////
export const createUserMeditationLog = async (
  r: any,
  { data }: MutationCreateUserMeditationLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const meditationLog = await prisma.userMeditationLog.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (meditationLog) {
    return meditationLog as UserMeditationLog
  } else {
    throw new ApolloError('createUserMeditationLog: There was an issue.')
  }
}

export const updateUserMeditationLog = async (
  r: any,
  { data }: MutationUpdateUserMeditationLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userMeditationLog', authedUserId, prisma)

  const updated = await prisma.userMeditationLog.update({
    where: { id: data.id },
    data: {
      ...data,
      minutesLogged: data.minutesLogged || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserMeditationLog
  } else {
    throw new ApolloError('updateUserMeditationLog: There was an issue.')
  }
}

//// UserEatWellLog ////
export const createUserEatWellLog = async (
  r: any,
  { data }: MutationCreateUserEatWellLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const eatWellLog = await prisma.userEatWellLog.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (eatWellLog) {
    return eatWellLog as UserEatWellLog
  } else {
    throw new ApolloError('createUserEatWellLog: There was an issue.')
  }
}

export const updateUserEatWellLog = async (
  r: any,
  { data }: MutationUpdateUserEatWellLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userEatWellLog', authedUserId, prisma)

  const updated = await prisma.userEatWellLog.update({
    where: { id: data.id },
    data: {
      ...data,
      rating: data.rating || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserEatWellLog
  } else {
    throw new ApolloError('updateUserEatWellLog: There was an issue.')
  }
}

//// UserSleepWellLog ////
export const createUserSleepWellLog = async (
  r: any,
  { data }: MutationCreateUserSleepWellLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const sleepWellLog = await prisma.userSleepWellLog.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (sleepWellLog) {
    return sleepWellLog as UserSleepWellLog
  } else {
    throw new ApolloError('createUserSleepWellLog: There was an issue.')
  }
}

export const updateUserSleepWellLog = async (
  r: any,
  { data }: MutationUpdateUserSleepWellLogArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userSleepWellLog', authedUserId, prisma)

  const updated = await prisma.userSleepWellLog.update({
    where: { id: data.id },
    data: {
      ...data,
      rating: data.rating || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserSleepWellLog
  } else {
    throw new ApolloError('updateUserSleepWellLog: There was an issue.')
  }
}

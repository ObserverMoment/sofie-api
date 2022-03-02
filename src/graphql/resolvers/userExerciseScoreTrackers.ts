import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  MutationCreateUserFastestTimeExerciseTrackerArgs,
  MutationCreateUserFastestTimeTrackerManualEntryArgs,
  MutationCreateUserMaxLoadExerciseTrackerArgs,
  MutationCreateUserMaxLoadTrackerManualEntryArgs,
  MutationCreateUserMaxUnbrokenExerciseTrackerArgs,
  MutationCreateUserMaxUnbrokenTrackerManualEntryArgs,
  MutationDeleteUserFastestTimeExerciseTrackerArgs,
  MutationDeleteUserFastestTimeTrackerManualEntryArgs,
  MutationDeleteUserMaxLoadExerciseTrackerArgs,
  MutationDeleteUserMaxLoadTrackerManualEntryArgs,
  MutationDeleteUserMaxUnbrokenExerciseTrackerArgs,
  MutationDeleteUserMaxUnbrokenTrackerManualEntryArgs,
  UserFastestTimeExerciseTracker,
  UserFastestTimeTrackerManualEntry,
  UserMaxLoadExerciseTracker,
  UserMaxLoadTrackerManualEntry,
  UserMaxUnbrokenExerciseTracker,
  UserMaxUnbrokenTrackerManualEntry,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userMaxLoadExerciseTrackers = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const trackers = await prisma.userMaxLoadExerciseTracker.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return trackers as UserMaxLoadExerciseTracker[]
}

export const userFastestTimeExerciseTrackers = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const trackers = await prisma.userFastestTimeExerciseTracker.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return trackers as UserFastestTimeExerciseTracker[]
}

export const userMaxUnbrokenExerciseTrackers = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const trackers = await prisma.userMaxUnbrokenExerciseTracker.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return trackers as UserMaxUnbrokenExerciseTracker[]
}

//// Mutations ////
export const createUserMaxLoadExerciseTracker = async (
  r: any,
  { data }: MutationCreateUserMaxLoadExerciseTrackerArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const tracker = await prisma.userMaxLoadExerciseTracker.create({
    data: {
      ...data,
      Move: { connect: data.Move },
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
      User: { connect: { id: authedUserId } },
    },
    select,
  })

  if (tracker) {
    return tracker as UserMaxLoadExerciseTracker
  } else {
    throw new ApolloError(
      'createUserMaxLoadExerciseTracker: There was an issue.',
    )
  }
}

export const deleteUserMaxLoadExerciseTracker = async (
  r: any,
  { id }: MutationDeleteUserMaxLoadExerciseTrackerArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userMaxLoadExerciseTracker',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userMaxLoadExerciseTracker.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteUserMaxLoadExerciseTracker: There was an issue.',
    )
  }
}

export const createUserFastestTimeExerciseTracker = async (
  r: any,
  { data }: MutationCreateUserFastestTimeExerciseTrackerArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const tracker = await prisma.userFastestTimeExerciseTracker.create({
    data: {
      ...data,
      Move: { connect: data.Move },
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
      User: { connect: { id: authedUserId } },
    },
    select,
  })

  if (tracker) {
    return tracker as UserFastestTimeExerciseTracker
  } else {
    throw new ApolloError(
      'createUserFastestTimeExerciseTracker: There was an issue.',
    )
  }
}

export const deleteUserFastestTimeExerciseTracker = async (
  r: any,
  { id }: MutationDeleteUserFastestTimeExerciseTrackerArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userFastestTimeExerciseTracker',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userFastestTimeExerciseTracker.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteUserFastestTimeExerciseTracker: There was an issue.',
    )
  }
}

export const createUserMaxUnbrokenExerciseTracker = async (
  r: any,
  { data }: MutationCreateUserMaxUnbrokenExerciseTrackerArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const tracker = await prisma.userMaxUnbrokenExerciseTracker.create({
    data: {
      ...data,
      Move: { connect: data.Move },
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
      User: { connect: { id: authedUserId } },
    },
    select,
  })

  if (tracker) {
    return tracker as UserMaxUnbrokenExerciseTracker
  } else {
    throw new ApolloError(
      'createUserMaxUnbrokenExerciseTracker: There was an issue.',
    )
  }
}

export const deleteUserMaxUnbrokenExerciseTracker = async (
  r: any,
  { id }: MutationDeleteUserMaxUnbrokenExerciseTrackerArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userMaxUnbrokenExerciseTracker',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userMaxUnbrokenExerciseTracker.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteUserMaxUnbrokenExerciseTracker: There was an issue.',
    )
  }
}

///// User Manual Entry CRUD for each tracker type /////
export const createUserMaxLoadTrackerManualEntry = async (
  r: any,
  { data }: MutationCreateUserMaxLoadTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.UserMaxLoadExerciseTracker.id,
    'userMaxLoadTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const entry = await prisma.userMaxLoadTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      UserMaxLoadExerciseTracker: { connect: data.UserMaxLoadExerciseTracker },
    },
    select,
  })

  if (entry) {
    return entry as UserMaxLoadTrackerManualEntry
  } else {
    throw new ApolloError(
      'createUserMaxLoadTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteUserMaxLoadTrackerManualEntry = async (
  r: any,
  { id }: MutationDeleteUserMaxLoadTrackerManualEntryArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userMaxLoadTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userMaxLoadTrackerManualEntry.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteUserMaxLoadTrackerManualEntry: There was an issue.',
    )
  }
}

export const createUserFastestTimeTrackerManualEntry = async (
  r: any,
  { data }: MutationCreateUserFastestTimeTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.UserFastestTimeExerciseTracker.id,
    'userFastestTimeTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const entry = await prisma.userFastestTimeTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      UserFastestTimeExerciseTracker: {
        connect: data.UserFastestTimeExerciseTracker,
      },
    },
    select,
  })

  if (entry) {
    return entry as UserFastestTimeTrackerManualEntry
  } else {
    throw new ApolloError(
      'createUserFastestTimeTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteUserFastestTimeTrackerManualEntry = async (
  r: any,
  { id }: MutationDeleteUserFastestTimeTrackerManualEntryArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userFastestTimeTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userFastestTimeTrackerManualEntry.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteUserFastestTimeTrackerManualEntry: There was an issue.',
    )
  }
}

export const createUserMaxUnbrokenTrackerManualEntry = async (
  r: any,
  { data }: MutationCreateUserMaxUnbrokenTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.UserMaxUnbrokenExerciseTracker.id,
    'userMaxUnbrokenTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const entry = await prisma.userMaxUnbrokenTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      UserMaxUnbrokenExerciseTracker: {
        connect: data.UserMaxUnbrokenExerciseTracker,
      },
    },
    select,
  })

  if (entry) {
    return entry as UserMaxUnbrokenTrackerManualEntry
  } else {
    throw new ApolloError(
      'createUserMaxUnbrokenTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteUserMaxUnbrokenTrackerManualEntry = async (
  r: any,
  { id }: MutationDeleteUserMaxUnbrokenTrackerManualEntryArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userMaxUnbrokenTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userMaxUnbrokenTrackerManualEntry.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteUserMaxUnbrokenTrackerManualEntry: There was an issue.',
    )
  }
}

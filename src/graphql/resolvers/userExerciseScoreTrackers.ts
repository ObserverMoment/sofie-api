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
import { deleteFiles } from '../../lib/uploadcare'
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
    'userMaxLoadExerciseTracker',
    authedUserId,
    prisma,
  )

  /// Create the new entry.
  await prisma.userMaxLoadTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      UserMaxLoadExerciseTracker: { connect: data.UserMaxLoadExerciseTracker },
    },
  })

  /// Get the updated parent.
  const tracker = await prisma.userMaxLoadExerciseTracker.findUnique({
    where: {
      id: data.UserMaxLoadExerciseTracker.id,
    },
    select,
  })

  if (tracker) {
    /// return the full updated parent.
    return tracker as UserMaxLoadExerciseTracker
  } else {
    throw new ApolloError(
      'createUserMaxLoadTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteUserMaxLoadTrackerManualEntry = async (
  r: any,
  { entryId, parentId }: MutationDeleteUserMaxLoadTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    entryId,
    'userMaxLoadTrackerManualEntry',
    authedUserId,
    prisma,
  )

  /// Delete the entry.
  const deleted = await prisma.userMaxLoadTrackerManualEntry.delete({
    where: {
      id: entryId,
    },
    select: { videoUri: true, videoThumbUri: true },
  })

  const filesTodelete = []
  if (deleted.videoUri) filesTodelete.push(deleted.videoUri)
  if (deleted.videoThumbUri) filesTodelete.push(deleted.videoThumbUri)

  /// Media clean up.
  if (filesTodelete.length) {
    await deleteFiles(filesTodelete)
  }

  /// Get the updated parent.
  const tracker = await prisma.userMaxLoadExerciseTracker.findUnique({
    where: {
      id: parentId,
    },
    select,
  })

  if (tracker) {
    /// return the full updated parent.
    return tracker as UserMaxLoadExerciseTracker
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
    'userFastestTimeExerciseTracker',
    authedUserId,
    prisma,
  )

  /// Create the new entry.
  await prisma.userFastestTimeTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      UserFastestTimeExerciseTracker: {
        connect: data.UserFastestTimeExerciseTracker,
      },
    },
  })

  /// Get the now updated parent.
  const tracker = await prisma.userFastestTimeExerciseTracker.findUnique({
    where: {
      id: data.UserFastestTimeExerciseTracker.id,
    },
    select,
  })

  if (tracker) {
    return tracker as UserFastestTimeExerciseTracker
  } else {
    throw new ApolloError(
      'createUserFastestTimeTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteUserFastestTimeTrackerManualEntry = async (
  r: any,
  { entryId, parentId }: MutationDeleteUserFastestTimeTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    entryId,
    'userFastestTimeTrackerManualEntry',
    authedUserId,
    prisma,
  )

  /// Delete the entry.
  const deleted = await prisma.userFastestTimeTrackerManualEntry.delete({
    where: {
      id: entryId,
    },
    select: { videoUri: true, videoThumbUri: true },
  })

  const filesTodelete = []
  if (deleted.videoUri) filesTodelete.push(deleted.videoUri)
  if (deleted.videoThumbUri) filesTodelete.push(deleted.videoThumbUri)

  /// Media clean up.
  if (filesTodelete.length) {
    await deleteFiles(filesTodelete)
  }

  /// Get the updated parent.
  const tracker = await prisma.userFastestTimeExerciseTracker.findUnique({
    where: {
      id: parentId,
    },
    select,
  })

  if (tracker) {
    return tracker as UserFastestTimeExerciseTracker
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
    'userMaxUnbrokenExerciseTracker',
    authedUserId,
    prisma,
  )

  /// Create the new entry.
  await prisma.userMaxUnbrokenTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      UserMaxUnbrokenExerciseTracker: {
        connect: data.UserMaxUnbrokenExerciseTracker,
      },
    },
  })

  /// Get the updated parent.
  const tracker = await prisma.userMaxUnbrokenExerciseTracker.findUnique({
    where: {
      id: data.UserMaxUnbrokenExerciseTracker.id,
    },
    select,
  })

  if (tracker) {
    return tracker as UserMaxUnbrokenExerciseTracker
  } else {
    throw new ApolloError(
      'createUserMaxUnbrokenTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteUserMaxUnbrokenTrackerManualEntry = async (
  r: any,
  { entryId, parentId }: MutationDeleteUserMaxUnbrokenTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    entryId,
    'userMaxUnbrokenTrackerManualEntry',
    authedUserId,
    prisma,
  )

  /// Delete the entry.
  const deleted = await prisma.userMaxUnbrokenTrackerManualEntry.delete({
    where: {
      id: entryId,
    },
    select: { videoUri: true, videoThumbUri: true },
  })

  const filesTodelete = []
  if (deleted.videoUri) filesTodelete.push(deleted.videoUri)
  if (deleted.videoThumbUri) filesTodelete.push(deleted.videoThumbUri)

  /// Media clean up.
  if (filesTodelete.length) {
    await deleteFiles(filesTodelete)
  }

  /// Get the updated parent.
  const tracker = await prisma.userMaxUnbrokenExerciseTracker.findUnique({
    where: {
      id: parentId,
    },
    select,
  })

  if (tracker) {
    return tracker as UserMaxUnbrokenExerciseTracker
  } else {
    throw new ApolloError(
      'deleteUserMaxUnbrokenTrackerManualEntry: There was an issue.',
    )
  }
}

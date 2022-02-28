import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  CreateWorkoutExerciseTrackerManualEntryInput,
  MutationCreateUserFastestTimeExerciseTrackerArgs,
  MutationCreateUserMaxLoadExerciseTrackerArgs,
  MutationCreateUserMaxUnbrokenExerciseTrackerArgs,
  MutationCreateUserScoredWorkoutTrackerArgs,
  MutationCreateWorkoutExerciseTrackerManualEntryArgs,
  MutationDeleteUserFastestTimeExerciseTrackerArgs,
  MutationDeleteUserMaxLoadExerciseTrackerArgs,
  MutationDeleteUserMaxUnbrokenExerciseTrackerArgs,
  MutationDeleteUserScoredWorkoutTrackerArgs,
  MutationDeleteWorkoutExerciseTrackerManualEntryArgs,
  UserFastestTimeExerciseTracker,
  UserMaxLoadExerciseTracker,
  UserMaxUnbrokenExerciseTracker,
  UserScoredWorkoutTracker,
  WorkoutExerciseTrackerManualEntry,
} from '../../generated/graphql'
import { checkUserOwnsObject, ContentObjectType } from '../utils'

//// Queries ////
export const userScoredWorkoutTrackers = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const trackers = await prisma.userScoredWorkoutTracker.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return trackers as UserScoredWorkoutTracker[]
}

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
export const createUserScoredWorkoutTracker = async (
  r: any,
  { data }: MutationCreateUserScoredWorkoutTrackerArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const tracker = await prisma.userScoredWorkoutTracker.create({
    data: {
      Workout: { connect: data.Workout },
      User: { connect: { id: authedUserId } },
    },
    select,
  })

  if (tracker) {
    return tracker as UserScoredWorkoutTracker
  } else {
    throw new ApolloError('createUserScoredWorkoutTracker: There was an issue.')
  }
}

export const deleteUserScoredWorkoutTracker = async (
  r: any,
  { id }: MutationDeleteUserScoredWorkoutTrackerArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'userScoredWorkoutTracker',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.userScoredWorkoutTracker.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteUserScoredWorkoutTracker: There was an issue.')
  }
}

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

///// User Manual Entry for any tracker type /////
export const createWorkoutExerciseTrackerManualEntry = async (
  r: any,
  { data }: MutationCreateWorkoutExerciseTrackerManualEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  /// Check that user is the owner of the parent ID being passed, and that only one parent is trying to be connected per call.
  await getParentTrackerIdAndCheckUserOwnership(authedUserId, data, prisma)

  const entry = await prisma.workoutExerciseTrackerManualEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      // Attach to a parent tracker. Only one of these (XOR) should ever be present.
      UserScoredWorkoutTracker: data.UserScoredWorkoutTracker
        ? { connect: data.UserScoredWorkoutTracker }
        : undefined,
      UserMaxLoadExerciseTracker: data.UserMaxLoadExerciseTracker
        ? { connect: data.UserMaxLoadExerciseTracker }
        : undefined,
      UserFastestTimeExerciseTracker: data.UserFastestTimeExerciseTracker
        ? { connect: data.UserFastestTimeExerciseTracker }
        : undefined,
      UserMaxUnbrokenExerciseTracker: data.UserMaxUnbrokenExerciseTracker
        ? { connect: data.UserMaxUnbrokenExerciseTracker }
        : undefined,
    },
    select,
  })

  if (entry) {
    return entry as WorkoutExerciseTrackerManualEntry
  } else {
    throw new ApolloError(
      'createWorkoutExerciseTrackerManualEntry: There was an issue.',
    )
  }
}

export const deleteWorkoutExerciseTrackerManualEntry = async (
  r: any,
  { id }: MutationDeleteWorkoutExerciseTrackerManualEntryArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    id,
    'workoutExerciseTrackerManualEntry',
    authedUserId,
    prisma,
  )

  const deleted = await prisma.workoutExerciseTrackerManualEntry.delete({
    where: {
      id,
    },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteWorkoutExerciseTrackerManualEntry: There was an issue.',
    )
  }
}

/////// Utils ///////
/// return [parentType, parentId]
export const getParentTrackerIdAndCheckUserOwnership = async (
  authedUserId: string,
  data: CreateWorkoutExerciseTrackerManualEntryInput,
  prisma: PrismaClient,
) => {
  /// One and only one of the following should be not null.
  const parentData = {
    userScoredWorkoutTracker: data.UserScoredWorkoutTracker,
    userMaxLoadExerciseTracker: data.UserMaxLoadExerciseTracker,
    userFastestTimeExerciseTracker: data.UserFastestTimeExerciseTracker,
    userMaxUnbrokenExerciseTracker: data.UserMaxUnbrokenExerciseTracker,
  }

  // Format of a tuple [PrismaType, ID]
  const parent = Object.entries(parentData)
    .filter(([_, v]) => v)
    .map(([k, v]) => [k, v!.id])

  if (parent.length !== 1) {
    throw new ApolloError(
      'Invalid parent tracker data: You must supply one, and only one, field for a connect relation object',
    )
  } else {
    const type = parent[0][0]
    const id = parent[0][1]
    /// Then check that the user owns the parent.
    await checkUserOwnsObject(
      id,
      type as ContentObjectType,
      authedUserId,
      prisma,
    )
  }
}

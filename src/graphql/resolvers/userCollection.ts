import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationAddWorkoutPlanToCollectionArgs,
  MutationAddWorkoutToCollectionArgs,
  MutationCreateUserCollectionArgs,
  MutationDeleteUserCollectionByIdArgs,
  MutationRemoveWorkoutFromCollectionArgs,
  MutationRemoveWorkoutPlanFromCollectionArgs,
  MutationUpdateUserCollectionArgs,
  QueryUserCollectionByIdArgs,
  UserCollection,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userCollections = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userCollections = await prisma.userCollection.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return userCollections as UserCollection[]
}

export const userCollectionById = async (
  r: any,
  { id }: QueryUserCollectionByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const userCollection = await prisma.userCollection.findFirst({
    where: {
      id: id,
      userId: authedUserId,
    },
    select,
  })
  return userCollection as UserCollection
}

//// Mutations ////
export const createUserCollection = async (
  r: any,
  { data }: MutationCreateUserCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const userCollection = await prisma.userCollection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (userCollection) {
    return userCollection as UserCollection
  } else {
    throw new ApolloError('createUserCollection: There was an issue.')
  }
}

export const updateUserCollection = async (
  r: any,
  { data }: MutationUpdateUserCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userCollection', authedUserId, prisma)

  const updated = await prisma.userCollection.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserCollection
  } else {
    throw new ApolloError('updateUserCollection: There was an issue.')
  }
}

export const deleteUserCollectionById = async (
  r: any,
  { id }: MutationDeleteUserCollectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userCollection', authedUserId, prisma)

  const deleted = await prisma.userCollection.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteUserCollectionById: There was an issue.')
  }
}

export const addWorkoutToCollection = async (
  r: any,
  { data }: MutationAddWorkoutToCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userCollection', authedUserId, prisma)

  const updated = await prisma.userCollection.update({
    where: { id: data.id },
    data: {
      Workouts: {
        connect: data.Workout,
      },
    },
    select,
  })

  if (updated) {
    return updated as UserCollection
  } else {
    throw new ApolloError('addWorkoutToCollection: There was an issue.')
  }
}

export const removeWorkoutFromCollection = async (
  r: any,
  { data }: MutationRemoveWorkoutFromCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userCollection', authedUserId, prisma)

  const updated = await prisma.userCollection.update({
    where: { id: data.id },
    data: {
      Workouts: {
        disconnect: data.Workout,
      },
    },
    select,
  })

  if (updated) {
    return updated as UserCollection
  } else {
    throw new ApolloError('removeWorkoutFromCollection: There was an issue.')
  }
}

export const addWorkoutPlanToCollection = async (
  r: any,
  { data }: MutationAddWorkoutPlanToCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userCollection', authedUserId, prisma)

  const updated = await prisma.userCollection.update({
    where: { id: data.id },
    data: {
      WorkoutPlans: {
        connect: data.WorkoutPlan,
      },
    },
    select,
  })

  if (updated) {
    return updated as UserCollection
  } else {
    throw new ApolloError('addWorkoutPlanToCollection: There was an issue.')
  }
}

export const removeWorkoutPlanFromCollection = async (
  r: any,
  { data }: MutationRemoveWorkoutPlanFromCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userCollection', authedUserId, prisma)

  const updated = await prisma.userCollection.update({
    where: { id: data.id },
    data: {
      WorkoutPlans: {
        disconnect: data.WorkoutPlan,
      },
    },
    select,
  })

  if (updated) {
    return updated as UserCollection
  } else {
    throw new ApolloError(
      'removeWorkoutPlanFromCollection: There was an issue.',
    )
  }
}

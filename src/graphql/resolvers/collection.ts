import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  Collection,
  MutationAddWorkoutPlanToCollectionArgs,
  MutationAddWorkoutToCollectionArgs,
  MutationCreateCollectionArgs,
  MutationDeleteCollectionByIdArgs,
  MutationRemoveWorkoutFromCollectionArgs,
  MutationRemoveWorkoutPlanFromCollectionArgs,
  MutationUpdateCollectionArgs,
  QueryUserCollectionByIdArgs,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const userCollections = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const collections = await prisma.collection.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return collections as Collection[]
}

export const userCollectionById = async (
  r: any,
  { id }: QueryUserCollectionByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: id,
      userId: authedUserId,
    },
    select,
  })
  return collection as Collection
}

//// Mutations ////
export const createCollection = async (
  r: any,
  { data }: MutationCreateCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const collection = await prisma.collection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (collection) {
    return collection as Collection
  } else {
    throw new ApolloError('createCollection: There was an issue.')
  }
}

export const updateCollection = async (
  r: any,
  { data }: MutationUpdateCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'collection', authedUserId, prisma)

  const updated = await prisma.collection.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as Collection
  } else {
    throw new ApolloError('updateCollection: There was an issue.')
  }
}

export const deleteCollectionById = async (
  r: any,
  { id }: MutationDeleteCollectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'collection', authedUserId, prisma)

  const deleted = await prisma.collection.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteCollectionById: There was an issue.')
  }
}

export const addWorkoutToCollection = async (
  r: any,
  { data }: MutationAddWorkoutToCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.collectionId,
    'collection',
    authedUserId,
    prisma,
  )

  const updated = await prisma.collection.update({
    where: { id: data.collectionId },
    data: {
      Workouts: {
        connect: data.Workout,
      },
    },
    select,
  })

  if (updated) {
    return updated as Collection
  } else {
    throw new ApolloError('addWorkoutToCollection: There was an issue.')
  }
}

export const removeWorkoutFromCollection = async (
  r: any,
  { data }: MutationRemoveWorkoutFromCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.collectionId,
    'collection',
    authedUserId,
    prisma,
  )

  const updated = await prisma.collection.update({
    where: { id: data.collectionId },
    data: {
      Workouts: {
        disconnect: data.Workout,
      },
    },
    select,
  })

  if (updated) {
    return updated as Collection
  } else {
    throw new ApolloError('removeWorkoutFromCollection: There was an issue.')
  }
}

export const addWorkoutPlanToCollection = async (
  r: any,
  { data }: MutationAddWorkoutPlanToCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.collectionId,
    'collection',
    authedUserId,
    prisma,
  )

  const updated = await prisma.collection.update({
    where: { id: data.collectionId },
    data: {
      WorkoutPlans: {
        connect: data.WorkoutPlan,
      },
    },
    select,
  })

  if (updated) {
    return updated as Collection
  } else {
    throw new ApolloError('addWorkoutPlanToCollection: There was an issue.')
  }
}

export const removeWorkoutPlanFromCollection = async (
  r: any,
  { data }: MutationRemoveWorkoutPlanFromCollectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.collectionId,
    'collection',
    authedUserId,
    prisma,
  )

  const updated = await prisma.collection.update({
    where: { id: data.collectionId },
    data: {
      WorkoutPlans: {
        disconnect: data.WorkoutPlan,
      },
    },
    select,
  })

  if (updated) {
    return updated as Collection
  } else {
    throw new ApolloError(
      'removeWorkoutPlanFromCollection: There was an issue.',
    )
  }
}

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
  WorkoutPlanSummary,
  WorkoutSummary,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'
import {
  selectForWorkoutPlanSummary,
  selectForWorkoutSummary,
} from './selectDefinitions'
import { formatWorkoutSummaries } from './workout/utils'
import { formatWorkoutPlanSummaries } from './workoutPlan/utils'

//// Queries ////
export const userCollections = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const collections = await prisma.collection.findMany({
    where: {
      userId: authedUserId,
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  const formattedCollections = collections.map((c) => ({
    ...c,
    Workouts: formatWorkoutSummaries(c.Workouts) as WorkoutSummary[],
    WorkoutPlans: formatWorkoutPlanSummaries(
      c.WorkoutPlans,
    ) as WorkoutPlanSummary[],
  }))

  return formattedCollections as Collection[]
}

export const userCollectionById = async (
  r: any,
  { id }: QueryUserCollectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: id,
      userId: authedUserId,
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  return {
    ...collection,
    Workouts: collection ? formatWorkoutSummaries(collection.Workouts) : [],
    WorkoutPlans: collection
      ? formatWorkoutPlanSummaries(collection.WorkoutPlans)
      : null,
  } as Collection
}

//// Mutations ////
export const createCollection = async (
  r: any,
  { data }: MutationCreateCollectionArgs,
  { authedUserId, prisma }: Context,
) => {
  const collection = await prisma.collection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (collection) {
    return {
      ...collection,
      Workouts: formatWorkoutSummaries(collection.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(collection.WorkoutPlans),
    } as Collection
  } else {
    throw new ApolloError('createCollection: There was an issue.')
  }
}

export const updateCollection = async (
  r: any,
  { data }: MutationUpdateCollectionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'collection', authedUserId, prisma)

  const updated = await prisma.collection.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    return {
      ...updated,
      Workouts: formatWorkoutSummaries(updated.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
    } as Collection
  } else {
    throw new ApolloError('updateCollection: There was an issue.')
  }
}

export const addWorkoutToCollection = async (
  r: any,
  { data }: MutationAddWorkoutToCollectionArgs,
  { authedUserId, prisma }: Context,
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
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    return {
      ...updated,
      Workouts: formatWorkoutSummaries(updated.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
    } as Collection
  } else {
    throw new ApolloError('addWorkoutToCollection: There was an issue.')
  }
}

export const removeWorkoutFromCollection = async (
  r: any,
  { data }: MutationRemoveWorkoutFromCollectionArgs,
  { authedUserId, prisma }: Context,
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
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    return {
      ...updated,
      Workouts: formatWorkoutSummaries(updated.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
    } as Collection
  } else {
    throw new ApolloError('removeWorkoutFromCollection: There was an issue.')
  }
}

export const addWorkoutPlanToCollection = async (
  r: any,
  { data }: MutationAddWorkoutPlanToCollectionArgs,
  { authedUserId, prisma }: Context,
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
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    return {
      ...updated,
      Workouts: formatWorkoutSummaries(updated.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
    } as Collection
  } else {
    throw new ApolloError('addWorkoutPlanToCollection: There was an issue.')
  }
}

export const removeWorkoutPlanFromCollection = async (
  r: any,
  { data }: MutationRemoveWorkoutPlanFromCollectionArgs,
  { authedUserId, prisma }: Context,
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
    select: {
      id: true,
      createdAt: true,
      name: true,
      description: true,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    return {
      ...updated,
      Workouts: formatWorkoutSummaries(updated.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
    } as Collection
  } else {
    throw new ApolloError(
      'removeWorkoutPlanFromCollection: There was an issue.',
    )
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

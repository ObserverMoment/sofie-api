import { FitnessBenchmarkScope } from '@prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  FitnessBenchmark,
  FitnessBenchmarkWorkout,
  MutationCreateFitnessBenchmarkArgs,
  MutationCreateFitnessBenchmarkWorkoutArgs,
  MutationDeleteFitnessBenchmarkArgs,
  MutationDeleteFitnessBenchmarkWorkoutArgs,
  MutationUpdateFitnessBenchmarkArgs,
  MutationUpdateFitnessBenchmarkWorkoutArgs,
} from '../../generated/graphql'
import {
  checkFitnessBenchmarkMediaForDeletion,
  checkFitnessBenchmarkWorkoutMediaForDeletion,
  deleteFiles,
} from '../../lib/uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'

export const createFitnessBenchmark = async (
  r: any,
  { data }: MutationCreateFitnessBenchmarkArgs,
  { authedUserId, select, prisma, userType }: Context,
) => {
  const isStandardBenchmark = data.scope === FitnessBenchmarkScope.STANDARD

  if (isStandardBenchmark && userType !== 'ADMIN') {
    throw new AccessScopeError(
      'Only admins can create STANDARD fitness benchmarks.',
    )
  }

  const fitnessBenchmark = await prisma.fitnessBenchmark.create({
    data: {
      ...data,
      User: isStandardBenchmark
        ? undefined
        : {
            connect: { id: authedUserId },
          },
      FitnessBenchmarkCategory: {
        connect: data.FitnessBenchmarkCategory,
      },
    },
    select,
  })

  if (fitnessBenchmark) {
    return fitnessBenchmark as FitnessBenchmark
  } else {
    throw new ApolloError('createFitnessBenchmark: There was an issue.')
  }
}

export const updateFitnessBenchmark = async (
  r: any,
  { data }: MutationUpdateFitnessBenchmarkArgs,
  { authedUserId, select, prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    await checkUserOwnsObject(data.id, 'fitnessBenchmark', authedUserId, prisma)
  }

  const mediaFileUrisForDeletion: string[] =
    await checkFitnessBenchmarkMediaForDeletion(prisma, data)

  const updated = await prisma.fitnessBenchmark.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      description: data.description || undefined,
      scope: data.scope || undefined,
      type: data.type || undefined,
      FitnessBenchmarkCategory: undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as FitnessBenchmark
  } else {
    throw new ApolloError('updateFitnessBenchmark: There was an issue.')
  }
}

export const deleteFitnessBenchmark = async (
  r: any,
  { id }: MutationDeleteFitnessBenchmarkArgs,
  { authedUserId, prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    await checkUserOwnsObject(id, 'fitnessBenchmark', authedUserId, prisma)
  }

  const deleted = await prisma.fitnessBenchmark.delete({
    where: { id },
    select: {
      id: true,
      instructionalVideoUri: true,
      instructionalVideoThumbUri: true,
    },
  })

  const mediaFileUrisForDeletion = [
    deleted.instructionalVideoUri,
    deleted.instructionalVideoThumbUri,
  ].filter((x) => !!x) as string[]

  if (deleted) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteFitnessBenchmark: There was an issue.')
  }
}

export const createFitnessBenchmarkWorkout = async (
  r: any,
  { data }: MutationCreateFitnessBenchmarkWorkoutArgs,
  { authedUserId, select, prisma, userType }: Context,
) => {
  const isStandardBenchmark = data.scope === FitnessBenchmarkScope.STANDARD

  if (isStandardBenchmark && userType !== 'ADMIN') {
    throw new AccessScopeError(
      'Only admins can create STANDARD fitness benchmarks.',
    )
  }

  const fitnessBenchmarkWorkout = await prisma.fitnessBenchmarkWorkout.create({
    data: {
      ...data,
      User: isStandardBenchmark
        ? undefined
        : {
            connect: { id: authedUserId },
          },
    },
    select,
  })

  if (fitnessBenchmarkWorkout) {
    return fitnessBenchmarkWorkout as FitnessBenchmarkWorkout
  } else {
    throw new ApolloError('createFitnessBenchmarkWorkout: There was an issue.')
  }
}

export const updateFitnessBenchmarkWorkout = async (
  r: any,
  { data }: MutationUpdateFitnessBenchmarkWorkoutArgs,
  { authedUserId, select, prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    await checkUserOwnsObject(
      data.id,
      'fitnessBenchmarkWorkout',
      authedUserId,
      prisma,
    )
  }

  const mediaFileUrisForDeletion: string[] =
    await checkFitnessBenchmarkWorkoutMediaForDeletion(prisma, data)

  const updated = await prisma.fitnessBenchmarkWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      description: data.description || undefined,
      scope: data.scope || undefined,
      type: data.type || undefined,
      rounds: data.rounds || undefined,
      moveDescriptions:
        data.moveDescriptions === null ? undefined : data.moveDescriptions,
      pointsForMoveCompleted:
        data.pointsForMoveCompleted === null
          ? undefined
          : data.pointsForMoveCompleted,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as FitnessBenchmarkWorkout
  } else {
    throw new ApolloError('updateFitnessBenchmarkWorkout: There was an issue.')
  }
}

export const deleteFitnessBenchmarkWorkout = async (
  r: any,
  { id }: MutationDeleteFitnessBenchmarkWorkoutArgs,
  { authedUserId, prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    await checkUserOwnsObject(
      id,
      'fitnessBenchmarkWorkout',
      authedUserId,
      prisma,
    )
  }

  const deleted = await prisma.fitnessBenchmarkWorkout.delete({
    where: { id },
    select: {
      id: true,
      instructionalVideoUri: true,
      instructionalVideoThumbUri: true,
    },
  })

  const mediaFileUrisForDeletion = [
    deleted.instructionalVideoUri,
    deleted.instructionalVideoThumbUri,
  ].filter((x) => !!x) as string[]

  if (deleted) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteFitnessBenchmarkWorkout: There was an issue.')
  }
}

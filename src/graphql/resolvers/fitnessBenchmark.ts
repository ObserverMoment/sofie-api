import { FitnessBenchmarkScope } from '@prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  FitnessBenchmark,
  FitnessBenchmarkScore,
  FitnessBenchmarkWorkout,
  MutationCreateFitnessBenchmarkArgs,
  MutationCreateFitnessBenchmarkScoreArgs,
  MutationCreateFitnessBenchmarkWorkoutArgs,
  MutationDeleteFitnessBenchmarkArgs,
  MutationDeleteFitnessBenchmarkScoreArgs,
  MutationDeleteFitnessBenchmarkWorkoutArgs,
  MutationUpdateFitnessBenchmarkArgs,
  MutationUpdateFitnessBenchmarkScoreArgs,
  MutationUpdateFitnessBenchmarkWorkoutArgs,
} from '../../generated/graphql'
import {
  checkFitnessBenchmarkMediaForDeletion,
  checkFitnessBenchmarkScoreMediaForDeletion,
  checkFitnessBenchmarkWorkoutMediaForDeletion,
  deleteFiles,
} from '../../lib/uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'

//// Queries ////
/// Gets all the standard benchmarks, plus the user custom ones.
/// Plus user scores for all of the above.
export const userFitnessBenchmarks = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const benchmarks = await prisma.fitnessBenchmark.findMany({
    where: {
      OR: [{ userId: authedUserId }, { scope: FitnessBenchmarkScope.STANDARD }],
    },
    select,
  })

  return benchmarks as FitnessBenchmark[]
}

/// Gets all the standard benchmark workouts, plus the user custom ones.
/// Plus user scores for all of the above.
export const userBenchmarkWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const benchmarkWorkouts = await prisma.fitnessBenchmarkWorkout.findMany({
    where: {
      OR: [{ userId: authedUserId }, { scope: FitnessBenchmarkScope.STANDARD }],
    },
    select,
  })

  return benchmarkWorkouts as FitnessBenchmarkWorkout[]
}

//// Mutations ////
//// Fitness Benchmarks ////
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
      FitnessBenchmarkCategory: data.FitnessBenchmarkCategory
        ? { connect: data.FitnessBenchmarkCategory }
        : undefined,
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

//// Fitness Benchmark Scores ////
export const createFitnessBenchmarkScore = async (
  r: any,
  { data }: MutationCreateFitnessBenchmarkScoreArgs,
  { authedUserId, select, prisma }: Context,
) => {
  /// Check if benchmark is either standard, or owned by the authed user.
  /// If not then throw.
  const benchmark = await prisma.fitnessBenchmark.findUnique({
    where: { id: data.FitnessBenchmark.id },
    select: {
      userId: true,
      scope: true,
    },
  })

  if (
    !benchmark ||
    (benchmark.scope === FitnessBenchmarkScope.CUSTOM &&
      benchmark.userId !== authedUserId)
  ) {
    throw new AccessScopeError(
      'This benchmark is CUSTOM and you are not the owner of it.',
    )
  }

  /// Side post the score onto the benchmark and get the full benchmark back again.
  const updated = await prisma.fitnessBenchmark.update({
    where: {
      id: data.FitnessBenchmark.id,
    },
    data: {
      FitnessBenchmarkScores: {
        create: {
          completedOn: data.completedOn || undefined,
          score: data.score,
          note: data.note,
          videoUri: data.videoUri,
          videoThumbUri: data.videoThumbUri,
          User: {
            connect: { id: authedUserId },
          },
        },
      },
    },
    select,
  })

  if (updated) {
    return updated as FitnessBenchmark
  } else {
    throw new ApolloError('createFitnessBenchmarkScore: There was an issue.')
  }
}

export const updateFitnessBenchmarkScore = async (
  r: any,
  { data }: MutationUpdateFitnessBenchmarkScoreArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'fitnessBenchmarkScore',
    authedUserId,
    prisma,
  )

  /// Get the parent benchmark's ID
  const score = await prisma.fitnessBenchmarkScore.findUnique({
    where: { id: data.id },
    select: {
      fitnessBenchmarkId: true,
    },
  })

  /// Get any media that needs to be deleted.
  const mediaFileUrisForDeletion: string[] =
    await checkFitnessBenchmarkScoreMediaForDeletion(prisma, data)

  /// Side post the update onto the parent benchmark and get the full benchmark back again.
  const updated = await prisma.fitnessBenchmark.update({
    where: {
      id: score?.fitnessBenchmarkId,
    },
    data: {
      FitnessBenchmarkScores: {
        update: {
          where: {
            id: data.id,
          },
          data: {
            completedOn: data.completedOn || undefined,
            score: data.score || undefined,
            note: data.note,
            videoUri: data.videoUri,
            videoThumbUri: data.videoThumbUri,
          },
        },
      },
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as FitnessBenchmark
  } else {
    throw new ApolloError('createFitnessBenchmarkScore: There was an issue.')
  }
}

export const deleteFitnessBenchmarkScore = async (
  r: any,
  { id }: MutationDeleteFitnessBenchmarkScoreArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'fitnessBenchmarkScore', authedUserId, prisma)

  const deleted = await prisma.fitnessBenchmarkScore.delete({
    where: { id },
    select: {
      id: true,
      videoUri: true,
      videoThumbUri: true,
      fitnessBenchmarkId: true,
    },
  })

  const mediaFileUrisForDeletion = [
    deleted.videoUri,
    deleted.videoThumbUri,
  ].filter((x) => !!x) as string[]

  /// This resolver needs to return the full parent benchmark
  const updated = await prisma.fitnessBenchmark.findUnique({
    where: { id: deleted.fitnessBenchmarkId },
    select,
  })

  if (deleted) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as FitnessBenchmark
  } else {
    throw new ApolloError('deleteFitnessBenchmarkScore: There was an issue.')
  }
}

//// Fitness Benchmark Workouts ////
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

import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateUserBenchmarkArgs,
  MutationCreateUserBenchmarkEntryArgs,
  MutationDeleteUserBenchmarkByIdArgs,
  MutationDeleteUserBenchmarkEntryByIdArgs,
  MutationUpdateUserBenchmarkArgs,
  MutationUpdateUserBenchmarkEntryArgs,
  QueryUserBenchmarksArgs,
  UserBenchmark,
  UserBenchmarkEntry,
} from '../../generated/graphql'
import {
  checkUserBenchmarkEntryMediaForDeletion,
  deleteFiles,
} from '../../uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'

//// Queries ////
export const userBenchmarks = async (
  r: any,
  { first }: QueryUserBenchmarksArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const take = first ? { take: first } : null
  const userBenchmarks = await prisma.userBenchmark.findMany({
    where: {
      userId: authedUserId,
    },
    orderBy: {
      lastEntryAt: 'desc',
    },
    ...take,
    select,
  })
  return userBenchmarks as UserBenchmark[]
}

//// Mutations ////
export const createUserBenchmark = async (
  r: any,
  { data }: MutationCreateUserBenchmarkArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const userBenchmark = await prisma.userBenchmark.create({
    data: {
      ...data,
      loadUnit: data.loadUnit || undefined,
      distanceUnit: data.distanceUnit || undefined,
      Move: { connect: data.Move },
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (userBenchmark) {
    return userBenchmark as UserBenchmark
  } else {
    throw new ApolloError('createUserBenchmark: There was an issue.')
  }
}

export const updateUserBenchmark = async (
  r: any,
  { data }: MutationUpdateUserBenchmarkArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userBenchmark', authedUserId, prisma)
  const updated = await prisma.userBenchmark.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      reps: data.reps || undefined,
      repType: data.repType || undefined,
      scoreType: data.scoreType || undefined,
      loadUnit: data.loadUnit || undefined,
      distanceUnit: data.distanceUnit || undefined,
      Move: data.Move ? { connect: data.Move } : undefined,
      // Equipment can be null - i.e no equipment, so it can only be ignored if not present in the data object.
      // passing null should disconnect any connected Equipment.
      Equipment: data.hasOwnProperty('Equipment')
        ? data.Equipment
          ? { connect: data.Equipment }
          : { disconnect: true }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserBenchmark
  } else {
    throw new ApolloError('updateUserBenchmark: There was an issue.')
  }
}

/// Deletes the benchmark and all of the related entries.
export const deleteUserBenchmarkById = async (
  r: any,
  { id }: MutationDeleteUserBenchmarkByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userBenchmark', authedUserId, prisma)
  // Get all UserBenchmarkEntry.videoUri and .imageUri. Once transaction is successful - delete them from uploadcare.
  const userBenchmarkEntries = await prisma.userBenchmarkEntry.findMany({
    where: {
      userBenchmarkId: id,
    },
    select: {
      imageUri: true,
      videoUri: true,
      videoThumbUri: true,
    },
  })

  const mediaIdsForDeletion: string[] = userBenchmarkEntries
    .flatMap(({ imageUri, videoUri, videoThumbUri }) => [
      imageUri,
      videoUri,
      videoThumbUri,
    ])
    .filter((x) => x) as string[]

  const ops = [
    prisma.userBenchmarkEntry.deleteMany({
      where: { userBenchmarkId: id },
    }),
    prisma.userBenchmark.delete({ where: { id } }),
  ]

  const [_, deleted] = await prisma.$transaction(ops)

  if (deleted) {
    if (mediaIdsForDeletion && mediaIdsForDeletion.length > 0) {
      await deleteFiles(mediaIdsForDeletion)
    }
    return id
  } else {
    throw new ApolloError('deleteUserBenchmarkById: There was an issue.')
  }
}

export const createUserBenchmarkEntry = async (
  r: any,
  { data }: MutationCreateUserBenchmarkEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent benchmark.
  await checkUserOwnsObject(
    data.UserBenchmark.id,
    'userBenchmark',
    authedUserId,
    prisma,
  )

  const userBenchmarkEntry: any = await prisma.userBenchmarkEntry.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (userBenchmarkEntry) {
    // Update [lastEntryAt] on the parent Benchmark.
    var now = new Date()
    await prisma.userBenchmark.update({
      where: { id: userBenchmarkEntry['UserBenchmark'].id },
      data: {
        lastEntryAt: now,
      },
    })
    return userBenchmarkEntry as UserBenchmarkEntry
  } else {
    throw new ApolloError('createUserBenchmarkEntry: There was an issue.')
  }
}

export const updateUserBenchmarkEntry = async (
  r: any,
  { data }: MutationUpdateUserBenchmarkEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userBenchmarkEntry', authedUserId, prisma)
  const mediaFileUrisForDeletion: string[] =
    await checkUserBenchmarkEntryMediaForDeletion(prisma, data)

  const updated: any = await prisma.userBenchmarkEntry.update({
    where: { id: data.id },
    data: {
      ...data,
      score: data.score || undefined,
    },
    select: {
      ...select,
      UserBenchmark: {
        select: { id: true },
      },
    },
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    // Update [lastEntryAt] on the parent Benchmark.
    var now = new Date()
    await prisma.userBenchmark.update({
      where: { id: updated['UserBenchmark'].id },
      data: {
        lastEntryAt: now,
      },
    })

    return updated as UserBenchmarkEntry
  } else {
    throw new ApolloError('updateUserBenchmarkEntry: There was an issue.')
  }
}

export const deleteUserBenchmarkEntryById = async (
  r: any,
  { id }: MutationDeleteUserBenchmarkEntryByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userBenchmarkEntry', authedUserId, prisma)

  const deleted = await prisma.userBenchmarkEntry.delete({
    where: { id },
    select: {
      id: true,
      imageUri: true,
      videoUri: true,
      videoThumbUri: true,
    },
  })

  /// Media cleanup.
  const mediaForDeletion = [
    deleted.imageUri,
    deleted.videoUri,
    deleted.videoThumbUri,
  ].filter((x) => x) as string[]

  if (deleted) {
    if (mediaForDeletion.length > 0) {
      await deleteFiles(mediaForDeletion)
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteUserBenchmarkEntryById: There was an issue.')
  }
}

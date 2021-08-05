import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateUserBenchmarkArgs,
  MutationCreateUserBenchmarkEntryArgs,
  MutationCreateUserBenchmarkTagArgs,
  MutationDeleteUserBenchmarkByIdArgs,
  MutationDeleteUserBenchmarkEntryByIdArgs,
  MutationDeleteUserBenchmarkTagByIdArgs,
  MutationUpdateUserBenchmarkArgs,
  MutationUpdateUserBenchmarkEntryArgs,
  MutationUpdateUserBenchmarkTagArgs,
  QueryUserBenchmarkByIdArgs,
  UserBenchmark,
  UserBenchmarkEntry,
  UserBenchmarkTag,
} from '../../generated/graphql'
import {
  checkUserBenchmarkEntryMediaForDeletion,
  deleteFiles,
} from '../../lib/uploadcare'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
/// Aka 'Personal Bests' ///
export const userBenchmarks = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userBenchmarks = await prisma.userBenchmark.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return userBenchmarks as UserBenchmark[]
}

export const userBenchmarkById = async (
  r: any,
  { id }: QueryUserBenchmarkByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const userBenchmark = await prisma.userBenchmark.findFirst({
    where: {
      id: id,
      userId: authedUserId,
    },
    select,
  })
  return userBenchmark as UserBenchmark
}

export const userBenchmarkTags = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userBenchmarkTags = await prisma.userBenchmarkTag.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return userBenchmarkTags as UserBenchmarkTag[]
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
      UserBenchmarkTags: data.UserBenchmarkTags
        ? {
            connect: data.UserBenchmarkTags,
          }
        : undefined,
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
      loadUnit: data.loadUnit || undefined,
      UserBenchmarkTags: {
        // Note: You should not pass 'null' to a relationship field. It will be parsed as 'no input' and ignored.
        // To remove all related items of this type pass an empty array.
        // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records
        set: data.UserBenchmarkTags ? data.UserBenchmarkTags : undefined,
      },
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
      videoUri: true,
      videoThumbUri: true,
    },
  })

  const mediaIdsForDeletion: string[] = userBenchmarkEntries
    .flatMap(({ videoUri, videoThumbUri }) => [videoUri, videoThumbUri])
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

//////////////////////////////
//// UserBenchmarkEntries ////
//////////////////////////////
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
      UserBenchmark: { connect: data.UserBenchmark },
      User: {
        connect: { id: authedUserId },
      },
    },
    select: {
      ...select,
      UserBenchmark: {
        select: { id: true },
      },
    },
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
      videoUri: true,
      videoThumbUri: true,
    },
  })

  /// Media cleanup.
  const mediaForDeletion = [deleted.videoUri, deleted.videoThumbUri].filter(
    (x) => x,
  ) as string[]

  if (deleted) {
    if (mediaForDeletion.length > 0) {
      await deleteFiles(mediaForDeletion)
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteUserBenchmarkEntryById: There was an issue.')
  }
}

///////////////////////////
//// UserBenchmarkTags ////
///////////////////////////
export const createUserBenchmarkTag = async (
  r: any,
  { data }: MutationCreateUserBenchmarkTagArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const userBenchmarkTag = await prisma.userBenchmarkTag.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (userBenchmarkTag) {
    return userBenchmarkTag as UserBenchmarkTag
  } else {
    throw new ApolloError('createUserBenchmarkTag: There was an issue.')
  }
}

export const updateUserBenchmarkTag = async (
  r: any,
  { data }: MutationUpdateUserBenchmarkTagArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'userBenchmarkTag', authedUserId, prisma)

  const updated = await prisma.userBenchmarkTag.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as UserBenchmarkTag
  } else {
    throw new ApolloError('updateUserBenchmarkTag: There was an issue.')
  }
}

export const deleteUserBenchmarkTagById = async (
  r: any,
  { id }: MutationDeleteUserBenchmarkTagByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'userBenchmarkTag', authedUserId, prisma)

  const deleted = await prisma.userBenchmarkTag.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteUserBenchmarkTagById: There was an issue.')
  }
}

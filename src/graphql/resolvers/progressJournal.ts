import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateProgressJournalArgs,
  MutationCreateProgressJournalEntryArgs,
  MutationCreateProgressJournalGoalArgs,
  MutationCreateProgressJournalGoalTagArgs,
  MutationDeleteProgressJournalByIdArgs,
  MutationDeleteProgressJournalEntryByIdArgs,
  MutationDeleteProgressJournalGoalByIdArgs,
  MutationDeleteProgressJournalGoalTagByIdArgs,
  MutationUpdateProgressJournalArgs,
  MutationUpdateProgressJournalEntryArgs,
  MutationUpdateProgressJournalGoalArgs,
  MutationUpdateProgressJournalGoalTagArgs,
  ProgressJournal,
  ProgressJournalEntry,
  ProgressJournalGoal,
  ProgressJournalGoalTag,
  QueryProgressJournalByIdArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../lib/uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'

//// Queries ////
export const userProgressJournals = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const progressJournals = await prisma.progressJournal.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return progressJournals as ProgressJournal[]
}

/// Get all user specific progress journal tags.
/// These tags can be used across journals to add general tags to goals
/// E.g. Lose weight, reduce stress levels etc.
export const progressJournalGoalTags = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const progressJournalGoalTags = await prisma.progressJournalGoalTag.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return progressJournalGoalTags as ProgressJournalGoalTag[]
}

export const progressJournalById = async (
  r: any,
  { id }: QueryProgressJournalByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const progressJournal = await prisma.progressJournal.findFirst({
    where: {
      id: id,
      userId: authedUserId,
    },
    select,
  })
  return progressJournal as ProgressJournal
}

//// Mutations ////
//// ProgressJournal ////
export const createProgressJournal = async (
  r: any,
  { data }: MutationCreateProgressJournalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const progressJournal = await prisma.progressJournal.create({
    data: {
      ...data,
      bodyweightUnit: data.bodyweightUnit || undefined,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (progressJournal) {
    return progressJournal as ProgressJournal
  } else {
    throw new ApolloError('createProgressJournal: There was an issue.')
  }
}

export const updateProgressJournal = async (
  r: any,
  { data }: MutationUpdateProgressJournalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'progressJournal', authedUserId, prisma)
  const updated = await prisma.progressJournal.update({
    where: { id: data.id },
    data: {
      name: data.name || undefined,
      description: data.description || undefined,
      coverImageUri: data.coverImageUri || undefined,
      bodyweightUnit: data.bodyweightUnit || undefined,
    },
    select,
  })

  if (updated) {
    return updated as ProgressJournal
  } else {
    throw new ApolloError('updateProgressJournal: There was an issue.')
  }
}

export const deleteProgressJournalById = async (
  r: any,
  { id }: MutationDeleteProgressJournalByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'progressJournal', authedUserId, prisma)

  const ops = [
    prisma.progressJournalEntry.deleteMany({
      where: { progressJournalId: id },
    }),
    prisma.progressJournalGoal.deleteMany({ where: { progressJournalId: id } }),
    prisma.progressJournal.delete({ where: { id } }),
  ]

  const [_, __, deleted] = await prisma.$transaction(ops)

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteProgressJournalById: There was an issue.')
  }
}

//// ProgressJournalEntry ////
export const createProgressJournalEntry = async (
  r: any,
  { data }: MutationCreateProgressJournalEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ProgressJournal.id,
    'progressJournal',
    authedUserId,
    prisma,
  )

  const progressJournalEntry = await prisma.progressJournalEntry.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      ProgressJournal: {
        connect: data.ProgressJournal,
      },
    },
    select,
  })

  if (progressJournalEntry) {
    return progressJournalEntry as ProgressJournalEntry
  } else {
    throw new ApolloError('createProgressJournalEntry: There was an issue.')
  }
}

export const updateProgressJournalEntry = async (
  r: any,
  { data }: MutationUpdateProgressJournalEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check for any old photos. NOTE: Not using /uploadcare/index - check{object}MediaForDeletion style method because progressJournalEntry.progressPhotoUris is a scalar array and the above works for key value pairs.
  const progressJournalEntry = await prisma.progressJournalEntry.findUnique({
    where: { id: data.id },
    select: {
      userId: true,
      voiceNoteUri: true,
    },
  })

  if (!progressJournalEntry || progressJournalEntry.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const mediaUrisFordeletion: string[] = []

    if (
      progressJournalEntry.voiceNoteUri !== null &&
      progressJournalEntry.voiceNoteUri !== data.voiceNoteUri
    ) {
      mediaUrisFordeletion.push(progressJournalEntry.voiceNoteUri)
    }

    const updated = await prisma.progressJournalEntry.update({
      where: { id: data.id },
      data,
      select,
    })

    if (updated) {
      if (mediaUrisFordeletion.length > 0) {
        await deleteFiles(mediaUrisFordeletion)
      }
      return updated as ProgressJournalEntry
    } else {
      throw new ApolloError('updateProgressJournalEntry: There was an issue.')
    }
  }
}

export const deleteProgressJournalEntryById = async (
  r: any,
  { id }: MutationDeleteProgressJournalEntryByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'progressJournalEntry', authedUserId, prisma)

  const deleted = await prisma.progressJournalEntry.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteProgressJournalEntryById: There was an issue.')
  }
}

//// ProgressJournalGoal ////
export const createProgressJournalGoal = async (
  r: any,
  { data }: MutationCreateProgressJournalGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ProgressJournal.id,
    'progressJournal',
    authedUserId,
    prisma,
  )

  const progressJournalGoal = await prisma.progressJournalGoal.create({
    data: {
      ...data,
      ProgressJournalGoalTags: data.ProgressJournalGoalTags
        ? {
            connect: data.ProgressJournalGoalTags,
          }
        : undefined,
      User: {
        connect: { id: authedUserId },
      },
      ProgressJournal: {
        connect: data.ProgressJournal,
      },
    },
    select,
  })

  if (progressJournalGoal) {
    return progressJournalGoal as ProgressJournalGoal
  } else {
    throw new ApolloError('createProgressJournalGoal: There was an issue.')
  }
}

export const updateProgressJournalGoal = async (
  r: any,
  { data }: MutationUpdateProgressJournalGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'progressJournalGoal',
    authedUserId,
    prisma,
  )

  const updated = await prisma.progressJournalGoal.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      ProgressJournalGoalTags: {
        // Note: You should not pass 'null' to a relationship field. It will be parsed as 'no input' and ignored.
        // To remove all related items of this type pass an empty array.
        // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records
        set: data.ProgressJournalGoalTags
          ? data.ProgressJournalGoalTags
          : undefined,
      },
    },
    select,
  })

  if (updated) {
    return updated as ProgressJournalGoal
  } else {
    throw new ApolloError('updateProgressJournalGoal: There was an issue.')
  }
}

export const deleteProgressJournalGoalById = async (
  r: any,
  { id }: MutationDeleteProgressJournalGoalByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'progressJournalGoal', authedUserId, prisma)
  const deleted = await prisma.progressJournalGoal.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteProgressJournalGoalById: There was an issue.')
  }
}

//// ProgressJournalGoalTags ////
export const createProgressJournalGoalTag = async (
  r: any,
  { data }: MutationCreateProgressJournalGoalTagArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const progressJournalGoalTag = await prisma.progressJournalGoalTag.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (progressJournalGoalTag) {
    return progressJournalGoalTag as ProgressJournalGoalTag
  } else {
    throw new ApolloError('createProgressJournalGoalTag: There was an issue.')
  }
}

export const updateProgressJournalGoalTag = async (
  r: any,
  { data }: MutationUpdateProgressJournalGoalTagArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'progressJournalGoalTag',
    authedUserId,
    prisma,
  )

  const updated = await prisma.progressJournalGoalTag.update({
    where: { id: data.id },
    data: {
      ...data,
      tag: data.tag || undefined,
      hexColor: data.hexColor || undefined,
    },
    select,
  })

  if (updated) {
    return updated as ProgressJournalGoalTag
  } else {
    throw new ApolloError('updateProgressJournalGoalTag: There was an issue.')
  }
}

// Deletes one or many tags.
export const deleteProgressJournalGoalTagById = async (
  r: any,
  { id }: MutationDeleteProgressJournalGoalTagByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'progressJournalGoalTag', authedUserId, prisma)

  const deleted = await prisma.progressJournalGoalTag.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteProgressJournalGoalTagById: There was an issue.',
    )
  }
}

import {
  ProgressJournal,
  ProgressJournalEntry,
  ProgressJournalGoal,
} from '@prisma/client'
import { AuthenticationError } from 'apollo-server'
import { Context } from '../..'
import {
  MutationCreateProgressJournalArgs,
  MutationCreateProgressJournalEntryArgs,
  MutationCreateProgressJournalGoalArgs,
  MutationCreateProgressJournalGoalTagArgs,
  MutationDeleteProgressJournalByIdArgs,
  MutationDeleteProgressJournalEntryByIdArgs,
  MutationDeleteProgressJournalGoalByIdArgs,
  MutationDeleteProgressJournalGoalTagsByIdArgs,
  MutationUpdateProgressJournalArgs,
  MutationUpdateProgressJournalEntryArgs,
  MutationUpdateProgressJournalGoalArgs,
  MutationUpdateProgressJournalGoalTagArgs,
  QueryProgressJournalByIdArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../uploadcare'

//// Queries ////
/// Get all users specific progress journals.
const progressJournals = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournal.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })

/// Get all users specific progress journal tags.
const progressJournalGoalTags = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournalGoalTag.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })

const progressJournalById = async (
  r: any,
  { progressJournalId }: QueryProgressJournalByIdArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournal.findUnique({
    where: {
      id: progressJournalId,
      userId: authedUserId,
    },
    select,
  })

//// Mutations ////
//// ProgressJournal ////
const createProgressJournal = async (
  r: any,
  { data }: MutationCreateProgressJournalArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournal.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const updateProgressJournal = async (
  r: any,
  { data }: MutationUpdateProgressJournalArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournal.update({
    where: { id: data.id, userId: authedUserId },
    data,
    select,
  })

const deleteProgressJournalById = async (
  r: any,
  { progressJournalId }: MutationDeleteProgressJournalByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // 1. Get all progressJournalEntry.progressPhotoUrls.
  const progressJournalEntries: ProgressJournalEntry[] = await prisma.progressJournalEntry.findMany(
    {
      where: {
        ProgressJournal: {
          id: progressJournalId,
          userId: authedUserId,
        },
      },
    },
  )
  const allProgressPhotosIdsForDeletion: string[] = progressJournalEntries.reduce(
    (acum, next) => [...acum, ...next.progressPhotoUris],
    [] as string[],
  )
  // 2. Delete the progress journal and all of its children (children first).
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'ProgressJournal',
    where: { id: progressJournalId, userId: authedUserId },
    deleteParent: false, // If false, just the descendants will be deleted.
  })

  // Delete workout and get back uploaded media related files.
  const deletedProgressJournal: ProgressJournal = await prisma.progressJournal.delete(
    {
      where: { id: progressJournalId, userId: authedUserId },
    },
  )
  // 3. Delete all the media from uploadcare.
  if (deletedProgressJournal) {
    await deleteFiles(allProgressPhotosIdsForDeletion)
  }
  // 4. return the deleted ID
  return deletedProgressJournal.id
}

//// ProgressJournalGoal ////
const createProgressJournalGoal = async (
  r: any,
  { data }: MutationCreateProgressJournalGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check the user owns the progress journal.
  const parentProgressJournal = await prisma.progressJournal.findUnique({
    where: { id: data.ProgressJournal, userId: authedUserId },
  })
  if (parentProgressJournal) {
    return prisma.progressJournalGoal.create({
      data: {
        ...data,
        ProgressJournalGoalTags: {
          set: data.ProgressJournalGoalTags
            ? data.ProgressJournalGoalTags.map((id) => ({ id }))
            : [],
        },
        ProgressJournal: {
          connect: { id: data.ProgressJournal },
        },
      },
      select,
    })
  } else {
    console.error(
      'Resolver: createProgressJournalGoal - authed user does not own the parent journal',
    )
    throw new AuthenticationError(
      'Sorry, you do not own this journal so cannot create a goal for it.',
    )
  }
}

const updateProgressJournalGoal = async (
  r: any,
  { data }: MutationUpdateProgressJournalGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  return prisma.progressJournalGoal.update({
    where: { id: data.id, ProgressJournal: { userId: authedUserId } },
    data: {
      ...data,
      ProgressJournalGoalTags: {
        set: data.ProgressJournalGoalTags
          ? data.ProgressJournalGoalTags.map((id) => ({ id }))
          : [],
      },
    },
    select,
  })
}

const deleteProgressJournalGoalById = async (
  r: any,
  { progressJournalGoalId }: MutationDeleteProgressJournalGoalByIdArgs,
  { prisma }: Context,
) => {
  const deletedProgressJournalGoal: ProgressJournalGoal = await prisma.progressJournalGoal.delete(
    {
      where: { id: progressJournalGoalId },
    },
  )
  return deletedProgressJournalGoal.id
}

//// ProgressJournalGoalTags ////
const createProgressJournalGoalTag = async (
  r: any,
  { data }: MutationCreateProgressJournalGoalTagArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournalGoalTag.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const updateProgressJournalGoalTag = async (
  r: any,
  { data }: MutationUpdateProgressJournalGoalTagArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.progressJournalGoalTag.update({
    where: { id: data.id, userId: authedUserId },
    data,
    select,
  })

// Deletes one or many tags.
const deleteProgressJournalGoalTagsById = async (
  r: any,
  { progressJournalGoalTagIds }: MutationDeleteProgressJournalGoalTagsByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  const { count } = await prisma.progressJournalGoalTag.deleteMany({
    where: {
      id: { in: progressJournalGoalTagIds },
      userId: authedUserId,
    },
    select: { count: true },
  })
  return count
}

//// ProgressJournalEntry ////
const createProgressJournalEntry = async (
  r: any,
  { progressJournalId, data }: MutationCreateProgressJournalEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check the user owns the progress journal.
  const parentProgressJournal = await prisma.progressJournal.findUnique({
    where: { id: progressJournalId, userId: authedUserId },
  })
  if (parentProgressJournal) {
    return prisma.progressJournalEntry.create({
      data: {
        ...data,
        ProgressJournal: {
          connect: { id: progressJournalId },
        },
      },
      select,
    })
  } else {
    console.error(
      'Resolver: createProgressJournalEntry - authed user does not own the parent journal',
    )
    throw new AuthenticationError(
      'Sorry, you do not own this journal so cannot create an entry for it.',
    )
  }
}

const updateProgressJournalEntry = async (
  r: any,
  { data }: MutationUpdateProgressJournalEntryArgs,
  { select, prisma }: Context,
) => {
  // TODO: Check the user owns the parent progress journal. May need to pass the parent ID as an arg. Or add a User relation directly to the ProgressJournalEntry model.

  // Check for any old photos.
  const oldProgressJournalEntry: ProgressJournalEntry = await prisma.progressJournalEntry.findUnique(
    {
      where: { id: data.id },
      select: {
        progressPhotoUris: true,
      },
    },
  )
  // Compare with the new array of photo urls and delete any that have been removed.
  const photoIdsForDeletion: string[] = oldProgressJournalEntry.progressPhotoUris.filter(
    (fileId) =>
      !data.progressPhotoUris || !data.progressPhotoUris.includes(fileId),
  )

  if (photoIdsForDeletion.length > 0) {
    await deleteFiles(photoIdsForDeletion)
  }

  return prisma.progressJournalEntry.update({
    where: { id: data.id },
    data,
    select,
  })
}

const deleteProgressJournalEntryById = async (
  r: any,
  { progressJournalEntryId }: MutationDeleteProgressJournalEntryByIdArgs,
  { prisma }: Context,
) => {
  // TODO: Check the user owns the parent progress journal. May need to pass the parent ID as an arg. Or add a User relation directly to the ProgressJournalEntry model.
  const deletedJournalEntry: ProgressJournalEntry = await prisma.progressJournalEntry.delete(
    {
      where: { id: progressJournalEntryId },
      select: {
        progressPhotoUris: true,
      },
    },
  )

  if (deletedJournalEntry.progressPhotoUris.length > 0) {
    await deleteFiles(deletedJournalEntry.progressPhotoUris)
  }

  return deletedJournalEntry.id
}

export {
  progressJournals,
  progressJournalGoalTags,
  progressJournalById,
  createProgressJournal,
  updateProgressJournal,
  deleteProgressJournalById,
  createProgressJournalGoal,
  updateProgressJournalGoal,
  deleteProgressJournalGoalById,
  createProgressJournalGoalTag,
  updateProgressJournalGoalTag,
  deleteProgressJournalGoalTagsById,
  createProgressJournalEntry,
  updateProgressJournalEntry,
  deleteProgressJournalEntryById,
}

import {
  ProgressJournal,
  ProgressJournalEntry,
  ProgressJournalGoal,
} from '@prisma/client'
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
      user: { id: authedUserId },
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
      user: { id: authedUserId },
    },
    select,
  })

const progressJournalById = async (
  r: any,
  { progressJournalId }: QueryProgressJournalByIdArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournal.findUnique({
    where: {
      id: progressJournalId,
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
      user: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const updateProgressJournal = async (
  r: any,
  { data }: MutationUpdateProgressJournalArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournal.update({
    where: { id: data.id },
    data,
    select,
  })

const deleteProgressJournalById = async (
  r: any,
  { progressJournalId }: MutationDeleteProgressJournalByIdArgs,
  { prisma }: Context,
) => {
  // 1. Get all progressJournalEntry.progressPhotoUrls.
  const progressJournalEntries: ProgressJournalEntry[] = await prisma.progressJournalEntry.findMany(
    {
      where: {
        progressJournal: {
          id: progressJournalId,
        },
      },
    },
  )
  const allProgressPhotosIdsForDeletion: string[] = progressJournalEntries.reduce(
    (acum, next) => [...acum, ...next.progressPhotoUrls],
    [] as string[],
  )
  // 2. Delete the progress journal and all of its children (children first).
  // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
  await prisma.onDelete({
    model: 'ProgressJournal',
    where: { id: progressJournalId },
    deleteParent: false, // If false, just the descendants will be deleted.
  })

  // Delete workout and get back uploaded media related files.
  const deletedProgressJournal: ProgressJournal = await prisma.progressJournal.delete(
    {
      where: { id: progressJournalId },
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
  { select, prisma }: Context,
) =>
  prisma.progressJournalGoal.create({
    data: {
      ...data,
      progressJournalGoalTags: {
        set: data.progressJournalGoalTags
          ? data.progressJournalGoalTags.map((id) => ({ id }))
          : [],
      },
      progressJournal: {
        connect: { id: data.progressJournal },
      },
    },
    select,
  })

const updateProgressJournalGoal = async (
  r: any,
  { data }: MutationUpdateProgressJournalGoalArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournalGoal.update({
    where: { id: data.id },
    ...data,
    progressJournalGoalTags: {
      set: data.progressJournalGoalTags
        ? data.progressJournalGoalTags.map((id) => ({ id }))
        : [],
    },
    select,
  })

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
      user: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const updateProgressJournalGoalTag = async (
  r: any,
  { data }: MutationUpdateProgressJournalGoalTagArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournalGoalTag.update({
    where: { id: data.id },
    data,
    select,
  })

// Deletes one or many tags.
const deleteProgressJournalGoalTagsById = async (
  r: any,
  { progressJournalGoalTagIds }: MutationDeleteProgressJournalGoalTagsByIdArgs,
  { prisma }: Context,
) => {
  const { count } = await prisma.progressJournalGoalTag.deleteMany({
    where: { id: { in: progressJournalGoalTagIds } },
    select: { count: true },
  })
  return count
}

//// ProgressJournalEntry ////
const createProgressJournalEntry = async (
  r: any,
  { progressJournalId, data }: MutationCreateProgressJournalEntryArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournalEntry.create({
    data: {
      ...data,
      progressJournal: {
        connect: { id: progressJournalId },
      },
    },
    select,
  })

const updateProgressJournalEntry = async (
  r: any,
  { data }: MutationUpdateProgressJournalEntryArgs,
  { select, prisma }: Context,
) => {
  // Check for any old photos.
  const oldProgressJournalEntry: ProgressJournalEntry = await prisma.progressJournalEntry.findUnique(
    {
      where: { id: data.id },
      select: {
        progressPhotoUrls: true,
      },
    },
  )
  // Compare with the new array of photo urls and delete any that have been removed.
  const photoIdsForDeletion: string[] = oldProgressJournalEntry.progressPhotoUrls.filter(
    (fileId) =>
      !data.progressPhotoUrls || !data.progressPhotoUrls.includes(fileId),
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
  const deletedJournalEntry: ProgressJournalEntry = await prisma.progressJournalEntry.delete(
    {
      where: { id: progressJournalEntryId },
      select: {
        progressPhotoUrls: true,
      },
    },
  )

  if (deletedJournalEntry.progressPhotoUrls.length > 0) {
    await deleteFiles(deletedJournalEntry.progressPhotoUrls)
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

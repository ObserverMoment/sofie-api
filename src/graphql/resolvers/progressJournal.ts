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
  MutationDeleteProgressJournalByIdArgs,
  MutationDeleteProgressJournalEntryByIdArgs,
  MutationDeleteProgressJournalGoalByIdArgs,
  MutationUpdateProgressJournalArgs,
  MutationUpdateProgressJournalEntryArgs,
  MutationUpdateProgressJournalGoalArgs,
  QueryProgressJournalsArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../uploadcare'

//// Queries ////
const progressJournals = async (
  r: any,
  { authedUserId }: QueryProgressJournalsArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournal.findMany({
    where: {
      user: { id: authedUserId },
    },
    select,
  })

//// Mutations ////
const createProgressJournal = async (
  r: any,
  { authedUserId, data }: MutationCreateProgressJournalArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournal.create({
    data,
    select,
  })

const updateProgressJournal = async (
  r: any,
  { authedUserId, data }: MutationUpdateProgressJournalArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournal.update({
    where: { id: data.id },
    data,
    select,
  })

const deleteProgressJournalById = async (
  r: any,
  { authedUserId, progressJournalId }: MutationDeleteProgressJournalByIdArgs,
  { prisma }: Context,
) => {
  // 1. Get all progressJournalEntry.progressPhotoUrls.
  const progressJournalEntries: ProgressJournalEntry[] = await prisma.progressJournal.findMany(
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

const createProgressJournalGoal = async (
  r: any,
  { authedUserId, data }: MutationCreateProgressJournalGoalArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournalGoal.create({
    data,
    select,
  })

const updateProgressJournalGoal = async (
  r: any,
  { authedUserId, data }: MutationUpdateProgressJournalGoalArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournalGoal.update({
    where: { id: data.id },
    data,
    select,
  })

const deleteProgressJournalGoalById = async (
  r: any,
  {
    authedUserId,
    progressJournalGoalId,
  }: MutationDeleteProgressJournalGoalByIdArgs,
  { prisma }: Context,
) => {
  const deletedProgressJournalGoal: ProgressJournalGoal = await prisma.progressJournalGoal.delete(
    {
      where: { id: progressJournalGoalId },
    },
  )
  return deletedProgressJournalGoal.id
}

const createProgressJournalEntry = async (
  r: any,
  { authedUserId, data }: MutationCreateProgressJournalEntryArgs,
  { select, prisma }: Context,
) =>
  prisma.progressJournalEntry.create({
    data,
    select,
  })

const updateProgressJournalEntry = async (
  r: any,
  { authedUserId, data }: MutationUpdateProgressJournalEntryArgs,
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
    (url) => !data.progressPhotoUrls || !data.progressPhotoUrls.includes(url),
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
  {
    authedUserId,
    progressJournalEntryId,
  }: MutationDeleteProgressJournalEntryByIdArgs,
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
  createProgressJournal,
  updateProgressJournal,
  deleteProgressJournalById,
  createProgressJournalGoal,
  updateProgressJournalGoal,
  deleteProgressJournalGoalById,
  createProgressJournalEntry,
  updateProgressJournalEntry,
  deleteProgressJournalEntryById,
}

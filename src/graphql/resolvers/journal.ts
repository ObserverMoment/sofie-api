import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  JournalGoal,
  JournalMood,
  JournalNote,
  MutationCreateJournalGoalArgs,
  MutationCreateJournalMoodArgs,
  MutationCreateJournalNoteArgs,
  MutationDeleteJournalGoalByIdArgs,
  MutationDeleteJournalMoodByIdArgs,
  MutationDeleteJournalNoteByIdArgs,
  MutationUpdateJournalMoodArgs,
  MutationUpdateJournalNoteArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../lib/uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'

//// Queries ////
export const journalNotes = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const notes = await prisma.journalNote.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return notes as JournalNote[]
}

export const journalMoods = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const journalMoods = await prisma.journalMood.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return journalMoods as JournalMood[]
}

export const journalGoals = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const journalGoals = await prisma.journalGoal.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return journalGoals as JournalGoal[]
}

//// Mutations ////
//// Notes ////
export const createJournalNote = async (
  r: any,
  { data }: MutationCreateJournalNoteArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const note = await prisma.journalNote.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (note) {
    return note as JournalNote
  } else {
    throw new ApolloError('createJournalNote: There was an issue.')
  }
}

export const updateJournalNote = async (
  r: any,
  { data }: MutationUpdateJournalNoteArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check for any old voice note that will need cleaning up + that the user owns the object.
  const prevNote = await prisma.journalNote.findUnique({
    where: { id: data.id },
    select: {
      userId: true,
      voiceNoteUri: true,
    },
  })

  if (!prevNote || prevNote.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const updated = await prisma.journalNote.update({
      where: { id: data.id },
      data,
      select,
    })

    if (updated) {
      if (
        prevNote.voiceNoteUri !== null &&
        prevNote.voiceNoteUri !== data.voiceNoteUri
      ) {
        deleteFiles([prevNote.voiceNoteUri])
      }

      return updated as JournalNote
    } else {
      throw new ApolloError('updateJournalNote: There was an issue.')
    }
  }
}

export const deleteJournalNoteById = async (
  r: any,
  { id }: MutationDeleteJournalNoteByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'journalNote', authedUserId, prisma)

  const deleted = await prisma.journalNote.delete({
    where: { id },
    select: {
      voiceNoteUri: true,
      id: true,
    },
  })

  if (deleted) {
    if (deleted.voiceNoteUri) {
      deleteFiles([deleted.voiceNoteUri])
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteJournalNoteById: There was an issue.')
  }
}

//// Moods ////
export const createJournalMood = async (
  r: any,
  { data }: MutationCreateJournalMoodArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const mood = await prisma.journalMood.create({
    data: {
      ...data,
      tags: data.tags || undefined,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (mood) {
    return mood as JournalMood
  } else {
    throw new ApolloError('createJournalMood: There was an issue.')
  }
}

export const updateJournalMood = async (
  r: any,
  { data }: MutationUpdateJournalMoodArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'journalMood', authedUserId, prisma)

  const updated = await prisma.journalMood.update({
    where: { id: data.id },
    data: {
      ...data,
      moodScore: data.moodScore || undefined,
      energyScore: data.energyScore || undefined,
      // Pass an empty array to clear the tags. Passing null will be ignored.
      tags:
        data.hasOwnProperty('tags') && data.tags !== null
          ? data.tags
          : undefined,
    },
    select,
  })

  if (updated) {
    return updated as JournalMood
  } else {
    throw new ApolloError('updateJournalMood: There was an issue.')
  }
}

export const deleteJournalMoodById = async (
  r: any,
  { id }: MutationDeleteJournalMoodByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'journalMood', authedUserId, prisma)

  const deleted = await prisma.journalMood.delete({
    where: { id },
  })

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteJournalMoodById: There was an issue.')
  }
}

//// Goals ////
export const createJournalGoal = async (
  r: any,
  { data }: MutationCreateJournalGoalArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const goal = await prisma.journalGoal.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (goal) {
    return goal as JournalGoal
  } else {
    throw new ApolloError('createJournalGoal: There was an issue.')
  }
}

export const updateJournalGoal = async (
  r: any,
  { data }: MutationUpdateJournalMoodArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'journalGoal', authedUserId, prisma)

  const updated = await prisma.journalGoal.update({
    where: { id: data.id },
    data,
    select,
  })

  if (updated) {
    return updated as JournalGoal
  } else {
    throw new ApolloError('updateJournalGoal: There was an issue.')
  }
}

export const deleteJournalGoalById = async (
  r: any,
  { id }: MutationDeleteJournalGoalByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'journalGoal', authedUserId, prisma)

  const deleted = await prisma.journalGoal.delete({
    where: { id },
  })

  if (deleted) {
    return id
  } else {
    throw new ApolloError('deleteJournalGoalById: There was an issue.')
  }
}

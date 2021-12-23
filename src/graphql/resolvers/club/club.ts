import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  Club,
  ClubSummary,
  MutationCreateClubArgs,
  MutationDeleteClubArgs,
  MutationUpdateClubSummaryArgs,
  QueryCheckUniqueClubNameArgs,
  QueryClubChatSummaryArgs,
  QueryClubSummariesArgs,
  QueryClubSummaryArgs,
} from '../../../generated/graphql'
import {
  createStreamClubMemberChat,
  deleteStreamClubMemberChat,
} from '../../../lib/getStream'
import { checkClubMediaForDeletion, deleteFiles } from '../../../lib/uploadcare'
import {
  selectForClubChatSummary,
  selectForClubSummary,
  selectForWorkoutPlanSummary,
  selectForWorkoutSummary,
} from '../selectDefinitions'
import { formatWorkoutSummaries } from '../workout/utils'
import { formatWorkoutPlanSummaries } from '../workoutPlan/utils'
import {
  checkUserIsOwnerOrAdminOfClub,
  formatClubChatSummary,
  formatClubSummaries,
  formatClubSummary,
} from './utils'

//// Queries ////
export const checkUniqueClubName = async (
  r: any,
  { name }: QueryCheckUniqueClubNameArgs,
  { prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  })

  return clubs !== null && clubs.length === 0
}

export const userClubs = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: {
      OR: [
        { Owner: { id: authedUserId } },
        { Admins: { some: { id: authedUserId } } },
        { Members: { some: { id: authedUserId } } },
      ],
    },
    select: selectForClubSummary,
  })

  const formattedClubs = formatClubSummaries(clubs)

  return formattedClubs
}

// ClubFinder functionality - filtering and ranking etc.
export const publicClubs = async (r: any, a: any, { prisma }: Context) => {
  const clubs = await prisma.club.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select: selectForClubSummary,
  })

  const formattedClubs = formatClubSummaries(clubs)

  return formattedClubs
}

/// Just the bare minumum data such as name and cover image.
/// Only public data should be serialized here.
export const clubSummaries = async (
  r: any,
  { ids }: QueryClubSummariesArgs,
  { prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: { id: { in: ids } },
    select: selectForClubSummary,
  })

  const formattedClubs = formatClubSummaries(clubs)

  return formattedClubs
}

/// Basic sparse data for displaying in the Club chat. Name, avatar + basic users data.
export const clubChatSummary = async (
  r: any,
  { clubId }: QueryClubChatSummaryArgs,
  { prisma }: Context,
) => {
  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: selectForClubChatSummary,
  })

  if (!club) {
    throw new ApolloError(
      `clubChatSummary: Could not find a club with ID ${clubId}.`,
    )
  }

  return formatClubChatSummary(club)
}

/// A single ClubSummary for displaying on the Club details page.
/// Public data only.
export const clubSummary = async (
  r: any,
  { id }: QueryClubSummaryArgs,
  { prisma }: Context,
) => {
  const club = await prisma.club.findUnique({
    where: { id },
    select: selectForClubSummary,
  })

  if (!club) {
    throw new ApolloError('clubById: Could not find a club with this ID.')
  }

  return formatClubSummary(club)
}

//// Mutations ////
export const createClub = async (
  r: any,
  { data }: MutationCreateClubArgs,
  { authedUserId, prisma }: Context,
) => {
  const club = await prisma.club.create({
    data: {
      ...data,
      Owner: {
        connect: { id: authedUserId },
      },
    },
    select: selectForClubSummary,
  })

  if (club) {
    await createStreamClubMemberChat(club.id, authedUserId)
    return formatClubSummary(club)
  } else {
    throw new ApolloError('createClub: There was an issue.')
  }
}

export const updateClubSummary = async (
  r: any,
  { data }: MutationUpdateClubSummaryArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(data.id, authedUserId, prisma)

  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion: string[] | null = await checkClubMediaForDeletion(
    prisma,
    data,
  )

  const updated = await prisma.club.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
    },
    select: selectForClubSummary,
  })

  if (updated) {
    if (fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return formatClubSummary(updated)
  } else {
    throw new ApolloError('updateClubSummary: There was an issue.')
  }
}

export const deleteClub = async (
  r: any,
  { id }: MutationDeleteClubArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(id, authedUserId, prisma)

  const deleted = await prisma.club.delete({
    where: { id },
    select: {
      id: true,
      coverImageUri: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  const fileIdsForDeletion: string[] = [
    deleted.coverImageUri,
    deleted.introAudioUri,
    deleted.introVideoUri,
    deleted.introVideoThumbUri,
  ].filter((x) => x) as string[]

  if (deleted) {
    if (fileIdsForDeletion.length) {
      await deleteFiles(fileIdsForDeletion)
    }
    await deleteStreamClubMemberChat(deleted.id)
    return deleted.id
  } else {
    throw new ApolloError('deleteClubById: There was an issue.')
  }
}

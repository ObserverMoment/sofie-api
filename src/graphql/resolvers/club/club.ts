import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  Club,
  ClubPublicSummary,
  MutationCreateClubArgs,
  MutationDeleteClubByIdArgs,
  MutationUpdateClubArgs,
  QueryClubByIdArgs,
  QueryClubSummariesByIdArgs,
} from '../../../generated/graphql'
import {
  createStreamClubMemberChat,
  deleteStreamClubMemberChat,
} from '../../../lib/getStream'
import { checkClubMediaForDeletion, deleteFiles } from '../../../lib/uploadcare'
import { checkUserIsMemberOfClub, checkUserIsOwnerOrAdminOfClub } from './utils'

//// Queries ////
export const userClubs = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: {
      OR: [
        { Owner: { id: authedUserId } },
        { Admins: { some: { id: authedUserId } } },
        { Members: { some: { id: authedUserId } } },
      ],
    },
    select,
  })
  return clubs as Club[]
}

/// Just the bare minumum data such as name and cover image.
/// Only public data should be serialized here.
export const publicClubSummaries = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select,
  })
  return clubs as ClubPublicSummary[]
}

/// Just the bare minumum data such as name and cover image.
/// Only public data should be serialized here.
export const clubSummariesById = async (
  r: any,
  { ids }: QueryClubSummariesByIdArgs,
  { select, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: { id: { in: ids } },
    select,
  })
  return clubs as ClubPublicSummary[]
}

export const clubById = async (
  r: any,
  { id }: QueryClubByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsMemberOfClub(id, authedUserId, prisma)
  const club = await prisma.club.findUnique({
    where: { id },
    select,
  })
  return club as Club
}

//// Mutations ////
export const createClub = async (
  r: any,
  { data }: MutationCreateClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const club = await prisma.club.create({
    data: {
      ...data,
      Owner: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (club) {
    await createStreamClubMemberChat((club as Club).id, authedUserId)
    return club as Club
  } else {
    throw new ApolloError('createClub: There was an issue.')
  }
}

export const updateClub = async (
  r: any,
  { data }: MutationUpdateClubArgs,
  { authedUserId, select, prisma }: Context,
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
    select,
  })

  if (updated) {
    if (fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updated as Club
  } else {
    throw new ApolloError('updateClub: There was an issue.')
  }
}

export const deleteClubById = async (
  r: any,
  { id }: MutationDeleteClubByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(id, authedUserId, prisma)

  const deleted = await prisma.club.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    await deleteStreamClubMemberChat(deleted.id)
    return deleted.id
  } else {
    throw new ApolloError('deleteClubById: There was an issue.')
  }
}

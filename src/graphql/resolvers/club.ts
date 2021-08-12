import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  Club,
  ClubInviteToken,
  MutationCreateClubArgs,
  MutationCreateClubInviteTokenArgs,
  MutationDeleteClubByIdArgs,
  MutationDeleteClubInviteTokenByIdArgs,
  MutationUpdateClubArgs,
  MutationUpdateClubInviteTokenArgs,
  QueryClubByIdArgs,
} from '../../generated/graphql'
import { checkClubMediaForDeletion, deleteFiles } from '../../lib/uploadcare'
import { AccessScopeError } from '../utils'

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

export const clubById = async (
  r: any,
  { id }: QueryClubByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
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
    return deleted.id
  } else {
    throw new ApolloError('deleteClubById: There was an issue.')
  }
}

///// ClubInviteToken //////
export const createClubInviteToken = async (
  r: any,
  { data }: MutationCreateClubInviteTokenArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(data.Club.id, authedUserId, prisma)

  const clubInviteToken = await prisma.clubInviteToken.create({
    data: {
      ...data,
      active: true,
      invitesUsed: 0,
      Club: {
        connect: data.Club,
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (clubInviteToken) {
    return clubInviteToken as ClubInviteToken
  } else {
    throw new ApolloError('createClubInviteToken: There was an issue.')
  }
}

export const updateClubInviteToken = async (
  r: any,
  { data }: MutationUpdateClubInviteTokenArgs,
  { select, authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdmin(
    data.id,
    'clubInviteToken',
    authedUserId,
    prisma,
  )

  const updated = await prisma.clubInviteToken.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      active: data.active || undefined,
      inviteLimit: data.inviteLimit || undefined,
    },
    select,
  })

  if (updated) {
    return updated as ClubInviteToken
  } else {
    throw new ApolloError('updateClubInviteToken: There was an issue.')
  }
}

export const deleteClubInviteTokenById = async (
  r: any,
  { id }: MutationDeleteClubInviteTokenByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdmin(id, 'clubInviteToken', authedUserId, prisma)

  const deleted = await prisma.clubInviteToken.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteClubInviteTokenById: There was an issue.')
  }
}

//// Check that a user if either the owner or an admin of a club ////
//// Non-standard vs most other DB objects which only have a single User connected with CRUD access. ////
//// Club can have one Owner and many Admins ////
async function checkUserIsOwnerOrAdmin(
  objectId: string,
  objectType: 'club' | 'clubInviteToken',
  authedUserId: string,
  prisma: PrismaClient,
): Promise<void> {
  if (objectType === 'club') {
    await checkUserIsOwnerOrAdminOfClub(objectId, authedUserId, prisma)
  } else {
    const tokenForDeletion = await prisma.clubInviteToken.findUnique({
      where: { id: objectId },
      select: {
        clubId: true,
      },
    })

    if (!tokenForDeletion || !tokenForDeletion.clubId) {
      throw new ApolloError(
        'checkUserIsOwnerOrAdmin: Could not retrieve the parent club of this invite token.',
      )
    }

    await checkUserIsOwnerOrAdminOfClub(
      tokenForDeletion.clubId,
      authedUserId,
      prisma,
    )
  }
}

async function checkUserIsOwnerOrAdminOfClub(
  clubId: string,
  authedUserId: string,
  prisma: PrismaClient,
) {
  const obj = await prisma.club.findFirst({
    where: {
      id: clubId,
      OR: [
        { Owner: { id: authedUserId } },
        { Admins: { some: { id: authedUserId } } },
      ],
    },
  })
  if (!obj || obj.userId !== authedUserId) {
    throw new AccessScopeError()
  }
}

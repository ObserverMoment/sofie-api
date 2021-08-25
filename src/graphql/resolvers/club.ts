import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  Club,
  ClubInviteToken,
  MutationAddUserToClubViaInviteTokenArgs,
  MutationCreateClubArgs,
  MutationCreateClubInviteTokenArgs,
  MutationDeleteClubByIdArgs,
  MutationDeleteClubInviteTokenByIdArgs,
  MutationRemoveUserFromClubArgs,
  MutationUpdateClubArgs,
  MutationUpdateClubInviteTokenArgs,
  QueryClubByIdArgs,
} from '../../generated/graphql'
import {
  addStreamUserToClubMemberChat,
  createStreamClubMemberChat,
  deleteStreamClubMemberChat,
  removeStreamUserFromClubMemberChat,
} from '../../lib/getStream'
import { checkClubMediaForDeletion, deleteFiles } from '../../lib/uploadcare'
import { ClubWithMemberIdsPayload } from '../../types'
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

///// Manage Members and Admins /////
///// ClubInviteToken //////
// The validity of the token should have already been checked //
export const addUserToClubViaInviteToken = async (
  r: any,
  { userId, clubInviteTokenId }: MutationAddUserToClubViaInviteTokenArgs,
  { select, prisma }: Context,
) => {
  // Get the token info and associated club ID.
  const clubInviteToken = await prisma.clubInviteToken.findUnique({
    where: { id: clubInviteTokenId },
    select: {
      clubId: true,
      inviteLimit: true,
      joinedUserIds: true,
    },
  })

  // These checks are the same as in ./invites.ts! (consider abstracting)
  // Except they throw an ApolloError instead of returning an InviteTokenError
  if (!clubInviteToken) {
    // Token not found
    throw new ApolloError('addUserToClubViaInviteToken: Invite code not found.')
  }

  if (
    clubInviteToken!.inviteLimit !== 0 &&
    clubInviteToken!.joinedUserIds.length >= clubInviteToken!.inviteLimit
  ) {
    // Token has maxed out
    throw new ApolloError(
      'addUserToClubViaInviteToken: This invite code has expired.',
    )
  }

  const updateClub = prisma.club.update({
    where: { id: clubInviteToken.clubId },
    data: {
      Members: {
        connect: { id: userId },
      },
    },
    select,
  })

  const updateTokenInvitesUsed = prisma.clubInviteToken.update({
    where: { id: clubInviteTokenId },
    data: {
      joinedUserIds: {
        set: [...clubInviteToken!.joinedUserIds, userId],
      },
    },
  })

  const [updatedClub, _] = await prisma.$transaction([
    updateClub,
    updateTokenInvitesUsed,
  ])

  if (updatedClub) {
    /// Add the new member to the GetStream chat group.
    await addStreamUserToClubMemberChat((updatedClub as Club).id, userId)
    return updatedClub as Club
  } else {
    throw new ApolloError('addUserToClubViaInviteToken: There was an issue.')
  }
}

export const removeUserFromClub = async (
  r: any,
  { userToRemoveId, clubId }: MutationRemoveUserFromClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  let result = await checkIfAllowedToRemoveUser(
    authedUserId,
    userToRemoveId,
    clubId,
    prisma,
  )

  if (!result.allowed) {
    throw new ApolloError(
      `checkIfAllowedToRemoveUser: You are not allowed to remove this user from this club. Reason: ${result.message}`,
    )
  }

  const disconnect = { disconnect: { id: userToRemoveId } }

  const updatedClub = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: result.memberType === 'ADMIN' ? disconnect : undefined,
      Members: result.memberType === 'MEMBER' ? disconnect : undefined,
    },
    select,
  })

  if (updatedClub) {
    /// Remove the member to the GetStream chat group.
    await removeStreamUserFromClubMemberChat(
      (updatedClub as Club).id,
      userToRemoveId,
    )
    return updatedClub as Club
  } else {
    throw new ApolloError('removeUserFromClub: There was an issue.')
  }
}

// You can only remove a user type with a lower value that yourself as the authed user.
type ClubMemberType = 'OWNER' | 'ADMIN' | 'MEMBER' | 'NONE'
const memberTypeScoreMap: { [key in ClubMemberType]: number } = {
  OWNER: 3,
  ADMIN: 2,
  MEMBER: 1,
  NONE: 0,
}

interface CheckIfAllowedToRemoveUserResult {
  allowed: boolean
  memberType: ClubMemberType
  message?: string
}

async function checkIfAllowedToRemoveUser(
  authedUserId: string,
  userToRemoveId: string,
  clubId: string,
  prisma: PrismaClient,
): Promise<CheckIfAllowedToRemoveUserResult> {
  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: {
      Owner: {
        select: { id: true },
      },
      Admins: {
        select: { id: true },
      },
      Members: {
        select: { id: true },
      },
    },
  })

  if (!club) {
    throw new ApolloError(
      'checkIfAllowedToRemoveUser: Could not retrieve the club you are trying to remove from.',
    )
  }

  const authedUserType: ClubMemberType = getUserClubMemberType(
    club,
    authedUserId,
  )

  const typeOfUserToRemove: ClubMemberType = getUserClubMemberType(
    club,
    userToRemoveId,
  )

  // The user can remove themselves, this is always allowed.
  if (userToRemoveId === authedUserId) {
    return {
      allowed: true,
      memberType: typeOfUserToRemove,
    }
  }

  if (typeOfUserToRemove === 'OWNER') {
    return {
      allowed: false,
      memberType: typeOfUserToRemove,
      message:
        'checkIfAllowedToRemoveUser: You cannot remove an owner from the club. The club would need to be deleted or another owner would need to be assigned.',
    }
  }

  if (typeOfUserToRemove === 'NONE') {
    throw new ApolloError(
      'checkIfAllowedToRemoveUser: Could not find the user you are trying to remove in the club that you have specified.',
    )
  }

  if (
    memberTypeScoreMap[authedUserType] <= memberTypeScoreMap[typeOfUserToRemove]
  ) {
    return {
      allowed: false,
      memberType: typeOfUserToRemove,
      message:
        'checkIfAllowedToRemoveUser: The authed user can only remove other users with a lower access level type than themselves.',
    }
  }

  return {
    allowed: true,
    memberType: typeOfUserToRemove,
  }
}

function getUserClubMemberType(
  club: ClubWithMemberIdsPayload,
  userId: string,
): ClubMemberType {
  return club!.Owner.id === userId
    ? 'OWNER'
    : club!.Admins.some((a) => a.id === userId)
    ? 'ADMIN'
    : club!.Members.some((m) => m.id === userId)
    ? 'MEMBER'
    : 'NONE'
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
    const token = await prisma.clubInviteToken.findUnique({
      where: { id: objectId },
      select: {
        clubId: true,
      },
    })

    if (!token || !token.clubId) {
      throw new ApolloError(
        'checkUserIsOwnerOrAdmin: Could not retrieve the parent club of this invite token.',
      )
    }

    await checkUserIsOwnerOrAdminOfClub(token.clubId, authedUserId, prisma)
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

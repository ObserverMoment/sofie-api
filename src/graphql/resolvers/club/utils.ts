import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { ClubSummaryData, ClubWithMemberIdsPayload } from '../../../types'
import { AccessScopeError } from '../../utils'

export function formatClubSummaries(clubs: ClubSummaryData[]) {
  return clubs.map((c) => formatClubSummary(c))
}

export function formatClubSummary(club: ClubSummaryData) {
  return {
    id: club.id,
    createdAt: club.createdAt,
    name: club.name,
    description: club.description,
    coverImageUri: club.coverImageUri,
    location: club.location,
    memberCount: (club?._count.Members || 0) + (club?._count.Admins || 0),
    Owner: {
      id: club.Owner.id,
      displayName: club.Owner.displayName,
      avatarUri: club.Owner.avatarUri,
      userProfileScope: club.Owner.userProfileScope,
    },
  }
}

// You can only remove a user type with a lower value that yourself as the authed user.
export type ClubMemberType = 'OWNER' | 'ADMIN' | 'MEMBER' | 'NONE'
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

export async function checkIfAllowedToRemoveUser(
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
export async function checkUserIsOwnerOrAdmin(
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

export async function checkUserIsOwnerOfClub(
  clubId: string,
  authedUserId: string,
  prisma: PrismaClient,
) {
  const obj = await prisma.club.findFirst({
    where: {
      id: clubId,
      Owner: { id: authedUserId },
    },
    select: {
      userId: true,
    },
  })
  if (!obj || obj.userId !== authedUserId) {
    throw new AccessScopeError('User is not owner: checkUserIsOwnerOfClub')
  }
}

export async function checkUserIsOwnerOrAdminOfClub(
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
    select: { id: true },
  })
  if (!obj) {
    throw new AccessScopeError(
      'User is not owner or admin: checkUserIsOwnerOrAdminOfClub',
    )
  }
}

export async function checkUserIsMemberOfClub(
  clubId: string,
  authedUserId: string,
  prisma: PrismaClient,
) {
  const isMember = await isUserClubMember(clubId, authedUserId, prisma)

  if (!isMember) {
    throw new AccessScopeError(
      'User is not a member of this club: checkUserIsMemberOfClub',
    )
  }
}

/// Doesn't throw an error - just does the check and return a [boolean]
export async function isUserClubMember(
  clubId: string,
  authedUserId: string,
  prisma: PrismaClient,
): Promise<boolean> {
  const obj = await prisma.club.findFirst({
    where: {
      id: clubId,
      OR: [
        { Owner: { id: authedUserId } },
        { Admins: { some: { id: authedUserId } } },
        { Members: { some: { id: authedUserId } } },
      ],
    },
    select: { id: true },
  })

  return obj !== null
}

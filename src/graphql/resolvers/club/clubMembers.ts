import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  Club,
  MutationAddUserToClubViaInviteTokenArgs,
  MutationCreateClubInviteTokenArgs,
  MutationDeleteClubInviteTokenArgs,
  MutationGiveMemberAdminStatusArgs,
  MutationRemoveMemberAdminStatusArgs,
  MutationRemoveUserFromClubArgs,
  MutationUpdateClubInviteTokenArgs,
  MutationUserJoinPublicClubArgs,
  QueryCheckUserClubMemberStatusArgs,
  QueryClubInviteTokensArgs,
  QueryClubMembersArgs,
} from '../../../generated/graphql'
import {
  addStreamUserToClubMemberChat,
  removeStreamUserFromClubMemberChat,
} from '../../../lib/getStream'
import {
  selectForClubInviteToken,
  selectForClubMembers,
} from '../selectDefinitions'
import {
  checkIfAllowedToRemoveUser,
  checkUserIsMemberOfClub,
  checkUserIsOwnerOfClub,
  checkUserIsOwnerOrAdmin,
  checkUserIsOwnerOrAdminOfClub,
  formatClubMembers,
  getUserClubMemberStatus,
} from './utils'

///// Queries ///////
export const checkUserClubMemberStatus = async (
  r: any,
  { clubId }: QueryCheckUserClubMemberStatusArgs,
  { authedUserId, prisma }: Context,
) => {
  return getUserClubMemberStatus(clubId, authedUserId, prisma)
}

export const clubMembers = async (
  r: any,
  { clubId }: QueryClubMembersArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check that user is a member.
  await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: selectForClubMembers,
  })

  if (!club) {
    throw new ApolloError(
      `clubMembers: Unable to retrieve data for club ${clubId}.`,
    )
  } else {
    return formatClubMembers(clubId, club)
  }
}

export const clubInviteTokens = async (
  r: any,
  { clubId }: QueryClubInviteTokensArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check that user is owner or admin.
  await checkUserIsOwnerOrAdmin(clubId, 'club', authedUserId, prisma)

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: {
      id: true,
      ClubInviteTokens: {
        select: selectForClubInviteToken,
      },
    },
  })

  if (!club) {
    throw new ApolloError(
      `clubInviteTokens: Unable to retrieve data for club ${clubId}.`,
    )
  } else {
    return { id: club.id, tokens: club.ClubInviteTokens }
  }
}

///// Mutations //////
///// Public Club Memberships //////
///// Any user can join / leave whenever they want //////
export const userJoinPublicClub = async (
  r: any,
  { clubId }: MutationUserJoinPublicClubArgs,
  { authedUserId, prisma }: Context,
) => {
  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      Members: {
        connect: { id: authedUserId },
      },
    },
    select: {
      id: true,
    },
  })

  if (updated) {
    /// Add the new member to the GetStream chat group.
    await addStreamUserToClubMemberChat(updated.id, authedUserId)
    return updated.id
  } else {
    throw new ApolloError('userJoinPublicClub: There was an issue.')
  }
}

///// ClubInviteToken //////
export const createClubInviteToken = async (
  r: any,
  { data }: MutationCreateClubInviteTokenArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(data.clubId, authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: data.clubId },
    data: {
      ClubInviteTokens: {
        create: [
          {
            name: data.name,
            inviteLimit: data.inviteLimit,
            active: true,
            User: {
              connect: { id: authedUserId },
            },
          },
        ],
      },
    },
    select: {
      id: true,
      ClubInviteTokens: {
        select: selectForClubInviteToken,
      },
    },
  })

  if (updated) {
    return {
      id: updated.id,
      tokens: updated.ClubInviteTokens,
    }
  } else {
    throw new ApolloError('createClubInviteToken: There was an issue.')
  }
}

export const updateClubInviteToken = async (
  r: any,
  { data }: MutationUpdateClubInviteTokenArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdmin(
    data.id,
    'clubInviteToken',
    authedUserId,
    prisma,
  )

  // Update the token.
  await prisma.clubInviteToken.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      active: data.active || undefined,
      inviteLimit: data.inviteLimit || undefined,
    },
  })

  // Get the updated tokens list via the Club to easily return [ClubInviteTokens] object.
  const updated = await prisma.club.findUnique({
    where: { id: data.clubId },
    select: {
      id: true,
      ClubInviteTokens: {
        select: selectForClubInviteToken,
      },
    },
  })

  if (updated) {
    return {
      id: updated.id,
      tokens: updated.ClubInviteTokens,
    }
  } else {
    throw new ApolloError('updateClubInviteToken: There was an issue.')
  }
}

export const deleteClubInviteToken = async (
  r: any,
  { data }: MutationDeleteClubInviteTokenArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdmin(
    data.tokenId,
    'clubInviteToken',
    authedUserId,
    prisma,
  )

  // Delete the token.
  await prisma.clubInviteToken.delete({
    where: { id: data.tokenId },
    select: {
      id: true,
    },
  })

  // Get the updated tokens list via the Club to easily return [ClubInviteTokens] object.
  const updated = await prisma.club.findUnique({
    where: { id: data.clubId },
    select: {
      id: true,
      ClubInviteTokens: {
        select: selectForClubInviteToken,
      },
    },
  })

  if (updated) {
    return {
      id: updated.id,
      tokens: updated.ClubInviteTokens,
    }
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
  { prisma }: Context,
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
    select: {
      id: true,
    },
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
    return updatedClub.id
  } else {
    throw new ApolloError('addUserToClubViaInviteToken: There was an issue.')
  }
}

export const giveMemberAdminStatus = async (
  r: any,
  { userId, clubId }: MutationGiveMemberAdminStatusArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOfClub(clubId, authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: {
        connect: { id: userId },
      },
      Members: {
        disconnect: { id: userId },
      },
    },
    select: selectForClubMembers,
  })

  if (updated) {
    return formatClubMembers(clubId, updated)
  } else {
    throw new ApolloError('giveMemberAdminStatus: There was an issue.')
  }
}

export const removeMemberAdminStatus = async (
  r: any,
  { userId, clubId }: MutationRemoveMemberAdminStatusArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOfClub(clubId, authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: {
        disconnect: { id: userId },
      },
      Members: {
        connect: { id: userId },
      },
    },
    select: selectForClubMembers,
  })

  if (updated) {
    return formatClubMembers(clubId, updated)
  } else {
    throw new ApolloError('removeMemberAdminStatus: There was an issue.')
  }
}

export const removeUserFromClub = async (
  r: any,
  { userToRemoveId, clubId }: MutationRemoveUserFromClubArgs,
  { authedUserId, prisma }: Context,
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

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: result.memberType === 'ADMIN' ? disconnect : undefined,
      Members: result.memberType === 'MEMBER' ? disconnect : undefined,
    },
    select: {
      id: true,
      ...selectForClubMembers,
      Workouts: {
        select: { id: true },
      },
      WorkoutPlans: {
        select: { id: true },
      },
    },
  })

  /// Find all workouts and plans from the club that the user has saved in their collections and disconnect them. They should not be able to access this content once they have left the club.
  const workoutIdsToRemove = updated.Workouts.map((w) => w.id)
  const workoutPlanIdsToRemove = updated.WorkoutPlans.map((w) => w.id)

  const contentToRemove = await prisma.user.findUnique({
    where: { id: authedUserId },
    select: {
      Collections: {
        select: {
          id: true,
          Workouts: {
            where: {
              id: { in: workoutIdsToRemove },
            },
          },
          WorkoutPlans: {
            where: {
              id: { in: workoutPlanIdsToRemove },
            },
          },
        },
      },
    },
  })

  const collectionsToProcess =
    contentToRemove?.Collections.filter(
      (c) => c.Workouts.length > 0 || c.WorkoutPlans.length > 0,
    ) || []

  for await (const collection of collectionsToProcess) {
    await prisma.collection.update({
      where: { id: collection.id },
      data: {
        Workouts: {
          disconnect: collection.Workouts.map((w) => ({ id: w.id })),
        },
        WorkoutPlans: {
          disconnect: collection.WorkoutPlans.map((w) => ({ id: w.id })),
        },
      },
    })
  }

  if (updated) {
    /// Remove the member from the GetStream chat group.
    await removeStreamUserFromClubMemberChat(updated.id, userToRemoveId)
    return formatClubMembers(clubId, updated)
  } else {
    throw new ApolloError('removeUserFromClub: There was an issue.')
  }
}

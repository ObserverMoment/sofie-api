import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  Club,
  ClubInviteToken,
  MutationAddUserToClubViaInviteTokenArgs,
  MutationCreateClubInviteTokenArgs,
  MutationDeleteClubInviteTokenByIdArgs,
  MutationGiveMemberAdminStatusArgs,
  MutationRemoveMemberAdminStatusArgs,
  MutationRemoveUserFromClubArgs,
  MutationUpdateClubInviteTokenArgs,
  MutationUserJoinPublicClubArgs,
  Workout,
  WorkoutPlan,
} from '../../../generated/graphql'
import {
  addStreamUserToClubMemberChat,
  removeStreamUserFromClubMemberChat,
} from '../../../lib/getStream'
import {
  checkIfAllowedToRemoveUser,
  checkUserIsOwnerOfClub,
  checkUserIsOwnerOrAdmin,
  checkUserIsOwnerOrAdminOfClub,
} from './utils'

///// Public Club Memberships //////
///// Any user can join / leave whenever they want //////
export const userJoinPublicClub = async (
  r: any,
  { clubId }: MutationUserJoinPublicClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: any = await prisma.club.update({
    where: { id: clubId },
    data: {
      Members: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (updated) {
    /// Add the new member to the GetStream chat group.
    await addStreamUserToClubMemberChat((updated as Club).id, authedUserId)
    return updated.id
  } else {
    throw new ApolloError('userJoinPublicClub: There was an issue.')
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

export const giveMemberAdminStatus = async (
  r: any,
  { userId, clubId }: MutationGiveMemberAdminStatusArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOfClub(clubId, authedUserId, prisma)

  const updatedClub = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: {
        connect: { id: userId },
      },
      Members: {
        disconnect: { id: userId },
      },
    },
    select,
  })

  if (updatedClub) {
    return updatedClub as Club
  } else {
    throw new ApolloError('giveMemberAdminStatus: There was an issue.')
  }
}

export const removeMemberAdminStatus = async (
  r: any,
  { userId, clubId }: MutationRemoveMemberAdminStatusArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOfClub(clubId, authedUserId, prisma)

  const updatedClub = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: {
        disconnect: { id: userId },
      },
      Members: {
        connect: { id: userId },
      },
    },
    select,
  })

  if (updatedClub) {
    return updatedClub as Club
  } else {
    throw new ApolloError('removeMemberAdminStatus: There was an issue.')
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

  const updatedClub: any = await prisma.club.update({
    where: { id: clubId },
    data: {
      Admins: result.memberType === 'ADMIN' ? disconnect : undefined,
      Members: result.memberType === 'MEMBER' ? disconnect : undefined,
    },
    select,
  })

  /// Find all workouts and plans from the club that the user has saved in their collections and disconnect them. They should not be able to access this content once they have left the club.
  const workoutIdsToRemove = updatedClub.Workouts.map((w: Workout) => w.id)
  const workoutPlanIdsToRemove = updatedClub.WorkoutPlans.map(
    (w: WorkoutPlan) => w.id,
  )

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

  if (updatedClub) {
    /// Remove the member from the GetStream chat group.
    await removeStreamUserFromClubMemberChat(updatedClub.id, userToRemoveId)
    return updatedClub as Club
  } else {
    throw new ApolloError('removeUserFromClub: There was an issue.')
  }
}

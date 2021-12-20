import { Context } from '../..'
import {
  Club,
  ClubInviteTokenData,
  InviteTokenError,
  QueryCheckClubInviteTokenArgs,
} from '../../generated/graphql'
import { formatClubSummary } from './club/utils'
import { selectForClubSummary } from './selectDefinitions'

/// Note: The ID is the token
export const checkClubInviteToken = async (
  r: any,
  { id }: QueryCheckClubInviteTokenArgs,
  { authedUserId, prisma }: Context,
) => {
  /// Check that the token is valid and that is has not maxed out.
  const clubInviteToken = await prisma.clubInviteToken.findUnique({
    where: { id },
    select: {
      id: true,
      inviteLimit: true,
      joinedUserIds: true,
      clubId: true,
    },
  })

  if (!clubInviteToken) {
    /// Token not found
    return {
      message: 'This invite code is not found or not valid.',
    } as InviteTokenError
  }

  if (
    clubInviteToken!.inviteLimit !== null &&
    clubInviteToken!.inviteLimit !== 0 &&
    clubInviteToken!.joinedUserIds.length >= clubInviteToken!.inviteLimit
  ) {
    /// Token has maxed out
    return {
      message: 'This invite code has expired.',
    } as InviteTokenError
  }

  /// Check if the user is already a member of this club.
  const clubPeople = await prisma.club.findUnique({
    where: { id: clubInviteToken!.clubId },
    select: {
      Owner: {
        select: { id: true },
      },
      Admins: { select: { id: true } },
      Members: { select: { id: true } },
    },
  })

  if (!clubPeople) {
    /// Associated Club not found.
    return {
      message: 'There was a problem retrieving details of the Club.',
    } as InviteTokenError
  }

  const isMember = [
    clubPeople!.Owner.id,
    ...clubPeople!.Admins.map((a) => a.id),
    ...clubPeople!.Members.map((m) => m.id),
  ].includes(authedUserId)

  if (isMember) {
    return {
      message: 'It looks like you are already a member of this Club.',
    } as InviteTokenError
  }

  const club = await prisma.club.findUnique({
    where: { id: clubInviteToken!.clubId },
    select: selectForClubSummary,
  })

  if (!club) {
    /// Associated Club not found.
    return {
      message: 'There was a problem retrieving details of the Club.',
    } as InviteTokenError
  }

  return {
    token: clubInviteToken!.id,
    Club: formatClubSummary(club),
    introVideoUri: club.introVideoUri,
    introVideoThumbUri: club.introVideoThumbUri,
    introAudioUri: club.introAudioUri,
  } as ClubInviteTokenData
}

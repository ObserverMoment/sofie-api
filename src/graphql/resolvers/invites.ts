import { Context } from '../..'
import {
  Club,
  ClubInviteTokenData,
  InviteTokenError,
  QueryCheckClubInviteTokenArgs,
} from '../../generated/graphql'

/// Note: The ID is the token
export const checkClubInviteToken = async (
  r: any,
  { id }: QueryCheckClubInviteTokenArgs,
  { select, prisma }: Context,
) => {
  /// Check that the token is valid and that is has not maxed out.
  const clubInviteToken = await prisma.clubInviteToken.findUnique({
    where: { id },
    select: {
      id: true,
      inviteLimit: true,
      invitesUsed: true,
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
    clubInviteToken!.inviteLimit !== 0 &&
    clubInviteToken!.invitesUsed >= clubInviteToken!.inviteLimit
  ) {
    /// Token has maxed out
    return {
      message: 'This invite code has expired.',
    } as InviteTokenError
  }

  const club = await prisma.club.findUnique({
    where: { id: clubInviteToken!.clubId },
    select: select.Club.select,
  })

  if (!club) {
    /// Associated Club not found.
    return {
      message: 'There was a problem retrieving details of the Club.',
    } as InviteTokenError
  }

  return {
    token: clubInviteToken!.id,
    Club: club as Club,
  } as ClubInviteTokenData
}

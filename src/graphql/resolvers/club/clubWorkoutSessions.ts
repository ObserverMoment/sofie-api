import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationAddResistanceSessionToClubArgs,
  MutationRemoveResistanceSessionFromClubArgs,
  ResistanceSession,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { checkUserIsOwnerOrAdminOfClub } from './utils'

////// Mutations ///////
export const addResistanceSessionToClub = async (
  r: any,
  { sessionId, clubId }: MutationAddResistanceSessionToClubArgs,
  { select, authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(
    sessionId,
    'resistanceSession',
    authedUserId,
    prisma,
  )

  const updated = await prisma.resistanceSession.update({
    where: { id: sessionId },
    data: {
      Club: {
        connect: { id: clubId },
      },
    },
    select,
  })

  if (updated) {
    return updated as ResistanceSession
  } else {
    throw new ApolloError('addResistanceSessionToClub: There was an issue.')
  }
}

export const removeResistanceSessionFromClub = async (
  r: any,
  { sessionId, clubId }: MutationRemoveResistanceSessionFromClubArgs,
  { select, authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(sessionId, authedUserId, prisma)
  await checkUserOwnsObject(
    sessionId,
    'resistanceSession',
    authedUserId,
    prisma,
  )

  const updated = await prisma.resistanceSession.update({
    where: { id: sessionId },
    data: {
      Club: {
        disconnect: true,
      },
    },
    select,
  })

  if (updated) {
    return updated as ResistanceSession
  } else {
    throw new ApolloError(
      'removeResistanceSessionFromClub: There was an issue.',
    )
  }
}

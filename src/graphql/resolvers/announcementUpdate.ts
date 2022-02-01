import { Context } from '../..'
import {
  AnnouncementUpdate,
  MutationMarkAnnouncementUpdateAsSeenArgs,
} from '../../generated/graphql'

///// Queries /////
export const announcementUpdates = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const announcements = await prisma.announcementUpdate.findMany({
    where: {
      UsersMarkedSeen: {
        none: {
          id: authedUserId,
        },
      },
    },
    select,
  })

  return announcements as AnnouncementUpdate[]
}
////// Mutations /////
export const markAnnouncementUpdateAsSeen = async (
  r: any,
  { data }: MutationMarkAnnouncementUpdateAsSeenArgs,
  { authedUserId, prisma }: Context,
) => {
  const updated = await prisma.announcementUpdate.update({
    where: {
      id: data.announcementUpdateId,
    },
    data: {
      UsersMarkedSeen: {
        connect: { id: authedUserId },
      },
    },
    select: {
      id: true,
    },
  })

  return updated.id
}

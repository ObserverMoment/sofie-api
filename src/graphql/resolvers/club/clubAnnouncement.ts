import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationCreateClubAnnouncementArgs,
  MutationDeleteClubAnnouncementArgs,
  MutationUpdateClubAnnouncementArgs,
} from '../../../generated/graphql'
import {
  checkClubAnnouncementMediaForDeletion,
  deleteFiles,
} from '../../../lib/uploadcare'
import { checkUserOwnsObject } from '../../utils'
import { selectForClubAnnouncement } from '../selectDefinitions'
import { checkUserIsOwnerOrAdmin } from './utils'

//// Mutations ////
export const createClubAnnouncement = async (
  r: any,
  { data }: MutationCreateClubAnnouncementArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdmin(data.Club.id, 'club', authedUserId, prisma)

  const announcement = await prisma.clubAnnouncement.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      Club: { connect: data.Club },
    },
    select: selectForClubAnnouncement,
  })

  if (announcement) {
    return announcement
  } else {
    throw new ApolloError('createClubAnnouncement: There was an issue.')
  }
}

export const updateClubAnnouncement = async (
  r: any,
  { data }: MutationUpdateClubAnnouncementArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'clubAnnouncement', authedUserId, prisma)

  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion: string[] | null =
    await checkClubAnnouncementMediaForDeletion(prisma, data)

  const updated = await prisma.clubAnnouncement.update({
    where: { id: data.id },
    data: {
      ...data,
      description: data.description || undefined,
    },
    select: selectForClubAnnouncement,
  })

  if (updated) {
    if (fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updated
  } else {
    throw new ApolloError('updateClubAnnouncement: There was an issue.')
  }
}

export const deleteClubAnnouncement = async (
  r: any,
  { id }: MutationDeleteClubAnnouncementArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'clubAnnouncement', authedUserId, prisma)

  const deleted = await prisma.clubAnnouncement.delete({
    where: { id },
    select: {
      id: true,
      imageUri: true,
      audioUri: true,
      videoUri: true,
      videoThumbUri: true,
    },
  })

  const fileIdsForDeletion: string[] = [
    deleted.imageUri,
    deleted.audioUri,
    deleted.videoUri,
    deleted.videoThumbUri,
  ].filter((x) => x) as string[]

  if (deleted) {
    if (fileIdsForDeletion.length) {
      await deleteFiles(fileIdsForDeletion)
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteClubAnnouncement: There was an issue.')
  }
}

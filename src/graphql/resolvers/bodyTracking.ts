import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  BodyTrackingEntry,
  MutationCreateBodyTrackingEntryArgs,
  MutationDeleteBodyTrackingEntryByIdArgs,
  MutationUpdateBodyTrackingEntryArgs,
} from '../../generated/graphql'
import {
  checkBodyTrackingEntryMediaForDeletion,
  deleteFiles,
} from '../../lib/uploadcare'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const bodyTrackingEntries = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const photos = await prisma.bodyTrackingEntry.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return photos as BodyTrackingEntry[]
}

//// Mutations ////
export const createBodyTrackingEntry = async (
  r: any,
  { data }: MutationCreateBodyTrackingEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const entry = await prisma.bodyTrackingEntry.create({
    data: {
      ...data,
      bodyweightUnit: data.bodyweightUnit || undefined,
      photoUris: data.photoUris || [],
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (entry) {
    return entry as BodyTrackingEntry
  } else {
    throw new ApolloError('createBodyTrackingEntry: There was an issue.')
  }
}

export const updateBodyTrackingEntry = async (
  r: any,
  { data }: MutationUpdateBodyTrackingEntryArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'bodyTrackingEntry', authedUserId, prisma)

  /// If user has passed some array of photoUris then check against previous for changes. We will delete these after the update.
  const mediaFileUrisForDeletion: string[] = data.hasOwnProperty('photoUris')
    ? await checkBodyTrackingEntryMediaForDeletion(prisma, data)
    : []

  const updated = await prisma.bodyTrackingEntry.update({
    where: { id: data.id },
    data: {
      ...data,
      bodyweightUnit: data.bodyweightUnit || undefined,
      // If [photoUris] is null then ignore it.
      photoUris:
        data.hasOwnProperty('photoUris') && data.photoUris !== null
          ? data.photoUris!
          : undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as BodyTrackingEntry
  } else {
    throw new ApolloError('updateBodyTrackingEntry: There was an issue.')
  }
}

export const deleteBodyTrackingEntryById = async (
  r: any,
  { id }: MutationDeleteBodyTrackingEntryByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'bodyTrackingEntry', authedUserId, prisma)

  const deleted = await prisma.bodyTrackingEntry.delete({
    where: { id },
    select: {
      id: true,
      photoUris: true,
    },
  })

  if (deleted) {
    if (deleted.photoUris.length > 0) {
      await deleteFiles(deleted.photoUris)
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteBodyTrackingEntryById: There was an issue.')
  }
}

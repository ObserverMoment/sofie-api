import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  BodyTransformationPhoto,
  MutationCreateBodyTransformationPhotoArgs,
  MutationUpdateBodyTransformationPhotoArgs,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
export const bodyTransformationPhotos = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const photos = await prisma.bodyTransformationPhoto.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return photos as BodyTransformationPhoto[]
}

//// Mutations ////
/// TODO: Should be able to create multiple photos at once
export const createBodyTransformationPhotos = async (
  r: any,
  { data }: MutationCreateBodyTransformationPhotoArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const photo = await prisma.bodyTransformationPhoto.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (photo) {
    return photo as BodyTransformationPhoto
  } else {
    throw new ApolloError('createBodyTransformationPhoto: There was an issue.')
  }
}

export const updateBodyTransformationPhoto = async (
  r: any,
  { data }: MutationUpdateBodyTransformationPhotoArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'bodyTransformationPhoto',
    authedUserId,
    prisma,
  )

  /// TODO: Check for media changes.

  const updated = await prisma.bodyTransformationPhoto.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as Collection
  } else {
    throw new ApolloError('updateCollection: There was an issue.')
  }
}

/// TODO: Should be able to delete multiple photos at once
export const deleteBodyTransformationPhotosById = async (
  r: any,
  { id }: MutationDeleteCollectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'collection', authedUserId, prisma)

  const deleted = await prisma.collection.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  /// TODO: Delete

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteCollectionById: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  BodyTransformationPhoto,
  MutationCreateBodyTransformationPhotosArgs,
  MutationDeleteBodyTransformationPhotosByIdArgs,
  MutationUpdateBodyTransformationPhotoArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../uploadcare'
import { checkUserAccessScopeMulti, checkUserOwnsObject } from '../utils'

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
export const createBodyTransformationPhotos = async (
  r: any,
  { data }: MutationCreateBodyTransformationPhotosArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const ops = data.map((d) =>
    prisma.bodyTransformationPhoto.create({
      data: {
        ...d,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    }),
  )

  const photos = await prisma.$transaction(ops)

  if (photos && photos.length > 0) {
    return photos as BodyTransformationPhoto[]
  } else {
    throw new ApolloError('createBodyTransformationPhotos: There was an issue.')
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

  let mediaFileUriForDeletion: string | null = null

  if (data.photoUri) {
    // Check for media changes.
    const oldPhoto = await prisma.bodyTransformationPhoto.findUnique({
      where: {
        id: data.id,
      },
      select: {
        photoUri: true,
      },
    })

    if (oldPhoto?.photoUri && data.photoUri !== oldPhoto!.photoUri) {
      mediaFileUriForDeletion = oldPhoto!.photoUri
    }
  }

  const updated = await prisma.bodyTransformationPhoto.update({
    where: { id: data.id },
    data: {
      ...data,
      photoUri: data.photoUri || undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUriForDeletion) {
      deleteFiles([mediaFileUriForDeletion])
    }
    return updated as BodyTransformationPhoto
  } else {
    throw new ApolloError('updateBodyTransformationPhoto: There was an issue.')
  }
}

export const deleteBodyTransformationPhotosById = async (
  r: any,
  { ids }: MutationDeleteBodyTransformationPhotosByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // This call and the call below (photosForDeletion) could be combined...
  await checkUserAccessScopeMulti(
    ids,
    'bodyTransformationPhoto',
    authedUserId,
    prisma,
  )

  const photosForDeletion = await prisma.bodyTransformationPhoto.findMany({
    where: { id: { in: ids } },
    select: {
      photoUri: true,
    },
  })

  const mediaFileUrisForDeletion = photosForDeletion.map((p) => p.photoUri)

  const deleted = await prisma.bodyTransformationPhoto.deleteMany({
    where: { id: { in: ids } },
  })

  if (deleted.count === ids.length) {
    deleteFiles(mediaFileUrisForDeletion)
    return ids
  } else {
    throw new ApolloError(
      'deleteBodyTransformationPhotosById: There was an issue.',
    )
  }
}

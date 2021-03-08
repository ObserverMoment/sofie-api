import { ApolloError } from 'apollo-server'
import { Context } from '../..'
import {
  GymProfile,
  MutationCreateGymProfileArgs,
  MutationCreateUserArgs,
  MutationDeleteGymProfileByIdArgs,
  MutationUpdateGymProfileArgs,
  MutationUpdateUserArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryUserByUidArgs,
  QueryUserPublicProfileByUserIdArgs,
  User,
  UserPublicProfile,
} from '../../generated/graphql'
import { checkUserMediaForDeletion, deleteFiles } from '../../uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'

//// Queries ////
export const checkUniqueDisplayName = async (
  r: any,
  { displayName }: QueryCheckUniqueDisplayNameArgs,
  { prisma }: Context,
) => {
  const user = await prisma.user.findUnique({
    where: { displayName },
  })
  return user === null
}

export const userByUid = async (
  r: any,
  { uid }: QueryUserByUidArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const user = await prisma.user.findUnique({
    where: { firebaseUid: uid, id: authedUserId },
    select,
  })

  if (user) {
    return user as User
  } else {
    throw new ApolloError('userByUid: There was an issue.')
  }
}

// Get a single user profile, based on the user id must be public.
export const userPublicProfileByUserId = async (
  r: any,
  { userId }: QueryUserPublicProfileByUserIdArgs,
  { select, prisma }: Context,
) => {
  const user = await prisma.user.findFirst({
    where: { id: userId, userProfileScope: 'PUBLIC' },
    select,
  })

  if (user) {
    return user as UserPublicProfile
  } else {
    throw new ApolloError('userPublicProfileByUserId: There was an issue.')
  }
}

// Public profiles of any users who have set their profiles to public.
export const userPublicProfiles = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const publicUsers = await prisma.user.findMany({
    where: {
      userProfileScope: 'PUBLIC',
    },
    select,
  })
  return publicUsers as UserPublicProfile[]
}

//// Mutations ////
// A brand new user linked to a firebase UID.
export const createUser = async (
  r: any,
  { uid }: MutationCreateUserArgs,
  { select, prisma }: Context,
) => {
  const user = await prisma.user.create({
    data: {
      firebaseUid: uid,
    },
    select,
  })
  return user as User
}

export const updateUser = async (
  r: any,
  { data }: MutationUpdateUserArgs,
  { authedUserId, select, prisma }: Context,
) => {
  if (authedUserId !== data.id) {
    throw new AccessScopeError()
  } else {
    // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
    const fileUrisForDeletion:
      | string[]
      | null = await checkUserMediaForDeletion(prisma, data)

    const updated = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        hasOnboarded: data.hasOnboarded || undefined,
      },
      select,
    })

    if (updated) {
      if (fileUrisForDeletion && fileUrisForDeletion.length > 0) {
        await deleteFiles(fileUrisForDeletion)
      }
      return updated as User
    } else {
      throw new ApolloError('updateUser: There was an issue.')
    }
  }
}

//// Gym Profile ////
export const createGymProfile = async (
  r: any,
  { data }: MutationCreateGymProfileArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const gymProfile = await prisma.gymProfile.create({
    data: {
      ...data,
      bodyweightOnly: data.bodyweightOnly || undefined,
      Equipments: {
        connect: data.Equipments
          ? data.Equipments.map((id: string) => ({ id }))
          : undefined,
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (gymProfile) {
    return gymProfile as GymProfile
  } else {
    throw new ApolloError('createGymProfile: There was an issue.')
  }
}

export const updateGymProfile = async (
  r: any,
  { data }: MutationUpdateGymProfileArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'gymProfile', authedUserId, prisma)
  const updated = await prisma.gymProfile.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      bodyweightOnly: data.bodyweightOnly || undefined,
      Equipments: {
        set: data.Equipments
          ? data.Equipments.map((id: string) => ({ id }))
          : undefined,
      },
    },
    select,
  })

  if (updated) {
    return updated as GymProfile
  } else {
    throw new ApolloError('updateGymProfile: There was an issue.')
  }
}

export const deleteGymProfileById = async (
  r: any,
  { id }: MutationDeleteGymProfileByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'gymProfile', authedUserId, prisma)
  const deleted = await prisma.gymProfile.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteGymProfileById: There was an issue.')
  }
}

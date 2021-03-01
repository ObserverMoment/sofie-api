import { User } from '@prisma/client'
import { AuthenticationError } from 'apollo-server'
import { Context } from '../..'
import {
  MutationCreateGymProfileArgs,
  MutationCreateUserArgs,
  MutationDeleteGymProfileByIdArgs,
  MutationUpdateGymProfileArgs,
  MutationUpdateUserArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryUserByUidArgs,
  QueryUserPublicProfileArgs,
} from '../../generated/graphql'
import { checkUserMediaForDeletion, deleteFiles } from '../../uploadcare'

//// Queries ////
const checkUniqueDisplayName = async (
  r: any,
  { displayName }: QueryCheckUniqueDisplayNameArgs,
  { prisma }: Context,
) => {
  const user = await prisma.user.findUnique({
    where: { displayName },
  })
  return user === null
}

// Public profiles of any users who have set their profiles to public.
const creatorPublicProfiles = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) =>
  prisma.user.findMany({
    where: {
      userProfileScope: 'PUBLIC',
    },
    select,
  })

const userByUid = async (
  r: any,
  { uid }: QueryUserByUidArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.user.findUnique({
    where: { firebaseUid: uid, id: authedUserId },
    select,
  })

// Get a single user profile, must be public.
const userPublicProfile = async (
  r: any,
  { userId }: QueryUserPublicProfileArgs,
  { select, prisma }: Context,
) =>
  prisma.user.findUnique({
    where: { id: userId, userProfileScope: 'PUBLIC' },
    select,
  })

//// Mutations ////
// A brand new user linked to a firebase UID.
const createUser = async (
  r: any,
  { uid }: MutationCreateUserArgs,
  { select, prisma }: Context,
) => {
  return prisma.user.create({
    data: {
      firebaseUid: uid,
    },
    select,
  })
}

const updateUser = async (
  r: any,
  { id, data }: MutationUpdateUserArgs,
  { authedUserId, select, prisma }: Context,
) => {
  if (authedUserId !== id) {
    console.error(
      'Resolver - updateUser: The authed user id and the id being updated do not match.',
    )
    throw new AuthenticationError(
      'You do not have access to this user data: The logged in user id and the id being updated do not match.',
    )
  } else {
    // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
    const fileIdsForDeletion: string[] | null = await checkUserMediaForDeletion(
      prisma,
      id,
      data,
    )

    const updatedUser: User = await prisma.user.update({
      where: {
        id,
      },
      data,
      select,
    })

    if (updatedUser && fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }

    return updatedUser
  }
}

const createGymProfile = async (
  r: any,
  { data }: MutationCreateGymProfileArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.gymProfile.create({
    data: {
      ...data,
      Equipments: {
        connect: data.Equipments
          ? data.Equipments.map((id: string) => ({ id }))
          : [],
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const updateGymProfile = async (
  r: any,
  { data }: MutationUpdateGymProfileArgs,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.gymProfile.update({
    where: {
      id: data.id,
      User: { id: authedUserId },
    },
    data: {
      ...data,
      Equipments: {
        set: data.Equipments
          ? data.Equipments.map((id: string) => ({ id }))
          : [],
      },
    },
    select,
  })

const deleteGymProfileById = async (
  r: any,
  { gymProfileId }: MutationDeleteGymProfileByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  const { id } = await prisma.gymProfile.delete({
    where: {
      id: gymProfileId,
      User: { id: authedUserId },
    },
  })
  return id
}

export {
  checkUniqueDisplayName,
  creatorPublicProfiles,
  userByUid,
  userPublicProfile,
  createUser,
  updateUser,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
}

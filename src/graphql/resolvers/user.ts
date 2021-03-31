import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationUpdateUserArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryUserPublicProfileByUserIdArgs,
  User,
  UserPublicProfile,
} from '../../generated/graphql'
import { checkUserMediaForDeletion, deleteFiles } from '../../uploadcare'

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

export const authedUser = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const user = await prisma.user.findUnique({
    where: { id: authedUserId },
    select,
  })

  if (user) {
    return user as User
  } else {
    throw new ApolloError('authedUser: There was an issue.')
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
// For authed user to update their own details only.
export const updateUser = async (
  r: any,
  { data }: MutationUpdateUserArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileUrisForDeletion: string[] | null = await checkUserMediaForDeletion(
    prisma,
    authedUserId,
    data,
  )

  const updated = await prisma.user.update({
    where: {
      id: authedUserId,
    },
    data: {
      ...data,
      userProfileScope: data.userProfileScope || undefined,
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

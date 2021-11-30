import { PrismaClient } from '.prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateWorkoutTagArgs,
  MutationDeleteWorkoutTagByIdArgs,
  MutationUpdateUserArgs,
  MutationUpdateWorkoutTagArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryUserAvatarByIdArgs,
  QueryUserAvatarsArgs,
  QueryUserPublicProfileByIdArgs,
  QueryUserPublicProfilesArgs,
  User,
  UserAvatarData,
  UserPublicProfile,
  UserPublicProfileSummary,
  WorkoutTag,
} from '../../generated/graphql'
import { checkUserMediaForDeletion, deleteFiles } from '../../lib/uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'
import {
  formatWorkoutSummaries,
  selectForWorkoutSummary,
} from './workout/utils'
import {
  formatWorkoutPlanSummaries,
  selectForWorkoutPlanSummary,
} from './workoutPlan/utils'

//// Queries ////
export const checkUniqueDisplayName = async (
  r: any,
  { displayName }: QueryCheckUniqueDisplayNameArgs,
  { prisma }: Context,
) => {
  const isAvailable = await displayNameIsAvailable(displayName, prisma)
  return isAvailable
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

/// The minimum info needed to display a user avatar.
/// avatarUri + displayName.
export const userAvatars = async (
  r: any,
  { ids }: QueryUserAvatarsArgs,
  { select, prisma }: Context,
) => {
  const userAvatars = await prisma.user.findMany({
    where: { id: { in: ids } },
    select,
  })

  if (userAvatars) {
    return userAvatars as UserAvatarData[]
  } else {
    throw new ApolloError('userAvatars: There was an issue.')
  }
}

export const userAvatarById = async (
  r: any,
  { id }: QueryUserAvatarByIdArgs,
  { select, prisma }: Context,
) => {
  const userAvatar = await prisma.user.findUnique({
    where: { id },
    select,
  })

  if (userAvatar) {
    return userAvatar as UserAvatarData
  } else {
    throw new ApolloError('userAvatarById: There was an issue.')
  }
}

// Public profiles of any users who have set their profiles to public.
export const userPublicProfiles = async (
  r: any,
  { take, cursor }: QueryUserPublicProfilesArgs,
  { prisma }: Context,
) => {
  const publicUsers = await prisma.user.findMany({
    where: {
      userProfileScope: 'PUBLIC',
    },
    take: take ?? 50,
    skip: cursor ? 1 : 0,
    orderBy: {
      id: 'desc',
    },
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    select: {
      id: true,
      avatarUri: true,
      tagline: true,
      townCity: true,
      countryCode: true,
      displayName: true,
      _count: {
        select: {
          Workouts: true,
          WorkoutPlans: true,
        },
      },
    },
  })

  const publicProfileSummaries = publicUsers.map((u) => ({
    id: u.id,
    avatarUri: u.avatarUri,
    tagline: u.tagline,
    townCity: u.townCity,
    countryCode: u.countryCode,
    displayName: u.displayName,
    numberPublicWorkouts: u._count?.Workouts || 0,
    numberPublicPlans: u._count?.WorkoutPlans || 0,
  }))

  return publicProfileSummaries as UserPublicProfileSummary[]
}

// Get a single user profile, based on the user id - fields returned will depend on the user's privacy settings.
export const userPublicProfileById = async (
  r: any,
  { userId }: QueryUserPublicProfileByIdArgs,
  { select, prisma }: Context,
) => {
  const checkScope = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      userProfileScope: true,
    },
  })

  const isPublic = checkScope?.userProfileScope === 'PUBLIC'

  const user: any = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      ...select,
      Workouts: isPublic
        ? {
            where: { contentAccessScope: 'PUBLIC', archived: false },
            select: selectForWorkoutSummary,
          }
        : null,
      WorkoutPlans: isPublic
        ? {
            select: selectForWorkoutPlanSummary,
            where: { contentAccessScope: 'PUBLIC', archived: false },
          }
        : null,
    },
  })

  if (user) {
    return isPublic
      ? ({
          id: user.id,
          userProfileScope: user.userProfileScope,
          avatarUri: user.avatarUri,
          introVideoUri: user.introVideoUri,
          introVideoThumbUri: user.introVideoThumbUri,
          bio: user.bio,
          tagline: user.tagline,
          townCity: user.townCity,
          instagramUrl: user.instagramUrl,
          tiktokUrl: user.tiktokUrl,
          youtubeUrl: user.youtubeUrl,
          snapUrl: user.snapUrl,
          linkedinUrl: user.linkedinUrl,
          countryCode: user.countryCode,
          displayName: user.displayName,
          Workouts: formatWorkoutSummaries(user.Workouts),
          WorkoutPlans: formatWorkoutPlanSummaries(user.WorkoutPlans),
        } as UserPublicProfile)
      : ({
          id: user.id,
          displayName: user.displayName,
          avatarUri: user.avatarUri,
          userProfileScope: user.userProfileScope,
          Workouts: [],
          WorkoutPlans: [],
        } as UserPublicProfile)
  } else {
    throw new AccessScopeError('userPublicProfileById: There was an issue.')
  }
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
      displayName: data.displayName || undefined,
      gender: data.gender || undefined,
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

/// Workout Tags ////
export const userWorkoutTags = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutTags = await prisma.workoutTag.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return workoutTags as WorkoutTag[]
}

export const createWorkoutTag = async (
  r: any,
  { data }: MutationCreateWorkoutTagArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutTag = await prisma.workoutTag.create({
    data: {
      User: { connect: { id: authedUserId } },
      ...data,
    },
    select,
  })

  if (workoutTag) {
    return workoutTag as WorkoutTag
  } else {
    throw new ApolloError('createWorkoutTag: There was an issue.')
  }
}

export const updateWorkoutTag = async (
  r: any,
  { data }: MutationUpdateWorkoutTagArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutTag', authedUserId, prisma)

  const updated = await prisma.workoutTag.update({
    where: { id: data.id },
    data,
    select,
  })

  if (updated) {
    return updated as WorkoutTag
  } else {
    throw new ApolloError('updateWorkoutTag: There was an issue.')
  }
}

export const deleteWorkoutTagById = async (
  r: any,
  { id }: MutationDeleteWorkoutTagByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutTag', authedUserId, prisma)

  const deleted = await prisma.workoutTag.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutTagById: There was an issue.')
  }
}

/////// Utils ///////
/// case insensitive check for a previously existing user with this name.
export async function displayNameIsAvailable(
  name: string,
  prisma: PrismaClient,
): Promise<boolean> {
  const users = await prisma.user.findMany({
    where: {
      displayName: {
        equals: name,
        mode: 'insensitive',
      },
    },
  })

  return users !== null && users.length === 0
}

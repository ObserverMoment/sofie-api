import { PrismaClient } from '.prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateWorkoutTagArgs,
  MutationDeleteWorkoutTagByIdArgs,
  MutationUpdateUserProfileArgs,
  MutationUpdateWorkoutTagArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryUserAvatarByIdArgs,
  QueryUserAvatarsArgs,
  QueryUserProfileArgs,
  QueryUserProfilesArgs,
  UpdateUserProfileResult,
  UserAvatarData,
  UserProfile,
  UserProfileSummary,
  UserRecentlyViewedObject,
  WorkoutTag,
} from '../../generated/graphql'
import {
  getUserFollowersCount,
  updateStreamChatUser,
  updateStreamFeedUser,
} from '../../lib/getStream'
import { checkUserMediaForDeletion, deleteFiles } from '../../lib/uploadcare'
import { AccessScopeError, checkUserOwnsObject } from '../utils'
import { formatClubSummaries } from './club/utils'
import { formatBenchmarkScoreSummaries } from './fitnessBenchmark'
import { calcLifetimeLogStatsSummary } from './loggedWorkout'
import {
  selectForClubSummary,
  selectForWorkoutPlanSummary,
  selectForWorkoutSummary,
} from './selectDefinitions'
import { formatWorkoutSummaries } from './workout/utils'
import { formatWorkoutPlanSummaries } from './workoutPlan/utils'

//// Queries ////
//// Admin Only Queries ////
export const adminAllUsers = async (
  r: any,
  a: any,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      userProfileScope: true,
      avatarUri: true,
      tagline: true,
      townCity: true,
      countryCode: true,
      displayName: true,
      Skills: {
        select: {
          name: true,
        },
      },
      Workouts: {
        where: {
          archived: false,
          contentAccessScope: 'PUBLIC',
        },
        select: {
          id: true,
        },
      },
      WorkoutPlans: {
        where: {
          archived: false,
          contentAccessScope: 'PUBLIC',
        },
        select: {
          id: true,
        },
      },
      ClubsWhereOwner: {
        select: selectForClubSummary,
      },
    },
  })

  if (users) {
    const publicProfileSummaries = users.map((u) => ({
      id: u.id,
      userProfileScope: u.userProfileScope,
      avatarUri: u.avatarUri,
      tagline: u.tagline,
      townCity: u.townCity,
      countryCode: u.countryCode,
      displayName: u.displayName,
      skills: u.Skills.map((s) => s.name),
      workoutCount: u.Workouts.length,
      planCount: u.WorkoutPlans.length,
      Clubs: formatClubSummaries(u.ClubsWhereOwner),
    }))

    return publicProfileSummaries as UserProfileSummary[]
  } else {
    throw new ApolloError('adminAllUsers: There was an issue.')
  }
}
//// End of Admin Only Queries ////

export const checkUniqueDisplayName = async (
  r: any,
  { displayName }: QueryCheckUniqueDisplayNameArgs,
  { prisma }: Context,
) => {
  const isAvailable = await displayNameIsAvailable(displayName, prisma)
  return isAvailable
}

/// From User.recentlyViewedObjects
export const userRecentlyViewedObjects = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  /// String formatted as [type:id]
  const user = await prisma.user.findUnique({
    where: { id: authedUserId },
    select: {
      recentlyViewedObjects: true,
    },
  })

  if (!user) {
    console.error(
      `userRecentlyViewedObjects: Could not find a user with id ${authedUserId}`,
    )
    return [] as UserRecentlyViewedObject[]
  }

  const objects: (UserRecentlyViewedObject | null)[] = await Promise.all(
    user.recentlyViewedObjects.map(async (o) => {
      const info = recentlyViewedObjectInfo(o)
      const data = await prisma[info.type].findUnique({
        where: { id: info.id },
        select: {
          id: true,
          name: true,
        },
      })

      return data
        ? {
            id: data.id,
            name: data.name,
            type: info.type,
          }
        : null
    }),
  )

  if (objects) {
    return objects.filter((x) => x) as UserRecentlyViewedObject[]
  } else {
    throw new ApolloError('userRecentlyViewedObjects: There was an issue.')
  }
}

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
    console.error(
      `userAvatarById: Could not retrieve avatar data for user with id ${id}.`,
    )
    return null
  }
}

// Public profiles of any users who have set their profiles to public.
export const userProfiles = async (
  r: any,
  { take, cursor }: QueryUserProfilesArgs,
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
      userProfileScope: true,
      avatarUri: true,
      tagline: true,
      townCity: true,
      countryCode: true,
      displayName: true,
      Skills: {
        select: {
          name: true,
        },
      },
      Workouts: {
        where: {
          archived: false,
          contentAccessScope: 'PUBLIC',
        },
        select: {
          id: true,
        },
      },
      WorkoutPlans: {
        where: {
          archived: false,
          contentAccessScope: 'PUBLIC',
        },
        select: {
          id: true,
        },
      },
      ClubsWhereOwner: {
        where: { contentAccessScope: 'PUBLIC' },
        select: selectForClubSummary,
      },
    },
  })

  const publicProfileSummaries = publicUsers.map((u) => ({
    id: u.id,
    userProfileScope: u.userProfileScope,
    avatarUri: u.avatarUri,
    tagline: u.tagline,
    townCity: u.townCity,
    countryCode: u.countryCode,
    displayName: u.displayName,
    skills: u.Skills.map((s) => s.name),
    workoutCount: u.Workouts.length,
    planCount: u.WorkoutPlans.length,
    Clubs: formatClubSummaries(u.ClubsWhereOwner),
  }))

  return publicProfileSummaries as UserProfileSummary[]
}

// Get a single user profile, based on the user id - fields returned will depend on the user's privacy settings, profile settings and if they are the one making the request.
export const userProfile = async (
  r: any,
  { userId }: QueryUserProfileArgs,
  { authedUserId, prisma }: Context,
) => {
  const checkScope = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      userProfileScope: true,
    },
  })

  const isAuthedUser = authedUserId === userId
  // User can of course view their own data.
  const isPublic = isAuthedUser || checkScope?.userProfileScope === 'PUBLIC'

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      // Always return this public info.
      id: true,
      displayName: true,
      userProfileScope: true,
      avatarUri: true,
      // Only return this info if profile is either public or the user is retrieving their own data.
      introVideoUri: isPublic,
      introVideoThumbUri: isPublic,
      bio: isPublic,
      tagline: isPublic,
      townCity: isPublic,
      instagramHandle: isPublic,
      tiktokHandle: isPublic,
      youtubeHandle: isPublic,
      linkedinHandle: isPublic,
      countryCode: isPublic,
      // Only return this info if the user is retrieving their own data.
      workoutsPerWeekTarget: isAuthedUser,
      activeProgressWidgets: isAuthedUser,
      activeFitnessBenchmarks: isAuthedUser,
      Skills: true,
      ClubsWhereOwner: isPublic
        ? {
            select: selectForClubSummary,
          }
        : undefined,
      Workouts: {
        where: {
          archived: false,
          contentAccessScope: 'PUBLIC',
        },
        select: {
          id: true,
        },
      },
      WorkoutPlans: {
        where: {
          archived: false,
          contentAccessScope: 'PUBLIC',
        },
        select: {
          id: true,
        },
      },
      // Getting data via scores rather than benchmarks as the user will not own the 'standard' in built benchmarks and we would have to make a separate call here to retrieve them.
      // This also ensure that we can ignore benchmarks that have no submitted scores.
      FitnessBenchmarkScores: {
        select: {
          score: true,
          videoUri: true,
          FitnessBenchmark: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
    },
  })

  if (user) {
    return isPublic || isAuthedUser
      ? ({
          id: user.id,
          userProfileScope: user.userProfileScope,
          avatarUri: user.avatarUri,
          introVideoUri: user.introVideoUri,
          introVideoThumbUri: user.introVideoThumbUri,
          bio: user.bio,
          tagline: user.tagline,
          townCity: user.townCity,
          instagramHandle: user.instagramHandle,
          tiktokHandle: user.tiktokHandle,
          youtubeHandle: user.youtubeHandle,
          linkedinHandle: user.linkedinHandle,
          countryCode: user.countryCode,
          displayName: user.displayName,
          followerCount: await getUserFollowersCount(user.id),
          workoutCount: user.Workouts.length,
          planCount: user.WorkoutPlans.length,
          workoutsPerWeekTarget: isAuthedUser
            ? user.workoutsPerWeekTarget
            : null,
          activeProgressWidgets: isAuthedUser
            ? user.activeProgressWidgets
            : null,
          activeFitnessBenchmarks: isAuthedUser
            ? user.activeFitnessBenchmarks
            : null,
          Skills: user.Skills,
          bestBenchmarkScores: formatBenchmarkScoreSummaries(
            user.FitnessBenchmarkScores,
          ),
          // TODO: Casting as any because [ClubsWhereOwner] was being returned as [Club]
          // The isPublic tiernary is causing some type weirdness?
          // Also stopping me from using [formatClubSummaries] function.
          Clubs: user.ClubsWhereOwner.map((c: any) => ({
            id: c.id,
            createdAt: c.createdAt,
            name: c.name,
            description: c.description,
            coverImageUri: c.coverImageUri,
            introVideoUri: c.introVideoUri,
            introVideoThumbUri: c.introVideoThumbUri,
            introAudioUri: c.introAudioUri,
            location: c.location,
            memberCount: (c._count?.Members || 0) + (c._count?.Admins || 0),
            workoutCount: c._count?.Workouts || 0,
            planCount: c._count?.WorkoutPlans || 0,
            contentAccessScope: c.contentAccessScope,
            Owner: {
              id: user.id,
              displayName: user.displayName,
              avatarUri: user.avatarUri,
            },
            Admins: c.Admins.map((a: any) => ({
              id: a.id,
              displayName: a.displayName,
              avatarUri: a.avatarUri,
            })),
          })),
          LifetimeLogStatsSummary: await calcLifetimeLogStatsSummary(
            user.id,
            prisma,
          ),
        } as UserProfile)
      : ({
          id: user.id,
          displayName: user.displayName,
          avatarUri: user.avatarUri,
          userProfileScope: user.userProfileScope,
          Clubs: [],
          BenchmarksWithBestEntries: [],
          Skills: [],
        } as UserProfile)
  } else {
    console.error(`userProfileById: Could not retrieve User with id ${userId}.`)
    return null
  }
}

//// Mutations ////
// For authed user to update their own details only.
export const updateUserProfile = async (
  r: any,
  { data }: MutationUpdateUserProfileArgs,
  { authedUserId, prisma }: Context,
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
      workoutsPerWeekTarget: data.workoutsPerWeekTarget || undefined,
      activeProgressWidgets: data.activeProgressWidgets || undefined,
      activeFitnessBenchmarks: data.activeFitnessBenchmarks || undefined,
    },
    // Selects only the updated fields plus the ID.
    select: Object.keys(data).reduce(
      (obj, key) => ({
        ...obj,
        [key]: true,
      }),
      { id: true },
    ),
  })

  if (updated) {
    /// Update the user info on Stream Chat.
    if (data.displayName || data.avatarUri) {
      await updateStreamChatUser(
        authedUserId,
        data.displayName || undefined,
        data.avatarUri || undefined,
      )
      await updateStreamFeedUser(
        authedUserId,
        data.displayName || undefined,
        data.avatarUri || undefined,
      )
    }

    if (fileUrisForDeletion && fileUrisForDeletion.length > 0) {
      await deleteFiles(fileUrisForDeletion)
    }
    return updated as UpdateUserProfileResult
  } else {
    throw new ApolloError('updateUserProfile: There was an issue.')
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

type RecentObjectType = 'resistanceWorkout'

interface RecentlyViewedObjectInfo {
  id: string
  type: RecentObjectType
}

function recentlyViewedObjectInfo(typeAndId: string): RecentlyViewedObjectInfo {
  return {
    id: typeAndId.split(':')[1],
    type: typeAndId.split(':')[0] as RecentObjectType,
  }
}

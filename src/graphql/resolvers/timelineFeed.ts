import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateClubTimelinePostArgs,
  MutationDeleteClubTimelinePostArgs,
  QueryClubMembersFeedPostsArgs,
  QueryTimelinePostsDataArgs,
  TimelinePostDataRequestInput,
  TimelinePostFullData,
  TimelinePostObjectData,
  TimelinePostType,
} from '../../generated/graphql'
import {
  createStreamClubMembersFeedActivity,
  deleteStreamClubPostActivity,
  getStreamClubMembersFeedActivities,
} from '../../lib/getStream'
import { checkUserIsMemberOfClub } from './club/utils'

//// Club Timeline Post Mutations ////
export const createClubTimelinePost = async (
  r: any,
  { data }: MutationCreateClubTimelinePostArgs,
  { authedUserId, prisma }: Context,
) => {
  const activityData = await createStreamClubMembersFeedActivity(
    data.clubId,
    authedUserId,
    {
      object: data.object,
      caption: data.caption || undefined,
      tags: data.tags || undefined,
    },
  )

  const postObjectData = (
    await timelinePostDataFromInputRequests(
      [activityData.dataRequestInput],
      prisma,
    )
  )[0]

  return {
    activityId: activityData.activityId,
    postedAt: activityData.postedAt,
    caption: activityData.caption,
    tags: activityData.tags,
    poster: postObjectData.poster,
    creator: postObjectData.creator,
    object: postObjectData.object,
  } as TimelinePostFullData
}

export const deleteClubTimelinePost = async (
  r: any,
  { activityId }: MutationDeleteClubTimelinePostArgs,
  { authedUserId, prisma }: Context,
) => {
  const deleted = await deleteStreamClubPostActivity(
    authedUserId,
    activityId,
    prisma,
  )

  if (deleted) {
    return deleted
  } else {
    throw new ApolloError('deleteClubTimelinePost: There was an issue.')
  }
}

//// Queries ////
// Calls Stream.io to get the activities.
// Then does the work necessary to collect the data needed to display as a timeline.
export const clubMembersFeedPosts = async (
  r: any,
  { clubId, limit, offset }: QueryClubMembersFeedPostsArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

  const activityData = await getStreamClubMembersFeedActivities(
    clubId,
    limit,
    offset,
  )

  const postsObjectData = await timelinePostDataFromInputRequests(
    activityData.map((ad) => ad.dataRequestInput),
    prisma,
  )

  const postsWithFullData = activityData.map((ad) => {
    const objectData = postsObjectData.find(
      (o) => o.activityId === ad.activityId,
    )!

    return {
      activityId: ad.activityId,
      postedAt: ad.postedAt,
      caption: ad.caption,
      tags: ad.tags,
      poster: objectData.poster,
      creator: objectData.creator,
      object: objectData.object,
    }
  })

  return postsWithFullData as TimelinePostFullData[]
}

/// For non club posts (global user posts)
export const timelinePostsData = async (
  r: any,
  { postDataRequests }: QueryTimelinePostsDataArgs,
  { prisma }: Context,
): Promise<TimelinePostObjectData[]> => {
  // Delegated as this process is also used but other resolvers.
  // ClubMembersFeedPosts uses this.
  return await timelinePostDataFromInputRequests(postDataRequests, prisma)
}

export async function timelinePostDataFromInputRequests(
  postDataRequests: TimelinePostDataRequestInput[],
  prisma: PrismaClient,
): Promise<TimelinePostObjectData[]> {
  /// All the user data required for the batch (post creators and object creators)
  const uniquePosterIds: string[] = [
    ...postDataRequests.reduce((unique, next) => {
      unique.add(next.posterId)
      return unique
    }, new Set<string>()),
  ]

  const posters = await prisma.user.findMany({
    where: { id: { in: uniquePosterIds } },
    select: {
      id: true,
      displayName: true,
      avatarUri: true,
    },
  })

  /// Use sets to avoid duplicating IDs.
  const postDataRequestsByType = postDataRequests.reduce(
    (acum, next) => {
      acum[next.objectType].add(next.objectId)
      return acum
    },
    {
      WORKOUT: new Set<string>(),
      WORKOUTPLAN: new Set<string>(),
    },
  )

  const objects = await Promise.all(
    Object.entries(postDataRequestsByType).map(([k, v]) => {
      return (
        {
          WORKOUT: () => workoutPostsData([...v], prisma),
          WORKOUTPLAN: () => workoutPlanPostsData([...v], prisma),
        } as any
      )[k]()
    }),
  )

  const objectsFlat: ObjectAndCreatorData[] = objects.flat()

  const responses: TimelinePostObjectData[] = postDataRequests.map(
    (request) => {
      /// TODO: Need to handle when poster, creator or object cannot be found. Or if fields are missing.
      /// Currently just casting to non nullable and assuming this won't happen.
      const poster = posters.find((p) => p.id === request.posterId)
      const object = objectsFlat.find((o) => o.id === request.objectId)
      return {
        activityId: request.activityId,
        poster: {
          id: poster!.id,
          displayName: poster!.displayName,
          avatarUri: poster?.avatarUri,
        },
        creator: {
          id: object!.creator!.id,
          displayName: object!.creator!.displayName,
          avatarUri: object!.creator?.avatarUri,
        },
        object: {
          id: object!.id,
          type: object!.type,
          name: object!.name,
          introAudioUri: object?.introAudioUri || undefined,
          coverImageUri: object?.coverImageUri || undefined,
          introVideoUri: object?.introVideoUri || undefined,
          introVideoThumbUri: object?.introVideoThumbUri || undefined,
        },
      }
    },
  )

  return responses as TimelinePostObjectData[]
}

async function workoutPostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<ObjectAndCreatorData[]> {
  const responses = await prisma.workout.findMany({
    where: { id: { in: ids } },
    select: selectFields,
  })

  if (responses == null) {
    throw new ApolloError(
      'timelinePostData.workoutPostsData: Could not find any workouts associated with these IDs.',
    )
  }

  return responses.map((r) => mapResponseToObjectType(r, 'WORKOUT'))
}

async function workoutPlanPostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<ObjectAndCreatorData[]> {
  const responses = await prisma.workoutPlan.findMany({
    where: { id: { in: ids } },
    select: selectFields,
  })

  if (responses == null) {
    throw new ApolloError(
      'timelinePostData.workoutPlanPostsData: Could not find any workout plans associated with these IDs.',
    )
  }

  return responses.map((r) => mapResponseToObjectType(r, 'WORKOUTPLAN'))
}

function mapResponseToObjectType(r: any, type: TimelinePostType) {
  return {
    creator: {
      id: r.User.id,
      displayName: r.User.displayName,
      avatarUri: r.User.avatarUri || undefined,
    },
    id: r.id,
    type: type,
    name: r.name,
    introAudioUri: r.introAudioUri || undefined,
    coverImageUri: r.coverImageUri || undefined,
    introVideoUri: r.introVideoUri || undefined,
    introVideoThumbUri: r.introVideoThumbUri || undefined,
  }
}

/// The object and the creator of the object.
interface ObjectAndCreatorData {
  creator: {
    id: string
    displayName: string
    avatarUri?: string
  }
  id: string
  type: TimelinePostType
  name: string
  coverImageUri?: string
  introAudioUri?: string
  introVideoUri?: string
  introVideoThumbUri?: string
}

const selectFields = {
  id: true,
  name: true,
  coverImageUri: true,
  introAudioUri: true,
  introVideoUri: true,
  introVideoThumbUri: true,
  User: {
    select: {
      id: true,
      displayName: true,
      avatarUri: true,
    },
  },
}

import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  QueryTimelinePostsDataArgs,
  TimelinePostData,
  TimelinePostType,
} from '../../generated/graphql'

interface TimelinePostObjectData {
  objectId: string
  objectType: TimelinePostType
  title: string
  audioUri?: string
  imageUri?: string
  videoUri?: string
  videoThumbUri?: string
}

export const timelinePostsData = async (
  r: any,
  { posts }: QueryTimelinePostsDataArgs,
  { prisma }: Context,
): Promise<TimelinePostData[]> => {
  const userIds = posts.map((p) => p.userId)

  const postDataRequestsByType = posts.reduce(
    (acum, next) => {
      acum[next.objectType].push(next.objectId)
      return acum
    },
    {
      WORKOUT: [] as string[],
      WORKOUTPLAN: [] as string[],
      USERPROFILE: [] as string[],
    },
  )

  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      displayName: true,
      avatarUri: true,
    },
  })

  const objects = await Promise.all(
    Object.entries(postDataRequestsByType).map(([k, v]) => {
      return (
        {
          WORKOUT: () => workoutPostsData(v, prisma),
          WORKOUTPLAN: () => workoutPlanPostsData(v, prisma),
          USERPROFILE: () => userPublicProfilePostsData(v, prisma),
        } as any
      )[k]()
    }),
  )

  const objectsFlat: TimelinePostObjectData[] = objects.flat()

  const response: TimelinePostData[] = posts.map((p) => {
    const user = users.find((u) => u.id === p.userId)
    const object = objectsFlat.find((o) => o.objectId === p.objectId)
    return {
      userId: user!.id,
      userAvatarUri: user!.avatarUri,
      userDisplayName: user!.displayName,
      objectId: object!.objectId,
      objectType: object!.objectType,
      title: object!.title,
      audioUri: object?.audioUri || undefined,
      imageUri: object?.imageUri || undefined,
      videoUri: object?.videoUri || undefined,
      videoThumbUri: object?.videoThumbUri || undefined,
    }
  })

  return response as TimelinePostData[]
}

async function workoutPostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<TimelinePostObjectData[]> {
  const uniqueIds = [...new Set(ids)]
  const responses = await prisma.workout.findMany({
    where: { id: { in: uniqueIds } },
    select: {
      id: true,
      name: true,
      coverImageUri: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  if (responses == null) {
    throw new ApolloError(
      'timelinePostData.workoutPostsData: Could not find any workouts associated with these IDs.',
    )
  }

  return responses.map((r) => ({
    objectId: r.id,
    objectType: 'WORKOUT',
    title: r.name,
    audioUri: r.introAudioUri || undefined,
    imageUri: r.coverImageUri || undefined,
    videoUri: r.introVideoUri || undefined,
    videoThumbUri: r.introVideoThumbUri || undefined,
  }))
}

async function workoutPlanPostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<TimelinePostObjectData[]> {
  const uniqueIds = [...new Set(ids)]
  const responses = await prisma.workoutPlan.findMany({
    where: { id: { in: uniqueIds } },
    select: {
      id: true,
      name: true,
      coverImageUri: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  if (responses == null) {
    throw new ApolloError(
      'timelinePostData.workoutPlanPostsData: Could not find any workout plans associated with these IDs.',
    )
  }

  return responses.map((r) => ({
    objectId: r.id,
    objectType: 'WORKOUTPLAN',
    title: r.name,
    audioUri: r.introAudioUri || undefined,
    imageUri: r.coverImageUri || undefined,
    videoUri: r.introVideoUri || undefined,
    videoThumbUri: r.introVideoThumbUri || undefined,
  }))
}

async function userPublicProfilePostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<TimelinePostObjectData[]> {
  const uniqueIds = [...new Set(ids)]
  const responses = await prisma.user.findMany({
    where: { id: { in: uniqueIds } },
    select: {
      id: true,
      displayName: true,
      avatarUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
    },
  })

  if (responses == null) {
    throw new ApolloError(
      'timelinePostData.userPublicProfilePostData: Could not find any user profiles associated with these IDs.',
    )
  }

  return responses.map((r) => ({
    objectId: r.id,
    objectType: 'USERPROFILE',
    title: r.displayName || 'Remove',
    audioUri: undefined,
    imageUri: r.avatarUri || undefined,
    videoUri: r.introVideoUri || undefined,
    videoThumbUri: r.introVideoThumbUri || undefined,
  }))
}

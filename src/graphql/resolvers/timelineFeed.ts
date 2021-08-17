import { PrismaClient } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  QueryTimelinePostsDataArgs,
  TimelinePostData,
} from '../../generated/graphql'

export const timelinePostsData = async (
  r: any,
  { posts }: QueryTimelinePostsDataArgs,
  { prisma }: Context,
) => {
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

  const data = await Promise.all(
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

  return data.flat()
}

async function workoutPostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<TimelinePostData[]> {
  const responses = await prisma.workout.findMany({
    where: { id: { in: ids } },
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
    id: r.id,
    title: r.name,
    type: 'WORKOUT',
    audioUri: r.introAudioUri,
    imageUri: r.coverImageUri,
    videoUri: r.introVideoUri,
    videoThumbUri: r.introVideoThumbUri,
  }))
}

async function workoutPlanPostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<TimelinePostData[]> {
  const responses = await prisma.workoutPlan.findMany({
    where: { id: { in: ids } },
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
    id: r.id,
    title: r.name,
    type: 'WORKOUTPLAN',
    audioUri: r.introAudioUri,
    imageUri: r.coverImageUri,
    videoUri: r.introVideoUri,
    videoThumbUri: r.introVideoThumbUri,
  }))
}

async function userPublicProfilePostsData(
  ids: string[],
  prisma: PrismaClient,
): Promise<TimelinePostData[]> {
  const responses = await prisma.user.findMany({
    where: { id: { in: ids } },
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
    id: r.id,
    title: r.displayName || 'Profile',
    type: 'USERPROFILE',
    imageUri: r.avatarUri,
    videoUri: r.introVideoUri,
    videoThumbUri: r.introVideoThumbUri,
  }))
}

import { Context } from '../..'
import {
  QueryTextSearchUserPublicProfilesArgs,
  QueryTextSearchWorkoutPlansArgs,
  QueryTextSearchWorkoutsArgs,
  TextSearchResult,
  UserPublicProfile,
  Workout,
  WorkoutPlan,
} from '../../generated/graphql'

export const textSearchWorkouts = async (
  r: any,
  { text }: QueryTextSearchWorkoutsArgs,
  { select, prisma }: Context,
) => {
  const workouts = await prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })
  return workouts as Workout[]
}

export const textSearchWorkoutNames = async (
  r: any,
  { text }: QueryTextSearchWorkoutsArgs,
  { prisma }: Context,
) => {
  const workouts = await prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
    },
  })
  return workouts as TextSearchResult[]
}

export const textSearchWorkoutPlans = async (
  r: any,
  { text }: QueryTextSearchWorkoutPlansArgs,
  { select, prisma }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })
  return workoutPlans as WorkoutPlan[]
}

export const textSearchWorkoutPlanNames = async (
  r: any,
  { text }: QueryTextSearchWorkoutPlansArgs,
  { prisma }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
    },
  })
  return workoutPlans as TextSearchResult[]
}

export const textSearchUserPublicProfiles = async (
  r: any,
  { text }: QueryTextSearchUserPublicProfilesArgs,
  { select, prisma }: Context,
) => {
  const publicUsers = await prisma.user.findMany({
    where: {
      userProfileScope: 'PUBLIC',
      displayName: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })
  return publicUsers as UserPublicProfile[]
}

export const textSearchUserPublicNames = async (
  r: any,
  { text }: QueryTextSearchUserPublicProfilesArgs,
  { prisma }: Context,
) => {
  const publicUsers = await prisma.user.findMany({
    where: {
      userProfileScope: 'PUBLIC',
      displayName: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      displayName: true,
    },
  })
  const textSearchResults = publicUsers.map((x) => ({
    id: x.id,
    name: x.displayName,
  }))
  return textSearchResults as TextSearchResult[]
}

import { Context } from '../..'
import {
  QueryTextSearchUserPublicProfilesArgs,
  QueryTextSearchWorkoutProgramsArgs,
  QueryTextSearchWorkoutsArgs,
  TextSearchResult,
  UserPublicProfile,
  Workout,
  WorkoutProgram,
} from '../../generated/graphql'

export const textSearchWorkouts = async (
  r: any,
  { text }: QueryTextSearchWorkoutsArgs,
  { select, prisma }: Context,
) => {
  const workouts = await prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
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

export const textSearchWorkoutPrograms = async (
  r: any,
  { text }: QueryTextSearchWorkoutProgramsArgs,
  { select, prisma }: Context,
) => {
  const workoutPrograms = await prisma.workoutProgram.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })
  return workoutPrograms as WorkoutProgram[]
}

export const textSearchWorkoutProgramNames = async (
  r: any,
  { text }: QueryTextSearchWorkoutProgramsArgs,
  { prisma }: Context,
) => {
  const workoutPrograms = await prisma.workoutProgram.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
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
  return workoutPrograms as TextSearchResult[]
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

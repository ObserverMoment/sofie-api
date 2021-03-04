import { Context } from '../..'
import {
  QueryTextSearchCreatorPublicProfilesArgs,
  QueryTextSearchWorkoutProgramsArgs,
  QueryTextSearchWorkoutsArgs,
  TextSearchWorkoutProgramResult,
  TextSearchWorkoutResult,
  UserPublicProfile,
} from '../../generated/graphql'

export const textSearchWorkouts = async (
  r: any,
  { text }: QueryTextSearchWorkoutsArgs,
  { select, prisma }: Context,
) => {
  const workouts = await prisma.workout.findMany({
    where: {
      NOT: {
        contentAccessScope: 'PRIVATE',
      },
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })
  return workouts as TextSearchWorkoutResult[]
}

export const textSearchWorkoutPrograms = async (
  r: any,
  { text }: QueryTextSearchWorkoutProgramsArgs,
  { select, prisma }: Context,
) => {
  const workoutPrograms = await prisma.workoutProgram.findMany({
    where: {
      NOT: {
        contentAccessScope: 'PRIVATE',
      },
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })
  return workoutPrograms as TextSearchWorkoutProgramResult[]
}

export const textSearchCreatorPublicProfiles = async (
  r: any,
  { text }: QueryTextSearchCreatorPublicProfilesArgs,
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

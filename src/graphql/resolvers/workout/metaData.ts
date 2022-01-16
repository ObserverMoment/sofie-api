import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutMetaDataArgs,
  QueryAdminPublicWorkoutsArgs,
  WorkoutMetaData,
  WorkoutWithMetaData,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////
//// Queries ////

/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicWorkouts = async (
  r: any,
  { status }: QueryAdminPublicWorkoutsArgs,
  { prisma, select, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError()
  }

  const publicWorkouts = await prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      validated: status,
    },
    take: 10,
    orderBy: {
      id: 'desc',
    },
    select,
  })

  return publicWorkouts as WorkoutWithMetaData[]
}

export const updateWorkoutMetaData = async (
  r: any,
  { data }: MutationUpdateWorkoutMetaDataArgs,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError()
  }

  const updated = await prisma.workout.update({
    where: { id: data.id },
    data: {
      ...data,
      validated: data.validated || undefined,
      metaTags: data.metaTags || undefined,
    },
    select: {
      id: true,
      validated: true,
      metaTags: true,
      reasonNotValidated: true,
      difficultyLevel: true,
    },
  })

  if (updated) {
    return updated as WorkoutMetaData
  } else {
    throw new ApolloError('updateWorkoutMetaData: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutMetaDataAdminArgs,
  PublicWorkoutSummaryAdmin,
  QueryAdminPublicWorkoutByIdArgs,
  QueryAdminPublicWorkoutsCountArgs,
  QueryAdminPublicWorkoutSummariesArgs,
  WorkoutWithMetaDataAdmin,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////
//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicWorkoutsCount = async (
  r: any,
  { status }: QueryAdminPublicWorkoutsCountArgs,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const count = await prisma.workout.count({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      validated: status,
    },
  })

  return count
}

/// Just the workout name is returned. Use for lists.
export const adminPublicWorkoutSummaries = async (
  r: any,
  { status }: QueryAdminPublicWorkoutSummariesArgs,
  { prisma, select, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const publicWorkouts = await prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      validated: status,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: select,
  })

  return publicWorkouts as PublicWorkoutSummaryAdmin[]
}

export const adminPublicWorkoutById = async (
  r: any,
  { id }: QueryAdminPublicWorkoutByIdArgs,
  { prisma, select, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const workout = await prisma.workout.findUnique({
    where: {
      id,
    },
    select: select,
  })

  return workout as WorkoutWithMetaDataAdmin
}

export const updateWorkoutMetaDataAdmin = async (
  r: any,
  { data }: MutationUpdateWorkoutMetaDataAdminArgs,
  { prisma, select, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const updated = await prisma.workout.update({
    where: { id: data.id },
    data: {
      ...data,
      validated: data.validated || undefined,
      metaTags: data.metaTags || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutWithMetaDataAdmin
  } else {
    throw new ApolloError('updateWorkoutMetaDataAdmin: There was an issue.')
  }
}

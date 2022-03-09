import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutMetaDataAdminArgs,
  QueryAdminPublicWorkoutsArgs,
  WorkoutWithMetaDataAdmin,
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

  return publicWorkouts as WorkoutWithMetaDataAdmin[]
}

export const updateWorkoutMetaDataAdmin = async (
  r: any,
  { data }: MutationUpdateWorkoutMetaDataAdminArgs,
  { prisma, select, userType }: Context,
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
    select,
  })

  if (updated) {
    return updated as WorkoutWithMetaDataAdmin
  } else {
    throw new ApolloError('updateWorkoutMetaDataAdmin: There was an issue.')
  }
}

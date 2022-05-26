import { PublicContentValidationStatus } from '@prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutMetaDataAdminArgs,
  PublicWorkoutSummaryAdmin,
  WorkoutWithMetaDataAdmin,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////
//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicWorkoutCounts = async (
  r: any,
  a: any,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const counts = await Promise.all([
    prisma.workout.count({
      where: {
        contentAccessScope: 'PUBLIC',
        archived: false,
        validated: PublicContentValidationStatus.PENDING,
      },
    }),
    prisma.workout.count({
      where: {
        contentAccessScope: 'PUBLIC',
        archived: false,
        validated: PublicContentValidationStatus.VALID,
      },
    }),
    prisma.workout.count({
      where: {
        contentAccessScope: 'PUBLIC',
        archived: false,
        validated: PublicContentValidationStatus.INVALID,
      },
    }),
  ])

  return {
    pending: counts[0],
    valid: counts[1],
    invalid: counts[2],
  }
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

import { PublicContentValidationStatus } from '@prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutPlanMetaDataAdminArgs,
  PublicWorkoutPlanSummaryAdmin,
  WorkoutPlanWithMetaDataAdmin,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////

//// Queries ////
export const adminPublicWorkoutPlanCounts = async (
  r: any,
  a: any,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const counts = await Promise.all([
    prisma.workoutPlan.count({
      where: {
        contentAccessScope: 'PUBLIC',
        archived: false,
        validated: PublicContentValidationStatus.PENDING,
      },
    }),
    prisma.workoutPlan.count({
      where: {
        contentAccessScope: 'PUBLIC',
        archived: false,
        validated: PublicContentValidationStatus.VALID,
      },
    }),
    prisma.workoutPlan.count({
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

export const updateWorkoutPlanMetaDataAdmin = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanMetaDataAdminArgs,
  { prisma, select, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const updated = await prisma.workoutPlan.update({
    where: { id: data.id },
    data: {
      ...data,
      validated: data.validated || undefined,
      metaTags: data.metaTags || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanWithMetaDataAdmin
  } else {
    throw new ApolloError('updateWorkoutPlanMetaDataAdmin: There was an issue.')
  }
}

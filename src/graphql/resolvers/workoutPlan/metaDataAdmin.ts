import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutPlanMetaDataAdminArgs,
  PublicWorkoutPlanSummaryAdmin,
  QueryAdminPublicWorkoutPlanByIdArgs,
  QueryAdminPublicWorkoutPlansCountArgs,
  QueryAdminPublicWorkoutPlanSummariesArgs,
  WorkoutPlanWithMetaDataAdmin,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////

//// Queries ////
export const adminPublicWorkoutPlansCount = async (
  r: any,
  { status }: QueryAdminPublicWorkoutPlansCountArgs,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const count = await prisma.workoutPlan.count({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      validated: status,
    },
  })

  return count
}

/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicWorkoutPlanSummaries = async (
  r: any,
  { status }: QueryAdminPublicWorkoutPlanSummariesArgs,
  { prisma, userType, select }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const publicWorkoutPlans = await prisma.workoutPlan.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      validated: status,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select,
  })

  return publicWorkoutPlans as PublicWorkoutPlanSummaryAdmin[]
}

export const adminPublicWorkoutPlanById = async (
  r: any,
  { id }: QueryAdminPublicWorkoutPlanByIdArgs,
  { prisma, userType, select }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const plan = await prisma.workoutPlan.findUnique({
    where: {
      id,
    },
    select,
  })

  return plan as WorkoutPlanWithMetaDataAdmin
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

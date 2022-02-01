import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutPlanMetaDataAdminArgs,
  QueryAdminPublicWorkoutPlansArgs,
  WorkoutPlanMetaDataAdmin,
  WorkoutPlanWithMetaDataAdmin,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicWorkoutPlans = async (
  r: any,
  { status }: QueryAdminPublicWorkoutPlansArgs,
  { prisma, select }: Context,
) => {
  const publicWorkoutPlans = await prisma.workoutPlan.findMany({
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

  return publicWorkoutPlans as WorkoutPlanWithMetaDataAdmin[]
}

export const updateWorkoutPlanMetaDataAdmin = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanMetaDataAdminArgs,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError()
  }

  const updated = await prisma.workoutPlan.update({
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
    return updated as WorkoutPlanMetaDataAdmin
  } else {
    throw new ApolloError('updateWorkoutPlanMetaDataAdmin: There was an issue.')
  }
}

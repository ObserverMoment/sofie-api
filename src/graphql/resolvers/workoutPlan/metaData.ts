import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationUpdateWorkoutPlanMetaDataArgs,
  QueryAdminPublicWorkoutPlansArgs,
  WorkoutPlanMetaData,
  WorkoutPlanWithMetaData,
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

  return publicWorkoutPlans as WorkoutPlanWithMetaData[]
}

export const updateWorkoutPlanMetaData = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanMetaDataArgs,
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
    return updated as WorkoutPlanMetaData
  } else {
    throw new ApolloError('updateWorkoutPlanMetaData: There was an issue.')
  }
}

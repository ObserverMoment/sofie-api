import { Context } from '../../..'
import {
  QueryTrainingPlanByIdArgs,
  TrainingPlan,
  TrainingPlanSummary,
} from '../../../generated/graphql'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination

// Logged in user only. Never retrieve archived.
export const userTrainingPlans = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const userTrainingPlans = await prisma.trainingPlan.findMany({
    where: {
      userId: authedUserId,
      archived: false,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: {
      id: true,
    },
  })

  return userTrainingPlans as TrainingPlanSummary[]
}

export const trainingPlanById = async (
  r: any,
  { id }: QueryTrainingPlanByIdArgs,
  { select, prisma }: Context,
) => {
  const trainingPlan = await prisma.trainingPlan.findUnique({
    where: { id },
    select: {
      id: true,
    },
  })

  if (trainingPlan) {
    return trainingPlan as TrainingPlan
  } else {
    console.error(`trainingPlanById: Could not find a workout with id ${id}`)
    return null
  }
}

//// Mutations ////

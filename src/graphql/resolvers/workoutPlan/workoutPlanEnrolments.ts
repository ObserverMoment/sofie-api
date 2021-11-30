import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutPlanEnrolmentArgs,
  MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  MutationUpdateWorkoutPlanEnrolmentArgs,
  QueryWorkoutPlanEnrolmentByIdArgs,
  WorkoutPlanEnrolment,
  WorkoutPlanEnrolmentSummary,
  WorkoutPlanEnrolmentWithPlan,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { formatWorkoutPlanSummary, selectForWorkoutPlanSummary } from './utils'

//// Queries ////
export const workoutPlanEnrolmentById = async (
  r: any,
  { id }: QueryWorkoutPlanEnrolmentByIdArgs,
  { select, prisma }: Context,
) => {
  const workoutPlanEnrolment: any =
    await prisma.workoutPlanEnrolment.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        completedPlanDayWorkoutIds: true,
        startDate: true,
        User: {
          select: {
            id: true,
            displayName: true,
            avatarUri: true,
            userProfileScope: true,
          },
        },
        WorkoutPlan: select.WorkoutPlan,
      },
    })

  if (workoutPlanEnrolment) {
    return {
      WorkoutPlan: workoutPlanEnrolment.WorkoutPlan,
      WorkoutPlanEnrolment: workoutPlanEnrolment,
    } as WorkoutPlanEnrolmentWithPlan
  } else {
    throw new ApolloError('workoutPlanEnrolmentById: There was an issue.')
  }
}

// Gets all plans that a user is enrolled in.
export const workoutPlanEnrolments = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const workoutPlanEnrolments = await prisma.workoutPlanEnrolment.findMany({
    where: {
      userId: authedUserId,
    },
    select: {
      id: true,
      completedPlanDayWorkoutIds: true,
      startDate: true,
      User: {
        select: {
          id: true,
          displayName: true,
          avatarUri: true,
          userProfileScope: true,
        },
      },
      WorkoutPlan: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  return workoutPlanEnrolments.map((e) => ({
    ...e,
    WorkoutPlan: formatWorkoutPlanSummary(e.WorkoutPlan),
  })) as WorkoutPlanEnrolmentSummary[]
}

//// Mutations ////
export const createWorkoutPlanEnrolment = async (
  r: any,
  { workoutPlanId }: MutationCreateWorkoutPlanEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutPlanEnrolment: any = await prisma.workoutPlanEnrolment.create({
    data: {
      User: {
        connect: { id: authedUserId },
      },
      WorkoutPlan: {
        connect: { id: workoutPlanId },
      },
    },
    select: {
      id: true,
      completedPlanDayWorkoutIds: true,
      startDate: true,
      User: {
        select: {
          id: true,
          displayName: true,
          avatarUri: true,
          userProfileScope: true,
        },
      },
      WorkoutPlan: select.WorkoutPlan,
    },
  })

  if (workoutPlanEnrolment) {
    return {
      WorkoutPlan: workoutPlanEnrolment.WorkoutPlan,
      WorkoutPlanEnrolment: workoutPlanEnrolment,
    } as WorkoutPlanEnrolmentWithPlan
  } else {
    throw new ApolloError('createWorkoutPlanEnrolment: There was an issue.')
  }
}

export const updateWorkoutPlanEnrolment = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutPlanEnrolment.update({
    where: { id: data.id },
    data: {
      ...data,
      completedPlanDayWorkoutIds: data.hasOwnProperty(
        'completedPlanDayWorkoutIds',
      )
        ? {
            set:
              data.completedPlanDayWorkoutIds != null
                ? data.completedPlanDayWorkoutIds
                : undefined,
          }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('updateWorkoutPlanEnrolment: There was an issue.')
  }
}

export const deleteWorkoutPlanEnrolmentById = async (
  r: any,
  { id }: MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlanEnrolment', authedUserId, prisma)

  const deleted = await prisma.workoutPlanEnrolment.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutPlanEnrolmentById: There was an issue.')
  }
}

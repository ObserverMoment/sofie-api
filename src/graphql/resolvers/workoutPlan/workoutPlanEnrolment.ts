import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import { add } from 'date-fns'
import {
  MutationClearScheduleForPlanEnrolmentArgs,
  MutationClearWorkoutPlanEnrolmentProgressArgs,
  MutationCreateCompletedWorkoutPlanDayWorkoutArgs,
  MutationCreateScheduleForPlanEnrolmentArgs,
  MutationCreateWorkoutPlanEnrolmentArgs,
  MutationDeleteCompletedWorkoutPlanDayWorkoutArgs,
  MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  QueryWorkoutPlanEnrolmentByIdArgs,
  WorkoutPlanEnrolment,
  WorkoutPlanEnrolmentSummary,
  WorkoutPlanEnrolmentWithPlan,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { selectForWorkoutPlanSummary } from '../selectDefinitions'
import { formatWorkoutPlanSummary } from './utils'
import { notifyPlanOwnerOfUserJoinLeave } from '../../../lib/getStream'

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
        CompletedWorkoutPlanDayWorkouts: true,
        startDate: true,
        User: {
          select: {
            id: true,
            displayName: true,
            avatarUri: true,
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
      startDate: true,
      CompletedWorkoutPlanDayWorkouts: {
        select: { id: true },
      },
      User: {
        select: {
          id: true,
          displayName: true,
          avatarUri: true,
        },
      },
      WorkoutPlan: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  return workoutPlanEnrolments.map((e) => ({
    ...e,
    completedWorkoutsCount: e.CompletedWorkoutPlanDayWorkouts.length,
    WorkoutPlan: formatWorkoutPlanSummary(e.WorkoutPlan),
  })) as WorkoutPlanEnrolmentSummary[]
}

//// Mutations ////
/// i.e Join the Plan
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
      CompletedWorkoutPlanDayWorkouts: true,
      startDate: true,
      User: {
        select: {
          id: true,
          displayName: true,
          avatarUri: true,
        },
      },
      WorkoutPlan: select.WorkoutPlan,
    },
  })

  if (workoutPlanEnrolment) {
    /// Notify the plan owner that this user has joined their plan.
    const planOwnerId = workoutPlanEnrolment.WorkoutPlan.User.id
    const planId = workoutPlanEnrolment.WorkoutPlan.id
    const planName = workoutPlanEnrolment.WorkoutPlan.name

    if (!planOwnerId || !planId || !planName) {
      throw new ApolloError(
        'Could not [notifyPlanOwnerOfPlanJoinLeave] as could not find the workout plan data needed in the select response object.',
      )
    }
    await notifyPlanOwnerOfUserJoinLeave(
      authedUserId,
      planOwnerId,
      planId,
      planName,
      'JOIN',
    )
    return {
      WorkoutPlan: workoutPlanEnrolment.WorkoutPlan,
      WorkoutPlanEnrolment: workoutPlanEnrolment,
    } as WorkoutPlanEnrolmentWithPlan
  } else {
    throw new ApolloError('createWorkoutPlanEnrolment: There was an issue.')
  }
}

/// i.e. leave the plan
export const deleteWorkoutPlanEnrolmentById = async (
  r: any,
  { id }: MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlanEnrolment', authedUserId, prisma)

  const deleted = await prisma.workoutPlanEnrolment.delete({
    where: { id },
    select: {
      id: true,
      WorkoutPlan: {
        select: {
          id: true,
          name: true,
          User: {
            select: { id: true },
          },
        },
      },
    },
  })

  if (deleted) {
    /// Notify the plan owner that this user has joined their plan.
    const planOwnerId = deleted.WorkoutPlan.User.id
    const planId = deleted.WorkoutPlan.id
    const planName = deleted.WorkoutPlan.name

    if (!planOwnerId || !planId || !planName) {
      throw new ApolloError(
        'Could not [notifyPlanOwnerOfPlanJoinLeave] as could not find the workout plan data needed in the select response object.',
      )
    }
    await notifyPlanOwnerOfUserJoinLeave(
      authedUserId,
      planOwnerId,
      planId,
      planName,
      'LEAVE',
    )
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutPlanEnrolmentById: There was an issue.')
  }
}

//// Actions on a WorkoutPlanEnrolment ////
/// 1. Create schedule and add start date
/// + 2. Update schdule and update start date (also involves deleting all scheduled workouts related to this plan / user)
export type ScheduledWorkoutData = {
  scheduledAt: Date
  workoutId: string
  workoutPlanDayWorkoutId: string
}

export const createScheduleForPlanEnrolment = async (
  r: any,
  { data }: MutationCreateScheduleForPlanEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.workoutPlanEnrolmentId,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  const prev = await prisma.workoutPlanEnrolment.findUnique({
    where: { id: data.workoutPlanEnrolmentId },
    select: {
      ScheduledWorkouts: true,
      WorkoutPlan: {
        select: {
          WorkoutPlanDays: {
            select: {
              dayNumber: true,
              WorkoutPlanDayWorkouts: {
                select: {
                  id: true,
                  workoutId: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!prev) {
    throw new ApolloError(
      `Could not find Plan Enrolment with id ${data.workoutPlanEnrolmentId} to update.`,
    )
  }

  const ops = []
  /// If there is already a schedule, clear it.
  if (prev?.ScheduledWorkouts.length > 0) {
    ops.push(
      prisma.scheduledWorkout.deleteMany({
        where: { id: { in: prev?.ScheduledWorkouts.map((s) => s.id) } },
      }),
    )
  }

  const startDate = Date.parse(data.startDate)

  /// Calculate when each workout should be scheduled based on the start date.
  const scheduledWorkoutData: ScheduledWorkoutData[] =
    prev.WorkoutPlan.WorkoutPlanDays.reduce<ScheduledWorkoutData[]>(
      (acum, next) => [
        ...acum,
        ...next.WorkoutPlanDayWorkouts.map((pdw, i) => ({
          scheduledAt: add(startDate, {
            days: next.dayNumber,
            hours: i * 2, // Workouts in the same day will be two hours after each other.
          }),
          workoutId: pdw.workoutId,
          workoutPlanDayWorkoutId: pdw.id,
        })),
      ],
      [],
    )

  const updateOp = prisma.workoutPlanEnrolment.update({
    where: { id: data.workoutPlanEnrolmentId },
    data: {
      startDate: data.startDate,
      ScheduledWorkouts: {
        create: scheduledWorkoutData.map((s) => ({
          scheduledAt: s.scheduledAt,
          WorkoutPlanDayWorkout: {
            connect: { id: s.workoutPlanDayWorkoutId },
          },
          Workout: {
            connect: { id: s.workoutId },
          },
          User: { connect: { id: authedUserId } },
        })),
      },
    },
    select,
  })

  ops.unshift(updateOp)

  /// Updated op must be first in array as sometimes there is no delete op needed.
  /// i.e if the user has not previously scheduled these workouts.
  const [updated, _] = await prisma.$transaction(ops)

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('createScheduleForPlanEnrolment: There was an issue.')
  }
}

/// 3. Clear schedule and clear start date (involves deleting all scheduled workouts related to this plan / user)
export const clearScheduleForPlanEnrolment = async (
  r: any,
  { enrolmentId }: MutationClearScheduleForPlanEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    enrolmentId,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  const deleteOp = prisma.scheduledWorkout.deleteMany({
    where: { userId: authedUserId, workoutPlanEnrolmentId: enrolmentId },
  })

  const updateOp = prisma.workoutPlanEnrolment.update({
    where: { id: enrolmentId },
    data: {
      startDate: null,
    },
    select,
  })

  const [, updated] = await prisma.$transaction([deleteOp, updateOp])

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('clearScheduleForPlanEnrolment: There was an issue.')
  }
}

/// 4. Create CompletedWorkoutPlanDayWorkout.
export const createCompletedWorkoutPlanDayWorkout = async (
  r: any,
  {
    data: { workoutPlanEnrolmentId, loggedWorkoutId, workoutPlanDayWorkoutId },
  }: MutationCreateCompletedWorkoutPlanDayWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    workoutPlanEnrolmentId,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutPlanEnrolment.update({
    where: { id: workoutPlanEnrolmentId },
    data: {
      CompletedWorkoutPlanDayWorkouts: {
        create: [
          {
            WorkoutPlanDayWorkout: { connect: { id: workoutPlanDayWorkoutId } },
            LoggedWorkout: { connect: { id: loggedWorkoutId } },
          },
        ],
      },
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError(
      'createCompletedWorkoutPlanDayWorkout: There was an issue.',
    )
  }
}

/// 5. Delete CompletedWorkoutPlanDayWorkout
export const deleteCompletedWorkoutPlanDayWorkout = async (
  r: any,
  {
    data: { workoutPlanEnrolmentId, workoutPlanDayWorkoutId },
  }: MutationDeleteCompletedWorkoutPlanDayWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    workoutPlanEnrolmentId,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutPlanEnrolment.update({
    where: { id: workoutPlanEnrolmentId },
    data: {
      CompletedWorkoutPlanDayWorkouts: {
        delete: {
          id: workoutPlanDayWorkoutId,
        },
      },
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError(
      'deleteCompletedWorkoutPlanDayWorkout: There was an issue.',
    )
  }
}

/// 6. Clear plan progress - delete all CompletedWorkoutPlanDayWorkouts
export const clearWorkoutPlanEnrolmentProgress = async (
  r: any,
  { enrolmentId }: MutationClearWorkoutPlanEnrolmentProgressArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    enrolmentId,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  await prisma.completedWorkoutPlanDayWorkout.deleteMany({
    where: {
      workoutPlanEnrolmentId: enrolmentId,
    },
  })

  const updated = await prisma.workoutPlanEnrolment.update({
    where: { id: enrolmentId },
    data: {
      startDate: null,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError(
      'clearWorkoutPlanEnrolmentProgress: There was an issue.',
    )
  }
}

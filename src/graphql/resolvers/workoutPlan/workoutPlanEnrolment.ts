import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import { add } from 'date-fns'
import {
  MutationCreateScheduleForPlanEnrolmentArgs,
  MutationCreateWorkoutPlanEnrolmentArgs,
  MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  MutationUpdateWorkoutPlanEnrolmentArgs,
  QueryWorkoutPlanEnrolmentByIdArgs,
  WorkoutPlanEnrolment,
  WorkoutPlanEnrolmentSummary,
  WorkoutPlanEnrolmentWithPlan,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { selectForWorkoutPlanSummary } from '../selectDefinitions'
import { formatWorkoutPlanSummary } from './utils'

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
      startDate: true,
      CompletedWorkoutPlanDayWorkouts: {
        select: { id: true },
      },
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

/// i.e. leave the plan
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

//// Actions on a WorkoutPlanEnrolment ////
/// 1. Create schedule and add start date
/// + 2. Update schdule and update start date (also involves deleting all scheduled workouts related to this plan / user)
export type ScheduledWorkoutData = {
  dateTime: Date
  workoutId: string
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

  const scheduledWorkoutData: ScheduledWorkoutData[] =
    prev.WorkoutPlan.WorkoutPlanDays.reduce<ScheduledWorkoutData[]>(
      (acum, next) => [
        ...acum,
        ...next.WorkoutPlanDayWorkouts.map((pdw, i) => ({
          dateTime: add(startDate, {
            days: next.dayNumber,
            hours: i * 2, // Workouts in the same day will be two hours after each other.
          }),
          workoutId: pdw.workoutId,
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
          Workout: {
            connect: { id: s.workoutId },
          },
          User: { connect: { id: authedUserId } },
        })),
      },
    },
    select,
  })

  ops.push(updateOp)

  const [_, updated] = await prisma.$transaction(ops)

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('createScheduleForPlanEnrolment: There was an issue.')
  }
}

/// 3. Clear schdule and clear start date (also involves deleting all scheduled workouts related to this plan / user)
/// 4. Create CompletedWorkoutPlanDayWorkout
/// 5. Delete CompletedWorkoutPlanDayWorkout
/// 6. Clear plan progress - delete all CompletedWorkoutPlanDayWorkouts

// export const updateWorkoutPlanEnrolment = async (
//   r: any,
//   { data }: MutationUpdateWorkoutPlanEnrolmentArgs,
//   { authedUserId, select, prisma }: Context,
// ) => {
//   await checkUserOwnsObject(
//     data.id,
//     'workoutPlanEnrolment',
//     authedUserId,
//     prisma,
//   )

//   const updated = await prisma.workoutPlanEnrolment.update({
//     where: { id: data.id },
//     data: {
//       ...data,
//       completedPlanDayWorkoutIds: data.hasOwnProperty(
//         'completedPlanDayWorkoutIds',
//       )
//         ? {
//             set:
//               data.completedPlanDayWorkoutIds != null
//                 ? data.completedPlanDayWorkoutIds
//                 : undefined,
//           }
//         : undefined,
//     },
//     select,
//   })

//   if (updated) {
//     return updated as WorkoutPlanEnrolment
//   } else {
//     throw new ApolloError('updateWorkoutPlanEnrolment: There was an issue.')
//   }
// }

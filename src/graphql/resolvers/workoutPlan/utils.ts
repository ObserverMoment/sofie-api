import {
  WorkoutGoal,
  WorkoutPlanFiltersInput,
} from '../../../generated/graphql'
import { WorkoutPlanSummaryData } from '../../../types'

export const selectForWorkoutPlanSummary = {
  id: true,
  createdAt: true,
  archived: true,
  name: true,
  description: true,
  coverImageUri: true,
  lengthWeeks: true,
  daysPerWeek: true,
  User: {
    select: {
      id: true,
      displayName: true,
      avatarUri: true,
      userProfileScope: true,
    },
  },
  WorkoutTags: {
    select: {
      tag: true,
    },
  },
  WorkoutPlanDays: {
    select: {
      WorkoutPlanDayWorkouts: {
        select: {
          Workout: {
            select: {
              WorkoutGoals: true,
            },
          },
        },
      },
    },
  },
  WorkoutPlanReviews: {
    select: {
      score: true,
    },
  },
  _count: {
    select: {
      WorkoutPlanEnrolments: true,
    },
  },
}

export function formatWorkoutPlanSummaries(plans: WorkoutPlanSummaryData[]) {
  return plans.map((w) => formatWorkoutPlanSummary(w))
}

export function formatWorkoutPlanSummary(plan: WorkoutPlanSummaryData) {
  return {
    id: plan.id,
    createdAt: plan.createdAt,
    archived: plan.archived,
    name: plan.name,
    description: plan.description,
    coverImageUri: plan.coverImageUri,
    lengthWeeks: plan.lengthWeeks,
    daysPerWeek: plan.daysPerWeek,
    workoutsCount: plan.WorkoutPlanDays.reduce(
      (a, b) => a + b.WorkoutPlanDayWorkouts.length,
      0,
    ),
    User: plan.User,
    enrolmentsCount: plan._count?.WorkoutPlanEnrolments || 0,
    tags: plan.WorkoutTags.map((t) => t.tag),
    goals: plan.WorkoutPlanDays.reduce<WorkoutGoal[]>(
      (a, b) => [
        ...a,
        ...b.WorkoutPlanDayWorkouts.reduce<WorkoutGoal[]>(
          (c, d) => [...c, ...d.Workout.WorkoutGoals],
          [],
        ),
      ],
      [],
    ),
    reviewScore:
      plan.WorkoutPlanReviews.length > 0
        ? plan.WorkoutPlanReviews.map((r) => r.score).reduce(
            (a, b) => a + b,
            0,
          ) / plan.WorkoutPlanReviews.length
        : null,
    reviewCount: plan.WorkoutPlanReviews.length,
  }
}

/// Format Filters Input
export function formatWorkoutPlanFiltersInput(
  filters: WorkoutPlanFiltersInput,
) {
  return [
    {
      lengthWeeks: filters.lengthWeeks ? { equals: filters.lengthWeeks } : {},
    },
    {
      daysPerWeek: filters.daysPerWeek ? { equals: filters.daysPerWeek } : {},
    },
    /// Workout filters
    filters.difficultyLevel
      ? {
          WorkoutPlanDays: {
            some: {
              WorkoutPlanDayWorkouts: {
                some: {
                  Workout: {
                    difficultyLevel: {
                      equals: filters.difficultyLevel,
                    },
                  },
                },
              },
            },
          },
        }
      : {},
    filters.workoutGoals.length > 0
      ? {
          WorkoutPlanDays: {
            some: {
              WorkoutPlanDayWorkouts: {
                some: {
                  Workout: {
                    WorkoutGoals: {
                      some: { id: { in: filters.workoutGoals } },
                    },
                  },
                },
              },
            },
          },
        }
      : {},
    filters.bodyweightOnly !== null
      ? {
          WorkoutPlanDays: {
            every: {
              WorkoutPlanDayWorkouts: {
                every: {
                  Workout: {
                    metaData: {
                      path: ['bodyweightOnly'],
                      equals: filters.bodyweightOnly,
                    },
                  },
                },
              },
            },
          },
        }
      : {},
  ]
}

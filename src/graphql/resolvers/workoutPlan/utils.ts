import {
  WorkoutGoal,
  WorkoutPlanFiltersInput,
  WorkoutPlanSummary,
} from '../../../generated/graphql'
import { WorkoutPlanSummaryPayload } from '../../../../types/types'

export function formatWorkoutPlanSummaries(
  plans: WorkoutPlanSummaryPayload[],
): WorkoutPlanSummary[] {
  return plans.map((w) => formatWorkoutPlanSummary(w))
}

export function formatWorkoutPlanSummary(
  plan: WorkoutPlanSummaryPayload,
): WorkoutPlanSummary {
  return {
    id: plan.id,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
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

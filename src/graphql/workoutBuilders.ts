import { Prisma } from '@prisma/client'
import {
  CreateLoggedWorkoutSectionInput,
  CreateWorkoutSectionInput,
} from '../generated/graphql'

export function buildWorkoutSectionsData(
  workoutSections: CreateWorkoutSectionInput[],
) {
  return workoutSections.map((section) => ({
    ...section,
    WorkoutSectionType: {
      connect: { id: section.WorkoutSectionType },
    },
    WorkoutSets: {
      create: section.WorkoutSets.map((set) => ({
        ...set,
        WorkoutMoves: {
          create: set.WorkoutMoves.map((workoutMove) => ({
            ...workoutMove,
            Move: {
              connect: {
                id: workoutMove.Move,
              },
            },
            Equipment: {
              connect: {
                id: workoutMove.Equipment || undefined,
              },
            },
          })),
        },
      })),
    },
    TrainingWorkoutSection: {
      create: section.TrainingWorkoutSection || undefined,
    },
    AmrapWorkoutSection: {
      create: section.AmrapWorkoutSection || undefined,
    },
    LastStandingWorkoutSection: {
      create: section.LastStandingWorkoutSection || undefined,
    },
  }))
}

///// Logged Workout Sections Builder /////
export function buildLoggedWorkoutSectionsData(
  loggedWorkoutSections: CreateLoggedWorkoutSectionInput[],
) {
  return loggedWorkoutSections.map((section) => ({
    ...section,
    WorkoutSectionType: {
      connect: { id: section.WorkoutSectionType },
    },
    LoggedWorkoutSets: {
      create: section.LoggedWorkoutSets.map((set) => ({
        ...set,
        LoggedWorkoutMoves: {
          create: set.LoggedWorkoutMoves.map((workoutMove) => ({
            ...workoutMove,
            Equipment: {
              connect: {
                id: workoutMove.Equipment || undefined,
              },
            },
            move: {
              connect: { id: workoutMove.Move },
            },
          })),
        },
      })),
    },
  }))
}

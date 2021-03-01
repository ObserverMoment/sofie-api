import { Prisma } from '@prisma/client'
import {
  CreateLoggedWorkoutSectionInput,
  CreateWorkoutMoveInput,
  CreateWorkoutSectionInput,
  CreateWorkoutSetInput,
} from '../generated/graphql'
import { AnyWorkoutSectionInput } from './resolvers/workout'

export function buildWorkoutSectionsData(
  workoutSections: CreateWorkoutSectionInput[],
) {
  return workoutSections.map((section) => ({
    ...section,
    WorkoutType: {
      connect: { id: section.WorkoutType },
    },
    TimedWorkoutSection: section.TimedWorkoutSection
      ? {
          create: {
            data: buildWorkoutSection(section.TimedWorkoutSection),
          },
        }
      : undefined,
    TrainingWorkoutSection: section.TrainingWorkoutSection
      ? {
          create: {
            data: buildWorkoutSection(section.TrainingWorkoutSection),
          },
        }
      : undefined,
    AmrapWorkoutSection: section.AmrapWorkoutSection
      ? {
          create: {
            data: buildWorkoutSection(section.AmrapWorkoutSection),
          },
        }
      : undefined,
    FortimeWorkoutSection: section.FortimeWorkoutSection
      ? {
          create: {
            data: buildWorkoutSection(section.FortimeWorkoutSection),
          },
        }
      : undefined,
    LastStandingSection: section.LastStandingWorkoutSection
      ? {
          create: {
            data: buildWorkoutSection(section.LastStandingWorkoutSection),
          },
        }
      : undefined,
  }))
}

function buildWorkoutSection(section: AnyWorkoutSectionInput) {
  return {
    ...section,
    WorkoutSets: {
      create: section.WorkoutSets.map((set: CreateWorkoutSetInput) => ({
        ...set,
        WorkoutMoves: {
          create: set.WorkoutMoves.map(
            (workoutMove: CreateWorkoutMoveInput) => ({
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
            }),
          ),
        },
      })),
    },
  }
}

///// Logged Workout Sections Builder /////
export function buildLoggedWorkoutSectionsData(
  loggedWorkoutSections: CreateLoggedWorkoutSectionInput[],
) {
  return loggedWorkoutSections.map(
    (section) =>
      ({
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
      } as Prisma.LoggedWorkoutSectionCreateWithoutLoggedWorkoutInput),
  )
}

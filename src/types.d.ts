import { Prisma } from '@prisma/client'

export type FullWorkoutDataType = Prisma.WorkoutGetPayload<{
  include: {
    WorkoutGoals: true
    WorkoutTags: true
    WorkoutSections: {
      include: {
        WorkoutSectionType: true
        WorkoutSets: {
          include: {
            WorkoutMoves: {
              include: {
                Equipment: true
                Move: {
                  include: {
                    RequiredEquipments: true
                    BodyAreaMoveScores: {
                      include: {
                        BodyArea: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}>

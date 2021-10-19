import { Prisma } from '@prisma/client'

export type ClubWithMemberIdsPayload = Prisma.ClubGetPayload<{
  select: {
    Owner: {
      select: { id: true }
    }
    Admins: {
      select: { id: true }
    }
    Members: {
      select: { id: true }
    }
  }
}>

/// For creating a duplicate of a workout.
export type WorkoutFullData = Prisma.WorkoutGetPayload<{
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
                Move: true
                Equipment: true
              }
            }
          }
        }
      }
    }
  }
}>

/// For generating workout metadata JSON.
export type WorkoutMetaDataPayload = Prisma.WorkoutGetPayload<{
  include: {
    WorkoutSections: {
      include: {
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

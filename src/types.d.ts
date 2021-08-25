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

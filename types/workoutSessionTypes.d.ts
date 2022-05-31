import { LoadUnit, Prisma } from '@prisma/client'

/// For creating a duplicate of a workoutSession.
export type WorkoutSessionFullDataPayload = Prisma.WorkoutSessionGetPayload<{
  include: {
    CardioSessions: {
      include: {
        CardioExercises: {
          include: {
            Move: true
          }
        }
      }
    }
    ResistanceSessions: {
      include: {
        ResistanceExercises: {
          include: {
            ResistanceSets: {
              include: {
                Move: true
                Equipment: true
              }
            }
          }
        }
      }
    }
    IntervalSessions: {
      include: {
        IntervalExercises: {
          include: {
            IntervalSets: {
              include: {
                Move: true
                Equipment: true
              }
            }
          }
        }
      }
    }
    AmrapSessions: {
      include: {
        AmrapSections: {
          include: {
            AmrapMoves: {
              include: {
                Move: true
                Equipment: true
              }
            }
          }
        }
      }
    }
    ForTimeSessions: {
      include: {
        ForTimeSections: {
          include: {
            ForTimeMoves: {
              include: {
                Move: true
                Equipment: true
              }
            }
          }
        }
      }
    }
    MobilitySessions: {
      include: {
        MobilityMoves: true
      }
    }
  }
}>

/// For creating a duplicate of a workoutSession.
export type CardioSessionFullDataPayload = Prisma.CardioSessionGetPayload<{
  include: {
    CardioExercises: {
      include: {
        Move: true
      }
    }
  }
}>

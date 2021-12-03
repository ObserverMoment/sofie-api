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

export type ClubSummaryData = Prisma.ClubGetPayload<{
  select: {
    id: true
    createdAt: true
    name: true
    description: true
    coverImageUri: true
    location: true
    _count: {
      select: {
        Members: true
        Admins: true
      }
    }
    Owner: {
      select: {
        id: true
        displayName: true
        avatarUri: true
        userProfileScope: true
      }
    }
  }
}>

// Data payload required to be able to form up WorkoutSummary data.
export type WorkoutSummaryData = Prisma.WorkoutGetPayload<{
  select: {
    id: true
    createdAt: true
    archived: true
    name: true
    coverImageUri: true
    description: true
    difficultyLevel: true
    lengthMinutes: true
    WorkoutGoals: true
    WorkoutTags: true
    WorkoutSections: {
      select: {
        WorkoutSectionType: {
          select: {
            name: true
          }
        }
        classVideoUri: true
        classAudioUri: true
        WorkoutSets: {
          select: {
            WorkoutMoves: {
              select: {
                Equipment: true
                Move: {
                  select: {
                    RequiredEquipments: true
                  }
                }
              }
            }
          }
        }
      }
    }
    User: {
      select: {
        id: true
        displayName: true
        avatarUri: true
        userProfileScope: true
      }
    }
    _count: {
      select: { LoggedWorkouts: true }
    }
  }
}>

// Data payload required to be able to form up WorkoutSummary data.
export type WorkoutPlanSummaryData = Prisma.WorkoutPlanGetPayload<{
  select: {
    id: true
    createdAt: true
    archived: true
    name: true
    description: true
    coverImageUri: true
    lengthWeeks: true
    daysPerWeek: true
    User: {
      select: {
        id: true
        displayName: true
        avatarUri: true
        userProfileScope: true
      }
    }
    WorkoutTags: {
      select: {
        tag: true
      }
    }
    WorkoutPlanDays: {
      select: {
        WorkoutPlanDayWorkouts: {
          select: {
            Workout: {
              select: {
                WorkoutGoals: true
              }
            }
          }
        }
      }
    }

    WorkoutPlanReviews: {
      select: {
        score: true
      }
    }
    _count: {
      select: {
        WorkoutPlanEnrolments: true
      }
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

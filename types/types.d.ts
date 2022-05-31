import { LoadUnit, Prisma } from '@prisma/client'

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

export type ClubSummaryPayload = Prisma.ClubGetPayload<{
  select: {
    id: true
    createdAt: true
    name: true
    description: true
    coverImageUri: true
    introVideoUri: true
    introVideoThumbUri: true
    introAudioUri: true
    contentAccessScope: true
    location: true
    _count: {
      select: {
        Members: true
        Admins: true
        Workouts: true
        WorkoutPlans: true
      }
    }
    Owner: {
      select: {
        id: true
        displayName: true
        avatarUri: true
      }
    }
    Admins: {
      select: {
        id: true
        displayName: true
        avatarUri: true
      }
    }
  }
}>

export type ClubChatSummaryPayload = Prisma.ClubGetPayload<{
  select: {
    id: true
    name: true
    coverImageUri: true
    Owner: {
      select: {
        id: true
        displayName: true
        avatarUri: true
      }
    }
    Admins: {
      select: {
        id: true
        displayName: true
        avatarUri: true
      }
    }
    Members: {
      select: {
        id: true
        displayName: true
        avatarUri: true
      }
    }
  }
}>

export type ClubMembersPayload = Prisma.ClubGetPayload<{
  select: {
    Owner: {
      select: {
        id: true
        displayName: true
        avatarUri: true
        townCity: true
        countryCode: true
        tagline: true
        Skills: {
          select: {
            name: true
          }
        }
      }
    }
    Admins: {
      select: {
        id: true
        displayName: true
        avatarUri: true
        townCity: true
        countryCode: true
        tagline: true
        Skills: {
          select: {
            name: true
          }
        }
      }
    }
    Members: {
      select: {
        id: true
        displayName: true
        avatarUri: true
        townCity: true
        countryCode: true
        tagline: true
        Skills: {
          select: {
            name: true
          }
        }
      }
    }
  }
}>

// Data payload required to be able to form up WorkoutSummary data.
export type WorkoutSummaryPayload = Prisma.WorkoutGetPayload<{
  select: {
    id: true
    createdAt: true
    updatedAt: true
    archived: true
    name: true
    coverImageUri: true
    description: true
    difficultyLevel: true
    lengthMinutes: true
    metaData: true
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
      }
    }
    _count: {
      select: { LoggedWorkouts: true }
    }
  }
}>

export type WorkoutMetaData = {
  bodyweightOnly: boolean
  moves: string[]
  bodyAreas: string[]
}

// Data payload required to be able to form up WorkoutSummary data.
export type WorkoutPlanSummaryPayload = Prisma.WorkoutPlanGetPayload<{
  select: {
    id: true
    createdAt: true
    updatedAt: true
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

///// DEPRECATED ////
/// For creating a duplicate of a workout.
export type WorkoutFullDataPayload = Prisma.WorkoutGetPayload<{
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

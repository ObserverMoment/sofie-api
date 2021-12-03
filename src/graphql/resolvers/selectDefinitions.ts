export const selectForUserSummary = {
  id: true,
  displayName: true,
  avatarUri: true,
  userProfileScope: true,
}

export const selectForClubSummary = {
  id: true,
  createdAt: true,
  name: true,
  description: true,
  coverImageUri: true,
  location: true,
  _count: {
    select: {
      Members: true,
      Admins: true,
    },
  },
  Owner: {
    select: selectForUserSummary,
  },
}

export const selectForWorkoutSummary = {
  id: true,
  createdAt: true,
  name: true,
  archived: true,
  coverImageUri: true,
  description: true,
  difficultyLevel: true,
  lengthMinutes: true,
  WorkoutGoals: true,
  WorkoutTags: true,
  WorkoutSections: {
    select: {
      WorkoutSectionType: {
        select: {
          name: true,
        },
      },
      classVideoUri: true,
      classAudioUri: true,
      WorkoutSets: {
        select: {
          WorkoutMoves: {
            select: {
              Equipment: true,
              Move: {
                select: {
                  RequiredEquipments: true,
                },
              },
            },
          },
        },
      },
    },
  },
  User: {
    select: selectForUserSummary,
  },
  _count: {
    select: { LoggedWorkouts: true },
  },
}

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
    select: selectForUserSummary,
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

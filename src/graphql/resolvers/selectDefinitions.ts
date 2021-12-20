export const selectForUserAvatarData = {
  id: true,
  displayName: true,
  avatarUri: true,
}

export const selectForClubSummary = {
  id: true,
  createdAt: true,
  name: true,
  description: true,
  coverImageUri: true,
  introVideoUri: true,
  introVideoThumbUri: true,
  introAudioUri: true,
  contentAccessScope: true,
  location: true,
  _count: {
    select: {
      Members: true,
      Admins: true,
      Workouts: true,
      WorkoutPlans: true,
    },
  },
  Owner: {
    select: selectForUserAvatarData,
  },
  Admins: {
    select: selectForUserAvatarData,
  },
}

export const selectForClubMemberSummary = {
  id: true,
  displayName: true,
  avatarUri: true,
  townCity: true,
  countryCode: true,
  Skills: {
    select: {
      name: true,
    },
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
    select: selectForUserAvatarData,
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
    select: selectForUserAvatarData,
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

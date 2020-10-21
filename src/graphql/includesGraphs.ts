const fullWorkoutDataIncludes = {
  createdBy: true,
  workoutType: true,
  workoutSections: {
    include: {
      roundAdjustRules: true,
      workoutMoves: {
        include: {
          selectedEquipment: true,
          move: true,
        },
      },
    },
  },
}

const fullWorkoutProgramDataIncludes = {
  createdBy: true,
  enrolments: {
    include: {
      user: true,
    },
  },
  workoutGoals: true,
  programWorkouts: {
    include: {
      workout: {
        include: fullWorkoutDataIncludes,
      },
    },
  },
  programReviews: {
    include: { user: true },
  },
}

const fullLoggedWorkoutDataIncludes = {
  workoutType: true,
  workoutSections: {
    include: {
      roundAdjustRules: true,
      workoutMoves: {
        include: {
          selectedEquipment: true,
          move: true,
        },
      },
    },
  },
}

const fullUserIncludes = {
  gymProfiles: {
    include: { availableEquipments: true },
  },
}

export {
  fullWorkoutDataIncludes,
  fullWorkoutProgramDataIncludes,
  fullLoggedWorkoutDataIncludes,
  fullUserIncludes,
}

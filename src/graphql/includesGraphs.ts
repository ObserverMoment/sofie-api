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
  fullLoggedWorkoutDataIncludes,
  fullUserIncludes,
}

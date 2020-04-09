const prisma = require('../prisma/client')

const resolvers = {
  Query: {
    hello: (_, a) => {
      return `${a.testMessage}`
    },
    moves: async (r, a, { selected }, i) => {
      return prisma.move.findMany({
        select: selected.Move
      })
    },
    users: async (r, a, { selected }, i) => {
      return prisma.user.findMany({ selected })
    },
    workouts: async (r, a, { selected }, i) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const omitRelationsFromSelect = ['workoutMoves', 'worldRecord']
      const select = Object.keys(selected.Workout).reduce(
        (acum, nextKey) => ({
          ...acum,
          [nextKey]: !omitRelationsFromSelect.includes(nextKey) || false
        }),
        {}
      )
      return prisma.workout.findMany({ select })
    }
  },
  Workout: {
    // You always need to get the Move back along with the workout move.
    // So do it in a single call rather than nesting WorkoutMove -> Move
    workoutMoves: async ({ id }, a, { workoutMovesFromWorkoutIdLoader }, i) => {
      return workoutMovesFromWorkoutIdLoader.load(id)
    },
    worldRecord: async ({ id }, a, { worldRecordFromWorkoutIdLoader }, i) => {
      return worldRecordFromWorkoutIdLoader.load(id)
    }
  }
}

module.exports = resolvers

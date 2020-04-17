const prisma = require('../prisma/client')

const resolvers = {
  Query: {
    moves: async (r, a, { selected }, i) => {
      return prisma.move.findMany({
        select: selected.Move
      })
    },
    userByUid: async (r, { uid }, { selected }, i) => {
      console.log('userByUid - uid', uid)
      const user = await prisma.user.findOne({
        where: { firebaseUid: uid },
        select: selected.User
      })
      console.log('userByUid', user)
      return user
    },
    users: async (r, a, { selected }, i) => {
      return prisma.user.findMany({ select: selected.User })
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
  Mutation: {
    createUser: async (r, { uid, displayName }, { selected }, i) => {
      console.log('createUser - uid', uid)
      const user = await prisma.user.create({
        data: {
          firebaseUid: uid,
          displayName
        },
        select: selected.User
      })
      console.log('createUserFromUid', user)
      return user
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

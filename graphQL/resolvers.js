const { stripRelationsFromSelected } = require('./utils')

const resolvers = {
  Query: {
    checkUniqueDisplayName: async (r, { displayName }, { prisma }, i) => {
      const user = await prisma.user.findOne({
        where: { displayName }
      })
      return user == null
    },
    moves: async (r, a, { selected, prisma }, i) => {
      const select = stripRelationsFromSelected(selected.Move, ['Equipment'])
      return prisma.move.findMany({ select })
    },
    userByUid: async (r, { uid }, { selected, prisma }, i) => {
      return prisma.user.findOne({
        where: { firebaseUid: uid },
        select: selected.User
      })
    },
    users: async (r, a, { selected, prisma }, i) => {
      return prisma.user.findMany({ select: selected.User })
    },
    workouts: async (r, { scope }, { selected, prisma }, i) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const select = stripRelationsFromSelected(selected.Workout, [
        'workoutMoves',
        'worldRecord'
      ])
      return scope === 'ALL'
        ? prisma.workout.findMany({ select })
        : prisma.workout.findMany({ where: { scope }, select })
    }
  },
  Mutation: {
    createUser: async (r, { uid }, { selected, prisma }, i) => {
      return prisma.user.create({
        data: {
          firebaseUid: uid
        },
        select: selected.User
      })
    },
    updateUser: async (r, { id, data }, { selected, prisma }, i) => {
      // Handle datetime conversion.
      const formattedData = data.birthdate
        ? { ...data, birthdate: new Date(data.birthdate) }
        : data
      return prisma.user.update({
        where: { id },
        data: formattedData
      })
    },
    createWorkout: async (
      r,
      { userId, workout, workoutMovesAndMoveIds },
      { selected, prisma },
      i
    ) => {
      // Create a workout with side posted array of workoutmoves
      // Workout must be connected to a user
      // Each workoutMove must be connected to a move
      const workoutMoves = workoutMovesAndMoveIds.map(wm => ({
        ...wm,
        move: {
          connect: {
            id: wm.moveId
          }
        }
      }))
      return prisma.workout.create({
        data: {
          ...workout,
          createdBy: {
            connect: {
              id: userId
            }
          },
          workoutMoves: {
            create: workoutMoves
          }
        }
      })
    }
  },
  Workout: {
    // You always need to get the Move back along with the workout move.
    // So do it in a single call rather than nesting WorkoutMove -> Move
    workoutMoves: async ({ id }, a, { workoutMovesFromWorkoutIdLoader }, i) => {
      return workoutMovesFromWorkoutIdLoader.load(id)
    },
    worldRecords: async ({ id }, a, { worldRecordsFromWorkoutIdLoader }, i) => {
      return worldRecordsFromWorkoutIdLoader.load(id)
    }
  }
}

module.exports = resolvers

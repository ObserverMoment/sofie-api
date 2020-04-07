const DataLoader = require('dataloader')
const prisma = require('../prisma/client')

// Dataloaders - TODO: Create these from new on each request (on context) to avoid caching issues across multiple clients.
const worldRecordFromWorkoutIdLoader = new DataLoader(
  batchGetWorldRecordsByWorkoutId
)
const workoutMovesFromWorkoutIdLoader = new DataLoader(
  batchGetWorkoutMovesByWorkoutId
)
const moveFromWorkoutMoveIdLoader = new DataLoader(batchGetMoveByWorkoutMoveId)

// Batching functions
async function batchGetWorldRecordsByWorkoutId (workoutIds) {
  const results = await prisma.worldRecord.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    }
  })
  return workoutIds.map(
    workoutId =>
      results.find(r => r.workoutId === workoutId) ||
      new Error(`No world record found for ${workoutId}`)
  )
}

async function batchGetWorkoutMovesByWorkoutId (workoutIds) {
  const results = await prisma.workoutMove.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    }
  })
  return workoutIds.map(
    workoutId =>
      results.filter(r => r.workoutId === workoutId) ||
      new Error(`No workout move found for ${workoutId}`)
  )
}

async function batchGetMoveByWorkoutMoveId (workoutMoveIds) {
  console.log('workoutMoveIds', workoutMoveIds)
  const results = await prisma.move.findMany({
    where: {
      workoutMoves: { some: { id: { in: workoutMoveIds } } }
    },
    include: { workoutMoves: { select: { id: true } } }
  })
  console.log('results', results)
  const moves = results.map(({ id, name, workoutMoves }) => ({
    id,
    name,
    workoutMoveIds: workoutMoves.map(({ id }) => id)
  }))
  console.log('moves', moves)
  return workoutMoveIds.map(
    workoutMoveId =>
      results.find(r => r.workoutMoveId === workoutMoveId) ||
      new Error(`No move found for ${workoutMoveId}`)
  )
}

const resolvers = {
  Query: {
    hello: (_, a) => {
      return `${a.testMessage}`
    },
    moves: async (r, a, { selected }, i) => {
      const moves = await prisma.move.findMany({
        select: selected.Move
      })
      return moves
    },
    workouts: async (r, a, { selected }, i) => {
      const workouts = await prisma.workout.findMany({
        select: selected.Workout
      })
      return workouts
    }
  },
  Workout: {
    workoutMoves: async ({ id }, a, c, i) => {
      const workoutMoves = await workoutMovesFromWorkoutIdLoader.load(id)
      return workoutMoves
    },
    worldRecord: async ({ id }, a, c, i) => {
      const worldRecord = await worldRecordFromWorkoutIdLoader.load(id)
      return worldRecord
    }
  },
  WorkoutMove: {
    move: async ({ id }, a, c, i) => {
      const move = await moveFromWorkoutMoveIdLoader.load(id)
      return move
    }
  }
}

module.exports = resolvers

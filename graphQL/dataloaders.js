const DataLoader = require('dataloader')
const prisma = require('../prisma/client')

const createWorldRecordFromWorkoutIdLoader = () =>
  new DataLoader(batchGetWorldRecordsByWorkoutId)

async function batchGetWorldRecordsByWorkoutId (workoutIds) {
  const results = await prisma.worldRecord.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    }
  })
  return workoutIds.map(
    workoutId =>
      results.find(r => r.workoutId === workoutId) ||
      new Error(
        `batchGetWorldRecordsByWorkoutId: No world record found for ${workoutId}`
      )
  )
}

const createWorkoutMovesFromWorkoutIdLoader = () =>
  new DataLoader(batchGetWorkoutMovesByWorkoutId)

// Also get and returns the related move.
async function batchGetWorkoutMovesByWorkoutId (workoutIds) {
  const results = await prisma.workoutMove.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    },
    include: {
      move: true
    }
  })
  return workoutIds.map(
    workoutId =>
      results.filter(r => r.workoutId === workoutId) ||
      new Error(
        `batchGetWorkoutMovesByWorkoutId: No workout move found for ${workoutId}`
      )
  )
}

module.exports = {
  createWorldRecordFromWorkoutIdLoader,
  createWorkoutMovesFromWorkoutIdLoader
}

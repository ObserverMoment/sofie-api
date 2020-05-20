const DataLoader = require('dataloader')
const prisma = require('../prisma/client')

const createWorldRecordsFromWorkoutIdLoader = () =>
  new DataLoader(batchGetWorldRecordsByWorkoutId)

async function batchGetWorldRecordsByWorkoutId (workoutIds) {
  const results = await prisma.worldRecord.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    }
  })
  return workoutIds.map(
    workoutId =>
      results.filter(r => r.workoutId === workoutId) ||
      new Error(
        `batchGetWorldRecordsByWorkoutId: No world records found for ${workoutId}`
      )
  )
}

const createWorkoutSectionsAndMovesFromWorkoutIdLoader = () =>
  new DataLoader(batchGetWorkoutSectionsAndMovesByWorkoutId)

// Also get and returns the related move.
async function batchGetWorkoutSectionsAndMovesByWorkoutId (workoutIds) {
  // TODO....
  const results = await prisma.workoutSection.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    },
    include: {
      workoutMoves: {
        include: {
          move: true
        }
      }
    }
  })
  return workoutIds.map(
    workoutId =>
      results.filter(r => r.workoutId === workoutId) ||
      new Error(
        `batchGetWorkoutMovesByWorkoutId: No workout sections or moves found for ${workoutId}`
      )
  )
}

module.exports = {
  createWorldRecordsFromWorkoutIdLoader,
  createWorkoutSectionsAndMovesFromWorkoutIdLoader
}

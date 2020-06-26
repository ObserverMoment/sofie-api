const DataLoader = require('dataloader')
const prisma = require('../prisma/client')

const createWorkoutSectionsAndMovesFromWorkoutIdLoader = () =>
  new DataLoader(batchGetWorkoutSectionsAndMovesByWorkoutId)

// Also get and returns the related move.
async function batchGetWorkoutSectionsAndMovesByWorkoutId (workoutIds) {
  const results = await prisma.workoutSection.findMany({
    where: {
      workout: { id: { in: workoutIds } }
    },
    include: {
      workoutMoves: {
        include: {
          selectedEquipment: true,
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
  createWorkoutSectionsAndMovesFromWorkoutIdLoader
}

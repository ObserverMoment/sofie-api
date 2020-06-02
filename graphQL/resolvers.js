const { stripRelationsFromSelected } = require('./utils')

const resolvers = {
  Query: {
    checkUniqueDisplayName: async (r, { displayName }, { prisma }, i) => {
      const user = await prisma.user.findOne({
        where: { displayName }
      })
      return user == null
    },
    officialMoves: async (r, a, { selected, prisma }, i) => {
      // For now - must always request selectable and required equipment together.
      if (selected.Move && (selected.Move.requiredEquipmentIds || selected.Move.selectableEquipmentIds)) {
        delete selected.Move.requiredEquipmentIds
        delete selected.Move.selectableEquipmentIds
        const moves = await prisma.move.findMany({
          where: { scope: 'OFFICIAL' },
          select: {
            ...selected.Move,
            requiredEquipments: {
              select: { id: true }
            },
            selectableEquipments: {
              select: { id: true }
            }
          }
        })
        return moves.map(m => ({
          ...m,
          requiredEquipmentIds: m.requiredEquipments && m.requiredEquipments.map(e => e.id),
          selectableEquipmentIds: m.selectableEquipments && m.selectableEquipments.map(e => e.id)
        }))
      } else {
        return prisma.move.findMany({
          where: { scope: 'OFFICIAL' },
          select: selected.Move
        })
      }
    },
    officialEquipments: async (r, a, { selected, prisma }, i) => {
      return prisma.equipment.findMany({ select: selected.Equipment })
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
        'workoutSections',
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
      { userId, workoutData },
      { selected, prisma },
      i
    ) => {
      console.log(workoutData)
      return null
      // Create a workout with side posted array of workout sections, and workoutmoves
      // Workout must be connected to a user
      // Each workoutMove must be connected to a move and to an equipment via selectedEquipment
      // const workoutMoves = workoutSectionsAndMoves.map(wm => ({
      //   ...wm,
      //   move: {
      //     connect: {
      //       id: wm.moveId
      //     }
      //   }
      // }))
      // return prisma.workout.create({
      //   data: {
      //     ...workout,
      //     createdBy: {
      //       connect: {
      //         id: userId
      //       }
      //     },
      //     workoutMoves: {
      //       create: workoutMoves
      //     }
      //   }
      // })
    }
  },
  Workout: {
    // You always need to get the WorkoutMoves and the Moves back along with the workoutSection.
    // So do it in a single call rather than nesting WorkoutMove -> Move
    workoutSections: async (
      { id },
      a,
      { workoutSectionsAndMovesFromWorkoutIdLoader },
      i
    ) => {
      return workoutSectionsAndMovesFromWorkoutIdLoader.load(id)
    },
    worldRecords: async ({ id }, a, { worldRecordsFromWorkoutIdLoader }, i) => {
      return worldRecordsFromWorkoutIdLoader.load(id)
    }
  }
}

module.exports = resolvers

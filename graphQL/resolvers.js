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
      // Assumed that you always want requiredEquipments and selectableEquipments.
      // when getting official moves.
      // You only need the ids so that on the FE you can find the right equipment from the repo by id.
      return prisma.move.findMany({
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
    },
    officialEquipments: async (r, a, { selected, prisma }, i) => {
      return prisma.equipment.findMany({ select: selected.Equipment })
    },
    officialWorkouts: async (r, a, { selected, prisma }, i) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const select = stripRelationsFromSelected(selected.Workout, [
        'workoutSections',
        'worldRecords'
      ])
      const workouts = await prisma.workout.findMany({
        select,
        where: { scope: 'OFFICIAL' }
      })
      return workouts
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
    workoutById: async (r, { id }, { selected, prisma }, i) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const select = stripRelationsFromSelected(selected.Workout, [
        'workoutSections',
        'worldRecords'
      ])
      return prisma.workout.findOne({
        select,
        where: {
          id
        }
      })
    },
    allWorkouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const select = stripRelationsFromSelected(selected.Workout, [
        'workoutSections',
        'worldRecords'
      ])
      return prisma.workout.findMany({
        select,
        where: {
          AND: [
            { createdBy: { id: authedUserId } },
            {
              NOT: [{ scope: 'OFFICIAL' }]
            }
          ]
        }
      })
    },
    // TODO: Also allow passing an array of scopes.
    workoutsByScope: async (
      r,
      { authedUserId, scopes },
      { selected, prisma },
      i
    ) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const select = stripRelationsFromSelected(selected.Workout, [
        'workoutSections',
        'workoutMoves',
        'worldRecord'
      ])
      // TODO: This resolver should never retrieve Official Workouts
      // This should happen in a separate resolver
      // authedUser
      return prisma.workout.findMany({
        where: { scope: { in: scopes }, createdBy: { id: authedUserId } },
        select
      })
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
      { authedUserId, workoutData },
      { selected, prisma },
      i
    ) => {
      const data = {
        ...workoutData,
        createdBy: { connect: { id: authedUserId } },
        workoutSections: {
          create: [
            ...workoutData.workoutSections.map(section => ({
              ...section,
              pyramidStructure: {
                set: section.pyramidStructure || []
              },
              workoutMoves: {
                create: [
                  ...section.workoutMoves.map(workoutMove => {
                    const { selectedEquipmentId } = workoutMove
                    const selectedEquipment = selectedEquipmentId
                      ? {
                        connect: {
                          id: workoutMove.selectedEquipmentId || undefined
                        }
                      }
                      : null
                    const workoutMoveData = {
                      ...workoutMove,
                      selectedEquipment,
                      move: {
                        connect: { id: workoutMove.moveId }
                      }
                    }
                    delete workoutMoveData.selectedEquipmentId
                    delete workoutMoveData.moveId
                    return workoutMoveData
                  })
                ]
              }
            }))
          ]
        }
      }
      return prisma.workout.create({ data })
    }
  },
  Workout: {
    // You always need to get the WorkoutMoves and the Moves back along with the workoutSection.
    // So do it in a single call rather than nesting WorkoutMove -> workoutSection -> Move
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

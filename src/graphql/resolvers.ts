import {
  stripRelationsFromSelected,
  deleteAllWorkoutDescendants,
  buildCreateWorkoutData,
} from './utils'
import {
  QueryResolvers,
  WorkoutResolvers,
  MutationResolvers,
} from '../generated/graphql'
import { deleteFiles } from '../uploadcare'
import { Workout, PrismaClient, WorkoutScoreType } from '@prisma/client'

interface Resolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
  Workout: WorkoutResolvers
}

const resolvers: Resolvers = {
  Query: {
    checkUniqueDisplayName: async (r, { displayName }, { prisma }, i) => {
      const user = await prisma.user.findOne({
        where: { displayName },
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
            select: { id: true },
          },
          selectableEquipments: {
            select: { id: true },
          },
        },
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
      ])
      const workouts = await prisma.workout.findMany({
        select,
        where: { scope: 'OFFICIAL' },
      })
      return workouts
    },
    officialWorkoutTypes: async (r, a, { selected, prisma }, i) => {
      const select = selected.WorkoutType || null
      return prisma.workoutType.findMany({
        select,
      })
    },
    moves: async (r, a, { selected, prisma }, i) => {
      const select = stripRelationsFromSelected(selected.Move, ['Equipment'])
      return prisma.move.findMany({ select })
    },
    userByUid: async (r, { uid }, { selected, prisma }, i) => {
      return prisma.user.findOne({
        where: { firebaseUid: uid },
        select: selected.User,
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
      ])
      return prisma.workout.findOne({
        select,
        where: {
          id,
        },
      })
    },
    workouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      // This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
      // These calls are made via the Workout subfields and handled by Dataloaders
      const select = stripRelationsFromSelected(selected.Workout, [
        'workoutSections',
      ])
      return prisma.workout.findMany({
        select,
        where: {
          AND: [
            { createdBy: { id: authedUserId } },
            {
              NOT: [{ scope: 'OFFICIAL' }],
            },
          ],
        },
      })
    },
  },
  Mutation: {
    createUser: async (r, { uid }, { selected, prisma }, i) => {
      return prisma.user.create({
        data: {
          firebaseUid: uid,
        },
        select: selected.User,
      })
    },
    updateUser: async (r, { id, data }, { selected, prisma }, i) => {
      // Handle datetime conversion.
      const formattedData = data.birthdate
        ? { ...data, birthdate: new Date(data.birthdate) }
        : data
      return prisma.user.update({
        where: { id },
        data: formattedData,
      })
    },
    createWorkout: async (
      r,
      { authedUserId, workoutData },
      { selected, prisma },
      i,
    ) => {
      const data = buildCreateWorkoutData(authedUserId, workoutData, true)
      const workout = await prisma.workout.create({
        data,
        include: {
          workoutType: true,
        },
      })
      return workout
    },
    shallowUpdateWorkout: async (
      _r,
      { authedUserId, workoutData },
      { selected, prisma },
      i,
    ) => {
      return prisma.workout.update({
        where: { id: workoutData.id },
        data: workoutData,
        include: {
          workoutType: true,
        },
      })
    },
    deepUpdateWorkout: async (
      _r,
      { authedUserId, workoutData },
      { selected, prisma },
      i,
    ) => {
      // Delete all children of the workout before rebuilding with new data.
      await deleteAllWorkoutDescendants(prisma, workoutData.id)

      const data = buildCreateWorkoutData(authedUserId, workoutData, false)

      // Then rebuild all children of the workout, and update the workout itself.
      return prisma.workout.update({
        where: { id: workoutData.id },
        data,
        include: {
          workoutType: true,
        },
      })
    },
    deleteWorkout: async (
      _r,
      { authedUserId, workoutId },
      { selected, prisma }: { selected: any; prisma: PrismaClient },
      i,
    ) => {
      // Also deletes all sections and moves.
      await deleteAllWorkoutDescendants(prisma, workoutId)

      const deletedWorkout: Workout = await prisma.workout.delete({
        where: { id: workoutId },
      })

      // Are the media files being used by other workouts that have been copied?
      // if they are, then do not delete them.
      const workoutsSharingImage: Workout[] = await prisma.workout.findMany({
        where: {
          imageUrl: deletedWorkout.imageUrl,
        },
      })

      if (workoutsSharingImage.length == 0) {
        // Then the media files are not shared so delete the file
        await deleteFiles([deletedWorkout.imageUrl] as string[])
      }

      const workoutsSharingVideo: Workout[] = await prisma.workout.findMany({
        where: {
          demoVideoUrl: deletedWorkout.demoVideoUrl,
        },
      })

      if (workoutsSharingVideo.length == 0) {
        // Then the media files are not shared so delete the file
        await deleteFiles([
          deletedWorkout.demoVideoUrl,
          deletedWorkout.demoVideoThumbUrl,
        ] as string[])
      }

      return deletedWorkout.id
    },
  },
  Workout: {
    // You always need to get the WorkoutMoves and the Moves back along with the workoutSection.
    // So do it in a single call rather than nesting WorkoutMove -> workoutSection -> Move
    workoutSections: async ({ id }, a, { prisma }, i) => {
      return prisma.workoutSection.findMany({
        where: {
          workoutId: id,
        },
        include: {
          roundAdjustRules: true,
          workoutMoves: {
            include: {
              selectedEquipment: true,
              move: true,
            },
          },
        },
      })
    },
  },
}

export default resolvers

import {
  buildCreateWorkoutData,
  buildUpdateWorkoutData,
  buildCreateLoggedWorkoutData,
  WorkoutParentType,
  deleteAllDescendents,
  buildUpdateLoggedWorkoutData,
} from './workoutBuilders'

import { QueryResolvers, MutationResolvers } from '../generated/graphql'
import {
  deleteFiles,
  checkThenDeleteWorkoutImageFile,
  checkThenDeleteWorkoutVideoFiles,
  checkWorkoutMediaForDeletion,
  checkLoggedWorkoutMediaForDeletion,
  checkThenDeleteLoggedWorkoutImageFile,
  checkThenDeleteLoggedWorkoutVideoFiles,
} from '../uploadcare'
import { Workout, PrismaClient, LoggedWorkout } from '@prisma/client'
import workout from './schema/workout'

interface Resolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
}

const fullWorkoutDataIncludes = {
  workoutType: true,
  workoutSections: {
    include: {
      roundAdjustRules: true,
      workoutMoves: {
        include: {
          selectedEquipment: true,
          move: true,
        },
      },
    },
  },
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
      const workouts = await prisma.workout.findMany({
        where: { scope: 'OFFICIAL' },
        include: fullWorkoutDataIncludes,
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
      return prisma.move.findMany()
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
      return prisma.workout.findOne({
        where: {
          id,
        },
        include: fullWorkoutDataIncludes,
      })
    },
    workouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      return prisma.workout.findMany({
        where: {
          AND: [
            { createdBy: { id: authedUserId } },
            {
              NOT: [{ scope: 'OFFICIAL' }],
            },
          ],
        },
        include: fullWorkoutDataIncludes,
      })
    },
    loggedWorkouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      return prisma.loggedWorkout.findMany({
        where: {
          completedBy: { id: authedUserId },
        },
        include: fullWorkoutDataIncludes,
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
      const data = buildCreateWorkoutData(authedUserId, workoutData)
      return prisma.workout.create({
        data,
        include: fullWorkoutDataIncludes,
      })
    },
    deepUpdateWorkout: async (
      _r,
      { authedUserId, workoutData },
      { selected, prisma },
      i,
    ) => {
      // Handle deleting of now unused media from the host.
      await checkWorkoutMediaForDeletion(prisma, workoutData)

      // Delete all children of the workout before rebuilding with new data.
      await deleteAllDescendents(
        prisma,
        workoutData.id,
        WorkoutParentType.WORKOUT,
      )

      const data = buildUpdateWorkoutData(workoutData)

      // Then rebuild all children of the workout, and update the workout itself.
      return prisma.workout.update({
        where: { id: workoutData.id },
        data,
        include: fullWorkoutDataIncludes,
      })
    },
    shallowUpdateWorkout: async (
      _r,
      { authedUserId, workoutData },
      { selected, prisma },
      i,
    ) => {
      // Handle deleting of now unused media from the host.
      await checkWorkoutMediaForDeletion(prisma, workoutData)

      return prisma.workout.update({
        where: { id: workoutData.id },
        data: workoutData,
        include: fullWorkoutDataIncludes,
      })
    },
    deleteWorkout: async (
      _r,
      { authedUserId, workoutId },
      { selected, prisma }: { selected: any; prisma: PrismaClient },
      i,
    ) => {
      // Also deletes all sections and moves.
      await deleteAllDescendents(prisma, workoutId, WorkoutParentType.WORKOUT)

      const deletedWorkout: Workout = await prisma.workout.delete({
        where: { id: workoutId },
      })

      await checkThenDeleteWorkoutImageFile(prisma, deletedWorkout.imageUrl)

      await checkThenDeleteWorkoutVideoFiles(
        prisma,
        deletedWorkout.demoVideoUrl,
        deletedWorkout.demoVideoThumbUrl,
      )

      return deletedWorkout.id
    },
    createLoggedWorkout: async (
      _r,
      { authedUserId, loggedWorkoutData },
      { selected, prisma },
      i,
    ) => {
      // Runs buildWorkoutData as a subroutine.
      const data = buildCreateLoggedWorkoutData(authedUserId, loggedWorkoutData)

      return prisma.loggedWorkout.create({
        data,
        include: fullWorkoutDataIncludes,
      })
    },
    deepUpdateLoggedWorkout: async (
      _r,
      { authedUserId, loggedWorkoutData },
      { selected, prisma },
      i,
    ) => {
      // Handle deleting of now unused media from the host.
      await checkLoggedWorkoutMediaForDeletion(prisma, loggedWorkoutData)

      // Delete all children of the logged workout before rebuilding with new data.
      await deleteAllDescendents(
        prisma,
        loggedWorkoutData.id,
        WorkoutParentType.LOGGEDWORKOUT,
      )

      const data = buildUpdateLoggedWorkoutData(loggedWorkoutData)

      // Then rebuild all children of the loggedworkout, and update the loggedworkout itself.
      return prisma.loggedWorkout.update({
        where: { id: loggedWorkoutData.id },
        data,
        include: fullWorkoutDataIncludes,
      })
    },
    shallowUpdateLoggedWorkout: async (
      _r,
      { authedUserId, loggedWorkoutData },
      { selected, prisma },
      i,
    ) => {
      // Handle deleting of now unused media from the host.
      await checkLoggedWorkoutMediaForDeletion(prisma, loggedWorkoutData)

      return prisma.loggedWorkout.update({
        where: { id: loggedWorkoutData.id },
        data: loggedWorkoutData,
        include: fullWorkoutDataIncludes,
      })
    },
    deleteLoggedWorkout: async (
      _r,
      { authedUserId, loggedWorkoutId },
      { selected, prisma }: { selected: any; prisma: PrismaClient },
      i,
    ) => {
      // Also deletes all sections and moves.
      await deleteAllDescendents(
        prisma,
        loggedWorkoutId,
        WorkoutParentType.LOGGEDWORKOUT,
      )

      const deletedLoggedWorkout: LoggedWorkout = await prisma.loggedWorkout.delete(
        {
          where: { id: loggedWorkoutId },
        },
      )

      await checkThenDeleteLoggedWorkoutImageFile(
        prisma,
        deletedLoggedWorkout.imageUrl,
      )

      await checkThenDeleteLoggedWorkoutVideoFiles(
        prisma,
        deletedLoggedWorkout.videoUrl,
        deletedLoggedWorkout.videoThumbUrl,
      )

      return deletedLoggedWorkout.id
    },
  },
  // NOTE: Currently all top level resolvers are using Prisma includes to get nested relations
  // NOTE: Until batching / dataloader situation can be clarified.
  // Workout: {
  //   // You always need to get the WorkoutMoves and the Moves back along with the workoutSection.
  //   // So do it in a single call rather than nesting WorkoutMove -> workoutSection -> Move
  //   workoutSections: async ({ id }, a, { prisma }, i) => {
  //     return prisma.workoutSection.findMany({
  //       where: {
  //         workoutId: id,
  //       },
  //       include: {
  //         roundAdjustRules: true,
  //         workoutMoves: {
  //           include: {
  //             selectedEquipment: true,
  //             move: true,
  //           },
  //         },
  //       },
  //     })
  //   },
  // },
}

export default resolvers

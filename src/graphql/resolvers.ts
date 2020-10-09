import {
  buildCreateWorkoutData,
  buildUpdateWorkoutData,
  buildCreateLoggedWorkoutData,
  WorkoutParentType,
  deleteAllDescendents,
  buildUpdateLoggedWorkoutData,
} from './workoutBuilders'

import { Resolvers } from '../generated/graphql'
import {
  deleteFiles,
  checkThenDeleteWorkoutImageFile,
  checkThenDeleteWorkoutVideoFiles,
  checkWorkoutMediaForDeletion,
  checkLoggedWorkoutMediaForDeletion,
} from '../uploadcare'
import {
  PrismaClient,
  Workout,
  LikedWorkout,
  LoggedWorkout,
  ScheduledWorkout,
  Equipment,
} from '@prisma/client'

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
      return prisma.move.findMany({
        select: {
          ...selected.Move,
        },
      })
    },
    officialEquipments: async (r, a, { selected, prisma }, i) => {
      return prisma.equipment.findMany()
    },
    officialWorkouts: async (r, a, { selected, prisma }, i) => {
      const workouts = await prisma.workout.findMany({
        where: { scope: 'OFFICIAL' },
        include: fullWorkoutDataIncludes,
      })
      return workouts
    },
    publicWorkouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      // Once social network is in place you can use
      // { createdBy: { id: { IN: [ followingIds ] } } }
      return prisma.workout.findMany({
        where: {
          AND: [{ createdBy: { id: authedUserId } }, { scope: 'PUBLIC' }],
        },
        include: fullWorkoutDataIncludes,
      })
    },
    privateWorkouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      return prisma.workout.findMany({
        where: {
          AND: [{ createdBy: { id: authedUserId } }, { scope: 'PRIVATE' }],
        },
        include: fullWorkoutDataIncludes,
      })
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
        include: {
          gymProfiles: {
            include: {
              availableEquipments: true,
            },
          },
        },
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
    likedWorkouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      const likedWorkouts: LikedWorkout[] = await prisma.likedWorkout.findMany({
        where: {
          user: { id: authedUserId },
        },
      })
      return likedWorkouts.map(
        (likedWorkout: LikedWorkout) => likedWorkout.workoutId,
      )
    },
    scheduledWorkouts: async (r, { authedUserId }, { selected, prisma }, i) => {
      return prisma.scheduledWorkout.findMany({
        where: {
          user: { id: authedUserId },
        },
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
        include: {
          gymProfiles: true,
        },
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
        include: {
          gymProfiles: true,
        },
      })
    },
    createGymProfile: async (
      r,
      { authedUserId, data },
      { selected, prisma },
      i,
    ) => {
      const availableEquipments =
        data.availableEquipmentIds && data.availableEquipmentIds.length > 0
          ? {
              availableEquipments: {
                connect: data.availableEquipmentIds.map((id) => ({ id })),
              },
            }
          : {}
      delete data.availableEquipmentIds

      await prisma.gymProfile.create({
        data: {
          ...data,
          ...availableEquipments,
          user: {
            connect: { id: authedUserId },
          },
        },
      })
      return prisma.user.findOne({
        where: { id: authedUserId },
        include: {
          gymProfiles: {
            include: { availableEquipments: true },
          },
        },
      })
    },
    updateGymProfile: async (
      r,
      { authedUserId, data },
      { selected, prisma },
      i,
    ) => {
      // Always disconnect all availableEquipments before reconnecting them.
      // Get the old available equipments
      const oldAvailableEquipments: Equipment[] = await prisma.gymProfile
        .findOne({
          where: {
            id: data.id,
          },
        })
        .availableEquipments()

      await prisma.gymProfile.update({
        where: {
          id: data.id,
        },
        data: {
          availableEquipments: {
            disconnect: oldAvailableEquipments.map((e) => ({ id: e.id })),
          },
        },
      })

      const availableEquipments =
        data.availableEquipmentIds && data.availableEquipmentIds.length > 0
          ? {
              availableEquipments: {
                connect: data.availableEquipmentIds.map((id) => ({ id })),
              },
            }
          : {}
      delete data.availableEquipmentIds

      await prisma.gymProfile.update({
        where: {
          id: data.id,
        },
        data: {
          ...data,
          ...availableEquipments,
        },
      })
      return prisma.user.findOne({
        where: { id: authedUserId },
        include: {
          gymProfiles: {
            include: {
              availableEquipments: true,
            },
          },
        },
      })
    },
    deleteGymProfile: async (
      r,
      { authedUserId, gymProfileId },
      { selected, prisma },
      i,
    ) => {
      // Delete the gymProfile
      // Does this also remove entries from the gymProfileToEquipment relationship automatically?
      await prisma.gymProfile.delete({
        where: {
          id: gymProfileId,
        },
      })
      // Return a fresh user.
      return prisma.user.findOne({
        where: { id: authedUserId },
        include: {
          gymProfiles: {
            include: {
              availableEquipments: true,
            },
          },
        },
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
    likeWorkout: async (
      _r,
      { authedUserId, workoutId },
      { selected, prisma }: { selected: any; prisma: PrismaClient },
      i,
    ) => {
      const likedWorkout: LikedWorkout = await prisma.likedWorkout.create({
        data: {
          user: {
            connect: { id: authedUserId },
          },
          workout: {
            connect: { id: workoutId },
          },
        },
      })
      return likedWorkout.workoutId
    },
    unlikeWorkout: async (
      _r,
      { authedUserId, workoutId },
      { selected, prisma }: { selected: any; prisma: PrismaClient },
      i,
    ) => {
      const likedWorkout: LikedWorkout = await prisma.likedWorkout.delete({
        where: {
          userId_workoutId: {
            workoutId: workoutId,
            userId: authedUserId,
          },
        },
      })
      return likedWorkout.workoutId
    },
    scheduleWorkout: async (
      _r,
      { authedUserId, data },
      { selected, prisma },
      i,
    ) => {
      const workout = data.workoutId
        ? { workout: { connect: { id: data.workoutId } } }
        : {}
      const gymProfile = data.gymProfileId
        ? { gymProfile: { connect: { id: data.gymProfileId } } }
        : {}

      delete data.workoutId
      delete data.gymProfileId

      return prisma.scheduledWorkout.create({
        data: {
          ...data,
          scheduledAt: new Date(data.scheduledAt),
          user: {
            connect: { id: authedUserId },
          },
          ...workout,
          ...gymProfile,
        },
      })
    },
    unscheduleWorkout: async (
      _r,
      { authedUserId, scheduledWorkoutId },
      { selected, prisma },
      i,
    ) => {
      const deleted: ScheduledWorkout = await prisma.scheduledWorkout.delete({
        where: {
          id: scheduledWorkoutId,
        },
      })
      return deleted.id
    },
    updateScheduledWorkout: async (
      _r,
      { authedUserId, data },
      { selected, prisma },
      i,
    ) => {
      const workout = data.workoutId
        ? { workout: { connect: { id: data.workoutId } } }
        : {}
      delete data.workoutId

      const loggedWorkout = data.loggedWorkoutId
        ? { loggedWorkout: { connect: { id: data.loggedWorkoutId } } }
        : {}
      delete data.loggedWorkoutId

      const gymProfile = data.gymProfileId
        ? { gymProfile: { connect: { id: data.gymProfileId } } }
        : {}
      delete data.gymProfileId

      const scheduledAt = data.scheduledAt
        ? { scheduledAt: new Date(data.scheduledAt) }
        : {}
      delete data.scheduledAt

      return prisma.scheduledWorkout.update({
        where: {
          id: data.id,
        },
        data: {
          ...data,
          ...workout,
          ...loggedWorkout,
          ...gymProfile,
          ...scheduledAt,
        },
      })
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

      const gymProfile = loggedWorkoutData.gymProfileId
        ? {
            gymProfile: {
              connect: { id: loggedWorkoutData.gymProfileId || undefined },
            },
          }
        : {}

      delete data.gymProfileId

      // Then rebuild all children of the loggedworkout, and update the loggedworkout itself.
      return prisma.loggedWorkout.update({
        where: { id: loggedWorkoutData.id },
        data: { ...data, ...gymProfile },
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

      // GymProfile is currently included in the shallow update.
      // Otherwise changing the gym profile on a log would cause the deletion and re-creation of all the workoutSections and workoutMoves.
      // Look at moving it to deep update only at some point.
      const gymProfile = loggedWorkoutData.gymProfileId
        ? {
            gymProfile: {
              connect: { id: loggedWorkoutData.gymProfileId || undefined },
            },
          }
        : {}

      const data = {
        ...loggedWorkoutData,
        ...gymProfile,
      }

      delete data.gymProfileId

      return prisma.loggedWorkout.update({
        where: { id: loggedWorkoutData.id },
        data,
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

      // Remove any media on the server.
      if (deletedLoggedWorkout.videoUrl) {
        await deleteFiles([
          deletedLoggedWorkout.videoUrl,
          deletedLoggedWorkout.videoThumbUrl,
        ] as string[])
      }

      if (deletedLoggedWorkout.imageUrl) {
        await deleteFiles([deletedLoggedWorkout.imageUrl] as string[])
      }

      return deletedLoggedWorkout.id
    },
  },
}

export default resolvers

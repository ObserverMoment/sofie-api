import {
  buildUpdateWorkoutData,
  buildCreateLoggedWorkoutData,
  WorkoutParentType,
  deleteAllDescendents,
  buildUpdateLoggedWorkoutData,
} from '../workoutBuilders'

import { Resolvers } from '../../generated/graphql'

import {
  deleteFiles,
  checkThenDeleteWorkoutImageFile,
  checkThenDeleteWorkoutVideoFiles,
  checkWorkoutMediaForDeletion,
  checkLoggedWorkoutMediaForDeletion,
} from '../../uploadcare'

import {
  PrismaClient,
  Workout,
  LikedWorkout,
  LoggedWorkout,
  ScheduledWorkout,
} from '@prisma/client'

import {
  fullLoggedWorkoutDataIncludes,
  fullWorkoutDataIncludes,
} from '../includesGraphs'

import { workoutCascadeDeletes } from '../cascadeDeletes'

import {
  checkUniqueDisplayName,
  likedWorkouts,
  scheduledWorkouts,
  userByUid,
  createUser,
  updateUser,
  createGymProfile,
  updateGymProfile,
  deleteGymProfile,
} from './user'

import {
  officialMoves,
  officialEquipments,
  officialWorkoutGoals,
  officialWorkoutTypes,
} from './officialData'

import {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  privateWorkoutPrograms,
} from './workoutProgram'

import {
  officialWorkouts,
  publicWorkouts,
  privateWorkouts,
  workoutById,
  createWorkout,
  deepUpdateWorkout,
} from './workout'

import { loggedWorkouts } from './loggedWorkout'

import GraphQLJSON from 'graphql-type-json'

import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime which assumes UTC is being sent to and from the DB.',
    parseValue(value: string) {
      return new Date(value) // value from the client
    },
    serialize(value: Date) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    },
  }),
  Query: {
    checkUniqueDisplayName,
    userByUid,
    officialMoves,
    officialEquipments,
    officialWorkoutGoals,
    officialWorkoutTypes,
    officialWorkoutPrograms,
    publicWorkoutPrograms,
    privateWorkoutPrograms,
    officialWorkouts,
    publicWorkouts,
    privateWorkouts,
    workoutById,
    likedWorkouts,
    scheduledWorkouts,
    loggedWorkouts,
  },
  Mutation: {
    createUser,
    updateUser,
    createGymProfile,
    updateGymProfile,
    deleteGymProfile,
    createWorkout,
    deepUpdateWorkout,
    shallowUpdateWorkout: async (
      _r,
      { authedUserId, data },
      { selected, prisma },
      i,
    ) => {
      // Handle deleting of now unused media from the host.
      await checkWorkoutMediaForDeletion(prisma, data)

      return prisma.workout.update({
        where: { id: data.id },
        data: data,
        include: fullWorkoutDataIncludes,
      })
    },
    deleteWorkout: async (
      _r,
      { authedUserId, workoutId },
      { selected, prisma }: { selected: any; prisma: PrismaClient },
      i,
    ) => {
      // Deletes all sections, LikedWorkouts and ScheduledWorkouts moves.
      await deleteAllDescendents(prisma, workoutId, WorkoutParentType.WORKOUT)

      // Delete relations that require this workout to exist.
      await workoutCascadeDeletes(prisma, workoutId)

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
        include: fullLoggedWorkoutDataIncludes,
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
        include: fullLoggedWorkoutDataIncludes,
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
        include: fullLoggedWorkoutDataIncludes,
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

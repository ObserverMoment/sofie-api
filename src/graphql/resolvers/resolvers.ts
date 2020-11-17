import { Resolvers } from '../../generated/graphql'

import {
  checkUniqueDisplayName,
  users,
  userByUid,
  createUser,
  updateUser,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
} from './user'

import {
  moves,
  bodyAreas,
  equipments,
  workoutGoals,
  workoutTypes,
} from './officialData'

import {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  privateWorkoutPrograms,
  enrolledWorkoutProgramData,
  createWorkoutProgram,
  deepUpdateWorkoutProgram,
  shallowUpdateWorkoutProgram,
  deleteWorkoutProgramById,
  addEnrolmentToWorkoutProgram,
  removeEnrolmentFromWorkoutProgram,
} from './workoutProgram'

import {
  officialWorkouts,
  publicWorkouts,
  privateWorkouts,
  workoutById,
  createWorkout,
  deepUpdateWorkout,
  shallowUpdateWorkout,
  deleteWorkoutById,
} from './workout'

import {
  likedWorkouts,
  likeWorkout,
  unlikeWorkout,
  likedWorkoutPrograms,
  likeWorkoutProgram,
  unlikeWorkoutProgram,
} from './userLikes'

import {
  scheduledWorkouts,
  scheduleWorkout,
  unscheduleWorkout,
  updateScheduledWorkout,
} from './schedule'

import {
  loggedWorkouts,
  createLoggedWorkout,
  deepUpdateLoggedWorkout,
  shallowUpdateLoggedWorkout,
  deleteLoggedWorkoutById,
} from './loggedWorkout'

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
    users,
    userByUid,
    moves,
    bodyAreas,
    equipments,
    workoutGoals,
    workoutTypes,
    officialWorkoutPrograms,
    publicWorkoutPrograms,
    privateWorkoutPrograms,
    enrolledWorkoutProgramData,
    officialWorkouts,
    publicWorkouts,
    privateWorkouts,
    workoutById,
    likedWorkouts,
    scheduledWorkouts,
    loggedWorkouts,
    likedWorkoutPrograms,
  },
  Mutation: {
    createUser,
    updateUser,
    createGymProfile,
    updateGymProfile,
    deleteGymProfileById,
    createWorkout,
    deepUpdateWorkout,
    shallowUpdateWorkout,
    deleteWorkoutById,
    likeWorkout,
    unlikeWorkout,
    scheduleWorkout,
    unscheduleWorkout,
    updateScheduledWorkout,
    createLoggedWorkout,
    deepUpdateLoggedWorkout,
    shallowUpdateLoggedWorkout,
    deleteLoggedWorkoutById,
    createWorkoutProgram,
    deepUpdateWorkoutProgram,
    shallowUpdateWorkoutProgram,
    deleteWorkoutProgramById,
    likeWorkoutProgram,
    unlikeWorkoutProgram,
    addEnrolmentToWorkoutProgram,
    removeEnrolmentFromWorkoutProgram,
  },
}

export default resolvers

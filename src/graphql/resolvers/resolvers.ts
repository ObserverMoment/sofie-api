import { Resolvers } from '../../generated/graphql'

import {
  checkUniqueDisplayName,
  userByUid,
  userPublicProfile,
  creatorPublicProfiles,
  createUser,
  updateUser,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
} from './user'

import {
  progressJournals,
  progressJournalGoalTags,
  progressJournalById,
  createProgressJournal,
  updateProgressJournal,
  deleteProgressJournalById,
  createProgressJournalGoal,
  updateProgressJournalGoal,
  deleteProgressJournalGoalById,
  createProgressJournalGoalTag,
  updateProgressJournalGoalTag,
  deleteProgressJournalGoalTagsById,
  createProgressJournalEntry,
  updateProgressJournalEntry,
  deleteProgressJournalEntryById,
} from './progressJournal'

import {
  bodyAreas,
  equipments,
  createEquipment,
  updateEquipment,
  workoutGoals,
  workoutSectionTypes,
  moveTypes,
} from './officialData'

import {
  textSearchWorkouts,
  textSearchWorkoutPrograms,
  textSearchCreatorPublicProfiles,
} from './textSearch'

import {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  userWorkoutPrograms,
  workoutProgramById,
  userWorkoutProgramEnrolments,
  createWorkoutProgram,
  updateWorkoutProgram,
  deleteWorkoutProgramById,
  addEnrolmentToWorkoutProgram,
  removeEnrolmentFromWorkoutProgram,
} from './workoutProgram'

import {
  standardMoves,
  userCustomMoves,
  createMove,
  updateMove,
  deleteMoveById,
} from './move'

import {
  officialWorkouts,
  publicWorkouts,
  userWorkouts,
  workoutById,
  createWorkout,
  shallowUpdateWorkout,
  deleteWorkoutById,
  updateWorkoutSections,
  deleteWorkoutSectionsById,
} from './workout'

import {
  scheduledWorkouts,
  scheduleWorkout,
  unscheduleWorkout,
  updateScheduledWorkout,
} from './schedule'

import {
  loggedWorkouts,
  createLoggedWorkout,
  updateLoggedWorkout,
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
    validateToken: () => true, // Empty Resolver - call it and it will throw auth error if token is not valid / expired.
    checkUniqueDisplayName,
    userByUid,
    userPublicProfile,
    creatorPublicProfiles,
    standardMoves,
    userCustomMoves,
    bodyAreas,
    equipments,
    workoutGoals,
    workoutSectionTypes,
    moveTypes,
    officialWorkoutPrograms,
    publicWorkoutPrograms,
    userWorkoutPrograms,
    workoutProgramById,
    userWorkoutProgramEnrolments,
    officialWorkouts,
    publicWorkouts,
    userWorkouts,
    workoutById,
    scheduledWorkouts,
    loggedWorkouts,
    progressJournals,
    progressJournalGoalTags,
    progressJournalById,
    textSearchWorkouts,
    textSearchWorkoutPrograms,
    textSearchCreatorPublicProfiles,
  },
  Mutation: {
    createUser,
    updateUser,
    createEquipment,
    updateEquipment,
    createMove,
    updateMove,
    deleteMoveById,
    createGymProfile,
    updateGymProfile,
    deleteGymProfileById,
    createWorkout,
    shallowUpdateWorkout,
    deleteWorkoutById,
    updateWorkoutSections,
    deleteWorkoutSectionsById,
    scheduleWorkout,
    unscheduleWorkout,
    updateScheduledWorkout,
    createLoggedWorkout,
    updateLoggedWorkout,
    deleteLoggedWorkoutById,
    createWorkoutProgram,
    updateWorkoutProgram,
    deleteWorkoutProgramById,
    addEnrolmentToWorkoutProgram,
    removeEnrolmentFromWorkoutProgram,
    createProgressJournal,
    updateProgressJournal,
    deleteProgressJournalById,
    createProgressJournalEntry,
    updateProgressJournalEntry,
    deleteProgressJournalEntryById,
    createProgressJournalGoal,
    updateProgressJournalGoal,
    deleteProgressJournalGoalById,
    createProgressJournalGoalTag,
    updateProgressJournalGoalTag,
    deleteProgressJournalGoalTagsById,
  },
}

export default resolvers

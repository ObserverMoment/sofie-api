import { Resolvers } from '../../generated/graphql'

import {
  userLoggedWorkouts,
  createLoggedWorkout,
  updateLoggedWorkout,
  deleteLoggedWorkoutById,
  createLoggedWorkoutSection,
  updateLoggedWorkoutSection,
  deleteLoggedWorkoutSectionById,
  reorderLoggedWorkoutSections,
  createLoggedWorkoutSet,
  updateLoggedWorkoutSet,
  deleteLoggedWorkoutSetById,
  reorderLoggedWorkoutSets,
  createLoggedWorkoutMove,
  updateLoggedWorkoutMove,
  deleteLoggedWorkoutMoveById,
  reorderLoggedWorkoutMoves,
} from './loggedWorkout'

import {
  standardMoves,
  userCustomMoves,
  createMove,
  updateMove,
  softDeleteMoveById,
} from './move'

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
  userProgressJournals,
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
  deleteProgressJournalGoalTagById,
  createProgressJournalEntry,
  updateProgressJournalEntry,
  deleteProgressJournalEntryById,
} from './progressJournal'

import {
  userScheduledWorkouts,
  scheduleWorkout,
  unscheduleWorkout,
  updateScheduledWorkout,
} from './schedule'

import {
  textSearchWorkouts,
  textSearchWorkoutPrograms,
  textSearchCreatorPublicProfiles,
} from './textSearch'

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
    //// Core Data ////
    bodyAreas,
    equipments,
    moveTypes,
    workoutGoals,
    workoutSectionTypes,

    //// Progress Journal ////
    userProgressJournals,
    progressJournalGoalTags,
    progressJournalById,

    //// User ////
    checkUniqueDisplayName,
    userByUid,
    userPublicProfile,
    creatorPublicProfiles,

    officialWorkoutPrograms,
    publicWorkoutPrograms,
    userWorkoutPrograms,
    workoutProgramById,
    userWorkoutProgramEnrolments,
    officialWorkouts,
    publicWorkouts,
    userWorkouts,
    workoutById,

    //// Logged Workouts ////
    userLoggedWorkouts,
    //// Move ////
    standardMoves,
    userCustomMoves,
    //// Scheduled Workouts ////
    userScheduledWorkouts,

    textSearchWorkouts,
    textSearchWorkoutPrograms,
    textSearchCreatorPublicProfiles,
  },
  Mutation: {
    ///////////////////
    //// Equipment ////
    ///////////////////
    createEquipment,
    updateEquipment,
    //////////////////////////
    //// Progress Journal ////
    //////////////////////////
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
    deleteProgressJournalGoalTagById,

    createUser,
    updateUser,

    createGymProfile,
    updateGymProfile,
    deleteGymProfileById,
    createWorkout,
    shallowUpdateWorkout,
    deleteWorkoutById,
    updateWorkoutSections,
    deleteWorkoutSectionsById,

    createWorkoutProgram,
    updateWorkoutProgram,
    deleteWorkoutProgramById,
    addEnrolmentToWorkoutProgram,
    removeEnrolmentFromWorkoutProgram,

    ///////////////////////
    //// LoggedWorkout ////
    ///////////////////////
    userLoggedWorkouts,
    createLoggedWorkout,
    updateLoggedWorkout,
    deleteLoggedWorkoutById,
    createLoggedWorkoutSection,
    updateLoggedWorkoutSection,
    deleteLoggedWorkoutSectionById,
    createLoggedWorkoutSet,
    updateLoggedWorkoutSet,
    deleteLoggedWorkoutSetById,
    createLoggedWorkoutMove,
    updateLoggedWorkoutMove,
    deleteLoggedWorkoutMoveById,
    reorderLoggedWorkoutSections,
    reorderLoggedWorkoutSets,
    reorderLoggedWorkoutMoves,
    //////////////
    //// Move ////
    //////////////
    createMove,
    updateMove,
    softDeleteMoveById,
    //////////////////////////
    //// Schedule Workout ////
    //////////////////////////
    scheduleWorkout,
    unscheduleWorkout,
    updateScheduledWorkout,
  },
}

export default resolvers

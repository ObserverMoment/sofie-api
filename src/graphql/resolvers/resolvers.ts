import { Resolvers } from '../../generated/graphql'

import {
  userLoggedWorkouts,
  loggedWorkoutById,
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
  createScheduledWorkout,
  updateScheduledWorkout,
  deleteScheduledWorkoutById,
} from './schedule'

import {
  textSearchWorkouts,
  textSearchWorkoutPrograms,
  textSearchCreatorPublicProfiles,
} from './textSearch'

import {
  checkUniqueDisplayName,
  authedUser,
  userPublicProfileByUserId,
  userPublicProfiles,
  updateUser,
  userWorkoutTags,
  createWorkoutTag,
} from './user'

import {
  gymProfiles,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
} from './gymProfile'

import {
  publicWorkouts,
  userWorkouts,
  workoutById,
  createWorkout,
  updateWorkout,
  softDeleteWorkoutById,
  duplicateWorkoutById,
} from './workout/workout'

import {
  createWorkoutSection,
  updateWorkoutSection,
  deleteWorkoutSectionById,
  reorderWorkoutSections,
} from './workout/workoutSection'

import {
  createWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSetById,
  duplicateWorkoutSetById,
  createWorkoutSetIntervalBuyIn,
  updateWorkoutSetIntervalBuyIn,
  deleteWorkoutSetIntervalBuyInById,
  createWorkoutSetGenerator,
  updateWorkoutSetGenerator,
  deleteWorkoutSetGeneratorById,
  reorderWorkoutSets,
} from './workout/workoutSet'

import {
  createWorkoutMove,
  updateWorkoutMove,
  duplicateWorkoutMoveById,
  deleteWorkoutMoveById,
  reorderWorkoutMoves,
} from './workout/workoutMove'

import {
  publicWorkoutPrograms,
  userWorkoutPrograms,
  workoutProgramById,
  createWorkoutProgram,
  updateWorkoutProgram,
  softDeleteWorkoutProgramById,
  createWorkoutProgramWorkout,
  updateWorkoutProgramWorkout,
  deleteWorkoutProgramWorkoutById,
  userWorkoutProgramEnrolments,
  createWorkoutProgramEnrolment,
  deleteWorkoutProgramEnrolmentById,
  createWorkoutProgramReview,
  updateWorkoutProgramReview,
  deleteWorkoutProgramReviewById,
} from './workoutProgram'

import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const resolvers: Resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description:
      'DateTime which assumes UTC is being sent to and from the DB as ms since epoch.',
    parseValue(value: number) {
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
    validateToken: () => true, // Empty Resolver - call it and it will throw auth error if token is not valid / expired or if an associated user does not exist in the database.
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
    //// Logged Workouts ////
    loggedWorkoutById,
    userLoggedWorkouts,
    //// Move ////
    standardMoves,
    userCustomMoves,
    //// Scheduled Workouts ////
    userScheduledWorkouts,
    //// Text Search ////
    textSearchWorkouts,
    textSearchWorkoutPrograms,
    textSearchCreatorPublicProfiles,
    //// User ////
    checkUniqueDisplayName,
    authedUser,
    gymProfiles,
    userPublicProfileByUserId,
    userPublicProfiles,
    userWorkoutTags,
    //// Workouts ////
    publicWorkouts,
    userWorkouts,
    workoutById,
    //// WorkoutPrograms ////
    publicWorkoutPrograms,
    userWorkoutPrograms,
    workoutProgramById,
    userWorkoutProgramEnrolments,
  },
  Mutation: {
    ///////////////////
    //// Equipment ////
    ///////////////////
    createEquipment,
    updateEquipment,
    //////////////////////////
    //// Gym Profile ////
    //////////////////////////
    createGymProfile,
    updateGymProfile,
    deleteGymProfileById,
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
    ///////////////////////
    //// LoggedWorkout ////
    ///////////////////////
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
    createScheduledWorkout,
    updateScheduledWorkout,
    deleteScheduledWorkoutById,
    //////////////
    //// User ////
    //////////////
    updateUser,
    createWorkoutTag,
    /////////////////
    //// Workout ////
    /////////////////
    createWorkout,
    updateWorkout,
    duplicateWorkoutById,
    softDeleteWorkoutById,
    //// Workout Section ////
    createWorkoutSection,
    updateWorkoutSection,
    deleteWorkoutSectionById,
    reorderWorkoutSections,
    //// Workout Set ////
    createWorkoutSet,
    updateWorkoutSet,
    duplicateWorkoutSetById,
    deleteWorkoutSetById,
    reorderWorkoutSets,
    createWorkoutSetIntervalBuyIn,
    updateWorkoutSetIntervalBuyIn,
    deleteWorkoutSetIntervalBuyInById,
    createWorkoutSetGenerator,
    updateWorkoutSetGenerator,
    deleteWorkoutSetGeneratorById,
    //// Workout Move ////
    createWorkoutMove,
    updateWorkoutMove,
    duplicateWorkoutMoveById,
    deleteWorkoutMoveById,
    reorderWorkoutMoves,
    /////////////////////////
    //// Workout Program ////
    /////////////////////////
    createWorkoutProgram,
    updateWorkoutProgram,
    softDeleteWorkoutProgramById,
    createWorkoutProgramWorkout,
    updateWorkoutProgramWorkout,
    deleteWorkoutProgramWorkoutById,
    createWorkoutProgramEnrolment,
    deleteWorkoutProgramEnrolmentById,
    createWorkoutProgramReview,
    updateWorkoutProgramReview,
    deleteWorkoutProgramReviewById,
  },
}

export default resolvers

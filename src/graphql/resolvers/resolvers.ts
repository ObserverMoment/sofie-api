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
  updateWorkout,
  softDeleteWorkoutById,
  makeCopyWorkoutById,
} from './workout/workout'

import {
  createWorkoutSection,
  updateWorkoutSection,
  softDeleteWorkoutSectionById,
  reorderWorkoutSections,
} from './workout/workoutSection'

import {
  createWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSetById,
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
  deleteWorkoutMoveById,
  reorderWorkoutMoves,
} from './workout/workoutMove'

import {
  officialWorkoutPrograms,
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
    userPublicProfileByUserId,
    userPublicProfiles,
    //// Workouts ////
    officialWorkouts,
    publicWorkouts,
    userWorkouts,
    workoutById,
    //// WorkoutPrograms ////
    officialWorkoutPrograms,
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
    /////////////////
    //// Workout ////
    /////////////////
    createWorkout,
    updateWorkout,
    softDeleteWorkoutById,
    // Note: Media should not be copied
    makeCopyWorkoutById,
    createWorkoutSection,
    updateWorkoutSection,
    softDeleteWorkoutSectionById,
    reorderWorkoutSections,
    createWorkoutSet,
    updateWorkoutSet,
    deleteWorkoutSetById,
    reorderWorkoutSets,
    createWorkoutSetIntervalBuyIn,
    updateWorkoutSetIntervalBuyIn,
    deleteWorkoutSetIntervalBuyInById,
    createWorkoutSetGenerator,
    updateWorkoutSetGenerator,
    deleteWorkoutSetGeneratorById,
    createWorkoutMove,
    updateWorkoutMove,
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

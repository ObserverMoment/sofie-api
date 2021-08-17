import {
  ClubInviteTokenData,
  InviteTokenError,
  Resolvers,
} from '../../generated/graphql'

import {
  bodyTransformationPhotos,
  createBodyTransformationPhotos,
  updateBodyTransformationPhoto,
  deleteBodyTransformationPhotosById,
} from './bodyTransformation'

import {
  userClubs,
  clubById,
  createClub,
  updateClub,
  deleteClubById,
  createClubInviteToken,
  updateClubInviteToken,
  deleteClubInviteTokenById,
} from './club'

import {
  discoverFeatured,
  discoverWorkoutCategories,
  discoverWorkoutPlanCategories,
} from './discover'

import {
  gymProfiles,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
} from './gymProfile'

import {
  userLoggedWorkouts,
  loggedWorkoutById,
  createLoggedWorkout,
  updateLoggedWorkout,
  deleteLoggedWorkoutById,
} from './loggedWorkout/loggedWorkout'

import {
  createLoggedWorkoutSection,
  updateLoggedWorkoutSection,
  deleteLoggedWorkoutSectionById,
  reorderLoggedWorkoutSections,
} from './loggedWorkout/loggedWorkoutSection'

import {
  createLoggedWorkoutSet,
  updateLoggedWorkoutSet,
  deleteLoggedWorkoutSetById,
  reorderLoggedWorkoutSets,
} from './loggedWorkout/loggedWorkoutSet'

import {
  createLoggedWorkoutMove,
  updateLoggedWorkoutMove,
  deleteLoggedWorkoutMoveById,
  reorderLoggedWorkoutMoves,
} from './loggedWorkout/loggedWorkoutMove'

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
  textSearchWorkoutNames,
  textSearchWorkoutPlans,
  textSearchWorkoutPlanNames,
  textSearchUserPublicProfiles,
  textSearchUserPublicNames,
} from './textSearch'

import { timelinePostsData } from './timelineFeed'

import {
  checkUniqueDisplayName,
  authedUser,
  userAvatars,
  userAvatarById,
  userPublicProfileById,
  userPublicProfiles,
  updateUser,
  userWorkoutTags,
  createWorkoutTag,
  updateWorkoutTag,
  deleteWorkoutTagById,
} from './user'

import {
  userBenchmarks,
  userBenchmarkById,
  userBenchmarkTags,
  createUserBenchmark,
  updateUserBenchmark,
  deleteUserBenchmarkById,
  createUserBenchmarkEntry,
  updateUserBenchmarkEntry,
  deleteUserBenchmarkEntryById,
  createUserBenchmarkTag,
  updateUserBenchmarkTag,
  deleteUserBenchmarkTagById,
} from './userBenchmark'

import {
  userCollections,
  userCollectionById,
  createCollection,
  updateCollection,
  deleteCollectionById,
  addWorkoutToCollection,
  removeWorkoutFromCollection,
  addWorkoutPlanToCollection,
  removeWorkoutPlanFromCollection,
} from './collection'

import { checkClubInviteToken } from './invites'

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
  publicWorkoutPlans,
  userWorkoutPlans,
  workoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  softDeleteWorkoutPlanById,
  createWorkoutPlanDayWithWorkout,
  updateWorkoutPlanDay,
  moveWorkoutPlanDayToAnotherDay,
  copyWorkoutPlanDayToAnotherDay,
  deleteWorkoutPlanDaysById,
  createWorkoutPlanDayWorkout,
  updateWorkoutPlanDayWorkout,
  deleteWorkoutPlanDayWorkoutById,
  reorderWorkoutPlanDayWorkouts,
  userWorkoutPlanEnrolments,
  userWorkoutPlanEnrolmentById,
  createWorkoutPlanEnrolment,
  updateWorkoutPlanEnrolment,
  deleteWorkoutPlanEnrolmentById,
  createWorkoutPlanReview,
  updateWorkoutPlanReview,
  deleteWorkoutPlanReviewById,
} from './workoutPlan'

import { GraphQLScalarType } from 'graphql'
import GraphQLJSON from 'graphql-type-json'
import { Kind } from 'graphql/language'

const resolvers: Resolvers = {
  JSON: GraphQLJSON,
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
  // Resolve Types or Unions
  // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
  CheckClubInviteTokenResult: {
    __resolveType: (obj, context, info) => {
      if ((obj as ClubInviteTokenData).token) {
        return 'ClubInviteTokenData'
      }
      if ((obj as InviteTokenError).message) {
        return 'InviteTokenError'
      }
      return null // GraphQLError is thrown
    },
  },
  Query: {
    validateToken: () => true, // Empty Resolver - call it and it will throw auth error if token is not valid / expired or if an associated user does not exist in the database.
    //// Core Data ////
    bodyAreas,
    equipments,
    moveTypes,
    workoutGoals,
    workoutSectionTypes,
    ///// Clubs ////
    userClubs,
    clubById,
    ///// Discover ////
    discoverFeatured,
    discoverWorkoutCategories,
    discoverWorkoutPlanCategories,
    ///// Invites ////
    checkClubInviteToken,
    //// Progress Journal ////
    bodyTransformationPhotos,
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
    textSearchWorkoutNames,
    textSearchWorkoutPlans,
    textSearchWorkoutPlanNames,
    textSearchUserPublicProfiles,
    textSearchUserPublicNames,
    //// Timeline Feed ////
    timelinePostsData,
    //// User ////
    authedUser,
    checkUniqueDisplayName,
    gymProfiles,
    userPublicProfileById,
    userPublicProfiles,
    userWorkoutTags,
    //// User Avatars ////
    userAvatars,
    userAvatarById,
    /// User Benchmarks ////
    userBenchmarks,
    userBenchmarkById,
    userBenchmarkTags,
    /// User Collections ////
    userCollections,
    userCollectionById,
    //// Workouts ////
    publicWorkouts,
    userWorkouts,
    workoutById,
    //// WorkoutPlans ////
    publicWorkoutPlans,
    userWorkoutPlans,
    workoutPlanById,
    userWorkoutPlanEnrolments,
    userWorkoutPlanEnrolmentById,
  },
  Mutation: {
    ///////////////
    //// Club /////
    ///////////////
    createClub,
    updateClub,
    deleteClubById,
    createClubInviteToken,
    updateClubInviteToken,
    deleteClubInviteTokenById,
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
    createBodyTransformationPhotos,
    updateBodyTransformationPhoto,
    deleteBodyTransformationPhotosById,
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
    updateWorkoutTag,
    deleteWorkoutTagById,
    ////////////////////////
    //// User Benchmark ////
    ////////////////////////
    createUserBenchmark,
    updateUserBenchmark,
    deleteUserBenchmarkById,
    createUserBenchmarkEntry,
    updateUserBenchmarkEntry,
    deleteUserBenchmarkEntryById,
    createUserBenchmarkTag,
    updateUserBenchmarkTag,
    deleteUserBenchmarkTagById,
    ////////////////////////
    //// User Collection ////
    ////////////////////////
    createCollection,
    updateCollection,
    deleteCollectionById,
    addWorkoutToCollection,
    removeWorkoutFromCollection,
    addWorkoutPlanToCollection,
    removeWorkoutPlanFromCollection,
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
    //////////////////////
    //// Workout Plan ////
    //////////////////////
    createWorkoutPlan,
    updateWorkoutPlan,
    softDeleteWorkoutPlanById,
    createWorkoutPlanDayWithWorkout,
    updateWorkoutPlanDay,
    moveWorkoutPlanDayToAnotherDay,
    copyWorkoutPlanDayToAnotherDay,
    deleteWorkoutPlanDaysById,
    createWorkoutPlanDayWorkout,
    updateWorkoutPlanDayWorkout,
    deleteWorkoutPlanDayWorkoutById,
    reorderWorkoutPlanDayWorkouts,
    //// User Specific ////
    createWorkoutPlanEnrolment,
    updateWorkoutPlanEnrolment,
    deleteWorkoutPlanEnrolmentById,
    createWorkoutPlanReview,
    updateWorkoutPlanReview,
    deleteWorkoutPlanReviewById,
  },
}

export default resolvers

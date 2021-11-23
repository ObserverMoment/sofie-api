import {
  ClubInviteTokenData,
  InviteTokenError,
  Resolvers,
} from '../../generated/graphql'

import {
  userArchivedWorkouts,
  userArchivedWorkoutPlans,
  userArchivedCustomMoves,
  archiveWorkoutById,
  unarchiveWorkoutById,
  archiveWorkoutPlanById,
  unarchiveWorkoutPlanById,
  archiveCustomMoveById,
  unarchiveCustomMoveById,
} from './archive'

import {
  bodyTrackingEntries,
  createBodyTrackingEntry,
  updateBodyTrackingEntry,
  deleteBodyTrackingEntryById,
} from './bodyTracking'

import {
  userClubs,
  publicClubs,
  clubSummariesById,
  clubById,
  createClub,
  updateClub,
  deleteClubById,
} from './club/club'

import {
  userJoinPublicClub,
  createClubInviteToken,
  updateClubInviteToken,
  deleteClubInviteTokenById,
  addUserToClubViaInviteToken,
  giveMemberAdminStatus,
  removeMemberAdminStatus,
  removeUserFromClub,
} from './club/clubMembers'

import {
  addWorkoutToClub,
  removeWorkoutFromClub,
  addWorkoutPlanToClub,
  removeWorkoutPlanFromClub,
} from './club/clubContent'

import {
  gymProfiles,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
} from './gymProfile'

import {
  lifetimeLogStatsSummary,
  userLoggedWorkouts,
  loggedWorkoutById,
  createLoggedWorkout,
  updateLoggedWorkout,
  deleteLoggedWorkoutById,
  updateLoggedWorkoutSection,
} from './loggedWorkout'

import { standardMoves, userCustomMoves, createMove, updateMove } from './move'

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

import {
  createClubTimelinePost,
  deleteClubTimelinePost,
  timelinePostsData,
  clubMembersFeedPosts,
} from './timelineFeed'

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
  duplicateWorkoutById,
} from './workout/workout'

import {
  createWorkoutSection,
  updateWorkoutSection,
  deleteWorkoutSectionById,
  reorderWorkoutSections,
} from './workout/workoutSection'

import {
  createWorkoutSetWithWorkoutMoves,
  createWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSetById,
  duplicateWorkoutSetById,
  reorderWorkoutSets,
} from './workout/workoutSet'

import {
  createWorkoutMove,
  updateWorkoutMove,
  updateWorkoutMoves,
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
  createWorkoutPlanDayWithWorkout,
  updateWorkoutPlanDay,
  moveWorkoutPlanDayToAnotherDay,
  copyWorkoutPlanDayToAnotherDay,
  deleteWorkoutPlanDaysById,
  createWorkoutPlanDayWorkout,
  updateWorkoutPlanDayWorkout,
  deleteWorkoutPlanDayWorkoutById,
  reorderWorkoutPlanDayWorkouts,
  enrolledWorkoutPlans,
  workoutPlanByEnrolmentId,
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
    publicClubs,
    clubSummariesById,
    userClubs,
    clubById,
    clubMembersFeedPosts,
    ///// Invites ////
    checkClubInviteToken,
    //// Progress Body Tracking ////
    bodyTrackingEntries,
    //// Progress Journal ////
    userProgressJournals,
    progressJournalGoalTags,
    progressJournalById,
    //// Logged Workouts ////
    lifetimeLogStatsSummary,
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
    // The data associated with Activities and required to display posts //
    timelinePostsData,
    //// User ////
    authedUser,
    checkUniqueDisplayName,
    gymProfiles,
    //// User Archive ////
    userArchivedWorkouts,
    userArchivedWorkoutPlans,
    userArchivedCustomMoves,
    //// User Public Profiles ////
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
    enrolledWorkoutPlans,
    workoutPlanByEnrolmentId,
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
    ///////////////////////
    //// Club Members /////
    ///////////////////////
    userJoinPublicClub,
    giveMemberAdminStatus,
    removeMemberAdminStatus,
    addUserToClubViaInviteToken,
    removeUserFromClub,
    ///////////////////////
    //// Club Content /////
    ///////////////////////
    addWorkoutToClub,
    removeWorkoutFromClub,
    addWorkoutPlanToClub,
    removeWorkoutPlanFromClub,
    ///////////////////////
    //// Club Timeline ////
    ///////////////////////
    createClubTimelinePost,
    deleteClubTimelinePost,
    ///////////////////
    //// Equipment ////
    ///////////////////
    createEquipment,
    updateEquipment,
    //////////////////////////
    //// Gym Profile /////////
    //////////////////////////
    createGymProfile,
    updateGymProfile,
    deleteGymProfileById,
    ////////////////////////////////
    //// Progress Body Tracking ////
    ///////////////////////////////
    createBodyTrackingEntry,
    updateBodyTrackingEntry,
    deleteBodyTrackingEntryById,
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
    updateLoggedWorkoutSection,
    //////////////
    //// Move ////
    //////////////
    createMove,
    updateMove,
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
    //// User Archive //////
    ////////////////////////
    archiveWorkoutById,
    unarchiveWorkoutById,
    archiveWorkoutPlanById,
    unarchiveWorkoutPlanById,
    archiveCustomMoveById,
    unarchiveCustomMoveById,
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
    //// Workout Section ////
    createWorkoutSection,
    updateWorkoutSection,
    deleteWorkoutSectionById,
    reorderWorkoutSections,
    //// Workout Set ////
    createWorkoutSetWithWorkoutMoves,
    createWorkoutSet,
    updateWorkoutSet,
    duplicateWorkoutSetById,
    deleteWorkoutSetById,
    reorderWorkoutSets,
    //// Workout Move ////
    createWorkoutMove,
    updateWorkoutMove,
    updateWorkoutMoves,
    duplicateWorkoutMoveById,
    deleteWorkoutMoveById,
    reorderWorkoutMoves,
    //////////////////////
    //// Workout Plan ////
    //////////////////////
    createWorkoutPlan,
    updateWorkoutPlan,
    createWorkoutPlanDayWithWorkout,
    updateWorkoutPlanDay,
    moveWorkoutPlanDayToAnotherDay,
    copyWorkoutPlanDayToAnotherDay,
    deleteWorkoutPlanDaysById,
    createWorkoutPlanDayWorkout,
    updateWorkoutPlanDayWorkout,
    deleteWorkoutPlanDayWorkoutById,
    reorderWorkoutPlanDayWorkouts,
    //// Workout Plan User Specific ////
    createWorkoutPlanEnrolment,
    updateWorkoutPlanEnrolment,
    deleteWorkoutPlanEnrolmentById,
    createWorkoutPlanReview,
    updateWorkoutPlanReview,
    deleteWorkoutPlanReviewById,
  },
}

export default resolvers

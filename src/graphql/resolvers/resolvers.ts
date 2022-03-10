import {
  ClubInviteTokenData,
  InviteTokenError,
  Resolvers,
} from '../../generated/graphql'

import {
  announcementUpdates,
  markAnnouncementUpdateAsSeen,
} from './announcementUpdate'

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
  checkUniqueClubName,
  userClubs,
  publicClubs,
  clubSummaries,
  clubChatSummary,
  clubSummary,
  createClub,
  updateClubSummary,
  deleteClub,
} from './club/club'

import { adminPublicClubs, updateClubMetaDataAdmin } from './club/metaDataAdmin'

import {
  checkUserClubMemberStatus,
  clubMembers,
  clubMemberNotes,
  createClubMemberNote,
  updateClubMemberNote,
  clubInviteTokens,
  userJoinPublicClub,
  createClubInviteToken,
  updateClubInviteToken,
  deleteClubInviteToken,
  addUserToClubViaInviteToken,
  giveMemberAdminStatus,
  removeMemberAdminStatus,
  removeUserFromClub,
} from './club/clubMembers'

import {
  clubWorkouts,
  clubWorkoutPlans,
  addWorkoutToClub,
  removeWorkoutFromClub,
  addWorkoutPlanToClub,
  removeWorkoutPlanFromClub,
} from './club/clubContent'

import {
  coreData,
  createEquipment, // Admin only
  updateEquipment, // Admin only
} from './coreData'

import {
  createFitnessBenchmark,
  updateFitnessBenchmark,
  deleteFitnessBenchmark,
  createFitnessBenchmarkWorkout,
  updateFitnessBenchmarkWorkout,
  deleteFitnessBenchmarkWorkout,
} from './fitnessBenchmark'

import {
  gymProfiles,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
} from './gymProfile'

import {
  lifetimeLogStatsSummary,
  logCountByWorkout,
  userLoggedWorkouts,
  loggedWorkoutById,
  createLoggedWorkout,
  updateLoggedWorkout,
  deleteLoggedWorkoutById,
  updateLoggedWorkoutSection,
  updateLoggedWorkoutSet,
  updateLoggedWorkoutMove,
  deleteLoggedWorkoutMove,
} from './loggedWorkout'

import { customMoves, createMove, updateMove } from './move'

import { welcomeTodoItems, markWelcomeTodoItemAsSeen } from './welcomeTodoItems'

import {
  userScheduledWorkouts,
  createScheduledWorkout,
  updateScheduledWorkout,
  deleteScheduledWorkoutById,
} from './scheduledWorkout'

import {
  textSearchWorkouts,
  textSearchWorkoutNames,
  textSearchWorkoutPlans,
  textSearchWorkoutPlanNames,
  textSearchUserProfiles,
  textSearchUserNames,
} from './textSearch'

import {
  createClubMembersFeedPost,
  deleteClubMembersFeedPost,
  clubMembersFeedPosts,
} from './timelineFeed'

import {
  checkUniqueDisplayName,
  userRecentlyViewedObjects,
  userAvatars,
  userAvatarById,
  userProfile,
  userProfiles,
  updateUserProfile,
  userWorkoutTags,
  createWorkoutTag,
  updateWorkoutTag,
  deleteWorkoutTagById,
} from './user'

import {
  userDayLogMoods,
  userMeditationLogs,
  userEatWellLogs,
  userSleepWellLogs,
  createUserDayLogMood,
  deleteUserDayLogMood,
  createUserMeditationLog,
  updateUserMeditationLog,
  createUserEatWellLog,
  updateUserEatWellLog,
  createUserSleepWellLog,
  updateUserSleepWellLog,
} from './userDayLogTracking'

import {
  userGoals,
  createUserGoal,
  updateUserGoal,
  deleteUserGoal,
} from './userProgressTracking'

import {
  createSkill,
  updateSkill,
  deleteSkillById,
  addDocumentToSkill,
  removeDocumentFromSkill,
} from './skillsAndCertifications'

import {
  userExerciseLoadTrackers,
  createUserExerciseLoadTracker,
  deleteUserExerciseLoadTracker,
} from './UserExerciseLoadTracker'

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
  userPublicWorkouts,
  workoutById,
  createWorkout,
  updateWorkout,
  duplicateWorkoutById,
} from './workout/workout'

import {
  adminPublicWorkouts,
  updateWorkoutMetaDataAdmin,
} from './workout/metaDataAdmin'

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
  userPublicWorkoutPlans,
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
  createWorkoutPlanReview,
  updateWorkoutPlanReview,
  deleteWorkoutPlanReviewById,
} from './workoutPlan/workoutPlan'

import {
  adminPublicWorkoutPlans,
  updateWorkoutPlanMetaDataAdmin,
} from './workoutPlan/metaDataAdmin'

import {
  workoutPlanEnrolments,
  workoutPlanEnrolmentById,
  createWorkoutPlanEnrolment,
  deleteWorkoutPlanEnrolmentById,
  createScheduleForPlanEnrolment,
  clearScheduleForPlanEnrolment,
  createCompletedWorkoutPlanDayWorkout,
  deleteCompletedWorkoutPlanDayWorkout,
  clearWorkoutPlanEnrolmentProgress,
} from './workoutPlan/workoutPlanEnrolment'

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
    //// ADMIN ONLY QUERIES ////
    adminPublicWorkouts,
    adminPublicWorkoutPlans,
    adminPublicClubs,
    //// END OF ADMIN ONLY QUERIES ////
    //// Core Data ////
    announcementUpdates,
    welcomeTodoItems,
    coreData,
    ///// Clubs ////
    checkUniqueClubName,
    checkUserClubMemberStatus,
    publicClubs,
    clubSummaries,
    userClubs,
    clubChatSummary,
    clubSummary,
    clubInviteTokens,
    clubMembers,
    clubWorkouts,
    clubWorkoutPlans,
    clubMembersFeedPosts,
    ///// Notes ////
    clubMemberNotes,
    ///// Invites ////
    checkClubInviteToken,
    //// Progress Body Tracking ////
    bodyTrackingEntries,
    //// Progress Goal Tracking ////
    userGoals,
    //// User Day Log Tracking ////
    userDayLogMoods,
    userMeditationLogs,
    userEatWellLogs,
    userSleepWellLogs,
    //// User Recently Viewed Items ////
    userRecentlyViewedObjects,
    //// Logged Workouts ////
    lifetimeLogStatsSummary,
    logCountByWorkout,
    loggedWorkoutById,
    userLoggedWorkouts,
    //// User Custom Move ////
    customMoves,
    //// Scheduled Workouts ////
    userScheduledWorkouts,
    //// Text Search ////
    textSearchWorkouts,
    textSearchWorkoutNames,
    textSearchWorkoutPlans,
    textSearchWorkoutPlanNames,
    textSearchUserProfiles,
    textSearchUserNames,
    //// User ////
    checkUniqueDisplayName,
    gymProfiles,
    //// User Archive ////
    userArchivedWorkouts,
    userArchivedWorkoutPlans,
    userArchivedCustomMoves,
    //// User Public Profiles ////
    userProfile,
    userProfiles,
    userWorkoutTags,
    //// User Avatars ////
    userAvatars,
    userAvatarById,
    /// User Collections ////
    userCollections,
    userCollectionById,
    /// User Exercise and Scored Workout Trackers ///
    userExerciseLoadTrackers,
    //// Workouts ////
    publicWorkouts,
    userWorkouts, // Authed user.
    userPublicWorkouts, // Public users (profiles)
    workoutById,
    //// WorkoutPlans ////
    publicWorkoutPlans,
    userWorkoutPlans, // Authed user.
    userPublicWorkoutPlans, // Public users (profiles)
    workoutPlanById,
    workoutPlanEnrolments,
    workoutPlanEnrolmentById,
  },
  Mutation: {
    //// ADMIN ONLY MUTATIONS ////
    updateWorkoutMetaDataAdmin,
    updateWorkoutPlanMetaDataAdmin,
    updateClubMetaDataAdmin,
    //// END OF ADMIN ONLY MUTATIONS ////
    ////////////////////
    //// Core Data /////
    ////////////////////
    markAnnouncementUpdateAsSeen,
    markWelcomeTodoItemAsSeen,
    ///////////////
    //// Club /////
    ///////////////
    createClub,
    updateClubSummary,
    deleteClub,
    createClubInviteToken,
    updateClubInviteToken,
    deleteClubInviteToken,
    ///////////////////////
    //// Club Members /////
    ///////////////////////
    userJoinPublicClub,
    addUserToClubViaInviteToken,
    giveMemberAdminStatus,
    removeMemberAdminStatus,
    removeUserFromClub,
    ///// Notes ///////////
    createClubMemberNote,
    updateClubMemberNote,
    ///////////////////////
    //// Club Content /////
    ///////////////////////
    addWorkoutToClub,
    removeWorkoutFromClub,
    addWorkoutPlanToClub,
    removeWorkoutPlanFromClub,
    ///////////////////
    //// Club Feed ////
    ///////////////////
    /// Interacts with Stream.io.
    createClubMembersFeedPost,
    deleteClubMembersFeedPost,
    ///////////////////
    //// Equipment ////
    ///////////////////
    createEquipment,
    updateEquipment,
    //////////////////////////////////////////////
    //// Fitness Benchmarks and Workouts /////////
    //////////////////////////////////////////////
    createFitnessBenchmark,
    updateFitnessBenchmark,
    deleteFitnessBenchmark,
    createFitnessBenchmarkWorkout,
    updateFitnessBenchmarkWorkout,
    deleteFitnessBenchmarkWorkout,
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
    ///////////////////////////////
    //// User Day Log Tracking ////
    ///////////////////////////////
    createUserGoal,
    updateUserGoal,
    deleteUserGoal,
    createUserDayLogMood,
    deleteUserDayLogMood,
    createUserMeditationLog,
    updateUserMeditationLog,
    createUserEatWellLog,
    updateUserEatWellLog,
    createUserSleepWellLog,
    updateUserSleepWellLog,
    ///////////////////////
    //// LoggedWorkout ////
    ///////////////////////
    createLoggedWorkout,
    updateLoggedWorkout,
    deleteLoggedWorkoutById,
    updateLoggedWorkoutSection,
    updateLoggedWorkoutSet,
    updateLoggedWorkoutMove,
    deleteLoggedWorkoutMove,
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
    updateUserProfile,
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
    ////////////////////////////////
    //// User Exercise Trackers ////
    ////////////////////////////////
    createUserExerciseLoadTracker,
    deleteUserExerciseLoadTracker,
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
    /////////////////////
    //// User Skills ////
    /////////////////////
    createSkill,
    updateSkill,
    deleteSkillById,
    addDocumentToSkill,
    removeDocumentFromSkill,
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
    createWorkoutPlanReview,
    updateWorkoutPlanReview,
    deleteWorkoutPlanReviewById,
    //// Workout Plan Enrolment User Specific ////
    createWorkoutPlanEnrolment,
    deleteWorkoutPlanEnrolmentById,
    createScheduleForPlanEnrolment,
    clearScheduleForPlanEnrolment,
    createCompletedWorkoutPlanDayWorkout,
    deleteCompletedWorkoutPlanDayWorkout,
    clearWorkoutPlanEnrolmentProgress,
  },
}

export default resolvers

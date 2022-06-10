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
  clubSummary,
  createClub,
  updateClubSummary,
  deleteClub,
} from './club/club'

import {
  adminPublicClubCounts,
  adminPublicClubSummaries,
  adminPublicClubById,
  updateClubMetaDataAdmin,
} from './club/metaDataAdmin'

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
  adminStandardFitnessBenchmarks,
  adminStandardFitnessBenchmarkWorkouts,
  userFitnessBenchmarks,
  createFitnessBenchmark,
  updateFitnessBenchmark,
  deleteFitnessBenchmark,
  createFitnessBenchmarkScore,
  updateFitnessBenchmarkScore,
  deleteFitnessBenchmarkScore,
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

import { moveData, createMove, updateMove } from './move'

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
} from './timelineFeed'

import {
  adminAllUsers,
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
  createAmrapSession,
  updateAmrapSession,
  duplicateAmrapSession,
  deleteAmrapSession,
  createAmrapSection,
  updateAmrapSection,
  duplicateAmrapSection,
  deleteAmrapSection,
  createAmrapMove,
  updateAmrapMove,
  duplicateAmrapMove,
  deleteAmrapMove,
} from './workoutSession/amrapSession'

import {
  createForTimeSession,
  updateForTimeSession,
  duplicateForTimeSession,
  deleteForTimeSession,
  createForTimeSection,
  updateForTimeSection,
  duplicateForTimeSection,
  deleteForTimeSection,
  createForTimeMove,
  updateForTimeMove,
  duplicateForTimeMove,
  deleteForTimeMove,
} from './workoutSession/forTimeSession'

import {
  createIntervalSession,
  updateIntervalSession,
  duplicateIntervalSession,
  deleteIntervalSession,
  createIntervalExercise,
  updateIntervalExercise,
  duplicateIntervalExercise,
  deleteIntervalExercise,
  createIntervalSet,
  updateIntervalSet,
  duplicateIntervalSet,
  deleteIntervalSet,
} from './workoutSession/intervalSession'

import {
  createMobilitySession,
  updateMobilitySession,
  duplicateMobilitySession,
  deleteMobilitySession,
} from './workoutSession/mobilitySession'

import {
  userResistanceSessions,
  userSavedResistanceSessions,
  resistanceSessionById,
  createResistanceSession,
  updateResistanceSession,
  duplicateResistanceSession,
  deleteResistanceSession,
  createResistanceExercise,
  updateResistanceExercise,
  duplicateResistanceExercise,
  deleteResistanceExercise,
  reorderResistanceExercise,
  createResistanceSet,
  updateResistanceSet,
  duplicateResistanceSet,
  deleteResistanceSet,
  reorderResistanceSet,
} from './workoutSession/resistanceSession'

import {
  createCardioSession,
  updateCardioSession,
  duplicateCardioSession,
  deleteCardioSession,
  createCardioExercise,
  updateCardioExercise,
  duplicateCardioExercise,
  deleteCardioExercise,
} from './workoutSession/cardioSession'

/// DEPRECATED
import {
  publicWorkouts,
  userWorkouts,
  userPublicWorkouts,
  workoutById,
  createWorkout,
  updateWorkout,
  duplicateWorkoutById,
} from './workout/workout'

/// DEPRECATED
import { updateWorkoutMetaDataAdmin } from './workout/metaDataAdmin'

/// DEPRECATED
import {
  createWorkoutSection,
  updateWorkoutSection,
  deleteWorkoutSectionById,
  reorderWorkoutSections,
} from './workout/workoutSection'

/// DEPRECATED
import {
  createWorkoutSetWithWorkoutMoves,
  createWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSetById,
  duplicateWorkoutSetById,
  reorderWorkoutSets,
} from './workout/workoutSet'

/// DEPRECATED
import {
  createWorkoutMove,
  updateWorkoutMove,
  updateWorkoutMoves,
  duplicateWorkoutMoveById,
  deleteWorkoutMoveById,
  reorderWorkoutMoves,
} from './workout/workoutMove'

import {
  userTrainingPlans,
  trainingPlanById,
} from './trainingPlan/trainingPlan'

/// DEPRECATED
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

import { updateWorkoutPlanMetaDataAdmin } from './workoutPlan/metaDataAdmin'

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
    // Receiving from the client
    parseValue(value) {
      if (typeof value === 'number') {
        return new Date(value)
      } else {
        return null
      }
    },
    // Sending to the client
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime()
      } else {
        return null
      }
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)) // ast value is always in string format
      } else {
        return null
      }
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
    //// Public Content ////
    adminPublicClubCounts,
    adminPublicClubSummaries,
    adminPublicClubById,
    //// User Data Analysis ////
    adminAllUsers,
    //// Benchmarks + All Scores ////
    adminStandardFitnessBenchmarks,
    adminStandardFitnessBenchmarkWorkouts,
    //// END OF ADMIN ONLY QUERIES ////
    //// Core Data ////
    announcementUpdates,
    welcomeTodoItems,
    coreData,
    moveData,
    ///// Clubs ////
    checkUniqueClubName,
    checkUserClubMemberStatus,
    publicClubs,
    clubSummaries,
    userClubs,
    clubSummary,
    clubInviteTokens,
    clubMembers,
    clubWorkouts,
    clubWorkoutPlans,
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
    //// Standard + Custom Benchmarks + User Scores ////
    userFitnessBenchmarks,
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
    //// WorkoutSessions ////
    //// ResistanceSessions ////
    userResistanceSessions,
    userSavedResistanceSessions,
    resistanceSessionById,
    //// Workouts - DEPRECATED////
    publicWorkouts,
    userWorkouts, // Authed user.
    userPublicWorkouts, // Public users (profiles)
    workoutById,
    //// TrainingPlans ////
    userTrainingPlans,
    trainingPlanById,
    //// WorkoutPlans - DEPRECATED ////
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
    createFitnessBenchmarkScore,
    updateFitnessBenchmarkScore,
    deleteFitnessBenchmarkScore,
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
    ////////////////////////
    //// WorkoutSession ////
    ///////////////////////
    // createWorkoutSession,
    // updateWorkoutSession,
    // duplicateWorkoutSession,
    // deleteWorkoutSession,
    //// AmrapSession ////
    createAmrapSession,
    updateAmrapSession,
    duplicateAmrapSession,
    deleteAmrapSession,
    createAmrapSection,
    updateAmrapSection,
    duplicateAmrapSection,
    deleteAmrapSection,
    createAmrapMove,
    updateAmrapMove,
    duplicateAmrapMove,
    deleteAmrapMove,
    //// ForTimeSession ////
    createForTimeSession,
    updateForTimeSession,
    duplicateForTimeSession,
    deleteForTimeSession,
    createForTimeSection,
    updateForTimeSection,
    duplicateForTimeSection,
    deleteForTimeSection,
    createForTimeMove,
    updateForTimeMove,
    duplicateForTimeMove,
    deleteForTimeMove,
    //// IntervalSession ////
    createIntervalSession,
    updateIntervalSession,
    duplicateIntervalSession,
    deleteIntervalSession,
    createIntervalExercise,
    updateIntervalExercise,
    duplicateIntervalExercise,
    deleteIntervalExercise,
    createIntervalSet,
    updateIntervalSet,
    duplicateIntervalSet,
    deleteIntervalSet,
    //// MobilitySession ////
    createMobilitySession,
    updateMobilitySession,
    duplicateMobilitySession,
    deleteMobilitySession,
    //// CardioSession ////
    createCardioSession,
    updateCardioSession,
    duplicateCardioSession,
    deleteCardioSession,
    createCardioExercise,
    updateCardioExercise,
    duplicateCardioExercise,
    deleteCardioExercise,
    //// ResistanceSession ////
    createResistanceSession,
    updateResistanceSession,
    duplicateResistanceSession,
    deleteResistanceSession,
    createResistanceExercise,
    updateResistanceExercise,
    duplicateResistanceExercise,
    deleteResistanceExercise,
    reorderResistanceExercise,
    createResistanceSet,
    updateResistanceSet,
    duplicateResistanceSet,
    deleteResistanceSet,
    reorderResistanceSet,
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

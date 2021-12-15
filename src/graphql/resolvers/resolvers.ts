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
  checkUniqueClubName,
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
  logCountByWorkout,
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
  journalNotes,
  journalMoods,
  journalGoals,
  createJournalGoal,
  updateJournalGoal,
  deleteJournalGoalById,
  createJournalNote,
  updateJournalNote,
  deleteJournalNoteById,
  createJournalMood,
  updateJournalMood,
  deleteJournalMoodById,
} from './progressJournal'

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
  createClubTimelinePost,
  deleteClubTimelinePost,
  timelinePostsData,
  clubMembersFeedPosts,
} from './timelineFeed'

import {
  checkUniqueDisplayName,
  userAvatars,
  userAvatarById,
  userProfileById,
  userProfiles,
  updateUserProfile,
  userWorkoutTags,
  createWorkoutTag,
  updateWorkoutTag,
  deleteWorkoutTagById,
} from './user'

import {
  createSkill,
  updateSkill,
  deleteSkillById,
  addDocumentToSkill,
  removeDocumentFromSkill,
} from './skillsAndCertifications'

import {
  userBenchmarks,
  userBenchmarkById,
  createUserBenchmark,
  updateUserBenchmark,
  deleteUserBenchmarkById,
  createUserBenchmarkEntry,
  updateUserBenchmarkEntry,
  deleteUserBenchmarkEntryById,
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
  userPublicWorkouts,
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
    //// Core Data ////
    bodyAreas,
    equipments,
    moveTypes,
    workoutGoals,
    workoutSectionTypes,
    ///// Clubs ////
    checkUniqueClubName,
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
    journalNotes,
    journalMoods,
    journalGoals,
    //// Logged Workouts ////
    lifetimeLogStatsSummary,
    logCountByWorkout,
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
    textSearchUserProfiles,
    textSearchUserNames,
    //// Timeline Feed ////
    // The data associated with Activities and required to display posts //
    timelinePostsData,
    //// User ////
    checkUniqueDisplayName,
    gymProfiles,
    //// User Archive ////
    userArchivedWorkouts,
    userArchivedWorkoutPlans,
    userArchivedCustomMoves,
    //// User Public Profiles ////
    userProfileById,
    userProfiles,
    userWorkoutTags,
    //// User Avatars ////
    userAvatars,
    userAvatarById,
    /// User Benchmarks ////
    userBenchmarks,
    userBenchmarkById,
    /// User Collections ////
    userCollections,
    userCollectionById,
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
    createJournalGoal,
    updateJournalGoal,
    deleteJournalGoalById,
    createJournalNote,
    updateJournalNote,
    deleteJournalNoteById,
    createJournalMood,
    updateJournalMood,
    deleteJournalMoodById,
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
    ////////////////////////
    //// User Benchmark ////
    ////////////////////////
    createUserBenchmark,
    updateUserBenchmark,
    deleteUserBenchmarkById,
    createUserBenchmarkEntry,
    updateUserBenchmarkEntry,
    deleteUserBenchmarkEntryById,
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

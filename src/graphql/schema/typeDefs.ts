import { mergeTypeDefs } from '@graphql-tools/merge'
import announcementUpdate from './announcementUpdate'
import bodyTracking from './bodyTracking'
import club from './club/club'
import clubMembers from './club/clubMembers'
import clubWorkouts from './club/clubWorkouts'
import collection from './collection'
import coreData from './coreData'
import enums from './enums'
import filterInputs from './filterInputs'
import fitnessBenchmark from './fitnessBenchmark'
import gymProfile from './gymProfile'
import invites from './invites'
import loggedWorkout from './loggedWorkout'
import main from './main'
import move from './move'
import scheduledWorkout from './scheduledWorkout'
import skillsAndCertifications from './skillsAndCertifications'
import timelineFeed from './timelineFeed'
import user from './user'
import userDayLogTracking from './userDayLogTracking'
import userExerciseLoadTracker from './userExerciseLoadTracker'
import userGoalTracking from './userGoalTracking'
import welcomeTodoItem from './welcomeTodoItem'
import workout from './workout/workout'
import workoutMetaData from './workout/workoutMetaData'
import workoutMove from './workout/workoutMove'
import workoutPlan from './workoutPlan/workoutPlan'
import workoutPlanMetaData from './workoutPlan/workoutPlanMetaData'
import workoutPlanEnrolment from './workoutPlan/workoutPlanEnrolment'
import workoutSection from './workout/workoutSection'
import workoutSet from './workout/workoutSet'
// New models May 2022
import workoutSession from './workoutSession/workoutSession-deprecated'
import amrapWorkout from './workoutSession/amrapWorkout'
import cardioWorkout from './workoutSession/cardioWorkout'
import forTimeWorkout from './workoutSession/forTimeWorkout'
import intervalWorkout from './workoutSession/intervalWorkout'
import mobilityWorkout from './workoutSession/mobilityWorkout'
import resistanceWorkout from './workoutSession/resistanceWorkout'
import trainingPlan from './trainingPlan/trainingPlan'
import trainingPlanEnrolment from './trainingPlan/trainingPlanEnrolment'

const typeDefs = mergeTypeDefs([
  announcementUpdate,
  bodyTracking,
  club,
  clubMembers,
  clubWorkouts,
  collection,
  coreData,
  enums,
  filterInputs,
  fitnessBenchmark,
  gymProfile,
  invites,
  loggedWorkout,
  main,
  move,
  welcomeTodoItem,
  scheduledWorkout,
  skillsAndCertifications,
  timelineFeed,
  user,
  userDayLogTracking,
  userExerciseLoadTracker,
  userGoalTracking,
  workout,
  workoutMetaData,
  workoutMove,
  workoutPlan,
  workoutPlanMetaData,
  workoutPlanEnrolment,
  workoutSection,
  workoutSet,
  // New models May 2022
  workoutSession, // Deprecated.
  amrapWorkout,
  cardioWorkout,
  forTimeWorkout,
  intervalWorkout,
  mobilityWorkout,
  resistanceWorkout,
  trainingPlan,
  trainingPlanEnrolment,
])

export default typeDefs

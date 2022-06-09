import { mergeTypeDefs } from '@graphql-tools/merge'
import announcementUpdate from './announcementUpdate'
import bodyTracking from './bodyTracking'
import club from './club'
import collection from './collection'
import coreData from './coreData'
import enums from './enums'
import filterInputs from './filterInputs'
import fitnessBenchmark from './fitnessBenchmark'
import gymProfile from './gymProfile'
import invites from './invites'
import loggedWorkout from './loggedWorkout'
import main from './main'
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
import workoutSessions from './workoutSession/workoutSessions'
import amrapSession from './workoutSession/amrapSession'
import cardioSession from './workoutSession/cardioSession'
import forTimeSession from './workoutSession/forTimeSession'
import intervalSession from './workoutSession/intervalSession'
import mobilitySession from './workoutSession/mobilitySession'
import resistanceSession from './workoutSession/resistanceSession'
import trainingPlan from './trainingPlan/trainingPlan'
import trainingPlanEnrolment from './trainingPlan/trainingPlanEnrolment'

const typeDefs = mergeTypeDefs([
  announcementUpdate,
  bodyTracking,
  club,
  collection,
  coreData,
  enums,
  filterInputs,
  fitnessBenchmark,
  gymProfile,
  invites,
  loggedWorkout,
  main,
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
  workoutSessions,
  amrapSession,
  cardioSession,
  forTimeSession,
  intervalSession,
  mobilitySession,
  resistanceSession,
  trainingPlan,
  trainingPlanEnrolment,
])

export default typeDefs

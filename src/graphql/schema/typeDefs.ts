import { mergeTypeDefs } from '@graphql-tools/merge'
import announcementUpdate from './announcementUpdate'
import bodyTracking from './bodyTracking'
import club from './club'
import collection from './collection'
import coreData from './coreData'
import enums from './enums'
import filterInputs from './filterInputs'
import gymProfile from './gymProfile'
import invites from './invites'
import loggedWorkout from './loggedWorkout'
import main from './main'

import scheduledWorkout from './scheduledWorkout'
import skillsAndCertifications from './skillsAndCertifications'
import timelineFeed from './timelineFeed'
import user from './user'
import userBenchmark from './userBenchmark'
import userDayLogTracking from './userDayLogTracking'
import userProgressTracking from './userProgressTracking'
import welcomeTodoItem from './welcomeTodoItem'
import workout from './workout/workout'
import workoutMetaData from './workout/workoutMetaData'
import workoutMove from './workout/workoutMove'
import workoutPlan from './workoutPlan/workoutPlan'
import workoutPlanMetaData from './workoutPlan/workoutPlanMetaData'
import workoutPlanEnrolment from './workoutPlan/workoutPlanEnrolment'
import workoutSection from './workout/workoutSection'
import workoutSet from './workout/workoutSet'

const typeDefs = mergeTypeDefs([
  announcementUpdate,
  bodyTracking,
  club,
  collection,
  coreData,
  enums,
  filterInputs,
  gymProfile,
  invites,
  loggedWorkout,
  main,
  welcomeTodoItem,
  scheduledWorkout,
  skillsAndCertifications,
  timelineFeed,
  user,
  userBenchmark,
  userDayLogTracking,
  userProgressTracking,
  workout,
  workoutMetaData,
  workoutMove,
  workoutPlan,
  workoutPlanMetaData,
  workoutPlanEnrolment,
  workoutSection,
  workoutSet,
])

export default typeDefs

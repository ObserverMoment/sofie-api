import { mergeTypeDefs } from '@graphql-tools/merge'
import bodyArea from './bodyArea'
import bodyTracking from './bodyTracking'
import club from './club'
import collection from './collection'
import enums from './enums'
import equipment from './equipment'
import filterInputs from './filterInputs'
import gymProfile from './gymProfile'
import invites from './invites'
import loggedWorkout from './loggedWorkout'
import main from './main'
import move from './move'
import progressJournal from './progressJournal'
import scheduledWorkout from './scheduledWorkout'
import timelineFeed from './timelineFeed'
import userBenchmark from './userBenchmark'
import user from './user'
import workout from './workout/workout'
import workoutMove from './workout/workoutMove'
import workoutPlan from './workoutPlan/workoutPlan'
import workoutPlanEnrolment from './workoutPlan/workoutPlanEnrolment'
import workoutSection from './workout/workoutSection'
import workoutSet from './workout/workoutSet'

const typeDefs = mergeTypeDefs([
  bodyArea,
  bodyTracking,
  club,
  collection,
  enums,
  equipment,
  filterInputs,
  gymProfile,
  invites,
  loggedWorkout,
  main,
  move,
  progressJournal,
  scheduledWorkout,
  timelineFeed,
  userBenchmark,
  user,
  workout,
  workoutMove,
  workoutPlan,
  workoutPlanEnrolment,
  workoutSection,
  workoutSet,
])

export default typeDefs

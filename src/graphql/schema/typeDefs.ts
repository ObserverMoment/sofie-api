import { mergeTypeDefs } from '@graphql-tools/merge'
import bodyArea from './bodyArea'
import bodyTransformation from './bodyTransformation'
import club from './club'
import collection from './collection'
import discover from './discover'
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
import workoutPlan from './workoutPlan'
import workoutSection from './workout/workoutSection'
import workoutSet from './workout/workoutSet'
import workoutSummary from './workout/workoutSummary'

const typeDefs = mergeTypeDefs([
  bodyArea,
  bodyTransformation,
  club,
  collection,
  discover,
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
  workoutSection,
  workoutSet,
  workoutSummary,
])

export default typeDefs

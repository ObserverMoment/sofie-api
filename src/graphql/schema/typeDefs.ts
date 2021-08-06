import { mergeTypeDefs } from '@graphql-tools/merge'
import bodyAreaSchema from './bodyArea'
import bodyTransformation from './bodyTransformation'
import club from './club'
import collectionSchema from './collection'
import discoverSchema from './discover'
import enumSchema from './enums'
import equipmentSchema from './equipment'
import filterInputs from './filterInputs'
import gymProfile from './gymProfile'
import loggedWorkoutSchema from './loggedWorkout'
import mainSchema from './main'
import moveSchema from './move'
import progressJournal from './progressJournal'
import scheduledWorkoutSchema from './scheduledWorkout'
import userBenchmarkSchema from './userBenchmark'
import userSchema from './user'
import workoutSchema from './workout/workout'
import workoutMoveSchema from './workout/workoutMove'
import workoutPlanSchema from './workoutPlan'
import workoutSectionSchema from './workout/workoutSection'
import workoutSetSchema from './workout/workoutSet'
import workoutSummarySchema from './workout/workoutSummary'

const typeDefs = mergeTypeDefs([
  bodyAreaSchema,
  bodyTransformation,
  club,
  collectionSchema,
  discoverSchema,
  enumSchema,
  equipmentSchema,
  filterInputs,
  gymProfile,
  loggedWorkoutSchema,
  mainSchema,
  moveSchema,
  progressJournal,
  scheduledWorkoutSchema,
  userBenchmarkSchema,
  userSchema,
  workoutSchema,
  workoutMoveSchema,
  workoutPlanSchema,
  workoutSectionSchema,
  workoutSetSchema,
  workoutSummarySchema,
])

export default typeDefs

import { mergeTypeDefs } from '@graphql-tools/merge'
import bodyAreaSchema from './bodyArea'
import enumSchema from './enums'
import equipmentSchema from './equipment'
import filterInputs from './filterInputs'
import gymProfile from './gymProfile'
import loggedWorkoutSchema from './loggedWorkout'
import mainSchema from './main'
import moveSchema from './move'
import progressJournal from './progressJournal'
import scheduledWorkoutSchema from './scheduledWorkout'
import userSchema from './user'
import userBenchmarkSchema from './userBenchmark'
import workoutSchema from './workout/workout'
import workoutMoveSchema from './workout/workoutMove'
import workoutPlanSchema from './workoutPlan'
import workoutSectionSchema from './workout/workoutSection'
import workoutSetSchema from './workout/workoutSet'
import workoutSummarySchema from './workout/workoutSummary'

const typeDefs = mergeTypeDefs([
  bodyAreaSchema,
  enumSchema,
  equipmentSchema,
  filterInputs,
  gymProfile,
  loggedWorkoutSchema,
  mainSchema,
  moveSchema,
  progressJournal,
  scheduledWorkoutSchema,
  userSchema,
  userBenchmarkSchema,
  workoutSchema,
  workoutMoveSchema,
  workoutPlanSchema,
  workoutSectionSchema,
  workoutSetSchema,
  workoutSummarySchema,
])

export default typeDefs

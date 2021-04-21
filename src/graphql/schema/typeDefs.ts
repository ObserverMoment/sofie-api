import { mergeTypeDefs } from '@graphql-tools/merge'
import mainSchema from './main'
import userSchema from './user'
import gymProfile from './gymProfile'
import progressJournal from './progressJournal'
import equipmentSchema from './equipment'
import moveSchema from './move'
import workoutSummarySchema from './workout/workoutSummary'
import workoutSchema from './workout/workout'
import workoutProgramSchema from './workoutProgram'
import loggedWorkoutSchema from './loggedWorkout'
import scheduledWorkoutSchema from './scheduledWorkout'
import workoutSectionSchema from './workout/workoutSection'
import workoutSetSchema from './workout/workoutSet'
import workoutMoveSchema from './workout/workoutMove'
import bodyAreaSchema from './bodyArea'
import textSearchSchema from './textSearch'
import enumSchema from './enums'

const typeDefs = mergeTypeDefs([
  mainSchema,
  bodyAreaSchema,
  enumSchema,
  equipmentSchema,
  moveSchema,
  userSchema,
  gymProfile,
  loggedWorkoutSchema,
  progressJournal,
  scheduledWorkoutSchema,
  textSearchSchema,
  workoutSummarySchema,
  workoutSchema,
  workoutSectionSchema,
  workoutSetSchema,
  workoutMoveSchema,
  workoutProgramSchema,
])

export default typeDefs

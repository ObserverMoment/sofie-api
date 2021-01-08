import { mergeTypeDefs } from '@graphql-tools/merge'
import mainSchema from './main'
import userSchema from './user'
import progressJournal from './progressJournal'
import moveSchema from './move'
import workoutSchema from './workout'
import workoutProgramSchema from './workoutProgram'
import loggedWorkoutSchema from './loggedWorkout'
import scheduledWorkoutSchema from './scheduledWorkout'
import workoutSectionSchema from './workoutSection'
import workoutMoveSchema from './workoutMove'
import bodyAreaSchema from './bodyArea'
import textSearchSchema from './textSearch'
import enumSchema from './enums'

const typeDefs = mergeTypeDefs([
  mainSchema,
  userSchema,
  progressJournal,
  moveSchema,
  workoutSchema,
  workoutProgramSchema,
  loggedWorkoutSchema,
  scheduledWorkoutSchema,
  workoutSectionSchema,
  workoutMoveSchema,
  bodyAreaSchema,
  textSearchSchema,
  enumSchema,
])

export default typeDefs

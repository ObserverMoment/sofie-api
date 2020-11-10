import { mergeTypeDefs } from '@graphql-tools/merge'
import mainSchema from './main'
import userSchema from './user'
import workoutSchema from './workout'
import workoutProgramSchema from './workoutProgram'
import likedWorkoutSchema from './likedWorkout'
import loggedWorkoutSchema from './loggedWorkout'
import scheduledWorkoutSchema from './scheduledWorkout'
import workoutSectionSchema from './workoutSection'
import workoutMoveSchema from './workoutMove'
import enumSchema from './enums'

const typeDefs = mergeTypeDefs([
  mainSchema,
  userSchema,
  workoutSchema,
  workoutProgramSchema,
  likedWorkoutSchema,
  loggedWorkoutSchema,
  scheduledWorkoutSchema,
  workoutSectionSchema,
  workoutMoveSchema,
  enumSchema,
])

export default typeDefs

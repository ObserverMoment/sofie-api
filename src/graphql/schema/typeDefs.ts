import { mergeTypeDefs } from '@graphql-tools/merge'
import mainSchema from './main'
import userSchema from './user'
import userLikesSchema from './userLikes'
import workoutSchema from './workout'
import workoutProgramSchema from './workoutProgram'
import loggedWorkoutSchema from './loggedWorkout'
import scheduledWorkoutSchema from './scheduledWorkout'
import workoutSectionSchema from './workoutSection'
import workoutMoveSchema from './workoutMove'
import bodyAreaSchema from './bodyArea'
import enumSchema from './enums'

const typeDefs = mergeTypeDefs([
  mainSchema,
  userSchema,
  userLikesSchema,
  workoutSchema,
  workoutProgramSchema,
  loggedWorkoutSchema,
  scheduledWorkoutSchema,
  workoutSectionSchema,
  workoutMoveSchema,
  bodyAreaSchema,
  enumSchema,
])

export default typeDefs

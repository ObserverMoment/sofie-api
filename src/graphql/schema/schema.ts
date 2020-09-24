import { mergeTypeDefs } from '@graphql-tools/merge'
import mainSchema from './main'
import workoutSchema from './workout'
import likedWorkoutSchema from './likedWorkout'
import loggedWorkoutSchema from './loggedWorkout'
import scheduledWorkoutSchema from './scheduledWorkout'
import workoutSectionSchema from './workoutSection'
import workoutMoveSchema from './workoutMove'
import enumSchema from './enums'

const schema = mergeTypeDefs([
  mainSchema,
  workoutSchema,
  likedWorkoutSchema,
  loggedWorkoutSchema,
  scheduledWorkoutSchema,
  workoutSectionSchema,
  workoutMoveSchema,
  enumSchema,
])

export default schema

import { mergeTypeDefs } from '@graphql-tools/merge'
import mainSchema from './main'
import workoutSchema from './workout'
import workoutSectionSchema from './workoutSection'
import workoutMoveSchema from './workoutMove'
import enumSchema from './enums'

const schema = mergeTypeDefs([
  mainSchema,
  workoutSchema,
  workoutSectionSchema,
  workoutMoveSchema,
  enumSchema,
])

export default schema

import { gql } from 'apollo-server-express'

// Optimised search result return objects - only return absolutely required fields.
export default gql`
  type TextSearchWorkoutResult {
    id: ID!
    scope: AccessScopeType!
    name: String
    description: String
    workoutType: WorkoutType!
    imageUrl: String
    difficultyLevel: Int!
    timecap: Int
    createdBy: User
  }

  type TextSearchWorkoutProgramResult {
    id: ID!
    scope: AccessScopeType!
    name: String!
    description: String
    imageUrl: String
    createdBy: User
    workoutGoals: [WorkoutGoal!]!
    workoutProgramWorkouts: [WorkoutProgramWorkout!]
  }
`

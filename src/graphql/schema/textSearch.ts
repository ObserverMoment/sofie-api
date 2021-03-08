import { gql } from 'apollo-server-express'

// Optimised search result return objects - only return absolutely required fields.
export default gql`
  type TextSearchWorkoutResult {
    id: ID!
    scope: ContentAccessScope!
    name: String
    description: String
    imageUri: String
    difficultyLevel: Int!
    timecap: Int
    User: User
  }

  type TextSearchWorkoutProgramResult {
    id: ID!
    scope: ContentAccessScope!
    name: String!
    description: String
    imageUri: String
    User: User
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutProgramWorkouts: [WorkoutProgramWorkout!]
  }
`

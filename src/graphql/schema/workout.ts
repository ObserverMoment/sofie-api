import { gql } from 'apollo-server-express'

export default gql`
  type Workout {
    id: ID!
    createdAt: DateTime!
    User: User
    name: String!
    summary: String
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: Int!
    contentAccessScope: ContentAccessScope!
    WorkoutSections: [WorkoutSection!]!
    WorkoutGoals: [WorkoutGoal!]
  }

  input CreateWorkoutInput {
    name: String!
    summary: String
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: Int!
    contentAccessScope: ContentAccessScope!
    WorkoutSections: [CreateWorkoutSectionInput!]!
    WorkoutGoals: [ID!]
  }

  input ShallowUpdateWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: Int
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ID!]
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type Workout {
    id: ID!
    createdAt: DateTime!
    User: User
    name: String!
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel!
    contentAccessScope: ContentAccessScope!
    WorkoutSections: [WorkoutSection!]!
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutTags: [WorkoutTag!]!
  }

  input CreateWorkoutInput {
    name: String!
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel!
    contentAccessScope: ContentAccessScope!
    WorkoutSections: [CreateWorkoutSectionInput!]!
    WorkoutGoals: [ID!]!
    WorkoutTags: [ID!]!
  }

  input UpdateWorkoutInput {
    id: ID!
    name: String
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ID!]
    WorkoutTags: [ID!]!
  }
`

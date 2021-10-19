import { gql } from 'apollo-server-express'

export default gql`
  type Workout {
    id: ID!
    createdAt: DateTime!
    User: UserSummary!
    archived: Boolean!
    name: String!
    description: String
    lengthMinutes: Int
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel!
    contentAccessScope: ContentAccessScope!
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutTags: [WorkoutTag!]!
    WorkoutSections: [WorkoutSection!]!
  }

  # Just creates the basic required fields.
  input CreateWorkoutInput {
    name: String!
    difficultyLevel: DifficultyLevel!
    contentAccessScope: ContentAccessScope!
  }

  input UpdateWorkoutInput {
    id: ID!
    name: String
    description: String
    lengthMinutes: Int
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ConnectRelationInput!]
    WorkoutTags: [ConnectRelationInput!]
  }

  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
    hexColor: String!
  }

  type WorkoutTag {
    id: ID!
    tag: String!
  }

  input CreateWorkoutTagInput {
    tag: String!
  }

  input UpdateWorkoutTagInput {
    id: ID!
    tag: String!
  }
`

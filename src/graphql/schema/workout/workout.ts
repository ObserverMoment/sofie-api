import { gql } from 'apollo-server-express'

export default gql`
  # Used for displaying a workout card style summary.
  # Min data required to optimise calls to list resolvers.
  type WorkoutSummary {
    id: ID!
    createdAt: DateTime!
    name: String!
    archived: Boolean!
    User: UserSummary!
    lengthMinutes: Int
    coverImageUri: String
    description: String
    difficultyLevel: DifficultyLevel!
    loggedSessionsCount: Int!
    hasClassVideo: Boolean!
    hasClassAudio: Boolean!
    equipments: [String!]!
    # Workout Section Types, Goals and Tags as strings.
    tags: [String!]!
  }

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

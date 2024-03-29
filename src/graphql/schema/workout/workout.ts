import { gql } from 'apollo-server-express'

export default gql`
  # Used for displaying a workout card style summary.
  # Min data required to optimise calls to list resolvers.
  type WorkoutSummary {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    archived: Boolean!
    User: UserAvatarData!
    lengthMinutes: Int
    coverImageUri: String
    description: String
    # Should be read only for non admins - to be useful the difficulty level should be assigned by a professional.
    difficultyLevel: DifficultyLevel
    loggedSessionsCount: Int!
    hasClassVideo: Boolean!
    hasClassAudio: Boolean!
    # Equipment IDs
    equipments: [String!]!
    # Workout Section Types, Goals and Tags as strings.
    sectionTypes: [String!]!
    goals: [String!]!
    tags: [String!]!
    # Targeted body areas - IDs.
    bodyAreas: [ID!]!
  }

  type Workout {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    User: UserAvatarData!
    archived: Boolean!
    name: String!
    description: String
    lengthMinutes: Int
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    # Should be read only for non admins - to be useful the difficulty level should be assigned by a professional.
    difficultyLevel: DifficultyLevel
    contentAccessScope: ContentAccessScope!
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutTags: [WorkoutTag!]!
    WorkoutSections: [WorkoutSection!]!
  }

  # Just creates the basic required fields.
  input CreateWorkoutInput {
    name: String!
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
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ConnectRelationInput!]
    WorkoutTags: [ConnectRelationInput!]
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

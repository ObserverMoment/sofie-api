import { gql } from 'apollo-server-express'

/// ADMIN USE ONLY ///
export default gql`
  type PublicWorkoutCountsAdmin {
    pending: Int!
    valid: Int!
    invalid: Int!
  }

  type PublicWorkoutSummaryAdmin {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
  }

  type WorkoutWithMetaDataAdmin {
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
    contentAccessScope: ContentAccessScope!
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutTags: [WorkoutTag!]!
    WorkoutSections: [WorkoutSection!]!
    validated: PublicContentValidationStatus!
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]!
  }

  input UpdateWorkoutMetaDataAdminInput {
    id: ID!
    validated: PublicContentValidationStatus
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]
  }
`

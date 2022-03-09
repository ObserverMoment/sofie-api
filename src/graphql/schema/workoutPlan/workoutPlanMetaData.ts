import { gql } from 'apollo-server-express'

// Admin use only //
export default gql`
  type WorkoutPlanWithMetaDataAdmin {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    archived: Boolean!
    name: String!
    description: String
    lengthWeeks: Int!
    daysPerWeek: Int!
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    User: UserAvatarData!
    WorkoutPlanDays: [WorkoutPlanDay!]!
    WorkoutPlanReviews: [WorkoutPlanReview!]!
    WorkoutTags: [WorkoutTag!]!
    WorkoutPlanEnrolments: [WorkoutPlanEnrolment!]!
    validated: PublicContentValidationStatus!
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]!
  }

  input UpdateWorkoutPlanMetaDataAdminInput {
    id: ID!
    validated: PublicContentValidationStatus
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]
  }
`

import { gql } from 'apollo-server-express'

// Admin use only //
export default gql`
  type WorkoutPlanWithMetaDataAdmin {
    WorkoutPlan: WorkoutPlan!
    metaData: WorkoutPlanMetaDataAdmin!
  }

  type WorkoutPlanMetaDataAdmin {
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

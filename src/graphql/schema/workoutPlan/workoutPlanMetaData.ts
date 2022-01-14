import { gql } from 'apollo-server-express'

// Admin use only //
export default gql`
  type WorkoutPlanWithMetaData {
    WorkoutPlan: WorkoutPlan!
    metaData: WorkoutPlanMetaData!
  }

  type WorkoutPlanMetaData {
    validated: PublicContentValidationStatus!
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]!
  }

  input UpdateWorkoutPlanMetaDataInput {
    id: ID!
    validated: PublicContentValidationStatus
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]
  }
`

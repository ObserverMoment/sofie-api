import { gql } from 'apollo-server-express'

// Admin use only //
export default gql`
  type WorkoutWithMetaData {
    Workout: Workout!
    metaData: WorkoutMetaData!
  }

  type WorkoutMetaData {
    validated: PublicContentValidationStatus!
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]!
  }

  input UpdateWorkoutMetaDataInput {
    id: ID!
    validated: PublicContentValidationStatus
    reasonNotValidated: String
    difficultyLevel: DifficultyLevel
    metaTags: [String!]
  }
`

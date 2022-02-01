import { gql } from 'apollo-server-express'

/// ADMIN USE ONLY ///
export default gql`
  type WorkoutWithMetaDataAdmin {
    Workout: Workout!
    metaData: WorkoutMetaDataAdmin!
  }

  type WorkoutMetaDataAdmin {
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

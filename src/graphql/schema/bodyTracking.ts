import { gql } from 'apollo-server-express'

export default gql`
  type BodyTrackingEntry {
    id: ID!
    createdAt: DateTime!
    fatPercent: Float
    bodyweight: Float
    bodyweightUnit: BodyweightUnit
    photoUris: [String!]!
    note: String
  }

  input CreateBodyTrackingEntryInput {
    fatPercent: Float
    bodyweight: Float
    bodyweightUnit: BodyweightUnit
    photoUris: [String!]
    note: String
  }

  input UpdateBodyTrackingEntryInput {
    id: ID!
    fatPercent: Float
    bodyweight: Float
    bodyweightUnit: BodyweightUnit
    photoUris: [String!]
    note: String
  }
`

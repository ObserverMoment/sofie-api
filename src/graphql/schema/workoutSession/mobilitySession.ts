import { gql } from 'apollo-server-express'

export default gql`
  type MobilitySession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    note: String
    audioUri: String
    videoUri: String
    videoThumbUri: String
    childrenOrder: [String!]!
    MobilityMoves: [MobilityMove!]!
  }

  input CreateMobilitySessionInput {
    name: String!
  }

  input UpdateMobilitySessionInput {
    id: ID!
    name: String
    note: String
    audioUri: String
    videoUri: String
    videoThumbUri: String
    childrenOrder: [String!]
    MobilityMoves: [ConnectRelationInput!]
  }
`

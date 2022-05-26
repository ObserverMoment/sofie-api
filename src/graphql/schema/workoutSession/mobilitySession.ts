import { gql } from 'apollo-server-express'

export default gql`
  type MobilitySession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    moveOrder: [String!]!
    MobilityMoves: [MobilityMove!]!
  }
`

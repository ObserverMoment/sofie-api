import { gql } from 'apollo-server-express'

export default gql`
  type MobilityWorkout {
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

  input CreateMobilityWorkoutInput {
    name: String!
  }

  input UpdateMobilityWorkoutInput {
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

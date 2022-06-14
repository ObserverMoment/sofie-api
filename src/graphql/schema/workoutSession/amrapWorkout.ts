import { gql } from 'apollo-server-express'

export default gql`
  type AmrapWorkout {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    note: String
    # If forced rests are required between sections then add [rest:seconds].
    # [AMRAPSectionId, rest:60, AMRAPSection]
    childrenOrder: [String!]!
    AmrapSections: [AmrapSection!]!
  }

  input CreateAmrapWorkoutInput {
    name: String!
  }

  input UpdateAmrapWorkoutInput {
    id: ID!
    name: String
    note: String
    childrenOrder: [String!]
  }

  type AmrapSection {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    childrenOrder: [String!]!
    AmrapMoves: [AmrapMove!]!
  }

  input CreateAmrapSectionInput {
    AmrapWorkout: ConnectRelationInput!
  }

  input UpdateAmrapSectionInput {
    id: ID!
    name: String
    note: String
    childrenOrder: [String!]
  }

  type AmrapMove {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    Move: Move!
    Equipment: Equipment
  }

  input CreateAmrapMoveInput {
    AmrapSection: ConnectRelationInput!
    Move: ConnectRelationInput!
  }

  input UpdateAmrapMoveInput {
    id: ID!
    note: String
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type AmrapSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    # If forced rests are required between sections then add [rest:seconds].
    # [AMRAPSectionId, rest:60, AMRAPSection]
    childrenOrder: [String!]!
    AmrapSections: [AmrapSection!]!
  }

  input CreateAmrapSessionInput {
    WorkoutSession: ConnectRelationInput!
  }

  input UpdateAmrapSessionInput {
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
    AmrapSession: ConnectRelationInput!
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

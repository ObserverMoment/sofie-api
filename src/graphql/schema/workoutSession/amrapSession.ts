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
    sectionOrder: [String!]!
    AmrapSections: [AmrapSection!]!
  }

  input CreateAmrapSessionInput {
    WorkoutSession: ConnectRelationInput!
  }

  input UpdateAmrapSessionInput {
    id: ID!
    name: String
    note: String
    sectionOrder: [String!]
  }

  type AmrapSection {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    moveOrder: [String!]!
    AmrapMoves: [AmrapMove!]!
  }

  input CreateAmrapSectionInput {
    AmrapSession: ConnectRelationInput!
  }

  input UpdateAmrapSectionInput {
    id: ID!
    name: String
    note: String
    moveOrder: [String!]
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
  }

  input UpdateAmrapMoveInput {
    id: ID!
    note: String
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }
`

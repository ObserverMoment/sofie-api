import { gql } from 'apollo-server-express'

export default gql`
  type ForTimeSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    repeats: Int!
    # 0 is no timecap
    timecapSeconds: Int!
    # If forced rests are required between sections then add [rest:seconds].
    # [ForTimeSectionId, rest:60, ForTimeSectionId]
    sectionOrder: [String!]!
    ForTimeSections: [ForTimeSection!]!
  }

  input CreateForTimeSessionInput {
    WorkoutSession: ConnectRelationInput!
  }

  input UpdateForTimeSessionInput {
    id: ID!
    name: String
    note: String
    repeats: Int!
    timecapSeconds: Int
    sectionOrder: [String!]
  }

  type ForTimeSection {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    moveOrder: [String!]!
    ForTimeMoves: [ForTimeMove!]!
  }

  input CreateForTimeSectionInput {
    ForTimeSession: ConnectRelationInput!
  }

  input UpdateForTimeSectionInput {
    id: ID!
    name: String
    note: String
    moveOrder: [String!]
  }

  type ForTimeMove {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    Move: Move!
    Equipment: Equipment
  }

  input CreateForTimeMoveInput {
    ForTimeSection: ConnectRelationInput!
    Move: ConnectRelationInput!
  }

  input UpdateForTimeMoveInput {
    id: ID!
    note: String
    Move: ConnectRelationInput
    Equipment: ConnectRelationInput
  }
`

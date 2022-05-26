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

  type ForTimeSection {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    moveOrder: [String!]!
    ForTimeMoves: [ForTimeMove!]!
  }

  type ForTimeMove {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    Move: Move!
    Equipment: Equipment
  }
`

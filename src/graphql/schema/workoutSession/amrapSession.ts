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

  type AmrapSection {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    moveOrder: [String!]!
    AmrapMoves: [AmrapMove!]!
  }

  type AmrapMove {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    Move: Move!
    Equipment: Equipment
  }
`

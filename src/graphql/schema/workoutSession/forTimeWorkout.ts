import { gql } from 'apollo-server-express'

export default gql`
  type ForTimeWorkout {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    note: String
    repeats: Int!
    # 0 is no timecap
    timecapSeconds: Int!
    # If forced rests are required between sections then add [rest:seconds].
    # [ForTimeSectionId, rest:60, ForTimeSectionId]
    childrenOrder: [String!]!
    ForTimeSections: [ForTimeSection!]!
  }

  input CreateForTimeWorkoutInput {
    name: String!
  }

  input UpdateForTimeWorkoutInput {
    id: ID!
    name: String
    note: String
    repeats: Int!
    timecapSeconds: Int
    childrenOrder: [String!]
  }

  type ForTimeSection {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    childrenOrder: [String!]!
    ForTimeMoves: [ForTimeMove!]!
  }

  input CreateForTimeSectionInput {
    ForTimeWorkout: ConnectRelationInput!
  }

  input UpdateForTimeSectionInput {
    id: ID!
    name: String
    note: String
    childrenOrder: [String!]
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

import { gql } from 'apollo-server-express'

export default gql`
  type ResistanceSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    setOrder: [String!]!
    ResistanceExercises: [ResistanceExercise!]!
  }

  type ResistanceExercise {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    setOrder: [String!]!
    ResistanceSets: [ResistanceSet!]!
  }

  type ResistanceSet {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    reps: Int
    Move: Move!
    Equipment: Equipment
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type ResistanceSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    childrenOrder: [String!]!
    ResistanceExercises: [ResistanceExercise!]!
  }

  input CreateResistanceSessionInput {
    WorkoutSession: ConnectRelationInput!
  }

  input UpdateResistanceSessionInput {
    id: ID!
    name: String
    note: String
    childrenOrder: [String!]
  }

  type ResistanceExercise {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    childrenOrder: [String!]!
    ResistanceSets: [ResistanceSet!]!
  }

  input CreateResistanceExerciseInput {
    ResistanceSession: ConnectRelationInput!
    ResistanceSets: [CreateResistanceSetInExerciseInput!]
  }

  input CreateResistanceSetInExerciseInput {
    reps: Int
    Equipment: ConnectRelationInput
    Move: ConnectRelationInput!
  }

  input UpdateResistanceExerciseInput {
    id: ID!
    note: String
    childrenOrder: [String!]
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

  input CreateResistanceSetInput {
    ResistanceExercise: ConnectRelationInput!
    Move: ConnectRelationInput!
  }

  input UpdateResistanceSetInput {
    id: ID!
    note: String
    reps: Int
    Move: ConnectRelationInput
    Equipment: ConnectRelationInput
  }
`

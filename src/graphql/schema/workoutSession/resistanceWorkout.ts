import { gql } from 'apollo-server-express'

export default gql`
  type ResistanceWorkout {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    note: String
    ResistanceExercises: [ResistanceExercise!]!
    User: UserAvatarData!
  }

  input CreateResistanceWorkoutInput {
    name: String!
  }

  input UpdateResistanceWorkoutInput {
    id: ID!
    name: String
    note: String
  }

  type ResistanceExercise {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    sortPosition: Int!
    note: String
    ResistanceSets: [ResistanceSet!]!
  }

  input CreateResistanceExerciseInput {
    ResistanceWorkout: ConnectRelationInput!
    ResistanceSets: [CreateResistanceSetInExerciseInput!]!
  }

  input CreateResistanceSetInExerciseInput {
    reps: [Int!]!
    repType: ResistanceSetRepType!
    Equipment: ConnectRelationInput
    Move: ConnectRelationInput!
  }

  input UpdateResistanceExerciseInput {
    id: ID!
    note: String
  }

  type ResistanceSet {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    sortPosition: Int!
    note: String
    reps: [Int!]!
    repType: ResistanceSetRepType!
    Move: Move!
    Equipment: Equipment
  }

  enum ResistanceSetRepType {
    REPS
    SECONDS
    MINUTES
    CALORIES
    METRES
  }

  input CreateResistanceSetInput {
    ResistanceExercise: ConnectRelationInput!
    Move: ConnectRelationInput!
  }

  input UpdateResistanceSetInput {
    id: ID!
    note: String
    reps: [Int!]
    repType: ResistanceSetRepType
    Move: ConnectRelationInput
    Equipment: ConnectRelationInput
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type IntervalSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    audioUri: String
    videoUri: String
    videoThumbUri: String
    repeats: Int!
    # For rest intervals add 'rest' to the array.
    # E.g. [IntervalExerciseId, IntervalExerciseId, rest, IntervalExerciseId, IntervalExerciseId, rest]
    childrenOrder: [String!]!
    # Align with setOrder. Interval length in seconds.
    # E.g [60, 60, 30, 60, 60, 30]
    intervals: [Int!]!
    IntervalExercises: [IntervalExercise!]!
  }

  input CreateIntervalSessionInput {
    WorkoutSession: ConnectRelationInput!
  }

  input UpdateIntervalSessionInput {
    id: ID!
    name: String
    note: String
    audioUri: String
    videoUri: String
    videoThumbUri: String
    repeats: Int
    childrenOrder: [String!]
    intervals: [Int!]
  }

  type IntervalExercise {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    childrenOrder: [String!]!
    IntervalSets: [IntervalSet!]!
  }

  input CreateIntervalExerciseInput {
    IntervalSession: ConnectRelationInput!
  }

  input UpdateIntervalExerciseInput {
    id: ID!
    note: String
    childrenOrder: [String!]
  }

  type IntervalSet {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    Move: Move!
    Equipment: Equipment
  }

  input CreateIntervalSetInput {
    IntervalExercise: ConnectRelationInput!
    Move: ConnectRelationInput!
  }

  input UpdateIntervalSetInput {
    id: ID!
    note: String
    Move: ConnectRelationInput
    Equipment: ConnectRelationInput
  }
`

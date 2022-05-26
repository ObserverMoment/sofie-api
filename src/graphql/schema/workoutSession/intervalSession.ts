import { gql } from 'apollo-server-express'

export default gql`
  type IntervalSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    repeats: Int!
    # For rest intervals add 'rest' to the array.
    # E.g. [IntervalExerciseId, IntervalExerciseId, rest, IntervalExerciseId, IntervalExerciseId, rest]
    intervalExerciseOrder: [String!]!
    # Align with setOrder. Interval length in seconds.
    # E.g [60, 60, 30, 60, 60, 30]
    intervals: [Int!]!
    IntervalExercises: [IntervalExercise!]!
  }

  type IntervalExercise {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    intervalSetOrder: [String!]!
    IntervalSets: [IntervalSet!]!
  }

  type IntervalSet {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    Move: Move!
    Equipment: Equipment
  }
`

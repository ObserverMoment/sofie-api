import { gql } from 'apollo-server-express'

export default gql`
  type CardioSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    note: String
    childrenOrder: [String!]!
    CardioExercises: [CardioExercise!]!
  }

  input CreateCardioSessionInput {
    name: String!
  }

  input UpdateCardioSessionInput {
    id: ID!
    name: String
    note: String
    childrenOrder: [String!]
  }

  type CardioExercise {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String
    time: Float
    timeUnit: TimeUnit!
    distance: Float
    distanceUnit: DistanceUnit!
    cardioZone: CardioZone!
    Move: Move
  }

  input CreateCardioExerciseInput {
    CardioSession: ConnectRelationInput!
    Move: ConnectRelationInput!
  }

  input UpdateCardioExerciseInput {
    id: ID!
    note: String
    time: Float
    timeUnit: TimeUnit
    distance: Float
    distanceUnit: DistanceUnit
    cardioZone: CardioZone
    Move: ConnectRelationInput
  }
`

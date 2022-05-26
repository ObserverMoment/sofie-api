import { gql } from 'apollo-server-express'

export default gql`
  type CardioSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    note: String
    exerciseOrder: [String!]!
    CardioExercises: [CardioExercise!]!
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
`

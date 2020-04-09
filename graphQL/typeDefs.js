const { gql } = require('apollo-server-express')
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    hello(testMessage: String): String
    moves: [Move!]!
    users: [User!]!
    workouts: [Workout!]!
  }

  type Move {
    id: ID!
    name: String!
    workoutMoves: [WorkoutMove!]!
  }

  type Workout {
    id: ID!
    name: String!
    summary: String!
    description: String
    workoutType: String!
    workoutMoves: [WorkoutMove!]!
    worldRecord: WorldRecord
  }

  type WorkoutMove {
    id: ID!
    beginnerScaling: String
    intermediateScaling: String
    prescribedScaling: String
    repsPerRound: Int
    move: Move!
    workout: Workout!
  }

  type WorldRecord {
    id: ID!
    notes: String
    recordValue: Int!
    recordType: String!
    gender: String!
    workout: Workout!
    user: User
  }

  type User {
    id: ID!
    displayName: String!
    firstname: String!
    lastname: String!
    bio: String
    birthdate: String!
    gender: String!
    height: Int!
    weight: Int!
    city: String!
    country: String!
  }
`

module.exports = typeDefs

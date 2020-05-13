const { gql } = require('apollo-server-express')
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    checkUniqueDisplayName(displayName: String!): Boolean
    moves: [Move!]!
    userByUid(uid: String!): User
    users: [User!]!
    workouts: [Workout!]!
  }

  type Mutation {
    createUser(uid: String!): User!
    updateUser(id: String!, data: UpdateUserInput!): User!
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
    worldRecords: [WorldRecord!]
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
    avatarUrl: String
    bio: String
    birthdate: String
    city: String
    countryCode: String
    displayName: String
    firstname: String
    gender: String
    gymBox: String
    hasOnboarded: Boolean!
    height: Float
    lastname: String
    unitSystem: String
    weight: Float
  }

  input UpdateUserInput {
    avatarUrl: String
    bio: String
    birthdate: String
    city: String
    countryCode: String
    displayName: String
    firstname: String
    gender: String
    gymBox: String
    hasOnboarded: Boolean
    height: Float
    lastname: String
    unitSystem: String
    weight: Float
  }
`

module.exports = typeDefs

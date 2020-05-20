const { gql } = require('apollo-server-express')
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    checkUniqueDisplayName(displayName: String!): Boolean
    moves: [Move!]!
    userByUid(uid: String!): User
    users: [User!]!
    workouts(scope: String!): [Workout!]!
  }

  type Mutation {
    createUser(uid: String!): User!
    updateUser(id: String!, data: UpdateUserInput!): User!
    createWorkout(
      userId: String!
      workout: CreateWorkoutInput!
      workoutMoves: [CreateWorkoutMoveInput!]!
    ): Workout!
  }

  type Benchmark {
    id: ID!
    completedOn: String
    score: Int!
    note: String
    completedBy: User!
    challenge: Challenge!
  }

  type Challenge {
    id: ID!
    scope: String!
    name: String
    category: String
    description: String
    imageUrl: String
    group: Group
    createdBy: User
    workouts: [Workout!]
    benchmarks: [Benchmark!]
    watchers: [User!]
  }

  type Equipment {
    id: ID!
    name: String!
    imageUrl: String
    moves: [Move!]!
  }

  type Group {
    id: ID!
    scope: String!
    logoUrl: String
    name: String!
    countryCode: String
    description: String
    createdBy: User
    admins: [User!]
    members: [User!]
    challenges: [Challenge!]
  }

  type Move {
    id: ID!
    name: String!
    description: String
    demoVideoUrl: String
    scope: String!
    equipment: Equipment
  }

  type Workout {
    id: ID!
    name: String!
    summary: String
    description: String
    demoVideoUrl: String
    workoutScoreType: String!
    difficultyLevel: String!
    scope: String!
    crossfitWodCategory: String
    challenges: [Challenge!]
    workoutSections: [WorkoutSection!]!
    worldRecords: [WorldRecord!]
  }

  type WorkoutSection {
    id: ID!
    name: String
    workoutMoves: [WorkoutMove!]
    workout: Workout!
  }

  type WorkoutMove {
    id: ID!
    repType: String!
    maleReps: Int
    femaleReps: Int
    maleLoadAmountKgs: Float
    femaleLoadAmountKgs: Float
    repsPerRound: Int
    move: Move!
    workoutSection: WorkoutSection!
  }

  type WorldRecord {
    id: ID!
    notes: String
    recordValue: Int!
    workoutScoreType: String!
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

  input CreateWorkoutInput {
    userId: String!
    name: String!
    summary: String
    description: String
    difficultyLevel: String
    workoutScoreType: String!
    scope: String
    crossfitWodCategory: String
    workoutMoves: [CreateWorkoutMoveInput!]!
  }

  input CreateWorkoutMoveInput {
    maleLoadAmountKgs: Float!
    femaleLoadAmountKgs: Float!
    reps: Int!
    moveId: String!
  }
`

module.exports = typeDefs

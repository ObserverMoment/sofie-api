const { gql } = require('apollo-server-express')
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    checkUniqueDisplayName(displayName: String!): Boolean
    officialMoves: [Move!]!
    officialEquipments: [Equipment!]!
    officialWorkouts: [Workout!]!
    moves: [Move!]!
    userByUid(uid: String!): User
    users: [User!]!
    workoutById(id: String!): Workout
    allWorkouts(authedUserId: String!): [Workout!]!
    workoutsByScope(authedUserId: String!, scopes: [String!]!): [Workout!]!
  }

  type Mutation {
    createUser(uid: String!): User!
    updateUser(id: String!, data: UpdateUserInput!): User!
    createWorkout(
      authedUserId: String!
      workoutData: CreateWorkoutInput!
    ): Workout!
    updateWorkout(
      authedUserId: String!,
      workoutId: String!,
      workoutData: UpdateWorkoutInput!
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
    groupId: String
    validRepTypes: [String!]!
    createdById: String
    requiredEquipments: [Equipment!]!
    selectableEquipments: [Equipment!]!
  }

  type Workout {
    id: ID!
    createdAt: String!
    name: String!
    summary: String
    description: String
    timecap: Int
    demoVideoUrl: String
    workoutScoreType: String!
    difficultyLevel: String!
    scope: String!
    challenges: [Challenge!]
    workoutSections: [WorkoutSection!]!
  }

  input CreateWorkoutInput {
    name: String!
    summary: String
    description: String
    demoVideoUrl: String
    timecap: Int
    workoutScoreType: String!
    difficultyLevel: String!
    scope: String!
    workoutSections: [CreateWorkoutSectionInput!]
  }

  input UpdateWorkoutInput {
    id: ID
    name: String
    summary: String
    description: String
    demoVideoUrl: String
    timecap: Int
    workoutScoreType: String
    difficultyLevel: String
    scope: String
  }

  type WorkoutSection {
    id: ID!
    name: String
    isPyramid: Boolean
    timecap: Int
    rounds: Int!
    pyramidStructure: [Int!]
    isTabata: Boolean
    sortPosition: Int!
    workoutMoves: [WorkoutMove!]
    workout: Workout!
  }

  type WorkoutMove {
    id: ID!
    repType: String!
    sortPosition: Int!
    description: String
    reps: Int
    loadAmountKgs: Float
    distanceUnit: String!
    move: Move!
    selectedEquipment: Equipment
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
    weight: Float
    lastname: String
    unitSystem: String
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

  input CreateWorkoutRecordInput {
    notes: String
    recordValue: Int!
    workoutScoreType: String!
    gender: String!
  }

  input CreateWorkoutSectionInput {
    name: String
    timecap: Int
    sortPosition: Int
    isPyramid: Boolean
    pyramidStructure: [Int!]
    isTabata: Boolean
    rounds: Int
    workoutMoves: [CreateWorkoutMoveInput!]!
  }

  input CreateWorkoutMoveInput {
    loadAmountKgs: Float!
    description: String
    reps: Float!
    repType: String!
    distanceUnit: String!
    sortPosition: Int
    selectedEquipmentId: String
    moveId: String!
  }
`

module.exports = typeDefs

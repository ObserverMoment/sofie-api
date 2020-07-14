import { gql } from 'apollo-server-express'

export const schema = gql`
  type Query {
    checkUniqueDisplayName(displayName: String!): Boolean!
    officialMoves: [Move!]!
    officialEquipments: [Equipment!]!
    officialWorkouts: [Workout!]!
    moves: [Move!]!
    userByUid(uid: String!): User
    users: [User!]!
    workoutById(id: String!): Workout
    workouts(authedUserId: String!): [Workout!]!
  }

  type Mutation {
    createUser(uid: String!): User!
    updateUser(id: String!, data: UpdateUserInput!): User!
    createWorkout(
      authedUserId: String!
      workoutData: CreateWorkoutInput!
    ): Workout!
    deepUpdateWorkout(
      authedUserId: String!
      workoutData: CreateWorkoutInput!
    ): Workout!
    shallowUpdateWorkout(
      authedUserId: String!
      workoutData: ShallowUpdateWorkoutInput!
    ): Workout!
  }

  type Equipment {
    id: ID!
    name: String!
    imageUrl: String
    moves: [Move!]!
  }

  type Move {
    id: ID!
    name: String!
    description: String
    demoVideoUrl: String
    scope: AccessScopeType!
    groupId: String
    validRepTypes: [WorkoutMoveRepType!]!
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
    imageUrl: String
    workoutScoreType: WorkoutScoreType!
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
    workoutSections: [WorkoutSection!]!
  }

  input CreateWorkoutInput {
    id: ID
    name: String!
    summary: String
    description: String
    demoVideoUrl: String
    imageUrl: String
    timecap: Int
    workoutScoreType: WorkoutScoreType!
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
    workoutSections: [CreateWorkoutSectionInput!]!
  }

  input ShallowUpdateWorkoutInput {
    id: ID
    name: String!
    summary: String
    description: String
    demoVideoUrl: String
    imageUrl: String
    timecap: Int
    workoutScoreType: WorkoutScoreType!
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
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

  input CreateWorkoutSectionInput {
    id: ID
    name: String
    timecap: Int
    sortPosition: Int
    isPyramid: Boolean
    pyramidStructure: [Int!]
    isTabata: Boolean
    rounds: Int
    workoutMoves: [CreateWorkoutMoveInput!]!
  }

  type WorkoutMove {
    id: ID!
    repType: String!
    sortPosition: Int!
    description: String
    reps: Float!
    loadAmountKgs: Float
    distanceUnit: DistanceUnit
    move: Move!
    selectedEquipment: Equipment
  }

  input CreateWorkoutMoveInput {
    id: ID
    loadAmountKgs: Float!
    description: String
    reps: Float!
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit
    sortPosition: Int
    selectedEquipmentId: String
    moveId: String!
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
    lastname: String
    themePreference: ThemePreference!
    gender: Gender
    gymBox: String
    hasOnboarded: Boolean!
    height: Float
    weight: Float
    unitSystem: UnitSystem
  }

  input UpdateUserInput {
    avatarUrl: String
    bio: String
    birthdate: String
    city: String
    countryCode: String
    displayName: String
    firstname: String
    themePreference: ThemePreference
    gender: Gender
    gymBox: String
    hasOnboarded: Boolean
    height: Float
    lastname: String
    unitSystem: UnitSystem
    weight: Float
  }

  """
  Enums
  """
  enum AccessScopeType {
    OFFICIAL
    PUBLIC
    GROUP
    PRIVATE
  }

  enum UserSubscriptionLevel {
    FREE
    PAID
  }

  enum Gender {
    MALE
    FEMALE
    UNSPECIFIED
  }

  enum DifficultyLevel {
    ONE
    TWO
    THREE
    FOUR
  }

  enum WorkoutMoveRepType {
    REPS
    CALORIES
    DISTANCE
    TIME
  }

  """
  AMREPS in reps
  TIME in seconds
  LOAD in kgs
  EMON in reps
  """
  enum WorkoutScoreType {
    AMREPS
    FORTIME
    FORLOAD
  }

  enum UnitSystem {
    IMPERIAL
    METRIC
  }

  enum DistanceUnit {
    METRES
    KILOMETRES
    YARDS
    MILES
  }

  enum ThemePreference {
    DARK
    LIGHT
  }
`

import { gql } from 'apollo-server-express'

export const schema = gql`
  type Query {
    checkUniqueDisplayName(displayName: String!): Boolean!
    officialMoves: [Move!]!
    officialEquipments: [Equipment!]!
    officialWorkouts: [Workout!]!
    officialWorkoutTypes: [WorkoutType!]!
    moves: [Move!]!
    userByUid(uid: ID!): User
    users: [User!]!
    workoutById(id: ID!): Workout
    workouts(authedUserId: ID!): [Workout!]!
  }

  type Mutation {
    createUser(uid: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    createWorkout(authedUserId: ID!, workoutData: CreateWorkoutInput!): Workout!
    deepUpdateWorkout(
      authedUserId: ID!
      workoutData: DeepUpdateWorkoutInput!
    ): Workout!
    shallowUpdateWorkout(
      authedUserId: ID!
      workoutData: ShallowUpdateWorkoutInput!
    ): Workout!
    deleteWorkout(authedUserId: ID!, workoutId: ID!): ID!
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

  type WorkoutType {
    id: ID!
    name: String
    description: String
    scoreType: WorkoutScoreType
    Workout: [Workout!]!
  }

  type Workout {
    id: ID!
    createdAt: String!
    name: String!
    summary: String
    description: String
    timecap: Int
    isCopy: Boolean
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    workoutType: WorkoutType!
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
    workoutSections: [WorkoutSection!]!
  }

  input CreateWorkoutInput {
    name: String!
    summary: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    timecap: Int
    workoutTypeId: String!
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
    workoutSections: [CreateWorkoutSectionInput!]!
  }

  input DeepUpdateWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    timecap: Int
    workoutTypeId: String
    difficultyLevel: DifficultyLevel
    scope: AccessScopeType
    workoutSections: [CreateWorkoutSectionInput!]!
  }

  input ShallowUpdateWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    timecap: Int
    workoutTypeId: String
    difficultyLevel: DifficultyLevel
    scope: AccessScopeType
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

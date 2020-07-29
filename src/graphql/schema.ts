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
    notes: String
    timecap: Int
    rounds: Int!
    repPyramid: Boolean
    repPyramidStructure: [Int!]
    weightPyramid: Boolean
    weightPyramidStructure: [Int!]
    sortPosition: Int!
    workoutMoves: [WorkoutMove!]
    workout: Workout!
    roundAdjustRules: [RoundAdjustRule!]
  }

  input CreateWorkoutSectionInput {
    id: ID
    notes: String
    timecap: Int
    sortPosition: Int
    repPyramid: Boolean
    repPyramidStructure: [Int!]
    weightPyramid: Boolean
    weightPyramidStructure: [Int!]
    rounds: Int
    workoutMoves: [CreateWorkoutMoveInput!]!
    roundAdjustRules: [CreateRoundAdjustRuleInput!]
  }

  type RoundAdjustRule {
    id: ID!
    target: RuleTarget
    action: RuleAction
    amount: Float
    roundFrequency: Int
  }

  input CreateRoundAdjustRuleInput {
    target: RuleTarget!
    action: RuleAction!
    amount: Float!
    roundFrequency: Int!
  }

  type WorkoutMove {
    id: ID!
    description: String
    sortPosition: Int!
    reps: Float!
    repType: String!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    move: Move!
    selectedEquipment: Equipment
  }

  input CreateWorkoutMoveInput {
    description: String
    sortPosition: Int
    reps: Float
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    moveId: String!
    selectedEquipmentId: String
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

  """
  For generating rules which can adjust rep and load over the course of a workout
  """
  enum RuleAction {
    INCREASE
    DECREASE
    MULTIPLY
  }
  """
  For generating rules which can adjust rep and load over the course of a workout
  """
  enum RuleTarget {
    REP
    LOAD
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

  enum LoadUnit {
    KG
    LB
    BODYWEIGHTPERCENT
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

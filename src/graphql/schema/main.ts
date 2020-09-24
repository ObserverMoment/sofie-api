import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON

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
    likedWorkouts(authedUserId: ID!): [ID!]!
    scheduledWorkouts(authedUserId: ID!): [ScheduledWorkout!]!
    loggedWorkouts(authedUserId: ID!): [LoggedWorkout!]!
  }

  type Mutation {
    createUser(uid: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    createGymProfile(id: ID!, data: CreateGymProfileInput!): User!
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
    likeWorkout(authedUserId: ID!, workoutId: ID!): ID
    unlikeWorkout(authedUserId: ID!, workoutId: ID!): ID
    scheduleWorkout(
      authedUserId: ID!
      data: CreateScheduledWorkoutInput!
    ): ScheduledWorkout!
    unscheduleWorkout(authedUserId: ID!, scheduledWorkoutId: ID!): ID!
    updateScheduledWorkout(
      authedUserId: ID!
      data: UpdateScheduledWorkoutInput!
    ): ScheduledWorkout!
    createLoggedWorkout(
      authedUserId: ID!
      loggedWorkoutData: CreateLoggedWorkoutInput!
    ): LoggedWorkout!
    deepUpdateLoggedWorkout(
      authedUserId: ID!
      loggedWorkoutData: DeepUpdateLoggedWorkoutInput!
    ): LoggedWorkout!
    shallowUpdateLoggedWorkout(
      authedUserId: ID!
      loggedWorkoutData: ShallowUpdateLoggedWorkoutInput!
    ): LoggedWorkout!
    deleteLoggedWorkout(authedUserId: ID!, loggedWorkoutId: ID!): ID!
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

  type GymProfile {
    id: ID!
    name: String!
    description: String
    postcode: String
    user: User!
  }

  input CreateGymProfileInput {
    name: String!
    description: String
    postcode: String
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
    hasOnboarded: Boolean!
    height: Float
    weight: Float
    unitSystem: UnitSystem
    gymProfiles: [GymProfile!]
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
`

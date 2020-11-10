import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON
  scalar DateTime

  type Query {
    checkUniqueDisplayName(displayName: String!): Boolean!
    users(authedUserId: ID!): [User!]!
    moves: [Move!]!
    equipments: [Equipment!]!
    workoutTypes: [WorkoutType!]!
    workoutGoals: [WorkoutGoal]!
    officialWorkouts: [Workout!]!
    privateWorkouts(authedUserId: ID!): [Workout!]!
    publicWorkouts(authedUserId: ID!): [Workout!]!
    officialWorkoutPrograms: [WorkoutProgram!]!
    privateWorkoutPrograms(authedUserId: ID!): [WorkoutProgram!]!
    publicWorkoutPrograms(authedUserId: ID!): [WorkoutProgram!]!
    userByUid(uid: ID!): User
    workoutById(id: ID!): Workout
    workoutProgramById(id: ID!): WorkoutProgram
    likedWorkouts(authedUserId: ID!): [ID!]!
    scheduledWorkouts(authedUserId: ID!): [ScheduledWorkout!]!
    loggedWorkouts(authedUserId: ID!): [LoggedWorkout!]!
  }

  type Mutation {
    createUser(uid: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    createGymProfile(
      authedUserId: ID!
      data: CreateGymProfileInput!
    ): GymProfile!
    updateGymProfile(
      authedUserId: ID!
      data: UpdateGymProfileInput!
    ): GymProfile!
    deleteGymProfileById(authedUserId: ID!, gymProfileId: ID!): ID
    createMoveProfile(
      authedUserId: ID!
      data: CreateMoveProfileInput!
    ): MoveProfile!
    updateMoveProfile(
      authedUserId: ID!
      data: UpdateMoveProfileInput!
    ): MoveProfile!
    createWorkout(authedUserId: ID!, data: CreateWorkoutInput!): Workout!
    shallowUpdateWorkout(
      authedUserId: ID!
      data: ShallowUpdateWorkoutInput!
    ): Workout!
    deepUpdateWorkout(
      authedUserId: ID!
      data: DeepUpdateWorkoutInput!
    ): Workout!
    deleteWorkoutById(authedUserId: ID!, workoutId: ID!): ID
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
      data: CreateLoggedWorkoutInput!
    ): LoggedWorkout!
    deepUpdateLoggedWorkout(
      authedUserId: ID!
      data: DeepUpdateLoggedWorkoutInput!
    ): LoggedWorkout!
    shallowUpdateLoggedWorkout(
      authedUserId: ID!
      data: ShallowUpdateLoggedWorkoutInput!
    ): LoggedWorkout!
    deleteLoggedWorkoutById(authedUserId: ID!, loggedWorkoutId: ID!): ID!
    createWorkoutProgram(
      authedUserId: ID!
      data: CreateWorkoutProgramInput!
    ): WorkoutProgram!
    shallowUpdateWorkoutProgram(
      authedUserId: ID!
      data: ShallowUpdateWorkoutProgramInput!
    ): WorkoutProgram!
    deepUpdateWorkoutProgram(
      authedUserId: ID!
      data: DeepUpdateWorkoutProgramInput!
    ): WorkoutProgram!
    deleteWorkoutProgram(authedUserId: ID!, workoutProgramId: ID!): ID!
    addEnrolmentToWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
    ): WorkoutProgram!
    removeEnrolmentFromWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
    ): WorkoutProgram!
    addReviewToWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
      data: CreateWorkoutProgramReviewInput!
    ): WorkoutProgram!
    removeReviewFromWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
      reviewId: ID!
    ): WorkoutProgram!
  }

  ##### Non user CRUD-able models #####
  type Equipment {
    id: ID!
    name: String!
    imageUrl: String
    loadAdjustable: Boolean!
  }

  type Move {
    id: ID!
    name: String!
    searchTerms: String
    description: String
    demoVideoUrl: String
    type: MoveType!
    validRepTypes: [WorkoutMoveRepType!]!
    requiredEquipments: [Equipment!]!
    selectableEquipments: [Equipment!]!
  }

  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
  }

  ##### User CRUD-able models #####
  type GymProfile {
    id: ID!
    name: String!
    description: String
    postcode: String
    bodyweightOnly: Boolean!
    user: User!
    availableEquipments: [Equipment!]
  }

  input CreateGymProfileInput {
    name: String!
    description: String
    postcode: String
    bodyweightOnly: Boolean
    # List of String (ID) ids to connect.
    availableEquipments: [ID!]
  }

  input UpdateGymProfileInput {
    id: ID!
    name: String
    description: String
    postcode: String
    bodyweightOnly: Boolean
    # List of String (ID) ids to connect.
    availableEquipments: [ID!]
  }

  type MoveProfile {
    id: ID!
    name: String!
    description: String
    user: User!
    requiredMoves: [Move!]
    excludedMoves: [Move!]
  }

  input CreateMoveProfileInput {
    name: String!
    description: String
    requiredMoveIds: [ID!]
    excludedMoveIds: [ID!]
  }

  input UpdateMoveProfileInput {
    id: ID!
    name: String
    description: String
    requiredMoveIds: [ID!]
    excludedMoveIds: [ID!]
  }
`

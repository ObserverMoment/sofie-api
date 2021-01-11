import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON
  scalar DateTime

  type Query {
    # User
    checkUniqueDisplayName(displayName: String!): Boolean!
    userByUid(uid: ID!): User
    userPublicProfile(userId: ID!): UserPublicProfile
    userCustomMoves(authedUserId: ID!): [Move!]!
    userWorkouts(authedUserId: ID!): [Workout!]!
    userWorkoutPrograms(authedUserId: ID!): [WorkoutProgram!]!
    scheduledWorkouts(authedUserId: ID!): [ScheduledWorkout!]!
    loggedWorkouts(authedUserId: ID!): [LoggedWorkout!]!
    progressJournals(authedUserId: ID!): [ProgressJournal!]!
    progressJournalGoalTags(authedUserId: ID!): [ProgressJournalGoalTag!]!
    workoutProgramEnrolmentsByUser(
      authedUserId: ID!
      workoutProgramId: ID!
    ): [WorkoutProgramEnrolment!]
    # Official and Public
    standardMoves: [Move!]!
    bodyAreas: [BodyArea!]!
    equipments: [Equipment!]!
    workoutTypes: [WorkoutType!]!
    workoutGoals: [WorkoutGoal]!
    officialWorkouts: [Workout!]!
    publicWorkouts(authedUserId: ID!): [Workout!]!
    officialWorkoutPrograms: [WorkoutProgram!]!
    publicWorkoutPrograms(authedUserId: ID!): [WorkoutProgram!]!
    creatorPublicProfiles(authedUserId: ID!): [UserPublicProfile!]
    # Get by ID
    progressJournalById(
      authedUserId: ID!
      progressJournalId: ID!
    ): ProgressJournal
    workoutById(authedUserId: ID!, workoutId: ID!): Workout
    workoutProgramById(authedUserId: ID!, workoutProgramId: ID!): WorkoutProgram
    # Text search
    textSearchWorkouts(
      authedUserId: ID!
      text: String!
    ): [TextSearchWorkoutResult!]
    textSearchWorkoutPrograms(
      authedUserId: ID!
      text: String!
    ): [TextSearchWorkoutProgramResult!]
    textSearchCreatorPublicProfiles(
      authedUserId: ID!
      text: String!
    ): [UserPublicProfile!]
  }

  type Mutation {
    # User
    createUser(uid: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    # Progress journal
    createProgressJournal(
      authedUserId: ID!
      data: CreateProgressJournalInput!
    ): ProgressJournal!
    updateProgressJournal(
      authedUserId: ID!
      data: UpdateProgressJournalInput!
    ): ProgressJournal!
    deleteProgressJournalById(authedUserId: ID!, progressJournalId: ID!): ID!
    createProgressJournalGoal(
      authedUserId: ID!
      data: CreateProgressJournalGoalInput!
    ): ProgressJournalGoal!
    updateProgressJournalGoal(
      authedUserId: ID!
      data: UpdateProgressJournalGoalInput!
    ): ProgressJournalGoal!
    deleteProgressJournalGoalById(
      authedUserId: ID!
      progressJournalGoalId: ID!
    ): ID!
    createProgressJournalGoalTag(
      authedUserId: ID!
      data: CreateProgressJournalGoalTagInput!
    ): ProgressJournalGoalTag!
    updateProgressJournalGoalTag(
      authedUserId: ID!
      data: UpdateProgressJournalGoalTagInput!
    ): ProgressJournalGoalTag!
    deleteProgressJournalGoalTagById(
      authedUserId: ID!
      progressJournalGoalTagId: ID!
    ): ID!
    createProgressJournalEntry(
      authedUserId: ID!
      data: CreateProgressJournalEntryInput!
    ): ProgressJournalEntry!
    updateProgressJournalEntry(
      authedUserId: ID!
      data: UpdateProgressJournalEntryInput!
    ): ProgressJournalEntry!
    deleteProgressJournalEntryById(
      authedUserId: ID!
      progressJournalEntryId: ID!
    ): ID!
    # Move
    createMove(authedUserId: ID!, data: CreateMoveInput!): Move
    shallowUpdateMove(authedUserId: ID!, data: ShallowUpdateMoveInput!): Move
    deepUpdateMove(authedUserId: ID!, data: DeepUpdateMoveInput!): Move
    deleteMoveById(authedUserId: ID!, moveId: ID!): ID
    createMoveProfile(
      authedUserId: ID!
      data: CreateMoveProfileInput!
    ): MoveProfile!
    updateMoveProfile(
      authedUserId: ID!
      data: UpdateMoveProfileInput!
    ): MoveProfile!
    # Gym profile
    createGymProfile(
      authedUserId: ID!
      data: CreateGymProfileInput!
    ): GymProfile!
    updateGymProfile(
      authedUserId: ID!
      data: UpdateGymProfileInput!
    ): GymProfile!
    deleteGymProfileById(authedUserId: ID!, gymProfileId: ID!): ID
    # Workout
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
    scheduleWorkout(
      authedUserId: ID!
      data: CreateScheduledWorkoutInput!
    ): ScheduledWorkout!
    unscheduleWorkout(authedUserId: ID!, scheduledWorkoutId: ID!): ID!
    updateScheduledWorkout(
      authedUserId: ID!
      data: UpdateScheduledWorkoutInput!
    ): ScheduledWorkout!
    # Logged workout
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
    deleteLoggedWorkoutById(authedUserId: ID!, loggedWorkoutId: ID!): ID
    # Workout Program
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
    deleteWorkoutProgramById(authedUserId: ID!, workoutProgramId: ID!): ID
    addEnrolmentToWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
    ): WorkoutProgram!
    removeEnrolmentFromWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
      workoutProgramEnrolmentId: ID!
    ): WorkoutProgram!
    addReviewToWorkoutProgram(
      authedUserId: ID!
      workoutProgramId: ID!
      data: CreateWorkoutProgramReviewInput!
    ): WorkoutProgram!
    deleteWorkoutProgramReview(
      authedUserId: ID!
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

  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
    placeholderImageUrl: String
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

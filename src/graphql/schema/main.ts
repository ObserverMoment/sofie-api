import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON
  scalar DateTime

  type Query {
    # User
    checkUniqueDisplayName(displayName: String!): Boolean!
    userByUid(uid: ID!): User
    userPublicProfile(userId: ID!): UserPublicProfile
    userCustomMoves: [Move!]!
    userWorkouts: [Workout!]!
    userWorkoutPrograms: [WorkoutProgram!]!
    scheduledWorkouts: [ScheduledWorkout!]!
    loggedWorkouts: [LoggedWorkout!]!
    progressJournals: [ProgressJournal!]!
    progressJournalGoalTags: [ProgressJournalGoalTag!]!
    userWorkoutProgramEnrolments(
      workoutProgramId: ID!
    ): [WorkoutProgramEnrolment!]
    # Official and Public
    standardMoves: [Move!]!
    bodyAreas: [BodyArea!]!
    equipments: [Equipment!]!
    workoutTypes: [WorkoutType!]!
    moveTypes: [MoveType!]!
    workoutGoals: [WorkoutGoal]!
    officialWorkouts: [Workout!]!
    publicWorkouts: [Workout!]!
    officialWorkoutPrograms: [WorkoutProgram!]!
    publicWorkoutPrograms: [WorkoutProgram!]!
    creatorPublicProfiles: [UserPublicProfile!]
    # Get by ID
    progressJournalById(progressJournalId: ID!): ProgressJournal
    workoutById(workoutId: ID!): Workout
    workoutProgramById(workoutProgramId: ID!): WorkoutProgram
    # Text search
    textSearchWorkouts(text: String!): [TextSearchWorkoutResult!]
    textSearchWorkoutPrograms(text: String!): [TextSearchWorkoutProgramResult!]
    textSearchCreatorPublicProfiles(text: String!): [UserPublicProfile!]
  }

  type Mutation {
    # User
    createUser(uid: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    # Progress journal
    createProgressJournal(data: CreateProgressJournalInput!): ProgressJournal!
    updateProgressJournal(data: UpdateProgressJournalInput!): ProgressJournal!
    deleteProgressJournalById(progressJournalId: ID!): ID!
    createProgressJournalGoal(
      data: CreateProgressJournalGoalInput!
    ): ProgressJournalGoal!
    updateProgressJournalGoal(
      data: UpdateProgressJournalGoalInput!
    ): ProgressJournalGoal!
    deleteProgressJournalGoalById(progressJournalGoalId: ID!): ID!
    createProgressJournalGoalTag(
      data: CreateProgressJournalGoalTagInput!
    ): ProgressJournalGoalTag!
    updateProgressJournalGoalTag(
      data: UpdateProgressJournalGoalTagInput!
    ): ProgressJournalGoalTag!
    deleteProgressJournalGoalTagsById(progressJournalGoalTagIds: [ID!]!): ID!
    createProgressJournalEntry(
      progressJournalId: ID!
      data: CreateProgressJournalEntryInput!
    ): ProgressJournalEntry!
    updateProgressJournalEntry(
      data: UpdateProgressJournalEntryInput!
    ): ProgressJournalEntry!
    deleteProgressJournalEntryById(progressJournalEntryId: ID!): ID!
    #Equipment - Currently no ID is supplied as these resolvers are only accessible via the admin dashboard.
    createEquipment(data: CreateEquipmentInput!): Equipment
    updateEquipment(data: UpdateEquipmentInput!): Equipment
    # Move
    createMove(data: CreateMoveInput!): Move
    shallowUpdateMove(data: ShallowUpdateMoveInput!): Move
    deepUpdateMove(data: DeepUpdateMoveInput!): Move
    deleteMoveById(moveId: ID!): ID
    createMoveProfile(data: CreateMoveProfileInput!): MoveProfile!
    updateMoveProfile(data: UpdateMoveProfileInput!): MoveProfile!
    # Gym profile
    createGymProfile(data: CreateGymProfileInput!): GymProfile!
    updateGymProfile(data: UpdateGymProfileInput!): GymProfile!
    deleteGymProfileById(gymProfileId: ID!): ID
    # Workout
    createWorkout(data: CreateWorkoutInput!): Workout!
    shallowUpdateWorkout(data: ShallowUpdateWorkoutInput!): Workout!
    deepUpdateWorkout(data: DeepUpdateWorkoutInput!): Workout!
    deleteWorkoutById(workoutId: ID!): ID
    scheduleWorkout(data: CreateScheduledWorkoutInput!): ScheduledWorkout!
    unscheduleWorkout(scheduledWorkoutId: ID!): ID!
    updateScheduledWorkout(
      data: UpdateScheduledWorkoutInput!
    ): ScheduledWorkout!
    # Logged workout
    createLoggedWorkout(data: CreateLoggedWorkoutInput!): LoggedWorkout!
    deepUpdateLoggedWorkout(data: DeepUpdateLoggedWorkoutInput!): LoggedWorkout!
    shallowUpdateLoggedWorkout(
      data: ShallowUpdateLoggedWorkoutInput!
    ): LoggedWorkout!
    deleteLoggedWorkoutById(loggedWorkoutId: ID!): ID
    # Workout Program
    createWorkoutProgram(data: CreateWorkoutProgramInput!): WorkoutProgram!
    shallowUpdateWorkoutProgram(
      data: ShallowUpdateWorkoutProgramInput!
    ): WorkoutProgram!
    deepUpdateWorkoutProgram(
      data: DeepUpdateWorkoutProgramInput!
    ): WorkoutProgram!
    deleteWorkoutProgramById(workoutProgramId: ID!): ID
    addEnrolmentToWorkoutProgram(workoutProgramId: ID!): WorkoutProgram!
    removeEnrolmentFromWorkoutProgram(
      workoutProgramId: ID!
      workoutProgramEnrolmentId: ID!
    ): WorkoutProgram!
    addReviewToWorkoutProgram(
      workoutProgramId: ID!
      data: CreateWorkoutProgramReviewInput!
    ): WorkoutProgram!
    deleteWorkoutProgramReview(reviewId: ID!): WorkoutProgram!
  }

  ##### Non user CRUD-able models #####
  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
    placeholderImageUrl: String
  }
`

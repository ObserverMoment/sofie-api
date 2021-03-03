import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON
  scalar DateTime

  type Query {
    # User
    validateToken: Boolean!
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
    workoutSectionTypes: [WorkoutSectionType!]!
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
    updateMove(data: UpdateMoveInput!): Move
    deleteMoveById(moveId: ID!): ID
    # Gym profile
    createGymProfile(data: CreateGymProfileInput!): GymProfile!
    updateGymProfile(data: UpdateGymProfileInput!): GymProfile!
    deleteGymProfileById(gymProfileId: ID!): ID
    # Workout
    createWorkout(data: CreateWorkoutInput!): Workout!
    shallowUpdateWorkout(data: ShallowUpdateWorkoutInput!): Workout!
    deleteWorkoutById(workoutId: ID!): ID
    updateWorkoutSections(
      data: [UpdateWorkoutSectionInput!]!
    ): [WorkoutSection!]!
    deleteWorkoutSectionsById(workoutSectionIds: [ID!]!): [ID]
    ######################
    ### Logged Workout ###
    createLoggedWorkout(data: CreateLoggedWorkoutInput!): LoggedWorkout!
    updateLoggedWorkout(data: UpdateLoggedWorkoutInput!): LoggedWorkout!
    deleteLoggedWorkoutById(id: ID!): ID!
    ### Logged Workout Section ###
    createLoggedWorkoutSection(
      data: CreateLoggedWorkoutSectionInput!
    ): LoggedWorkoutSection!
    updateLoggedWorkoutSection(
      data: UpdateLoggedWorkoutSectionInput!
    ): LoggedWorkoutSection!
    deleteLoggedWorkoutSectionById(id: ID!): ID!
    reorderLoggedWorkoutSections(
      data: [UpdateSortPositionInput!]!
    ): [LoggedWorkoutSection!]!
    ### Logged Workout Set ###
    createLoggedWorkoutSet(
      data: CreateLoggedWorkoutSetInput!
    ): LoggedWorkoutSet!
    updateLoggedWorkoutSet(
      data: UpdateLoggedWorkoutSetInput!
    ): LoggedWorkoutSet!
    deleteLoggedWorkoutSetById(id: ID!): ID!
    reorderLoggedWorkoutSets(
      data: [UpdateSortPositionInput!]!
    ): [LoggedWorkoutSet!]!
    ### Logged Workout Move ###
    createLoggedWorkoutMove(
      data: CreateLoggedWorkoutMoveInput!
    ): LoggedWorkoutMove!
    updateLoggedWorkoutMove(
      data: UpdateLoggedWorkoutMoveInput!
    ): LoggedWorkoutMove!
    deleteLoggedWorkoutMoveById(id: ID!): ID!
    reorderLoggedWorkoutMoves(
      data: [UpdateSortPositionInput!]!
    ): [LoggedWorkoutMove!]!

    # Schedule Workout
    scheduleWorkout(data: CreateScheduledWorkoutInput!): ScheduledWorkout!
    unscheduleWorkout(scheduledWorkoutId: ID!): ID!
    updateScheduledWorkout(
      data: UpdateScheduledWorkoutInput!
    ): ScheduledWorkout!
    # Workout Program
    createWorkoutProgram(data: CreateWorkoutProgramInput!): WorkoutProgram!
    updateWorkoutProgram(data: UpdateWorkoutProgramInput!): WorkoutProgram!
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

  ##### Non CRUD-able models #####
  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
    imageUri: String
  }

  type WorkoutSectionType {
    id: ID!
    name: String!
    subtitle: String!
    description: String!
    imageUri: String!
    scoreType: WorkoutScoreType
    WorkoutSections: [WorkoutSection!]!
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
  }

  input UpdateSortPositionInput {
    id: ID!
    sortPosition: Int!
  }
`

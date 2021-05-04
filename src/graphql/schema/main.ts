import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime

  type Query {
    validateToken: Boolean!
    #### Core Data ####
    bodyAreas: [BodyArea!]!
    equipments: [Equipment!]!
    moveTypes: [MoveType!]!
    workoutGoals: [WorkoutGoal!]!
    workoutSectionTypes: [WorkoutSectionType!]!
    #### Logged Workouts ####
    userLoggedWorkouts: [LoggedWorkout!]!
    #### Moves ####
    standardMoves: [Move!]!
    userCustomMoves: [Move!]!
    #### Progress Journal ####
    userProgressJournals: [ProgressJournal!]!
    progressJournalById(progressJournalId: ID!): ProgressJournal!
    progressJournalGoalTags: [ProgressJournalGoalTag!]!
    #### Scheduled Workouts ####
    userScheduledWorkouts: [ScheduledWorkout!]!
    #### Text Search ####
    textSearchWorkouts(text: String!): [TextSearchWorkoutResult!]
    textSearchWorkoutPrograms(text: String!): [TextSearchWorkoutProgramResult!]
    textSearchCreatorPublicProfiles(text: String!): [UserPublicProfile!]
    #### User ####
    checkUniqueDisplayName(displayName: String!): Boolean!
    authedUser: User!
    gymProfiles: [GymProfile!]!
    userWorkoutTags: [WorkoutTag!]!
    #### User Public Profiles ####
    userPublicProfiles: [UserPublicProfile!]
    userPublicProfileByUserId(userId: ID!): UserPublicProfile!
    #### Workouts ####
    officialWorkouts: [Workout!]!
    publicWorkouts: [Workout!]!
    userWorkouts: [Workout!]!
    workoutById(id: ID!): Workout!
    #### Workout Programs and Enrolments ####
    officialWorkoutPrograms: [WorkoutProgram!]!
    publicWorkoutPrograms: [WorkoutProgram!]!
    workoutProgramById(id: ID!): WorkoutProgram!
    userWorkoutPrograms: [WorkoutProgram!]!
    userWorkoutProgramEnrolments(
      workoutProgramId: ID!
    ): [WorkoutProgramEnrolment!]
  }

  type Mutation {
    #### Equipment ####
    createEquipment(data: CreateEquipmentInput!): Equipment
    updateEquipment(data: UpdateEquipmentInput!): Equipment
    #### Gym profile ####
    createGymProfile(data: CreateGymProfileInput!): GymProfile!
    updateGymProfile(data: UpdateGymProfileInput!): GymProfile!
    deleteGymProfileById(id: ID!): ID
    #### Progress Journal ####
    createProgressJournal(data: CreateProgressJournalInput!): ProgressJournal!
    updateProgressJournal(data: UpdateProgressJournalInput!): ProgressJournal!
    deleteProgressJournalById(id: ID!): ID!
    #### Progress Journal Entry ####
    createProgressJournalEntry(
      data: CreateProgressJournalEntryInput!
    ): ProgressJournalEntry!
    updateProgressJournalEntry(
      data: UpdateProgressJournalEntryInput!
    ): ProgressJournalEntry!
    deleteProgressJournalEntryById(id: ID!): ID!
    #### Progress Journal Goal ####
    createProgressJournalGoal(
      data: CreateProgressJournalGoalInput!
    ): ProgressJournalGoal!
    updateProgressJournalGoal(
      data: UpdateProgressJournalGoalInput!
    ): ProgressJournalGoal!
    deleteProgressJournalGoalById(id: ID!): ID!
    #### Progress Journal Goal Tag ####
    createProgressJournalGoalTag(
      data: CreateProgressJournalGoalTagInput!
    ): ProgressJournalGoalTag!
    updateProgressJournalGoalTag(
      data: UpdateProgressJournalGoalTagInput!
    ): ProgressJournalGoalTag!
    deleteProgressJournalGoalTagById(id: ID!): ID!
    ########################
    #### Logged Workout ####
    createLoggedWorkout(data: CreateLoggedWorkoutInput!): LoggedWorkout!
    updateLoggedWorkout(data: UpdateLoggedWorkoutInput!): LoggedWorkout!
    deleteLoggedWorkoutById(id: ID!): ID!
    #### Logged Workout Section ####
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
    #### Logged Workout Set ####
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
    #### Logged Workout Move ####
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
    ### Move ###
    createMove(data: CreateMoveInput!): Move!
    updateMove(data: UpdateMoveInput!): Move!
    softDeleteMoveById(id: ID!): ID!
    #### Schedule Workout ####
    createScheduledWorkout(
      data: CreateScheduledWorkoutInput!
    ): ScheduledWorkout!
    updateScheduledWorkout(
      data: UpdateScheduledWorkoutInput!
    ): ScheduledWorkout!
    deleteScheduledWorkoutById(id: ID!): ID!
    #### User ####
    updateUser(data: UpdateUserInput!): User!
    createWorkoutTag(data: CreateWorkoutTagInput!): WorkoutTag!
    #################
    #### Workout ####
    makeCopyWorkoutById(id: ID!): Workout! # Note: Media should not be copied
    createWorkout(data: CreateWorkoutInput!): Workout!
    updateWorkout(data: UpdateWorkoutInput!): Workout!
    duplicateWorkoutById(id: ID!): Workout!
    softDeleteWorkoutById(id: ID!): ID
    #### Workout Section ####
    createWorkoutSection(data: CreateWorkoutSectionInput!): WorkoutSection!
    updateWorkoutSection(data: UpdateWorkoutSectionInput!): WorkoutSection!
    deleteWorkoutSectionById(id: ID!): ID!
    reorderWorkoutSections(
      data: [UpdateSortPositionInput!]!
    ): [SortPositionUpdated!]!
    #### Workout Set ####
    createWorkoutSet(data: CreateWorkoutSetInput!): WorkoutSet!
    updateWorkoutSet(data: UpdateWorkoutSetInput!): WorkoutSet!
    duplicateWorkoutSetById(id: ID!): WorkoutSet!
    deleteWorkoutSetById(id: ID!): ID!
    reorderWorkoutSets(
      data: [UpdateSortPositionInput!]!
    ): [SortPositionUpdated!]!
    createWorkoutSetIntervalBuyIn(
      data: CreateWorkoutSetIntervalBuyInInput!
    ): WorkoutSetIntervalBuyIn!
    updateWorkoutSetIntervalBuyIn(
      data: UpdateWorkoutSetIntervalBuyInInput!
    ): WorkoutSetIntervalBuyIn!
    deleteWorkoutSetIntervalBuyInById(id: ID!): ID!
    createWorkoutSetGenerator(
      data: CreateWorkoutSetGeneratorInput!
    ): WorkoutSetGenerator!
    updateWorkoutSetGenerator(
      data: UpdateWorkoutSetGeneratorInput!
    ): WorkoutSetGenerator!
    deleteWorkoutSetGeneratorById(id: ID!): ID!
    #### Workout Move ####
    createWorkoutMove(data: CreateWorkoutMoveInput!): WorkoutMove!
    updateWorkoutMove(data: UpdateWorkoutMoveInput!): WorkoutMove!
    deleteWorkoutMoveById(id: ID!): ID!
    duplicateWorkoutMoveById(id: ID!): WorkoutMove!
    reorderWorkoutMoves(
      data: [UpdateSortPositionInput!]!
    ): [SortPositionUpdated!]!
    #########################
    #### Workout Program ####
    createWorkoutProgram(data: CreateWorkoutProgramInput!): WorkoutProgram!
    updateWorkoutProgram(data: UpdateWorkoutProgramInput!): WorkoutProgram!
    softDeleteWorkoutProgramById(id: ID!): ID!
    #### Workout Program Workout ####
    createWorkoutProgramWorkout(
      data: CreateWorkoutProgramWorkoutInput!
    ): WorkoutProgramWorkout!
    updateWorkoutProgramWorkout(
      data: UpdateWorkoutProgramWorkoutInput!
    ): WorkoutProgramWorkout!
    deleteWorkoutProgramWorkoutById(id: ID!): ID!
    #### Workout Program Enrolment ####
    createWorkoutProgramEnrolment(
      workoutProgramId: ID!
    ): WorkoutProgramEnrolment!
    deleteWorkoutProgramEnrolmentById(id: ID!): ID!
    #### Workout Program Review ####
    createWorkoutProgramReview(
      data: CreateWorkoutProgramReviewInput!
    ): WorkoutProgramReview!
    updateWorkoutProgramReview(
      data: UpdateWorkoutProgramReviewInput!
    ): WorkoutProgramReview!
    deleteWorkoutProgramReviewById(id: ID!): ID!
  }

  type SortPositionUpdated {
    id: ID!
    sortPosition: Int!
  }

  input UpdateSortPositionInput {
    id: ID!
    sortPosition: Int!
  }

  # Only the id is required to create a relationship connection with an existing model.
  input ConnectRelationInput {
    id: ID!
  }
`

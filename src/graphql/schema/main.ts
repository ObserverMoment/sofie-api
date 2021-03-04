import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON
  scalar DateTime

  type Query {
    #### Core Data ####
    bodyAreas: [BodyArea!]!
    equipments: [Equipment!]!
    moveTypes: [MoveType!]!
    workoutGoals: [WorkoutGoal]!
    workoutSectionTypes: [WorkoutSectionType!]!

    #### Progress Journal ####
    progressJournals: [ProgressJournal!]!
    progressJournalById(progressJournalId: ID!): ProgressJournal!
    progressJournalGoalTags: [ProgressJournalGoalTag!]!

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

    userWorkoutProgramEnrolments(
      workoutProgramId: ID!
    ): [WorkoutProgramEnrolment!]
    # Official and Public
    standardMoves: [Move!]!

    officialWorkouts: [Workout!]!
    publicWorkouts: [Workout!]!
    officialWorkoutPrograms: [WorkoutProgram!]!
    publicWorkoutPrograms: [WorkoutProgram!]!
    creatorPublicProfiles: [UserPublicProfile!]
    # Get by ID

    workoutById(workoutId: ID!): Workout
    workoutProgramById(workoutProgramId: ID!): WorkoutProgram
    # Text search
    textSearchWorkouts(text: String!): [TextSearchWorkoutResult!]
    textSearchWorkoutPrograms(text: String!): [TextSearchWorkoutProgramResult!]
    textSearchCreatorPublicProfiles(text: String!): [UserPublicProfile!]
  }

  type Mutation {
    #### Equipment ####
    createEquipment(data: CreateEquipmentInput!): Equipment
    updateEquipment(data: UpdateEquipmentInput!): Equipment

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

    # User
    createUser(uid: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!

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
    ############
    ### Move ###
    createMove(data: CreateMoveInput!): Move!
    updateMove(data: UpdateMoveInput!): Move!
    deleteMoveById(id: ID!): ID!

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

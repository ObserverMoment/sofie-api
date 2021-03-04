import { gql } from 'apollo-server-express'

export default gql`
  scalar JSON
  scalar DateTime

  type Query {
    validateToken: Boolean!
    #### Core Data ####
    bodyAreas: [BodyArea!]!
    equipments: [Equipment!]!
    moveTypes: [MoveType!]!
    workoutGoals: [WorkoutGoal]!
    workoutSectionTypes: [WorkoutSectionType!]!
    #### Logged Workouts ####
    loggedWorkouts: [LoggedWorkout!]!
    #### Moves ####
    standardMoves: [Move!]!
    userCustomMoves: [Move!]!
    #### Progress Journal ####
    progressJournals: [ProgressJournal!]!
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
    userByUid(uid: ID!): User!
    #### User Public Profiles ####
    userPublicProfiles: [UserPublicProfile!]
    userPublicProfileByUserId(userId: ID!): UserPublicProfile!
    #### Workouts ####
    officialWorkouts: [Workout!]!
    publicWorkouts: [Workout!]!
    userWorkouts: [Workout!]!
    workoutById(workoutId: ID!): Workout!
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
    deleteMoveById(id: ID!): ID!
    #### Schedule Workout ####
    createScheduledWorkout(
      data: CreateScheduledWorkoutInput!
    ): ScheduledWorkout!
    updateScheduledWorkout(
      data: UpdateScheduledWorkoutInput!
    ): ScheduledWorkout!
    deleteScheduledWorkoutById(id: ID!): ID!
    #### User ####
    createUser(uid: ID!): User!
    updateUser(data: UpdateUserInput!): User!
    #################
    #### Workout ####
    createWorkout(data: CreateWorkoutInput!): Workout!
    shallowUpdateWorkout(data: ShallowUpdateWorkoutInput!): Workout!
    deleteWorkoutById(id: ID!): ID
    updateWorkoutSections(
      data: [UpdateWorkoutSectionInput!]!
    ): [WorkoutSection!]!
    deleteWorkoutSectionsById(workoutSectionIds: [ID!]!): [ID]
    #########################
    #### Workout Program ####
    createWorkoutProgram(data: CreateWorkoutProgramInput!): WorkoutProgram!
    updateWorkoutProgram(data: UpdateWorkoutProgramInput!): WorkoutProgram!
    deleteWorkoutProgramById(id: ID!): ID!
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

  #### Non CRUD-able models ####
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

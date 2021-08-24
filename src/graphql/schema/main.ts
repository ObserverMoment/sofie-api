import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime
  scalar JSON

  type Query {
    validateToken: Boolean!
    #### Core Data ####
    bodyAreas: [BodyArea!]!
    equipments: [Equipment!]!
    moveTypes: [MoveType!]!
    workoutGoals: [WorkoutGoal!]!
    workoutSectionTypes: [WorkoutSectionType!]!
    #### Clubs ####
    userClubs: [Club!]!
    clubById(id: ID!): Club!
    #### Discover Pages and Types ####
    discoverFeatured: [DiscoverFeatured!]!
    discoverWorkoutCategories: [DiscoverWorkoutCategory!]!
    discoverWorkoutPlanCategories: [DiscoverWorkoutPlanCategory!]!
    #### Invite Tokens ####
    # The ID is the token string, we pass it to check that it is valid #
    checkClubInviteToken(id: ID!): CheckClubInviteTokenResult!
    #### Logged Workouts ####
    userLoggedWorkouts(take: Int): [LoggedWorkout!]!
    loggedWorkoutById(id: ID!): LoggedWorkout!
    #### Moves ####
    standardMoves: [Move!]!
    userCustomMoves: [Move!]!
    #### Progress Journal ####
    bodyTransformationPhotos: [BodyTransformationPhoto!]!
    userProgressJournals: [ProgressJournal!]!
    progressJournalById(id: ID!): ProgressJournal!
    progressJournalGoalTags: [ProgressJournalGoalTag!]!
    #### Scheduled Workouts ####
    userScheduledWorkouts: [ScheduledWorkout!]!
    #### Text Search ####
    textSearchWorkouts(text: String!): [Workout!]
    textSearchWorkoutNames(text: String!): [TextSearchResult!]
    textSearchWorkoutPlans(text: String!): [WorkoutPlan!]
    textSearchWorkoutPlanNames(text: String!): [TextSearchResult!]
    textSearchUserPublicProfiles(text: String!): [UserPublicProfile!]
    textSearchUserPublicNames(text: String!): [TextSearchResult!]
    #### Timeline Feed ####
    # Gets DB objects referenced in getStream activities (posts) and maps fields to those required for displaying in a timeline or feed #
    timelinePostsData(
      postDataRequests: [TimelinePostDataRequestInput!]!
    ): [TimelinePostData!]!
    #### User ####
    authedUser: User!
    checkUniqueDisplayName(displayName: String!): Boolean!
    gymProfiles: [GymProfile!]!
    userWorkoutTags: [WorkoutTag!]!
    #### User Avatars ####
    userAvatars(ids: [ID!]!): [UserAvatarData!]!
    userAvatarById(id: ID!): UserAvatarData!
    #### UserBenchmark (aka Personal Best) ####
    userBenchmarks: [UserBenchmark!]!
    userBenchmarkById(id: ID!): UserBenchmark!
    userBenchmarkTags: [UserBenchmarkTag!]!
    #### UserCollection ####
    userCollections: [Collection!]!
    userCollectionById(id: ID!): Collection!
    #### User Public Profiles ####
    userPublicProfiles(cursor: ID, take: Int): [UserPublicProfileSummary!]!
    userPublicProfileById(userId: ID!): UserPublicProfile!
    #### Workouts ####
    publicWorkouts(
      cursor: ID
      filters: WorkoutFiltersInput
      take: Int
    ): [Workout!]!
    userWorkouts: [Workout!]!
    workoutById(id: ID!): Workout!
    #### Workout Programs and Enrolments ####
    publicWorkoutPlans(
      cursor: ID
      filters: WorkoutPlanFiltersInput
      take: Int
    ): [WorkoutPlan!]!
    workoutPlanById(id: ID!): WorkoutPlan!
    userWorkoutPlans: [WorkoutPlan!]!
    userWorkoutPlanEnrolments: [WorkoutPlanEnrolment!]!
    userWorkoutPlanEnrolmentById(id: ID!): WorkoutPlanEnrolment!
  }

  type Mutation {
    #### Club ####
    createClub(data: CreateClubInput!): Club!
    updateClub(data: UpdateClubInput!): Club!
    deleteClubById(id: ID!): ID!
    createClubInviteToken(data: CreateClubInviteTokenInput!): ClubInviteToken!
    updateClubInviteToken(data: UpdateClubInviteTokenInput!): ClubInviteToken!
    deleteClubInviteTokenById(id: ID!): ID!
    addUserToClubViaInviteToken(userId: ID!, clubInviteTokenId: ID!): Club!
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
    createBodyTransformationPhotos(
      data: [CreateBodyTransformationPhotoInput!]!
    ): [BodyTransformationPhoto!]!
    updateBodyTransformationPhoto(
      data: UpdateBodyTransformationPhotoInput!
    ): BodyTransformationPhoto!
    deleteBodyTransformationPhotosById(ids: [ID!]!): [ID!]!
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
    updateWorkoutTag(data: UpdateWorkoutTagInput!): WorkoutTag!
    deleteWorkoutTagById(id: ID!): ID!
    #### User Benchmark ####
    createUserBenchmark(data: CreateUserBenchmarkInput!): UserBenchmark!
    updateUserBenchmark(data: UpdateUserBenchmarkInput!): UserBenchmark!
    deleteUserBenchmarkById(id: ID!): ID!
    createUserBenchmarkEntry(
      data: CreateUserBenchmarkEntryInput!
    ): UserBenchmarkEntry!
    updateUserBenchmarkEntry(
      data: UpdateUserBenchmarkEntryInput!
    ): UserBenchmarkEntry!
    deleteUserBenchmarkEntryById(id: ID!): ID!
    #### User Benchmark Tag ####
    createUserBenchmarkTag(
      data: CreateUserBenchmarkTagInput!
    ): UserBenchmarkTag!
    updateUserBenchmarkTag(
      data: UpdateUserBenchmarkTagInput!
    ): UserBenchmarkTag!
    deleteUserBenchmarkTagById(id: ID!): ID!
    #### User Collection ####
    createCollection(data: CreateCollectionInput!): Collection!
    updateCollection(data: UpdateCollectionInput!): Collection!
    deleteCollectionById(id: ID!): ID!
    addWorkoutToCollection(data: AddWorkoutToCollectionInput!): Collection!
    removeWorkoutFromCollection(
      data: RemoveWorkoutFromCollectionInput!
    ): Collection!
    addWorkoutPlanToCollection(
      data: AddWorkoutPlanToCollectionInput!
    ): Collection!
    removeWorkoutPlanFromCollection(
      data: RemoveWorkoutPlanFromCollectionInput!
    ): Collection!
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
    ######################
    #### Workout Plan ####
    createWorkoutPlan(data: CreateWorkoutPlanInput!): WorkoutPlan!
    updateWorkoutPlan(data: UpdateWorkoutPlanInput!): WorkoutPlan!
    moveWorkoutPlanDayToAnotherDay(
      data: MoveWorkoutPlanDayToAnotherDayInput!
    ): WorkoutPlanDay!
    copyWorkoutPlanDayToAnotherDay(
      data: CopyWorkoutPlanDayToAnotherDayInput!
    ): WorkoutPlanDay!
    softDeleteWorkoutPlanById(id: ID!): ID!
    #### Workout Plan Day ####
    createWorkoutPlanDayWithWorkout(
      data: CreateWorkoutPlanDayWithWorkoutInput!
    ): WorkoutPlanDay!
    updateWorkoutPlanDay(data: UpdateWorkoutPlanDayInput!): WorkoutPlanDay!
    deleteWorkoutPlanDaysById(ids: [ID!]!): [ID!]!
    #### Workout Plan Day Workout ####
    createWorkoutPlanDayWorkout(
      data: CreateWorkoutPlanDayWorkoutInput!
    ): WorkoutPlanDayWorkout!
    updateWorkoutPlanDayWorkout(
      data: UpdateWorkoutPlanDayWorkoutInput!
    ): WorkoutPlanDayWorkout!
    deleteWorkoutPlanDayWorkoutById(id: ID!): ID!
    reorderWorkoutPlanDayWorkouts(
      data: [UpdateSortPositionInput!]!
    ): [SortPositionUpdated!]!
    #### Workout Plan Enrolment ####
    createWorkoutPlanEnrolment(workoutPlanId: ID!): WorkoutPlanEnrolment!
    updateWorkoutPlanEnrolment(
      data: UpdateWorkoutPlanEnrolmentInput!
    ): WorkoutPlanEnrolment!
    deleteWorkoutPlanEnrolmentById(id: ID!): ID!
    #### Workout Plan Review ####
    createWorkoutPlanReview(
      data: CreateWorkoutPlanReviewInput!
    ): WorkoutPlanReview!
    updateWorkoutPlanReview(
      data: UpdateWorkoutPlanReviewInput!
    ): WorkoutPlanReview!
    deleteWorkoutPlanReviewById(id: ID!): ID!
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

  # For results that return as the user is typing - just the name is displayed. ID is used on click to open up full details.
  type TextSearchResult {
    id: ID!
    name: String!
  }
`

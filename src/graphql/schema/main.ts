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
    checkUniqueClubName(name: String!): Boolean!
    # Public club summary data for use displaying chat previews.
    clubSummariesById(ids: [ID!]!): [ClubSummary!]!
    # ClubFinder functionality.
    publicClubs: [ClubSummary!]!
    userClubs: [ClubSummary!]!
    clubById(id: ID!): Club!
    #### Invite Tokens ####
    # The ID is the token string, we pass it to check that it is valid #
    checkClubInviteToken(id: ID!): CheckClubInviteTokenResult!
    #### Logged Workouts ####
    logCountByWorkout(id: ID!): Int!
    lifetimeLogStatsSummary(userId: ID!): LifetimeLogStatsSummary!
    userLoggedWorkouts(take: Int): [LoggedWorkout!]!
    loggedWorkoutById(id: ID!): LoggedWorkout!
    #### Moves ####
    standardMoves: [Move!]!
    userCustomMoves: [Move!]!
    #### Progress Journal ####
    bodyTrackingEntries: [BodyTrackingEntry!]!
    userProgressJournals: [ProgressJournal!]!
    progressJournalById(id: ID!): ProgressJournal!
    progressJournalGoalTags: [ProgressJournalGoalTag!]!
    #### Scheduled Workouts ####
    userScheduledWorkouts: [ScheduledWorkout!]!
    #### Text Search ####
    textSearchWorkouts(text: String!): [WorkoutSummary!]
    textSearchWorkoutNames(text: String!): [TextSearchResult!]
    textSearchWorkoutPlans(text: String!): [WorkoutPlanSummary!]
    textSearchWorkoutPlanNames(text: String!): [TextSearchResult!]
    textSearchUserProfiles(text: String!): [UserProfileSummary!]
    textSearchUserNames(text: String!): [TextSearchResult!]
    #### Timeline Feed ####
    # Gets DB objects referenced in getStream activities (posts) and maps fields to those required for displaying in a timeline or feed #
    timelinePostsData(
      postDataRequests: [TimelinePostDataRequestInput!]!
    ): [TimelinePostObjectData!]!
    clubMembersFeedPosts(
      clubId: ID!
      limit: Int!
      offset: Int!
    ): [TimelinePostFullData!]!
    #### User ####
    checkUniqueDisplayName(displayName: String!): Boolean!
    gymProfiles: [GymProfile!]!
    userWorkoutTags: [WorkoutTag!]!
    #### User Archive ####
    userArchivedWorkouts: [Workout!]!
    userArchivedWorkoutPlans: [WorkoutPlan!]!
    userArchivedCustomMoves: [Move!]!
    #### User Avatars ####
    userAvatars(ids: [ID!]!): [UserAvatarData!]!
    userAvatarById(id: ID!): UserAvatarData!
    #### User Benchmark (aka Personal Best) ####
    userBenchmarks: [UserBenchmark!]!
    userBenchmarkById(id: ID!): UserBenchmark!
    userBenchmarkTags: [UserBenchmarkTag!]!
    #### User Collection ####
    userCollections: [Collection!]!
    userCollectionById(id: ID!): Collection!
    #### User Public Profiles ####
    userProfiles(cursor: ID, take: Int): [UserProfileSummary!]!
    userProfileById(userId: ID!): UserProfile!
    #### Workouts ####
    publicWorkouts(
      cursor: ID
      filters: WorkoutFiltersInput
      take: Int
    ): [WorkoutSummary!]!
    userWorkouts: [WorkoutSummary!]! # Authed user.
    userPublicWorkouts(userId: ID!): [WorkoutSummary!]! # Public users (profiles).
    workoutById(id: ID!): Workout!
    #### Workout Plans ####
    publicWorkoutPlans(
      cursor: ID
      filters: WorkoutPlanFiltersInput
      take: Int
    ): [WorkoutPlanSummary!]!
    workoutPlanById(id: ID!): WorkoutPlan!
    userWorkoutPlans: [WorkoutPlanSummary!]! # Authed user.
    userPublicWorkoutPlans(userId: ID!): [WorkoutPlanSummary!]! # Public users (profiles).
    #### Workout Plan Enrolments ####
    workoutPlanEnrolmentById(id: ID!): WorkoutPlanEnrolmentWithPlan!
    workoutPlanEnrolments: [WorkoutPlanEnrolmentSummary!]!
  }

  type Mutation {
    #### Archive ####
    archiveWorkoutById(id: ID!): Workout!
    unarchiveWorkoutById(id: ID!): Workout!
    archiveWorkoutPlanById(id: ID!): WorkoutPlan!
    unarchiveWorkoutPlanById(id: ID!): WorkoutPlan!
    archiveCustomMoveById(id: ID!): Move!
    unarchiveCustomMoveById(id: ID!): Move!
    #### Club ####
    createClub(data: CreateClubInput!): Club!
    updateClub(data: UpdateClubInput!): Club!
    deleteClubById(id: ID!): ID!
    createClubInviteToken(data: CreateClubInviteTokenInput!): ClubInviteToken!
    updateClubInviteToken(data: UpdateClubInviteTokenInput!): ClubInviteToken!
    deleteClubInviteTokenById(id: ID!): ID!
    #### Club Member Management ####
    # Handle authed user request join join a public club.
    userJoinPublicClub(clubId: ID!): ID! # Club ID
    giveMemberAdminStatus(userId: ID!, clubId: ID!): Club!
    removeMemberAdminStatus(userId: ID!, clubId: ID!): Club!
    addUserToClubViaInviteToken(userId: ID!, clubInviteTokenId: ID!): Club!
    removeUserFromClub(userToRemoveId: ID!, clubId: ID!): Club!
    #### Club Content Management ####
    addWorkoutToClub(workoutId: ID!, clubId: ID!): Club!
    removeWorkoutFromClub(workoutId: ID!, clubId: ID!): Club!
    addWorkoutPlanToClub(workoutPlanId: ID!, clubId: ID!): Club!
    removeWorkoutPlanFromClub(workoutPlanId: ID!, clubId: ID!): Club!
    #### Club Timeline Post ####
    createClubTimelinePost(
      data: CreateClubTimelinePostInput!
    ): TimelinePostFullData!
    deleteClubTimelinePost(activityId: ID!): ID! # The Stream activity ID.
    #### Equipment ####
    createEquipment(data: CreateEquipmentInput!): Equipment
    updateEquipment(data: UpdateEquipmentInput!): Equipment
    #### Gym profile ####
    createGymProfile(data: CreateGymProfileInput!): GymProfile!
    updateGymProfile(data: UpdateGymProfileInput!): GymProfile!
    deleteGymProfileById(id: ID!): ID
    #### Progress Body Tracking ####
    createBodyTrackingEntry(
      data: CreateBodyTrackingEntryInput!
    ): BodyTrackingEntry!
    updateBodyTrackingEntry(
      data: UpdateBodyTrackingEntryInput!
    ): BodyTrackingEntry!
    deleteBodyTrackingEntryById(id: ID!): ID!
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
    updateLoggedWorkoutSection(
      data: UpdateLoggedWorkoutSectionInput!
    ): LoggedWorkoutSection!
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
    updateUserProfile(data: UpdateUserProfileInput!): UpdateUserProfileResult!
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
    #### User Skills and Certifications ####
    createSkill(data: CreateSkillInput!): Skill!
    updateSkill(data: UpdateSkillInput!): Skill!
    deleteSkillById(id: ID!): ID!
    addDocumentToSkill(data: AddDocumentToSkillInput!): Skill!
    removeDocumentFromSkill(data: RemoveDocumentFromSkillInput!): Skill!
    #################
    #### Workout ####
    makeCopyWorkoutById(id: ID!): Workout! # Note: Media should not be copied
    createWorkout(data: CreateWorkoutInput!): Workout!
    updateWorkout(data: UpdateWorkoutInput!): Workout!
    duplicateWorkoutById(id: ID!): Workout!
    #### Workout Section ####
    createWorkoutSection(data: CreateWorkoutSectionInput!): WorkoutSection!
    updateWorkoutSection(data: UpdateWorkoutSectionInput!): WorkoutSection!
    deleteWorkoutSectionById(id: ID!): ID!
    reorderWorkoutSections(
      data: [UpdateSortPositionInput!]!
    ): [SortPositionUpdated!]!
    #### Workout Set ####
    createWorkoutSetWithWorkoutMoves(
      data: CreateWorkoutSetWithWorkoutMovesInput!
    ): WorkoutSet!
    createWorkoutSet(data: CreateWorkoutSetInput!): WorkoutSet!
    updateWorkoutSet(data: UpdateWorkoutSetInput!): WorkoutSet!
    duplicateWorkoutSetById(id: ID!): WorkoutSet!
    deleteWorkoutSetById(id: ID!): ID!
    reorderWorkoutSets(
      data: [UpdateSortPositionInput!]!
    ): [SortPositionUpdated!]!
    #### Workout Move ####
    createWorkoutMove(data: CreateWorkoutMoveInput!): WorkoutMove!
    updateWorkoutMove(data: UpdateWorkoutMoveInput!): WorkoutMove!
    updateWorkoutMoves(data: [UpdateWorkoutMoveInput!]!): [WorkoutMove!]!
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
    createWorkoutPlanEnrolment(
      workoutPlanId: ID!
    ): WorkoutPlanEnrolmentWithPlan!
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

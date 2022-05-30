import { gql } from 'apollo-server-express'

export default gql`
  scalar DateTime
  scalar JSON

  type Query {
    #### ADMIN ONLY QUERIES ####
    # User Data Analysis #
    # Content Requiring Validation #
    adminPublicClubCounts: PublicClubCountsAdmin!
    adminPublicClubSummaries(
      status: PublicContentValidationStatus!
    ): [PublicClubSummaryAdmin!]!
    adminPublicClubById(id: ID!): ClubWithMetaDataAdmin!
    # User Data Analysis #
    adminAllUsers: [UserProfileSummary!]!
    #### Standard Benchmarks + Scores ####
    adminStandardFitnessBenchmarks: [FitnessBenchmark!]!
    adminStandardFitnessBenchmarkWorkouts: [FitnessBenchmarkWorkout!]!
    #### END OF ADMIN ONLY QUERIES ####
    announcementUpdates: [AnnouncementUpdate!]!
    welcomeTodoItems: [WelcomeTodoItem!]!
    validateToken: Boolean!
    #### Core Data ####
    coreData: CoreData!
    #### Clubs ####
    checkUniqueClubName(name: String!): Boolean!
    checkUserClubMemberStatus(clubId: ID!): UserClubMemberStatus!
    clubSummaries(ids: [ID!]!): [ClubSummary!]!
    # ClubFinder functionality.
    publicClubs: [ClubSummary!]!
    userClubs: [ClubSummary!]!
    clubSummary(id: ID!): ClubSummary
    clubInviteTokens(clubId: ID!): ClubInviteTokens!
    # For displaying within the Club/People section. Each person is a ClubMemberSummary
    clubMembers(clubId: ID!): ClubMembers!
    clubWorkouts(clubId: ID!): ClubWorkouts!
    clubWorkoutPlans(clubId: ID!): ClubWorkoutPlans!
    #### Club Member Notes ####
    clubMemberNotes(
      clubId: ID!
      memberId: ID!
      cursor: ID
      take: Int
    ): [ClubMemberNote!]!
    #### Invite Tokens ####
    # The ID is the token string, we pass it to check that it is valid #
    checkClubInviteToken(id: ID!): CheckClubInviteTokenResult!
    #### Logged Workouts ####
    logCountByWorkout(id: ID!): Int!
    lifetimeLogStatsSummary(userId: ID!): LifetimeLogStatsSummary!
    userLoggedWorkouts: [LoggedWorkout!]!
    loggedWorkoutById(id: ID!): LoggedWorkout
    #### User Custom Moves ####
    customMoves: [Move!]!
    #### Standard + Custom Benchmarks + User Scores ####
    userFitnessBenchmarks: [FitnessBenchmark!]!
    #### User Progress Tracking ####
    userGoals: [UserGoal!]!
    bodyTrackingEntries: [BodyTrackingEntry!]!
    userDayLogMoods: [UserDayLogMood!]!
    userMeditationLogs: [UserMeditationLog!]!
    userEatWellLogs: [UserEatWellLog!]!
    userSleepWellLogs: [UserSleepWellLog!]!
    #### User Recently Viewed ####
    userRecentlyViewedObjects: [UserRecentlyViewedObject!]!
    #### Scheduled Workouts ####
    userScheduledWorkouts: [ScheduledWorkout!]!
    #### Text Search - PROBABLY DEPRECATED ####
    textSearchWorkouts(text: String!): [WorkoutSummary!]
    textSearchWorkoutNames(text: String!): [TextSearchResult!]
    textSearchWorkoutPlans(text: String!): [WorkoutPlanSummary!]
    textSearchWorkoutPlanNames(text: String!): [TextSearchResult!]
    textSearchUserProfiles(text: String!): [UserProfileSummary!]
    textSearchUserNames(text: String!): [TextSearchResult!]
    #### User ####
    checkUniqueDisplayName(displayName: String!): Boolean!
    gymProfiles: [GymProfile!]!
    userWorkoutTags: [WorkoutTag!]!
    #### User Archive ####
    userArchivedWorkouts: [Workout!]!
    userArchivedWorkoutPlans: [WorkoutPlan!]!
    userArchivedCustomMoves: [Move!]!
    #### User Avatars - PROBABLY DEPRECATED ####
    userAvatars(ids: [ID!]!): [UserAvatarData!]!
    userAvatarById(id: ID!): UserAvatarData
    #### User Collection ####
    userCollections: [Collection!]!
    userCollectionById(id: ID!): Collection!
    #### User Exercise Score Trackers ####
    userExerciseLoadTrackers: [UserExerciseLoadTracker!]!
    #### User Public Profiles ####
    userProfiles(cursor: ID, take: Int): [UserProfileSummary!]!
    userProfile(userId: ID!): UserProfile
    #### WorkoutSessions ####
    workoutSessionById(id: ID!): WorkoutSession
    userWorkoutSessions: [WorkoutSession!]! # Authed user created.
    #### Workouts - DEPRECATED ####
    publicWorkouts(
      cursor: ID
      filters: WorkoutFiltersInput
      take: Int
    ): [WorkoutSummary!]!
    userWorkouts: [WorkoutSummary!]! # Authed user.
    userPublicWorkouts(userId: ID!): [WorkoutSummary!]! # Public users (profiles).
    workoutById(id: ID!): Workout
    #### TrainingPlans ####
    trainingPlanById(id: ID!): TrainingPlan
    userTrainingPlans: [TrainingPlanSummary!]! # Authed user.
    #### TrainingPlanEnrolments ####
    trainingPlanEnrolmentById(id: ID!): TrainingPlanEnrolmentWithPlan
    trainingPlanEnrolments: [TrainingPlanEnrolmentSummary!]!
    #### Workout Plans - DEPRECATED ####
    publicWorkoutPlans(
      cursor: ID
      filters: WorkoutPlanFiltersInput
      take: Int
    ): [WorkoutPlanSummary!]!
    workoutPlanById(id: ID!): WorkoutPlan
    userWorkoutPlans: [WorkoutPlanSummary!]! # Authed user.
    userPublicWorkoutPlans(userId: ID!): [WorkoutPlanSummary!]! # Public users (profiles).
    #### Workout Plan Enrolments - DEPRECATED ####
    workoutPlanEnrolmentById(id: ID!): WorkoutPlanEnrolmentWithPlan
    workoutPlanEnrolments: [WorkoutPlanEnrolmentSummary!]!
  }

  type Mutation {
    #### ADMIN ONLY MUTATIONS ####
    updateWorkoutMetaDataAdmin(
      data: UpdateWorkoutMetaDataAdminInput!
    ): WorkoutWithMetaDataAdmin!
    updateWorkoutPlanMetaDataAdmin(
      data: UpdateWorkoutPlanMetaDataAdminInput!
    ): WorkoutPlanWithMetaDataAdmin
    updateClubMetaDataAdmin(
      data: UpdateClubMetaDataAdminInput!
    ): ClubWithMetaDataAdmin!
    #### END OF ADMIN ONLY MUTATIONS ####
    #### AnnouncementUpdate ####
    markAnnouncementUpdateAsSeen(data: MarkAnnouncementUpdateAsSeenInput!): ID!
    markWelcomeTodoItemAsSeen(data: MarkWelcomeTodoItemAsSeenInput!): ID!
    #### Archive ####
    archiveWorkoutById(id: ID!): Workout!
    unarchiveWorkoutById(id: ID!): Workout!
    archiveWorkoutPlanById(id: ID!): WorkoutPlan!
    unarchiveWorkoutPlanById(id: ID!): WorkoutPlan!
    archiveCustomMoveById(id: ID!): Move!
    unarchiveCustomMoveById(id: ID!): Move!
    #### Club ####
    createClub(data: CreateClubInput!): ClubSummary!
    updateClubSummary(data: UpdateClubSummaryInput!): ClubSummary!
    deleteClub(id: ID!): ID!
    # Returns a list of all club invite tokens after the update.
    createClubInviteToken(data: CreateClubInviteTokenInput!): ClubInviteTokens!
    updateClubInviteToken(data: UpdateClubInviteTokenInput!): ClubInviteTokens!
    deleteClubInviteToken(data: DeleteClubInviteTokenInput!): ClubInviteTokens!
    #### Club Member Management ####
    # Handle authed user request join join a public club.
    userJoinPublicClub(clubId: ID!): ID! # Club ID
    addUserToClubViaInviteToken(userId: ID!, clubInviteTokenId: ID!): ID! # Club ID
    giveMemberAdminStatus(userId: ID!, clubId: ID!): ClubMembers!
    removeMemberAdminStatus(userId: ID!, clubId: ID!): ClubMembers!
    removeUserFromClub(userToRemoveId: ID!, clubId: ID!): ClubMembers!
    #### Club Member Notes ####
    createClubMemberNote(data: CreateClubMemberNoteInput!): ClubMemberNote!
    updateClubMemberNote(data: UpdateClubMemberNoteInput!): ClubMemberNote!
    #### Club Content Management ####
    # Returns the updated content / list of objects.
    addWorkoutToClub(workoutId: ID!, clubId: ID!): ClubWorkouts!
    removeWorkoutFromClub(workoutId: ID!, clubId: ID!): ClubWorkouts!
    addWorkoutPlanToClub(workoutPlanId: ID!, clubId: ID!): ClubWorkoutPlans!
    removeWorkoutPlanFromClub(
      workoutPlanId: ID!
      clubId: ID!
    ): ClubWorkoutPlans!
    #### Club Feed Post ####
    createClubMembersFeedPost(
      clubId: ID!
      data: CreateStreamFeedActivityInput!
    ): StreamEnrichedActivity!
    deleteClubMembersFeedPost(activityId: ID!): ID! # The Stream activity ID.
    #### Equipment ####
    createEquipment(data: CreateEquipmentInput!): Equipment
    updateEquipment(data: UpdateEquipmentInput!): Equipment
    #### Fitness Benchmarks ####
    createFitnessBenchmark(
      data: CreateFitnessBenchmarkInput!
    ): FitnessBenchmark!
    updateFitnessBenchmark(
      data: UpdateFitnessBenchmarkInput!
    ): FitnessBenchmark!
    deleteFitnessBenchmark(id: ID!): ID!
    createFitnessBenchmarkScore(
      data: CreateFitnessBenchmarkScoreInput!
    ): FitnessBenchmark!
    updateFitnessBenchmarkScore(
      data: UpdateFitnessBenchmarkScoreInput!
    ): FitnessBenchmark!
    deleteFitnessBenchmarkScore(id: ID!): FitnessBenchmark!
    #### Fitness Benchmarks Workouts ####
    createFitnessBenchmarkWorkout(
      data: CreateFitnessBenchmarkWorkoutInput!
    ): FitnessBenchmarkWorkout!
    updateFitnessBenchmarkWorkout(
      data: UpdateFitnessBenchmarkWorkoutInput!
    ): FitnessBenchmarkWorkout!
    deleteFitnessBenchmarkWorkout(id: ID!): ID!
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
    #### User Goal Tracking ####
    createUserGoal(data: CreateUserGoalInput!): UserGoal!
    updateUserGoal(data: UpdateUserGoalInput!): UserGoal!
    deleteUserGoal(id: ID!): ID!
    ###############################
    #### User Day Log Tracking ####
    #### User Day Log Mood ####
    createUserDayLogMood(data: CreateUserDayLogMoodInput!): UserDayLogMood!
    deleteUserDayLogMood(id: ID!): ID!
    #### User Day Meditation Log ####
    createUserMeditationLog(
      data: CreateUserMeditationLogInput!
    ): UserMeditationLog!
    updateUserMeditationLog(
      data: UpdateUserMeditationLogInput!
    ): UserMeditationLog!
    #### User Day Eat Well Log ####
    createUserEatWellLog(data: CreateUserEatWellLogInput!): UserEatWellLog!
    updateUserEatWellLog(data: UpdateUserEatWellLogInput!): UserEatWellLog!
    ### User Day Sleep Well Log ####
    createUserSleepWellLog(
      data: CreateUserSleepWellLogInput!
    ): UserSleepWellLog!
    updateUserSleepWellLog(
      data: UpdateUserSleepWellLogInput!
    ): UserSleepWellLog!
    ########################
    #### Logged Workout ####
    createLoggedWorkout(data: CreateLoggedWorkoutInput!): LoggedWorkout!
    updateLoggedWorkout(data: UpdateLoggedWorkoutInput!): LoggedWorkout!
    deleteLoggedWorkoutById(id: ID!): ID!
    updateLoggedWorkoutSection(
      data: UpdateLoggedWorkoutSectionInput!
    ): LoggedWorkoutSection!
    updateLoggedWorkoutSet(
      data: UpdateLoggedWorkoutSetInput!
    ): LoggedWorkoutSet!
    updateLoggedWorkoutMove(
      data: UpdateLoggedWorkoutMoveInput!
    ): LoggedWorkoutMove!
    deleteLoggedWorkoutMove(id: ID!): ID!
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
    #### UserExerciseLoadTracker ####
    createUserExerciseLoadTracker(
      data: CreateUserExerciseLoadTrackerInput!
    ): UserExerciseLoadTracker!
    deleteUserExerciseLoadTracker(id: ID!): ID!
    #### User Skills and Certifications ####
    createSkill(data: CreateSkillInput!): Skill!
    updateSkill(data: UpdateSkillInput!): Skill!
    deleteSkillById(id: ID!): ID!
    addDocumentToSkill(data: AddDocumentToSkillInput!): Skill!
    removeDocumentFromSkill(data: RemoveDocumentFromSkillInput!): Skill!
    #### WorkoutSession ####
    createWorkoutSession(data: CreateWorkoutSessionInput!): WorkoutSession!
    updateWorkoutSession(data: UpdateWorkoutSessionInput!): WorkoutSession!
    duplicateWorkoutSession(id: ID!): WorkoutSession!
    ####################
    #### DEPRECATED ####
    ####################
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
    deleteWorkoutPlanEnrolmentById(id: ID!): ID!
    createScheduleForPlanEnrolment(
      data: CreateScheduleForPlanEnrolmentInput!
    ): WorkoutPlanEnrolment!
    clearScheduleForPlanEnrolment(enrolmentId: ID!): WorkoutPlanEnrolment!
    createCompletedWorkoutPlanDayWorkout(
      data: CreateCompletedWorkoutPlanDayWorkoutInput!
    ): WorkoutPlanEnrolment!
    deleteCompletedWorkoutPlanDayWorkout(
      data: DeleteCompletedWorkoutPlanDayWorkoutInput!
    ): WorkoutPlanEnrolment!
    clearWorkoutPlanEnrolmentProgress(enrolmentId: ID!): WorkoutPlanEnrolment!
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

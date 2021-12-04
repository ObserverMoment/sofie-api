import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AddWorkoutPlanToClubInput = {
  WorkoutPlan: ConnectRelationInput;
  id: Scalars['ID'];
};

export type AddWorkoutPlanToCollectionInput = {
  WorkoutPlan: ConnectRelationInput;
  collectionId: Scalars['ID'];
};

export type AddWorkoutToClubInput = {
  Workout: ConnectRelationInput;
  id: Scalars['ID'];
};

export type AddWorkoutToCollectionInput = {
  Workout: ConnectRelationInput;
  collectionId: Scalars['ID'];
};

/** Enums */
export type BenchmarkType =
  | 'AMRAP'
  | 'FASTESTTIME'
  | 'MAXLOAD'
  | 'UNBROKENREPS'
  | 'UNBROKENTIME';

export type BodyArea = {
  __typename?: 'BodyArea';
  altNames?: Maybe<Scalars['String']>;
  frontBack: BodyAreaFrontBack;
  id: Scalars['ID'];
  name: Scalars['String'];
  upperLower: BodyAreaUpperLower;
};

export type BodyAreaFrontBack =
  | 'BACK'
  | 'BOTH'
  | 'FRONT';

export type BodyAreaMoveScore = {
  __typename?: 'BodyAreaMoveScore';
  BodyArea: BodyArea;
  Move: Move;
  score: Scalars['Int'];
};

export type BodyAreaMoveScoreInput = {
  BodyArea: ConnectRelationInput;
  score: Scalars['Float'];
};

export type BodyAreaUpperLower =
  | 'CORE'
  | 'LOWER'
  | 'UPPER';

export type BodyTrackingEntry = {
  __typename?: 'BodyTrackingEntry';
  bodyweight?: Maybe<Scalars['Float']>;
  bodyweightUnit?: Maybe<BodyweightUnit>;
  createdAt: Scalars['DateTime'];
  fatPercent?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  photoUris: Array<Scalars['String']>;
};

export type BodyweightUnit =
  | 'KG'
  | 'LB';

export type CheckClubInviteTokenResult = ClubInviteTokenData | InviteTokenError;

export type Club = {
  __typename?: 'Club';
  Admins: Array<UserSummary>;
  ClubInviteTokens?: Maybe<Array<ClubInviteToken>>;
  JoinClubInvites?: Maybe<Array<JoinClubInvite>>;
  JoinClubRequests?: Maybe<Array<JoinClubRequest>>;
  Members: Array<UserSummary>;
  Owner: UserSummary;
  WorkoutPlans?: Maybe<Array<WorkoutPlanSummary>>;
  Workouts?: Maybe<Array<WorkoutSummary>>;
  contentAccessScope: ContentAccessScope;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ClubInviteToken = {
  __typename?: 'ClubInviteToken';
  User: UserSummary;
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  inviteLimit: Scalars['Int'];
  joinedUserIds: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type ClubInviteTokenData = {
  __typename?: 'ClubInviteTokenData';
  Club: Club;
  token: Scalars['String'];
};

export type ClubSummary = {
  __typename?: 'ClubSummary';
  Owner: UserSummary;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  memberCount: Scalars['Int'];
  name: Scalars['String'];
};

export type Collection = {
  __typename?: 'Collection';
  User: UserSummary;
  WorkoutPlans: Array<WorkoutPlanSummary>;
  Workouts: Array<WorkoutSummary>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ConnectRelationInput = {
  id: Scalars['ID'];
};

export type ContentAccessScope =
  | 'PRIVATE'
  | 'PUBLIC';

export type CopyWorkoutPlanDayToAnotherDayInput = {
  copyToDay: Scalars['Int'];
  id: Scalars['ID'];
};

export type CreateBodyTrackingEntryInput = {
  bodyweight?: Maybe<Scalars['Float']>;
  bodyweightUnit?: Maybe<BodyweightUnit>;
  fatPercent?: Maybe<Scalars['Float']>;
  note?: Maybe<Scalars['String']>;
  photoUris?: Maybe<Array<Scalars['String']>>;
};

export type CreateClubInput = {
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateClubInviteTokenInput = {
  Club: ConnectRelationInput;
  inviteLimit: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateClubTimelinePostInput = {
  caption?: Maybe<Scalars['String']>;
  clubId: Scalars['String'];
  object: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type CreateCollectionInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateEquipmentInput = {
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
  name: Scalars['String'];
};

export type CreateGymProfileInput = {
  Equipments?: Maybe<Array<ConnectRelationInput>>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateJoinClubInviteInput = {
  Club: ConnectRelationInput;
  Invited: ConnectRelationInput;
  Sender: ConnectRelationInput;
};

export type CreateJoinClubRequestInput = {
  Applicant: ConnectRelationInput;
  Club: ConnectRelationInput;
};

export type CreateLoggedWorkoutInput = {
  GymProfile?: Maybe<ConnectRelationInput>;
  LoggedWorkoutSections: Array<CreateLoggedWorkoutSectionInLoggedWorkoutInput>;
  ScheduledWorkout?: Maybe<ConnectRelationInput>;
  Workout?: Maybe<ConnectRelationInput>;
  WorkoutGoals: Array<ConnectRelationInput>;
  completedOn: Scalars['DateTime'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

export type CreateLoggedWorkoutSectionInLoggedWorkoutInput = {
  BodyAreas: Array<ConnectRelationInput>;
  MoveTypes: Array<ConnectRelationInput>;
  WorkoutSectionType: ConnectRelationInput;
  loggedWorkoutSectionData: LoggedWorkoutSectionDataInput;
  name?: Maybe<Scalars['String']>;
  repScore?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  timeTakenSeconds: Scalars['Int'];
};

export type CreateMoveInput = {
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScoreInput>>;
  MoveType: ConnectRelationInput;
  RequiredEquipments?: Maybe<Array<ConnectRelationInput>>;
  SelectableEquipments?: Maybe<Array<ConnectRelationInput>>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  scope?: Maybe<MoveScope>;
  searchTerms?: Maybe<Scalars['String']>;
  validRepTypes: Array<WorkoutMoveRepType>;
};

export type CreateProgressJournalEntryInput = {
  ProgressJournal: ConnectRelationInput;
  confidenceScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  moodScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  note?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
};

export type CreateProgressJournalGoalInput = {
  ProgressJournal: ConnectRelationInput;
  ProgressJournalGoalTags?: Maybe<Array<ConnectRelationInput>>;
  deadline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateProgressJournalGoalTagInput = {
  hexColor: Scalars['String'];
  tag: Scalars['String'];
};

export type CreateProgressJournalInput = {
  coverImageUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateScheduledWorkoutInput = {
  GymProfile?: Maybe<ConnectRelationInput>;
  Workout: ConnectRelationInput;
  WorkoutPlanEnrolment?: Maybe<ConnectRelationInput>;
  note?: Maybe<Scalars['String']>;
  scheduledAt: Scalars['DateTime'];
};

export type CreateUserBenchmarkEntryInput = {
  UserBenchmark: ConnectRelationInput;
  completedOn: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
  score: Scalars['Float'];
  videoThumbUri?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
};

export type CreateUserBenchmarkInput = {
  UserBenchmarkTags?: Maybe<Array<ConnectRelationInput>>;
  benchmarkType: BenchmarkType;
  description?: Maybe<Scalars['String']>;
  equipmentInfo?: Maybe<Scalars['String']>;
  loadUnit?: Maybe<LoadUnit>;
  name: Scalars['String'];
};

export type CreateUserBenchmarkTagInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateWorkoutInput = {
  contentAccessScope: ContentAccessScope;
  difficultyLevel: DifficultyLevel;
  name: Scalars['String'];
};

export type CreateWorkoutMoveInSetInput = {
  Equipment?: Maybe<ConnectRelationInput>;
  Move: ConnectRelationInput;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount: Scalars['Float'];
  loadUnit?: Maybe<LoadUnit>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  sortPosition: Scalars['Int'];
  timeUnit?: Maybe<TimeUnit>;
};

export type CreateWorkoutMoveInput = {
  Equipment?: Maybe<ConnectRelationInput>;
  Move: ConnectRelationInput;
  WorkoutSet: ConnectRelationInput;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount: Scalars['Float'];
  loadUnit?: Maybe<LoadUnit>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  sortPosition: Scalars['Int'];
  timeUnit?: Maybe<TimeUnit>;
};

export type CreateWorkoutPlanDayWithWorkoutInput = {
  Workout: ConnectRelationInput;
  WorkoutPlan: ConnectRelationInput;
  dayNumber: Scalars['Int'];
};

export type CreateWorkoutPlanDayWorkoutInput = {
  Workout: ConnectRelationInput;
  WorkoutPlanDay: ConnectRelationInput;
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
};

export type CreateWorkoutPlanInput = {
  contentAccessScope: ContentAccessScope;
  name: Scalars['String'];
};

export type CreateWorkoutPlanReviewInput = {
  WorkoutPlan: ConnectRelationInput;
  comment?: Maybe<Scalars['String']>;
  score: Scalars['Float'];
};

export type CreateWorkoutSectionInput = {
  Workout: ConnectRelationInput;
  WorkoutSectionType: ConnectRelationInput;
  classAudioUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classVideoUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  rounds?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  timecap?: Maybe<Scalars['Int']>;
};

export type CreateWorkoutSetInput = {
  WorkoutSection: ConnectRelationInput;
  duration?: Maybe<Scalars['Int']>;
  rounds?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
};

export type CreateWorkoutSetWithWorkoutMovesInput = {
  workoutMoves: Array<CreateWorkoutMoveInSetInput>;
  workoutSet: CreateWorkoutSetInput;
};

export type CreateWorkoutTagInput = {
  tag: Scalars['String'];
};

export type DifficultyLevel =
  | 'ADVANCED'
  | 'CHALLENGING'
  | 'ELITE'
  | 'INTERMEDIATE'
  | 'LIGHT';

export type DistanceUnit =
  | 'KILOMETRES'
  | 'METRES'
  | 'MILES'
  | 'YARDS';

export type Equipment = {
  __typename?: 'Equipment';
  altNames?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  loadAdjustable: Scalars['Boolean'];
  name: Scalars['String'];
};

export type Gender =
  | 'FEMALE'
  | 'MALE'
  | 'NONBINARY'
  | 'PNTS';

export type GymProfile = {
  __typename?: 'GymProfile';
  Equipments: Array<Equipment>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type InviteTokenError = {
  __typename?: 'InviteTokenError';
  message: Scalars['String'];
};

export type JoinClubInvite = {
  __typename?: 'JoinClubInvite';
  Invited: UserSummary;
  Responder: UserSummary;
  Sender: UserSummary;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  respondedAt?: Maybe<Scalars['DateTime']>;
  status: JoinClubRequestStatus;
};

export type JoinClubRequest = {
  __typename?: 'JoinClubRequest';
  Applicant: UserSummary;
  Responder?: Maybe<UserSummary>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  respondedAt?: Maybe<Scalars['DateTime']>;
  status: JoinClubRequestStatus;
};

export type JoinClubRequestStatus =
  | 'ACCEPTED'
  | 'PENDING'
  | 'REJECTED';

export type LifetimeLogStatsSummary = {
  __typename?: 'LifetimeLogStatsSummary';
  minutesWorked: Scalars['Int'];
  sessionsLogged: Scalars['Int'];
};

export type LoadUnit =
  | 'BODYWEIGHTPERCENT'
  | 'KG'
  | 'LB'
  | 'PERCENTMAX';

export type LoggedWorkout = {
  __typename?: 'LoggedWorkout';
  GymProfile?: Maybe<GymProfile>;
  LoggedWorkoutSections: Array<LoggedWorkoutSection>;
  ScheduledWorkout?: Maybe<ScheduledWorkout>;
  WorkoutGoals: Array<WorkoutGoal>;
  completedOn: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  workoutId?: Maybe<Scalars['ID']>;
};

export type LoggedWorkoutSection = {
  __typename?: 'LoggedWorkoutSection';
  BodyAreas: Array<BodyArea>;
  LoggedWorkout: LoggedWorkout;
  MoveTypes: Array<MoveType>;
  WorkoutSectionType: WorkoutSectionType;
  id: Scalars['ID'];
  loggedWorkoutSectionData?: Maybe<LoggedWorkoutSectionData>;
  name?: Maybe<Scalars['String']>;
  repScore?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  timeTakenSeconds: Scalars['Int'];
};

export type LoggedWorkoutSectionData = {
  __typename?: 'LoggedWorkoutSectionData';
  rounds: Array<WorkoutSectionRoundData>;
};

export type LoggedWorkoutSectionDataInput = {
  rounds: Array<WorkoutSectionRoundDataInput>;
};

export type Move = {
  __typename?: 'Move';
  BodyAreaMoveScores: Array<BodyAreaMoveScore>;
  MoveType: MoveType;
  RequiredEquipments: Array<Equipment>;
  SelectableEquipments: Array<Equipment>;
  archived: Scalars['Boolean'];
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  scope: MoveScope;
  searchTerms?: Maybe<Scalars['String']>;
  validRepTypes: Array<WorkoutMoveRepType>;
};

/**
 * Standard moves are built in / official.
 * Custom moves are created by users.
 */
export type MoveScope =
  | 'CUSTOM'
  | 'STANDARD';

export type MoveType = {
  __typename?: 'MoveType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUri?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type MoveWorkoutPlanDayToAnotherDayInput = {
  id: Scalars['ID'];
  moveToDay: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToClubViaInviteToken: Club;
  addWorkoutPlanToClub: Club;
  addWorkoutPlanToCollection: Collection;
  addWorkoutToClub: Club;
  addWorkoutToCollection: Collection;
  archiveCustomMoveById: Move;
  archiveWorkoutById: Workout;
  archiveWorkoutPlanById: WorkoutPlan;
  copyWorkoutPlanDayToAnotherDay: WorkoutPlanDay;
  createBodyTrackingEntry: BodyTrackingEntry;
  createClub: Club;
  createClubInviteToken: ClubInviteToken;
  createClubTimelinePost: TimelinePostFullData;
  createCollection: Collection;
  createEquipment?: Maybe<Equipment>;
  createGymProfile: GymProfile;
  createLoggedWorkout: LoggedWorkout;
  createMove: Move;
  createProgressJournal: ProgressJournal;
  createProgressJournalEntry: ProgressJournalEntry;
  createProgressJournalGoal: ProgressJournalGoal;
  createProgressJournalGoalTag: ProgressJournalGoalTag;
  createScheduledWorkout: ScheduledWorkout;
  createUserBenchmark: UserBenchmark;
  createUserBenchmarkEntry: UserBenchmarkEntry;
  createUserBenchmarkTag: UserBenchmarkTag;
  createWorkout: Workout;
  createWorkoutMove: WorkoutMove;
  createWorkoutPlan: WorkoutPlan;
  createWorkoutPlanDayWithWorkout: WorkoutPlanDay;
  createWorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  createWorkoutPlanEnrolment: WorkoutPlanEnrolmentWithPlan;
  createWorkoutPlanReview: WorkoutPlanReview;
  createWorkoutSection: WorkoutSection;
  createWorkoutSet: WorkoutSet;
  createWorkoutSetWithWorkoutMoves: WorkoutSet;
  createWorkoutTag: WorkoutTag;
  deleteBodyTrackingEntryById: Scalars['ID'];
  deleteClubById: Scalars['ID'];
  deleteClubInviteTokenById: Scalars['ID'];
  deleteClubTimelinePost: Scalars['ID'];
  deleteCollectionById: Scalars['ID'];
  deleteGymProfileById?: Maybe<Scalars['ID']>;
  deleteLoggedWorkoutById: Scalars['ID'];
  deleteProgressJournalById: Scalars['ID'];
  deleteProgressJournalEntryById: Scalars['ID'];
  deleteProgressJournalGoalById: Scalars['ID'];
  deleteProgressJournalGoalTagById: Scalars['ID'];
  deleteScheduledWorkoutById: Scalars['ID'];
  deleteUserBenchmarkById: Scalars['ID'];
  deleteUserBenchmarkEntryById: Scalars['ID'];
  deleteUserBenchmarkTagById: Scalars['ID'];
  deleteWorkoutMoveById: Scalars['ID'];
  deleteWorkoutPlanDayWorkoutById: Scalars['ID'];
  deleteWorkoutPlanDaysById: Array<Scalars['ID']>;
  deleteWorkoutPlanEnrolmentById: Scalars['ID'];
  deleteWorkoutPlanReviewById: Scalars['ID'];
  deleteWorkoutSectionById: Scalars['ID'];
  deleteWorkoutSetById: Scalars['ID'];
  deleteWorkoutTagById: Scalars['ID'];
  duplicateWorkoutById: Workout;
  duplicateWorkoutMoveById: WorkoutMove;
  duplicateWorkoutSetById: WorkoutSet;
  giveMemberAdminStatus: Club;
  makeCopyWorkoutById: Workout;
  moveWorkoutPlanDayToAnotherDay: WorkoutPlanDay;
  removeMemberAdminStatus: Club;
  removeUserFromClub: Club;
  removeWorkoutFromClub: Club;
  removeWorkoutFromCollection: Collection;
  removeWorkoutPlanFromClub: Club;
  removeWorkoutPlanFromCollection: Collection;
  reorderWorkoutMoves: Array<SortPositionUpdated>;
  reorderWorkoutPlanDayWorkouts: Array<SortPositionUpdated>;
  reorderWorkoutSections: Array<SortPositionUpdated>;
  reorderWorkoutSets: Array<SortPositionUpdated>;
  softDeleteMoveById: Scalars['ID'];
  softDeleteWorkoutPlanById: Scalars['ID'];
  unarchiveCustomMoveById: Move;
  unarchiveWorkoutById: Workout;
  unarchiveWorkoutPlanById: WorkoutPlan;
  updateBodyTrackingEntry: BodyTrackingEntry;
  updateClub: Club;
  updateClubInviteToken: ClubInviteToken;
  updateCollection: Collection;
  updateEquipment?: Maybe<Equipment>;
  updateGymProfile: GymProfile;
  updateLoggedWorkout: LoggedWorkout;
  updateLoggedWorkoutSection: LoggedWorkoutSection;
  updateMove: Move;
  updateProgressJournal: ProgressJournal;
  updateProgressJournalEntry: ProgressJournalEntry;
  updateProgressJournalGoal: ProgressJournalGoal;
  updateProgressJournalGoalTag: ProgressJournalGoalTag;
  updateScheduledWorkout: ScheduledWorkout;
  updateUserBenchmark: UserBenchmark;
  updateUserBenchmarkEntry: UserBenchmarkEntry;
  updateUserBenchmarkTag: UserBenchmarkTag;
  updateUserProfile: UserProfile;
  updateWorkout: Workout;
  updateWorkoutMove: WorkoutMove;
  updateWorkoutMoves: Array<WorkoutMove>;
  updateWorkoutPlan: WorkoutPlan;
  updateWorkoutPlanDay: WorkoutPlanDay;
  updateWorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  updateWorkoutPlanEnrolment: WorkoutPlanEnrolment;
  updateWorkoutPlanReview: WorkoutPlanReview;
  updateWorkoutSection: WorkoutSection;
  updateWorkoutSet: WorkoutSet;
  updateWorkoutTag: WorkoutTag;
  userJoinPublicClub: Scalars['ID'];
};


export type MutationAddUserToClubViaInviteTokenArgs = {
  clubInviteTokenId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationAddWorkoutPlanToClubArgs = {
  clubId: Scalars['ID'];
  workoutPlanId: Scalars['ID'];
};


export type MutationAddWorkoutPlanToCollectionArgs = {
  data: AddWorkoutPlanToCollectionInput;
};


export type MutationAddWorkoutToClubArgs = {
  clubId: Scalars['ID'];
  workoutId: Scalars['ID'];
};


export type MutationAddWorkoutToCollectionArgs = {
  data: AddWorkoutToCollectionInput;
};


export type MutationArchiveCustomMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationArchiveWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationArchiveWorkoutPlanByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCopyWorkoutPlanDayToAnotherDayArgs = {
  data: CopyWorkoutPlanDayToAnotherDayInput;
};


export type MutationCreateBodyTrackingEntryArgs = {
  data: CreateBodyTrackingEntryInput;
};


export type MutationCreateClubArgs = {
  data: CreateClubInput;
};


export type MutationCreateClubInviteTokenArgs = {
  data: CreateClubInviteTokenInput;
};


export type MutationCreateClubTimelinePostArgs = {
  data: CreateClubTimelinePostInput;
};


export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
};


export type MutationCreateEquipmentArgs = {
  data: CreateEquipmentInput;
};


export type MutationCreateGymProfileArgs = {
  data: CreateGymProfileInput;
};


export type MutationCreateLoggedWorkoutArgs = {
  data: CreateLoggedWorkoutInput;
};


export type MutationCreateMoveArgs = {
  data: CreateMoveInput;
};


export type MutationCreateProgressJournalArgs = {
  data: CreateProgressJournalInput;
};


export type MutationCreateProgressJournalEntryArgs = {
  data: CreateProgressJournalEntryInput;
};


export type MutationCreateProgressJournalGoalArgs = {
  data: CreateProgressJournalGoalInput;
};


export type MutationCreateProgressJournalGoalTagArgs = {
  data: CreateProgressJournalGoalTagInput;
};


export type MutationCreateScheduledWorkoutArgs = {
  data: CreateScheduledWorkoutInput;
};


export type MutationCreateUserBenchmarkArgs = {
  data: CreateUserBenchmarkInput;
};


export type MutationCreateUserBenchmarkEntryArgs = {
  data: CreateUserBenchmarkEntryInput;
};


export type MutationCreateUserBenchmarkTagArgs = {
  data: CreateUserBenchmarkTagInput;
};


export type MutationCreateWorkoutArgs = {
  data: CreateWorkoutInput;
};


export type MutationCreateWorkoutMoveArgs = {
  data: CreateWorkoutMoveInput;
};


export type MutationCreateWorkoutPlanArgs = {
  data: CreateWorkoutPlanInput;
};


export type MutationCreateWorkoutPlanDayWithWorkoutArgs = {
  data: CreateWorkoutPlanDayWithWorkoutInput;
};


export type MutationCreateWorkoutPlanDayWorkoutArgs = {
  data: CreateWorkoutPlanDayWorkoutInput;
};


export type MutationCreateWorkoutPlanEnrolmentArgs = {
  workoutPlanId: Scalars['ID'];
};


export type MutationCreateWorkoutPlanReviewArgs = {
  data: CreateWorkoutPlanReviewInput;
};


export type MutationCreateWorkoutSectionArgs = {
  data: CreateWorkoutSectionInput;
};


export type MutationCreateWorkoutSetArgs = {
  data: CreateWorkoutSetInput;
};


export type MutationCreateWorkoutSetWithWorkoutMovesArgs = {
  data: CreateWorkoutSetWithWorkoutMovesInput;
};


export type MutationCreateWorkoutTagArgs = {
  data: CreateWorkoutTagInput;
};


export type MutationDeleteBodyTrackingEntryByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubInviteTokenByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubTimelinePostArgs = {
  activityId: Scalars['ID'];
};


export type MutationDeleteCollectionByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteGymProfileByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLoggedWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgressJournalByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgressJournalEntryByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgressJournalGoalByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProgressJournalGoalTagByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteScheduledWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserBenchmarkByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserBenchmarkEntryByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserBenchmarkTagByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutPlanDayWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutPlanDaysByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeleteWorkoutPlanEnrolmentByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutPlanReviewByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutSectionByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutSetByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutTagByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDuplicateWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDuplicateWorkoutMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDuplicateWorkoutSetByIdArgs = {
  id: Scalars['ID'];
};


export type MutationGiveMemberAdminStatusArgs = {
  clubId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationMakeCopyWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationMoveWorkoutPlanDayToAnotherDayArgs = {
  data: MoveWorkoutPlanDayToAnotherDayInput;
};


export type MutationRemoveMemberAdminStatusArgs = {
  clubId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveUserFromClubArgs = {
  clubId: Scalars['ID'];
  userToRemoveId: Scalars['ID'];
};


export type MutationRemoveWorkoutFromClubArgs = {
  clubId: Scalars['ID'];
  workoutId: Scalars['ID'];
};


export type MutationRemoveWorkoutFromCollectionArgs = {
  data: RemoveWorkoutFromCollectionInput;
};


export type MutationRemoveWorkoutPlanFromClubArgs = {
  clubId: Scalars['ID'];
  workoutPlanId: Scalars['ID'];
};


export type MutationRemoveWorkoutPlanFromCollectionArgs = {
  data: RemoveWorkoutPlanFromCollectionInput;
};


export type MutationReorderWorkoutMovesArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationReorderWorkoutPlanDayWorkoutsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationReorderWorkoutSectionsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationReorderWorkoutSetsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationSoftDeleteMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationSoftDeleteWorkoutPlanByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUnarchiveCustomMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUnarchiveWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUnarchiveWorkoutPlanByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateBodyTrackingEntryArgs = {
  data: UpdateBodyTrackingEntryInput;
};


export type MutationUpdateClubArgs = {
  data: UpdateClubInput;
};


export type MutationUpdateClubInviteTokenArgs = {
  data: UpdateClubInviteTokenInput;
};


export type MutationUpdateCollectionArgs = {
  data: UpdateCollectionInput;
};


export type MutationUpdateEquipmentArgs = {
  data: UpdateEquipmentInput;
};


export type MutationUpdateGymProfileArgs = {
  data: UpdateGymProfileInput;
};


export type MutationUpdateLoggedWorkoutArgs = {
  data: UpdateLoggedWorkoutInput;
};


export type MutationUpdateLoggedWorkoutSectionArgs = {
  data: UpdateLoggedWorkoutSectionInput;
};


export type MutationUpdateMoveArgs = {
  data: UpdateMoveInput;
};


export type MutationUpdateProgressJournalArgs = {
  data: UpdateProgressJournalInput;
};


export type MutationUpdateProgressJournalEntryArgs = {
  data: UpdateProgressJournalEntryInput;
};


export type MutationUpdateProgressJournalGoalArgs = {
  data: UpdateProgressJournalGoalInput;
};


export type MutationUpdateProgressJournalGoalTagArgs = {
  data: UpdateProgressJournalGoalTagInput;
};


export type MutationUpdateScheduledWorkoutArgs = {
  data: UpdateScheduledWorkoutInput;
};


export type MutationUpdateUserBenchmarkArgs = {
  data: UpdateUserBenchmarkInput;
};


export type MutationUpdateUserBenchmarkEntryArgs = {
  data: UpdateUserBenchmarkEntryInput;
};


export type MutationUpdateUserBenchmarkTagArgs = {
  data: UpdateUserBenchmarkTagInput;
};


export type MutationUpdateUserProfileArgs = {
  data: UpdateUserProfileInput;
};


export type MutationUpdateWorkoutArgs = {
  data: UpdateWorkoutInput;
};


export type MutationUpdateWorkoutMoveArgs = {
  data: UpdateWorkoutMoveInput;
};


export type MutationUpdateWorkoutMovesArgs = {
  data: Array<UpdateWorkoutMoveInput>;
};


export type MutationUpdateWorkoutPlanArgs = {
  data: UpdateWorkoutPlanInput;
};


export type MutationUpdateWorkoutPlanDayArgs = {
  data: UpdateWorkoutPlanDayInput;
};


export type MutationUpdateWorkoutPlanDayWorkoutArgs = {
  data: UpdateWorkoutPlanDayWorkoutInput;
};


export type MutationUpdateWorkoutPlanEnrolmentArgs = {
  data: UpdateWorkoutPlanEnrolmentInput;
};


export type MutationUpdateWorkoutPlanReviewArgs = {
  data: UpdateWorkoutPlanReviewInput;
};


export type MutationUpdateWorkoutSectionArgs = {
  data: UpdateWorkoutSectionInput;
};


export type MutationUpdateWorkoutSetArgs = {
  data: UpdateWorkoutSetInput;
};


export type MutationUpdateWorkoutTagArgs = {
  data: UpdateWorkoutTagInput;
};


export type MutationUserJoinPublicClubArgs = {
  clubId: Scalars['ID'];
};

export type ProgressJournal = {
  __typename?: 'ProgressJournal';
  ProgressJournalEntries: Array<ProgressJournalEntry>;
  ProgressJournalGoals: Array<ProgressJournalGoal>;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProgressJournalEntry = {
  __typename?: 'ProgressJournalEntry';
  ProgressJournal: ProgressJournal;
  confidenceScore?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  energyScore?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  moodScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  note?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
};

export type ProgressJournalGoal = {
  __typename?: 'ProgressJournalGoal';
  ProgressJournalGoalTags: Array<ProgressJournalGoalTag>;
  completedDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  deadline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProgressJournalGoalTag = {
  __typename?: 'ProgressJournalGoalTag';
  createdAt: Scalars['DateTime'];
  hexColor: Scalars['String'];
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bodyAreas: Array<BodyArea>;
  bodyTrackingEntries: Array<BodyTrackingEntry>;
  checkClubInviteToken: CheckClubInviteTokenResult;
  checkUniqueClubName: Scalars['Boolean'];
  checkUniqueDisplayName: Scalars['Boolean'];
  clubById: Club;
  clubMembersFeedPosts: Array<TimelinePostFullData>;
  clubSummariesById: Array<ClubSummary>;
  equipments: Array<Equipment>;
  gymProfiles: Array<GymProfile>;
  lifetimeLogStatsSummary: LifetimeLogStatsSummary;
  logCountByWorkout: Scalars['Int'];
  loggedWorkoutById: LoggedWorkout;
  moveTypes: Array<MoveType>;
  progressJournalById: ProgressJournal;
  progressJournalGoalTags: Array<ProgressJournalGoalTag>;
  publicClubs: Array<ClubSummary>;
  publicWorkoutPlans: Array<WorkoutPlanSummary>;
  publicWorkouts: Array<WorkoutSummary>;
  standardMoves: Array<Move>;
  textSearchUserNames?: Maybe<Array<TextSearchResult>>;
  textSearchUserProfiles?: Maybe<Array<UserProfileSummary>>;
  textSearchWorkoutNames?: Maybe<Array<TextSearchResult>>;
  textSearchWorkoutPlanNames?: Maybe<Array<TextSearchResult>>;
  textSearchWorkoutPlans?: Maybe<Array<WorkoutPlanSummary>>;
  textSearchWorkouts?: Maybe<Array<WorkoutSummary>>;
  timelinePostsData: Array<TimelinePostObjectData>;
  userArchivedCustomMoves: Array<Move>;
  userArchivedWorkoutPlans: Array<WorkoutPlan>;
  userArchivedWorkouts: Array<Workout>;
  userAvatarById: UserAvatarData;
  userAvatars: Array<UserAvatarData>;
  userBenchmarkById: UserBenchmark;
  userBenchmarkTags: Array<UserBenchmarkTag>;
  userBenchmarks: Array<UserBenchmark>;
  userClubs: Array<ClubSummary>;
  userCollectionById: Collection;
  userCollections: Array<Collection>;
  userCustomMoves: Array<Move>;
  userLoggedWorkouts: Array<LoggedWorkout>;
  userProfileById: UserProfile;
  userProfiles: Array<UserProfileSummary>;
  userProgressJournals: Array<ProgressJournal>;
  userScheduledWorkouts: Array<ScheduledWorkout>;
  userWorkoutPlans: Array<WorkoutPlanSummary>;
  userWorkoutTags: Array<WorkoutTag>;
  userWorkouts: Array<WorkoutSummary>;
  validateToken: Scalars['Boolean'];
  workoutById: Workout;
  workoutGoals: Array<WorkoutGoal>;
  workoutPlanById: WorkoutPlan;
  workoutPlanEnrolmentById: WorkoutPlanEnrolmentWithPlan;
  workoutPlanEnrolments: Array<WorkoutPlanEnrolmentSummary>;
  workoutSectionTypes: Array<WorkoutSectionType>;
};


export type QueryCheckClubInviteTokenArgs = {
  id: Scalars['ID'];
};


export type QueryCheckUniqueClubNameArgs = {
  name: Scalars['String'];
};


export type QueryCheckUniqueDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type QueryClubByIdArgs = {
  id: Scalars['ID'];
};


export type QueryClubMembersFeedPostsArgs = {
  clubId: Scalars['ID'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryClubSummariesByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryLifetimeLogStatsSummaryArgs = {
  userId: Scalars['ID'];
};


export type QueryLogCountByWorkoutArgs = {
  id: Scalars['ID'];
};


export type QueryLoggedWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProgressJournalByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPublicWorkoutPlansArgs = {
  cursor?: Maybe<Scalars['ID']>;
  filters?: Maybe<WorkoutPlanFiltersInput>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPublicWorkoutsArgs = {
  cursor?: Maybe<Scalars['ID']>;
  filters?: Maybe<WorkoutFiltersInput>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryTextSearchUserNamesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchUserProfilesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutNamesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutPlanNamesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutPlansArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutsArgs = {
  text: Scalars['String'];
};


export type QueryTimelinePostsDataArgs = {
  postDataRequests: Array<TimelinePostDataRequestInput>;
};


export type QueryUserAvatarByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserAvatarsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryUserBenchmarkByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserCollectionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserLoggedWorkoutsArgs = {
  take?: Maybe<Scalars['Int']>;
};


export type QueryUserProfileByIdArgs = {
  userId: Scalars['ID'];
};


export type QueryUserProfilesArgs = {
  cursor?: Maybe<Scalars['ID']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutPlanByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutPlanEnrolmentByIdArgs = {
  id: Scalars['ID'];
};

export type RemoveWorkoutFromClubInput = {
  Workout: ConnectRelationInput;
  id: Scalars['ID'];
};

export type RemoveWorkoutFromCollectionInput = {
  Workout: ConnectRelationInput;
  collectionId: Scalars['ID'];
};

export type RemoveWorkoutPlanFromClubInput = {
  WorkoutPlan: ConnectRelationInput;
  id: Scalars['ID'];
};

export type RemoveWorkoutPlanFromCollectionInput = {
  WorkoutPlan: ConnectRelationInput;
  collectionId: Scalars['ID'];
};

export type ScheduledWorkout = {
  __typename?: 'ScheduledWorkout';
  GymProfile?: Maybe<GymProfile>;
  Workout?: Maybe<WorkoutSummary>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  loggedWorkoutId?: Maybe<Scalars['ID']>;
  note?: Maybe<Scalars['String']>;
  scheduledAt: Scalars['DateTime'];
  workoutPlanEnrolmentId?: Maybe<Scalars['ID']>;
};

export type SortPositionUpdated = {
  __typename?: 'SortPositionUpdated';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
};

export type TextSearchResult = {
  __typename?: 'TextSearchResult';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TimeUnit =
  | 'HOURS'
  | 'MINUTES'
  | 'SECONDS';

export type TimelinePostDataRequestInput = {
  activityId: Scalars['String'];
  objectId: Scalars['ID'];
  objectType: TimelinePostType;
  posterId: Scalars['ID'];
};

export type TimelinePostFullData = {
  __typename?: 'TimelinePostFullData';
  activityId: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  creator: TimelinePostObjectDataUser;
  object: TimelinePostObjectDataObject;
  postedAt: Scalars['DateTime'];
  poster: TimelinePostObjectDataUser;
  tags: Array<Scalars['String']>;
};

export type TimelinePostObjectData = {
  __typename?: 'TimelinePostObjectData';
  activityId: Scalars['String'];
  creator: TimelinePostObjectDataUser;
  object: TimelinePostObjectDataObject;
  poster: TimelinePostObjectDataUser;
};

export type TimelinePostObjectDataObject = {
  __typename?: 'TimelinePostObjectDataObject';
  coverImageUri?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: TimelinePostType;
};

export type TimelinePostObjectDataUser = {
  __typename?: 'TimelinePostObjectDataUser';
  avatarUri?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type TimelinePostType =
  | 'WORKOUT'
  | 'WORKOUTPLAN';

export type UpdateBodyTrackingEntryInput = {
  bodyweight?: Maybe<Scalars['Float']>;
  bodyweightUnit?: Maybe<BodyweightUnit>;
  fatPercent?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  photoUris?: Maybe<Array<Scalars['String']>>;
};

export type UpdateClubInput = {
  contentAccessScope?: Maybe<ContentAccessScope>;
  coverImageUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateClubInviteTokenInput = {
  active?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  inviteLimit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateCollectionInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateEquipmentInput = {
  altNames?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  loadAdjustable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateGymProfileInput = {
  Equipments?: Maybe<Array<ConnectRelationInput>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateJoinClubInviteInput = {
  Responder: ConnectRelationInput;
  id: Scalars['ID'];
  status: JoinClubRequestStatus;
};

export type UpdateJoinClubRequestInput = {
  Responder: ConnectRelationInput;
  id: Scalars['ID'];
  status: JoinClubRequestStatus;
};

export type UpdateLoggedWorkoutInput = {
  GymProfile?: Maybe<ConnectRelationInput>;
  WorkoutGoals: Array<ConnectRelationInput>;
  completedOn?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
};

export type UpdateLoggedWorkoutSectionInput = {
  BodyAreas: Array<ConnectRelationInput>;
  MoveTypes: Array<ConnectRelationInput>;
  id: Scalars['ID'];
  loggedWorkoutSectionData?: Maybe<LoggedWorkoutSectionDataInput>;
  repScore?: Maybe<Scalars['Int']>;
  timeTakenSeconds?: Maybe<Scalars['Int']>;
};

export type UpdateMoveInput = {
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScoreInput>>;
  MoveType?: Maybe<ConnectRelationInput>;
  RequiredEquipments?: Maybe<Array<ConnectRelationInput>>;
  SelectableEquipments?: Maybe<Array<ConnectRelationInput>>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  scope?: Maybe<MoveScope>;
  searchTerms?: Maybe<Scalars['String']>;
  validRepTypes?: Maybe<Array<WorkoutMoveRepType>>;
};

export type UpdateProgressJournalEntryInput = {
  confidenceScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  moodScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  note?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
};

export type UpdateProgressJournalGoalInput = {
  ProgressJournalGoalTags?: Maybe<Array<ConnectRelationInput>>;
  completedDate?: Maybe<Scalars['DateTime']>;
  deadline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateProgressJournalGoalTagInput = {
  hexColor?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tag?: Maybe<Scalars['String']>;
};

export type UpdateProgressJournalInput = {
  coverImageUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateScheduledWorkoutInput = {
  GymProfile?: Maybe<ConnectRelationInput>;
  LoggedWorkout?: Maybe<ConnectRelationInput>;
  Workout?: Maybe<ConnectRelationInput>;
  WorkoutPlanEnrolment?: Maybe<ConnectRelationInput>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  scheduledAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateSortPositionInput = {
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
};

export type UpdateUserBenchmarkEntryInput = {
  completedOn?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  videoThumbUri?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
};

export type UpdateUserBenchmarkInput = {
  UserBenchmarkTags?: Maybe<Array<ConnectRelationInput>>;
  benchmarkType: BenchmarkType;
  description?: Maybe<Scalars['String']>;
  equipmentInfo?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  loadUnit?: Maybe<LoadUnit>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserBenchmarkTagInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserProfileInput = {
  avatarUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  hasOnboarded?: Maybe<Scalars['Boolean']>;
  instagramUrl?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  snapUrl?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  tiktokUrl?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  userProfileScope?: Maybe<UserProfileScope>;
  youtubeUrl?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutInput = {
  WorkoutGoals?: Maybe<Array<ConnectRelationInput>>;
  WorkoutTags?: Maybe<Array<ConnectRelationInput>>;
  contentAccessScope?: Maybe<ContentAccessScope>;
  coverImageUri?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lengthMinutes?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutMoveInput = {
  Equipment?: Maybe<ConnectRelationInput>;
  Move?: Maybe<ConnectRelationInput>;
  distanceUnit?: Maybe<DistanceUnit>;
  id: Scalars['ID'];
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  repType?: Maybe<WorkoutMoveRepType>;
  reps?: Maybe<Scalars['Float']>;
  timeUnit?: Maybe<TimeUnit>;
};

export type UpdateWorkoutPlanDayInput = {
  dayNumber?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutPlanDayWorkoutInput = {
  Workout?: Maybe<ConnectRelationInput>;
  WorkoutPlanDay?: Maybe<ConnectRelationInput>;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutPlanEnrolmentInput = {
  completedPlanDayWorkoutIds?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['DateTime']>;
};

export type UpdateWorkoutPlanInput = {
  WorkoutTags?: Maybe<Array<ConnectRelationInput>>;
  contentAccessScope?: Maybe<ContentAccessScope>;
  coverImageUri?: Maybe<Scalars['String']>;
  daysPerWeek?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lengthWeeks?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutPlanReviewInput = {
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  score?: Maybe<Scalars['Float']>;
};

export type UpdateWorkoutSectionInput = {
  WorkoutSectionType?: Maybe<ConnectRelationInput>;
  classAudioUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classVideoUri?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  rounds?: Maybe<Scalars['Int']>;
  timecap?: Maybe<Scalars['Int']>;
};

export type UpdateWorkoutSetInput = {
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  rounds?: Maybe<Scalars['Int']>;
};

export type UpdateWorkoutTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type UserAvatarData = {
  __typename?: 'UserAvatarData';
  avatarUri?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type UserBenchmark = {
  __typename?: 'UserBenchmark';
  UserBenchmarkEntries: Array<UserBenchmarkEntry>;
  UserBenchmarkTags: Array<UserBenchmarkTag>;
  benchmarkType: BenchmarkType;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipmentInfo?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastEntryAt: Scalars['DateTime'];
  loadUnit: LoadUnit;
  name: Scalars['String'];
};

export type UserBenchmarkEntry = {
  __typename?: 'UserBenchmarkEntry';
  completedOn: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  score: Scalars['Float'];
  videoThumbUri?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
};

export type UserBenchmarkSummary = {
  __typename?: 'UserBenchmarkSummary';
  benchmarkType: BenchmarkType;
  equipmentInfo?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastEntryAt: Scalars['DateTime'];
  loadUnit: LoadUnit;
  name: Scalars['String'];
};

export type UserBenchmarkTag = {
  __typename?: 'UserBenchmarkTag';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserBenchmarkWithBestEntry = {
  __typename?: 'UserBenchmarkWithBestEntry';
  BestEntry?: Maybe<UserBenchmarkEntry>;
  UserBenchmarkSummary: UserBenchmarkSummary;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  BenchmarksWithBestEntries: Array<UserBenchmarkWithBestEntry>;
  Clubs: Array<ClubSummary>;
  LifetimeLogStatsSummary?: Maybe<LifetimeLogStatsSummary>;
  avatarUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  followerCount?: Maybe<Scalars['Int']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  instagramHandle?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  linkedinHandle?: Maybe<Scalars['String']>;
  planCount?: Maybe<Scalars['Int']>;
  postsCount?: Maybe<Scalars['Int']>;
  tagline?: Maybe<Scalars['String']>;
  tiktokHandle?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  userProfileScope: UserProfileScope;
  workoutCount?: Maybe<Scalars['Int']>;
  youtubeHandle?: Maybe<Scalars['String']>;
};

export type UserProfileScope =
  | 'PRIVATE'
  | 'PUBLIC';

export type UserProfileSummary = {
  __typename?: 'UserProfileSummary';
  Clubs: Array<ClubSummary>;
  avatarUri?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  planCount: Scalars['Int'];
  tagline?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  userProfileScope: UserProfileScope;
  workoutCount: Scalars['Int'];
};

export type UserSummary = {
  __typename?: 'UserSummary';
  avatarUri?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  userProfileScope: UserProfileScope;
};

export type Workout = {
  __typename?: 'Workout';
  User: UserSummary;
  WorkoutGoals: Array<WorkoutGoal>;
  WorkoutSections: Array<WorkoutSection>;
  WorkoutTags: Array<WorkoutTag>;
  archived: Scalars['Boolean'];
  contentAccessScope: ContentAccessScope;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  difficultyLevel: DifficultyLevel;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lengthMinutes?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type WorkoutFiltersInput = {
  availableEquipments: Array<Scalars['ID']>;
  bodyweightOnly?: Maybe<Scalars['Boolean']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  excludedMoves: Array<Scalars['ID']>;
  hasClassAudio?: Maybe<Scalars['Boolean']>;
  hasClassVideo?: Maybe<Scalars['Boolean']>;
  maxLength?: Maybe<Scalars['Int']>;
  minLength?: Maybe<Scalars['Int']>;
  requiredMoves: Array<Scalars['ID']>;
  targetedBodyAreas: Array<Scalars['ID']>;
  workoutGoals: Array<Scalars['ID']>;
  workoutSectionTypes: Array<Scalars['ID']>;
};

export type WorkoutGoal = {
  __typename?: 'WorkoutGoal';
  description: Scalars['String'];
  hexColor: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type WorkoutMove = {
  __typename?: 'WorkoutMove';
  Equipment?: Maybe<Equipment>;
  Move: Move;
  distanceUnit: DistanceUnit;
  id: Scalars['ID'];
  loadAmount: Scalars['Float'];
  loadUnit: LoadUnit;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  sortPosition: Scalars['Int'];
  timeUnit: TimeUnit;
};

export type WorkoutMoveRepType =
  | 'CALORIES'
  | 'DISTANCE'
  | 'REPS'
  | 'TIME';

export type WorkoutPlan = {
  __typename?: 'WorkoutPlan';
  User: UserSummary;
  WorkoutPlanDays: Array<WorkoutPlanDay>;
  WorkoutPlanEnrolments: Array<WorkoutPlanEnrolment>;
  WorkoutPlanReviews: Array<WorkoutPlanReview>;
  WorkoutTags: Array<WorkoutTag>;
  archived: Scalars['Boolean'];
  contentAccessScope: ContentAccessScope;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  daysPerWeek: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lengthWeeks: Scalars['Int'];
  name: Scalars['String'];
};

export type WorkoutPlanDay = {
  __typename?: 'WorkoutPlanDay';
  WorkoutPlanDayWorkouts: Array<WorkoutPlanDayWorkout>;
  dayNumber: Scalars['Int'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
};

export type WorkoutPlanDayWorkout = {
  __typename?: 'WorkoutPlanDayWorkout';
  Workout: Workout;
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
};

export type WorkoutPlanEnrolment = {
  __typename?: 'WorkoutPlanEnrolment';
  User: UserSummary;
  completedPlanDayWorkoutIds: Array<Scalars['String']>;
  id: Scalars['ID'];
  startDate: Scalars['DateTime'];
};

export type WorkoutPlanEnrolmentSummary = {
  __typename?: 'WorkoutPlanEnrolmentSummary';
  WorkoutPlan: WorkoutPlanSummary;
  completedPlanDayWorkoutIds: Array<Scalars['String']>;
  id: Scalars['ID'];
  startDate: Scalars['DateTime'];
};

export type WorkoutPlanEnrolmentWithPlan = {
  __typename?: 'WorkoutPlanEnrolmentWithPlan';
  WorkoutPlan: WorkoutPlan;
  WorkoutPlanEnrolment: WorkoutPlanEnrolment;
};

export type WorkoutPlanFiltersInput = {
  bodyweightOnly?: Maybe<Scalars['Boolean']>;
  daysPerWeek?: Maybe<Scalars['Int']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  lengthWeeks?: Maybe<Scalars['Int']>;
  workoutGoals: Array<Scalars['ID']>;
};

export type WorkoutPlanReview = {
  __typename?: 'WorkoutPlanReview';
  User: UserSummary;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  score: Scalars['Float'];
};

export type WorkoutPlanSummary = {
  __typename?: 'WorkoutPlanSummary';
  User: UserSummary;
  archived: Scalars['Boolean'];
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  daysPerWeek: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  enrolmentsCount: Scalars['Int'];
  goals: Array<WorkoutGoal>;
  id: Scalars['ID'];
  lengthWeeks: Scalars['Int'];
  name: Scalars['String'];
  reviewCount: Scalars['Int'];
  reviewScore?: Maybe<Scalars['Float']>;
  tags: Array<Scalars['String']>;
  workoutsCount: Scalars['Int'];
};

export type WorkoutSection = {
  __typename?: 'WorkoutSection';
  WorkoutSectionType: WorkoutSectionType;
  WorkoutSets: Array<WorkoutSet>;
  classAudioUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classVideoUri?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  rounds: Scalars['Int'];
  sortPosition: Scalars['Int'];
  timecap: Scalars['Int'];
};

export type WorkoutSectionRoundData = {
  __typename?: 'WorkoutSectionRoundData';
  sets: Array<WorkoutSectionRoundSetData>;
  timeTakenSeconds: Scalars['Int'];
};

export type WorkoutSectionRoundDataInput = {
  sets: Array<WorkoutSectionRoundSetDataInput>;
  timeTakenSeconds: Scalars['Int'];
};

export type WorkoutSectionRoundSetData = {
  __typename?: 'WorkoutSectionRoundSetData';
  moves: Scalars['String'];
  rounds: Scalars['Int'];
  timeTakenSeconds: Scalars['Int'];
};

export type WorkoutSectionRoundSetDataInput = {
  moves: Scalars['String'];
  rounds: Scalars['Int'];
  timeTakenSeconds: Scalars['Int'];
};

export type WorkoutSectionType = {
  __typename?: 'WorkoutSectionType';
  LoggedWorkoutSections: Array<LoggedWorkoutSection>;
  WorkoutSections: Array<WorkoutSection>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  subtitle: Scalars['String'];
  validRepTypes: Array<WorkoutMoveRepType>;
};

export type WorkoutSet = {
  __typename?: 'WorkoutSet';
  WorkoutMoves: Array<WorkoutMove>;
  duration: Scalars['Int'];
  id: Scalars['ID'];
  rounds: Scalars['Int'];
  sortPosition: Scalars['Int'];
};

export type WorkoutSetGeneratorTarget =
  | 'LOAD'
  | 'REPS';

export type WorkoutSetGeneratorType =
  | 'LADDERDOWN'
  | 'LADDERUP'
  | 'PYRAMIDDOWN'
  | 'PYRAMIDUP';

export type WorkoutSummary = {
  __typename?: 'WorkoutSummary';
  User: UserSummary;
  archived: Scalars['Boolean'];
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  difficultyLevel: DifficultyLevel;
  equipments: Array<Scalars['String']>;
  hasClassAudio: Scalars['Boolean'];
  hasClassVideo: Scalars['Boolean'];
  id: Scalars['ID'];
  lengthMinutes?: Maybe<Scalars['Int']>;
  loggedSessionsCount: Scalars['Int'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type WorkoutTag = {
  __typename?: 'WorkoutTag';
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddWorkoutPlanToClubInput: AddWorkoutPlanToClubInput;
  AddWorkoutPlanToCollectionInput: AddWorkoutPlanToCollectionInput;
  AddWorkoutToClubInput: AddWorkoutToClubInput;
  AddWorkoutToCollectionInput: AddWorkoutToCollectionInput;
  BenchmarkType: BenchmarkType;
  BodyArea: ResolverTypeWrapper<BodyArea>;
  BodyAreaFrontBack: BodyAreaFrontBack;
  BodyAreaMoveScore: ResolverTypeWrapper<BodyAreaMoveScore>;
  BodyAreaMoveScoreInput: BodyAreaMoveScoreInput;
  BodyAreaUpperLower: BodyAreaUpperLower;
  BodyTrackingEntry: ResolverTypeWrapper<BodyTrackingEntry>;
  BodyweightUnit: BodyweightUnit;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CheckClubInviteTokenResult: ResolversTypes['ClubInviteTokenData'] | ResolversTypes['InviteTokenError'];
  Club: ResolverTypeWrapper<Club>;
  ClubInviteToken: ResolverTypeWrapper<ClubInviteToken>;
  ClubInviteTokenData: ResolverTypeWrapper<ClubInviteTokenData>;
  ClubSummary: ResolverTypeWrapper<ClubSummary>;
  Collection: ResolverTypeWrapper<Collection>;
  ConnectRelationInput: ConnectRelationInput;
  ContentAccessScope: ContentAccessScope;
  CopyWorkoutPlanDayToAnotherDayInput: CopyWorkoutPlanDayToAnotherDayInput;
  CreateBodyTrackingEntryInput: CreateBodyTrackingEntryInput;
  CreateClubInput: CreateClubInput;
  CreateClubInviteTokenInput: CreateClubInviteTokenInput;
  CreateClubTimelinePostInput: CreateClubTimelinePostInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateEquipmentInput: CreateEquipmentInput;
  CreateGymProfileInput: CreateGymProfileInput;
  CreateJoinClubInviteInput: CreateJoinClubInviteInput;
  CreateJoinClubRequestInput: CreateJoinClubRequestInput;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateMoveInput: CreateMoveInput;
  CreateProgressJournalEntryInput: CreateProgressJournalEntryInput;
  CreateProgressJournalGoalInput: CreateProgressJournalGoalInput;
  CreateProgressJournalGoalTagInput: CreateProgressJournalGoalTagInput;
  CreateProgressJournalInput: CreateProgressJournalInput;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  CreateUserBenchmarkEntryInput: CreateUserBenchmarkEntryInput;
  CreateUserBenchmarkInput: CreateUserBenchmarkInput;
  CreateUserBenchmarkTagInput: CreateUserBenchmarkTagInput;
  CreateWorkoutInput: CreateWorkoutInput;
  CreateWorkoutMoveInSetInput: CreateWorkoutMoveInSetInput;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  CreateWorkoutPlanDayWithWorkoutInput: CreateWorkoutPlanDayWithWorkoutInput;
  CreateWorkoutPlanDayWorkoutInput: CreateWorkoutPlanDayWorkoutInput;
  CreateWorkoutPlanInput: CreateWorkoutPlanInput;
  CreateWorkoutPlanReviewInput: CreateWorkoutPlanReviewInput;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  CreateWorkoutSetInput: CreateWorkoutSetInput;
  CreateWorkoutSetWithWorkoutMovesInput: CreateWorkoutSetWithWorkoutMovesInput;
  CreateWorkoutTagInput: CreateWorkoutTagInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DifficultyLevel: DifficultyLevel;
  DistanceUnit: DistanceUnit;
  Equipment: ResolverTypeWrapper<Equipment>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gender: Gender;
  GymProfile: ResolverTypeWrapper<GymProfile>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InviteTokenError: ResolverTypeWrapper<InviteTokenError>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JoinClubInvite: ResolverTypeWrapper<JoinClubInvite>;
  JoinClubRequest: ResolverTypeWrapper<JoinClubRequest>;
  JoinClubRequestStatus: JoinClubRequestStatus;
  LifetimeLogStatsSummary: ResolverTypeWrapper<LifetimeLogStatsSummary>;
  LoadUnit: LoadUnit;
  LoggedWorkout: ResolverTypeWrapper<LoggedWorkout>;
  LoggedWorkoutSection: ResolverTypeWrapper<LoggedWorkoutSection>;
  LoggedWorkoutSectionData: ResolverTypeWrapper<LoggedWorkoutSectionData>;
  LoggedWorkoutSectionDataInput: LoggedWorkoutSectionDataInput;
  Move: ResolverTypeWrapper<Move>;
  MoveScope: MoveScope;
  MoveType: ResolverTypeWrapper<MoveType>;
  MoveWorkoutPlanDayToAnotherDayInput: MoveWorkoutPlanDayToAnotherDayInput;
  Mutation: ResolverTypeWrapper<{}>;
  ProgressJournal: ResolverTypeWrapper<ProgressJournal>;
  ProgressJournalEntry: ResolverTypeWrapper<ProgressJournalEntry>;
  ProgressJournalGoal: ResolverTypeWrapper<ProgressJournalGoal>;
  ProgressJournalGoalTag: ResolverTypeWrapper<ProgressJournalGoalTag>;
  Query: ResolverTypeWrapper<{}>;
  RemoveWorkoutFromClubInput: RemoveWorkoutFromClubInput;
  RemoveWorkoutFromCollectionInput: RemoveWorkoutFromCollectionInput;
  RemoveWorkoutPlanFromClubInput: RemoveWorkoutPlanFromClubInput;
  RemoveWorkoutPlanFromCollectionInput: RemoveWorkoutPlanFromCollectionInput;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  SortPositionUpdated: ResolverTypeWrapper<SortPositionUpdated>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TextSearchResult: ResolverTypeWrapper<TextSearchResult>;
  TimeUnit: TimeUnit;
  TimelinePostDataRequestInput: TimelinePostDataRequestInput;
  TimelinePostFullData: ResolverTypeWrapper<TimelinePostFullData>;
  TimelinePostObjectData: ResolverTypeWrapper<TimelinePostObjectData>;
  TimelinePostObjectDataObject: ResolverTypeWrapper<TimelinePostObjectDataObject>;
  TimelinePostObjectDataUser: ResolverTypeWrapper<TimelinePostObjectDataUser>;
  TimelinePostType: TimelinePostType;
  UpdateBodyTrackingEntryInput: UpdateBodyTrackingEntryInput;
  UpdateClubInput: UpdateClubInput;
  UpdateClubInviteTokenInput: UpdateClubInviteTokenInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  UpdateJoinClubInviteInput: UpdateJoinClubInviteInput;
  UpdateJoinClubRequestInput: UpdateJoinClubRequestInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateMoveInput: UpdateMoveInput;
  UpdateProgressJournalEntryInput: UpdateProgressJournalEntryInput;
  UpdateProgressJournalGoalInput: UpdateProgressJournalGoalInput;
  UpdateProgressJournalGoalTagInput: UpdateProgressJournalGoalTagInput;
  UpdateProgressJournalInput: UpdateProgressJournalInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  UpdateSortPositionInput: UpdateSortPositionInput;
  UpdateUserBenchmarkEntryInput: UpdateUserBenchmarkEntryInput;
  UpdateUserBenchmarkInput: UpdateUserBenchmarkInput;
  UpdateUserBenchmarkTagInput: UpdateUserBenchmarkTagInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  UpdateWorkoutPlanDayInput: UpdateWorkoutPlanDayInput;
  UpdateWorkoutPlanDayWorkoutInput: UpdateWorkoutPlanDayWorkoutInput;
  UpdateWorkoutPlanEnrolmentInput: UpdateWorkoutPlanEnrolmentInput;
  UpdateWorkoutPlanInput: UpdateWorkoutPlanInput;
  UpdateWorkoutPlanReviewInput: UpdateWorkoutPlanReviewInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  UserAvatarData: ResolverTypeWrapper<UserAvatarData>;
  UserBenchmark: ResolverTypeWrapper<UserBenchmark>;
  UserBenchmarkEntry: ResolverTypeWrapper<UserBenchmarkEntry>;
  UserBenchmarkSummary: ResolverTypeWrapper<UserBenchmarkSummary>;
  UserBenchmarkTag: ResolverTypeWrapper<UserBenchmarkTag>;
  UserBenchmarkWithBestEntry: ResolverTypeWrapper<UserBenchmarkWithBestEntry>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  UserProfileScope: UserProfileScope;
  UserProfileSummary: ResolverTypeWrapper<UserProfileSummary>;
  UserSummary: ResolverTypeWrapper<UserSummary>;
  Workout: ResolverTypeWrapper<Workout>;
  WorkoutFiltersInput: WorkoutFiltersInput;
  WorkoutGoal: ResolverTypeWrapper<WorkoutGoal>;
  WorkoutMove: ResolverTypeWrapper<WorkoutMove>;
  WorkoutMoveRepType: WorkoutMoveRepType;
  WorkoutPlan: ResolverTypeWrapper<WorkoutPlan>;
  WorkoutPlanDay: ResolverTypeWrapper<WorkoutPlanDay>;
  WorkoutPlanDayWorkout: ResolverTypeWrapper<WorkoutPlanDayWorkout>;
  WorkoutPlanEnrolment: ResolverTypeWrapper<WorkoutPlanEnrolment>;
  WorkoutPlanEnrolmentSummary: ResolverTypeWrapper<WorkoutPlanEnrolmentSummary>;
  WorkoutPlanEnrolmentWithPlan: ResolverTypeWrapper<WorkoutPlanEnrolmentWithPlan>;
  WorkoutPlanFiltersInput: WorkoutPlanFiltersInput;
  WorkoutPlanReview: ResolverTypeWrapper<WorkoutPlanReview>;
  WorkoutPlanSummary: ResolverTypeWrapper<WorkoutPlanSummary>;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  WorkoutSectionRoundData: ResolverTypeWrapper<WorkoutSectionRoundData>;
  WorkoutSectionRoundDataInput: WorkoutSectionRoundDataInput;
  WorkoutSectionRoundSetData: ResolverTypeWrapper<WorkoutSectionRoundSetData>;
  WorkoutSectionRoundSetDataInput: WorkoutSectionRoundSetDataInput;
  WorkoutSectionType: ResolverTypeWrapper<WorkoutSectionType>;
  WorkoutSet: ResolverTypeWrapper<WorkoutSet>;
  WorkoutSetGeneratorTarget: WorkoutSetGeneratorTarget;
  WorkoutSetGeneratorType: WorkoutSetGeneratorType;
  WorkoutSummary: ResolverTypeWrapper<WorkoutSummary>;
  WorkoutTag: ResolverTypeWrapper<WorkoutTag>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddWorkoutPlanToClubInput: AddWorkoutPlanToClubInput;
  AddWorkoutPlanToCollectionInput: AddWorkoutPlanToCollectionInput;
  AddWorkoutToClubInput: AddWorkoutToClubInput;
  AddWorkoutToCollectionInput: AddWorkoutToCollectionInput;
  BodyArea: BodyArea;
  BodyAreaMoveScore: BodyAreaMoveScore;
  BodyAreaMoveScoreInput: BodyAreaMoveScoreInput;
  BodyTrackingEntry: BodyTrackingEntry;
  Boolean: Scalars['Boolean'];
  CheckClubInviteTokenResult: ResolversParentTypes['ClubInviteTokenData'] | ResolversParentTypes['InviteTokenError'];
  Club: Club;
  ClubInviteToken: ClubInviteToken;
  ClubInviteTokenData: ClubInviteTokenData;
  ClubSummary: ClubSummary;
  Collection: Collection;
  ConnectRelationInput: ConnectRelationInput;
  CopyWorkoutPlanDayToAnotherDayInput: CopyWorkoutPlanDayToAnotherDayInput;
  CreateBodyTrackingEntryInput: CreateBodyTrackingEntryInput;
  CreateClubInput: CreateClubInput;
  CreateClubInviteTokenInput: CreateClubInviteTokenInput;
  CreateClubTimelinePostInput: CreateClubTimelinePostInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateEquipmentInput: CreateEquipmentInput;
  CreateGymProfileInput: CreateGymProfileInput;
  CreateJoinClubInviteInput: CreateJoinClubInviteInput;
  CreateJoinClubRequestInput: CreateJoinClubRequestInput;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateMoveInput: CreateMoveInput;
  CreateProgressJournalEntryInput: CreateProgressJournalEntryInput;
  CreateProgressJournalGoalInput: CreateProgressJournalGoalInput;
  CreateProgressJournalGoalTagInput: CreateProgressJournalGoalTagInput;
  CreateProgressJournalInput: CreateProgressJournalInput;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  CreateUserBenchmarkEntryInput: CreateUserBenchmarkEntryInput;
  CreateUserBenchmarkInput: CreateUserBenchmarkInput;
  CreateUserBenchmarkTagInput: CreateUserBenchmarkTagInput;
  CreateWorkoutInput: CreateWorkoutInput;
  CreateWorkoutMoveInSetInput: CreateWorkoutMoveInSetInput;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  CreateWorkoutPlanDayWithWorkoutInput: CreateWorkoutPlanDayWithWorkoutInput;
  CreateWorkoutPlanDayWorkoutInput: CreateWorkoutPlanDayWorkoutInput;
  CreateWorkoutPlanInput: CreateWorkoutPlanInput;
  CreateWorkoutPlanReviewInput: CreateWorkoutPlanReviewInput;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  CreateWorkoutSetInput: CreateWorkoutSetInput;
  CreateWorkoutSetWithWorkoutMovesInput: CreateWorkoutSetWithWorkoutMovesInput;
  CreateWorkoutTagInput: CreateWorkoutTagInput;
  DateTime: Scalars['DateTime'];
  Equipment: Equipment;
  Float: Scalars['Float'];
  GymProfile: GymProfile;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InviteTokenError: InviteTokenError;
  JSON: Scalars['JSON'];
  JoinClubInvite: JoinClubInvite;
  JoinClubRequest: JoinClubRequest;
  LifetimeLogStatsSummary: LifetimeLogStatsSummary;
  LoggedWorkout: LoggedWorkout;
  LoggedWorkoutSection: LoggedWorkoutSection;
  LoggedWorkoutSectionData: LoggedWorkoutSectionData;
  LoggedWorkoutSectionDataInput: LoggedWorkoutSectionDataInput;
  Move: Move;
  MoveType: MoveType;
  MoveWorkoutPlanDayToAnotherDayInput: MoveWorkoutPlanDayToAnotherDayInput;
  Mutation: {};
  ProgressJournal: ProgressJournal;
  ProgressJournalEntry: ProgressJournalEntry;
  ProgressJournalGoal: ProgressJournalGoal;
  ProgressJournalGoalTag: ProgressJournalGoalTag;
  Query: {};
  RemoveWorkoutFromClubInput: RemoveWorkoutFromClubInput;
  RemoveWorkoutFromCollectionInput: RemoveWorkoutFromCollectionInput;
  RemoveWorkoutPlanFromClubInput: RemoveWorkoutPlanFromClubInput;
  RemoveWorkoutPlanFromCollectionInput: RemoveWorkoutPlanFromCollectionInput;
  ScheduledWorkout: ScheduledWorkout;
  SortPositionUpdated: SortPositionUpdated;
  String: Scalars['String'];
  TextSearchResult: TextSearchResult;
  TimelinePostDataRequestInput: TimelinePostDataRequestInput;
  TimelinePostFullData: TimelinePostFullData;
  TimelinePostObjectData: TimelinePostObjectData;
  TimelinePostObjectDataObject: TimelinePostObjectDataObject;
  TimelinePostObjectDataUser: TimelinePostObjectDataUser;
  UpdateBodyTrackingEntryInput: UpdateBodyTrackingEntryInput;
  UpdateClubInput: UpdateClubInput;
  UpdateClubInviteTokenInput: UpdateClubInviteTokenInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  UpdateJoinClubInviteInput: UpdateJoinClubInviteInput;
  UpdateJoinClubRequestInput: UpdateJoinClubRequestInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateMoveInput: UpdateMoveInput;
  UpdateProgressJournalEntryInput: UpdateProgressJournalEntryInput;
  UpdateProgressJournalGoalInput: UpdateProgressJournalGoalInput;
  UpdateProgressJournalGoalTagInput: UpdateProgressJournalGoalTagInput;
  UpdateProgressJournalInput: UpdateProgressJournalInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  UpdateSortPositionInput: UpdateSortPositionInput;
  UpdateUserBenchmarkEntryInput: UpdateUserBenchmarkEntryInput;
  UpdateUserBenchmarkInput: UpdateUserBenchmarkInput;
  UpdateUserBenchmarkTagInput: UpdateUserBenchmarkTagInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  UpdateWorkoutPlanDayInput: UpdateWorkoutPlanDayInput;
  UpdateWorkoutPlanDayWorkoutInput: UpdateWorkoutPlanDayWorkoutInput;
  UpdateWorkoutPlanEnrolmentInput: UpdateWorkoutPlanEnrolmentInput;
  UpdateWorkoutPlanInput: UpdateWorkoutPlanInput;
  UpdateWorkoutPlanReviewInput: UpdateWorkoutPlanReviewInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  UserAvatarData: UserAvatarData;
  UserBenchmark: UserBenchmark;
  UserBenchmarkEntry: UserBenchmarkEntry;
  UserBenchmarkSummary: UserBenchmarkSummary;
  UserBenchmarkTag: UserBenchmarkTag;
  UserBenchmarkWithBestEntry: UserBenchmarkWithBestEntry;
  UserProfile: UserProfile;
  UserProfileSummary: UserProfileSummary;
  UserSummary: UserSummary;
  Workout: Workout;
  WorkoutFiltersInput: WorkoutFiltersInput;
  WorkoutGoal: WorkoutGoal;
  WorkoutMove: WorkoutMove;
  WorkoutPlan: WorkoutPlan;
  WorkoutPlanDay: WorkoutPlanDay;
  WorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  WorkoutPlanEnrolment: WorkoutPlanEnrolment;
  WorkoutPlanEnrolmentSummary: WorkoutPlanEnrolmentSummary;
  WorkoutPlanEnrolmentWithPlan: WorkoutPlanEnrolmentWithPlan;
  WorkoutPlanFiltersInput: WorkoutPlanFiltersInput;
  WorkoutPlanReview: WorkoutPlanReview;
  WorkoutPlanSummary: WorkoutPlanSummary;
  WorkoutSection: WorkoutSection;
  WorkoutSectionRoundData: WorkoutSectionRoundData;
  WorkoutSectionRoundDataInput: WorkoutSectionRoundDataInput;
  WorkoutSectionRoundSetData: WorkoutSectionRoundSetData;
  WorkoutSectionRoundSetDataInput: WorkoutSectionRoundSetDataInput;
  WorkoutSectionType: WorkoutSectionType;
  WorkoutSet: WorkoutSet;
  WorkoutSummary: WorkoutSummary;
  WorkoutTag: WorkoutTag;
}>;

export type BodyAreaResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyArea'] = ResolversParentTypes['BodyArea']> = ResolversObject<{
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontBack?: Resolver<ResolversTypes['BodyAreaFrontBack'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  upperLower?: Resolver<ResolversTypes['BodyAreaUpperLower'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BodyAreaMoveScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyAreaMoveScore'] = ResolversParentTypes['BodyAreaMoveScore']> = ResolversObject<{
  BodyArea?: Resolver<ResolversTypes['BodyArea'], ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BodyTrackingEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyTrackingEntry'] = ResolversParentTypes['BodyTrackingEntry']> = ResolversObject<{
  bodyweight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bodyweightUnit?: Resolver<Maybe<ResolversTypes['BodyweightUnit']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fatPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoUris?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CheckClubInviteTokenResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckClubInviteTokenResult'] = ResolversParentTypes['CheckClubInviteTokenResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ClubInviteTokenData' | 'InviteTokenError', ParentType, ContextType>;
}>;

export type ClubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Club'] = ResolversParentTypes['Club']> = ResolversObject<{
  Admins?: Resolver<Array<ResolversTypes['UserSummary']>, ParentType, ContextType>;
  ClubInviteTokens?: Resolver<Maybe<Array<ResolversTypes['ClubInviteToken']>>, ParentType, ContextType>;
  JoinClubInvites?: Resolver<Maybe<Array<ResolversTypes['JoinClubInvite']>>, ParentType, ContextType>;
  JoinClubRequests?: Resolver<Maybe<Array<ResolversTypes['JoinClubRequest']>>, ParentType, ContextType>;
  Members?: Resolver<Array<ResolversTypes['UserSummary']>, ParentType, ContextType>;
  Owner?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  WorkoutPlans?: Resolver<Maybe<Array<ResolversTypes['WorkoutPlanSummary']>>, ParentType, ContextType>;
  Workouts?: Resolver<Maybe<Array<ResolversTypes['WorkoutSummary']>>, ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubInviteTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubInviteToken'] = ResolversParentTypes['ClubInviteToken']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inviteLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  joinedUserIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubInviteTokenDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubInviteTokenData'] = ResolversParentTypes['ClubInviteTokenData']> = ResolversObject<{
  Club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubSummary'] = ResolversParentTypes['ClubSummary']> = ResolversObject<{
  Owner?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  WorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanSummary']>, ParentType, ContextType>;
  Workouts?: Resolver<Array<ResolversTypes['WorkoutSummary']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = ResolversObject<{
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loadAdjustable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GymProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['GymProfile'] = ResolversParentTypes['GymProfile']> = ResolversObject<{
  Equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InviteTokenErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteTokenError'] = ResolversParentTypes['InviteTokenError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type JoinClubInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinClubInvite'] = ResolversParentTypes['JoinClubInvite']> = ResolversObject<{
  Invited?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  Responder?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  Sender?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  respondedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JoinClubRequestStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JoinClubRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['JoinClubRequest'] = ResolversParentTypes['JoinClubRequest']> = ResolversObject<{
  Applicant?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  Responder?: Resolver<Maybe<ResolversTypes['UserSummary']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  respondedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JoinClubRequestStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LifetimeLogStatsSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['LifetimeLogStatsSummary'] = ResolversParentTypes['LifetimeLogStatsSummary']> = ResolversObject<{
  minutesWorked?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sessionsLogged?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkout'] = ResolversParentTypes['LoggedWorkout']> = ResolversObject<{
  GymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  LoggedWorkoutSections?: Resolver<Array<ResolversTypes['LoggedWorkoutSection']>, ParentType, ContextType>;
  ScheduledWorkout?: Resolver<Maybe<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSection'] = ResolversParentTypes['LoggedWorkoutSection']> = ResolversObject<{
  BodyAreas?: Resolver<Array<ResolversTypes['BodyArea']>, ParentType, ContextType>;
  LoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType>;
  MoveTypes?: Resolver<Array<ResolversTypes['MoveType']>, ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loggedWorkoutSectionData?: Resolver<Maybe<ResolversTypes['LoggedWorkoutSectionData']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSectionDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSectionData'] = ResolversParentTypes['LoggedWorkoutSectionData']> = ResolversObject<{
  rounds?: Resolver<Array<ResolversTypes['WorkoutSectionRoundData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Move'] = ResolversParentTypes['Move']> = ResolversObject<{
  BodyAreaMoveScores?: Resolver<Array<ResolversTypes['BodyAreaMoveScore']>, ParentType, ContextType>;
  MoveType?: Resolver<ResolversTypes['MoveType'], ParentType, ContextType>;
  RequiredEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  SelectableEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  demoVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['MoveScope'], ParentType, ContextType>;
  searchTerms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validRepTypes?: Resolver<Array<ResolversTypes['WorkoutMoveRepType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveType'] = ResolversParentTypes['MoveType']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addUserToClubViaInviteToken?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationAddUserToClubViaInviteTokenArgs, 'clubInviteTokenId' | 'userId'>>;
  addWorkoutPlanToClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationAddWorkoutPlanToClubArgs, 'clubId' | 'workoutPlanId'>>;
  addWorkoutPlanToCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationAddWorkoutPlanToCollectionArgs, 'data'>>;
  addWorkoutToClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationAddWorkoutToClubArgs, 'clubId' | 'workoutId'>>;
  addWorkoutToCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationAddWorkoutToCollectionArgs, 'data'>>;
  archiveCustomMoveById?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationArchiveCustomMoveByIdArgs, 'id'>>;
  archiveWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationArchiveWorkoutByIdArgs, 'id'>>;
  archiveWorkoutPlanById?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationArchiveWorkoutPlanByIdArgs, 'id'>>;
  copyWorkoutPlanDayToAnotherDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationCopyWorkoutPlanDayToAnotherDayArgs, 'data'>>;
  createBodyTrackingEntry?: Resolver<ResolversTypes['BodyTrackingEntry'], ParentType, ContextType, RequireFields<MutationCreateBodyTrackingEntryArgs, 'data'>>;
  createClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationCreateClubArgs, 'data'>>;
  createClubInviteToken?: Resolver<ResolversTypes['ClubInviteToken'], ParentType, ContextType, RequireFields<MutationCreateClubInviteTokenArgs, 'data'>>;
  createClubTimelinePost?: Resolver<ResolversTypes['TimelinePostFullData'], ParentType, ContextType, RequireFields<MutationCreateClubTimelinePostArgs, 'data'>>;
  createCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'data'>>;
  createEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationCreateEquipmentArgs, 'data'>>;
  createGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationCreateGymProfileArgs, 'data'>>;
  createLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutArgs, 'data'>>;
  createMove?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationCreateMoveArgs, 'data'>>;
  createProgressJournal?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalArgs, 'data'>>;
  createProgressJournalEntry?: Resolver<ResolversTypes['ProgressJournalEntry'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalEntryArgs, 'data'>>;
  createProgressJournalGoal?: Resolver<ResolversTypes['ProgressJournalGoal'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalGoalArgs, 'data'>>;
  createProgressJournalGoalTag?: Resolver<ResolversTypes['ProgressJournalGoalTag'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalGoalTagArgs, 'data'>>;
  createScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationCreateScheduledWorkoutArgs, 'data'>>;
  createUserBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkArgs, 'data'>>;
  createUserBenchmarkEntry?: Resolver<ResolversTypes['UserBenchmarkEntry'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkEntryArgs, 'data'>>;
  createUserBenchmarkTag?: Resolver<ResolversTypes['UserBenchmarkTag'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkTagArgs, 'data'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'data'>>;
  createWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationCreateWorkoutMoveArgs, 'data'>>;
  createWorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanArgs, 'data'>>;
  createWorkoutPlanDayWithWorkout?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanDayWithWorkoutArgs, 'data'>>;
  createWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanDayWorkout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanDayWorkoutArgs, 'data'>>;
  createWorkoutPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolmentWithPlan'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanEnrolmentArgs, 'workoutPlanId'>>;
  createWorkoutPlanReview?: Resolver<ResolversTypes['WorkoutPlanReview'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanReviewArgs, 'data'>>;
  createWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSectionArgs, 'data'>>;
  createWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetArgs, 'data'>>;
  createWorkoutSetWithWorkoutMoves?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetWithWorkoutMovesArgs, 'data'>>;
  createWorkoutTag?: Resolver<ResolversTypes['WorkoutTag'], ParentType, ContextType, RequireFields<MutationCreateWorkoutTagArgs, 'data'>>;
  deleteBodyTrackingEntryById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBodyTrackingEntryByIdArgs, 'id'>>;
  deleteClubById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteClubByIdArgs, 'id'>>;
  deleteClubInviteTokenById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteClubInviteTokenByIdArgs, 'id'>>;
  deleteClubTimelinePost?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteClubTimelinePostArgs, 'activityId'>>;
  deleteCollectionById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCollectionByIdArgs, 'id'>>;
  deleteGymProfileById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteGymProfileByIdArgs, 'id'>>;
  deleteLoggedWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutByIdArgs, 'id'>>;
  deleteProgressJournalById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalByIdArgs, 'id'>>;
  deleteProgressJournalEntryById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalEntryByIdArgs, 'id'>>;
  deleteProgressJournalGoalById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalGoalByIdArgs, 'id'>>;
  deleteProgressJournalGoalTagById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalGoalTagByIdArgs, 'id'>>;
  deleteScheduledWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteScheduledWorkoutByIdArgs, 'id'>>;
  deleteUserBenchmarkById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkByIdArgs, 'id'>>;
  deleteUserBenchmarkEntryById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkEntryByIdArgs, 'id'>>;
  deleteUserBenchmarkTagById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkTagByIdArgs, 'id'>>;
  deleteWorkoutMoveById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutMoveByIdArgs, 'id'>>;
  deleteWorkoutPlanDayWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanDayWorkoutByIdArgs, 'id'>>;
  deleteWorkoutPlanDaysById?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanDaysByIdArgs, 'ids'>>;
  deleteWorkoutPlanEnrolmentById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanEnrolmentByIdArgs, 'id'>>;
  deleteWorkoutPlanReviewById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanReviewByIdArgs, 'id'>>;
  deleteWorkoutSectionById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSectionByIdArgs, 'id'>>;
  deleteWorkoutSetById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetByIdArgs, 'id'>>;
  deleteWorkoutTagById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutTagByIdArgs, 'id'>>;
  duplicateWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationDuplicateWorkoutByIdArgs, 'id'>>;
  duplicateWorkoutMoveById?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationDuplicateWorkoutMoveByIdArgs, 'id'>>;
  duplicateWorkoutSetById?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationDuplicateWorkoutSetByIdArgs, 'id'>>;
  giveMemberAdminStatus?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationGiveMemberAdminStatusArgs, 'clubId' | 'userId'>>;
  makeCopyWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationMakeCopyWorkoutByIdArgs, 'id'>>;
  moveWorkoutPlanDayToAnotherDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationMoveWorkoutPlanDayToAnotherDayArgs, 'data'>>;
  removeMemberAdminStatus?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationRemoveMemberAdminStatusArgs, 'clubId' | 'userId'>>;
  removeUserFromClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationRemoveUserFromClubArgs, 'clubId' | 'userToRemoveId'>>;
  removeWorkoutFromClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutFromClubArgs, 'clubId' | 'workoutId'>>;
  removeWorkoutFromCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutFromCollectionArgs, 'data'>>;
  removeWorkoutPlanFromClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutPlanFromClubArgs, 'clubId' | 'workoutPlanId'>>;
  removeWorkoutPlanFromCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutPlanFromCollectionArgs, 'data'>>;
  reorderWorkoutMoves?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutMovesArgs, 'data'>>;
  reorderWorkoutPlanDayWorkouts?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutPlanDayWorkoutsArgs, 'data'>>;
  reorderWorkoutSections?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutSectionsArgs, 'data'>>;
  reorderWorkoutSets?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutSetsArgs, 'data'>>;
  softDeleteMoveById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationSoftDeleteMoveByIdArgs, 'id'>>;
  softDeleteWorkoutPlanById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationSoftDeleteWorkoutPlanByIdArgs, 'id'>>;
  unarchiveCustomMoveById?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationUnarchiveCustomMoveByIdArgs, 'id'>>;
  unarchiveWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationUnarchiveWorkoutByIdArgs, 'id'>>;
  unarchiveWorkoutPlanById?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationUnarchiveWorkoutPlanByIdArgs, 'id'>>;
  updateBodyTrackingEntry?: Resolver<ResolversTypes['BodyTrackingEntry'], ParentType, ContextType, RequireFields<MutationUpdateBodyTrackingEntryArgs, 'data'>>;
  updateClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationUpdateClubArgs, 'data'>>;
  updateClubInviteToken?: Resolver<ResolversTypes['ClubInviteToken'], ParentType, ContextType, RequireFields<MutationUpdateClubInviteTokenArgs, 'data'>>;
  updateCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationUpdateCollectionArgs, 'data'>>;
  updateEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationUpdateEquipmentArgs, 'data'>>;
  updateGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationUpdateGymProfileArgs, 'data'>>;
  updateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutArgs, 'data'>>;
  updateLoggedWorkoutSection?: Resolver<ResolversTypes['LoggedWorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutSectionArgs, 'data'>>;
  updateMove?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationUpdateMoveArgs, 'data'>>;
  updateProgressJournal?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalArgs, 'data'>>;
  updateProgressJournalEntry?: Resolver<ResolversTypes['ProgressJournalEntry'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalEntryArgs, 'data'>>;
  updateProgressJournalGoal?: Resolver<ResolversTypes['ProgressJournalGoal'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalGoalArgs, 'data'>>;
  updateProgressJournalGoalTag?: Resolver<ResolversTypes['ProgressJournalGoalTag'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalGoalTagArgs, 'data'>>;
  updateScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationUpdateScheduledWorkoutArgs, 'data'>>;
  updateUserBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkArgs, 'data'>>;
  updateUserBenchmarkEntry?: Resolver<ResolversTypes['UserBenchmarkEntry'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkEntryArgs, 'data'>>;
  updateUserBenchmarkTag?: Resolver<ResolversTypes['UserBenchmarkTag'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkTagArgs, 'data'>>;
  updateUserProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'data'>>;
  updateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutArgs, 'data'>>;
  updateWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutMoveArgs, 'data'>>;
  updateWorkoutMoves?: Resolver<Array<ResolversTypes['WorkoutMove']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutMovesArgs, 'data'>>;
  updateWorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanArgs, 'data'>>;
  updateWorkoutPlanDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanDayArgs, 'data'>>;
  updateWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanDayWorkout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanDayWorkoutArgs, 'data'>>;
  updateWorkoutPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanEnrolmentArgs, 'data'>>;
  updateWorkoutPlanReview?: Resolver<ResolversTypes['WorkoutPlanReview'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanReviewArgs, 'data'>>;
  updateWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSectionArgs, 'data'>>;
  updateWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetArgs, 'data'>>;
  updateWorkoutTag?: Resolver<ResolversTypes['WorkoutTag'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutTagArgs, 'data'>>;
  userJoinPublicClub?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUserJoinPublicClubArgs, 'clubId'>>;
}>;

export type ProgressJournalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournal'] = ResolversParentTypes['ProgressJournal']> = ResolversObject<{
  ProgressJournalEntries?: Resolver<Array<ResolversTypes['ProgressJournalEntry']>, ParentType, ContextType>;
  ProgressJournalGoals?: Resolver<Array<ResolversTypes['ProgressJournalGoal']>, ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalEntry'] = ResolversParentTypes['ProgressJournalEntry']> = ResolversObject<{
  ProgressJournal?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType>;
  confidenceScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  energyScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moodScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  motivationScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voiceNoteUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalGoal'] = ResolversParentTypes['ProgressJournalGoal']> = ResolversObject<{
  ProgressJournalGoalTags?: Resolver<Array<ResolversTypes['ProgressJournalGoalTag']>, ParentType, ContextType>;
  completedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalGoalTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalGoalTag'] = ResolversParentTypes['ProgressJournalGoalTag']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hexColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bodyAreas?: Resolver<Array<ResolversTypes['BodyArea']>, ParentType, ContextType>;
  bodyTrackingEntries?: Resolver<Array<ResolversTypes['BodyTrackingEntry']>, ParentType, ContextType>;
  checkClubInviteToken?: Resolver<ResolversTypes['CheckClubInviteTokenResult'], ParentType, ContextType, RequireFields<QueryCheckClubInviteTokenArgs, 'id'>>;
  checkUniqueClubName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueClubNameArgs, 'name'>>;
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  clubById?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<QueryClubByIdArgs, 'id'>>;
  clubMembersFeedPosts?: Resolver<Array<ResolversTypes['TimelinePostFullData']>, ParentType, ContextType, RequireFields<QueryClubMembersFeedPostsArgs, 'clubId' | 'limit' | 'offset'>>;
  clubSummariesById?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType, RequireFields<QueryClubSummariesByIdArgs, 'ids'>>;
  equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  gymProfiles?: Resolver<Array<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  lifetimeLogStatsSummary?: Resolver<ResolversTypes['LifetimeLogStatsSummary'], ParentType, ContextType, RequireFields<QueryLifetimeLogStatsSummaryArgs, 'userId'>>;
  logCountByWorkout?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryLogCountByWorkoutArgs, 'id'>>;
  loggedWorkoutById?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<QueryLoggedWorkoutByIdArgs, 'id'>>;
  moveTypes?: Resolver<Array<ResolversTypes['MoveType']>, ParentType, ContextType>;
  progressJournalById?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<QueryProgressJournalByIdArgs, 'id'>>;
  progressJournalGoalTags?: Resolver<Array<ResolversTypes['ProgressJournalGoalTag']>, ParentType, ContextType>;
  publicClubs?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType>;
  publicWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanSummary']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutPlansArgs, never>>;
  publicWorkouts?: Resolver<Array<ResolversTypes['WorkoutSummary']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutsArgs, never>>;
  standardMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  textSearchUserNames?: Resolver<Maybe<Array<ResolversTypes['TextSearchResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchUserNamesArgs, 'text'>>;
  textSearchUserProfiles?: Resolver<Maybe<Array<ResolversTypes['UserProfileSummary']>>, ParentType, ContextType, RequireFields<QueryTextSearchUserProfilesArgs, 'text'>>;
  textSearchWorkoutNames?: Resolver<Maybe<Array<ResolversTypes['TextSearchResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutNamesArgs, 'text'>>;
  textSearchWorkoutPlanNames?: Resolver<Maybe<Array<ResolversTypes['TextSearchResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutPlanNamesArgs, 'text'>>;
  textSearchWorkoutPlans?: Resolver<Maybe<Array<ResolversTypes['WorkoutPlanSummary']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutPlansArgs, 'text'>>;
  textSearchWorkouts?: Resolver<Maybe<Array<ResolversTypes['WorkoutSummary']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutsArgs, 'text'>>;
  timelinePostsData?: Resolver<Array<ResolversTypes['TimelinePostObjectData']>, ParentType, ContextType, RequireFields<QueryTimelinePostsDataArgs, 'postDataRequests'>>;
  userArchivedCustomMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userArchivedWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlan']>, ParentType, ContextType>;
  userArchivedWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  userAvatarById?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType, RequireFields<QueryUserAvatarByIdArgs, 'id'>>;
  userAvatars?: Resolver<Array<ResolversTypes['UserAvatarData']>, ParentType, ContextType, RequireFields<QueryUserAvatarsArgs, 'ids'>>;
  userBenchmarkById?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<QueryUserBenchmarkByIdArgs, 'id'>>;
  userBenchmarkTags?: Resolver<Array<ResolversTypes['UserBenchmarkTag']>, ParentType, ContextType>;
  userBenchmarks?: Resolver<Array<ResolversTypes['UserBenchmark']>, ParentType, ContextType>;
  userClubs?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType>;
  userCollectionById?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<QueryUserCollectionByIdArgs, 'id'>>;
  userCollections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  userCustomMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userLoggedWorkouts?: Resolver<Array<ResolversTypes['LoggedWorkout']>, ParentType, ContextType, RequireFields<QueryUserLoggedWorkoutsArgs, never>>;
  userProfileById?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<QueryUserProfileByIdArgs, 'userId'>>;
  userProfiles?: Resolver<Array<ResolversTypes['UserProfileSummary']>, ParentType, ContextType, RequireFields<QueryUserProfilesArgs, never>>;
  userProgressJournals?: Resolver<Array<ResolversTypes['ProgressJournal']>, ParentType, ContextType>;
  userScheduledWorkouts?: Resolver<Array<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  userWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanSummary']>, ParentType, ContextType>;
  userWorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  userWorkouts?: Resolver<Array<ResolversTypes['WorkoutSummary']>, ParentType, ContextType>;
  validateToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  workoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<QueryWorkoutByIdArgs, 'id'>>;
  workoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  workoutPlanById?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<QueryWorkoutPlanByIdArgs, 'id'>>;
  workoutPlanEnrolmentById?: Resolver<ResolversTypes['WorkoutPlanEnrolmentWithPlan'], ParentType, ContextType, RequireFields<QueryWorkoutPlanEnrolmentByIdArgs, 'id'>>;
  workoutPlanEnrolments?: Resolver<Array<ResolversTypes['WorkoutPlanEnrolmentSummary']>, ParentType, ContextType>;
  workoutSectionTypes?: Resolver<Array<ResolversTypes['WorkoutSectionType']>, ParentType, ContextType>;
}>;

export type ScheduledWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduledWorkout'] = ResolversParentTypes['ScheduledWorkout']> = ResolversObject<{
  GymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  Workout?: Resolver<Maybe<ResolversTypes['WorkoutSummary']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loggedWorkoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scheduledAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  workoutPlanEnrolmentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SortPositionUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['SortPositionUpdated'] = ResolversParentTypes['SortPositionUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TextSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextSearchResult'] = ResolversParentTypes['TextSearchResult']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimelinePostFullDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimelinePostFullData'] = ResolversParentTypes['TimelinePostFullData']> = ResolversObject<{
  activityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['TimelinePostObjectDataUser'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['TimelinePostObjectDataObject'], ParentType, ContextType>;
  postedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  poster?: Resolver<ResolversTypes['TimelinePostObjectDataUser'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimelinePostObjectDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimelinePostObjectData'] = ResolversParentTypes['TimelinePostObjectData']> = ResolversObject<{
  activityId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['TimelinePostObjectDataUser'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['TimelinePostObjectDataObject'], ParentType, ContextType>;
  poster?: Resolver<ResolversTypes['TimelinePostObjectDataUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimelinePostObjectDataObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimelinePostObjectDataObject'] = ResolversParentTypes['TimelinePostObjectDataObject']> = ResolversObject<{
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TimelinePostType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimelinePostObjectDataUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimelinePostObjectDataUser'] = ResolversParentTypes['TimelinePostObjectDataUser']> = ResolversObject<{
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAvatarDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvatarData'] = ResolversParentTypes['UserAvatarData']> = ResolversObject<{
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmark'] = ResolversParentTypes['UserBenchmark']> = ResolversObject<{
  UserBenchmarkEntries?: Resolver<Array<ResolversTypes['UserBenchmarkEntry']>, ParentType, ContextType>;
  UserBenchmarkTags?: Resolver<Array<ResolversTypes['UserBenchmarkTag']>, ParentType, ContextType>;
  benchmarkType?: Resolver<ResolversTypes['BenchmarkType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  equipmentInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastEntryAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmarkEntry'] = ResolversParentTypes['UserBenchmarkEntry']> = ResolversObject<{
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  videoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmarkSummary'] = ResolversParentTypes['UserBenchmarkSummary']> = ResolversObject<{
  benchmarkType?: Resolver<ResolversTypes['BenchmarkType'], ParentType, ContextType>;
  equipmentInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastEntryAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmarkTag'] = ResolversParentTypes['UserBenchmarkTag']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkWithBestEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmarkWithBestEntry'] = ResolversParentTypes['UserBenchmarkWithBestEntry']> = ResolversObject<{
  BestEntry?: Resolver<Maybe<ResolversTypes['UserBenchmarkEntry']>, ParentType, ContextType>;
  UserBenchmarkSummary?: Resolver<ResolversTypes['UserBenchmarkSummary'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = ResolversObject<{
  BenchmarksWithBestEntries?: Resolver<Array<ResolversTypes['UserBenchmarkWithBestEntry']>, ParentType, ContextType>;
  Clubs?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType>;
  LifetimeLogStatsSummary?: Resolver<Maybe<ResolversTypes['LifetimeLogStatsSummary']>, ParentType, ContextType>;
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instagramHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  planCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  postsCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tiktokHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userProfileScope?: Resolver<ResolversTypes['UserProfileScope'], ParentType, ContextType>;
  workoutCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  youtubeHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProfileSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfileSummary'] = ResolversParentTypes['UserProfileSummary']> = ResolversObject<{
  Clubs?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType>;
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  planCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userProfileScope?: Resolver<ResolversTypes['UserProfileScope'], ParentType, ContextType>;
  workoutCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSummary'] = ResolversParentTypes['UserSummary']> = ResolversObject<{
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userProfileScope?: Resolver<ResolversTypes['UserProfileScope'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lengthMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutGoal'] = ResolversParentTypes['WorkoutGoal']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hexColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMove'] = ResolversParentTypes['WorkoutMove']> = ResolversObject<{
  Equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  distanceUnit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loadAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['WorkoutMoveRepType'], ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeUnit?: Resolver<ResolversTypes['TimeUnit'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlan'] = ResolversParentTypes['WorkoutPlan']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  WorkoutPlanDays?: Resolver<Array<ResolversTypes['WorkoutPlanDay']>, ParentType, ContextType>;
  WorkoutPlanEnrolments?: Resolver<Array<ResolversTypes['WorkoutPlanEnrolment']>, ParentType, ContextType>;
  WorkoutPlanReviews?: Resolver<Array<ResolversTypes['WorkoutPlanReview']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  daysPerWeek?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lengthWeeks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanDayResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanDay'] = ResolversParentTypes['WorkoutPlanDay']> = ResolversObject<{
  WorkoutPlanDayWorkouts?: Resolver<Array<ResolversTypes['WorkoutPlanDayWorkout']>, ParentType, ContextType>;
  dayNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanDayWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanDayWorkout'] = ResolversParentTypes['WorkoutPlanDayWorkout']> = ResolversObject<{
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolment'] = ResolversParentTypes['WorkoutPlanEnrolment']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  completedPlanDayWorkoutIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolmentSummary'] = ResolversParentTypes['WorkoutPlanEnrolmentSummary']> = ResolversObject<{
  WorkoutPlan?: Resolver<ResolversTypes['WorkoutPlanSummary'], ParentType, ContextType>;
  completedPlanDayWorkoutIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentWithPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolmentWithPlan'] = ResolversParentTypes['WorkoutPlanEnrolmentWithPlan']> = ResolversObject<{
  WorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType>;
  WorkoutPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanReview'] = ResolversParentTypes['WorkoutPlanReview']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanSummary'] = ResolversParentTypes['WorkoutPlanSummary']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  daysPerWeek?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enrolmentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  goals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lengthWeeks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reviewScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  workoutsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSection'] = ResolversParentTypes['WorkoutSection']> = ResolversObject<{
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  WorkoutSets?: Resolver<Array<ResolversTypes['WorkoutSet']>, ParentType, ContextType>;
  classAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timecap?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionRoundDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSectionRoundData'] = ResolversParentTypes['WorkoutSectionRoundData']> = ResolversObject<{
  sets?: Resolver<Array<ResolversTypes['WorkoutSectionRoundSetData']>, ParentType, ContextType>;
  timeTakenSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionRoundSetDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSectionRoundSetData'] = ResolversParentTypes['WorkoutSectionRoundSetData']> = ResolversObject<{
  moves?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSectionType'] = ResolversParentTypes['WorkoutSectionType']> = ResolversObject<{
  LoggedWorkoutSections?: Resolver<Array<ResolversTypes['LoggedWorkoutSection']>, ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validRepTypes?: Resolver<Array<ResolversTypes['WorkoutMoveRepType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSet'] = ResolversParentTypes['WorkoutSet']> = ResolversObject<{
  WorkoutMoves?: Resolver<Array<ResolversTypes['WorkoutMove']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSummary'] = ResolversParentTypes['WorkoutSummary']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  equipments?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  hasClassAudio?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasClassVideo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lengthMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  loggedSessionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutTag'] = ResolversParentTypes['WorkoutTag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  BodyArea?: BodyAreaResolvers<ContextType>;
  BodyAreaMoveScore?: BodyAreaMoveScoreResolvers<ContextType>;
  BodyTrackingEntry?: BodyTrackingEntryResolvers<ContextType>;
  CheckClubInviteTokenResult?: CheckClubInviteTokenResultResolvers<ContextType>;
  Club?: ClubResolvers<ContextType>;
  ClubInviteToken?: ClubInviteTokenResolvers<ContextType>;
  ClubInviteTokenData?: ClubInviteTokenDataResolvers<ContextType>;
  ClubSummary?: ClubSummaryResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Equipment?: EquipmentResolvers<ContextType>;
  GymProfile?: GymProfileResolvers<ContextType>;
  InviteTokenError?: InviteTokenErrorResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JoinClubInvite?: JoinClubInviteResolvers<ContextType>;
  JoinClubRequest?: JoinClubRequestResolvers<ContextType>;
  LifetimeLogStatsSummary?: LifetimeLogStatsSummaryResolvers<ContextType>;
  LoggedWorkout?: LoggedWorkoutResolvers<ContextType>;
  LoggedWorkoutSection?: LoggedWorkoutSectionResolvers<ContextType>;
  LoggedWorkoutSectionData?: LoggedWorkoutSectionDataResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  MoveType?: MoveTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProgressJournal?: ProgressJournalResolvers<ContextType>;
  ProgressJournalEntry?: ProgressJournalEntryResolvers<ContextType>;
  ProgressJournalGoal?: ProgressJournalGoalResolvers<ContextType>;
  ProgressJournalGoalTag?: ProgressJournalGoalTagResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduledWorkout?: ScheduledWorkoutResolvers<ContextType>;
  SortPositionUpdated?: SortPositionUpdatedResolvers<ContextType>;
  TextSearchResult?: TextSearchResultResolvers<ContextType>;
  TimelinePostFullData?: TimelinePostFullDataResolvers<ContextType>;
  TimelinePostObjectData?: TimelinePostObjectDataResolvers<ContextType>;
  TimelinePostObjectDataObject?: TimelinePostObjectDataObjectResolvers<ContextType>;
  TimelinePostObjectDataUser?: TimelinePostObjectDataUserResolvers<ContextType>;
  UserAvatarData?: UserAvatarDataResolvers<ContextType>;
  UserBenchmark?: UserBenchmarkResolvers<ContextType>;
  UserBenchmarkEntry?: UserBenchmarkEntryResolvers<ContextType>;
  UserBenchmarkSummary?: UserBenchmarkSummaryResolvers<ContextType>;
  UserBenchmarkTag?: UserBenchmarkTagResolvers<ContextType>;
  UserBenchmarkWithBestEntry?: UserBenchmarkWithBestEntryResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
  UserProfileSummary?: UserProfileSummaryResolvers<ContextType>;
  UserSummary?: UserSummaryResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutGoal?: WorkoutGoalResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
  WorkoutPlan?: WorkoutPlanResolvers<ContextType>;
  WorkoutPlanDay?: WorkoutPlanDayResolvers<ContextType>;
  WorkoutPlanDayWorkout?: WorkoutPlanDayWorkoutResolvers<ContextType>;
  WorkoutPlanEnrolment?: WorkoutPlanEnrolmentResolvers<ContextType>;
  WorkoutPlanEnrolmentSummary?: WorkoutPlanEnrolmentSummaryResolvers<ContextType>;
  WorkoutPlanEnrolmentWithPlan?: WorkoutPlanEnrolmentWithPlanResolvers<ContextType>;
  WorkoutPlanReview?: WorkoutPlanReviewResolvers<ContextType>;
  WorkoutPlanSummary?: WorkoutPlanSummaryResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  WorkoutSectionRoundData?: WorkoutSectionRoundDataResolvers<ContextType>;
  WorkoutSectionRoundSetData?: WorkoutSectionRoundSetDataResolvers<ContextType>;
  WorkoutSectionType?: WorkoutSectionTypeResolvers<ContextType>;
  WorkoutSet?: WorkoutSetResolvers<ContextType>;
  WorkoutSummary?: WorkoutSummaryResolvers<ContextType>;
  WorkoutTag?: WorkoutTagResolvers<ContextType>;
}>;


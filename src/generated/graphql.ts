import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type AddDocumentToSkillInput = {
  id: Scalars['ID'];
  uri: Scalars['String'];
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
  Admins: Array<UserAvatarData>;
  ClubInviteTokens?: Maybe<Array<ClubInviteToken>>;
  Members: Array<UserAvatarData>;
  Owner: UserAvatarData;
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

export type ClubAnnouncement = {
  __typename?: 'ClubAnnouncement';
  User: UserAvatarData;
  audioUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUri?: Maybe<Scalars['String']>;
  videoThumbUri?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
};

export type ClubChatSummary = {
  __typename?: 'ClubChatSummary';
  Admins: Array<UserAvatarData>;
  Members: Array<UserAvatarData>;
  Owner: UserAvatarData;
  coverImageUri?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ClubInviteToken = {
  __typename?: 'ClubInviteToken';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  inviteLimit: Scalars['Int'];
  joinedUserIds: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type ClubInviteTokenData = {
  __typename?: 'ClubInviteTokenData';
  Club: ClubSummary;
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type ClubInviteTokens = {
  __typename?: 'ClubInviteTokens';
  id: Scalars['ID'];
  tokens: Array<ClubInviteToken>;
};

export type ClubMemberSummary = {
  __typename?: 'ClubMemberSummary';
  avatarUri?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
  skills: Array<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export type ClubMembers = {
  __typename?: 'ClubMembers';
  Admins: Array<ClubMemberSummary>;
  Members: Array<ClubMemberSummary>;
  Owner: ClubMemberSummary;
  id: Scalars['ID'];
};

export type ClubMetaData = {
  __typename?: 'ClubMetaData';
  metaTags: Array<Scalars['String']>;
  reasonNotValidated?: Maybe<Scalars['String']>;
  validated: PublicContentValidationStatus;
};

export type ClubSummary = {
  __typename?: 'ClubSummary';
  Admins: Array<UserAvatarData>;
  Owner: UserAvatarData;
  contentAccessScope: ContentAccessScope;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  memberCount: Scalars['Int'];
  name: Scalars['String'];
  planCount: Scalars['Int'];
  workoutCount: Scalars['Int'];
};

export type ClubWithMetaData = {
  __typename?: 'ClubWithMetaData';
  Club: Club;
  metaData: ClubMetaData;
};

export type ClubWorkoutPlans = {
  __typename?: 'ClubWorkoutPlans';
  id: Scalars['ID'];
  workoutPlans: Array<WorkoutPlanSummary>;
};

export type ClubWorkouts = {
  __typename?: 'ClubWorkouts';
  id: Scalars['ID'];
  workouts: Array<WorkoutSummary>;
};

export type Collection = {
  __typename?: 'Collection';
  WorkoutPlans: Array<WorkoutPlanSummary>;
  Workouts: Array<WorkoutSummary>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CompletedWorkoutPlanDayWorkout = {
  __typename?: 'CompletedWorkoutPlanDayWorkout';
  id: Scalars['ID'];
  loggedWorkoutId: Scalars['ID'];
  workoutPlanDayWorkoutId: Scalars['ID'];
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
  bodyweight?: InputMaybe<Scalars['Float']>;
  bodyweightUnit?: InputMaybe<BodyweightUnit>;
  fatPercent?: InputMaybe<Scalars['Float']>;
  note?: InputMaybe<Scalars['String']>;
  photoUris?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateClubAnnouncementInput = {
  Club: ConnectRelationInput;
  audioUri?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  imageUri?: InputMaybe<Scalars['String']>;
  videoThumbUri?: InputMaybe<Scalars['String']>;
  videoUri?: InputMaybe<Scalars['String']>;
};

export type CreateClubInput = {
  description?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateClubInviteTokenInput = {
  clubId: Scalars['ID'];
  inviteLimit: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateClubTimelinePostInput = {
  caption?: InputMaybe<Scalars['String']>;
  clubId: Scalars['String'];
  object: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateCollectionInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateCompletedWorkoutPlanDayWorkoutInput = {
  loggedWorkoutId: Scalars['ID'];
  workoutPlanDayWorkoutId: Scalars['ID'];
  workoutPlanEnrolmentId: Scalars['ID'];
};

export type CreateEquipmentInput = {
  altNames?: InputMaybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
  name: Scalars['String'];
};

export type CreateGymProfileInput = {
  Equipments?: InputMaybe<Array<ConnectRelationInput>>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateJournalGoalInput = {
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateJournalMoodInput = {
  energyScore: Scalars['Int'];
  moodScore: Scalars['Int'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  textNote?: InputMaybe<Scalars['String']>;
};

export type CreateJournalNoteInput = {
  textNote?: InputMaybe<Scalars['String']>;
  voiceNoteUri?: InputMaybe<Scalars['String']>;
};

export type CreateLoggedWorkoutInput = {
  GymProfile?: InputMaybe<ConnectRelationInput>;
  LoggedWorkoutSections: Array<CreateLoggedWorkoutSectionInLoggedWorkoutInput>;
  ScheduledWorkout?: InputMaybe<ConnectRelationInput>;
  Workout?: InputMaybe<ConnectRelationInput>;
  WorkoutGoals: Array<ConnectRelationInput>;
  WorkoutPlanDayWorkout?: InputMaybe<ConnectRelationInput>;
  WorkoutPlanEnrolment?: InputMaybe<ConnectRelationInput>;
  completedOn: Scalars['DateTime'];
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
};

export type CreateLoggedWorkoutMoveInLoggedWorkoutSetInput = {
  Equipment?: InputMaybe<ConnectRelationInput>;
  Move: ConnectRelationInput;
  distanceUnit?: InputMaybe<DistanceUnit>;
  loadAmount?: InputMaybe<Scalars['Float']>;
  loadUnit?: InputMaybe<LoadUnit>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  sortPosition: Scalars['Int'];
  timeUnit?: InputMaybe<TimeUnit>;
};

export type CreateLoggedWorkoutSectionInLoggedWorkoutInput = {
  LoggedWorkoutSets: Array<CreateLoggedWorkoutSetInLoggedWorkoutSectionInput>;
  WorkoutSectionType: ConnectRelationInput;
  name?: InputMaybe<Scalars['String']>;
  repScore?: InputMaybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  timeTakenSeconds: Scalars['Int'];
};

export type CreateLoggedWorkoutSetInLoggedWorkoutSectionInput = {
  LoggedWorkoutMoves: Array<CreateLoggedWorkoutMoveInLoggedWorkoutSetInput>;
  sectionRoundNumber: Scalars['Int'];
  sortPosition: Scalars['Int'];
  timeTakenSeconds?: InputMaybe<Scalars['Int']>;
};

export type CreateMoveInput = {
  BodyAreaMoveScores?: InputMaybe<Array<BodyAreaMoveScoreInput>>;
  MoveType: ConnectRelationInput;
  RequiredEquipments?: InputMaybe<Array<ConnectRelationInput>>;
  SelectableEquipments?: InputMaybe<Array<ConnectRelationInput>>;
  demoVideoThumbUri?: InputMaybe<Scalars['String']>;
  demoVideoUri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  scope?: InputMaybe<MoveScope>;
  searchTerms?: InputMaybe<Scalars['String']>;
  validRepTypes: Array<WorkoutMoveRepType>;
};

export type CreateScheduleForPlanEnrolmentInput = {
  startDate: Scalars['DateTime'];
  workoutPlanEnrolmentId: Scalars['ID'];
};

export type CreateScheduledWorkoutInput = {
  GymProfile?: InputMaybe<ConnectRelationInput>;
  Workout: ConnectRelationInput;
  WorkoutPlanDayWorkout?: InputMaybe<ConnectRelationInput>;
  WorkoutPlanEnrolment?: InputMaybe<ConnectRelationInput>;
  note?: InputMaybe<Scalars['String']>;
  scheduledAt: Scalars['DateTime'];
};

export type CreateSkillInput = {
  experience?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateUserBenchmarkEntryInput = {
  UserBenchmark: ConnectRelationInput;
  completedOn: Scalars['DateTime'];
  note?: InputMaybe<Scalars['String']>;
  score: Scalars['Float'];
  videoThumbUri?: InputMaybe<Scalars['String']>;
  videoUri?: InputMaybe<Scalars['String']>;
};

export type CreateUserBenchmarkInput = {
  benchmarkType: BenchmarkType;
  description?: InputMaybe<Scalars['String']>;
  equipmentInfo?: InputMaybe<Scalars['String']>;
  loadUnit?: InputMaybe<LoadUnit>;
  name: Scalars['String'];
};

export type CreateWorkoutInput = {
  contentAccessScope: ContentAccessScope;
  name: Scalars['String'];
};

export type CreateWorkoutMoveInSetInput = {
  Equipment?: InputMaybe<ConnectRelationInput>;
  Move: ConnectRelationInput;
  distanceUnit?: InputMaybe<DistanceUnit>;
  loadAmount: Scalars['Float'];
  loadUnit?: InputMaybe<LoadUnit>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  sortPosition: Scalars['Int'];
  timeUnit?: InputMaybe<TimeUnit>;
};

export type CreateWorkoutMoveInput = {
  Equipment?: InputMaybe<ConnectRelationInput>;
  Move: ConnectRelationInput;
  WorkoutSet: ConnectRelationInput;
  distanceUnit?: InputMaybe<DistanceUnit>;
  loadAmount: Scalars['Float'];
  loadUnit?: InputMaybe<LoadUnit>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  sortPosition: Scalars['Int'];
  timeUnit?: InputMaybe<TimeUnit>;
};

export type CreateWorkoutPlanDayWithWorkoutInput = {
  Workout: ConnectRelationInput;
  WorkoutPlan: ConnectRelationInput;
  dayNumber: Scalars['Int'];
};

export type CreateWorkoutPlanDayWorkoutInput = {
  Workout: ConnectRelationInput;
  WorkoutPlanDay: ConnectRelationInput;
  note?: InputMaybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
};

export type CreateWorkoutPlanInput = {
  contentAccessScope: ContentAccessScope;
  name: Scalars['String'];
};

export type CreateWorkoutPlanReviewInput = {
  WorkoutPlan: ConnectRelationInput;
  comment?: InputMaybe<Scalars['String']>;
  score: Scalars['Float'];
};

export type CreateWorkoutSectionInput = {
  Workout: ConnectRelationInput;
  WorkoutSectionType: ConnectRelationInput;
  classAudioUri?: InputMaybe<Scalars['String']>;
  classVideoThumbUri?: InputMaybe<Scalars['String']>;
  classVideoUri?: InputMaybe<Scalars['String']>;
  introAudioUri?: InputMaybe<Scalars['String']>;
  introVideoThumbUri?: InputMaybe<Scalars['String']>;
  introVideoUri?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  rounds?: InputMaybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  timecap?: InputMaybe<Scalars['Int']>;
};

export type CreateWorkoutSetInput = {
  WorkoutSection: ConnectRelationInput;
  duration?: InputMaybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
};

export type CreateWorkoutSetWithWorkoutMovesInput = {
  workoutMoves: Array<CreateWorkoutMoveInSetInput>;
  workoutSet: CreateWorkoutSetInput;
};

export type CreateWorkoutTagInput = {
  tag: Scalars['String'];
};

export type DeleteClubInviteTokenInput = {
  clubId: Scalars['ID'];
  tokenId: Scalars['ID'];
};

export type DeleteCompletedWorkoutPlanDayWorkoutInput = {
  workoutPlanDayWorkoutId: Scalars['ID'];
  workoutPlanEnrolmentId: Scalars['ID'];
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

export type JoinClubRequestStatus =
  | 'ACCEPTED'
  | 'PENDING'
  | 'REJECTED';

export type JournalGoal = {
  __typename?: 'JournalGoal';
  completedDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  deadline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type JournalMood = {
  __typename?: 'JournalMood';
  createdAt: Scalars['DateTime'];
  energyScore: Scalars['Int'];
  id: Scalars['ID'];
  moodScore: Scalars['Int'];
  tags: Array<Scalars['String']>;
  textNote?: Maybe<Scalars['String']>;
};

export type JournalNote = {
  __typename?: 'JournalNote';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  textNote?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
};

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
  User?: Maybe<UserAvatarData>;
  WorkoutGoals: Array<WorkoutGoal>;
  completedOn: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  workoutId?: Maybe<Scalars['ID']>;
};

export type LoggedWorkoutMove = {
  __typename?: 'LoggedWorkoutMove';
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

export type LoggedWorkoutSection = {
  __typename?: 'LoggedWorkoutSection';
  LoggedWorkoutSets: Array<LoggedWorkoutSet>;
  WorkoutSectionType: WorkoutSectionType;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  repScore?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  timeTakenSeconds: Scalars['Int'];
};

export type LoggedWorkoutSet = {
  __typename?: 'LoggedWorkoutSet';
  LoggedWorkoutMoves: Array<LoggedWorkoutMove>;
  id: Scalars['ID'];
  sectionRoundNumber: Scalars['Int'];
  sortPosition: Scalars['Int'];
  timeTakenSeconds?: Maybe<Scalars['Int']>;
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
  addDocumentToSkill: Skill;
  addUserToClubViaInviteToken: Scalars['ID'];
  addWorkoutPlanToClub: ClubWorkoutPlans;
  addWorkoutPlanToCollection: Collection;
  addWorkoutToClub: ClubWorkouts;
  addWorkoutToCollection: Collection;
  archiveCustomMoveById: Move;
  archiveWorkoutById: Workout;
  archiveWorkoutPlanById: WorkoutPlan;
  clearScheduleForPlanEnrolment: WorkoutPlanEnrolment;
  clearWorkoutPlanEnrolmentProgress: WorkoutPlanEnrolment;
  copyWorkoutPlanDayToAnotherDay: WorkoutPlanDay;
  createBodyTrackingEntry: BodyTrackingEntry;
  createClub: ClubSummary;
  createClubAnnouncement: ClubAnnouncement;
  createClubInviteToken: ClubInviteTokens;
  createClubTimelinePost: TimelinePostFullData;
  createCollection: Collection;
  createCompletedWorkoutPlanDayWorkout: WorkoutPlanEnrolment;
  createEquipment?: Maybe<Equipment>;
  createGymProfile: GymProfile;
  createJournalGoal: JournalGoal;
  createJournalMood: JournalMood;
  createJournalNote: JournalNote;
  createLoggedWorkout: LoggedWorkout;
  createMove: Move;
  createScheduleForPlanEnrolment: WorkoutPlanEnrolment;
  createScheduledWorkout: ScheduledWorkout;
  createSkill: Skill;
  createUserBenchmark: UserBenchmark;
  createUserBenchmarkEntry: UserBenchmarkEntry;
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
  deleteClub: Scalars['ID'];
  deleteClubAnnouncement: Scalars['ID'];
  deleteClubInviteToken: ClubInviteTokens;
  deleteClubTimelinePost: Scalars['ID'];
  deleteCollectionById: Scalars['ID'];
  deleteCompletedWorkoutPlanDayWorkout: WorkoutPlanEnrolment;
  deleteGymProfileById?: Maybe<Scalars['ID']>;
  deleteJournalGoalById: Scalars['ID'];
  deleteJournalMoodById: Scalars['ID'];
  deleteJournalNoteById: Scalars['ID'];
  deleteLoggedWorkoutById: Scalars['ID'];
  deleteLoggedWorkoutMove: Scalars['ID'];
  deleteScheduledWorkoutById: Scalars['ID'];
  deleteSkillById: Scalars['ID'];
  deleteUserBenchmark: Scalars['ID'];
  deleteUserBenchmarkEntry: Scalars['ID'];
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
  giveMemberAdminStatus: ClubMembers;
  makeCopyWorkoutById: Workout;
  moveWorkoutPlanDayToAnotherDay: WorkoutPlanDay;
  removeDocumentFromSkill: Skill;
  removeMemberAdminStatus: ClubMembers;
  removeUserFromClub: ClubMembers;
  removeWorkoutFromClub: ClubWorkouts;
  removeWorkoutFromCollection: Collection;
  removeWorkoutPlanFromClub: ClubWorkoutPlans;
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
  updateClubAnnouncement: ClubAnnouncement;
  updateClubInviteToken: ClubInviteTokens;
  updateClubMetaData: ClubMetaData;
  updateClubSummary: ClubSummary;
  updateCollection: Collection;
  updateEquipment?: Maybe<Equipment>;
  updateGymProfile: GymProfile;
  updateJournalGoal: JournalGoal;
  updateJournalMood: JournalMood;
  updateJournalNote: JournalNote;
  updateLoggedWorkout: LoggedWorkout;
  updateLoggedWorkoutMove: LoggedWorkoutMove;
  updateLoggedWorkoutSection: LoggedWorkoutSection;
  updateLoggedWorkoutSet: LoggedWorkoutSet;
  updateMove: Move;
  updateScheduledWorkout: ScheduledWorkout;
  updateSkill: Skill;
  updateUserBenchmark: UserBenchmark;
  updateUserBenchmarkEntry: UserBenchmarkEntry;
  updateUserProfile: UpdateUserProfileResult;
  updateWorkout: Workout;
  updateWorkoutMetaData: WorkoutMetaData;
  updateWorkoutMove: WorkoutMove;
  updateWorkoutMoves: Array<WorkoutMove>;
  updateWorkoutPlan: WorkoutPlan;
  updateWorkoutPlanDay: WorkoutPlanDay;
  updateWorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  updateWorkoutPlanMetaData?: Maybe<WorkoutPlanMetaData>;
  updateWorkoutPlanReview: WorkoutPlanReview;
  updateWorkoutSection: WorkoutSection;
  updateWorkoutSet: WorkoutSet;
  updateWorkoutTag: WorkoutTag;
  userJoinPublicClub: Scalars['ID'];
};


export type MutationAddDocumentToSkillArgs = {
  data: AddDocumentToSkillInput;
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


export type MutationClearScheduleForPlanEnrolmentArgs = {
  enrolmentId: Scalars['ID'];
};


export type MutationClearWorkoutPlanEnrolmentProgressArgs = {
  enrolmentId: Scalars['ID'];
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


export type MutationCreateClubAnnouncementArgs = {
  data: CreateClubAnnouncementInput;
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


export type MutationCreateCompletedWorkoutPlanDayWorkoutArgs = {
  data: CreateCompletedWorkoutPlanDayWorkoutInput;
};


export type MutationCreateEquipmentArgs = {
  data: CreateEquipmentInput;
};


export type MutationCreateGymProfileArgs = {
  data: CreateGymProfileInput;
};


export type MutationCreateJournalGoalArgs = {
  data: CreateJournalGoalInput;
};


export type MutationCreateJournalMoodArgs = {
  data: CreateJournalMoodInput;
};


export type MutationCreateJournalNoteArgs = {
  data: CreateJournalNoteInput;
};


export type MutationCreateLoggedWorkoutArgs = {
  data: CreateLoggedWorkoutInput;
};


export type MutationCreateMoveArgs = {
  data: CreateMoveInput;
};


export type MutationCreateScheduleForPlanEnrolmentArgs = {
  data: CreateScheduleForPlanEnrolmentInput;
};


export type MutationCreateScheduledWorkoutArgs = {
  data: CreateScheduledWorkoutInput;
};


export type MutationCreateSkillArgs = {
  data: CreateSkillInput;
};


export type MutationCreateUserBenchmarkArgs = {
  data: CreateUserBenchmarkInput;
};


export type MutationCreateUserBenchmarkEntryArgs = {
  data: CreateUserBenchmarkEntryInput;
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


export type MutationDeleteClubArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubAnnouncementArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubInviteTokenArgs = {
  data: DeleteClubInviteTokenInput;
};


export type MutationDeleteClubTimelinePostArgs = {
  activityId: Scalars['ID'];
};


export type MutationDeleteCollectionByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCompletedWorkoutPlanDayWorkoutArgs = {
  data: DeleteCompletedWorkoutPlanDayWorkoutInput;
};


export type MutationDeleteGymProfileByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteJournalGoalByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteJournalMoodByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteJournalNoteByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLoggedWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLoggedWorkoutMoveArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteScheduledWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSkillByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserBenchmarkArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserBenchmarkEntryArgs = {
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


export type MutationRemoveDocumentFromSkillArgs = {
  data: RemoveDocumentFromSkillInput;
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


export type MutationUpdateClubAnnouncementArgs = {
  data: UpdateClubAnnouncementInput;
};


export type MutationUpdateClubInviteTokenArgs = {
  data: UpdateClubInviteTokenInput;
};


export type MutationUpdateClubMetaDataArgs = {
  data: UpdateClubMetaDataInput;
};


export type MutationUpdateClubSummaryArgs = {
  data: UpdateClubSummaryInput;
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


export type MutationUpdateJournalGoalArgs = {
  data: UpdateJournalGoalInput;
};


export type MutationUpdateJournalMoodArgs = {
  data: UpdateJournalMoodInput;
};


export type MutationUpdateJournalNoteArgs = {
  data: UpdateJournalNoteInput;
};


export type MutationUpdateLoggedWorkoutArgs = {
  data: UpdateLoggedWorkoutInput;
};


export type MutationUpdateLoggedWorkoutMoveArgs = {
  data: UpdateLoggedWorkoutMoveInput;
};


export type MutationUpdateLoggedWorkoutSectionArgs = {
  data: UpdateLoggedWorkoutSectionInput;
};


export type MutationUpdateLoggedWorkoutSetArgs = {
  data: UpdateLoggedWorkoutSetInput;
};


export type MutationUpdateMoveArgs = {
  data: UpdateMoveInput;
};


export type MutationUpdateScheduledWorkoutArgs = {
  data: UpdateScheduledWorkoutInput;
};


export type MutationUpdateSkillArgs = {
  data: UpdateSkillInput;
};


export type MutationUpdateUserBenchmarkArgs = {
  data: UpdateUserBenchmarkInput;
};


export type MutationUpdateUserBenchmarkEntryArgs = {
  data: UpdateUserBenchmarkEntryInput;
};


export type MutationUpdateUserProfileArgs = {
  data: UpdateUserProfileInput;
};


export type MutationUpdateWorkoutArgs = {
  data: UpdateWorkoutInput;
};


export type MutationUpdateWorkoutMetaDataArgs = {
  data: UpdateWorkoutMetaDataInput;
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


export type MutationUpdateWorkoutPlanMetaDataArgs = {
  data: UpdateWorkoutPlanMetaDataInput;
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

export type PublicContentValidationStatus =
  | 'INVALID'
  | 'PENDING'
  | 'PENDINGUPDATED'
  | 'VALID';

export type Query = {
  __typename?: 'Query';
  adminPublicClubs: Array<ClubWithMetaData>;
  adminPublicWorkoutPlans: Array<WorkoutPlanWithMetaData>;
  adminPublicWorkouts: Array<WorkoutWithMetaData>;
  bodyAreas: Array<BodyArea>;
  bodyTrackingEntries: Array<BodyTrackingEntry>;
  checkClubInviteToken: CheckClubInviteTokenResult;
  checkUniqueClubName: Scalars['Boolean'];
  checkUniqueDisplayName: Scalars['Boolean'];
  checkUserClubMemberStatus: UserClubMemberStatus;
  clubChatSummary: ClubChatSummary;
  clubInviteTokens: ClubInviteTokens;
  clubMembers: ClubMembers;
  clubMembersFeedPosts: Array<TimelinePostFullData>;
  clubSummaries: Array<ClubSummary>;
  clubSummary: ClubSummary;
  clubWorkoutPlans: ClubWorkoutPlans;
  clubWorkouts: ClubWorkouts;
  equipments: Array<Equipment>;
  gymProfiles: Array<GymProfile>;
  journalGoals: Array<JournalGoal>;
  journalMoods: Array<JournalMood>;
  journalNotes: Array<JournalNote>;
  lifetimeLogStatsSummary: LifetimeLogStatsSummary;
  logCountByWorkout: Scalars['Int'];
  loggedWorkoutById: LoggedWorkout;
  moveTypes: Array<MoveType>;
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
  userBenchmark: UserBenchmark;
  userBenchmarks: Array<UserBenchmark>;
  userClubs: Array<ClubSummary>;
  userCollectionById: Collection;
  userCollections: Array<Collection>;
  userCustomMoves: Array<Move>;
  userLoggedWorkouts: Array<LoggedWorkout>;
  userProfile: UserProfile;
  userProfiles: Array<UserProfileSummary>;
  userPublicWorkoutPlans: Array<WorkoutPlanSummary>;
  userPublicWorkouts: Array<WorkoutSummary>;
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


export type QueryAdminPublicClubsArgs = {
  status: PublicContentValidationStatus;
};


export type QueryAdminPublicWorkoutPlansArgs = {
  status: PublicContentValidationStatus;
};


export type QueryAdminPublicWorkoutsArgs = {
  status: PublicContentValidationStatus;
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


export type QueryCheckUserClubMemberStatusArgs = {
  clubId: Scalars['ID'];
};


export type QueryClubChatSummaryArgs = {
  clubId: Scalars['ID'];
};


export type QueryClubInviteTokensArgs = {
  clubId: Scalars['ID'];
};


export type QueryClubMembersArgs = {
  clubId: Scalars['ID'];
};


export type QueryClubMembersFeedPostsArgs = {
  clubId: Scalars['ID'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryClubSummariesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryClubSummaryArgs = {
  id: Scalars['ID'];
};


export type QueryClubWorkoutPlansArgs = {
  clubId: Scalars['ID'];
};


export type QueryClubWorkoutsArgs = {
  clubId: Scalars['ID'];
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


export type QueryPublicWorkoutPlansArgs = {
  cursor?: InputMaybe<Scalars['ID']>;
  filters?: InputMaybe<WorkoutPlanFiltersInput>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPublicWorkoutsArgs = {
  cursor?: InputMaybe<Scalars['ID']>;
  filters?: InputMaybe<WorkoutFiltersInput>;
  take?: InputMaybe<Scalars['Int']>;
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


export type QueryUserBenchmarkArgs = {
  id: Scalars['ID'];
};


export type QueryUserCollectionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserLoggedWorkoutsArgs = {
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserProfileArgs = {
  userId: Scalars['ID'];
};


export type QueryUserProfilesArgs = {
  cursor?: InputMaybe<Scalars['ID']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserPublicWorkoutPlansArgs = {
  userId: Scalars['ID'];
};


export type QueryUserPublicWorkoutsArgs = {
  userId: Scalars['ID'];
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

export type RemoveDocumentFromSkillInput = {
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
  workoutPlanDayWorkoutId?: Maybe<Scalars['ID']>;
  workoutPlanEnrolmentId?: Maybe<Scalars['ID']>;
  workoutPlanName?: Maybe<Scalars['String']>;
};

export type Skill = {
  __typename?: 'Skill';
  awardingBody?: Maybe<Scalars['String']>;
  certificateRef?: Maybe<Scalars['String']>;
  certification?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  documentUri?: Maybe<Scalars['String']>;
  experience?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
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
  audioUri?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUri?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: TimelinePostType;
  videoThumbUri?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
};

export type TimelinePostObjectDataUser = {
  __typename?: 'TimelinePostObjectDataUser';
  avatarUri?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  id: Scalars['ID'];
};

export type TimelinePostType =
  | 'ANNOUNCEMENT'
  | 'WORKOUT'
  | 'WORKOUTPLAN';

export type UpdateBodyTrackingEntryInput = {
  bodyweight?: InputMaybe<Scalars['Float']>;
  bodyweightUnit?: InputMaybe<BodyweightUnit>;
  fatPercent?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  photoUris?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateClubAnnouncementInput = {
  audioUri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUri?: InputMaybe<Scalars['String']>;
  videoThumbUri?: InputMaybe<Scalars['String']>;
  videoUri?: InputMaybe<Scalars['String']>;
};

export type UpdateClubInviteTokenInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  clubId: Scalars['ID'];
  id: Scalars['ID'];
  inviteLimit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateClubMetaDataInput = {
  id: Scalars['ID'];
  metaTags?: InputMaybe<Array<Scalars['String']>>;
  reasonNotValidated?: InputMaybe<Scalars['String']>;
  validated?: InputMaybe<PublicContentValidationStatus>;
};

export type UpdateClubSummaryInput = {
  contentAccessScope?: InputMaybe<ContentAccessScope>;
  coverImageUri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: InputMaybe<Scalars['String']>;
  introVideoThumbUri?: InputMaybe<Scalars['String']>;
  introVideoUri?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCollectionInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateEquipmentInput = {
  altNames?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  loadAdjustable?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateGymProfileInput = {
  Equipments?: InputMaybe<Array<ConnectRelationInput>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateJournalGoalInput = {
  completedDate?: InputMaybe<Scalars['DateTime']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateJournalMoodInput = {
  energyScore?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  moodScore?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  textNote?: InputMaybe<Scalars['String']>;
};

export type UpdateJournalNoteInput = {
  id: Scalars['ID'];
  textNote?: InputMaybe<Scalars['String']>;
  voiceNoteUri?: InputMaybe<Scalars['String']>;
};

export type UpdateLoggedWorkoutInput = {
  GymProfile?: InputMaybe<ConnectRelationInput>;
  WorkoutGoals: Array<ConnectRelationInput>;
  completedOn?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
};

export type UpdateLoggedWorkoutMoveInput = {
  Equipment?: InputMaybe<ConnectRelationInput>;
  Move?: InputMaybe<ConnectRelationInput>;
  distanceUnit?: InputMaybe<DistanceUnit>;
  id: Scalars['ID'];
  loadAmount?: InputMaybe<Scalars['Float']>;
  loadUnit?: InputMaybe<LoadUnit>;
  repType?: InputMaybe<WorkoutMoveRepType>;
  reps: Scalars['Float'];
  timeUnit?: InputMaybe<TimeUnit>;
};

export type UpdateLoggedWorkoutSectionInput = {
  id: Scalars['ID'];
  repScore?: InputMaybe<Scalars['Int']>;
  timeTakenSeconds?: InputMaybe<Scalars['Int']>;
};

export type UpdateLoggedWorkoutSetInput = {
  id: Scalars['ID'];
  timeTakenSeconds?: InputMaybe<Scalars['Int']>;
};

export type UpdateMoveInput = {
  BodyAreaMoveScores?: InputMaybe<Array<BodyAreaMoveScoreInput>>;
  MoveType?: InputMaybe<ConnectRelationInput>;
  RequiredEquipments?: InputMaybe<Array<ConnectRelationInput>>;
  SelectableEquipments?: InputMaybe<Array<ConnectRelationInput>>;
  demoVideoThumbUri?: InputMaybe<Scalars['String']>;
  demoVideoUri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<MoveScope>;
  searchTerms?: InputMaybe<Scalars['String']>;
  validRepTypes?: InputMaybe<Array<WorkoutMoveRepType>>;
};

export type UpdateScheduledWorkoutInput = {
  GymProfile?: InputMaybe<ConnectRelationInput>;
  LoggedWorkout?: InputMaybe<ConnectRelationInput>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  scheduledAt?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateSkillInput = {
  awardingBody?: InputMaybe<Scalars['String']>;
  certificateRef?: InputMaybe<Scalars['String']>;
  certification?: InputMaybe<Scalars['String']>;
  documentUri?: InputMaybe<Scalars['String']>;
  experience?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateSortPositionInput = {
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
};

export type UpdateUserBenchmarkEntryInput = {
  completedOn?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Float']>;
  videoThumbUri?: InputMaybe<Scalars['String']>;
  videoUri?: InputMaybe<Scalars['String']>;
};

export type UpdateUserBenchmarkInput = {
  benchmarkType: BenchmarkType;
  description?: InputMaybe<Scalars['String']>;
  equipmentInfo?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  loadUnit?: InputMaybe<LoadUnit>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserProfileInput = {
  avatarUri?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  birthdate?: InputMaybe<Scalars['DateTime']>;
  countryCode?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  hasOnboarded?: InputMaybe<Scalars['Boolean']>;
  instagramHandle?: InputMaybe<Scalars['String']>;
  introVideoThumbUri?: InputMaybe<Scalars['String']>;
  introVideoUri?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  linkedinHandle?: InputMaybe<Scalars['String']>;
  tagline?: InputMaybe<Scalars['String']>;
  tiktokHandle?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
  userProfileScope?: InputMaybe<UserProfileScope>;
  youtubeHandle?: InputMaybe<Scalars['String']>;
};

export type UpdateUserProfileResult = {
  __typename?: 'UpdateUserProfileResult';
  avatarUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  hasOnboarded?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  instagramHandle?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  linkedinHandle?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  tiktokHandle?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  userProfileScope?: Maybe<UserProfileScope>;
  youtubeHandle?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutInput = {
  WorkoutGoals?: InputMaybe<Array<ConnectRelationInput>>;
  WorkoutTags?: InputMaybe<Array<ConnectRelationInput>>;
  contentAccessScope?: InputMaybe<ContentAccessScope>;
  coverImageUri?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: InputMaybe<Scalars['String']>;
  introVideoThumbUri?: InputMaybe<Scalars['String']>;
  introVideoUri?: InputMaybe<Scalars['String']>;
  lengthMinutes?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkoutMetaDataInput = {
  difficultyLevel?: InputMaybe<DifficultyLevel>;
  id: Scalars['ID'];
  metaTags?: InputMaybe<Array<Scalars['String']>>;
  reasonNotValidated?: InputMaybe<Scalars['String']>;
  validated?: InputMaybe<PublicContentValidationStatus>;
};

export type UpdateWorkoutMoveInput = {
  Equipment?: InputMaybe<ConnectRelationInput>;
  Move?: InputMaybe<ConnectRelationInput>;
  distanceUnit?: InputMaybe<DistanceUnit>;
  id: Scalars['ID'];
  loadAmount?: InputMaybe<Scalars['Float']>;
  loadUnit?: InputMaybe<LoadUnit>;
  repType?: InputMaybe<WorkoutMoveRepType>;
  reps?: InputMaybe<Scalars['Float']>;
  timeUnit?: InputMaybe<TimeUnit>;
};

export type UpdateWorkoutPlanDayInput = {
  dayNumber?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkoutPlanDayWorkoutInput = {
  Workout?: InputMaybe<ConnectRelationInput>;
  WorkoutPlanDay?: InputMaybe<ConnectRelationInput>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkoutPlanInput = {
  WorkoutTags?: InputMaybe<Array<ConnectRelationInput>>;
  contentAccessScope?: InputMaybe<ContentAccessScope>;
  coverImageUri?: InputMaybe<Scalars['String']>;
  daysPerWeek?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: InputMaybe<Scalars['String']>;
  introVideoThumbUri?: InputMaybe<Scalars['String']>;
  introVideoUri?: InputMaybe<Scalars['String']>;
  lengthWeeks?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkoutPlanMetaDataInput = {
  difficultyLevel?: InputMaybe<DifficultyLevel>;
  id: Scalars['ID'];
  metaTags?: InputMaybe<Array<Scalars['String']>>;
  reasonNotValidated?: InputMaybe<Scalars['String']>;
  validated?: InputMaybe<PublicContentValidationStatus>;
};

export type UpdateWorkoutPlanReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  score?: InputMaybe<Scalars['Float']>;
};

export type UpdateWorkoutSectionInput = {
  WorkoutSectionType?: InputMaybe<ConnectRelationInput>;
  classAudioUri?: InputMaybe<Scalars['String']>;
  classVideoThumbUri?: InputMaybe<Scalars['String']>;
  classVideoUri?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  introAudioUri?: InputMaybe<Scalars['String']>;
  introVideoThumbUri?: InputMaybe<Scalars['String']>;
  introVideoUri?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  rounds?: InputMaybe<Scalars['Int']>;
  timecap?: InputMaybe<Scalars['Int']>;
};

export type UpdateWorkoutSetInput = {
  duration?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
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

export type UserBenchmarkWithBestEntry = {
  __typename?: 'UserBenchmarkWithBestEntry';
  BestEntry?: Maybe<UserBenchmarkEntry>;
  UserBenchmarkSummary: UserBenchmarkSummary;
};

export type UserClubMemberStatus =
  | 'ADMIN'
  | 'MEMBER'
  | 'NONE'
  | 'OWNER';

export type UserProfile = {
  __typename?: 'UserProfile';
  BenchmarksWithBestEntries: Array<UserBenchmarkWithBestEntry>;
  Clubs: Array<ClubSummary>;
  LifetimeLogStatsSummary?: Maybe<LifetimeLogStatsSummary>;
  Skills: Array<Skill>;
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
  skills: Array<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  userProfileScope: UserProfileScope;
  workoutCount: Scalars['Int'];
};

export type Workout = {
  __typename?: 'Workout';
  User: UserAvatarData;
  WorkoutGoals: Array<WorkoutGoal>;
  WorkoutSections: Array<WorkoutSection>;
  WorkoutTags: Array<WorkoutTag>;
  archived: Scalars['Boolean'];
  contentAccessScope: ContentAccessScope;
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  id: Scalars['ID'];
  introAudioUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  lengthMinutes?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type WorkoutFiltersInput = {
  availableEquipments: Array<Scalars['ID']>;
  bodyweightOnly?: InputMaybe<Scalars['Boolean']>;
  difficultyLevel?: InputMaybe<DifficultyLevel>;
  excludedMoves: Array<Scalars['ID']>;
  hasClassAudio?: InputMaybe<Scalars['Boolean']>;
  hasClassVideo?: InputMaybe<Scalars['Boolean']>;
  maxLength?: InputMaybe<Scalars['Int']>;
  minLength?: InputMaybe<Scalars['Int']>;
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

export type WorkoutMetaData = {
  __typename?: 'WorkoutMetaData';
  difficultyLevel?: Maybe<DifficultyLevel>;
  metaTags: Array<Scalars['String']>;
  reasonNotValidated?: Maybe<Scalars['String']>;
  validated: PublicContentValidationStatus;
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
  User: UserAvatarData;
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
  CompletedWorkoutPlanDayWorkouts: Array<CompletedWorkoutPlanDayWorkout>;
  User: UserAvatarData;
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['DateTime']>;
};

export type WorkoutPlanEnrolmentSummary = {
  __typename?: 'WorkoutPlanEnrolmentSummary';
  WorkoutPlan: WorkoutPlanSummary;
  completedWorkoutsCount: Scalars['Int'];
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['DateTime']>;
};

export type WorkoutPlanEnrolmentWithPlan = {
  __typename?: 'WorkoutPlanEnrolmentWithPlan';
  WorkoutPlan: WorkoutPlan;
  WorkoutPlanEnrolment: WorkoutPlanEnrolment;
};

export type WorkoutPlanFiltersInput = {
  bodyweightOnly?: InputMaybe<Scalars['Boolean']>;
  daysPerWeek?: InputMaybe<Scalars['Int']>;
  difficultyLevel?: InputMaybe<DifficultyLevel>;
  lengthWeeks?: InputMaybe<Scalars['Int']>;
  workoutGoals: Array<Scalars['ID']>;
};

export type WorkoutPlanMetaData = {
  __typename?: 'WorkoutPlanMetaData';
  difficultyLevel?: Maybe<DifficultyLevel>;
  metaTags: Array<Scalars['String']>;
  reasonNotValidated?: Maybe<Scalars['String']>;
  validated: PublicContentValidationStatus;
};

export type WorkoutPlanReview = {
  __typename?: 'WorkoutPlanReview';
  User: UserAvatarData;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  score: Scalars['Float'];
};

export type WorkoutPlanSummary = {
  __typename?: 'WorkoutPlanSummary';
  User: UserAvatarData;
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

export type WorkoutPlanWithMetaData = {
  __typename?: 'WorkoutPlanWithMetaData';
  WorkoutPlan: WorkoutPlan;
  metaData: WorkoutPlanMetaData;
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
  User: UserAvatarData;
  archived: Scalars['Boolean'];
  coverImageUri?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
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

export type WorkoutWithMetaData = {
  __typename?: 'WorkoutWithMetaData';
  Workout: Workout;
  metaData: WorkoutMetaData;
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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  AddDocumentToSkillInput: AddDocumentToSkillInput;
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
  ClubAnnouncement: ResolverTypeWrapper<ClubAnnouncement>;
  ClubChatSummary: ResolverTypeWrapper<ClubChatSummary>;
  ClubInviteToken: ResolverTypeWrapper<ClubInviteToken>;
  ClubInviteTokenData: ResolverTypeWrapper<ClubInviteTokenData>;
  ClubInviteTokens: ResolverTypeWrapper<ClubInviteTokens>;
  ClubMemberSummary: ResolverTypeWrapper<ClubMemberSummary>;
  ClubMembers: ResolverTypeWrapper<ClubMembers>;
  ClubMetaData: ResolverTypeWrapper<ClubMetaData>;
  ClubSummary: ResolverTypeWrapper<ClubSummary>;
  ClubWithMetaData: ResolverTypeWrapper<ClubWithMetaData>;
  ClubWorkoutPlans: ResolverTypeWrapper<ClubWorkoutPlans>;
  ClubWorkouts: ResolverTypeWrapper<ClubWorkouts>;
  Collection: ResolverTypeWrapper<Collection>;
  CompletedWorkoutPlanDayWorkout: ResolverTypeWrapper<CompletedWorkoutPlanDayWorkout>;
  ConnectRelationInput: ConnectRelationInput;
  ContentAccessScope: ContentAccessScope;
  CopyWorkoutPlanDayToAnotherDayInput: CopyWorkoutPlanDayToAnotherDayInput;
  CreateBodyTrackingEntryInput: CreateBodyTrackingEntryInput;
  CreateClubAnnouncementInput: CreateClubAnnouncementInput;
  CreateClubInput: CreateClubInput;
  CreateClubInviteTokenInput: CreateClubInviteTokenInput;
  CreateClubTimelinePostInput: CreateClubTimelinePostInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateCompletedWorkoutPlanDayWorkoutInput: CreateCompletedWorkoutPlanDayWorkoutInput;
  CreateEquipmentInput: CreateEquipmentInput;
  CreateGymProfileInput: CreateGymProfileInput;
  CreateJournalGoalInput: CreateJournalGoalInput;
  CreateJournalMoodInput: CreateJournalMoodInput;
  CreateJournalNoteInput: CreateJournalNoteInput;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutMoveInLoggedWorkoutSetInput: CreateLoggedWorkoutMoveInLoggedWorkoutSetInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateLoggedWorkoutSetInLoggedWorkoutSectionInput: CreateLoggedWorkoutSetInLoggedWorkoutSectionInput;
  CreateMoveInput: CreateMoveInput;
  CreateScheduleForPlanEnrolmentInput: CreateScheduleForPlanEnrolmentInput;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  CreateSkillInput: CreateSkillInput;
  CreateUserBenchmarkEntryInput: CreateUserBenchmarkEntryInput;
  CreateUserBenchmarkInput: CreateUserBenchmarkInput;
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
  DeleteClubInviteTokenInput: DeleteClubInviteTokenInput;
  DeleteCompletedWorkoutPlanDayWorkoutInput: DeleteCompletedWorkoutPlanDayWorkoutInput;
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
  JoinClubRequestStatus: JoinClubRequestStatus;
  JournalGoal: ResolverTypeWrapper<JournalGoal>;
  JournalMood: ResolverTypeWrapper<JournalMood>;
  JournalNote: ResolverTypeWrapper<JournalNote>;
  LifetimeLogStatsSummary: ResolverTypeWrapper<LifetimeLogStatsSummary>;
  LoadUnit: LoadUnit;
  LoggedWorkout: ResolverTypeWrapper<LoggedWorkout>;
  LoggedWorkoutMove: ResolverTypeWrapper<LoggedWorkoutMove>;
  LoggedWorkoutSection: ResolverTypeWrapper<LoggedWorkoutSection>;
  LoggedWorkoutSet: ResolverTypeWrapper<LoggedWorkoutSet>;
  Move: ResolverTypeWrapper<Move>;
  MoveScope: MoveScope;
  MoveType: ResolverTypeWrapper<MoveType>;
  MoveWorkoutPlanDayToAnotherDayInput: MoveWorkoutPlanDayToAnotherDayInput;
  Mutation: ResolverTypeWrapper<{}>;
  PublicContentValidationStatus: PublicContentValidationStatus;
  Query: ResolverTypeWrapper<{}>;
  RemoveDocumentFromSkillInput: RemoveDocumentFromSkillInput;
  RemoveWorkoutFromClubInput: RemoveWorkoutFromClubInput;
  RemoveWorkoutFromCollectionInput: RemoveWorkoutFromCollectionInput;
  RemoveWorkoutPlanFromClubInput: RemoveWorkoutPlanFromClubInput;
  RemoveWorkoutPlanFromCollectionInput: RemoveWorkoutPlanFromCollectionInput;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  Skill: ResolverTypeWrapper<Skill>;
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
  UpdateClubAnnouncementInput: UpdateClubAnnouncementInput;
  UpdateClubInviteTokenInput: UpdateClubInviteTokenInput;
  UpdateClubMetaDataInput: UpdateClubMetaDataInput;
  UpdateClubSummaryInput: UpdateClubSummaryInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  UpdateJournalGoalInput: UpdateJournalGoalInput;
  UpdateJournalMoodInput: UpdateJournalMoodInput;
  UpdateJournalNoteInput: UpdateJournalNoteInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutMoveInput: UpdateLoggedWorkoutMoveInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateLoggedWorkoutSetInput: UpdateLoggedWorkoutSetInput;
  UpdateMoveInput: UpdateMoveInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  UpdateSkillInput: UpdateSkillInput;
  UpdateSortPositionInput: UpdateSortPositionInput;
  UpdateUserBenchmarkEntryInput: UpdateUserBenchmarkEntryInput;
  UpdateUserBenchmarkInput: UpdateUserBenchmarkInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateUserProfileResult: ResolverTypeWrapper<UpdateUserProfileResult>;
  UpdateWorkoutInput: UpdateWorkoutInput;
  UpdateWorkoutMetaDataInput: UpdateWorkoutMetaDataInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  UpdateWorkoutPlanDayInput: UpdateWorkoutPlanDayInput;
  UpdateWorkoutPlanDayWorkoutInput: UpdateWorkoutPlanDayWorkoutInput;
  UpdateWorkoutPlanInput: UpdateWorkoutPlanInput;
  UpdateWorkoutPlanMetaDataInput: UpdateWorkoutPlanMetaDataInput;
  UpdateWorkoutPlanReviewInput: UpdateWorkoutPlanReviewInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  UserAvatarData: ResolverTypeWrapper<UserAvatarData>;
  UserBenchmark: ResolverTypeWrapper<UserBenchmark>;
  UserBenchmarkEntry: ResolverTypeWrapper<UserBenchmarkEntry>;
  UserBenchmarkSummary: ResolverTypeWrapper<UserBenchmarkSummary>;
  UserBenchmarkWithBestEntry: ResolverTypeWrapper<UserBenchmarkWithBestEntry>;
  UserClubMemberStatus: UserClubMemberStatus;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  UserProfileScope: UserProfileScope;
  UserProfileSummary: ResolverTypeWrapper<UserProfileSummary>;
  Workout: ResolverTypeWrapper<Workout>;
  WorkoutFiltersInput: WorkoutFiltersInput;
  WorkoutGoal: ResolverTypeWrapper<WorkoutGoal>;
  WorkoutMetaData: ResolverTypeWrapper<WorkoutMetaData>;
  WorkoutMove: ResolverTypeWrapper<WorkoutMove>;
  WorkoutMoveRepType: WorkoutMoveRepType;
  WorkoutPlan: ResolverTypeWrapper<WorkoutPlan>;
  WorkoutPlanDay: ResolverTypeWrapper<WorkoutPlanDay>;
  WorkoutPlanDayWorkout: ResolverTypeWrapper<WorkoutPlanDayWorkout>;
  WorkoutPlanEnrolment: ResolverTypeWrapper<WorkoutPlanEnrolment>;
  WorkoutPlanEnrolmentSummary: ResolverTypeWrapper<WorkoutPlanEnrolmentSummary>;
  WorkoutPlanEnrolmentWithPlan: ResolverTypeWrapper<WorkoutPlanEnrolmentWithPlan>;
  WorkoutPlanFiltersInput: WorkoutPlanFiltersInput;
  WorkoutPlanMetaData: ResolverTypeWrapper<WorkoutPlanMetaData>;
  WorkoutPlanReview: ResolverTypeWrapper<WorkoutPlanReview>;
  WorkoutPlanSummary: ResolverTypeWrapper<WorkoutPlanSummary>;
  WorkoutPlanWithMetaData: ResolverTypeWrapper<WorkoutPlanWithMetaData>;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  WorkoutSectionType: ResolverTypeWrapper<WorkoutSectionType>;
  WorkoutSet: ResolverTypeWrapper<WorkoutSet>;
  WorkoutSetGeneratorTarget: WorkoutSetGeneratorTarget;
  WorkoutSetGeneratorType: WorkoutSetGeneratorType;
  WorkoutSummary: ResolverTypeWrapper<WorkoutSummary>;
  WorkoutTag: ResolverTypeWrapper<WorkoutTag>;
  WorkoutWithMetaData: ResolverTypeWrapper<WorkoutWithMetaData>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddDocumentToSkillInput: AddDocumentToSkillInput;
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
  ClubAnnouncement: ClubAnnouncement;
  ClubChatSummary: ClubChatSummary;
  ClubInviteToken: ClubInviteToken;
  ClubInviteTokenData: ClubInviteTokenData;
  ClubInviteTokens: ClubInviteTokens;
  ClubMemberSummary: ClubMemberSummary;
  ClubMembers: ClubMembers;
  ClubMetaData: ClubMetaData;
  ClubSummary: ClubSummary;
  ClubWithMetaData: ClubWithMetaData;
  ClubWorkoutPlans: ClubWorkoutPlans;
  ClubWorkouts: ClubWorkouts;
  Collection: Collection;
  CompletedWorkoutPlanDayWorkout: CompletedWorkoutPlanDayWorkout;
  ConnectRelationInput: ConnectRelationInput;
  CopyWorkoutPlanDayToAnotherDayInput: CopyWorkoutPlanDayToAnotherDayInput;
  CreateBodyTrackingEntryInput: CreateBodyTrackingEntryInput;
  CreateClubAnnouncementInput: CreateClubAnnouncementInput;
  CreateClubInput: CreateClubInput;
  CreateClubInviteTokenInput: CreateClubInviteTokenInput;
  CreateClubTimelinePostInput: CreateClubTimelinePostInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateCompletedWorkoutPlanDayWorkoutInput: CreateCompletedWorkoutPlanDayWorkoutInput;
  CreateEquipmentInput: CreateEquipmentInput;
  CreateGymProfileInput: CreateGymProfileInput;
  CreateJournalGoalInput: CreateJournalGoalInput;
  CreateJournalMoodInput: CreateJournalMoodInput;
  CreateJournalNoteInput: CreateJournalNoteInput;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutMoveInLoggedWorkoutSetInput: CreateLoggedWorkoutMoveInLoggedWorkoutSetInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateLoggedWorkoutSetInLoggedWorkoutSectionInput: CreateLoggedWorkoutSetInLoggedWorkoutSectionInput;
  CreateMoveInput: CreateMoveInput;
  CreateScheduleForPlanEnrolmentInput: CreateScheduleForPlanEnrolmentInput;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  CreateSkillInput: CreateSkillInput;
  CreateUserBenchmarkEntryInput: CreateUserBenchmarkEntryInput;
  CreateUserBenchmarkInput: CreateUserBenchmarkInput;
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
  DeleteClubInviteTokenInput: DeleteClubInviteTokenInput;
  DeleteCompletedWorkoutPlanDayWorkoutInput: DeleteCompletedWorkoutPlanDayWorkoutInput;
  Equipment: Equipment;
  Float: Scalars['Float'];
  GymProfile: GymProfile;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InviteTokenError: InviteTokenError;
  JSON: Scalars['JSON'];
  JournalGoal: JournalGoal;
  JournalMood: JournalMood;
  JournalNote: JournalNote;
  LifetimeLogStatsSummary: LifetimeLogStatsSummary;
  LoggedWorkout: LoggedWorkout;
  LoggedWorkoutMove: LoggedWorkoutMove;
  LoggedWorkoutSection: LoggedWorkoutSection;
  LoggedWorkoutSet: LoggedWorkoutSet;
  Move: Move;
  MoveType: MoveType;
  MoveWorkoutPlanDayToAnotherDayInput: MoveWorkoutPlanDayToAnotherDayInput;
  Mutation: {};
  Query: {};
  RemoveDocumentFromSkillInput: RemoveDocumentFromSkillInput;
  RemoveWorkoutFromClubInput: RemoveWorkoutFromClubInput;
  RemoveWorkoutFromCollectionInput: RemoveWorkoutFromCollectionInput;
  RemoveWorkoutPlanFromClubInput: RemoveWorkoutPlanFromClubInput;
  RemoveWorkoutPlanFromCollectionInput: RemoveWorkoutPlanFromCollectionInput;
  ScheduledWorkout: ScheduledWorkout;
  Skill: Skill;
  SortPositionUpdated: SortPositionUpdated;
  String: Scalars['String'];
  TextSearchResult: TextSearchResult;
  TimelinePostDataRequestInput: TimelinePostDataRequestInput;
  TimelinePostFullData: TimelinePostFullData;
  TimelinePostObjectData: TimelinePostObjectData;
  TimelinePostObjectDataObject: TimelinePostObjectDataObject;
  TimelinePostObjectDataUser: TimelinePostObjectDataUser;
  UpdateBodyTrackingEntryInput: UpdateBodyTrackingEntryInput;
  UpdateClubAnnouncementInput: UpdateClubAnnouncementInput;
  UpdateClubInviteTokenInput: UpdateClubInviteTokenInput;
  UpdateClubMetaDataInput: UpdateClubMetaDataInput;
  UpdateClubSummaryInput: UpdateClubSummaryInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  UpdateJournalGoalInput: UpdateJournalGoalInput;
  UpdateJournalMoodInput: UpdateJournalMoodInput;
  UpdateJournalNoteInput: UpdateJournalNoteInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutMoveInput: UpdateLoggedWorkoutMoveInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateLoggedWorkoutSetInput: UpdateLoggedWorkoutSetInput;
  UpdateMoveInput: UpdateMoveInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  UpdateSkillInput: UpdateSkillInput;
  UpdateSortPositionInput: UpdateSortPositionInput;
  UpdateUserBenchmarkEntryInput: UpdateUserBenchmarkEntryInput;
  UpdateUserBenchmarkInput: UpdateUserBenchmarkInput;
  UpdateUserProfileInput: UpdateUserProfileInput;
  UpdateUserProfileResult: UpdateUserProfileResult;
  UpdateWorkoutInput: UpdateWorkoutInput;
  UpdateWorkoutMetaDataInput: UpdateWorkoutMetaDataInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  UpdateWorkoutPlanDayInput: UpdateWorkoutPlanDayInput;
  UpdateWorkoutPlanDayWorkoutInput: UpdateWorkoutPlanDayWorkoutInput;
  UpdateWorkoutPlanInput: UpdateWorkoutPlanInput;
  UpdateWorkoutPlanMetaDataInput: UpdateWorkoutPlanMetaDataInput;
  UpdateWorkoutPlanReviewInput: UpdateWorkoutPlanReviewInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  UserAvatarData: UserAvatarData;
  UserBenchmark: UserBenchmark;
  UserBenchmarkEntry: UserBenchmarkEntry;
  UserBenchmarkSummary: UserBenchmarkSummary;
  UserBenchmarkWithBestEntry: UserBenchmarkWithBestEntry;
  UserProfile: UserProfile;
  UserProfileSummary: UserProfileSummary;
  Workout: Workout;
  WorkoutFiltersInput: WorkoutFiltersInput;
  WorkoutGoal: WorkoutGoal;
  WorkoutMetaData: WorkoutMetaData;
  WorkoutMove: WorkoutMove;
  WorkoutPlan: WorkoutPlan;
  WorkoutPlanDay: WorkoutPlanDay;
  WorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  WorkoutPlanEnrolment: WorkoutPlanEnrolment;
  WorkoutPlanEnrolmentSummary: WorkoutPlanEnrolmentSummary;
  WorkoutPlanEnrolmentWithPlan: WorkoutPlanEnrolmentWithPlan;
  WorkoutPlanFiltersInput: WorkoutPlanFiltersInput;
  WorkoutPlanMetaData: WorkoutPlanMetaData;
  WorkoutPlanReview: WorkoutPlanReview;
  WorkoutPlanSummary: WorkoutPlanSummary;
  WorkoutPlanWithMetaData: WorkoutPlanWithMetaData;
  WorkoutSection: WorkoutSection;
  WorkoutSectionType: WorkoutSectionType;
  WorkoutSet: WorkoutSet;
  WorkoutSummary: WorkoutSummary;
  WorkoutTag: WorkoutTag;
  WorkoutWithMetaData: WorkoutWithMetaData;
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
  Admins?: Resolver<Array<ResolversTypes['UserAvatarData']>, ParentType, ContextType>;
  ClubInviteTokens?: Resolver<Maybe<Array<ResolversTypes['ClubInviteToken']>>, ParentType, ContextType>;
  Members?: Resolver<Array<ResolversTypes['UserAvatarData']>, ParentType, ContextType>;
  Owner?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
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

export type ClubAnnouncementResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubAnnouncement'] = ResolversParentTypes['ClubAnnouncement']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  audioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubChatSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubChatSummary'] = ResolversParentTypes['ClubChatSummary']> = ResolversObject<{
  Admins?: Resolver<Array<ResolversTypes['UserAvatarData']>, ParentType, ContextType>;
  Members?: Resolver<Array<ResolversTypes['UserAvatarData']>, ParentType, ContextType>;
  Owner?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubInviteTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubInviteToken'] = ResolversParentTypes['ClubInviteToken']> = ResolversObject<{
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inviteLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  joinedUserIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubInviteTokenDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubInviteTokenData'] = ResolversParentTypes['ClubInviteTokenData']> = ResolversObject<{
  Club?: Resolver<ResolversTypes['ClubSummary'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubInviteTokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubInviteTokens'] = ResolversParentTypes['ClubInviteTokens']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokens?: Resolver<Array<ResolversTypes['ClubInviteToken']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubMemberSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubMemberSummary'] = ResolversParentTypes['ClubMemberSummary']> = ResolversObject<{
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubMembersResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubMembers'] = ResolversParentTypes['ClubMembers']> = ResolversObject<{
  Admins?: Resolver<Array<ResolversTypes['ClubMemberSummary']>, ParentType, ContextType>;
  Members?: Resolver<Array<ResolversTypes['ClubMemberSummary']>, ParentType, ContextType>;
  Owner?: Resolver<ResolversTypes['ClubMemberSummary'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubMetaData'] = ResolversParentTypes['ClubMetaData']> = ResolversObject<{
  metaTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reasonNotValidated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validated?: Resolver<ResolversTypes['PublicContentValidationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubSummary'] = ResolversParentTypes['ClubSummary']> = ResolversObject<{
  Admins?: Resolver<Array<ResolversTypes['UserAvatarData']>, ParentType, ContextType>;
  Owner?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  planCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubWithMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubWithMetaData'] = ResolversParentTypes['ClubWithMetaData']> = ResolversObject<{
  Club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  metaData?: Resolver<ResolversTypes['ClubMetaData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubWorkoutPlansResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubWorkoutPlans'] = ResolversParentTypes['ClubWorkoutPlans']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanSummary']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClubWorkoutsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubWorkouts'] = ResolversParentTypes['ClubWorkouts']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workouts?: Resolver<Array<ResolversTypes['WorkoutSummary']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = ResolversObject<{
  WorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanSummary']>, ParentType, ContextType>;
  Workouts?: Resolver<Array<ResolversTypes['WorkoutSummary']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompletedWorkoutPlanDayWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompletedWorkoutPlanDayWorkout'] = ResolversParentTypes['CompletedWorkoutPlanDayWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loggedWorkoutId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workoutPlanDayWorkoutId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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

export type JournalGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['JournalGoal'] = ResolversParentTypes['JournalGoal']> = ResolversObject<{
  completedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JournalMoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['JournalMood'] = ResolversParentTypes['JournalMood']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  energyScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moodScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  textNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JournalNoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['JournalNote'] = ResolversParentTypes['JournalNote']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  textNote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voiceNoteUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  User?: Resolver<Maybe<ResolversTypes['UserAvatarData']>, ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutMove'] = ResolversParentTypes['LoggedWorkoutMove']> = ResolversObject<{
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

export type LoggedWorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSection'] = ResolversParentTypes['LoggedWorkoutSection']> = ResolversObject<{
  LoggedWorkoutSets?: Resolver<Array<ResolversTypes['LoggedWorkoutSet']>, ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSet'] = ResolversParentTypes['LoggedWorkoutSet']> = ResolversObject<{
  LoggedWorkoutMoves?: Resolver<Array<ResolversTypes['LoggedWorkoutMove']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sectionRoundNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  addDocumentToSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationAddDocumentToSkillArgs, 'data'>>;
  addUserToClubViaInviteToken?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationAddUserToClubViaInviteTokenArgs, 'clubInviteTokenId' | 'userId'>>;
  addWorkoutPlanToClub?: Resolver<ResolversTypes['ClubWorkoutPlans'], ParentType, ContextType, RequireFields<MutationAddWorkoutPlanToClubArgs, 'clubId' | 'workoutPlanId'>>;
  addWorkoutPlanToCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationAddWorkoutPlanToCollectionArgs, 'data'>>;
  addWorkoutToClub?: Resolver<ResolversTypes['ClubWorkouts'], ParentType, ContextType, RequireFields<MutationAddWorkoutToClubArgs, 'clubId' | 'workoutId'>>;
  addWorkoutToCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationAddWorkoutToCollectionArgs, 'data'>>;
  archiveCustomMoveById?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationArchiveCustomMoveByIdArgs, 'id'>>;
  archiveWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationArchiveWorkoutByIdArgs, 'id'>>;
  archiveWorkoutPlanById?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationArchiveWorkoutPlanByIdArgs, 'id'>>;
  clearScheduleForPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationClearScheduleForPlanEnrolmentArgs, 'enrolmentId'>>;
  clearWorkoutPlanEnrolmentProgress?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationClearWorkoutPlanEnrolmentProgressArgs, 'enrolmentId'>>;
  copyWorkoutPlanDayToAnotherDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationCopyWorkoutPlanDayToAnotherDayArgs, 'data'>>;
  createBodyTrackingEntry?: Resolver<ResolversTypes['BodyTrackingEntry'], ParentType, ContextType, RequireFields<MutationCreateBodyTrackingEntryArgs, 'data'>>;
  createClub?: Resolver<ResolversTypes['ClubSummary'], ParentType, ContextType, RequireFields<MutationCreateClubArgs, 'data'>>;
  createClubAnnouncement?: Resolver<ResolversTypes['ClubAnnouncement'], ParentType, ContextType, RequireFields<MutationCreateClubAnnouncementArgs, 'data'>>;
  createClubInviteToken?: Resolver<ResolversTypes['ClubInviteTokens'], ParentType, ContextType, RequireFields<MutationCreateClubInviteTokenArgs, 'data'>>;
  createClubTimelinePost?: Resolver<ResolversTypes['TimelinePostFullData'], ParentType, ContextType, RequireFields<MutationCreateClubTimelinePostArgs, 'data'>>;
  createCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'data'>>;
  createCompletedWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationCreateCompletedWorkoutPlanDayWorkoutArgs, 'data'>>;
  createEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationCreateEquipmentArgs, 'data'>>;
  createGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationCreateGymProfileArgs, 'data'>>;
  createJournalGoal?: Resolver<ResolversTypes['JournalGoal'], ParentType, ContextType, RequireFields<MutationCreateJournalGoalArgs, 'data'>>;
  createJournalMood?: Resolver<ResolversTypes['JournalMood'], ParentType, ContextType, RequireFields<MutationCreateJournalMoodArgs, 'data'>>;
  createJournalNote?: Resolver<ResolversTypes['JournalNote'], ParentType, ContextType, RequireFields<MutationCreateJournalNoteArgs, 'data'>>;
  createLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutArgs, 'data'>>;
  createMove?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationCreateMoveArgs, 'data'>>;
  createScheduleForPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationCreateScheduleForPlanEnrolmentArgs, 'data'>>;
  createScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationCreateScheduledWorkoutArgs, 'data'>>;
  createSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationCreateSkillArgs, 'data'>>;
  createUserBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkArgs, 'data'>>;
  createUserBenchmarkEntry?: Resolver<ResolversTypes['UserBenchmarkEntry'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkEntryArgs, 'data'>>;
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
  deleteClub?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteClubArgs, 'id'>>;
  deleteClubAnnouncement?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteClubAnnouncementArgs, 'id'>>;
  deleteClubInviteToken?: Resolver<ResolversTypes['ClubInviteTokens'], ParentType, ContextType, RequireFields<MutationDeleteClubInviteTokenArgs, 'data'>>;
  deleteClubTimelinePost?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteClubTimelinePostArgs, 'activityId'>>;
  deleteCollectionById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCollectionByIdArgs, 'id'>>;
  deleteCompletedWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationDeleteCompletedWorkoutPlanDayWorkoutArgs, 'data'>>;
  deleteGymProfileById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteGymProfileByIdArgs, 'id'>>;
  deleteJournalGoalById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteJournalGoalByIdArgs, 'id'>>;
  deleteJournalMoodById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteJournalMoodByIdArgs, 'id'>>;
  deleteJournalNoteById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteJournalNoteByIdArgs, 'id'>>;
  deleteLoggedWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutByIdArgs, 'id'>>;
  deleteLoggedWorkoutMove?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutMoveArgs, 'id'>>;
  deleteScheduledWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteScheduledWorkoutByIdArgs, 'id'>>;
  deleteSkillById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteSkillByIdArgs, 'id'>>;
  deleteUserBenchmark?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkArgs, 'id'>>;
  deleteUserBenchmarkEntry?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkEntryArgs, 'id'>>;
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
  giveMemberAdminStatus?: Resolver<ResolversTypes['ClubMembers'], ParentType, ContextType, RequireFields<MutationGiveMemberAdminStatusArgs, 'clubId' | 'userId'>>;
  makeCopyWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationMakeCopyWorkoutByIdArgs, 'id'>>;
  moveWorkoutPlanDayToAnotherDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationMoveWorkoutPlanDayToAnotherDayArgs, 'data'>>;
  removeDocumentFromSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationRemoveDocumentFromSkillArgs, 'data'>>;
  removeMemberAdminStatus?: Resolver<ResolversTypes['ClubMembers'], ParentType, ContextType, RequireFields<MutationRemoveMemberAdminStatusArgs, 'clubId' | 'userId'>>;
  removeUserFromClub?: Resolver<ResolversTypes['ClubMembers'], ParentType, ContextType, RequireFields<MutationRemoveUserFromClubArgs, 'clubId' | 'userToRemoveId'>>;
  removeWorkoutFromClub?: Resolver<ResolversTypes['ClubWorkouts'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutFromClubArgs, 'clubId' | 'workoutId'>>;
  removeWorkoutFromCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutFromCollectionArgs, 'data'>>;
  removeWorkoutPlanFromClub?: Resolver<ResolversTypes['ClubWorkoutPlans'], ParentType, ContextType, RequireFields<MutationRemoveWorkoutPlanFromClubArgs, 'clubId' | 'workoutPlanId'>>;
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
  updateClubAnnouncement?: Resolver<ResolversTypes['ClubAnnouncement'], ParentType, ContextType, RequireFields<MutationUpdateClubAnnouncementArgs, 'data'>>;
  updateClubInviteToken?: Resolver<ResolversTypes['ClubInviteTokens'], ParentType, ContextType, RequireFields<MutationUpdateClubInviteTokenArgs, 'data'>>;
  updateClubMetaData?: Resolver<ResolversTypes['ClubMetaData'], ParentType, ContextType, RequireFields<MutationUpdateClubMetaDataArgs, 'data'>>;
  updateClubSummary?: Resolver<ResolversTypes['ClubSummary'], ParentType, ContextType, RequireFields<MutationUpdateClubSummaryArgs, 'data'>>;
  updateCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationUpdateCollectionArgs, 'data'>>;
  updateEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationUpdateEquipmentArgs, 'data'>>;
  updateGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationUpdateGymProfileArgs, 'data'>>;
  updateJournalGoal?: Resolver<ResolversTypes['JournalGoal'], ParentType, ContextType, RequireFields<MutationUpdateJournalGoalArgs, 'data'>>;
  updateJournalMood?: Resolver<ResolversTypes['JournalMood'], ParentType, ContextType, RequireFields<MutationUpdateJournalMoodArgs, 'data'>>;
  updateJournalNote?: Resolver<ResolversTypes['JournalNote'], ParentType, ContextType, RequireFields<MutationUpdateJournalNoteArgs, 'data'>>;
  updateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutArgs, 'data'>>;
  updateLoggedWorkoutMove?: Resolver<ResolversTypes['LoggedWorkoutMove'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutMoveArgs, 'data'>>;
  updateLoggedWorkoutSection?: Resolver<ResolversTypes['LoggedWorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutSectionArgs, 'data'>>;
  updateLoggedWorkoutSet?: Resolver<ResolversTypes['LoggedWorkoutSet'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutSetArgs, 'data'>>;
  updateMove?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationUpdateMoveArgs, 'data'>>;
  updateScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationUpdateScheduledWorkoutArgs, 'data'>>;
  updateSkill?: Resolver<ResolversTypes['Skill'], ParentType, ContextType, RequireFields<MutationUpdateSkillArgs, 'data'>>;
  updateUserBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkArgs, 'data'>>;
  updateUserBenchmarkEntry?: Resolver<ResolversTypes['UserBenchmarkEntry'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkEntryArgs, 'data'>>;
  updateUserProfile?: Resolver<ResolversTypes['UpdateUserProfileResult'], ParentType, ContextType, RequireFields<MutationUpdateUserProfileArgs, 'data'>>;
  updateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutArgs, 'data'>>;
  updateWorkoutMetaData?: Resolver<ResolversTypes['WorkoutMetaData'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutMetaDataArgs, 'data'>>;
  updateWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutMoveArgs, 'data'>>;
  updateWorkoutMoves?: Resolver<Array<ResolversTypes['WorkoutMove']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutMovesArgs, 'data'>>;
  updateWorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanArgs, 'data'>>;
  updateWorkoutPlanDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanDayArgs, 'data'>>;
  updateWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanDayWorkout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanDayWorkoutArgs, 'data'>>;
  updateWorkoutPlanMetaData?: Resolver<Maybe<ResolversTypes['WorkoutPlanMetaData']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanMetaDataArgs, 'data'>>;
  updateWorkoutPlanReview?: Resolver<ResolversTypes['WorkoutPlanReview'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanReviewArgs, 'data'>>;
  updateWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSectionArgs, 'data'>>;
  updateWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetArgs, 'data'>>;
  updateWorkoutTag?: Resolver<ResolversTypes['WorkoutTag'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutTagArgs, 'data'>>;
  userJoinPublicClub?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUserJoinPublicClubArgs, 'clubId'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  adminPublicClubs?: Resolver<Array<ResolversTypes['ClubWithMetaData']>, ParentType, ContextType, RequireFields<QueryAdminPublicClubsArgs, 'status'>>;
  adminPublicWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanWithMetaData']>, ParentType, ContextType, RequireFields<QueryAdminPublicWorkoutPlansArgs, 'status'>>;
  adminPublicWorkouts?: Resolver<Array<ResolversTypes['WorkoutWithMetaData']>, ParentType, ContextType, RequireFields<QueryAdminPublicWorkoutsArgs, 'status'>>;
  bodyAreas?: Resolver<Array<ResolversTypes['BodyArea']>, ParentType, ContextType>;
  bodyTrackingEntries?: Resolver<Array<ResolversTypes['BodyTrackingEntry']>, ParentType, ContextType>;
  checkClubInviteToken?: Resolver<ResolversTypes['CheckClubInviteTokenResult'], ParentType, ContextType, RequireFields<QueryCheckClubInviteTokenArgs, 'id'>>;
  checkUniqueClubName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueClubNameArgs, 'name'>>;
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  checkUserClubMemberStatus?: Resolver<ResolversTypes['UserClubMemberStatus'], ParentType, ContextType, RequireFields<QueryCheckUserClubMemberStatusArgs, 'clubId'>>;
  clubChatSummary?: Resolver<ResolversTypes['ClubChatSummary'], ParentType, ContextType, RequireFields<QueryClubChatSummaryArgs, 'clubId'>>;
  clubInviteTokens?: Resolver<ResolversTypes['ClubInviteTokens'], ParentType, ContextType, RequireFields<QueryClubInviteTokensArgs, 'clubId'>>;
  clubMembers?: Resolver<ResolversTypes['ClubMembers'], ParentType, ContextType, RequireFields<QueryClubMembersArgs, 'clubId'>>;
  clubMembersFeedPosts?: Resolver<Array<ResolversTypes['TimelinePostFullData']>, ParentType, ContextType, RequireFields<QueryClubMembersFeedPostsArgs, 'clubId' | 'limit' | 'offset'>>;
  clubSummaries?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType, RequireFields<QueryClubSummariesArgs, 'ids'>>;
  clubSummary?: Resolver<ResolversTypes['ClubSummary'], ParentType, ContextType, RequireFields<QueryClubSummaryArgs, 'id'>>;
  clubWorkoutPlans?: Resolver<ResolversTypes['ClubWorkoutPlans'], ParentType, ContextType, RequireFields<QueryClubWorkoutPlansArgs, 'clubId'>>;
  clubWorkouts?: Resolver<ResolversTypes['ClubWorkouts'], ParentType, ContextType, RequireFields<QueryClubWorkoutsArgs, 'clubId'>>;
  equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  gymProfiles?: Resolver<Array<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  journalGoals?: Resolver<Array<ResolversTypes['JournalGoal']>, ParentType, ContextType>;
  journalMoods?: Resolver<Array<ResolversTypes['JournalMood']>, ParentType, ContextType>;
  journalNotes?: Resolver<Array<ResolversTypes['JournalNote']>, ParentType, ContextType>;
  lifetimeLogStatsSummary?: Resolver<ResolversTypes['LifetimeLogStatsSummary'], ParentType, ContextType, RequireFields<QueryLifetimeLogStatsSummaryArgs, 'userId'>>;
  logCountByWorkout?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryLogCountByWorkoutArgs, 'id'>>;
  loggedWorkoutById?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<QueryLoggedWorkoutByIdArgs, 'id'>>;
  moveTypes?: Resolver<Array<ResolversTypes['MoveType']>, ParentType, ContextType>;
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
  userBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<QueryUserBenchmarkArgs, 'id'>>;
  userBenchmarks?: Resolver<Array<ResolversTypes['UserBenchmark']>, ParentType, ContextType>;
  userClubs?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType>;
  userCollectionById?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<QueryUserCollectionByIdArgs, 'id'>>;
  userCollections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  userCustomMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userLoggedWorkouts?: Resolver<Array<ResolversTypes['LoggedWorkout']>, ParentType, ContextType, RequireFields<QueryUserLoggedWorkoutsArgs, never>>;
  userProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<QueryUserProfileArgs, 'userId'>>;
  userProfiles?: Resolver<Array<ResolversTypes['UserProfileSummary']>, ParentType, ContextType, RequireFields<QueryUserProfilesArgs, never>>;
  userPublicWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlanSummary']>, ParentType, ContextType, RequireFields<QueryUserPublicWorkoutPlansArgs, 'userId'>>;
  userPublicWorkouts?: Resolver<Array<ResolversTypes['WorkoutSummary']>, ParentType, ContextType, RequireFields<QueryUserPublicWorkoutsArgs, 'userId'>>;
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
  workoutPlanDayWorkoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  workoutPlanEnrolmentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  workoutPlanName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SkillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = ResolversObject<{
  awardingBody?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  certificateRef?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  certification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  documentUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experience?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  audioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TimelinePostType'], ParentType, ContextType>;
  videoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimelinePostObjectDataUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimelinePostObjectDataUser'] = ResolversParentTypes['TimelinePostObjectDataUser']> = ResolversObject<{
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserProfileResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserProfileResult'] = ResolversParentTypes['UpdateUserProfileResult']> = ResolversObject<{
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  hasOnboarded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instagramHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tiktokHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userProfileScope?: Resolver<Maybe<ResolversTypes['UserProfileScope']>, ParentType, ContextType>;
  youtubeHandle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type UserBenchmarkWithBestEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmarkWithBestEntry'] = ResolversParentTypes['UserBenchmarkWithBestEntry']> = ResolversObject<{
  BestEntry?: Resolver<Maybe<ResolversTypes['UserBenchmarkEntry']>, ParentType, ContextType>;
  UserBenchmarkSummary?: Resolver<ResolversTypes['UserBenchmarkSummary'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = ResolversObject<{
  BenchmarksWithBestEntries?: Resolver<Array<ResolversTypes['UserBenchmarkWithBestEntry']>, ParentType, ContextType>;
  Clubs?: Resolver<Array<ResolversTypes['ClubSummary']>, ParentType, ContextType>;
  LifetimeLogStatsSummary?: Resolver<Maybe<ResolversTypes['LifetimeLogStatsSummary']>, ParentType, ContextType>;
  Skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
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
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userProfileScope?: Resolver<ResolversTypes['UserProfileScope'], ParentType, ContextType>;
  workoutCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<Maybe<ResolversTypes['DifficultyLevel']>, ParentType, ContextType>;
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

export type WorkoutMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMetaData'] = ResolversParentTypes['WorkoutMetaData']> = ResolversObject<{
  difficultyLevel?: Resolver<Maybe<ResolversTypes['DifficultyLevel']>, ParentType, ContextType>;
  metaTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reasonNotValidated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validated?: Resolver<ResolversTypes['PublicContentValidationStatus'], ParentType, ContextType>;
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
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
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
  CompletedWorkoutPlanDayWorkouts?: Resolver<Array<ResolversTypes['CompletedWorkoutPlanDayWorkout']>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolmentSummary'] = ResolversParentTypes['WorkoutPlanEnrolmentSummary']> = ResolversObject<{
  WorkoutPlan?: Resolver<ResolversTypes['WorkoutPlanSummary'], ParentType, ContextType>;
  completedWorkoutsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentWithPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolmentWithPlan'] = ResolversParentTypes['WorkoutPlanEnrolmentWithPlan']> = ResolversObject<{
  WorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType>;
  WorkoutPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanMetaData'] = ResolversParentTypes['WorkoutPlanMetaData']> = ResolversObject<{
  difficultyLevel?: Resolver<Maybe<ResolversTypes['DifficultyLevel']>, ParentType, ContextType>;
  metaTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reasonNotValidated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validated?: Resolver<ResolversTypes['PublicContentValidationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanReview'] = ResolversParentTypes['WorkoutPlanReview']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanSummary'] = ResolversParentTypes['WorkoutPlanSummary']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
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

export type WorkoutPlanWithMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanWithMetaData'] = ResolversParentTypes['WorkoutPlanWithMetaData']> = ResolversObject<{
  WorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType>;
  metaData?: Resolver<ResolversTypes['WorkoutPlanMetaData'], ParentType, ContextType>;
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
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSummary'] = ResolversParentTypes['WorkoutSummary']> = ResolversObject<{
  User?: Resolver<ResolversTypes['UserAvatarData'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<Maybe<ResolversTypes['DifficultyLevel']>, ParentType, ContextType>;
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

export type WorkoutWithMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutWithMetaData'] = ResolversParentTypes['WorkoutWithMetaData']> = ResolversObject<{
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  metaData?: Resolver<ResolversTypes['WorkoutMetaData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  BodyArea?: BodyAreaResolvers<ContextType>;
  BodyAreaMoveScore?: BodyAreaMoveScoreResolvers<ContextType>;
  BodyTrackingEntry?: BodyTrackingEntryResolvers<ContextType>;
  CheckClubInviteTokenResult?: CheckClubInviteTokenResultResolvers<ContextType>;
  Club?: ClubResolvers<ContextType>;
  ClubAnnouncement?: ClubAnnouncementResolvers<ContextType>;
  ClubChatSummary?: ClubChatSummaryResolvers<ContextType>;
  ClubInviteToken?: ClubInviteTokenResolvers<ContextType>;
  ClubInviteTokenData?: ClubInviteTokenDataResolvers<ContextType>;
  ClubInviteTokens?: ClubInviteTokensResolvers<ContextType>;
  ClubMemberSummary?: ClubMemberSummaryResolvers<ContextType>;
  ClubMembers?: ClubMembersResolvers<ContextType>;
  ClubMetaData?: ClubMetaDataResolvers<ContextType>;
  ClubSummary?: ClubSummaryResolvers<ContextType>;
  ClubWithMetaData?: ClubWithMetaDataResolvers<ContextType>;
  ClubWorkoutPlans?: ClubWorkoutPlansResolvers<ContextType>;
  ClubWorkouts?: ClubWorkoutsResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CompletedWorkoutPlanDayWorkout?: CompletedWorkoutPlanDayWorkoutResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Equipment?: EquipmentResolvers<ContextType>;
  GymProfile?: GymProfileResolvers<ContextType>;
  InviteTokenError?: InviteTokenErrorResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JournalGoal?: JournalGoalResolvers<ContextType>;
  JournalMood?: JournalMoodResolvers<ContextType>;
  JournalNote?: JournalNoteResolvers<ContextType>;
  LifetimeLogStatsSummary?: LifetimeLogStatsSummaryResolvers<ContextType>;
  LoggedWorkout?: LoggedWorkoutResolvers<ContextType>;
  LoggedWorkoutMove?: LoggedWorkoutMoveResolvers<ContextType>;
  LoggedWorkoutSection?: LoggedWorkoutSectionResolvers<ContextType>;
  LoggedWorkoutSet?: LoggedWorkoutSetResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  MoveType?: MoveTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScheduledWorkout?: ScheduledWorkoutResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  SortPositionUpdated?: SortPositionUpdatedResolvers<ContextType>;
  TextSearchResult?: TextSearchResultResolvers<ContextType>;
  TimelinePostFullData?: TimelinePostFullDataResolvers<ContextType>;
  TimelinePostObjectData?: TimelinePostObjectDataResolvers<ContextType>;
  TimelinePostObjectDataObject?: TimelinePostObjectDataObjectResolvers<ContextType>;
  TimelinePostObjectDataUser?: TimelinePostObjectDataUserResolvers<ContextType>;
  UpdateUserProfileResult?: UpdateUserProfileResultResolvers<ContextType>;
  UserAvatarData?: UserAvatarDataResolvers<ContextType>;
  UserBenchmark?: UserBenchmarkResolvers<ContextType>;
  UserBenchmarkEntry?: UserBenchmarkEntryResolvers<ContextType>;
  UserBenchmarkSummary?: UserBenchmarkSummaryResolvers<ContextType>;
  UserBenchmarkWithBestEntry?: UserBenchmarkWithBestEntryResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
  UserProfileSummary?: UserProfileSummaryResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutGoal?: WorkoutGoalResolvers<ContextType>;
  WorkoutMetaData?: WorkoutMetaDataResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
  WorkoutPlan?: WorkoutPlanResolvers<ContextType>;
  WorkoutPlanDay?: WorkoutPlanDayResolvers<ContextType>;
  WorkoutPlanDayWorkout?: WorkoutPlanDayWorkoutResolvers<ContextType>;
  WorkoutPlanEnrolment?: WorkoutPlanEnrolmentResolvers<ContextType>;
  WorkoutPlanEnrolmentSummary?: WorkoutPlanEnrolmentSummaryResolvers<ContextType>;
  WorkoutPlanEnrolmentWithPlan?: WorkoutPlanEnrolmentWithPlanResolvers<ContextType>;
  WorkoutPlanMetaData?: WorkoutPlanMetaDataResolvers<ContextType>;
  WorkoutPlanReview?: WorkoutPlanReviewResolvers<ContextType>;
  WorkoutPlanSummary?: WorkoutPlanSummaryResolvers<ContextType>;
  WorkoutPlanWithMetaData?: WorkoutPlanWithMetaDataResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  WorkoutSectionType?: WorkoutSectionTypeResolvers<ContextType>;
  WorkoutSet?: WorkoutSetResolvers<ContextType>;
  WorkoutSummary?: WorkoutSummaryResolvers<ContextType>;
  WorkoutTag?: WorkoutTagResolvers<ContextType>;
  WorkoutWithMetaData?: WorkoutWithMetaDataResolvers<ContextType>;
}>;


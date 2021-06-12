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

/** Enums */
export type BenchmarkType =
  | 'MAXLOAD'
  | 'FASTESTTIME'
  | 'UNBROKENREPS'
  | 'UNBROKENTIME';

export type BodyArea = {
  __typename?: 'BodyArea';
  id: Scalars['ID'];
  name: Scalars['String'];
  altNames?: Maybe<Scalars['String']>;
  frontBack: BodyAreaFrontBack;
  upperLower: BodyAreaUpperLower;
};

export type BodyAreaFrontBack =
  | 'BACK'
  | 'FRONT'
  | 'BOTH';

export type BodyAreaMoveScore = {
  __typename?: 'BodyAreaMoveScore';
  Move: Move;
  BodyArea: BodyArea;
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

export type BodyweightUnit =
  | 'KG'
  | 'LB';

export type ConnectRelationInput = {
  id: Scalars['ID'];
};

export type ContentAccessScope =
  | 'PRIVATE'
  | 'PUBLIC'
  | 'GROUP';

export type CopyWorkoutPlanDayToAnotherDayInput = {
  id: Scalars['ID'];
  copyToDay: Scalars['Int'];
};

export type CreateEquipmentInput = {
  name: Scalars['String'];
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
};

export type CreateGymProfileInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  Equipments?: Maybe<Array<ConnectRelationInput>>;
};

export type CreateLoggedWorkoutInput = {
  completedOn: Scalars['DateTime'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  LoggedWorkoutSections: Array<CreateLoggedWorkoutSectionInLoggedWorkoutInput>;
  Workout?: Maybe<ConnectRelationInput>;
  ScheduledWorkout?: Maybe<ConnectRelationInput>;
  GymProfile?: Maybe<ConnectRelationInput>;
};

export type CreateLoggedWorkoutMoveInLoggedSetInput = {
  sortPosition: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  Move: ConnectRelationInput;
  Equipment?: Maybe<ConnectRelationInput>;
};

export type CreateLoggedWorkoutMoveInput = {
  sortPosition: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  Move: ConnectRelationInput;
  Equipment?: Maybe<ConnectRelationInput>;
  LoggedWorkoutSet: ConnectRelationInput;
};

export type CreateLoggedWorkoutSectionInLoggedWorkoutInput = {
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  roundsCompleted: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  roundTimesMs?: Maybe<Scalars['JSON']>;
  repScore?: Maybe<Scalars['Int']>;
  timecap?: Maybe<Scalars['Int']>;
  WorkoutSectionType: ConnectRelationInput;
  LoggedWorkoutSets: Array<CreateLoggedWorkoutSetInLoggedSectionInput>;
};

export type CreateLoggedWorkoutSectionInput = {
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  roundsCompleted: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  roundTimesMs?: Maybe<Scalars['JSON']>;
  repScore?: Maybe<Scalars['Int']>;
  timecap?: Maybe<Scalars['Int']>;
  WorkoutSectionType: ConnectRelationInput;
  LoggedWorkout: ConnectRelationInput;
};

export type CreateLoggedWorkoutSetInLoggedSectionInput = {
  sortPosition: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  roundsCompleted: Scalars['Int'];
  duration?: Maybe<Scalars['Int']>;
  LoggedWorkoutMoves: Array<CreateLoggedWorkoutMoveInLoggedSetInput>;
};

export type CreateLoggedWorkoutSetInput = {
  sortPosition: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  roundsCompleted: Scalars['Int'];
  duration?: Maybe<Scalars['Int']>;
  LoggedWorkoutSection: ConnectRelationInput;
};

export type CreateMoveInput = {
  name: Scalars['String'];
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  scope?: Maybe<MoveScope>;
  MoveType: ConnectRelationInput;
  validRepTypes: Array<WorkoutMoveRepType>;
  RequiredEquipments?: Maybe<Array<ConnectRelationInput>>;
  SelectableEquipments?: Maybe<Array<ConnectRelationInput>>;
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScoreInput>>;
};

export type CreateProgressJournalEntryInput = {
  note?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
  bodyweight?: Maybe<Scalars['Float']>;
  bodyweightUnit?: Maybe<BodyweightUnit>;
  moodScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  stressScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  progressPhotoUris: Array<Scalars['String']>;
  ProgressJournal: ConnectRelationInput;
};

export type CreateProgressJournalGoalInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['DateTime']>;
  ProgressJournal: ConnectRelationInput;
  ProgressJournalGoalTags?: Maybe<Array<ConnectRelationInput>>;
};

export type CreateProgressJournalGoalTagInput = {
  tag: Scalars['String'];
  hexColor: Scalars['String'];
};

export type CreateProgressJournalInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type CreateScheduledWorkoutInput = {
  scheduledAt: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
  Workout: ConnectRelationInput;
  GymProfile?: Maybe<ConnectRelationInput>;
};

export type CreateUserBenchmarkEntryInput = {
  completedOn: Scalars['DateTime'];
  score: Scalars['Float'];
  note?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
  videoThumbUri?: Maybe<Scalars['String']>;
  UserBenchmark: ConnectRelationInput;
};

export type CreateUserBenchmarkInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  reps?: Maybe<Scalars['Float']>;
  repType?: Maybe<WorkoutMoveRepType>;
  load?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  distanceUnit?: Maybe<DistanceUnit>;
  benchmarkType: BenchmarkType;
  Equipment?: Maybe<ConnectRelationInput>;
  Move: ConnectRelationInput;
};

export type CreateWorkoutInput = {
  name: Scalars['String'];
  difficultyLevel: DifficultyLevel;
  contentAccessScope: ContentAccessScope;
};

export type CreateWorkoutMoveInput = {
  sortPosition: Scalars['Int'];
  reps: Scalars['Float'];
  repType: WorkoutMoveRepType;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount: Scalars['Float'];
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  Move: ConnectRelationInput;
  Equipment?: Maybe<ConnectRelationInput>;
  WorkoutSet: ConnectRelationInput;
};

export type CreateWorkoutPlanDayWithWorkoutInput = {
  dayNumber: Scalars['Int'];
  WorkoutPlan: ConnectRelationInput;
  Workout: ConnectRelationInput;
};

export type CreateWorkoutPlanDayWorkoutInput = {
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  WorkoutPlanDay: ConnectRelationInput;
  Workout: ConnectRelationInput;
};

export type CreateWorkoutPlanInput = {
  name: Scalars['String'];
  lengthWeeks: Scalars['Int'];
  contentAccessScope: ContentAccessScope;
};

export type CreateWorkoutPlanReviewInput = {
  score: Scalars['Float'];
  comment?: Maybe<Scalars['String']>;
  WorkoutPlan: Scalars['ID'];
};

export type CreateWorkoutSectionInput = {
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  rounds?: Maybe<Scalars['Int']>;
  timecap?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  classVideoUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classAudioUri?: Maybe<Scalars['String']>;
  outroVideoUri?: Maybe<Scalars['String']>;
  outroVideoThumbUri?: Maybe<Scalars['String']>;
  outroAudioUri?: Maybe<Scalars['String']>;
  WorkoutSectionType: ConnectRelationInput;
  Workout: ConnectRelationInput;
};

export type CreateWorkoutSetGeneratorInput = {
  type: WorkoutSetGeneratorType;
  workoutMoveIndex: Scalars['Int'];
  target: WorkoutSetGeneratorTarget;
  roundFrequency: Scalars['Int'];
  adjustAmount: Scalars['Float'];
  WorkoutSet: ConnectRelationInput;
};

export type CreateWorkoutSetInput = {
  sortPosition: Scalars['Int'];
  rounds?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  WorkoutSection: ConnectRelationInput;
};

export type CreateWorkoutSetIntervalBuyInInput = {
  interval: Scalars['Int'];
  WorkoutMove: CreateWorkoutMoveInput;
  WorkoutSet: ConnectRelationInput;
};

export type CreateWorkoutTagInput = {
  tag: Scalars['String'];
};


export type DifficultyLevel =
  | 'LIGHT'
  | 'CHALLENGING'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'ELITE';

export type DistanceUnit =
  | 'METRES'
  | 'KILOMETRES'
  | 'YARDS'
  | 'MILES';

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  name: Scalars['String'];
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
};

export type Gender =
  | 'MALE'
  | 'FEMALE'
  | 'NONBINARY'
  | 'NONE';

export type GymProfile = {
  __typename?: 'GymProfile';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  Equipments: Array<Equipment>;
};


export type LoadUnit =
  | 'KG'
  | 'LB'
  | 'BODYWEIGHTPERCENT'
  | 'PERCENTMAX';

export type LoggedWorkout = {
  __typename?: 'LoggedWorkout';
  id: Scalars['ID'];
  completedOn: Scalars['DateTime'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  LoggedWorkoutSections: Array<LoggedWorkoutSection>;
  Workout: Workout;
  ScheduledWorkout?: Maybe<ScheduledWorkout>;
  GymProfile?: Maybe<GymProfile>;
};

export type LoggedWorkoutMove = {
  __typename?: 'LoggedWorkoutMove';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  distanceUnit: DistanceUnit;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit: LoadUnit;
  timeUnit: TimeUnit;
  Move: Move;
  Equipment?: Maybe<Equipment>;
};

export type LoggedWorkoutSection = {
  __typename?: 'LoggedWorkoutSection';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  timecap?: Maybe<Scalars['Int']>;
  roundsCompleted: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  roundTimesMs: Scalars['JSON'];
  repScore?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  WorkoutSectionType: WorkoutSectionType;
  LoggedWorkoutSets: Array<LoggedWorkoutSet>;
  LoggedWorkout: LoggedWorkout;
};

export type LoggedWorkoutSet = {
  __typename?: 'LoggedWorkoutSet';
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  roundsCompleted: Scalars['Int'];
  duration?: Maybe<Scalars['Int']>;
  LoggedWorkoutMoves: Array<LoggedWorkoutMove>;
};

export type Move = {
  __typename?: 'Move';
  id: Scalars['ID'];
  name: Scalars['String'];
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  scope: MoveScope;
  MoveType: MoveType;
  validRepTypes: Array<WorkoutMoveRepType>;
  RequiredEquipments: Array<Equipment>;
  SelectableEquipments: Array<Equipment>;
  BodyAreaMoveScores: Array<BodyAreaMoveScore>;
};

/**
 * Standard moves are built in / official.
 * Custom moves are created by users.
 */
export type MoveScope =
  | 'STANDARD'
  | 'CUSTOM';

export type MoveType = {
  __typename?: 'MoveType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
};

export type MoveWorkoutPlanDayToAnotherDayInput = {
  id: Scalars['ID'];
  moveToDay: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEquipment?: Maybe<Equipment>;
  updateEquipment?: Maybe<Equipment>;
  createGymProfile: GymProfile;
  updateGymProfile: GymProfile;
  deleteGymProfileById?: Maybe<Scalars['ID']>;
  createProgressJournal: ProgressJournal;
  updateProgressJournal: ProgressJournal;
  deleteProgressJournalById: Scalars['ID'];
  createProgressJournalEntry: ProgressJournalEntry;
  updateProgressJournalEntry: ProgressJournalEntry;
  deleteProgressJournalEntryById: Scalars['ID'];
  createProgressJournalGoal: ProgressJournalGoal;
  updateProgressJournalGoal: ProgressJournalGoal;
  deleteProgressJournalGoalById: Scalars['ID'];
  createProgressJournalGoalTag: ProgressJournalGoalTag;
  updateProgressJournalGoalTag: ProgressJournalGoalTag;
  deleteProgressJournalGoalTagById: Scalars['ID'];
  createLoggedWorkout: LoggedWorkout;
  updateLoggedWorkout: LoggedWorkout;
  deleteLoggedWorkoutById: Scalars['ID'];
  createLoggedWorkoutSection: LoggedWorkoutSection;
  updateLoggedWorkoutSection: LoggedWorkoutSection;
  deleteLoggedWorkoutSectionById: Scalars['ID'];
  reorderLoggedWorkoutSections: Array<LoggedWorkoutSection>;
  createLoggedWorkoutSet: LoggedWorkoutSet;
  updateLoggedWorkoutSet: LoggedWorkoutSet;
  deleteLoggedWorkoutSetById: Scalars['ID'];
  reorderLoggedWorkoutSets: Array<LoggedWorkoutSet>;
  createLoggedWorkoutMove: LoggedWorkoutMove;
  updateLoggedWorkoutMove: LoggedWorkoutMove;
  deleteLoggedWorkoutMoveById: Scalars['ID'];
  reorderLoggedWorkoutMoves: Array<LoggedWorkoutMove>;
  createMove: Move;
  updateMove: Move;
  softDeleteMoveById: Scalars['ID'];
  createScheduledWorkout: ScheduledWorkout;
  updateScheduledWorkout: ScheduledWorkout;
  deleteScheduledWorkoutById: Scalars['ID'];
  updateUser: User;
  createWorkoutTag: WorkoutTag;
  createUserBenchmark: UserBenchmark;
  updateUserBenchmark: UserBenchmark;
  deleteUserBenchmarkById: Scalars['ID'];
  createUserBenchmarkEntry: UserBenchmarkEntry;
  updateUserBenchmarkEntry: UserBenchmarkEntry;
  deleteUserBenchmarkEntryById: Scalars['ID'];
  makeCopyWorkoutById: Workout;
  createWorkout: Workout;
  updateWorkout: Workout;
  duplicateWorkoutById: Workout;
  softDeleteWorkoutById?: Maybe<Scalars['ID']>;
  createWorkoutSection: WorkoutSection;
  updateWorkoutSection: WorkoutSection;
  deleteWorkoutSectionById: Scalars['ID'];
  reorderWorkoutSections: Array<SortPositionUpdated>;
  createWorkoutSet: WorkoutSet;
  updateWorkoutSet: WorkoutSet;
  duplicateWorkoutSetById: WorkoutSet;
  deleteWorkoutSetById: Scalars['ID'];
  reorderWorkoutSets: Array<SortPositionUpdated>;
  createWorkoutSetIntervalBuyIn: WorkoutSetIntervalBuyIn;
  updateWorkoutSetIntervalBuyIn: WorkoutSetIntervalBuyIn;
  deleteWorkoutSetIntervalBuyInById: Scalars['ID'];
  createWorkoutSetGenerator: WorkoutSetGenerator;
  updateWorkoutSetGenerator: WorkoutSetGenerator;
  deleteWorkoutSetGeneratorById: Scalars['ID'];
  createWorkoutMove: WorkoutMove;
  updateWorkoutMove: WorkoutMove;
  deleteWorkoutMoveById: Scalars['ID'];
  duplicateWorkoutMoveById: WorkoutMove;
  reorderWorkoutMoves: Array<SortPositionUpdated>;
  createWorkoutPlan: WorkoutPlan;
  updateWorkoutPlan: WorkoutPlan;
  moveWorkoutPlanDayToAnotherDay: WorkoutPlanDay;
  copyWorkoutPlanDayToAnotherDay: WorkoutPlanDay;
  softDeleteWorkoutPlanById: Scalars['ID'];
  createWorkoutPlanDayWithWorkout: WorkoutPlanDay;
  updateWorkoutPlanDay: WorkoutPlanDay;
  deleteWorkoutPlanDaysById: Array<Scalars['ID']>;
  createWorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  updateWorkoutPlanDayWorkout: WorkoutPlanDayWorkout;
  deleteWorkoutPlanDayWorkoutById: Scalars['ID'];
  reorderWorkoutPlanDayWorkouts: Array<SortPositionUpdated>;
  createWorkoutPlanEnrolment: WorkoutPlanEnrolment;
  updateWorkoutPlanEnrolment: WorkoutPlanEnrolment;
  deleteWorkoutPlanEnrolmentById: Scalars['ID'];
  createWorkoutPlanReview: WorkoutPlanReview;
  updateWorkoutPlanReview: WorkoutPlanReview;
  deleteWorkoutPlanReviewById: Scalars['ID'];
};


export type MutationCreateEquipmentArgs = {
  data: CreateEquipmentInput;
};


export type MutationUpdateEquipmentArgs = {
  data: UpdateEquipmentInput;
};


export type MutationCreateGymProfileArgs = {
  data: CreateGymProfileInput;
};


export type MutationUpdateGymProfileArgs = {
  data: UpdateGymProfileInput;
};


export type MutationDeleteGymProfileByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProgressJournalArgs = {
  data: CreateProgressJournalInput;
};


export type MutationUpdateProgressJournalArgs = {
  data: UpdateProgressJournalInput;
};


export type MutationDeleteProgressJournalByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProgressJournalEntryArgs = {
  data: CreateProgressJournalEntryInput;
};


export type MutationUpdateProgressJournalEntryArgs = {
  data: UpdateProgressJournalEntryInput;
};


export type MutationDeleteProgressJournalEntryByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProgressJournalGoalArgs = {
  data: CreateProgressJournalGoalInput;
};


export type MutationUpdateProgressJournalGoalArgs = {
  data: UpdateProgressJournalGoalInput;
};


export type MutationDeleteProgressJournalGoalByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProgressJournalGoalTagArgs = {
  data: CreateProgressJournalGoalTagInput;
};


export type MutationUpdateProgressJournalGoalTagArgs = {
  data: UpdateProgressJournalGoalTagInput;
};


export type MutationDeleteProgressJournalGoalTagByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLoggedWorkoutArgs = {
  data: CreateLoggedWorkoutInput;
};


export type MutationUpdateLoggedWorkoutArgs = {
  data: UpdateLoggedWorkoutInput;
};


export type MutationDeleteLoggedWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLoggedWorkoutSectionArgs = {
  data: CreateLoggedWorkoutSectionInput;
};


export type MutationUpdateLoggedWorkoutSectionArgs = {
  data: UpdateLoggedWorkoutSectionInput;
};


export type MutationDeleteLoggedWorkoutSectionByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderLoggedWorkoutSectionsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateLoggedWorkoutSetArgs = {
  data: CreateLoggedWorkoutSetInput;
};


export type MutationUpdateLoggedWorkoutSetArgs = {
  data: UpdateLoggedWorkoutSetInput;
};


export type MutationDeleteLoggedWorkoutSetByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderLoggedWorkoutSetsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateLoggedWorkoutMoveArgs = {
  data: CreateLoggedWorkoutMoveInput;
};


export type MutationUpdateLoggedWorkoutMoveArgs = {
  data: UpdateLoggedWorkoutMoveInput;
};


export type MutationDeleteLoggedWorkoutMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderLoggedWorkoutMovesArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateMoveArgs = {
  data: CreateMoveInput;
};


export type MutationUpdateMoveArgs = {
  data: UpdateMoveInput;
};


export type MutationSoftDeleteMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateScheduledWorkoutArgs = {
  data: CreateScheduledWorkoutInput;
};


export type MutationUpdateScheduledWorkoutArgs = {
  data: UpdateScheduledWorkoutInput;
};


export type MutationDeleteScheduledWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationCreateWorkoutTagArgs = {
  data: CreateWorkoutTagInput;
};


export type MutationCreateUserBenchmarkArgs = {
  data: CreateUserBenchmarkInput;
};


export type MutationUpdateUserBenchmarkArgs = {
  data: UpdateUserBenchmarkInput;
};


export type MutationDeleteUserBenchmarkByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserBenchmarkEntryArgs = {
  data: CreateUserBenchmarkEntryInput;
};


export type MutationUpdateUserBenchmarkEntryArgs = {
  data: UpdateUserBenchmarkEntryInput;
};


export type MutationDeleteUserBenchmarkEntryByIdArgs = {
  id: Scalars['ID'];
};


export type MutationMakeCopyWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutArgs = {
  data: CreateWorkoutInput;
};


export type MutationUpdateWorkoutArgs = {
  data: UpdateWorkoutInput;
};


export type MutationDuplicateWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationSoftDeleteWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutSectionArgs = {
  data: CreateWorkoutSectionInput;
};


export type MutationUpdateWorkoutSectionArgs = {
  data: UpdateWorkoutSectionInput;
};


export type MutationDeleteWorkoutSectionByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderWorkoutSectionsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateWorkoutSetArgs = {
  data: CreateWorkoutSetInput;
};


export type MutationUpdateWorkoutSetArgs = {
  data: UpdateWorkoutSetInput;
};


export type MutationDuplicateWorkoutSetByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkoutSetByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderWorkoutSetsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateWorkoutSetIntervalBuyInArgs = {
  data: CreateWorkoutSetIntervalBuyInInput;
};


export type MutationUpdateWorkoutSetIntervalBuyInArgs = {
  data: UpdateWorkoutSetIntervalBuyInInput;
};


export type MutationDeleteWorkoutSetIntervalBuyInByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutSetGeneratorArgs = {
  data: CreateWorkoutSetGeneratorInput;
};


export type MutationUpdateWorkoutSetGeneratorArgs = {
  data: UpdateWorkoutSetGeneratorInput;
};


export type MutationDeleteWorkoutSetGeneratorByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutMoveArgs = {
  data: CreateWorkoutMoveInput;
};


export type MutationUpdateWorkoutMoveArgs = {
  data: UpdateWorkoutMoveInput;
};


export type MutationDeleteWorkoutMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDuplicateWorkoutMoveByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderWorkoutMovesArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateWorkoutPlanArgs = {
  data: CreateWorkoutPlanInput;
};


export type MutationUpdateWorkoutPlanArgs = {
  data: UpdateWorkoutPlanInput;
};


export type MutationMoveWorkoutPlanDayToAnotherDayArgs = {
  data: MoveWorkoutPlanDayToAnotherDayInput;
};


export type MutationCopyWorkoutPlanDayToAnotherDayArgs = {
  data: CopyWorkoutPlanDayToAnotherDayInput;
};


export type MutationSoftDeleteWorkoutPlanByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutPlanDayWithWorkoutArgs = {
  data: CreateWorkoutPlanDayWithWorkoutInput;
};


export type MutationUpdateWorkoutPlanDayArgs = {
  data: UpdateWorkoutPlanDayInput;
};


export type MutationDeleteWorkoutPlanDaysByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationCreateWorkoutPlanDayWorkoutArgs = {
  data: CreateWorkoutPlanDayWorkoutInput;
};


export type MutationUpdateWorkoutPlanDayWorkoutArgs = {
  data: UpdateWorkoutPlanDayWorkoutInput;
};


export type MutationDeleteWorkoutPlanDayWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationReorderWorkoutPlanDayWorkoutsArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateWorkoutPlanEnrolmentArgs = {
  workoutPlanId: Scalars['ID'];
};


export type MutationUpdateWorkoutPlanEnrolmentArgs = {
  data: UpdateWorkoutPlanEnrolmentInput;
};


export type MutationDeleteWorkoutPlanEnrolmentByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutPlanReviewArgs = {
  data: CreateWorkoutPlanReviewInput;
};


export type MutationUpdateWorkoutPlanReviewArgs = {
  data: UpdateWorkoutPlanReviewInput;
};


export type MutationDeleteWorkoutPlanReviewByIdArgs = {
  id: Scalars['ID'];
};

export type ProgressJournal = {
  __typename?: 'ProgressJournal';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  ProgressJournalEntries: Array<ProgressJournalEntry>;
  ProgressJournalGoals: Array<ProgressJournalGoal>;
};

export type ProgressJournalEntry = {
  __typename?: 'ProgressJournalEntry';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
  bodyweight?: Maybe<Scalars['Float']>;
  bodyweightUnit: BodyweightUnit;
  moodScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  stressScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  progressPhotoUris: Array<Scalars['String']>;
  ProgressJournal: ProgressJournal;
};

export type ProgressJournalGoal = {
  __typename?: 'ProgressJournalGoal';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['DateTime']>;
  completedDate?: Maybe<Scalars['DateTime']>;
  ProgressJournalGoalTags: Array<ProgressJournalGoalTag>;
};

export type ProgressJournalGoalTag = {
  __typename?: 'ProgressJournalGoalTag';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  tag: Scalars['String'];
  hexColor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  validateToken: Scalars['Boolean'];
  bodyAreas: Array<BodyArea>;
  equipments: Array<Equipment>;
  moveTypes: Array<MoveType>;
  workoutGoals: Array<WorkoutGoal>;
  workoutSectionTypes: Array<WorkoutSectionType>;
  userLoggedWorkouts: Array<LoggedWorkout>;
  loggedWorkoutById: LoggedWorkout;
  standardMoves: Array<Move>;
  userCustomMoves: Array<Move>;
  userProgressJournals: Array<ProgressJournal>;
  progressJournalById: ProgressJournal;
  progressJournalGoalTags: Array<ProgressJournalGoalTag>;
  userScheduledWorkouts: Array<ScheduledWorkout>;
  textSearchWorkouts?: Maybe<Array<Workout>>;
  textSearchWorkoutNames?: Maybe<Array<TextSearchResult>>;
  textSearchWorkoutPlans?: Maybe<Array<WorkoutPlan>>;
  textSearchWorkoutPlanNames?: Maybe<Array<TextSearchResult>>;
  textSearchUserPublicProfiles?: Maybe<Array<UserPublicProfile>>;
  textSearchUserPublicNames?: Maybe<Array<TextSearchResult>>;
  authedUser: User;
  checkUniqueDisplayName: Scalars['Boolean'];
  gymProfiles: Array<GymProfile>;
  userWorkoutTags: Array<WorkoutTag>;
  userBenchmarks: Array<UserBenchmark>;
  userBenchmarkById: UserBenchmark;
  userPublicProfiles?: Maybe<Array<UserPublicProfile>>;
  userPublicProfileByUserId: UserPublicProfile;
  publicWorkouts: Array<Workout>;
  userWorkouts: Array<Workout>;
  workoutById: Workout;
  publicWorkoutPlans: Array<WorkoutPlan>;
  workoutPlanById: WorkoutPlan;
  userWorkoutPlans: Array<WorkoutPlan>;
  userWorkoutPlanEnrolments: Array<WorkoutPlanEnrolment>;
};


export type QueryUserLoggedWorkoutsArgs = {
  take?: Maybe<Scalars['Int']>;
};


export type QueryLoggedWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProgressJournalByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTextSearchWorkoutsArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutNamesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutPlansArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutPlanNamesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchUserPublicProfilesArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchUserPublicNamesArgs = {
  text: Scalars['String'];
};


export type QueryCheckUniqueDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type QueryUserBenchmarksArgs = {
  first?: Maybe<Scalars['Int']>;
};


export type QueryUserBenchmarkByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserPublicProfileByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryPublicWorkoutsArgs = {
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['ID']>;
  filters?: Maybe<WorkoutFiltersInput>;
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutPlanByIdArgs = {
  id: Scalars['ID'];
};

export type ScheduledWorkout = {
  __typename?: 'ScheduledWorkout';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  note?: Maybe<Scalars['String']>;
  Workout?: Maybe<Workout>;
  LoggedWorkout?: Maybe<LoggedWorkout>;
  GymProfile?: Maybe<GymProfile>;
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

export type UpdateEquipmentInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable?: Maybe<Scalars['Boolean']>;
};

export type UpdateGymProfileInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  Equipments?: Maybe<Array<ConnectRelationInput>>;
};

export type UpdateLoggedWorkoutInput = {
  id: Scalars['ID'];
  completedOn?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  GymProfile?: Maybe<ConnectRelationInput>;
};

export type UpdateLoggedWorkoutMoveInput = {
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  reps?: Maybe<Scalars['Float']>;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  Move?: Maybe<ConnectRelationInput>;
  Equipment?: Maybe<ConnectRelationInput>;
};

export type UpdateLoggedWorkoutSectionInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  roundsCompleted?: Maybe<Scalars['Int']>;
  timeTakenMs?: Maybe<Scalars['Int']>;
  roundTimesMs?: Maybe<Scalars['JSON']>;
  timecap?: Maybe<Scalars['Int']>;
  repScore?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
};

export type UpdateLoggedWorkoutSetInput = {
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  roundsCompleted?: Maybe<Scalars['Int']>;
};

export type UpdateMoveInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  scope?: Maybe<MoveScope>;
  MoveType?: Maybe<ConnectRelationInput>;
  validRepTypes?: Maybe<Array<WorkoutMoveRepType>>;
  RequiredEquipments?: Maybe<Array<ConnectRelationInput>>;
  SelectableEquipments?: Maybe<Array<ConnectRelationInput>>;
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScoreInput>>;
};

export type UpdateProgressJournalEntryInput = {
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
  bodyweight?: Maybe<Scalars['Float']>;
  bodyweightUnit?: Maybe<BodyweightUnit>;
  moodScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  stressScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  progressPhotoUris: Array<Scalars['String']>;
};

export type UpdateProgressJournalGoalInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['DateTime']>;
  deadline?: Maybe<Scalars['DateTime']>;
  ProgressJournalGoalTags?: Maybe<Array<ConnectRelationInput>>;
};

export type UpdateProgressJournalGoalTagInput = {
  id: Scalars['ID'];
  tag?: Maybe<Scalars['String']>;
  hexColor?: Maybe<Scalars['String']>;
};

export type UpdateProgressJournalInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UpdateScheduledWorkoutInput = {
  id: Scalars['ID'];
  scheduledAt?: Maybe<Scalars['DateTime']>;
  note?: Maybe<Scalars['String']>;
  Workout?: Maybe<ConnectRelationInput>;
  LoggedWorkout?: Maybe<ConnectRelationInput>;
  GymProfile?: Maybe<ConnectRelationInput>;
};

export type UpdateSortPositionInput = {
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
};

export type UpdateUserBenchmarkEntryInput = {
  id: Scalars['String'];
  completedOn?: Maybe<Scalars['DateTime']>;
  score?: Maybe<Scalars['Float']>;
  note?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
  videoThumbUri?: Maybe<Scalars['String']>;
};

export type UpdateUserBenchmarkInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  reps?: Maybe<Scalars['Float']>;
  repType?: Maybe<WorkoutMoveRepType>;
  load?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  distanceUnit?: Maybe<DistanceUnit>;
  benchmarkType: BenchmarkType;
  Equipment?: Maybe<ConnectRelationInput>;
  Move?: Maybe<ConnectRelationInput>;
};

export type UpdateUserInput = {
  userProfileScope?: Maybe<UserProfileScope>;
  avatarUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  townCity?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  instagramUrl?: Maybe<Scalars['String']>;
  tiktokUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
  snapUrl?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  hasOnboarded?: Maybe<Scalars['Boolean']>;
  lastname?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutInput = {
  id: Scalars['ID'];
  archived?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  lengthMinutes?: Maybe<Scalars['Int']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  contentAccessScope?: Maybe<ContentAccessScope>;
  WorkoutGoals?: Maybe<Array<ConnectRelationInput>>;
  WorkoutTags?: Maybe<Array<ConnectRelationInput>>;
};

export type UpdateWorkoutMoveInput = {
  id: Scalars['ID'];
  reps?: Maybe<Scalars['Float']>;
  repType?: Maybe<WorkoutMoveRepType>;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  timeUnit?: Maybe<TimeUnit>;
  Move?: Maybe<ConnectRelationInput>;
  Equipment?: Maybe<ConnectRelationInput>;
};

export type UpdateWorkoutPlanDayInput = {
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  dayNumber?: Maybe<Scalars['Int']>;
};

export type UpdateWorkoutPlanDayWorkoutInput = {
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  WorkoutPlanDay?: Maybe<ConnectRelationInput>;
  Workout?: Maybe<ConnectRelationInput>;
};

export type UpdateWorkoutPlanEnrolmentInput = {
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['DateTime']>;
  completedPlanDayWorkoutIds?: Maybe<Array<Scalars['String']>>;
};

export type UpdateWorkoutPlanInput = {
  id: Scalars['ID'];
  archived?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  lengthWeeks?: Maybe<Scalars['Int']>;
  coverImageUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  contentAccessScope?: Maybe<ContentAccessScope>;
  WorkoutTags?: Maybe<Array<ConnectRelationInput>>;
};

export type UpdateWorkoutPlanReviewInput = {
  id: Scalars['ID'];
  score?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
};

export type UpdateWorkoutSectionInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  rounds?: Maybe<Scalars['Int']>;
  timecap?: Maybe<Scalars['Int']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  classVideoUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classAudioUri?: Maybe<Scalars['String']>;
  outroVideoUri?: Maybe<Scalars['String']>;
  outroVideoThumbUri?: Maybe<Scalars['String']>;
  outroAudioUri?: Maybe<Scalars['String']>;
  WorkoutSectionType?: Maybe<ConnectRelationInput>;
};

export type UpdateWorkoutSetGeneratorInput = {
  id: Scalars['ID'];
  type?: Maybe<WorkoutSetGeneratorType>;
  workoutMoveIndex?: Maybe<Scalars['Int']>;
  target?: Maybe<WorkoutSetGeneratorTarget>;
  roundFrequency?: Maybe<Scalars['Int']>;
  adjustAmount?: Maybe<Scalars['Float']>;
};

export type UpdateWorkoutSetInput = {
  id: Scalars['ID'];
  rounds?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
};

export type UpdateWorkoutSetIntervalBuyInInput = {
  id: Scalars['ID'];
  interval?: Maybe<Scalars['Int']>;
  WorkoutMove?: Maybe<UpdateWorkoutMoveInput>;
};

export type UpdateWorkoutTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  userProfileScope: UserProfileScope;
  avatarUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  townCity?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  instagramUrl?: Maybe<Scalars['String']>;
  tiktokUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
  snapUrl?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  hasOnboarded: Scalars['Boolean'];
  GymProfiles?: Maybe<Array<GymProfile>>;
  ProgressJournalGoalTags?: Maybe<Array<ProgressJournalGoalTag>>;
};

export type UserBenchmark = {
  __typename?: 'UserBenchmark';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  lastEntryAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  reps?: Maybe<Scalars['Float']>;
  repType: WorkoutMoveRepType;
  load?: Maybe<Scalars['Float']>;
  loadUnit: LoadUnit;
  timeUnit: TimeUnit;
  distanceUnit: DistanceUnit;
  benchmarkType: BenchmarkType;
  Equipment?: Maybe<Equipment>;
  Move: Move;
  UserBenchmarkEntries: Array<UserBenchmarkEntry>;
};

export type UserBenchmarkEntry = {
  __typename?: 'UserBenchmarkEntry';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  completedOn: Scalars['DateTime'];
  score: Scalars['Float'];
  note?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
  videoThumbUri?: Maybe<Scalars['String']>;
};

export type UserPrivateProfile = {
  __typename?: 'UserPrivateProfile';
  LoggedWorkouts?: Maybe<Array<LoggedWorkout>>;
  Workouts?: Maybe<Array<Workout>>;
  WorkoutPlans?: Maybe<Array<WorkoutPlan>>;
  WorkoutPlanEnrolments?: Maybe<Array<WorkoutPlanEnrolment>>;
};

export type UserProfileScope =
  | 'PRIVATE'
  | 'PUBLIC';

export type UserPublicProfile = {
  __typename?: 'UserPublicProfile';
  id: Scalars['ID'];
  avatarUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  instagramUrl?: Maybe<Scalars['String']>;
  tiktokUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
  snapUrl?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  CustomMoves?: Maybe<Array<Move>>;
  Workouts?: Maybe<Array<Workout>>;
  WorkoutPlans?: Maybe<Array<WorkoutPlan>>;
};

export type UserSummary = {
  __typename?: 'UserSummary';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  avatarUri?: Maybe<Scalars['String']>;
  userProfileScope: UserProfileScope;
  tagline?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  User: UserSummary;
  archived: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  lengthMinutes?: Maybe<Scalars['Int']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  difficultyLevel: DifficultyLevel;
  contentAccessScope: ContentAccessScope;
  WorkoutGoals: Array<WorkoutGoal>;
  WorkoutTags: Array<WorkoutTag>;
  WorkoutSections: Array<WorkoutSection>;
};

export type WorkoutFiltersInput = {
  difficultyLevel?: Maybe<DifficultyLevel>;
  hasClassVideo?: Maybe<Scalars['Boolean']>;
  maxLength?: Maybe<Scalars['Int']>;
  minLength?: Maybe<Scalars['Int']>;
  workoutSectionTypes: Array<Scalars['ID']>;
  workoutGoals: Array<Scalars['ID']>;
  bodyweightOnly?: Maybe<Scalars['Boolean']>;
  availableEquipments: Array<Scalars['ID']>;
  requiredMoves: Array<Scalars['ID']>;
  excludedMoves: Array<Scalars['ID']>;
  targetedBodyAreas: Array<Scalars['ID']>;
};

export type WorkoutGoal = {
  __typename?: 'WorkoutGoal';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  hexColor: Scalars['String'];
};

export type WorkoutMove = {
  __typename?: 'WorkoutMove';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
  reps: Scalars['Float'];
  repType: WorkoutMoveRepType;
  distanceUnit: DistanceUnit;
  loadAmount: Scalars['Float'];
  loadUnit: LoadUnit;
  timeUnit: TimeUnit;
  Move: Move;
  Equipment?: Maybe<Equipment>;
};

export type WorkoutMoveRepType =
  | 'REPS'
  | 'CALORIES'
  | 'DISTANCE'
  | 'TIME';

export type WorkoutPlan = {
  __typename?: 'WorkoutPlan';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  archived: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  lengthWeeks: Scalars['Int'];
  coverImageUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  contentAccessScope: ContentAccessScope;
  User: UserSummary;
  Enrolments: Array<WorkoutPlanEnrolmentSummary>;
  WorkoutPlanDays: Array<WorkoutPlanDay>;
  WorkoutPlanReviews: Array<WorkoutPlanReview>;
  WorkoutTags: Array<WorkoutTag>;
};

export type WorkoutPlanDay = {
  __typename?: 'WorkoutPlanDay';
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  dayNumber: Scalars['Int'];
  WorkoutPlanDayWorkouts: Array<WorkoutPlanDayWorkout>;
};

export type WorkoutPlanDayWorkout = {
  __typename?: 'WorkoutPlanDayWorkout';
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  Workout: Workout;
};

export type WorkoutPlanEnrolment = {
  __typename?: 'WorkoutPlanEnrolment';
  id: Scalars['ID'];
  startDate: Scalars['DateTime'];
  completedPlanDayWorkoutIds: Array<Scalars['String']>;
  User: UserSummary;
  WorkoutPlan: WorkoutPlan;
};

export type WorkoutPlanEnrolmentSummary = {
  __typename?: 'WorkoutPlanEnrolmentSummary';
  id: Scalars['ID'];
  User: UserSummary;
};

export type WorkoutPlanReview = {
  __typename?: 'WorkoutPlanReview';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  score: Scalars['Float'];
  comment?: Maybe<Scalars['String']>;
  User: UserSummary;
};

export type WorkoutSection = {
  __typename?: 'WorkoutSection';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  rounds: Scalars['Int'];
  timecap?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  classVideoUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classAudioUri?: Maybe<Scalars['String']>;
  outroVideoUri?: Maybe<Scalars['String']>;
  outroVideoThumbUri?: Maybe<Scalars['String']>;
  outroAudioUri?: Maybe<Scalars['String']>;
  WorkoutSectionType: WorkoutSectionType;
  WorkoutSets: Array<WorkoutSet>;
};

export type WorkoutSectionSummary = {
  __typename?: 'WorkoutSectionSummary';
  name?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  classVideoUri?: Maybe<Scalars['String']>;
  classVideoThumbUri?: Maybe<Scalars['String']>;
  classAudioUri?: Maybe<Scalars['String']>;
  WorkoutSectionType: Scalars['String'];
};

export type WorkoutSectionType = {
  __typename?: 'WorkoutSectionType';
  id: Scalars['ID'];
  name: Scalars['String'];
  subtitle: Scalars['String'];
  description: Scalars['String'];
  validRepTypes: Array<WorkoutMoveRepType>;
  WorkoutSections: Array<WorkoutSection>;
  LoggedWorkoutSections: Array<LoggedWorkoutSection>;
};

export type WorkoutSet = {
  __typename?: 'WorkoutSet';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
  rounds: Scalars['Int'];
  duration?: Maybe<Scalars['Int']>;
  WorkoutMoves: Array<WorkoutMove>;
};

export type WorkoutSetGenerator = {
  __typename?: 'WorkoutSetGenerator';
  id: Scalars['ID'];
  type: WorkoutSetGeneratorType;
  workoutMoveIndex: Scalars['Int'];
  target: WorkoutSetGeneratorTarget;
  roundFrequency: Scalars['Int'];
  adjustAmount: Scalars['Float'];
  WorkoutSet: WorkoutSet;
};

export type WorkoutSetGeneratorTarget =
  | 'REPS'
  | 'LOAD';

export type WorkoutSetGeneratorType =
  | 'LADDERUP'
  | 'LADDERDOWN'
  | 'PYRAMIDUP'
  | 'PYRAMIDDOWN';

export type WorkoutSetIntervalBuyIn = {
  __typename?: 'WorkoutSetIntervalBuyIn';
  id: Scalars['ID'];
  interval: Scalars['Int'];
  WorkoutMove: WorkoutMove;
};

export type WorkoutSummary = {
  __typename?: 'WorkoutSummary';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['ID'];
  creatorName: Scalars['String'];
  creatorAvatarUri?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  contentAccessScope: ContentAccessScope;
  lengthMinutes?: Maybe<Scalars['Int']>;
  difficultyLevel: DifficultyLevel;
  WorkoutGoals: Array<Scalars['String']>;
  WorkoutTags: Array<Scalars['String']>;
  WorkoutSections: Array<WorkoutSectionSummary>;
  Moves: Array<Scalars['String']>;
  Equipments: Array<Scalars['String']>;
};

export type WorkoutTag = {
  __typename?: 'WorkoutTag';
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
  BenchmarkType: BenchmarkType;
  BodyArea: ResolverTypeWrapper<BodyArea>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  BodyAreaFrontBack: BodyAreaFrontBack;
  BodyAreaMoveScore: ResolverTypeWrapper<BodyAreaMoveScore>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BodyAreaMoveScoreInput: BodyAreaMoveScoreInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BodyAreaUpperLower: BodyAreaUpperLower;
  BodyweightUnit: BodyweightUnit;
  ConnectRelationInput: ConnectRelationInput;
  ContentAccessScope: ContentAccessScope;
  CopyWorkoutPlanDayToAnotherDayInput: CopyWorkoutPlanDayToAnotherDayInput;
  CreateEquipmentInput: CreateEquipmentInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateGymProfileInput: CreateGymProfileInput;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutMoveInLoggedSetInput: CreateLoggedWorkoutMoveInLoggedSetInput;
  CreateLoggedWorkoutMoveInput: CreateLoggedWorkoutMoveInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateLoggedWorkoutSectionInput: CreateLoggedWorkoutSectionInput;
  CreateLoggedWorkoutSetInLoggedSectionInput: CreateLoggedWorkoutSetInLoggedSectionInput;
  CreateLoggedWorkoutSetInput: CreateLoggedWorkoutSetInput;
  CreateMoveInput: CreateMoveInput;
  CreateProgressJournalEntryInput: CreateProgressJournalEntryInput;
  CreateProgressJournalGoalInput: CreateProgressJournalGoalInput;
  CreateProgressJournalGoalTagInput: CreateProgressJournalGoalTagInput;
  CreateProgressJournalInput: CreateProgressJournalInput;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  CreateUserBenchmarkEntryInput: CreateUserBenchmarkEntryInput;
  CreateUserBenchmarkInput: CreateUserBenchmarkInput;
  CreateWorkoutInput: CreateWorkoutInput;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  CreateWorkoutPlanDayWithWorkoutInput: CreateWorkoutPlanDayWithWorkoutInput;
  CreateWorkoutPlanDayWorkoutInput: CreateWorkoutPlanDayWorkoutInput;
  CreateWorkoutPlanInput: CreateWorkoutPlanInput;
  CreateWorkoutPlanReviewInput: CreateWorkoutPlanReviewInput;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  CreateWorkoutSetGeneratorInput: CreateWorkoutSetGeneratorInput;
  CreateWorkoutSetInput: CreateWorkoutSetInput;
  CreateWorkoutSetIntervalBuyInInput: CreateWorkoutSetIntervalBuyInInput;
  CreateWorkoutTagInput: CreateWorkoutTagInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DifficultyLevel: DifficultyLevel;
  DistanceUnit: DistanceUnit;
  Equipment: ResolverTypeWrapper<Equipment>;
  Gender: Gender;
  GymProfile: ResolverTypeWrapper<GymProfile>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
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
  ProgressJournal: ResolverTypeWrapper<ProgressJournal>;
  ProgressJournalEntry: ResolverTypeWrapper<ProgressJournalEntry>;
  ProgressJournalGoal: ResolverTypeWrapper<ProgressJournalGoal>;
  ProgressJournalGoalTag: ResolverTypeWrapper<ProgressJournalGoalTag>;
  Query: ResolverTypeWrapper<{}>;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  SortPositionUpdated: ResolverTypeWrapper<SortPositionUpdated>;
  TextSearchResult: ResolverTypeWrapper<TextSearchResult>;
  TimeUnit: TimeUnit;
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutMoveInput: UpdateLoggedWorkoutMoveInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateLoggedWorkoutSetInput: UpdateLoggedWorkoutSetInput;
  UpdateMoveInput: UpdateMoveInput;
  UpdateProgressJournalEntryInput: UpdateProgressJournalEntryInput;
  UpdateProgressJournalGoalInput: UpdateProgressJournalGoalInput;
  UpdateProgressJournalGoalTagInput: UpdateProgressJournalGoalTagInput;
  UpdateProgressJournalInput: UpdateProgressJournalInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  UpdateSortPositionInput: UpdateSortPositionInput;
  UpdateUserBenchmarkEntryInput: UpdateUserBenchmarkEntryInput;
  UpdateUserBenchmarkInput: UpdateUserBenchmarkInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  UpdateWorkoutPlanDayInput: UpdateWorkoutPlanDayInput;
  UpdateWorkoutPlanDayWorkoutInput: UpdateWorkoutPlanDayWorkoutInput;
  UpdateWorkoutPlanEnrolmentInput: UpdateWorkoutPlanEnrolmentInput;
  UpdateWorkoutPlanInput: UpdateWorkoutPlanInput;
  UpdateWorkoutPlanReviewInput: UpdateWorkoutPlanReviewInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  UpdateWorkoutSetGeneratorInput: UpdateWorkoutSetGeneratorInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  UpdateWorkoutSetIntervalBuyInInput: UpdateWorkoutSetIntervalBuyInInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  User: ResolverTypeWrapper<User>;
  UserBenchmark: ResolverTypeWrapper<UserBenchmark>;
  UserBenchmarkEntry: ResolverTypeWrapper<UserBenchmarkEntry>;
  UserPrivateProfile: ResolverTypeWrapper<UserPrivateProfile>;
  UserProfileScope: UserProfileScope;
  UserPublicProfile: ResolverTypeWrapper<UserPublicProfile>;
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
  WorkoutPlanReview: ResolverTypeWrapper<WorkoutPlanReview>;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  WorkoutSectionSummary: ResolverTypeWrapper<WorkoutSectionSummary>;
  WorkoutSectionType: ResolverTypeWrapper<WorkoutSectionType>;
  WorkoutSet: ResolverTypeWrapper<WorkoutSet>;
  WorkoutSetGenerator: ResolverTypeWrapper<WorkoutSetGenerator>;
  WorkoutSetGeneratorTarget: WorkoutSetGeneratorTarget;
  WorkoutSetGeneratorType: WorkoutSetGeneratorType;
  WorkoutSetIntervalBuyIn: ResolverTypeWrapper<WorkoutSetIntervalBuyIn>;
  WorkoutSummary: ResolverTypeWrapper<WorkoutSummary>;
  WorkoutTag: ResolverTypeWrapper<WorkoutTag>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BodyArea: BodyArea;
  ID: Scalars['ID'];
  String: Scalars['String'];
  BodyAreaMoveScore: BodyAreaMoveScore;
  Int: Scalars['Int'];
  BodyAreaMoveScoreInput: BodyAreaMoveScoreInput;
  Float: Scalars['Float'];
  ConnectRelationInput: ConnectRelationInput;
  CopyWorkoutPlanDayToAnotherDayInput: CopyWorkoutPlanDayToAnotherDayInput;
  CreateEquipmentInput: CreateEquipmentInput;
  Boolean: Scalars['Boolean'];
  CreateGymProfileInput: CreateGymProfileInput;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutMoveInLoggedSetInput: CreateLoggedWorkoutMoveInLoggedSetInput;
  CreateLoggedWorkoutMoveInput: CreateLoggedWorkoutMoveInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateLoggedWorkoutSectionInput: CreateLoggedWorkoutSectionInput;
  CreateLoggedWorkoutSetInLoggedSectionInput: CreateLoggedWorkoutSetInLoggedSectionInput;
  CreateLoggedWorkoutSetInput: CreateLoggedWorkoutSetInput;
  CreateMoveInput: CreateMoveInput;
  CreateProgressJournalEntryInput: CreateProgressJournalEntryInput;
  CreateProgressJournalGoalInput: CreateProgressJournalGoalInput;
  CreateProgressJournalGoalTagInput: CreateProgressJournalGoalTagInput;
  CreateProgressJournalInput: CreateProgressJournalInput;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  CreateUserBenchmarkEntryInput: CreateUserBenchmarkEntryInput;
  CreateUserBenchmarkInput: CreateUserBenchmarkInput;
  CreateWorkoutInput: CreateWorkoutInput;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  CreateWorkoutPlanDayWithWorkoutInput: CreateWorkoutPlanDayWithWorkoutInput;
  CreateWorkoutPlanDayWorkoutInput: CreateWorkoutPlanDayWorkoutInput;
  CreateWorkoutPlanInput: CreateWorkoutPlanInput;
  CreateWorkoutPlanReviewInput: CreateWorkoutPlanReviewInput;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  CreateWorkoutSetGeneratorInput: CreateWorkoutSetGeneratorInput;
  CreateWorkoutSetInput: CreateWorkoutSetInput;
  CreateWorkoutSetIntervalBuyInInput: CreateWorkoutSetIntervalBuyInInput;
  CreateWorkoutTagInput: CreateWorkoutTagInput;
  DateTime: Scalars['DateTime'];
  Equipment: Equipment;
  GymProfile: GymProfile;
  JSON: Scalars['JSON'];
  LoggedWorkout: LoggedWorkout;
  LoggedWorkoutMove: LoggedWorkoutMove;
  LoggedWorkoutSection: LoggedWorkoutSection;
  LoggedWorkoutSet: LoggedWorkoutSet;
  Move: Move;
  MoveType: MoveType;
  MoveWorkoutPlanDayToAnotherDayInput: MoveWorkoutPlanDayToAnotherDayInput;
  Mutation: {};
  ProgressJournal: ProgressJournal;
  ProgressJournalEntry: ProgressJournalEntry;
  ProgressJournalGoal: ProgressJournalGoal;
  ProgressJournalGoalTag: ProgressJournalGoalTag;
  Query: {};
  ScheduledWorkout: ScheduledWorkout;
  SortPositionUpdated: SortPositionUpdated;
  TextSearchResult: TextSearchResult;
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutMoveInput: UpdateLoggedWorkoutMoveInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateLoggedWorkoutSetInput: UpdateLoggedWorkoutSetInput;
  UpdateMoveInput: UpdateMoveInput;
  UpdateProgressJournalEntryInput: UpdateProgressJournalEntryInput;
  UpdateProgressJournalGoalInput: UpdateProgressJournalGoalInput;
  UpdateProgressJournalGoalTagInput: UpdateProgressJournalGoalTagInput;
  UpdateProgressJournalInput: UpdateProgressJournalInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  UpdateSortPositionInput: UpdateSortPositionInput;
  UpdateUserBenchmarkEntryInput: UpdateUserBenchmarkEntryInput;
  UpdateUserBenchmarkInput: UpdateUserBenchmarkInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  UpdateWorkoutPlanDayInput: UpdateWorkoutPlanDayInput;
  UpdateWorkoutPlanDayWorkoutInput: UpdateWorkoutPlanDayWorkoutInput;
  UpdateWorkoutPlanEnrolmentInput: UpdateWorkoutPlanEnrolmentInput;
  UpdateWorkoutPlanInput: UpdateWorkoutPlanInput;
  UpdateWorkoutPlanReviewInput: UpdateWorkoutPlanReviewInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  UpdateWorkoutSetGeneratorInput: UpdateWorkoutSetGeneratorInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  UpdateWorkoutSetIntervalBuyInInput: UpdateWorkoutSetIntervalBuyInInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  User: User;
  UserBenchmark: UserBenchmark;
  UserBenchmarkEntry: UserBenchmarkEntry;
  UserPrivateProfile: UserPrivateProfile;
  UserPublicProfile: UserPublicProfile;
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
  WorkoutPlanReview: WorkoutPlanReview;
  WorkoutSection: WorkoutSection;
  WorkoutSectionSummary: WorkoutSectionSummary;
  WorkoutSectionType: WorkoutSectionType;
  WorkoutSet: WorkoutSet;
  WorkoutSetGenerator: WorkoutSetGenerator;
  WorkoutSetIntervalBuyIn: WorkoutSetIntervalBuyIn;
  WorkoutSummary: WorkoutSummary;
  WorkoutTag: WorkoutTag;
}>;

export type BodyAreaResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyArea'] = ResolversParentTypes['BodyArea']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frontBack?: Resolver<ResolversTypes['BodyAreaFrontBack'], ParentType, ContextType>;
  upperLower?: Resolver<ResolversTypes['BodyAreaUpperLower'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BodyAreaMoveScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyAreaMoveScore'] = ResolversParentTypes['BodyAreaMoveScore']> = ResolversObject<{
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  BodyArea?: Resolver<ResolversTypes['BodyArea'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loadAdjustable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GymProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['GymProfile'] = ResolversParentTypes['GymProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoggedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkout'] = ResolversParentTypes['LoggedWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  LoggedWorkoutSections?: Resolver<Array<ResolversTypes['LoggedWorkoutSection']>, ParentType, ContextType>;
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  ScheduledWorkout?: Resolver<Maybe<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  GymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutMove'] = ResolversParentTypes['LoggedWorkoutMove']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['WorkoutMoveRepType'], ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  distanceUnit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  loadAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  timeUnit?: Resolver<ResolversTypes['TimeUnit'], ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  Equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSection'] = ResolversParentTypes['LoggedWorkoutSection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  roundsCompleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  roundTimesMs?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  repScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  LoggedWorkoutSets?: Resolver<Array<ResolversTypes['LoggedWorkoutSet']>, ParentType, ContextType>;
  LoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSet'] = ResolversParentTypes['LoggedWorkoutSet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundsCompleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  LoggedWorkoutMoves?: Resolver<Array<ResolversTypes['LoggedWorkoutMove']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Move'] = ResolversParentTypes['Move']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchTerms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['MoveScope'], ParentType, ContextType>;
  MoveType?: Resolver<ResolversTypes['MoveType'], ParentType, ContextType>;
  validRepTypes?: Resolver<Array<ResolversTypes['WorkoutMoveRepType']>, ParentType, ContextType>;
  RequiredEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  SelectableEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  BodyAreaMoveScores?: Resolver<Array<ResolversTypes['BodyAreaMoveScore']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveType'] = ResolversParentTypes['MoveType']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationCreateEquipmentArgs, 'data'>>;
  updateEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType, RequireFields<MutationUpdateEquipmentArgs, 'data'>>;
  createGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationCreateGymProfileArgs, 'data'>>;
  updateGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationUpdateGymProfileArgs, 'data'>>;
  deleteGymProfileById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteGymProfileByIdArgs, 'id'>>;
  createProgressJournal?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalArgs, 'data'>>;
  updateProgressJournal?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalArgs, 'data'>>;
  deleteProgressJournalById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalByIdArgs, 'id'>>;
  createProgressJournalEntry?: Resolver<ResolversTypes['ProgressJournalEntry'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalEntryArgs, 'data'>>;
  updateProgressJournalEntry?: Resolver<ResolversTypes['ProgressJournalEntry'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalEntryArgs, 'data'>>;
  deleteProgressJournalEntryById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalEntryByIdArgs, 'id'>>;
  createProgressJournalGoal?: Resolver<ResolversTypes['ProgressJournalGoal'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalGoalArgs, 'data'>>;
  updateProgressJournalGoal?: Resolver<ResolversTypes['ProgressJournalGoal'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalGoalArgs, 'data'>>;
  deleteProgressJournalGoalById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalGoalByIdArgs, 'id'>>;
  createProgressJournalGoalTag?: Resolver<ResolversTypes['ProgressJournalGoalTag'], ParentType, ContextType, RequireFields<MutationCreateProgressJournalGoalTagArgs, 'data'>>;
  updateProgressJournalGoalTag?: Resolver<ResolversTypes['ProgressJournalGoalTag'], ParentType, ContextType, RequireFields<MutationUpdateProgressJournalGoalTagArgs, 'data'>>;
  deleteProgressJournalGoalTagById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteProgressJournalGoalTagByIdArgs, 'id'>>;
  createLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutArgs, 'data'>>;
  updateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutArgs, 'data'>>;
  deleteLoggedWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutByIdArgs, 'id'>>;
  createLoggedWorkoutSection?: Resolver<ResolversTypes['LoggedWorkoutSection'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutSectionArgs, 'data'>>;
  updateLoggedWorkoutSection?: Resolver<ResolversTypes['LoggedWorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutSectionArgs, 'data'>>;
  deleteLoggedWorkoutSectionById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutSectionByIdArgs, 'id'>>;
  reorderLoggedWorkoutSections?: Resolver<Array<ResolversTypes['LoggedWorkoutSection']>, ParentType, ContextType, RequireFields<MutationReorderLoggedWorkoutSectionsArgs, 'data'>>;
  createLoggedWorkoutSet?: Resolver<ResolversTypes['LoggedWorkoutSet'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutSetArgs, 'data'>>;
  updateLoggedWorkoutSet?: Resolver<ResolversTypes['LoggedWorkoutSet'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutSetArgs, 'data'>>;
  deleteLoggedWorkoutSetById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutSetByIdArgs, 'id'>>;
  reorderLoggedWorkoutSets?: Resolver<Array<ResolversTypes['LoggedWorkoutSet']>, ParentType, ContextType, RequireFields<MutationReorderLoggedWorkoutSetsArgs, 'data'>>;
  createLoggedWorkoutMove?: Resolver<ResolversTypes['LoggedWorkoutMove'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutMoveArgs, 'data'>>;
  updateLoggedWorkoutMove?: Resolver<ResolversTypes['LoggedWorkoutMove'], ParentType, ContextType, RequireFields<MutationUpdateLoggedWorkoutMoveArgs, 'data'>>;
  deleteLoggedWorkoutMoveById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutMoveByIdArgs, 'id'>>;
  reorderLoggedWorkoutMoves?: Resolver<Array<ResolversTypes['LoggedWorkoutMove']>, ParentType, ContextType, RequireFields<MutationReorderLoggedWorkoutMovesArgs, 'data'>>;
  createMove?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationCreateMoveArgs, 'data'>>;
  updateMove?: Resolver<ResolversTypes['Move'], ParentType, ContextType, RequireFields<MutationUpdateMoveArgs, 'data'>>;
  softDeleteMoveById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationSoftDeleteMoveByIdArgs, 'id'>>;
  createScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationCreateScheduledWorkoutArgs, 'data'>>;
  updateScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationUpdateScheduledWorkoutArgs, 'data'>>;
  deleteScheduledWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteScheduledWorkoutByIdArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
  createWorkoutTag?: Resolver<ResolversTypes['WorkoutTag'], ParentType, ContextType, RequireFields<MutationCreateWorkoutTagArgs, 'data'>>;
  createUserBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkArgs, 'data'>>;
  updateUserBenchmark?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkArgs, 'data'>>;
  deleteUserBenchmarkById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkByIdArgs, 'id'>>;
  createUserBenchmarkEntry?: Resolver<ResolversTypes['UserBenchmarkEntry'], ParentType, ContextType, RequireFields<MutationCreateUserBenchmarkEntryArgs, 'data'>>;
  updateUserBenchmarkEntry?: Resolver<ResolversTypes['UserBenchmarkEntry'], ParentType, ContextType, RequireFields<MutationUpdateUserBenchmarkEntryArgs, 'data'>>;
  deleteUserBenchmarkEntryById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserBenchmarkEntryByIdArgs, 'id'>>;
  makeCopyWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationMakeCopyWorkoutByIdArgs, 'id'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'data'>>;
  updateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutArgs, 'data'>>;
  duplicateWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationDuplicateWorkoutByIdArgs, 'id'>>;
  softDeleteWorkoutById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationSoftDeleteWorkoutByIdArgs, 'id'>>;
  createWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSectionArgs, 'data'>>;
  updateWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSectionArgs, 'data'>>;
  deleteWorkoutSectionById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSectionByIdArgs, 'id'>>;
  reorderWorkoutSections?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutSectionsArgs, 'data'>>;
  createWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetArgs, 'data'>>;
  updateWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetArgs, 'data'>>;
  duplicateWorkoutSetById?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationDuplicateWorkoutSetByIdArgs, 'id'>>;
  deleteWorkoutSetById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetByIdArgs, 'id'>>;
  reorderWorkoutSets?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutSetsArgs, 'data'>>;
  createWorkoutSetIntervalBuyIn?: Resolver<ResolversTypes['WorkoutSetIntervalBuyIn'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetIntervalBuyInArgs, 'data'>>;
  updateWorkoutSetIntervalBuyIn?: Resolver<ResolversTypes['WorkoutSetIntervalBuyIn'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetIntervalBuyInArgs, 'data'>>;
  deleteWorkoutSetIntervalBuyInById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetIntervalBuyInByIdArgs, 'id'>>;
  createWorkoutSetGenerator?: Resolver<ResolversTypes['WorkoutSetGenerator'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetGeneratorArgs, 'data'>>;
  updateWorkoutSetGenerator?: Resolver<ResolversTypes['WorkoutSetGenerator'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetGeneratorArgs, 'data'>>;
  deleteWorkoutSetGeneratorById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetGeneratorByIdArgs, 'id'>>;
  createWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationCreateWorkoutMoveArgs, 'data'>>;
  updateWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutMoveArgs, 'data'>>;
  deleteWorkoutMoveById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutMoveByIdArgs, 'id'>>;
  duplicateWorkoutMoveById?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationDuplicateWorkoutMoveByIdArgs, 'id'>>;
  reorderWorkoutMoves?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutMovesArgs, 'data'>>;
  createWorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanArgs, 'data'>>;
  updateWorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanArgs, 'data'>>;
  moveWorkoutPlanDayToAnotherDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationMoveWorkoutPlanDayToAnotherDayArgs, 'data'>>;
  copyWorkoutPlanDayToAnotherDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationCopyWorkoutPlanDayToAnotherDayArgs, 'data'>>;
  softDeleteWorkoutPlanById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationSoftDeleteWorkoutPlanByIdArgs, 'id'>>;
  createWorkoutPlanDayWithWorkout?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanDayWithWorkoutArgs, 'data'>>;
  updateWorkoutPlanDay?: Resolver<ResolversTypes['WorkoutPlanDay'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanDayArgs, 'data'>>;
  deleteWorkoutPlanDaysById?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanDaysByIdArgs, 'ids'>>;
  createWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanDayWorkout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanDayWorkoutArgs, 'data'>>;
  updateWorkoutPlanDayWorkout?: Resolver<ResolversTypes['WorkoutPlanDayWorkout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanDayWorkoutArgs, 'data'>>;
  deleteWorkoutPlanDayWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanDayWorkoutByIdArgs, 'id'>>;
  reorderWorkoutPlanDayWorkouts?: Resolver<Array<ResolversTypes['SortPositionUpdated']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutPlanDayWorkoutsArgs, 'data'>>;
  createWorkoutPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanEnrolmentArgs, 'workoutPlanId'>>;
  updateWorkoutPlanEnrolment?: Resolver<ResolversTypes['WorkoutPlanEnrolment'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanEnrolmentArgs, 'data'>>;
  deleteWorkoutPlanEnrolmentById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanEnrolmentByIdArgs, 'id'>>;
  createWorkoutPlanReview?: Resolver<ResolversTypes['WorkoutPlanReview'], ParentType, ContextType, RequireFields<MutationCreateWorkoutPlanReviewArgs, 'data'>>;
  updateWorkoutPlanReview?: Resolver<ResolversTypes['WorkoutPlanReview'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutPlanReviewArgs, 'data'>>;
  deleteWorkoutPlanReviewById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutPlanReviewByIdArgs, 'id'>>;
}>;

export type ProgressJournalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournal'] = ResolversParentTypes['ProgressJournal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ProgressJournalEntries?: Resolver<Array<ResolversTypes['ProgressJournalEntry']>, ParentType, ContextType>;
  ProgressJournalGoals?: Resolver<Array<ResolversTypes['ProgressJournalGoal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalEntry'] = ResolversParentTypes['ProgressJournalEntry']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voiceNoteUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyweight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  bodyweightUnit?: Resolver<ResolversTypes['BodyweightUnit'], ParentType, ContextType>;
  moodScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  energyScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stressScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  motivationScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  progressPhotoUris?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ProgressJournal?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalGoal'] = ResolversParentTypes['ProgressJournalGoal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  completedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  ProgressJournalGoalTags?: Resolver<Array<ResolversTypes['ProgressJournalGoalTag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalGoalTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalGoalTag'] = ResolversParentTypes['ProgressJournalGoalTag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hexColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  validateToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bodyAreas?: Resolver<Array<ResolversTypes['BodyArea']>, ParentType, ContextType>;
  equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  moveTypes?: Resolver<Array<ResolversTypes['MoveType']>, ParentType, ContextType>;
  workoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  workoutSectionTypes?: Resolver<Array<ResolversTypes['WorkoutSectionType']>, ParentType, ContextType>;
  userLoggedWorkouts?: Resolver<Array<ResolversTypes['LoggedWorkout']>, ParentType, ContextType, RequireFields<QueryUserLoggedWorkoutsArgs, never>>;
  loggedWorkoutById?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<QueryLoggedWorkoutByIdArgs, 'id'>>;
  standardMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userCustomMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userProgressJournals?: Resolver<Array<ResolversTypes['ProgressJournal']>, ParentType, ContextType>;
  progressJournalById?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<QueryProgressJournalByIdArgs, 'id'>>;
  progressJournalGoalTags?: Resolver<Array<ResolversTypes['ProgressJournalGoalTag']>, ParentType, ContextType>;
  userScheduledWorkouts?: Resolver<Array<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  textSearchWorkouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutsArgs, 'text'>>;
  textSearchWorkoutNames?: Resolver<Maybe<Array<ResolversTypes['TextSearchResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutNamesArgs, 'text'>>;
  textSearchWorkoutPlans?: Resolver<Maybe<Array<ResolversTypes['WorkoutPlan']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutPlansArgs, 'text'>>;
  textSearchWorkoutPlanNames?: Resolver<Maybe<Array<ResolversTypes['TextSearchResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutPlanNamesArgs, 'text'>>;
  textSearchUserPublicProfiles?: Resolver<Maybe<Array<ResolversTypes['UserPublicProfile']>>, ParentType, ContextType, RequireFields<QueryTextSearchUserPublicProfilesArgs, 'text'>>;
  textSearchUserPublicNames?: Resolver<Maybe<Array<ResolversTypes['TextSearchResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchUserPublicNamesArgs, 'text'>>;
  authedUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  gymProfiles?: Resolver<Array<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  userWorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  userBenchmarks?: Resolver<Array<ResolversTypes['UserBenchmark']>, ParentType, ContextType, RequireFields<QueryUserBenchmarksArgs, never>>;
  userBenchmarkById?: Resolver<ResolversTypes['UserBenchmark'], ParentType, ContextType, RequireFields<QueryUserBenchmarkByIdArgs, 'id'>>;
  userPublicProfiles?: Resolver<Maybe<Array<ResolversTypes['UserPublicProfile']>>, ParentType, ContextType>;
  userPublicProfileByUserId?: Resolver<ResolversTypes['UserPublicProfile'], ParentType, ContextType, RequireFields<QueryUserPublicProfileByUserIdArgs, 'userId'>>;
  publicWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutsArgs, never>>;
  userWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  workoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<QueryWorkoutByIdArgs, 'id'>>;
  publicWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlan']>, ParentType, ContextType>;
  workoutPlanById?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType, RequireFields<QueryWorkoutPlanByIdArgs, 'id'>>;
  userWorkoutPlans?: Resolver<Array<ResolversTypes['WorkoutPlan']>, ParentType, ContextType>;
  userWorkoutPlanEnrolments?: Resolver<Array<ResolversTypes['WorkoutPlanEnrolment']>, ParentType, ContextType>;
}>;

export type ScheduledWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduledWorkout'] = ResolversParentTypes['ScheduledWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  scheduledAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Workout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType>;
  LoggedWorkout?: Resolver<Maybe<ResolversTypes['LoggedWorkout']>, ParentType, ContextType>;
  GymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
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

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userProfileScope?: Resolver<ResolversTypes['UserProfileScope'], ParentType, ContextType>;
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagramUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tiktokUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snapUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  hasOnboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  GymProfiles?: Resolver<Maybe<Array<ResolversTypes['GymProfile']>>, ParentType, ContextType>;
  ProgressJournalGoalTags?: Resolver<Maybe<Array<ResolversTypes['ProgressJournalGoalTag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmark'] = ResolversParentTypes['UserBenchmark']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lastEntryAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reps?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['WorkoutMoveRepType'], ParentType, ContextType>;
  load?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  timeUnit?: Resolver<ResolversTypes['TimeUnit'], ParentType, ContextType>;
  distanceUnit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  benchmarkType?: Resolver<ResolversTypes['BenchmarkType'], ParentType, ContextType>;
  Equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  UserBenchmarkEntries?: Resolver<Array<ResolversTypes['UserBenchmarkEntry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBenchmarkEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBenchmarkEntry'] = ResolversParentTypes['UserBenchmarkEntry']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPrivateProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPrivateProfile'] = ResolversParentTypes['UserPrivateProfile']> = ResolversObject<{
  LoggedWorkouts?: Resolver<Maybe<Array<ResolversTypes['LoggedWorkout']>>, ParentType, ContextType>;
  Workouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType>;
  WorkoutPlans?: Resolver<Maybe<Array<ResolversTypes['WorkoutPlan']>>, ParentType, ContextType>;
  WorkoutPlanEnrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutPlanEnrolment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPublicProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPublicProfile'] = ResolversParentTypes['UserPublicProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagramUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tiktokUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snapUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  CustomMoves?: Resolver<Maybe<Array<ResolversTypes['Move']>>, ParentType, ContextType>;
  Workouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType>;
  WorkoutPlans?: Resolver<Maybe<Array<ResolversTypes['WorkoutPlan']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSummary'] = ResolversParentTypes['UserSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userProfileScope?: Resolver<ResolversTypes['UserProfileScope'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  townCity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lengthMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutGoal'] = ResolversParentTypes['WorkoutGoal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hexColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMove'] = ResolversParentTypes['WorkoutMove']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['WorkoutMoveRepType'], ParentType, ContextType>;
  distanceUnit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  loadAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  timeUnit?: Resolver<ResolversTypes['TimeUnit'], ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  Equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlan'] = ResolversParentTypes['WorkoutPlan']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lengthWeeks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  Enrolments?: Resolver<Array<ResolversTypes['WorkoutPlanEnrolmentSummary']>, ParentType, ContextType>;
  WorkoutPlanDays?: Resolver<Array<ResolversTypes['WorkoutPlanDay']>, ParentType, ContextType>;
  WorkoutPlanReviews?: Resolver<Array<ResolversTypes['WorkoutPlanReview']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanDayResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanDay'] = ResolversParentTypes['WorkoutPlanDay']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dayNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  WorkoutPlanDayWorkouts?: Resolver<Array<ResolversTypes['WorkoutPlanDayWorkout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanDayWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanDayWorkout'] = ResolversParentTypes['WorkoutPlanDayWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolment'] = ResolversParentTypes['WorkoutPlanEnrolment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  completedPlanDayWorkoutIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  WorkoutPlan?: Resolver<ResolversTypes['WorkoutPlan'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanEnrolmentSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanEnrolmentSummary'] = ResolversParentTypes['WorkoutPlanEnrolmentSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutPlanReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutPlanReview'] = ResolversParentTypes['WorkoutPlanReview']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['UserSummary'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSection'] = ResolversParentTypes['WorkoutSection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outroVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outroVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outroAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  WorkoutSets?: Resolver<Array<ResolversTypes['WorkoutSet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSectionSummary'] = ResolversParentTypes['WorkoutSectionSummary']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  classVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSectionType'] = ResolversParentTypes['WorkoutSectionType']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validRepTypes?: Resolver<Array<ResolversTypes['WorkoutMoveRepType']>, ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  LoggedWorkoutSections?: Resolver<Array<ResolversTypes['LoggedWorkoutSection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSet'] = ResolversParentTypes['WorkoutSet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  WorkoutMoves?: Resolver<Array<ResolversTypes['WorkoutMove']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetGeneratorResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSetGenerator'] = ResolversParentTypes['WorkoutSetGenerator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['WorkoutSetGeneratorType'], ParentType, ContextType>;
  workoutMoveIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['WorkoutSetGeneratorTarget'], ParentType, ContextType>;
  roundFrequency?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  adjustAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  WorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetIntervalBuyInResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSetIntervalBuyIn'] = ResolversParentTypes['WorkoutSetIntervalBuyIn']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  WorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSummary'] = ResolversParentTypes['WorkoutSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creatorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creatorAvatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  lengthMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSectionSummary']>, ParentType, ContextType>;
  Moves?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  Equipments?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
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
  DateTime?: GraphQLScalarType;
  Equipment?: EquipmentResolvers<ContextType>;
  GymProfile?: GymProfileResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LoggedWorkout?: LoggedWorkoutResolvers<ContextType>;
  LoggedWorkoutMove?: LoggedWorkoutMoveResolvers<ContextType>;
  LoggedWorkoutSection?: LoggedWorkoutSectionResolvers<ContextType>;
  LoggedWorkoutSet?: LoggedWorkoutSetResolvers<ContextType>;
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
  User?: UserResolvers<ContextType>;
  UserBenchmark?: UserBenchmarkResolvers<ContextType>;
  UserBenchmarkEntry?: UserBenchmarkEntryResolvers<ContextType>;
  UserPrivateProfile?: UserPrivateProfileResolvers<ContextType>;
  UserPublicProfile?: UserPublicProfileResolvers<ContextType>;
  UserSummary?: UserSummaryResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutGoal?: WorkoutGoalResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
  WorkoutPlan?: WorkoutPlanResolvers<ContextType>;
  WorkoutPlanDay?: WorkoutPlanDayResolvers<ContextType>;
  WorkoutPlanDayWorkout?: WorkoutPlanDayWorkoutResolvers<ContextType>;
  WorkoutPlanEnrolment?: WorkoutPlanEnrolmentResolvers<ContextType>;
  WorkoutPlanEnrolmentSummary?: WorkoutPlanEnrolmentSummaryResolvers<ContextType>;
  WorkoutPlanReview?: WorkoutPlanReviewResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  WorkoutSectionSummary?: WorkoutSectionSummaryResolvers<ContextType>;
  WorkoutSectionType?: WorkoutSectionTypeResolvers<ContextType>;
  WorkoutSet?: WorkoutSetResolvers<ContextType>;
  WorkoutSetGenerator?: WorkoutSetGeneratorResolvers<ContextType>;
  WorkoutSetIntervalBuyIn?: WorkoutSetIntervalBuyInResolvers<ContextType>;
  WorkoutSummary?: WorkoutSummaryResolvers<ContextType>;
  WorkoutTag?: WorkoutTagResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

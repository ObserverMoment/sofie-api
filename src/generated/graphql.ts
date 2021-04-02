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
};


export type Query = {
  __typename?: 'Query';
  validateToken: Scalars['Boolean'];
  bodyAreas: Array<BodyArea>;
  equipments: Array<Equipment>;
  moveTypes: Array<MoveType>;
  workoutGoals: Array<Maybe<WorkoutGoal>>;
  workoutSectionTypes: Array<WorkoutSectionType>;
  userLoggedWorkouts: Array<LoggedWorkout>;
  standardMoves: Array<Move>;
  userCustomMoves: Array<Move>;
  userProgressJournals: Array<ProgressJournal>;
  progressJournalById: ProgressJournal;
  progressJournalGoalTags: Array<ProgressJournalGoalTag>;
  userScheduledWorkouts: Array<ScheduledWorkout>;
  textSearchWorkouts?: Maybe<Array<TextSearchWorkoutResult>>;
  textSearchWorkoutPrograms?: Maybe<Array<TextSearchWorkoutProgramResult>>;
  textSearchCreatorPublicProfiles?: Maybe<Array<UserPublicProfile>>;
  checkUniqueDisplayName: Scalars['Boolean'];
  authedUser: User;
  gymProfiles: Array<GymProfile>;
  userPublicProfiles?: Maybe<Array<UserPublicProfile>>;
  userPublicProfileByUserId: UserPublicProfile;
  officialWorkouts: Array<Workout>;
  publicWorkouts: Array<Workout>;
  userWorkouts: Array<Workout>;
  workoutById: Workout;
  officialWorkoutPrograms: Array<WorkoutProgram>;
  publicWorkoutPrograms: Array<WorkoutProgram>;
  workoutProgramById: WorkoutProgram;
  userWorkoutPrograms: Array<WorkoutProgram>;
  userWorkoutProgramEnrolments?: Maybe<Array<WorkoutProgramEnrolment>>;
};


export type QueryProgressJournalByIdArgs = {
  progressJournalId: Scalars['ID'];
};


export type QueryTextSearchWorkoutsArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutProgramsArgs = {
  text: Scalars['String'];
};


export type QueryTextSearchCreatorPublicProfilesArgs = {
  text: Scalars['String'];
};


export type QueryCheckUniqueDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type QueryUserPublicProfileByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutProgramByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserWorkoutProgramEnrolmentsArgs = {
  workoutProgramId: Scalars['ID'];
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
  makeCopyWorkoutById: Workout;
  createWorkout: Workout;
  updateWorkout: Workout;
  softDeleteWorkoutById?: Maybe<Scalars['ID']>;
  createWorkoutSection: WorkoutSection;
  updateWorkoutSection: WorkoutSection;
  softDeleteWorkoutSectionById: Scalars['ID'];
  reorderWorkoutSections: Array<WorkoutSection>;
  createWorkoutSet: WorkoutSet;
  updateWorkoutSet: WorkoutSet;
  deleteWorkoutSetById: Scalars['ID'];
  reorderWorkoutSets: Array<WorkoutSet>;
  createWorkoutSetIntervalBuyIn: WorkoutSetIntervalBuyIn;
  updateWorkoutSetIntervalBuyIn: WorkoutSetIntervalBuyIn;
  deleteWorkoutSetIntervalBuyInById: Scalars['ID'];
  createWorkoutSetGenerator: WorkoutSetGenerator;
  updateWorkoutSetGenerator: WorkoutSetGenerator;
  deleteWorkoutSetGeneratorById: Scalars['ID'];
  createWorkoutMove: WorkoutMove;
  updateWorkoutMove: WorkoutMove;
  deleteWorkoutMoveById: Scalars['ID'];
  reorderWorkoutMoves: Array<WorkoutMove>;
  createWorkoutProgram: WorkoutProgram;
  updateWorkoutProgram: WorkoutProgram;
  softDeleteWorkoutProgramById: Scalars['ID'];
  createWorkoutProgramWorkout: WorkoutProgramWorkout;
  updateWorkoutProgramWorkout: WorkoutProgramWorkout;
  deleteWorkoutProgramWorkoutById: Scalars['ID'];
  createWorkoutProgramEnrolment: WorkoutProgramEnrolment;
  deleteWorkoutProgramEnrolmentById: Scalars['ID'];
  createWorkoutProgramReview: WorkoutProgramReview;
  updateWorkoutProgramReview: WorkoutProgramReview;
  deleteWorkoutProgramReviewById: Scalars['ID'];
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


export type MutationMakeCopyWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutArgs = {
  data: CreateWorkoutInput;
};


export type MutationUpdateWorkoutArgs = {
  data: UpdateWorkoutInput;
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


export type MutationSoftDeleteWorkoutSectionByIdArgs = {
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


export type MutationReorderWorkoutMovesArgs = {
  data: Array<UpdateSortPositionInput>;
};


export type MutationCreateWorkoutProgramArgs = {
  data: CreateWorkoutProgramInput;
};


export type MutationUpdateWorkoutProgramArgs = {
  data: UpdateWorkoutProgramInput;
};


export type MutationSoftDeleteWorkoutProgramByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutProgramWorkoutArgs = {
  data: CreateWorkoutProgramWorkoutInput;
};


export type MutationUpdateWorkoutProgramWorkoutArgs = {
  data: UpdateWorkoutProgramWorkoutInput;
};


export type MutationDeleteWorkoutProgramWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutProgramEnrolmentArgs = {
  workoutProgramId: Scalars['ID'];
};


export type MutationDeleteWorkoutProgramEnrolmentByIdArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkoutProgramReviewArgs = {
  data: CreateWorkoutProgramReviewInput;
};


export type MutationUpdateWorkoutProgramReviewArgs = {
  data: UpdateWorkoutProgramReviewInput;
};


export type MutationDeleteWorkoutProgramReviewByIdArgs = {
  id: Scalars['ID'];
};

export type UpdateSortPositionInput = {
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
};

export type WorkoutGoal = {
  __typename?: 'WorkoutGoal';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  imageUri?: Maybe<Scalars['String']>;
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

export type BodyArea = {
  __typename?: 'BodyArea';
  id: Scalars['ID'];
  name: Scalars['String'];
  altNames?: Maybe<Scalars['String']>;
  BodyAreaMoveScores: Array<BodyAreaMoveScore>;
  frontBack: BodyAreaFrontBack;
  upperLower: BodyAreaUpperLower;
};

export type BodyAreaMoveScore = {
  __typename?: 'BodyAreaMoveScore';
  id: Scalars['ID'];
  Move: Move;
  BodyArea: BodyArea;
  score: Scalars['Float'];
};

/** Enums */
export type BodyAreaFrontBack =
  | 'BACK'
  | 'FRONT'
  | 'BOTH';

export type BodyAreaUpperLower =
  | 'CORE'
  | 'LOWER'
  | 'UPPER';

export type ContentAccessScope =
  | 'PRIVATE'
  | 'PUBLIC'
  | 'GROUP'
  | 'OFFICIAL';

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

export type Gender =
  | 'MALE'
  | 'FEMALE'
  | 'NONBINARY'
  | 'NONE';

export type LoadUnit =
  | 'KG'
  | 'LB'
  | 'BODYWEIGHTPERCENT';

/**
 * Standard moves are built in / official.
 * Custom moves are created by users.
 */
export type MoveScope =
  | 'STANDARD'
  | 'CUSTOM';

export type WorkoutMoveRepType =
  | 'REPS'
  | 'CALORIES'
  | 'DISTANCE'
  | 'TIME';

export type WorkoutSetGeneratorTarget =
  | 'REPS'
  | 'LOAD';

export type WorkoutSetGeneratorType =
  | 'LADDERUP'
  | 'LADDERDOWN'
  | 'PYRAMIDUP'
  | 'PYRAMIDDOWN';

export type UserProfileScope =
  | 'PRIVATE'
  | 'PUBLIC';

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  name: Scalars['String'];
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
};

export type CreateEquipmentInput = {
  name: Scalars['String'];
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
};

export type UpdateEquipmentInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  altNames?: Maybe<Scalars['String']>;
  loadAdjustable?: Maybe<Scalars['Boolean']>;
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
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScore>>;
};

export type MoveType = {
  __typename?: 'MoveType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
};

export type CreateMoveInput = {
  name: Scalars['String'];
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  scope?: Maybe<MoveScope>;
  MoveType: Scalars['ID'];
  validRepTypes: Array<WorkoutMoveRepType>;
  RequiredEquipments?: Maybe<Array<Scalars['ID']>>;
  SelectableEquipments?: Maybe<Array<Scalars['ID']>>;
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScoreInput>>;
};

export type UpdateMoveInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUri?: Maybe<Scalars['String']>;
  demoVideoThumbUri?: Maybe<Scalars['String']>;
  scope?: Maybe<MoveScope>;
  MoveType?: Maybe<Scalars['ID']>;
  validRepTypes?: Maybe<Array<WorkoutMoveRepType>>;
  RequiredEquipments?: Maybe<Array<Scalars['ID']>>;
  SelectableEquipments?: Maybe<Array<Scalars['ID']>>;
  BodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScoreInput>>;
};

export type BodyAreaMoveScoreInput = {
  BodyArea: Scalars['ID'];
  score: Scalars['Float'];
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
  city?: Maybe<Scalars['String']>;
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

export type UpdateUserInput = {
  userProfileScope?: Maybe<UserProfileScope>;
  avatarUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['DateTime']>;
  city?: Maybe<Scalars['String']>;
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

export type UserPublicProfile = {
  __typename?: 'UserPublicProfile';
  id: Scalars['ID'];
  avatarUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  instagramUrl?: Maybe<Scalars['String']>;
  tiktokUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
  snapUrl?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  CustomMoves?: Maybe<Array<Move>>;
  Workouts?: Maybe<Array<Workout>>;
  WorkoutPrograms?: Maybe<Array<WorkoutProgram>>;
};

export type UserPrivateProfile = {
  __typename?: 'UserPrivateProfile';
  LoggedWorkouts?: Maybe<Array<LoggedWorkout>>;
  Workouts?: Maybe<Array<Workout>>;
  WorkoutPrograms?: Maybe<Array<WorkoutProgram>>;
  WorkoutProgramEnrolments?: Maybe<Array<WorkoutProgramEnrolment>>;
};

export type GymProfile = {
  __typename?: 'GymProfile';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  Equipments: Array<Equipment>;
};

export type CreateGymProfileInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  Equipments: Array<Scalars['ID']>;
};

export type UpdateGymProfileInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  Equipments?: Maybe<Array<Scalars['ID']>>;
};

export type LoggedWorkout = {
  __typename?: 'LoggedWorkout';
  id: Scalars['ID'];
  completedOn: Scalars['DateTime'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
  LoggedWorkoutSections: Array<LoggedWorkoutSection>;
  Workout: Workout;
  ScheduledWorkout?: Maybe<ScheduledWorkout>;
  GymProfile?: Maybe<GymProfile>;
  WorkoutProgramWorkout?: Maybe<WorkoutProgramWorkout>;
  WorkoutProgramEnrolment?: Maybe<WorkoutProgramWorkout>;
};

export type LoggedWorkoutSection = {
  __typename?: 'LoggedWorkoutSection';
  id: Scalars['ID'];
  setIndex: Scalars['Int'];
  roundIndex: Scalars['Int'];
  timeTakenMs: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  WorkoutSectionType: WorkoutSectionType;
  LoggedWorkoutSets: Array<LoggedWorkoutSet>;
  LoggedWorkout: LoggedWorkout;
};

export type LoggedWorkoutSet = {
  __typename?: 'LoggedWorkoutSet';
  id: Scalars['ID'];
  setIndex: Scalars['Int'];
  roundIndex: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  LoggedWorkoutMoves: Array<LoggedWorkoutMove>;
};

export type LoggedWorkoutMove = {
  __typename?: 'LoggedWorkoutMove';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  distanceUnit: DistanceUnit;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit: LoadUnit;
  Move: Move;
  Equipment?: Maybe<Equipment>;
};

export type CreateLoggedWorkoutInput = {
  completedOn: Scalars['DateTime'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
  LoggedWorkoutSections: Array<CreateLoggedWorkoutSectionInLoggedWorkoutInput>;
  Workout: Scalars['ID'];
  ScheduledWorkout?: Maybe<Scalars['ID']>;
  GymProfile?: Maybe<Scalars['ID']>;
  WorkoutProgramWorkout?: Maybe<Scalars['ID']>;
  WorkoutProgramEnrolment?: Maybe<Scalars['ID']>;
};

export type CreateLoggedWorkoutSectionInLoggedWorkoutInput = {
  sectionIndex: Scalars['Int'];
  roundIndex: Scalars['Int'];
  timeTakenMs: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  WorkoutSectionType: Scalars['ID'];
  LoggedWorkoutSets: Array<CreateLoggedWorkoutSetInLoggedSectionInput>;
};

export type CreateLoggedWorkoutSetInLoggedSectionInput = {
  setIndex: Scalars['Int'];
  roundIndex: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  LoggedWorkoutMoves: Array<CreateLoggedWorkoutMoveInLoggedSetInput>;
};

export type CreateLoggedWorkoutMoveInLoggedSetInput = {
  sortPosition: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  Move: Scalars['ID'];
  Equipment?: Maybe<Scalars['ID']>;
};

export type CreateLoggedWorkoutSectionInput = {
  sectionIndex: Scalars['Int'];
  roundIndex: Scalars['Int'];
  timeTakenMs: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  WorkoutSectionType: Scalars['ID'];
  LoggedWorkout: Scalars['ID'];
};

export type CreateLoggedWorkoutSetInput = {
  setIndex: Scalars['Int'];
  roundIndex: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  LoggedWorkoutSection: Scalars['ID'];
};

export type CreateLoggedWorkoutMoveInput = {
  sortPosition: Scalars['Int'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  repType: WorkoutMoveRepType;
  reps: Scalars['Float'];
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  Move: Scalars['ID'];
  Equipment?: Maybe<Scalars['ID']>;
  LoggedWorkoutSet: Scalars['ID'];
};

export type UpdateLoggedWorkoutInput = {
  id: Scalars['ID'];
  completedOn?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
  ScheduledWorkout?: Maybe<Scalars['ID']>;
  GymProfile?: Maybe<Scalars['ID']>;
  WorkoutProgramWorkout?: Maybe<Scalars['ID']>;
  WorkoutProgramEnrolment?: Maybe<Scalars['ID']>;
};

export type UpdateLoggedWorkoutSectionInput = {
  id: Scalars['ID'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
};

export type UpdateLoggedWorkoutSetInput = {
  id: Scalars['ID'];
  timeTakenMs?: Maybe<Scalars['Int']>;
};

export type UpdateLoggedWorkoutMoveInput = {
  id: Scalars['ID'];
  timeTakenMs?: Maybe<Scalars['Int']>;
  reps?: Maybe<Scalars['Float']>;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  Move?: Maybe<Scalars['ID']>;
  Equipment?: Maybe<Scalars['ID']>;
};

export type ProgressJournal = {
  __typename?: 'ProgressJournal';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  ProgressJournalEntries?: Maybe<Array<ProgressJournalEntry>>;
  ProgressJournalGoals?: Maybe<Array<ProgressJournalGoal>>;
};

export type CreateProgressJournalInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateProgressJournalInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ProgressJournalEntry = {
  __typename?: 'ProgressJournalEntry';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
  bodyweight?: Maybe<Scalars['Float']>;
  moodScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  stressScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  progressPhotoUris?: Maybe<Array<Scalars['String']>>;
  ProgressJournal: ProgressJournal;
};

export type CreateProgressJournalEntryInput = {
  notes?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
  bodyweight?: Maybe<Scalars['Float']>;
  moodScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  stressScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  progressPhotoUris?: Maybe<Array<Scalars['String']>>;
  ProgressJournal: Scalars['ID'];
};

export type UpdateProgressJournalEntryInput = {
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  voiceNoteUri?: Maybe<Scalars['String']>;
  bodyweight?: Maybe<Scalars['Float']>;
  moodScore?: Maybe<Scalars['Float']>;
  energyScore?: Maybe<Scalars['Float']>;
  stressScore?: Maybe<Scalars['Float']>;
  motivationScore?: Maybe<Scalars['Float']>;
  progressPhotoUris?: Maybe<Array<Scalars['String']>>;
};

export type ProgressJournalGoal = {
  __typename?: 'ProgressJournalGoal';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['DateTime']>;
  completedDate?: Maybe<Scalars['DateTime']>;
  ProgressJournalGoalTags?: Maybe<Array<ProgressJournalGoalTag>>;
};

export type CreateProgressJournalGoalInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['DateTime']>;
  ProgressJournal: Scalars['ID'];
  ProgressJournalGoalTags?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateProgressJournalGoalInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['DateTime']>;
  deadline?: Maybe<Scalars['DateTime']>;
  ProgressJournalGoalTags?: Maybe<Array<Scalars['ID']>>;
};

export type ProgressJournalGoalTag = {
  __typename?: 'ProgressJournalGoalTag';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  tag: Scalars['String'];
  hexColor: Scalars['String'];
};

export type CreateProgressJournalGoalTagInput = {
  tag: Scalars['String'];
  hexColor: Scalars['String'];
};

export type UpdateProgressJournalGoalTagInput = {
  id: Scalars['ID'];
  tag?: Maybe<Scalars['String']>;
  hexColor?: Maybe<Scalars['String']>;
};

export type ScheduledWorkout = {
  __typename?: 'ScheduledWorkout';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  Workout: Workout;
  LoggedWorkout?: Maybe<LoggedWorkout>;
  GymProfile?: Maybe<GymProfile>;
};

export type CreateScheduledWorkoutInput = {
  scheduledAt: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  Workout: Scalars['ID'];
  GymProfile?: Maybe<Scalars['ID']>;
};

export type UpdateScheduledWorkoutInput = {
  id: Scalars['ID'];
  scheduledAt?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  Workout?: Maybe<Scalars['ID']>;
  LoggedWorkout?: Maybe<Scalars['ID']>;
  GymProfile?: Maybe<Scalars['ID']>;
};

export type TextSearchWorkoutResult = {
  __typename?: 'TextSearchWorkoutResult';
  id: Scalars['ID'];
  scope: ContentAccessScope;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
  difficultyLevel: Scalars['Int'];
  timecap?: Maybe<Scalars['Int']>;
  User?: Maybe<User>;
};

export type TextSearchWorkoutProgramResult = {
  __typename?: 'TextSearchWorkoutProgramResult';
  id: Scalars['ID'];
  scope: ContentAccessScope;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUri?: Maybe<Scalars['String']>;
  User?: Maybe<User>;
  WorkoutGoals: Array<WorkoutGoal>;
  WorkoutProgramWorkouts?: Maybe<Array<WorkoutProgramWorkout>>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  User?: Maybe<User>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  difficultyLevel: DifficultyLevel;
  contentAccessScope: ContentAccessScope;
  WorkoutSections: Array<WorkoutSection>;
  WorkoutGoals: Array<WorkoutGoal>;
  WorkoutTags: Array<WorkoutTag>;
};

export type CreateWorkoutInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  difficultyLevel: DifficultyLevel;
  contentAccessScope: ContentAccessScope;
  WorkoutSections: Array<CreateWorkoutSectionInput>;
  WorkoutGoals: Array<Scalars['ID']>;
  WorkoutTags: Array<Scalars['ID']>;
};

export type UpdateWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  contentAccessScope?: Maybe<ContentAccessScope>;
  WorkoutGoals?: Maybe<Array<Scalars['ID']>>;
  WorkoutTags: Array<Scalars['ID']>;
};

export type WorkoutTag = {
  __typename?: 'WorkoutTag';
  id: Scalars['ID'];
  User: User;
  tag: Scalars['String'];
};

export type CreateWorkoutTagInput = {
  tag: Scalars['String'];
};

export type UpdateWorkoutTagInput = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};

export type WorkoutSection = {
  __typename?: 'WorkoutSection';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
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
  Workout: Workout;
  WorkoutSectionType: WorkoutSectionType;
  WorkoutSets: Array<WorkoutSet>;
};

export type CreateWorkoutSectionInput = {
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
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
  WorkoutSectionType: Scalars['ID'];
  Workout: Scalars['ID'];
};

export type UpdateWorkoutSectionInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
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
};

export type WorkoutSet = {
  __typename?: 'WorkoutSet';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
  rounds: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  WorkoutMoves: Array<WorkoutMove>;
  Generators?: Maybe<Array<WorkoutSetGenerator>>;
  IntervalBuyIn?: Maybe<WorkoutSetIntervalBuyIn>;
};

export type CreateWorkoutSetInput = {
  sortPosition: Scalars['Int'];
  rounds?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  WorkoutSection: Scalars['ID'];
};

export type UpdateWorkoutSetInput = {
  id: Scalars['ID'];
  rounds?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
};

export type WorkoutSetIntervalBuyIn = {
  __typename?: 'WorkoutSetIntervalBuyIn';
  id: Scalars['ID'];
  interval: Scalars['Int'];
  WorkoutMove: WorkoutMove;
};

export type CreateWorkoutSetIntervalBuyInInput = {
  interval: Scalars['Int'];
  WorkoutMove: CreateWorkoutMoveInput;
  WorkoutSet: Scalars['ID'];
};

export type UpdateWorkoutSetIntervalBuyInInput = {
  id: Scalars['ID'];
  interval?: Maybe<Scalars['Int']>;
  WorkoutMove?: Maybe<UpdateWorkoutMoveInput>;
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

export type CreateWorkoutSetGeneratorInput = {
  type: WorkoutSetGeneratorType;
  workoutMoveIndex: Scalars['Int'];
  target: WorkoutSetGeneratorTarget;
  roundFrequency: Scalars['Int'];
  adjustAmount: Scalars['Float'];
  WorkoutSet: Scalars['ID'];
};

export type UpdateWorkoutSetGeneratorInput = {
  id: Scalars['ID'];
  type?: Maybe<WorkoutSetGeneratorType>;
  workoutMoveIndex?: Maybe<Scalars['Int']>;
  target?: Maybe<WorkoutSetGeneratorTarget>;
  roundFrequency?: Maybe<Scalars['Int']>;
  adjustAmount?: Maybe<Scalars['Float']>;
};

export type WorkoutMove = {
  __typename?: 'WorkoutMove';
  id: Scalars['ID'];
  sortPosition: Scalars['Int'];
  reps: Scalars['Float'];
  repType: WorkoutMoveRepType;
  distanceUnit: DistanceUnit;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit: LoadUnit;
  Move: Move;
  Equipment?: Maybe<Equipment>;
};

export type CreateWorkoutMoveInput = {
  sortPosition: Scalars['Int'];
  reps: Scalars['Float'];
  repType: WorkoutMoveRepType;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  Move: Scalars['ID'];
  Equipment?: Maybe<Scalars['ID']>;
  WorkoutSet: Scalars['ID'];
};

export type UpdateWorkoutMoveInput = {
  id: Scalars['ID'];
  reps?: Maybe<Scalars['Float']>;
  repType?: Maybe<WorkoutMoveRepType>;
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  Move?: Maybe<Scalars['ID']>;
  Equipment?: Maybe<Scalars['ID']>;
};

export type WorkoutProgram = {
  __typename?: 'WorkoutProgram';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  contentAccessScope: ContentAccessScope;
  User?: Maybe<User>;
  Enrolments?: Maybe<Array<WorkoutProgramEnrolment>>;
  WorkoutGoals: Array<WorkoutGoal>;
  WorkoutProgramWorkouts: Array<WorkoutProgramWorkout>;
  WorkoutProgramReviews?: Maybe<Array<WorkoutProgramReview>>;
};

export type WorkoutProgramWorkout = {
  __typename?: 'WorkoutProgramWorkout';
  id: Scalars['ID'];
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  Workout: Workout;
};

export type WorkoutProgramEnrolment = {
  __typename?: 'WorkoutProgramEnrolment';
  id: Scalars['ID'];
  startDate: Scalars['DateTime'];
  User: User;
  WorkoutProgram: WorkoutProgram;
  LoggedWorkouts?: Maybe<Array<LoggedWorkout>>;
};

export type WorkoutProgramReview = {
  __typename?: 'WorkoutProgramReview';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  score: Scalars['Float'];
  comment?: Maybe<Scalars['String']>;
  User: User;
};

export type CreateWorkoutProgramInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  contentAccessScope: ContentAccessScope;
  WorkoutGoals?: Maybe<Array<Scalars['ID']>>;
  WorkoutProgramWorkouts?: Maybe<Array<CreateWorkoutProgramWorkoutInput>>;
};

export type UpdateWorkoutProgramInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  coverImageUri?: Maybe<Scalars['String']>;
  introVideoUri?: Maybe<Scalars['String']>;
  introVideoThumbUri?: Maybe<Scalars['String']>;
  introAudioUri?: Maybe<Scalars['String']>;
  contentAccessScope?: Maybe<ContentAccessScope>;
  WorkoutGoals?: Maybe<Array<Scalars['ID']>>;
};

export type CreateWorkoutProgramWorkoutInput = {
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  Workout: Scalars['ID'];
  WorkoutProgram: Scalars['ID'];
};

export type UpdateWorkoutProgramWorkoutInput = {
  id: Scalars['ID'];
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  Workout: Scalars['ID'];
};

export type CreateWorkoutProgramReviewInput = {
  score: Scalars['Float'];
  comment?: Maybe<Scalars['String']>;
  WorkoutProgram: Scalars['ID'];
};

export type UpdateWorkoutProgramReviewInput = {
  id: Scalars['ID'];
  score?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  UpdateSortPositionInput: UpdateSortPositionInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  WorkoutGoal: ResolverTypeWrapper<WorkoutGoal>;
  WorkoutSectionType: ResolverTypeWrapper<WorkoutSectionType>;
  BodyArea: ResolverTypeWrapper<BodyArea>;
  BodyAreaMoveScore: ResolverTypeWrapper<BodyAreaMoveScore>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BodyAreaFrontBack: BodyAreaFrontBack;
  BodyAreaUpperLower: BodyAreaUpperLower;
  ContentAccessScope: ContentAccessScope;
  DifficultyLevel: DifficultyLevel;
  DistanceUnit: DistanceUnit;
  Gender: Gender;
  LoadUnit: LoadUnit;
  MoveScope: MoveScope;
  WorkoutMoveRepType: WorkoutMoveRepType;
  WorkoutSetGeneratorTarget: WorkoutSetGeneratorTarget;
  WorkoutSetGeneratorType: WorkoutSetGeneratorType;
  UserProfileScope: UserProfileScope;
  Equipment: ResolverTypeWrapper<Equipment>;
  CreateEquipmentInput: CreateEquipmentInput;
  UpdateEquipmentInput: UpdateEquipmentInput;
  Move: ResolverTypeWrapper<Move>;
  MoveType: ResolverTypeWrapper<MoveType>;
  CreateMoveInput: CreateMoveInput;
  UpdateMoveInput: UpdateMoveInput;
  BodyAreaMoveScoreInput: BodyAreaMoveScoreInput;
  User: ResolverTypeWrapper<User>;
  UpdateUserInput: UpdateUserInput;
  UserPublicProfile: ResolverTypeWrapper<UserPublicProfile>;
  UserPrivateProfile: ResolverTypeWrapper<UserPrivateProfile>;
  GymProfile: ResolverTypeWrapper<GymProfile>;
  CreateGymProfileInput: CreateGymProfileInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  LoggedWorkout: ResolverTypeWrapper<LoggedWorkout>;
  LoggedWorkoutSection: ResolverTypeWrapper<LoggedWorkoutSection>;
  LoggedWorkoutSet: ResolverTypeWrapper<LoggedWorkoutSet>;
  LoggedWorkoutMove: ResolverTypeWrapper<LoggedWorkoutMove>;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateLoggedWorkoutSetInLoggedSectionInput: CreateLoggedWorkoutSetInLoggedSectionInput;
  CreateLoggedWorkoutMoveInLoggedSetInput: CreateLoggedWorkoutMoveInLoggedSetInput;
  CreateLoggedWorkoutSectionInput: CreateLoggedWorkoutSectionInput;
  CreateLoggedWorkoutSetInput: CreateLoggedWorkoutSetInput;
  CreateLoggedWorkoutMoveInput: CreateLoggedWorkoutMoveInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateLoggedWorkoutSetInput: UpdateLoggedWorkoutSetInput;
  UpdateLoggedWorkoutMoveInput: UpdateLoggedWorkoutMoveInput;
  ProgressJournal: ResolverTypeWrapper<ProgressJournal>;
  CreateProgressJournalInput: CreateProgressJournalInput;
  UpdateProgressJournalInput: UpdateProgressJournalInput;
  ProgressJournalEntry: ResolverTypeWrapper<ProgressJournalEntry>;
  CreateProgressJournalEntryInput: CreateProgressJournalEntryInput;
  UpdateProgressJournalEntryInput: UpdateProgressJournalEntryInput;
  ProgressJournalGoal: ResolverTypeWrapper<ProgressJournalGoal>;
  CreateProgressJournalGoalInput: CreateProgressJournalGoalInput;
  UpdateProgressJournalGoalInput: UpdateProgressJournalGoalInput;
  ProgressJournalGoalTag: ResolverTypeWrapper<ProgressJournalGoalTag>;
  CreateProgressJournalGoalTagInput: CreateProgressJournalGoalTagInput;
  UpdateProgressJournalGoalTagInput: UpdateProgressJournalGoalTagInput;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  TextSearchWorkoutResult: ResolverTypeWrapper<TextSearchWorkoutResult>;
  TextSearchWorkoutProgramResult: ResolverTypeWrapper<TextSearchWorkoutProgramResult>;
  Workout: ResolverTypeWrapper<Workout>;
  CreateWorkoutInput: CreateWorkoutInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  WorkoutTag: ResolverTypeWrapper<WorkoutTag>;
  CreateWorkoutTagInput: CreateWorkoutTagInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  WorkoutSet: ResolverTypeWrapper<WorkoutSet>;
  CreateWorkoutSetInput: CreateWorkoutSetInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  WorkoutSetIntervalBuyIn: ResolverTypeWrapper<WorkoutSetIntervalBuyIn>;
  CreateWorkoutSetIntervalBuyInInput: CreateWorkoutSetIntervalBuyInInput;
  UpdateWorkoutSetIntervalBuyInInput: UpdateWorkoutSetIntervalBuyInInput;
  WorkoutSetGenerator: ResolverTypeWrapper<WorkoutSetGenerator>;
  CreateWorkoutSetGeneratorInput: CreateWorkoutSetGeneratorInput;
  UpdateWorkoutSetGeneratorInput: UpdateWorkoutSetGeneratorInput;
  WorkoutMove: ResolverTypeWrapper<WorkoutMove>;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  WorkoutProgram: ResolverTypeWrapper<WorkoutProgram>;
  WorkoutProgramWorkout: ResolverTypeWrapper<WorkoutProgramWorkout>;
  WorkoutProgramEnrolment: ResolverTypeWrapper<WorkoutProgramEnrolment>;
  WorkoutProgramReview: ResolverTypeWrapper<WorkoutProgramReview>;
  CreateWorkoutProgramInput: CreateWorkoutProgramInput;
  UpdateWorkoutProgramInput: UpdateWorkoutProgramInput;
  CreateWorkoutProgramWorkoutInput: CreateWorkoutProgramWorkoutInput;
  UpdateWorkoutProgramWorkoutInput: UpdateWorkoutProgramWorkoutInput;
  CreateWorkoutProgramReviewInput: CreateWorkoutProgramReviewInput;
  UpdateWorkoutProgramReviewInput: UpdateWorkoutProgramReviewInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars['DateTime'];
  Query: {};
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  String: Scalars['String'];
  Mutation: {};
  UpdateSortPositionInput: UpdateSortPositionInput;
  Int: Scalars['Int'];
  WorkoutGoal: WorkoutGoal;
  WorkoutSectionType: WorkoutSectionType;
  BodyArea: BodyArea;
  BodyAreaMoveScore: BodyAreaMoveScore;
  Float: Scalars['Float'];
  Equipment: Equipment;
  CreateEquipmentInput: CreateEquipmentInput;
  UpdateEquipmentInput: UpdateEquipmentInput;
  Move: Move;
  MoveType: MoveType;
  CreateMoveInput: CreateMoveInput;
  UpdateMoveInput: UpdateMoveInput;
  BodyAreaMoveScoreInput: BodyAreaMoveScoreInput;
  User: User;
  UpdateUserInput: UpdateUserInput;
  UserPublicProfile: UserPublicProfile;
  UserPrivateProfile: UserPrivateProfile;
  GymProfile: GymProfile;
  CreateGymProfileInput: CreateGymProfileInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  LoggedWorkout: LoggedWorkout;
  LoggedWorkoutSection: LoggedWorkoutSection;
  LoggedWorkoutSet: LoggedWorkoutSet;
  LoggedWorkoutMove: LoggedWorkoutMove;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  CreateLoggedWorkoutSectionInLoggedWorkoutInput: CreateLoggedWorkoutSectionInLoggedWorkoutInput;
  CreateLoggedWorkoutSetInLoggedSectionInput: CreateLoggedWorkoutSetInLoggedSectionInput;
  CreateLoggedWorkoutMoveInLoggedSetInput: CreateLoggedWorkoutMoveInLoggedSetInput;
  CreateLoggedWorkoutSectionInput: CreateLoggedWorkoutSectionInput;
  CreateLoggedWorkoutSetInput: CreateLoggedWorkoutSetInput;
  CreateLoggedWorkoutMoveInput: CreateLoggedWorkoutMoveInput;
  UpdateLoggedWorkoutInput: UpdateLoggedWorkoutInput;
  UpdateLoggedWorkoutSectionInput: UpdateLoggedWorkoutSectionInput;
  UpdateLoggedWorkoutSetInput: UpdateLoggedWorkoutSetInput;
  UpdateLoggedWorkoutMoveInput: UpdateLoggedWorkoutMoveInput;
  ProgressJournal: ProgressJournal;
  CreateProgressJournalInput: CreateProgressJournalInput;
  UpdateProgressJournalInput: UpdateProgressJournalInput;
  ProgressJournalEntry: ProgressJournalEntry;
  CreateProgressJournalEntryInput: CreateProgressJournalEntryInput;
  UpdateProgressJournalEntryInput: UpdateProgressJournalEntryInput;
  ProgressJournalGoal: ProgressJournalGoal;
  CreateProgressJournalGoalInput: CreateProgressJournalGoalInput;
  UpdateProgressJournalGoalInput: UpdateProgressJournalGoalInput;
  ProgressJournalGoalTag: ProgressJournalGoalTag;
  CreateProgressJournalGoalTagInput: CreateProgressJournalGoalTagInput;
  UpdateProgressJournalGoalTagInput: UpdateProgressJournalGoalTagInput;
  ScheduledWorkout: ScheduledWorkout;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  TextSearchWorkoutResult: TextSearchWorkoutResult;
  TextSearchWorkoutProgramResult: TextSearchWorkoutProgramResult;
  Workout: Workout;
  CreateWorkoutInput: CreateWorkoutInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  WorkoutTag: WorkoutTag;
  CreateWorkoutTagInput: CreateWorkoutTagInput;
  UpdateWorkoutTagInput: UpdateWorkoutTagInput;
  WorkoutSection: WorkoutSection;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  UpdateWorkoutSectionInput: UpdateWorkoutSectionInput;
  WorkoutSet: WorkoutSet;
  CreateWorkoutSetInput: CreateWorkoutSetInput;
  UpdateWorkoutSetInput: UpdateWorkoutSetInput;
  WorkoutSetIntervalBuyIn: WorkoutSetIntervalBuyIn;
  CreateWorkoutSetIntervalBuyInInput: CreateWorkoutSetIntervalBuyInInput;
  UpdateWorkoutSetIntervalBuyInInput: UpdateWorkoutSetIntervalBuyInInput;
  WorkoutSetGenerator: WorkoutSetGenerator;
  CreateWorkoutSetGeneratorInput: CreateWorkoutSetGeneratorInput;
  UpdateWorkoutSetGeneratorInput: UpdateWorkoutSetGeneratorInput;
  WorkoutMove: WorkoutMove;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  UpdateWorkoutMoveInput: UpdateWorkoutMoveInput;
  WorkoutProgram: WorkoutProgram;
  WorkoutProgramWorkout: WorkoutProgramWorkout;
  WorkoutProgramEnrolment: WorkoutProgramEnrolment;
  WorkoutProgramReview: WorkoutProgramReview;
  CreateWorkoutProgramInput: CreateWorkoutProgramInput;
  UpdateWorkoutProgramInput: UpdateWorkoutProgramInput;
  CreateWorkoutProgramWorkoutInput: CreateWorkoutProgramWorkoutInput;
  UpdateWorkoutProgramWorkoutInput: UpdateWorkoutProgramWorkoutInput;
  CreateWorkoutProgramReviewInput: CreateWorkoutProgramReviewInput;
  UpdateWorkoutProgramReviewInput: UpdateWorkoutProgramReviewInput;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  validateToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bodyAreas?: Resolver<Array<ResolversTypes['BodyArea']>, ParentType, ContextType>;
  equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  moveTypes?: Resolver<Array<ResolversTypes['MoveType']>, ParentType, ContextType>;
  workoutGoals?: Resolver<Array<Maybe<ResolversTypes['WorkoutGoal']>>, ParentType, ContextType>;
  workoutSectionTypes?: Resolver<Array<ResolversTypes['WorkoutSectionType']>, ParentType, ContextType>;
  userLoggedWorkouts?: Resolver<Array<ResolversTypes['LoggedWorkout']>, ParentType, ContextType>;
  standardMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userCustomMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userProgressJournals?: Resolver<Array<ResolversTypes['ProgressJournal']>, ParentType, ContextType>;
  progressJournalById?: Resolver<ResolversTypes['ProgressJournal'], ParentType, ContextType, RequireFields<QueryProgressJournalByIdArgs, 'progressJournalId'>>;
  progressJournalGoalTags?: Resolver<Array<ResolversTypes['ProgressJournalGoalTag']>, ParentType, ContextType>;
  userScheduledWorkouts?: Resolver<Array<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  textSearchWorkouts?: Resolver<Maybe<Array<ResolversTypes['TextSearchWorkoutResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutsArgs, 'text'>>;
  textSearchWorkoutPrograms?: Resolver<Maybe<Array<ResolversTypes['TextSearchWorkoutProgramResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutProgramsArgs, 'text'>>;
  textSearchCreatorPublicProfiles?: Resolver<Maybe<Array<ResolversTypes['UserPublicProfile']>>, ParentType, ContextType, RequireFields<QueryTextSearchCreatorPublicProfilesArgs, 'text'>>;
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  authedUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  gymProfiles?: Resolver<Array<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  userPublicProfiles?: Resolver<Maybe<Array<ResolversTypes['UserPublicProfile']>>, ParentType, ContextType>;
  userPublicProfileByUserId?: Resolver<ResolversTypes['UserPublicProfile'], ParentType, ContextType, RequireFields<QueryUserPublicProfileByUserIdArgs, 'userId'>>;
  officialWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  publicWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  userWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  workoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<QueryWorkoutByIdArgs, 'id'>>;
  officialWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType>;
  publicWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType>;
  workoutProgramById?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<QueryWorkoutProgramByIdArgs, 'id'>>;
  userWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType>;
  userWorkoutProgramEnrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType, RequireFields<QueryUserWorkoutProgramEnrolmentsArgs, 'workoutProgramId'>>;
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
  makeCopyWorkoutById?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationMakeCopyWorkoutByIdArgs, 'id'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'data'>>;
  updateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutArgs, 'data'>>;
  softDeleteWorkoutById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationSoftDeleteWorkoutByIdArgs, 'id'>>;
  createWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSectionArgs, 'data'>>;
  updateWorkoutSection?: Resolver<ResolversTypes['WorkoutSection'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSectionArgs, 'data'>>;
  softDeleteWorkoutSectionById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationSoftDeleteWorkoutSectionByIdArgs, 'id'>>;
  reorderWorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutSectionsArgs, 'data'>>;
  createWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetArgs, 'data'>>;
  updateWorkoutSet?: Resolver<ResolversTypes['WorkoutSet'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetArgs, 'data'>>;
  deleteWorkoutSetById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetByIdArgs, 'id'>>;
  reorderWorkoutSets?: Resolver<Array<ResolversTypes['WorkoutSet']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutSetsArgs, 'data'>>;
  createWorkoutSetIntervalBuyIn?: Resolver<ResolversTypes['WorkoutSetIntervalBuyIn'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetIntervalBuyInArgs, 'data'>>;
  updateWorkoutSetIntervalBuyIn?: Resolver<ResolversTypes['WorkoutSetIntervalBuyIn'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetIntervalBuyInArgs, 'data'>>;
  deleteWorkoutSetIntervalBuyInById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetIntervalBuyInByIdArgs, 'id'>>;
  createWorkoutSetGenerator?: Resolver<ResolversTypes['WorkoutSetGenerator'], ParentType, ContextType, RequireFields<MutationCreateWorkoutSetGeneratorArgs, 'data'>>;
  updateWorkoutSetGenerator?: Resolver<ResolversTypes['WorkoutSetGenerator'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutSetGeneratorArgs, 'data'>>;
  deleteWorkoutSetGeneratorById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutSetGeneratorByIdArgs, 'id'>>;
  createWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationCreateWorkoutMoveArgs, 'data'>>;
  updateWorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutMoveArgs, 'data'>>;
  deleteWorkoutMoveById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutMoveByIdArgs, 'id'>>;
  reorderWorkoutMoves?: Resolver<Array<ResolversTypes['WorkoutMove']>, ParentType, ContextType, RequireFields<MutationReorderWorkoutMovesArgs, 'data'>>;
  createWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationCreateWorkoutProgramArgs, 'data'>>;
  updateWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutProgramArgs, 'data'>>;
  softDeleteWorkoutProgramById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationSoftDeleteWorkoutProgramByIdArgs, 'id'>>;
  createWorkoutProgramWorkout?: Resolver<ResolversTypes['WorkoutProgramWorkout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutProgramWorkoutArgs, 'data'>>;
  updateWorkoutProgramWorkout?: Resolver<ResolversTypes['WorkoutProgramWorkout'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutProgramWorkoutArgs, 'data'>>;
  deleteWorkoutProgramWorkoutById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutProgramWorkoutByIdArgs, 'id'>>;
  createWorkoutProgramEnrolment?: Resolver<ResolversTypes['WorkoutProgramEnrolment'], ParentType, ContextType, RequireFields<MutationCreateWorkoutProgramEnrolmentArgs, 'workoutProgramId'>>;
  deleteWorkoutProgramEnrolmentById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutProgramEnrolmentByIdArgs, 'id'>>;
  createWorkoutProgramReview?: Resolver<ResolversTypes['WorkoutProgramReview'], ParentType, ContextType, RequireFields<MutationCreateWorkoutProgramReviewArgs, 'data'>>;
  updateWorkoutProgramReview?: Resolver<ResolversTypes['WorkoutProgramReview'], ParentType, ContextType, RequireFields<MutationUpdateWorkoutProgramReviewArgs, 'data'>>;
  deleteWorkoutProgramReviewById?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutProgramReviewByIdArgs, 'id'>>;
}>;

export type WorkoutGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutGoal'] = ResolversParentTypes['WorkoutGoal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type BodyAreaResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyArea'] = ResolversParentTypes['BodyArea']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  BodyAreaMoveScores?: Resolver<Array<ResolversTypes['BodyAreaMoveScore']>, ParentType, ContextType>;
  frontBack?: Resolver<ResolversTypes['BodyAreaFrontBack'], ParentType, ContextType>;
  upperLower?: Resolver<ResolversTypes['BodyAreaUpperLower'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BodyAreaMoveScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyAreaMoveScore'] = ResolversParentTypes['BodyAreaMoveScore']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  BodyArea?: Resolver<ResolversTypes['BodyArea'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loadAdjustable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  BodyAreaMoveScores?: Resolver<Maybe<Array<ResolversTypes['BodyAreaMoveScore']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveType'] = ResolversParentTypes['MoveType']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type UserPublicProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPublicProfile'] = ResolversParentTypes['UserPublicProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatarUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagramUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tiktokUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snapUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  CustomMoves?: Resolver<Maybe<Array<ResolversTypes['Move']>>, ParentType, ContextType>;
  Workouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType>;
  WorkoutPrograms?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgram']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPrivateProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPrivateProfile'] = ResolversParentTypes['UserPrivateProfile']> = ResolversObject<{
  LoggedWorkouts?: Resolver<Maybe<Array<ResolversTypes['LoggedWorkout']>>, ParentType, ContextType>;
  Workouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType>;
  WorkoutPrograms?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgram']>>, ParentType, ContextType>;
  WorkoutProgramEnrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GymProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['GymProfile'] = ResolversParentTypes['GymProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkout'] = ResolversParentTypes['LoggedWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  LoggedWorkoutSections?: Resolver<Array<ResolversTypes['LoggedWorkoutSection']>, ParentType, ContextType>;
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  ScheduledWorkout?: Resolver<Maybe<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  GymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  WorkoutProgramWorkout?: Resolver<Maybe<ResolversTypes['WorkoutProgramWorkout']>, ParentType, ContextType>;
  WorkoutProgramEnrolment?: Resolver<Maybe<ResolversTypes['WorkoutProgramWorkout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSection'] = ResolversParentTypes['LoggedWorkoutSection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  setIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  LoggedWorkoutSets?: Resolver<Array<ResolversTypes['LoggedWorkoutSet']>, ParentType, ContextType>;
  LoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutSet'] = ResolversParentTypes['LoggedWorkoutSet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  setIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  LoggedWorkoutMoves?: Resolver<Array<ResolversTypes['LoggedWorkoutMove']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoggedWorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkoutMove'] = ResolversParentTypes['LoggedWorkoutMove']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeTakenMs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['WorkoutMoveRepType'], ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  distanceUnit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  loadAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  Equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournal'] = ResolversParentTypes['ProgressJournal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ProgressJournalEntries?: Resolver<Maybe<Array<ResolversTypes['ProgressJournalEntry']>>, ParentType, ContextType>;
  ProgressJournalGoals?: Resolver<Maybe<Array<ResolversTypes['ProgressJournalGoal']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalEntry'] = ResolversParentTypes['ProgressJournalEntry']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voiceNoteUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyweight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  moodScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  energyScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stressScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  motivationScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  progressPhotoUris?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
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
  ProgressJournalGoalTags?: Resolver<Maybe<Array<ResolversTypes['ProgressJournalGoalTag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProgressJournalGoalTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProgressJournalGoalTag'] = ResolversParentTypes['ProgressJournalGoalTag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hexColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ScheduledWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduledWorkout'] = ResolversParentTypes['ScheduledWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  scheduledAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  LoggedWorkout?: Resolver<Maybe<ResolversTypes['LoggedWorkout']>, ParentType, ContextType>;
  GymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TextSearchWorkoutResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextSearchWorkoutResult'] = ResolversParentTypes['TextSearchWorkoutResult']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TextSearchWorkoutProgramResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextSearchWorkoutProgramResult'] = ResolversParentTypes['TextSearchWorkoutProgramResult']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  WorkoutProgramWorkouts?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramWorkout']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  WorkoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  WorkoutTags?: Resolver<Array<ResolversTypes['WorkoutTag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutTag'] = ResolversParentTypes['WorkoutTag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSection'] = ResolversParentTypes['WorkoutSection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  WorkoutSectionType?: Resolver<ResolversTypes['WorkoutSectionType'], ParentType, ContextType>;
  WorkoutSets?: Resolver<Array<ResolversTypes['WorkoutSet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSet'] = ResolversParentTypes['WorkoutSet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  WorkoutMoves?: Resolver<Array<ResolversTypes['WorkoutMove']>, ParentType, ContextType>;
  Generators?: Resolver<Maybe<Array<ResolversTypes['WorkoutSetGenerator']>>, ParentType, ContextType>;
  IntervalBuyIn?: Resolver<Maybe<ResolversTypes['WorkoutSetIntervalBuyIn']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutSetIntervalBuyInResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSetIntervalBuyIn'] = ResolversParentTypes['WorkoutSetIntervalBuyIn']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  WorkoutMove?: Resolver<ResolversTypes['WorkoutMove'], ParentType, ContextType>;
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

export type WorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMove'] = ResolversParentTypes['WorkoutMove']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['WorkoutMoveRepType'], ParentType, ContextType>;
  distanceUnit?: Resolver<ResolversTypes['DistanceUnit'], ParentType, ContextType>;
  loadAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  loadUnit?: Resolver<ResolversTypes['LoadUnit'], ParentType, ContextType>;
  Move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  Equipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutProgramResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgram'] = ResolversParentTypes['WorkoutProgram']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoThumbUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introAudioUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentAccessScope?: Resolver<ResolversTypes['ContentAccessScope'], ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  Enrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType>;
  WorkoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  WorkoutProgramWorkouts?: Resolver<Array<ResolversTypes['WorkoutProgramWorkout']>, ParentType, ContextType>;
  WorkoutProgramReviews?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramReview']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutProgramWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramWorkout'] = ResolversParentTypes['WorkoutProgramWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dayNumber?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutProgramEnrolmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramEnrolment'] = ResolversParentTypes['WorkoutProgramEnrolment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  WorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType>;
  LoggedWorkouts?: Resolver<Maybe<Array<ResolversTypes['LoggedWorkout']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkoutProgramReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramReview'] = ResolversParentTypes['WorkoutProgramReview']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  WorkoutGoal?: WorkoutGoalResolvers<ContextType>;
  WorkoutSectionType?: WorkoutSectionTypeResolvers<ContextType>;
  BodyArea?: BodyAreaResolvers<ContextType>;
  BodyAreaMoveScore?: BodyAreaMoveScoreResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  MoveType?: MoveTypeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPublicProfile?: UserPublicProfileResolvers<ContextType>;
  UserPrivateProfile?: UserPrivateProfileResolvers<ContextType>;
  GymProfile?: GymProfileResolvers<ContextType>;
  LoggedWorkout?: LoggedWorkoutResolvers<ContextType>;
  LoggedWorkoutSection?: LoggedWorkoutSectionResolvers<ContextType>;
  LoggedWorkoutSet?: LoggedWorkoutSetResolvers<ContextType>;
  LoggedWorkoutMove?: LoggedWorkoutMoveResolvers<ContextType>;
  ProgressJournal?: ProgressJournalResolvers<ContextType>;
  ProgressJournalEntry?: ProgressJournalEntryResolvers<ContextType>;
  ProgressJournalGoal?: ProgressJournalGoalResolvers<ContextType>;
  ProgressJournalGoalTag?: ProgressJournalGoalTagResolvers<ContextType>;
  ScheduledWorkout?: ScheduledWorkoutResolvers<ContextType>;
  TextSearchWorkoutResult?: TextSearchWorkoutResultResolvers<ContextType>;
  TextSearchWorkoutProgramResult?: TextSearchWorkoutProgramResultResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutTag?: WorkoutTagResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  WorkoutSet?: WorkoutSetResolvers<ContextType>;
  WorkoutSetIntervalBuyIn?: WorkoutSetIntervalBuyInResolvers<ContextType>;
  WorkoutSetGenerator?: WorkoutSetGeneratorResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
  WorkoutProgram?: WorkoutProgramResolvers<ContextType>;
  WorkoutProgramWorkout?: WorkoutProgramWorkoutResolvers<ContextType>;
  WorkoutProgramEnrolment?: WorkoutProgramEnrolmentResolvers<ContextType>;
  WorkoutProgramReview?: WorkoutProgramReviewResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

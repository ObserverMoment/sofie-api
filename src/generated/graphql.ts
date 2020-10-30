import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};


export type Query = {
  __typename?: 'Query';
  checkUniqueDisplayName: Scalars['Boolean'];
  officialMoves: Array<Move>;
  officialEquipments: Array<Equipment>;
  officialWorkoutTypes: Array<WorkoutType>;
  officialWorkoutGoals: Array<Maybe<WorkoutGoal>>;
  officialWorkouts: Array<Workout>;
  privateWorkouts: Array<Workout>;
  publicWorkouts: Array<Workout>;
  officialWorkoutPrograms: Array<WorkoutProgram>;
  privateWorkoutPrograms: Array<WorkoutProgram>;
  publicWorkoutPrograms: Array<WorkoutProgram>;
  userByUid?: Maybe<User>;
  users: Array<User>;
  workoutById?: Maybe<Workout>;
  workoutProgramById?: Maybe<WorkoutProgram>;
  likedWorkouts: Array<Scalars['ID']>;
  scheduledWorkouts: Array<ScheduledWorkout>;
  loggedWorkouts: Array<LoggedWorkout>;
};


export type QueryCheckUniqueDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type QueryPrivateWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryPublicWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryPrivateWorkoutProgramsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryPublicWorkoutProgramsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryUserByUidArgs = {
  uid: Scalars['ID'];
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutProgramByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLikedWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryScheduledWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryLoggedWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  createGymProfile: User;
  updateGymProfile: User;
  deleteGymProfile: User;
  createMoveProfile: MoveProfile;
  updateMoveProfile: MoveProfile;
  createWorkout: Workout;
  deepUpdateWorkout: Workout;
  shallowUpdateWorkout: Workout;
  deleteWorkout: Scalars['ID'];
  likeWorkout?: Maybe<Scalars['ID']>;
  unlikeWorkout?: Maybe<Scalars['ID']>;
  scheduleWorkout: ScheduledWorkout;
  unscheduleWorkout: Scalars['ID'];
  updateScheduledWorkout: ScheduledWorkout;
  createLoggedWorkout: LoggedWorkout;
  deepUpdateLoggedWorkout: LoggedWorkout;
  shallowUpdateLoggedWorkout: LoggedWorkout;
  deleteLoggedWorkout: Scalars['ID'];
  createWorkoutProgram: WorkoutProgram;
  shallowUpdateWorkoutProgram: WorkoutProgram;
  deepUpdateWorkoutProgram: WorkoutProgram;
  deleteWorkoutProgram: Scalars['ID'];
  addEnrolmentToWorkoutProgram: WorkoutProgram;
  removeEnrolmentFromWorkoutProgram: WorkoutProgram;
  addReviewToWorkoutProgram: WorkoutProgram;
  removeReviewFromWorkoutProgram: WorkoutProgram;
};


export type MutationCreateUserArgs = {
  uid: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateUserInput;
};


export type MutationCreateGymProfileArgs = {
  authedUserId: Scalars['ID'];
  data: CreateGymProfileInput;
};


export type MutationUpdateGymProfileArgs = {
  authedUserId: Scalars['ID'];
  data: UpdateGymProfileInput;
};


export type MutationDeleteGymProfileArgs = {
  authedUserId: Scalars['ID'];
  gymProfileId: Scalars['ID'];
};


export type MutationCreateMoveProfileArgs = {
  authedUserId: Scalars['ID'];
  data: CreateMoveProfileInput;
};


export type MutationUpdateMoveProfileArgs = {
  authedUserId: Scalars['ID'];
  data: UpdateMoveProfileInput;
};


export type MutationCreateWorkoutArgs = {
  authedUserId: Scalars['ID'];
  workoutData: CreateWorkoutInput;
};


export type MutationDeepUpdateWorkoutArgs = {
  authedUserId: Scalars['ID'];
  workoutData: DeepUpdateWorkoutInput;
};


export type MutationShallowUpdateWorkoutArgs = {
  authedUserId: Scalars['ID'];
  workoutData: ShallowUpdateWorkoutInput;
};


export type MutationDeleteWorkoutArgs = {
  authedUserId: Scalars['ID'];
  workoutId: Scalars['ID'];
};


export type MutationLikeWorkoutArgs = {
  authedUserId: Scalars['ID'];
  workoutId: Scalars['ID'];
};


export type MutationUnlikeWorkoutArgs = {
  authedUserId: Scalars['ID'];
  workoutId: Scalars['ID'];
};


export type MutationScheduleWorkoutArgs = {
  authedUserId: Scalars['ID'];
  data: CreateScheduledWorkoutInput;
};


export type MutationUnscheduleWorkoutArgs = {
  authedUserId: Scalars['ID'];
  scheduledWorkoutId: Scalars['ID'];
};


export type MutationUpdateScheduledWorkoutArgs = {
  authedUserId: Scalars['ID'];
  data: UpdateScheduledWorkoutInput;
};


export type MutationCreateLoggedWorkoutArgs = {
  authedUserId: Scalars['ID'];
  loggedWorkoutData: CreateLoggedWorkoutInput;
};


export type MutationDeepUpdateLoggedWorkoutArgs = {
  authedUserId: Scalars['ID'];
  loggedWorkoutData: DeepUpdateLoggedWorkoutInput;
};


export type MutationShallowUpdateLoggedWorkoutArgs = {
  authedUserId: Scalars['ID'];
  loggedWorkoutData: ShallowUpdateLoggedWorkoutInput;
};


export type MutationDeleteLoggedWorkoutArgs = {
  authedUserId: Scalars['ID'];
  loggedWorkoutId: Scalars['ID'];
};


export type MutationCreateWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  data: CreateWorkoutProgramInput;
};


export type MutationShallowUpdateWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  data: ShallowUpdateWorkoutProgramInput;
};


export type MutationDeepUpdateWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  data: DeepUpdateWorkoutProgramInput;
};


export type MutationDeleteWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};


export type MutationAddEnrolmentToWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};


export type MutationRemoveEnrolmentFromWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};


export type MutationAddReviewToWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
  data: CreateWorkoutProgramReviewInput;
};


export type MutationRemoveReviewFromWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
  reviewId: Scalars['ID'];
};

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
};

export type Move = {
  __typename?: 'Move';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  scope: AccessScopeType;
  groupId?: Maybe<Scalars['String']>;
  validRepTypes: Array<WorkoutMoveRepType>;
  createdById?: Maybe<Scalars['String']>;
  requiredEquipments: Array<Equipment>;
  selectableEquipments: Array<Equipment>;
};

export type WorkoutGoal = {
  __typename?: 'WorkoutGoal';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type GymProfile = {
  __typename?: 'GymProfile';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  bodyweightOnly: Scalars['Boolean'];
  user: User;
  availableEquipments?: Maybe<Array<Equipment>>;
};

export type CreateGymProfileInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  bodyweightOnly?: Maybe<Scalars['Boolean']>;
  availableEquipmentIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateGymProfileInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  bodyweightOnly?: Maybe<Scalars['Boolean']>;
  availableEquipmentIds?: Maybe<Array<Scalars['ID']>>;
};

export type MoveProfile = {
  __typename?: 'MoveProfile';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  user: User;
  requiredMoves?: Maybe<Array<Move>>;
  excludedMoves?: Maybe<Array<Move>>;
};

export type CreateMoveProfileInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  requiredMoveIds?: Maybe<Array<Scalars['ID']>>;
  excludedMoveIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateMoveProfileInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  requiredMoveIds?: Maybe<Array<Scalars['ID']>>;
  excludedMoveIds?: Maybe<Array<Scalars['ID']>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  themePreference: ThemePreference;
  gender?: Maybe<Gender>;
  hasOnboarded: Scalars['Boolean'];
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  unitSystem?: Maybe<UnitSystem>;
  gymProfiles?: Maybe<Array<GymProfile>>;
  moveProfiles?: Maybe<Array<MoveProfile>>;
};

export type UpdateUserInput = {
  avatarUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  themePreference?: Maybe<ThemePreference>;
  gender?: Maybe<Gender>;
  gymBox?: Maybe<Scalars['String']>;
  hasOnboarded?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Float']>;
  lastname?: Maybe<Scalars['String']>;
  unitSystem?: Maybe<UnitSystem>;
  weight?: Maybe<Scalars['Float']>;
};

export type WorkoutType = {
  __typename?: 'WorkoutType';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  placeholderImageUrl?: Maybe<Scalars['String']>;
  scoreType?: Maybe<WorkoutScoreType>;
  Workout: Array<Workout>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  createdBy?: Maybe<User>;
  name: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  spotifyAudio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  workoutType: WorkoutType;
  difficultyLevel: Scalars['Int'];
  scope: AccessScopeType;
  workoutSections: Array<WorkoutSection>;
  builderData?: Maybe<Scalars['JSON']>;
};

export type CreateWorkoutInput = {
  name: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  spotifyAudio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  workoutTypeId: Scalars['String'];
  difficultyLevel: Scalars['Int'];
  scope: AccessScopeType;
  workoutSections: Array<CreateWorkoutSectionInput>;
  builderData?: Maybe<Scalars['JSON']>;
};

export type DeepUpdateWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  spotifyAudio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  workoutTypeId?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<Scalars['Int']>;
  scope?: Maybe<AccessScopeType>;
  workoutSections: Array<CreateWorkoutSectionInput>;
  builderData?: Maybe<Scalars['JSON']>;
};

export type ShallowUpdateWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  spotifyAudio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  difficultyLevel?: Maybe<Scalars['Int']>;
  scope?: Maybe<AccessScopeType>;
};

export type WorkoutProgram = {
  __typename?: 'WorkoutProgram';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  preciseSchedule: Scalars['Boolean'];
  frequencyPeriod?: Maybe<FrequencyPeriod>;
  frequencyAmount?: Maybe<Scalars['Int']>;
  scope: AccessScopeType;
  createdBy?: Maybe<User>;
  enrolments?: Maybe<Array<WorkoutProgramEnrolment>>;
  workoutGoals: Array<WorkoutGoal>;
  programWorkouts: Array<WorkoutProgramWorkout>;
  programReviews?: Maybe<Array<WorkoutProgramReview>>;
};

export type CreateWorkoutProgramInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  preciseSchedule: Scalars['Boolean'];
  frequencyPeriod?: Maybe<FrequencyPeriod>;
  frequencyAmount?: Maybe<Scalars['Int']>;
  workoutGoalIds: Array<Scalars['ID']>;
  programWorkouts: Array<CreateWorkoutProgramWorkoutInput>;
};

export type DeepUpdateWorkoutProgramInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  preciseSchedule?: Maybe<Scalars['Boolean']>;
  frequencyPeriod?: Maybe<FrequencyPeriod>;
  frequencyAmount?: Maybe<Scalars['Int']>;
  workoutGoalIds: Array<Scalars['ID']>;
  programWorkouts: Array<CreateWorkoutProgramWorkoutInput>;
};

export type ShallowUpdateWorkoutProgramInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  preciseSchedule?: Maybe<Scalars['Boolean']>;
  frequencyPeriod?: Maybe<FrequencyPeriod>;
  frequencyAmount?: Maybe<Scalars['Int']>;
  workoutGoalIds: Array<Scalars['ID']>;
};

export type WorkoutProgramWorkout = {
  __typename?: 'WorkoutProgramWorkout';
  id: Scalars['ID'];
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  workout: Workout;
};

export type CreateWorkoutProgramWorkoutInput = {
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  workoutId: Scalars['ID'];
};

export type WorkoutProgramEnrolment = {
  __typename?: 'WorkoutProgramEnrolment';
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['String']>;
  user: User;
  loggedWorkouts?: Maybe<Array<LoggedWorkout>>;
};

export type AddEnrolmentToWorkoutProgram = {
  userId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};

export type RemoveEnrolmentFromWorkoutProgram = {
  userId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};

export type WorkoutProgramReview = {
  __typename?: 'WorkoutProgramReview';
  id: Scalars['ID'];
  score: Scalars['Float'];
  comment?: Maybe<Scalars['String']>;
  user: User;
};

export type CreateWorkoutProgramReviewInput = {
  score: Scalars['Float'];
  comment?: Maybe<Scalars['String']>;
};

export type LikedWorkout = {
  __typename?: 'LikedWorkout';
  createdAt: Scalars['String'];
  user: User;
  workout: Workout;
  notes?: Maybe<Scalars['String']>;
};

export type LoggedWorkout = {
  __typename?: 'LoggedWorkout';
  id: Scalars['ID'];
  name: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  workoutType: WorkoutType;
  difficultyLevel: Scalars['Int'];
  gymProfile?: Maybe<GymProfile>;
  /** In a loggedWorkout, when you are doing rounds of a section, each round gets entered as a separate section - with its own time log. */
  workoutSections: Array<WorkoutSection>;
  originalWorkoutId?: Maybe<Scalars['String']>;
  originalWorkoutScope: AccessScopeType;
};

export type CreateLoggedWorkoutInput = {
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  workoutTypeId: Scalars['String'];
  gymProfileId?: Maybe<Scalars['String']>;
  difficultyLevel: Scalars['Int'];
  workoutSections: Array<CreateWorkoutSectionInput>;
  originalWorkoutId?: Maybe<Scalars['String']>;
  originalWorkoutScope: AccessScopeType;
};

export type DeepUpdateLoggedWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  gymProfileId?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<Scalars['Int']>;
  workoutSections: Array<CreateWorkoutSectionInput>;
};

export type ShallowUpdateLoggedWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  gymProfileId?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<Scalars['Int']>;
};

export type ScheduledWorkout = {
  __typename?: 'ScheduledWorkout';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  scheduledAt: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  workoutId?: Maybe<Scalars['ID']>;
  loggedWorkoutId?: Maybe<Scalars['ID']>;
  gymProfileId?: Maybe<Scalars['ID']>;
};

export type CreateScheduledWorkoutInput = {
  scheduledAt: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  workoutId?: Maybe<Scalars['ID']>;
  gymProfileId?: Maybe<Scalars['ID']>;
};

export type UpdateScheduledWorkoutInput = {
  id: Scalars['ID'];
  scheduledAt?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  workoutId?: Maybe<Scalars['ID']>;
  loggedWorkoutId?: Maybe<Scalars['ID']>;
  gymProfileId?: Maybe<Scalars['ID']>;
};

export type WorkoutSection = {
  __typename?: 'WorkoutSection';
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  /** duration is used when logging - it allows you to log how long the user took to complete one round of the section. */
  duration?: Maybe<Scalars['Int']>;
  rounds: Scalars['Int'];
  sortPosition: Scalars['Int'];
  workoutMoves?: Maybe<Array<WorkoutMove>>;
  workout: Workout;
  roundAdjustRules?: Maybe<Array<RoundAdjustRule>>;
};

export type CreateWorkoutSectionInput = {
  notes?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  rounds: Scalars['Int'];
  workoutMoves: Array<CreateWorkoutMoveInput>;
  roundAdjustRules?: Maybe<Array<CreateRoundAdjustRuleInput>>;
};

export type RoundAdjustRule = {
  __typename?: 'RoundAdjustRule';
  id: Scalars['ID'];
  target?: Maybe<RuleTarget>;
  action?: Maybe<RuleAction>;
  amount?: Maybe<Scalars['Float']>;
  roundFrequency?: Maybe<Scalars['Int']>;
};

export type CreateRoundAdjustRuleInput = {
  target: RuleTarget;
  action: RuleAction;
  amount: Scalars['Float'];
  roundFrequency: Scalars['Int'];
};

export type WorkoutMove = {
  __typename?: 'WorkoutMove';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  reps: Scalars['Float'];
  repType: Scalars['String'];
  distanceUnit?: Maybe<DistanceUnit>;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit?: Maybe<LoadUnit>;
  /** duration is used when logging workout moves - when rep type is not time it allows you to log how long the user took to complete one round of the section. */
  duration?: Maybe<Scalars['Int']>;
  move: Move;
  selectedEquipment?: Maybe<Equipment>;
};

export type CreateWorkoutMoveInput = {
  description?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  sortPosition: Scalars['Int'];
  reps?: Maybe<Scalars['Float']>;
  repType: WorkoutMoveRepType;
  distanceUnit: DistanceUnit;
  loadAmount?: Maybe<Scalars['Float']>;
  loadUnit: LoadUnit;
  /** duration is used when logging workout moves - when rep type is not time it allows you to log how long the user took to complete one round of the section. */
  duration?: Maybe<Scalars['Int']>;
  moveId: Scalars['String'];
  selectedEquipmentId?: Maybe<Scalars['String']>;
};

/** Enums */
export enum AccessScopeType {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Paid = 'PAID',
  Official = 'OFFICIAL'
}

export enum DifficultyLevel {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR'
}

export enum DistanceUnit {
  Metres = 'METRES',
  Kilometres = 'KILOMETRES',
  Yards = 'YARDS',
  Miles = 'MILES'
}

export enum FrequencyPeriod {
  Day = 'DAY',
  Twodays = 'TWODAYS',
  Week = 'WEEK',
  Twoweeks = 'TWOWEEKS',
  Month = 'MONTH'
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Unspecified = 'UNSPECIFIED'
}

export enum LoadUnit {
  Kg = 'KG',
  Lb = 'LB',
  Bodyweightpercent = 'BODYWEIGHTPERCENT'
}

export enum ThemePreference {
  Dark = 'DARK',
  Light = 'LIGHT'
}

export enum UnitSystem {
  Imperial = 'IMPERIAL',
  Metric = 'METRIC'
}

export enum WorkoutMoveRepType {
  Reps = 'REPS',
  Calories = 'CALORIES',
  Distance = 'DISTANCE',
  Time = 'TIME'
}

/**
 * AMREPS in reps
 * TIME in seconds
 * LOAD in kgs
 * EMON in reps
 */
export enum WorkoutScoreType {
  Amreps = 'AMREPS',
  Fortime = 'FORTIME',
  Forload = 'FORLOAD'
}

/** For generating rules which can adjust rep and load over the course of a workout */
export enum RuleAction {
  Increase = 'INCREASE',
  Decrease = 'DECREASE',
  Multiply = 'MULTIPLY'
}

/** For generating rules which can adjust rep and load over the course of a workout */
export enum RuleTarget {
  Reps = 'REPS',
  Load = 'LOAD'
}



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

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Equipment: ResolverTypeWrapper<Equipment>;
  Move: ResolverTypeWrapper<Move>;
  WorkoutGoal: ResolverTypeWrapper<WorkoutGoal>;
  GymProfile: ResolverTypeWrapper<GymProfile>;
  CreateGymProfileInput: CreateGymProfileInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  MoveProfile: ResolverTypeWrapper<MoveProfile>;
  CreateMoveProfileInput: CreateMoveProfileInput;
  UpdateMoveProfileInput: UpdateMoveProfileInput;
  User: ResolverTypeWrapper<User>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  UpdateUserInput: UpdateUserInput;
  WorkoutType: ResolverTypeWrapper<WorkoutType>;
  Workout: ResolverTypeWrapper<Workout>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateWorkoutInput: CreateWorkoutInput;
  DeepUpdateWorkoutInput: DeepUpdateWorkoutInput;
  ShallowUpdateWorkoutInput: ShallowUpdateWorkoutInput;
  WorkoutProgram: ResolverTypeWrapper<WorkoutProgram>;
  CreateWorkoutProgramInput: CreateWorkoutProgramInput;
  DeepUpdateWorkoutProgramInput: DeepUpdateWorkoutProgramInput;
  ShallowUpdateWorkoutProgramInput: ShallowUpdateWorkoutProgramInput;
  WorkoutProgramWorkout: ResolverTypeWrapper<WorkoutProgramWorkout>;
  CreateWorkoutProgramWorkoutInput: CreateWorkoutProgramWorkoutInput;
  WorkoutProgramEnrolment: ResolverTypeWrapper<WorkoutProgramEnrolment>;
  AddEnrolmentToWorkoutProgram: AddEnrolmentToWorkoutProgram;
  RemoveEnrolmentFromWorkoutProgram: RemoveEnrolmentFromWorkoutProgram;
  WorkoutProgramReview: ResolverTypeWrapper<WorkoutProgramReview>;
  CreateWorkoutProgramReviewInput: CreateWorkoutProgramReviewInput;
  LikedWorkout: ResolverTypeWrapper<LikedWorkout>;
  LoggedWorkout: ResolverTypeWrapper<LoggedWorkout>;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  DeepUpdateLoggedWorkoutInput: DeepUpdateLoggedWorkoutInput;
  ShallowUpdateLoggedWorkoutInput: ShallowUpdateLoggedWorkoutInput;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  RoundAdjustRule: ResolverTypeWrapper<RoundAdjustRule>;
  CreateRoundAdjustRuleInput: CreateRoundAdjustRuleInput;
  WorkoutMove: ResolverTypeWrapper<WorkoutMove>;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  AccessScopeType: AccessScopeType;
  DifficultyLevel: DifficultyLevel;
  DistanceUnit: DistanceUnit;
  FrequencyPeriod: FrequencyPeriod;
  Gender: Gender;
  LoadUnit: LoadUnit;
  ThemePreference: ThemePreference;
  UnitSystem: UnitSystem;
  WorkoutMoveRepType: WorkoutMoveRepType;
  WorkoutScoreType: WorkoutScoreType;
  RuleAction: RuleAction;
  RuleTarget: RuleTarget;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  JSON: Scalars['JSON'];
  Query: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  ID: Scalars['ID'];
  Mutation: {};
  Equipment: Equipment;
  Move: Move;
  WorkoutGoal: WorkoutGoal;
  GymProfile: GymProfile;
  CreateGymProfileInput: CreateGymProfileInput;
  UpdateGymProfileInput: UpdateGymProfileInput;
  MoveProfile: MoveProfile;
  CreateMoveProfileInput: CreateMoveProfileInput;
  UpdateMoveProfileInput: UpdateMoveProfileInput;
  User: User;
  Float: Scalars['Float'];
  UpdateUserInput: UpdateUserInput;
  WorkoutType: WorkoutType;
  Workout: Workout;
  Int: Scalars['Int'];
  CreateWorkoutInput: CreateWorkoutInput;
  DeepUpdateWorkoutInput: DeepUpdateWorkoutInput;
  ShallowUpdateWorkoutInput: ShallowUpdateWorkoutInput;
  WorkoutProgram: WorkoutProgram;
  CreateWorkoutProgramInput: CreateWorkoutProgramInput;
  DeepUpdateWorkoutProgramInput: DeepUpdateWorkoutProgramInput;
  ShallowUpdateWorkoutProgramInput: ShallowUpdateWorkoutProgramInput;
  WorkoutProgramWorkout: WorkoutProgramWorkout;
  CreateWorkoutProgramWorkoutInput: CreateWorkoutProgramWorkoutInput;
  WorkoutProgramEnrolment: WorkoutProgramEnrolment;
  AddEnrolmentToWorkoutProgram: AddEnrolmentToWorkoutProgram;
  RemoveEnrolmentFromWorkoutProgram: RemoveEnrolmentFromWorkoutProgram;
  WorkoutProgramReview: WorkoutProgramReview;
  CreateWorkoutProgramReviewInput: CreateWorkoutProgramReviewInput;
  LikedWorkout: LikedWorkout;
  LoggedWorkout: LoggedWorkout;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  DeepUpdateLoggedWorkoutInput: DeepUpdateLoggedWorkoutInput;
  ShallowUpdateLoggedWorkoutInput: ShallowUpdateLoggedWorkoutInput;
  ScheduledWorkout: ScheduledWorkout;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  WorkoutSection: WorkoutSection;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  RoundAdjustRule: RoundAdjustRule;
  CreateRoundAdjustRuleInput: CreateRoundAdjustRuleInput;
  WorkoutMove: WorkoutMove;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  officialMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  officialEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  officialWorkoutTypes?: Resolver<Array<ResolversTypes['WorkoutType']>, ParentType, ContextType>;
  officialWorkoutGoals?: Resolver<Array<Maybe<ResolversTypes['WorkoutGoal']>>, ParentType, ContextType>;
  officialWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  privateWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryPrivateWorkoutsArgs, 'authedUserId'>>;
  publicWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutsArgs, 'authedUserId'>>;
  officialWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType>;
  privateWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType, RequireFields<QueryPrivateWorkoutProgramsArgs, 'authedUserId'>>;
  publicWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutProgramsArgs, 'authedUserId'>>;
  userByUid?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUidArgs, 'uid'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  workoutById?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryWorkoutByIdArgs, 'id'>>;
  workoutProgramById?: Resolver<Maybe<ResolversTypes['WorkoutProgram']>, ParentType, ContextType, RequireFields<QueryWorkoutProgramByIdArgs, 'id'>>;
  likedWorkouts?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryLikedWorkoutsArgs, 'authedUserId'>>;
  scheduledWorkouts?: Resolver<Array<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType, RequireFields<QueryScheduledWorkoutsArgs, 'authedUserId'>>;
  loggedWorkouts?: Resolver<Array<ResolversTypes['LoggedWorkout']>, ParentType, ContextType, RequireFields<QueryLoggedWorkoutsArgs, 'authedUserId'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'uid'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'data'>>;
  createGymProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateGymProfileArgs, 'authedUserId' | 'data'>>;
  updateGymProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateGymProfileArgs, 'authedUserId' | 'data'>>;
  deleteGymProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteGymProfileArgs, 'authedUserId' | 'gymProfileId'>>;
  createMoveProfile?: Resolver<ResolversTypes['MoveProfile'], ParentType, ContextType, RequireFields<MutationCreateMoveProfileArgs, 'authedUserId' | 'data'>>;
  updateMoveProfile?: Resolver<ResolversTypes['MoveProfile'], ParentType, ContextType, RequireFields<MutationUpdateMoveProfileArgs, 'authedUserId' | 'data'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'authedUserId' | 'workoutData'>>;
  deepUpdateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationDeepUpdateWorkoutArgs, 'authedUserId' | 'workoutData'>>;
  shallowUpdateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationShallowUpdateWorkoutArgs, 'authedUserId' | 'workoutData'>>;
  deleteWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutArgs, 'authedUserId' | 'workoutId'>>;
  likeWorkout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationLikeWorkoutArgs, 'authedUserId' | 'workoutId'>>;
  unlikeWorkout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationUnlikeWorkoutArgs, 'authedUserId' | 'workoutId'>>;
  scheduleWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationScheduleWorkoutArgs, 'authedUserId' | 'data'>>;
  unscheduleWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUnscheduleWorkoutArgs, 'authedUserId' | 'scheduledWorkoutId'>>;
  updateScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationUpdateScheduledWorkoutArgs, 'authedUserId' | 'data'>>;
  createLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutArgs, 'authedUserId' | 'loggedWorkoutData'>>;
  deepUpdateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationDeepUpdateLoggedWorkoutArgs, 'authedUserId' | 'loggedWorkoutData'>>;
  shallowUpdateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationShallowUpdateLoggedWorkoutArgs, 'authedUserId' | 'loggedWorkoutData'>>;
  deleteLoggedWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutArgs, 'authedUserId' | 'loggedWorkoutId'>>;
  createWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationCreateWorkoutProgramArgs, 'authedUserId' | 'data'>>;
  shallowUpdateWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationShallowUpdateWorkoutProgramArgs, 'authedUserId' | 'data'>>;
  deepUpdateWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationDeepUpdateWorkoutProgramArgs, 'authedUserId' | 'data'>>;
  deleteWorkoutProgram?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId'>>;
  addEnrolmentToWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationAddEnrolmentToWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId'>>;
  removeEnrolmentFromWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationRemoveEnrolmentFromWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId'>>;
  addReviewToWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationAddReviewToWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId' | 'data'>>;
  removeReviewFromWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationRemoveReviewFromWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId' | 'reviewId'>>;
};

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loadAdjustable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Move'] = ResolversParentTypes['Move']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  groupId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validRepTypes?: Resolver<Array<ResolversTypes['WorkoutMoveRepType']>, ParentType, ContextType>;
  createdById?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiredEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  selectableEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutGoal'] = ResolversParentTypes['WorkoutGoal']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GymProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['GymProfile'] = ResolversParentTypes['GymProfile']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyweightOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  availableEquipments?: Resolver<Maybe<Array<ResolversTypes['Equipment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MoveProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveProfile'] = ResolversParentTypes['MoveProfile']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  requiredMoves?: Resolver<Maybe<Array<ResolversTypes['Move']>>, ParentType, ContextType>;
  excludedMoves?: Resolver<Maybe<Array<ResolversTypes['Move']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthdate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  themePreference?: Resolver<ResolversTypes['ThemePreference'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  hasOnboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unitSystem?: Resolver<Maybe<ResolversTypes['UnitSystem']>, ParentType, ContextType>;
  gymProfiles?: Resolver<Maybe<Array<ResolversTypes['GymProfile']>>, ParentType, ContextType>;
  moveProfiles?: Resolver<Maybe<Array<ResolversTypes['MoveProfile']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutType'] = ResolversParentTypes['WorkoutType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeholderImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scoreType?: Resolver<Maybe<ResolversTypes['WorkoutScoreType']>, ParentType, ContextType>;
  Workout?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  demoVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spotifyAudio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutType?: Resolver<ResolversTypes['WorkoutType'], ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  workoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  builderData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutProgramResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgram'] = ResolversParentTypes['WorkoutProgram']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preciseSchedule?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  frequencyPeriod?: Resolver<Maybe<ResolversTypes['FrequencyPeriod']>, ParentType, ContextType>;
  frequencyAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  enrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType>;
  workoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  programWorkouts?: Resolver<Array<ResolversTypes['WorkoutProgramWorkout']>, ParentType, ContextType>;
  programReviews?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramReview']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutProgramWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramWorkout'] = ResolversParentTypes['WorkoutProgramWorkout']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dayNumber?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutProgramEnrolmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramEnrolment'] = ResolversParentTypes['WorkoutProgramEnrolment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  loggedWorkouts?: Resolver<Maybe<Array<ResolversTypes['LoggedWorkout']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutProgramReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramReview'] = ResolversParentTypes['WorkoutProgramReview']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LikedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikedWorkout'] = ResolversParentTypes['LikedWorkout']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LoggedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkout'] = ResolversParentTypes['LoggedWorkout']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  workoutType?: Resolver<ResolversTypes['WorkoutType'], ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gymProfile?: Resolver<Maybe<ResolversTypes['GymProfile']>, ParentType, ContextType>;
  workoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  originalWorkoutId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalWorkoutScope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ScheduledWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduledWorkout'] = ResolversParentTypes['ScheduledWorkout']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scheduledAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  loggedWorkoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  gymProfileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSection'] = ResolversParentTypes['WorkoutSection']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutMoves?: Resolver<Maybe<Array<ResolversTypes['WorkoutMove']>>, ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  roundAdjustRules?: Resolver<Maybe<Array<ResolversTypes['RoundAdjustRule']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type RoundAdjustRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoundAdjustRule'] = ResolversParentTypes['RoundAdjustRule']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['RuleTarget']>, ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['RuleAction']>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  roundFrequency?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMove'] = ResolversParentTypes['WorkoutMove']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distanceUnit?: Resolver<Maybe<ResolversTypes['DistanceUnit']>, ParentType, ContextType>;
  loadAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  loadUnit?: Resolver<Maybe<ResolversTypes['LoadUnit']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  selectedEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  WorkoutGoal?: WorkoutGoalResolvers<ContextType>;
  GymProfile?: GymProfileResolvers<ContextType>;
  MoveProfile?: MoveProfileResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WorkoutType?: WorkoutTypeResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutProgram?: WorkoutProgramResolvers<ContextType>;
  WorkoutProgramWorkout?: WorkoutProgramWorkoutResolvers<ContextType>;
  WorkoutProgramEnrolment?: WorkoutProgramEnrolmentResolvers<ContextType>;
  WorkoutProgramReview?: WorkoutProgramReviewResolvers<ContextType>;
  LikedWorkout?: LikedWorkoutResolvers<ContextType>;
  LoggedWorkout?: LoggedWorkoutResolvers<ContextType>;
  ScheduledWorkout?: ScheduledWorkoutResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  RoundAdjustRule?: RoundAdjustRuleResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


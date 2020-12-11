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
  DateTime: any;
};



export type Query = {
  __typename?: 'Query';
  checkUniqueDisplayName: Scalars['Boolean'];
  userByUid?: Maybe<User>;
  creatorPublicProfiles?: Maybe<Array<UserPublicProfile>>;
  userPublicProfile?: Maybe<UserPublicProfile>;
  standardMoves: Array<Move>;
  userCustomMoves: Array<Move>;
  bodyAreas: Array<BodyArea>;
  equipments: Array<Equipment>;
  workoutTypes: Array<WorkoutType>;
  workoutGoals: Array<Maybe<WorkoutGoal>>;
  officialWorkouts: Array<Workout>;
  privateWorkouts: Array<Workout>;
  publicWorkouts: Array<Workout>;
  workoutById?: Maybe<Workout>;
  officialWorkoutPrograms: Array<WorkoutProgram>;
  privateWorkoutPrograms: Array<WorkoutProgram>;
  publicWorkoutPrograms: Array<WorkoutProgram>;
  workoutProgramById?: Maybe<WorkoutProgram>;
  workoutProgramEnrolmentsByUser?: Maybe<Array<WorkoutProgramEnrolment>>;
  likedWorkouts: Array<Scalars['ID']>;
  scheduledWorkouts: Array<ScheduledWorkout>;
  loggedWorkouts: Array<LoggedWorkout>;
  likedWorkoutPrograms: Array<Scalars['ID']>;
  textSearchWorkouts?: Maybe<Array<TextSearchWorkoutResult>>;
  textSearchWorkoutPrograms?: Maybe<Array<TextSearchWorkoutProgramResult>>;
  textSearchCreatorPublicProfiles?: Maybe<Array<UserPublicProfile>>;
};


export type QueryCheckUniqueDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type QueryUserByUidArgs = {
  uid: Scalars['ID'];
};


export type QueryCreatorPublicProfilesArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryUserPublicProfileArgs = {
  userId: Scalars['ID'];
};


export type QueryUserCustomMovesArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryPrivateWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryPublicWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryWorkoutByIdArgs = {
  authedUserId: Scalars['ID'];
  workoutId: Scalars['ID'];
};


export type QueryPrivateWorkoutProgramsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryPublicWorkoutProgramsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryWorkoutProgramByIdArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};


export type QueryWorkoutProgramEnrolmentsByUserArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
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


export type QueryLikedWorkoutProgramsArgs = {
  authedUserId: Scalars['ID'];
};


export type QueryTextSearchWorkoutsArgs = {
  authedUserId: Scalars['ID'];
  text: Scalars['String'];
};


export type QueryTextSearchWorkoutProgramsArgs = {
  authedUserId: Scalars['ID'];
  text: Scalars['String'];
};


export type QueryTextSearchCreatorPublicProfilesArgs = {
  authedUserId: Scalars['ID'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  createMove?: Maybe<Move>;
  shallowUpdateMove?: Maybe<Move>;
  deepUpdateMove?: Maybe<Move>;
  deleteMoveById?: Maybe<Scalars['ID']>;
  createGymProfile: GymProfile;
  updateGymProfile: GymProfile;
  deleteGymProfileById?: Maybe<Scalars['ID']>;
  createMoveProfile: MoveProfile;
  updateMoveProfile: MoveProfile;
  createWorkout: Workout;
  shallowUpdateWorkout: Workout;
  deepUpdateWorkout: Workout;
  deleteWorkoutById?: Maybe<Scalars['ID']>;
  likeWorkout?: Maybe<Scalars['ID']>;
  unlikeWorkout?: Maybe<Scalars['ID']>;
  scheduleWorkout: ScheduledWorkout;
  unscheduleWorkout: Scalars['ID'];
  updateScheduledWorkout: ScheduledWorkout;
  createLoggedWorkout: LoggedWorkout;
  deepUpdateLoggedWorkout: LoggedWorkout;
  shallowUpdateLoggedWorkout: LoggedWorkout;
  deleteLoggedWorkoutById?: Maybe<Scalars['ID']>;
  createWorkoutProgram: WorkoutProgram;
  shallowUpdateWorkoutProgram: WorkoutProgram;
  deepUpdateWorkoutProgram: WorkoutProgram;
  deleteWorkoutProgramById?: Maybe<Scalars['ID']>;
  likeWorkoutProgram?: Maybe<Scalars['ID']>;
  unlikeWorkoutProgram?: Maybe<Scalars['ID']>;
  addEnrolmentToWorkoutProgram: WorkoutProgram;
  removeEnrolmentFromWorkoutProgram: WorkoutProgram;
  addReviewToWorkoutProgram: WorkoutProgram;
  deleteWorkoutProgramReview: WorkoutProgram;
};


export type MutationCreateUserArgs = {
  uid: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateUserInput;
};


export type MutationCreateMoveArgs = {
  authedUserId: Scalars['ID'];
  data: CreateMoveInput;
};


export type MutationShallowUpdateMoveArgs = {
  authedUserId: Scalars['ID'];
  data: ShallowUpdateMoveInput;
};


export type MutationDeepUpdateMoveArgs = {
  authedUserId: Scalars['ID'];
  data: DeepUpdateMoveInput;
};


export type MutationDeleteMoveByIdArgs = {
  authedUserId: Scalars['ID'];
  moveId: Scalars['ID'];
};


export type MutationCreateGymProfileArgs = {
  authedUserId: Scalars['ID'];
  data: CreateGymProfileInput;
};


export type MutationUpdateGymProfileArgs = {
  authedUserId: Scalars['ID'];
  data: UpdateGymProfileInput;
};


export type MutationDeleteGymProfileByIdArgs = {
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
  data: CreateWorkoutInput;
};


export type MutationShallowUpdateWorkoutArgs = {
  authedUserId: Scalars['ID'];
  data: ShallowUpdateWorkoutInput;
};


export type MutationDeepUpdateWorkoutArgs = {
  authedUserId: Scalars['ID'];
  data: DeepUpdateWorkoutInput;
};


export type MutationDeleteWorkoutByIdArgs = {
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
  data: CreateLoggedWorkoutInput;
};


export type MutationDeepUpdateLoggedWorkoutArgs = {
  authedUserId: Scalars['ID'];
  data: DeepUpdateLoggedWorkoutInput;
};


export type MutationShallowUpdateLoggedWorkoutArgs = {
  authedUserId: Scalars['ID'];
  data: ShallowUpdateLoggedWorkoutInput;
};


export type MutationDeleteLoggedWorkoutByIdArgs = {
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


export type MutationDeleteWorkoutProgramByIdArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};


export type MutationLikeWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
};


export type MutationUnlikeWorkoutProgramArgs = {
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
  workoutProgramEnrolmentId: Scalars['ID'];
};


export type MutationAddReviewToWorkoutProgramArgs = {
  authedUserId: Scalars['ID'];
  workoutProgramId: Scalars['ID'];
  data: CreateWorkoutProgramReviewInput;
};


export type MutationDeleteWorkoutProgramReviewArgs = {
  authedUserId: Scalars['ID'];
  reviewId: Scalars['ID'];
};

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  loadAdjustable: Scalars['Boolean'];
};

export type WorkoutGoal = {
  __typename?: 'WorkoutGoal';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  placeholderImageUrl?: Maybe<Scalars['String']>;
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
  availableEquipments?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateGymProfileInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  bodyweightOnly?: Maybe<Scalars['Boolean']>;
  availableEquipments?: Maybe<Array<Scalars['ID']>>;
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
  introVideoUrl?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
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
  introVideoUrl?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
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
  themePreference?: Maybe<ThemePreference>;
  gender?: Maybe<Gender>;
  gymBox?: Maybe<Scalars['String']>;
  hasOnboarded?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Float']>;
  lastname?: Maybe<Scalars['String']>;
  unitSystem?: Maybe<UnitSystem>;
  weight?: Maybe<Scalars['Float']>;
};

export type UserPublicProfile = {
  __typename?: 'UserPublicProfile';
  id: Scalars['ID'];
  avatarUrl?: Maybe<Scalars['String']>;
  introVideoUrl?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  instagramUrl?: Maybe<Scalars['String']>;
  tiktokUrl?: Maybe<Scalars['String']>;
  youtubeUrl?: Maybe<Scalars['String']>;
  snapUrl?: Maybe<Scalars['String']>;
  linkedinUrl?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  workouts?: Maybe<Array<Workout>>;
  workoutPrograms?: Maybe<Array<WorkoutProgram>>;
};

export type UserPrivateProfile = {
  __typename?: 'UserPrivateProfile';
  loggedWorkouts?: Maybe<Array<LoggedWorkout>>;
  workouts?: Maybe<Array<Workout>>;
  workoutPrograms?: Maybe<Array<WorkoutProgram>>;
  workoutProgramEnrolments?: Maybe<Array<WorkoutProgramEnrolment>>;
};

export type LikedWorkout = {
  __typename?: 'LikedWorkout';
  createdAt: Scalars['DateTime'];
  user: User;
  workout: Workout;
  notes?: Maybe<Scalars['String']>;
};

export type LikedWorkoutProgram = {
  __typename?: 'LikedWorkoutProgram';
  createdAt: Scalars['DateTime'];
  user: User;
  workoutProgram: WorkoutProgram;
  notes?: Maybe<Scalars['String']>;
};

export type Move = {
  __typename?: 'Move';
  id: Scalars['ID'];
  name: Scalars['String'];
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  scope: MoveScope;
  type: MoveType;
  validRepTypes: Array<WorkoutMoveRepType>;
  requiredEquipments: Array<Equipment>;
  selectableEquipments: Array<Equipment>;
  bodyAreaMoveScores?: Maybe<Array<BodyAreaMoveScore>>;
};

export type CreateMoveInput = {
  name: Scalars['String'];
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  type: MoveType;
  validRepTypes: Array<WorkoutMoveRepType>;
  requiredEquipments?: Maybe<Array<Scalars['ID']>>;
  selectableEquipments?: Maybe<Array<Scalars['ID']>>;
  bodyAreaMoveScores?: Maybe<Array<MoveBodyAreaMoveScoreInput>>;
};

export type ShallowUpdateMoveInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  type?: Maybe<MoveType>;
  validRepTypes?: Maybe<Array<WorkoutMoveRepType>>;
  requiredEquipments?: Maybe<Array<Scalars['ID']>>;
  selectableEquipments?: Maybe<Array<Scalars['ID']>>;
};

export type DeepUpdateMoveInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  searchTerms?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  type?: Maybe<MoveType>;
  validRepTypes?: Maybe<Array<WorkoutMoveRepType>>;
  requiredEquipments?: Maybe<Array<Scalars['ID']>>;
  selectableEquipments?: Maybe<Array<Scalars['ID']>>;
  bodyAreaMoveScores: Array<MoveBodyAreaMoveScoreInput>;
};

export type MoveBodyAreaMoveScoreInput = {
  bodyArea: Scalars['ID'];
  score: Scalars['Float'];
};

export type WorkoutType = {
  __typename?: 'WorkoutType';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  placeholderImageUrl?: Maybe<Scalars['String']>;
  scoreType?: Maybe<WorkoutScoreType>;
  workouts: Array<Workout>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
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
  workoutType: Scalars['ID'];
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
  workoutType?: Maybe<Scalars['ID']>;
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
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  scope: AccessScopeType;
  createdBy?: Maybe<User>;
  enrolments?: Maybe<Array<WorkoutProgramEnrolment>>;
  workoutGoals: Array<WorkoutGoal>;
  workoutProgramWorkouts: Array<WorkoutProgramWorkout>;
  workoutProgramReviews?: Maybe<Array<WorkoutProgramReview>>;
};

export type CreateWorkoutProgramInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  scope: AccessScopeType;
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  workoutGoals: Array<Scalars['ID']>;
  workoutProgramWorkouts: Array<CreateWorkoutProgramWorkoutInput>;
};

export type DeepUpdateWorkoutProgramInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  scope?: Maybe<AccessScopeType>;
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  workoutGoals: Array<Scalars['ID']>;
  workoutProgramWorkouts: Array<CreateWorkoutProgramWorkoutInput>;
};

export type ShallowUpdateWorkoutProgramInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  scope?: Maybe<AccessScopeType>;
  imageUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  workoutGoals: Array<Scalars['ID']>;
};

export type WorkoutProgramWorkout = {
  __typename?: 'WorkoutProgramWorkout';
  id: Scalars['ID'];
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  workout: Workout;
  loggedWorkout?: Maybe<LoggedWorkout>;
};

export type CreateWorkoutProgramWorkoutInput = {
  dayNumber: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  workout: Scalars['ID'];
};

export type WorkoutProgramEnrolment = {
  __typename?: 'WorkoutProgramEnrolment';
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['DateTime']>;
  user: User;
  workoutProgram: WorkoutProgram;
  loggedWorkouts?: Maybe<Array<LoggedWorkout>>;
};

export type AddLoggedWorkoutToProgramEnrolmentInput = {
  workoutProgramEnrolmentId: Scalars['ID'];
  loggedWorkout: CreateLoggedWorkoutInput;
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

export type LoggedWorkout = {
  __typename?: 'LoggedWorkout';
  id: Scalars['ID'];
  name: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn: Scalars['DateTime'];
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
  workoutProgramWorkout?: Maybe<WorkoutProgramWorkout>;
  scheduledWorkout?: Maybe<ScheduledWorkout>;
};

export type CreateLoggedWorkoutInput = {
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  workoutType: Scalars['ID'];
  gymProfile?: Maybe<Scalars['ID']>;
  workoutSections: Array<CreateWorkoutSectionInput>;
  originalWorkout: Scalars['ID'];
  workoutProgramEnrolment?: Maybe<Scalars['ID']>;
  workoutProgramWorkout?: Maybe<Scalars['ID']>;
  scheduledWorkout?: Maybe<Scalars['ID']>;
};

export type DeepUpdateLoggedWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  gymProfile?: Maybe<Scalars['ID']>;
  workoutSections: Array<CreateWorkoutSectionInput>;
  workoutProgramEnrolment?: Maybe<Scalars['ID']>;
  workoutProgramWorkout?: Maybe<Scalars['ID']>;
  scheduledWorkout?: Maybe<Scalars['ID']>;
};

export type ShallowUpdateLoggedWorkoutInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  completedOn?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  videoThumbUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  gymProfile?: Maybe<Scalars['ID']>;
  workoutProgramEnrolment?: Maybe<Scalars['ID']>;
  workoutProgramWorkout?: Maybe<Scalars['ID']>;
  scheduledWorkout?: Maybe<Scalars['ID']>;
};

export type ScheduledWorkout = {
  __typename?: 'ScheduledWorkout';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  scheduledAt: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  workoutId: Scalars['ID'];
  loggedWorkoutId?: Maybe<Scalars['ID']>;
  gymProfileId?: Maybe<Scalars['ID']>;
};

export type CreateScheduledWorkoutInput = {
  scheduledAt: Scalars['DateTime'];
  notes?: Maybe<Scalars['String']>;
  workout: Scalars['ID'];
  gymProfile?: Maybe<Scalars['ID']>;
};

export type UpdateScheduledWorkoutInput = {
  id: Scalars['ID'];
  scheduledAt?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  workout?: Maybe<Scalars['ID']>;
  loggedWorkout?: Maybe<Scalars['ID']>;
  gymProfile?: Maybe<Scalars['ID']>;
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
};

export type CreateWorkoutSectionInput = {
  notes?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  sortPosition: Scalars['Int'];
  rounds: Scalars['Int'];
  workoutMoves: Array<CreateWorkoutMoveInput>;
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
  move: Scalars['ID'];
  selectedEquipment?: Maybe<Scalars['ID']>;
};

export type BodyArea = {
  __typename?: 'BodyArea';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  altNames?: Maybe<Scalars['String']>;
  bodyAreaMoveScores: Array<BodyAreaMoveScore>;
  frontBack: BodyAreaFrontBack;
  upperLower: BodyAreaUpperLower;
};

export type BodyAreaMoveScore = {
  __typename?: 'BodyAreaMoveScore';
  move: Move;
  bodyArea: BodyArea;
  score: Scalars['Float'];
};

export type TextSearchWorkoutResult = {
  __typename?: 'TextSearchWorkoutResult';
  id: Scalars['ID'];
  scope: AccessScopeType;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  workoutType: WorkoutType;
  imageUrl?: Maybe<Scalars['String']>;
  difficultyLevel: Scalars['Int'];
  timecap?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<User>;
};

export type TextSearchWorkoutProgramResult = {
  __typename?: 'TextSearchWorkoutProgramResult';
  id: Scalars['ID'];
  scope: AccessScopeType;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  workoutGoals: Array<WorkoutGoal>;
  workoutProgramWorkouts?: Maybe<Array<WorkoutProgramWorkout>>;
};

/**
 * Enums
 * enums
 */
export type AccessScopeType = 
  | 'PRIVATE'
  | 'PUBLIC'
  | 'PAID'
  | 'OFFICIAL';

export type BodyAreaFrontBack = 
  | 'BACK'
  | 'FRONT';

export type BodyAreaUpperLower = 
  | 'CORE'
  | 'LOWER'
  | 'UPPER';

export type DifficultyLevel = 
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR';

export type DistanceUnit = 
  | 'METRES'
  | 'KILOMETRES'
  | 'YARDS'
  | 'MILES';

export type Gender = 
  | 'MALE'
  | 'FEMALE'
  | 'UNSPECIFIED';

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

export type MoveType = 
  | 'GENERAL'
  | 'CARDIO'
  | 'YOGAFLEX'
  | 'BARRE'
  | 'PILATES';

export type ThemePreference = 
  | 'DARK'
  | 'LIGHT';

export type UnitSystem = 
  | 'IMPERIAL'
  | 'METRIC';

export type WorkoutMoveRepType = 
  | 'REPS'
  | 'CALORIES'
  | 'DISTANCE'
  | 'TIME';

/**
 * AMREPS in reps
 * TIME in seconds
 * LOAD in kgs
 * EMON in reps
 */
export type WorkoutScoreType = 
  | 'AMREPS'
  | 'FORTIME'
  | 'FORLOAD';

/** For generating rules which can adjust rep and load over the course of a workout */
export type RuleAction = 
  | 'INCREASE'
  | 'DECREASE'
  | 'MULTIPLY';

/** For generating rules which can adjust rep and load over the course of a workout */
export type RuleTarget = 
  | 'REPS'
  | 'LOAD';

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
export type ResolversTypes = ResolversObject<{
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Equipment: ResolverTypeWrapper<Equipment>;
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
  UserPublicProfile: ResolverTypeWrapper<UserPublicProfile>;
  UserPrivateProfile: ResolverTypeWrapper<UserPrivateProfile>;
  LikedWorkout: ResolverTypeWrapper<LikedWorkout>;
  LikedWorkoutProgram: ResolverTypeWrapper<LikedWorkoutProgram>;
  Move: ResolverTypeWrapper<Move>;
  CreateMoveInput: CreateMoveInput;
  ShallowUpdateMoveInput: ShallowUpdateMoveInput;
  DeepUpdateMoveInput: DeepUpdateMoveInput;
  MoveBodyAreaMoveScoreInput: MoveBodyAreaMoveScoreInput;
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
  AddLoggedWorkoutToProgramEnrolmentInput: AddLoggedWorkoutToProgramEnrolmentInput;
  WorkoutProgramReview: ResolverTypeWrapper<WorkoutProgramReview>;
  CreateWorkoutProgramReviewInput: CreateWorkoutProgramReviewInput;
  LoggedWorkout: ResolverTypeWrapper<LoggedWorkout>;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  DeepUpdateLoggedWorkoutInput: DeepUpdateLoggedWorkoutInput;
  ShallowUpdateLoggedWorkoutInput: ShallowUpdateLoggedWorkoutInput;
  ScheduledWorkout: ResolverTypeWrapper<ScheduledWorkout>;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  WorkoutMove: ResolverTypeWrapper<WorkoutMove>;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  BodyArea: ResolverTypeWrapper<BodyArea>;
  BodyAreaMoveScore: ResolverTypeWrapper<BodyAreaMoveScore>;
  TextSearchWorkoutResult: ResolverTypeWrapper<TextSearchWorkoutResult>;
  TextSearchWorkoutProgramResult: ResolverTypeWrapper<TextSearchWorkoutProgramResult>;
  AccessScopeType: AccessScopeType;
  BodyAreaFrontBack: BodyAreaFrontBack;
  BodyAreaUpperLower: BodyAreaUpperLower;
  DifficultyLevel: DifficultyLevel;
  DistanceUnit: DistanceUnit;
  Gender: Gender;
  LoadUnit: LoadUnit;
  MoveScope: MoveScope;
  MoveType: MoveType;
  ThemePreference: ThemePreference;
  UnitSystem: UnitSystem;
  WorkoutMoveRepType: WorkoutMoveRepType;
  WorkoutScoreType: WorkoutScoreType;
  RuleAction: RuleAction;
  RuleTarget: RuleTarget;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  JSON: Scalars['JSON'];
  DateTime: Scalars['DateTime'];
  Query: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  ID: Scalars['ID'];
  Mutation: {};
  Equipment: Equipment;
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
  UserPublicProfile: UserPublicProfile;
  UserPrivateProfile: UserPrivateProfile;
  LikedWorkout: LikedWorkout;
  LikedWorkoutProgram: LikedWorkoutProgram;
  Move: Move;
  CreateMoveInput: CreateMoveInput;
  ShallowUpdateMoveInput: ShallowUpdateMoveInput;
  DeepUpdateMoveInput: DeepUpdateMoveInput;
  MoveBodyAreaMoveScoreInput: MoveBodyAreaMoveScoreInput;
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
  AddLoggedWorkoutToProgramEnrolmentInput: AddLoggedWorkoutToProgramEnrolmentInput;
  WorkoutProgramReview: WorkoutProgramReview;
  CreateWorkoutProgramReviewInput: CreateWorkoutProgramReviewInput;
  LoggedWorkout: LoggedWorkout;
  CreateLoggedWorkoutInput: CreateLoggedWorkoutInput;
  DeepUpdateLoggedWorkoutInput: DeepUpdateLoggedWorkoutInput;
  ShallowUpdateLoggedWorkoutInput: ShallowUpdateLoggedWorkoutInput;
  ScheduledWorkout: ScheduledWorkout;
  CreateScheduledWorkoutInput: CreateScheduledWorkoutInput;
  UpdateScheduledWorkoutInput: UpdateScheduledWorkoutInput;
  WorkoutSection: WorkoutSection;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  WorkoutMove: WorkoutMove;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  BodyArea: BodyArea;
  BodyAreaMoveScore: BodyAreaMoveScore;
  TextSearchWorkoutResult: TextSearchWorkoutResult;
  TextSearchWorkoutProgramResult: TextSearchWorkoutProgramResult;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  userByUid?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUidArgs, 'uid'>>;
  creatorPublicProfiles?: Resolver<Maybe<Array<ResolversTypes['UserPublicProfile']>>, ParentType, ContextType, RequireFields<QueryCreatorPublicProfilesArgs, 'authedUserId'>>;
  userPublicProfile?: Resolver<Maybe<ResolversTypes['UserPublicProfile']>, ParentType, ContextType, RequireFields<QueryUserPublicProfileArgs, 'userId'>>;
  standardMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userCustomMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType, RequireFields<QueryUserCustomMovesArgs, 'authedUserId'>>;
  bodyAreas?: Resolver<Array<ResolversTypes['BodyArea']>, ParentType, ContextType>;
  equipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  workoutTypes?: Resolver<Array<ResolversTypes['WorkoutType']>, ParentType, ContextType>;
  workoutGoals?: Resolver<Array<Maybe<ResolversTypes['WorkoutGoal']>>, ParentType, ContextType>;
  officialWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  privateWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryPrivateWorkoutsArgs, 'authedUserId'>>;
  publicWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutsArgs, 'authedUserId'>>;
  workoutById?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryWorkoutByIdArgs, 'authedUserId' | 'workoutId'>>;
  officialWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType>;
  privateWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType, RequireFields<QueryPrivateWorkoutProgramsArgs, 'authedUserId'>>;
  publicWorkoutPrograms?: Resolver<Array<ResolversTypes['WorkoutProgram']>, ParentType, ContextType, RequireFields<QueryPublicWorkoutProgramsArgs, 'authedUserId'>>;
  workoutProgramById?: Resolver<Maybe<ResolversTypes['WorkoutProgram']>, ParentType, ContextType, RequireFields<QueryWorkoutProgramByIdArgs, 'authedUserId' | 'workoutProgramId'>>;
  workoutProgramEnrolmentsByUser?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType, RequireFields<QueryWorkoutProgramEnrolmentsByUserArgs, 'authedUserId' | 'workoutProgramId'>>;
  likedWorkouts?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryLikedWorkoutsArgs, 'authedUserId'>>;
  scheduledWorkouts?: Resolver<Array<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType, RequireFields<QueryScheduledWorkoutsArgs, 'authedUserId'>>;
  loggedWorkouts?: Resolver<Array<ResolversTypes['LoggedWorkout']>, ParentType, ContextType, RequireFields<QueryLoggedWorkoutsArgs, 'authedUserId'>>;
  likedWorkoutPrograms?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryLikedWorkoutProgramsArgs, 'authedUserId'>>;
  textSearchWorkouts?: Resolver<Maybe<Array<ResolversTypes['TextSearchWorkoutResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutsArgs, 'authedUserId' | 'text'>>;
  textSearchWorkoutPrograms?: Resolver<Maybe<Array<ResolversTypes['TextSearchWorkoutProgramResult']>>, ParentType, ContextType, RequireFields<QueryTextSearchWorkoutProgramsArgs, 'authedUserId' | 'text'>>;
  textSearchCreatorPublicProfiles?: Resolver<Maybe<Array<ResolversTypes['UserPublicProfile']>>, ParentType, ContextType, RequireFields<QueryTextSearchCreatorPublicProfilesArgs, 'authedUserId' | 'text'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'uid'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'data'>>;
  createMove?: Resolver<Maybe<ResolversTypes['Move']>, ParentType, ContextType, RequireFields<MutationCreateMoveArgs, 'authedUserId' | 'data'>>;
  shallowUpdateMove?: Resolver<Maybe<ResolversTypes['Move']>, ParentType, ContextType, RequireFields<MutationShallowUpdateMoveArgs, 'authedUserId' | 'data'>>;
  deepUpdateMove?: Resolver<Maybe<ResolversTypes['Move']>, ParentType, ContextType, RequireFields<MutationDeepUpdateMoveArgs, 'authedUserId' | 'data'>>;
  deleteMoveById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteMoveByIdArgs, 'authedUserId' | 'moveId'>>;
  createGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationCreateGymProfileArgs, 'authedUserId' | 'data'>>;
  updateGymProfile?: Resolver<ResolversTypes['GymProfile'], ParentType, ContextType, RequireFields<MutationUpdateGymProfileArgs, 'authedUserId' | 'data'>>;
  deleteGymProfileById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteGymProfileByIdArgs, 'authedUserId' | 'gymProfileId'>>;
  createMoveProfile?: Resolver<ResolversTypes['MoveProfile'], ParentType, ContextType, RequireFields<MutationCreateMoveProfileArgs, 'authedUserId' | 'data'>>;
  updateMoveProfile?: Resolver<ResolversTypes['MoveProfile'], ParentType, ContextType, RequireFields<MutationUpdateMoveProfileArgs, 'authedUserId' | 'data'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'authedUserId' | 'data'>>;
  shallowUpdateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationShallowUpdateWorkoutArgs, 'authedUserId' | 'data'>>;
  deepUpdateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationDeepUpdateWorkoutArgs, 'authedUserId' | 'data'>>;
  deleteWorkoutById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteWorkoutByIdArgs, 'authedUserId' | 'workoutId'>>;
  likeWorkout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationLikeWorkoutArgs, 'authedUserId' | 'workoutId'>>;
  unlikeWorkout?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationUnlikeWorkoutArgs, 'authedUserId' | 'workoutId'>>;
  scheduleWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationScheduleWorkoutArgs, 'authedUserId' | 'data'>>;
  unscheduleWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationUnscheduleWorkoutArgs, 'authedUserId' | 'scheduledWorkoutId'>>;
  updateScheduledWorkout?: Resolver<ResolversTypes['ScheduledWorkout'], ParentType, ContextType, RequireFields<MutationUpdateScheduledWorkoutArgs, 'authedUserId' | 'data'>>;
  createLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationCreateLoggedWorkoutArgs, 'authedUserId' | 'data'>>;
  deepUpdateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationDeepUpdateLoggedWorkoutArgs, 'authedUserId' | 'data'>>;
  shallowUpdateLoggedWorkout?: Resolver<ResolversTypes['LoggedWorkout'], ParentType, ContextType, RequireFields<MutationShallowUpdateLoggedWorkoutArgs, 'authedUserId' | 'data'>>;
  deleteLoggedWorkoutById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteLoggedWorkoutByIdArgs, 'authedUserId' | 'loggedWorkoutId'>>;
  createWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationCreateWorkoutProgramArgs, 'authedUserId' | 'data'>>;
  shallowUpdateWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationShallowUpdateWorkoutProgramArgs, 'authedUserId' | 'data'>>;
  deepUpdateWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationDeepUpdateWorkoutProgramArgs, 'authedUserId' | 'data'>>;
  deleteWorkoutProgramById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteWorkoutProgramByIdArgs, 'authedUserId' | 'workoutProgramId'>>;
  likeWorkoutProgram?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationLikeWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId'>>;
  unlikeWorkoutProgram?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationUnlikeWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId'>>;
  addEnrolmentToWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationAddEnrolmentToWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId'>>;
  removeEnrolmentFromWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationRemoveEnrolmentFromWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId' | 'workoutProgramEnrolmentId'>>;
  addReviewToWorkoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationAddReviewToWorkoutProgramArgs, 'authedUserId' | 'workoutProgramId' | 'data'>>;
  deleteWorkoutProgramReview?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutProgramReviewArgs, 'authedUserId' | 'reviewId'>>;
}>;

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loadAdjustable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutGoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutGoal'] = ResolversParentTypes['WorkoutGoal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeholderImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GymProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['GymProfile'] = ResolversParentTypes['GymProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyweightOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  availableEquipments?: Resolver<Maybe<Array<ResolversTypes['Equipment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MoveProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveProfile'] = ResolversParentTypes['MoveProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  requiredMoves?: Resolver<Maybe<Array<ResolversTypes['Move']>>, ParentType, ContextType>;
  excludedMoves?: Resolver<Maybe<Array<ResolversTypes['Move']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  themePreference?: Resolver<ResolversTypes['ThemePreference'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  hasOnboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unitSystem?: Resolver<Maybe<ResolversTypes['UnitSystem']>, ParentType, ContextType>;
  gymProfiles?: Resolver<Maybe<Array<ResolversTypes['GymProfile']>>, ParentType, ContextType>;
  moveProfiles?: Resolver<Maybe<Array<ResolversTypes['MoveProfile']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserPublicProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPublicProfile'] = ResolversParentTypes['UserPublicProfile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  introVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagramUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tiktokUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snapUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType>;
  workoutPrograms?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgram']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserPrivateProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPrivateProfile'] = ResolversParentTypes['UserPrivateProfile']> = ResolversObject<{
  loggedWorkouts?: Resolver<Maybe<Array<ResolversTypes['LoggedWorkout']>>, ParentType, ContextType>;
  workouts?: Resolver<Maybe<Array<ResolversTypes['Workout']>>, ParentType, ContextType>;
  workoutPrograms?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgram']>>, ParentType, ContextType>;
  workoutProgramEnrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LikedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikedWorkout'] = ResolversParentTypes['LikedWorkout']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LikedWorkoutProgramResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikedWorkoutProgram'] = ResolversParentTypes['LikedWorkoutProgram']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Move'] = ResolversParentTypes['Move']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchTerms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['MoveScope'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MoveType'], ParentType, ContextType>;
  validRepTypes?: Resolver<Array<ResolversTypes['WorkoutMoveRepType']>, ParentType, ContextType>;
  requiredEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  selectableEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  bodyAreaMoveScores?: Resolver<Maybe<Array<ResolversTypes['BodyAreaMoveScore']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutType'] = ResolversParentTypes['WorkoutType']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeholderImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scoreType?: Resolver<Maybe<ResolversTypes['WorkoutScoreType']>, ParentType, ContextType>;
  workouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
}>;

export type WorkoutProgramResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgram'] = ResolversParentTypes['WorkoutProgram']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videoThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  enrolments?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramEnrolment']>>, ParentType, ContextType>;
  workoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  workoutProgramWorkouts?: Resolver<Array<ResolversTypes['WorkoutProgramWorkout']>, ParentType, ContextType>;
  workoutProgramReviews?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramReview']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutProgramWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramWorkout'] = ResolversParentTypes['WorkoutProgramWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dayNumber?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  loggedWorkout?: Resolver<Maybe<ResolversTypes['LoggedWorkout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutProgramEnrolmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramEnrolment'] = ResolversParentTypes['WorkoutProgramEnrolment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workoutProgram?: Resolver<ResolversTypes['WorkoutProgram'], ParentType, ContextType>;
  loggedWorkouts?: Resolver<Maybe<Array<ResolversTypes['LoggedWorkout']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutProgramReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutProgramReview'] = ResolversParentTypes['WorkoutProgramReview']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LoggedWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoggedWorkout'] = ResolversParentTypes['LoggedWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  workoutProgramWorkout?: Resolver<Maybe<ResolversTypes['WorkoutProgramWorkout']>, ParentType, ContextType>;
  scheduledWorkout?: Resolver<Maybe<ResolversTypes['ScheduledWorkout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ScheduledWorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduledWorkout'] = ResolversParentTypes['ScheduledWorkout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  scheduledAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  loggedWorkoutId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  gymProfileId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSection'] = ResolversParentTypes['WorkoutSection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutMoves?: Resolver<Maybe<Array<ResolversTypes['WorkoutMove']>>, ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type WorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMove'] = ResolversParentTypes['WorkoutMove']> = ResolversObject<{
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
}>;

export type BodyAreaResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyArea'] = ResolversParentTypes['BodyArea']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  altNames?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bodyAreaMoveScores?: Resolver<Array<ResolversTypes['BodyAreaMoveScore']>, ParentType, ContextType>;
  frontBack?: Resolver<ResolversTypes['BodyAreaFrontBack'], ParentType, ContextType>;
  upperLower?: Resolver<ResolversTypes['BodyAreaUpperLower'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type BodyAreaMoveScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['BodyAreaMoveScore'] = ResolversParentTypes['BodyAreaMoveScore']> = ResolversObject<{
  move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  bodyArea?: Resolver<ResolversTypes['BodyArea'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TextSearchWorkoutResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextSearchWorkoutResult'] = ResolversParentTypes['TextSearchWorkoutResult']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutType?: Resolver<ResolversTypes['WorkoutType'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TextSearchWorkoutProgramResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextSearchWorkoutProgramResult'] = ResolversParentTypes['TextSearchWorkoutProgramResult']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  workoutGoals?: Resolver<Array<ResolversTypes['WorkoutGoal']>, ParentType, ContextType>;
  workoutProgramWorkouts?: Resolver<Maybe<Array<ResolversTypes['WorkoutProgramWorkout']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  JSON?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  WorkoutGoal?: WorkoutGoalResolvers<ContextType>;
  GymProfile?: GymProfileResolvers<ContextType>;
  MoveProfile?: MoveProfileResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPublicProfile?: UserPublicProfileResolvers<ContextType>;
  UserPrivateProfile?: UserPrivateProfileResolvers<ContextType>;
  LikedWorkout?: LikedWorkoutResolvers<ContextType>;
  LikedWorkoutProgram?: LikedWorkoutProgramResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  WorkoutType?: WorkoutTypeResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutProgram?: WorkoutProgramResolvers<ContextType>;
  WorkoutProgramWorkout?: WorkoutProgramWorkoutResolvers<ContextType>;
  WorkoutProgramEnrolment?: WorkoutProgramEnrolmentResolvers<ContextType>;
  WorkoutProgramReview?: WorkoutProgramReviewResolvers<ContextType>;
  LoggedWorkout?: LoggedWorkoutResolvers<ContextType>;
  ScheduledWorkout?: ScheduledWorkoutResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
  BodyArea?: BodyAreaResolvers<ContextType>;
  BodyAreaMoveScore?: BodyAreaMoveScoreResolvers<ContextType>;
  TextSearchWorkoutResult?: TextSearchWorkoutResultResolvers<ContextType>;
  TextSearchWorkoutProgramResult?: TextSearchWorkoutProgramResultResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


import { GraphQLResolveInfo } from 'graphql';
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
};

export type Query = {
  __typename?: 'Query';
  checkUniqueDisplayName: Scalars['Boolean'];
  officialMoves: Array<Move>;
  officialEquipments: Array<Equipment>;
  officialWorkouts: Array<Workout>;
  officialWorkoutTypes: Array<WorkoutType>;
  moves: Array<Move>;
  userByUid?: Maybe<User>;
  users: Array<User>;
  workoutById?: Maybe<Workout>;
  workouts: Array<Workout>;
};


export type QueryCheckUniqueDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type QueryUserByUidArgs = {
  uid: Scalars['ID'];
};


export type QueryWorkoutByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkoutsArgs = {
  authedUserId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  createWorkout: Workout;
  deepUpdateWorkout: Workout;
  shallowUpdateWorkout: Workout;
  deleteWorkout: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  uid: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateUserInput;
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

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  moves: Array<Move>;
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

export type WorkoutType = {
  __typename?: 'WorkoutType';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  scoreType?: Maybe<WorkoutScoreType>;
  Workout: Array<Workout>;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  isCopy?: Maybe<Scalars['Boolean']>;
  demoVideoUrl?: Maybe<Scalars['String']>;
  demoVideoThumbUrl?: Maybe<Scalars['String']>;
  youtubeVideoUrl?: Maybe<Scalars['String']>;
  spotifyAudio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  workoutType: WorkoutType;
  difficultyLevel: DifficultyLevel;
  scope: AccessScopeType;
  workoutSections: Array<WorkoutSection>;
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
  difficultyLevel: DifficultyLevel;
  scope: AccessScopeType;
  workoutSections: Array<CreateWorkoutSectionInput>;
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
  difficultyLevel?: Maybe<DifficultyLevel>;
  scope?: Maybe<AccessScopeType>;
  workoutSections: Array<CreateWorkoutSectionInput>;
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
  workoutTypeId?: Maybe<Scalars['String']>;
  difficultyLevel?: Maybe<DifficultyLevel>;
  scope?: Maybe<AccessScopeType>;
};

export type WorkoutSection = {
  __typename?: 'WorkoutSection';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  isPyramid?: Maybe<Scalars['Boolean']>;
  timecap?: Maybe<Scalars['Int']>;
  rounds: Scalars['Int'];
  pyramidStructure?: Maybe<Array<Scalars['Int']>>;
  isTabata?: Maybe<Scalars['Boolean']>;
  sortPosition: Scalars['Int'];
  workoutMoves?: Maybe<Array<WorkoutMove>>;
  workout: Workout;
};

export type CreateWorkoutSectionInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  timecap?: Maybe<Scalars['Int']>;
  sortPosition?: Maybe<Scalars['Int']>;
  isPyramid?: Maybe<Scalars['Boolean']>;
  pyramidStructure?: Maybe<Array<Scalars['Int']>>;
  isTabata?: Maybe<Scalars['Boolean']>;
  rounds?: Maybe<Scalars['Int']>;
  workoutMoves: Array<CreateWorkoutMoveInput>;
};

export type WorkoutMove = {
  __typename?: 'WorkoutMove';
  id: Scalars['ID'];
  repType: Scalars['String'];
  sortPosition: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  reps: Scalars['Float'];
  loadAmountKgs?: Maybe<Scalars['Float']>;
  distanceUnit?: Maybe<DistanceUnit>;
  move: Move;
  selectedEquipment?: Maybe<Equipment>;
};

export type CreateWorkoutMoveInput = {
  id?: Maybe<Scalars['ID']>;
  loadAmountKgs: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  reps: Scalars['Float'];
  repType: WorkoutMoveRepType;
  distanceUnit?: Maybe<DistanceUnit>;
  sortPosition?: Maybe<Scalars['Int']>;
  selectedEquipmentId?: Maybe<Scalars['String']>;
  moveId: Scalars['String'];
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
  gymBox?: Maybe<Scalars['String']>;
  hasOnboarded: Scalars['Boolean'];
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  unitSystem?: Maybe<UnitSystem>;
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

/** Enums */
export enum AccessScopeType {
  Official = 'OFFICIAL',
  Public = 'PUBLIC',
  Group = 'GROUP',
  Private = 'PRIVATE'
}

export enum UserSubscriptionLevel {
  Free = 'FREE',
  Paid = 'PAID'
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Unspecified = 'UNSPECIFIED'
}

export enum DifficultyLevel {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR'
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

export enum UnitSystem {
  Imperial = 'IMPERIAL',
  Metric = 'METRIC'
}

export enum DistanceUnit {
  Metres = 'METRES',
  Kilometres = 'KILOMETRES',
  Yards = 'YARDS',
  Miles = 'MILES'
}

export enum ThemePreference {
  Dark = 'DARK',
  Light = 'LIGHT'
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
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Equipment: ResolverTypeWrapper<Equipment>;
  Move: ResolverTypeWrapper<Move>;
  WorkoutType: ResolverTypeWrapper<WorkoutType>;
  Workout: ResolverTypeWrapper<Workout>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateWorkoutInput: CreateWorkoutInput;
  DeepUpdateWorkoutInput: DeepUpdateWorkoutInput;
  ShallowUpdateWorkoutInput: ShallowUpdateWorkoutInput;
  WorkoutSection: ResolverTypeWrapper<WorkoutSection>;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  WorkoutMove: ResolverTypeWrapper<WorkoutMove>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  User: ResolverTypeWrapper<User>;
  UpdateUserInput: UpdateUserInput;
  AccessScopeType: AccessScopeType;
  UserSubscriptionLevel: UserSubscriptionLevel;
  Gender: Gender;
  DifficultyLevel: DifficultyLevel;
  WorkoutMoveRepType: WorkoutMoveRepType;
  WorkoutScoreType: WorkoutScoreType;
  UnitSystem: UnitSystem;
  DistanceUnit: DistanceUnit;
  ThemePreference: ThemePreference;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  ID: Scalars['ID'];
  Mutation: {};
  Equipment: Equipment;
  Move: Move;
  WorkoutType: WorkoutType;
  Workout: Workout;
  Int: Scalars['Int'];
  CreateWorkoutInput: CreateWorkoutInput;
  DeepUpdateWorkoutInput: DeepUpdateWorkoutInput;
  ShallowUpdateWorkoutInput: ShallowUpdateWorkoutInput;
  WorkoutSection: WorkoutSection;
  CreateWorkoutSectionInput: CreateWorkoutSectionInput;
  WorkoutMove: WorkoutMove;
  Float: Scalars['Float'];
  CreateWorkoutMoveInput: CreateWorkoutMoveInput;
  User: User;
  UpdateUserInput: UpdateUserInput;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkUniqueDisplayName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueDisplayNameArgs, 'displayName'>>;
  officialMoves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  officialEquipments?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  officialWorkouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  officialWorkoutTypes?: Resolver<Array<ResolversTypes['WorkoutType']>, ParentType, ContextType>;
  moves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
  userByUid?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUidArgs, 'uid'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  workoutById?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryWorkoutByIdArgs, 'id'>>;
  workouts?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<QueryWorkoutsArgs, 'authedUserId'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'uid'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'data'>>;
  createWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'authedUserId' | 'workoutData'>>;
  deepUpdateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationDeepUpdateWorkoutArgs, 'authedUserId' | 'workoutData'>>;
  shallowUpdateWorkout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType, RequireFields<MutationShallowUpdateWorkoutArgs, 'authedUserId' | 'workoutData'>>;
  deleteWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutArgs, 'authedUserId' | 'workoutId'>>;
};

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moves?: Resolver<Array<ResolversTypes['Move']>, ParentType, ContextType>;
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

export type WorkoutTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutType'] = ResolversParentTypes['WorkoutType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scoreType?: Resolver<Maybe<ResolversTypes['WorkoutScoreType']>, ParentType, ContextType>;
  Workout?: Resolver<Array<ResolversTypes['Workout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isCopy?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  demoVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  demoVideoThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtubeVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spotifyAudio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutType?: Resolver<ResolversTypes['WorkoutType'], ParentType, ContextType>;
  difficultyLevel?: Resolver<ResolversTypes['DifficultyLevel'], ParentType, ContextType>;
  scope?: Resolver<ResolversTypes['AccessScopeType'], ParentType, ContextType>;
  workoutSections?: Resolver<Array<ResolversTypes['WorkoutSection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSection'] = ResolversParentTypes['WorkoutSection']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isPyramid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  timecap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pyramidStructure?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  isTabata?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workoutMoves?: Resolver<Maybe<Array<ResolversTypes['WorkoutMove']>>, ParentType, ContextType>;
  workout?: Resolver<ResolversTypes['Workout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WorkoutMoveResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutMove'] = ResolversParentTypes['WorkoutMove']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  repType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sortPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reps?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  loadAmountKgs?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  distanceUnit?: Resolver<Maybe<ResolversTypes['DistanceUnit']>, ParentType, ContextType>;
  move?: Resolver<ResolversTypes['Move'], ParentType, ContextType>;
  selectedEquipment?: Resolver<Maybe<ResolversTypes['Equipment']>, ParentType, ContextType>;
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
  gymBox?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasOnboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unitSystem?: Resolver<Maybe<ResolversTypes['UnitSystem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  Move?: MoveResolvers<ContextType>;
  WorkoutType?: WorkoutTypeResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutSection?: WorkoutSectionResolvers<ContextType>;
  WorkoutMove?: WorkoutMoveResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


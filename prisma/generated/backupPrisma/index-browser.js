
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.28.0
 * Query Engine version: 89facabd0366f63911d089156a7a70125bfbcd27
 */
Prisma.prismaVersion = {
  client: "2.28.0",
  engine: "89facabd0366f63911d089156a7a70125bfbcd27"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AdminScalarFieldEnum = makeEnum({
  id: 'id',
  firebaseUid: 'firebaseUid',
  createdAt: 'createdAt',
  username: 'username'
});

exports.Prisma.BodyAreaScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  altNames: 'altNames',
  frontBack: 'frontBack',
  upperLower: 'upperLower'
});

exports.Prisma.BodyAreaMoveScoreScalarFieldEnum = makeEnum({
  createdAt: 'createdAt',
  moveId: 'moveId',
  bodyAreaId: 'bodyAreaId',
  score: 'score'
});

exports.Prisma.EquipmentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  altNames: 'altNames',
  imageUrl: 'imageUrl',
  loadAdjustable: 'loadAdjustable'
});

exports.Prisma.MoveScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  archived: 'archived',
  userId: 'userId',
  scope: 'scope',
  name: 'name',
  searchTerms: 'searchTerms',
  description: 'description',
  demoVideoUri: 'demoVideoUri',
  demoVideoThumbUri: 'demoVideoThumbUri',
  validRepTypes: 'validRepTypes',
  moveTypeId: 'moveTypeId'
});

exports.Prisma.MoveTypeScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  description: 'description',
  imageUri: 'imageUri'
});

exports.Prisma.WorkoutGoalScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  description: 'description',
  hexColor: 'hexColor'
});

exports.Prisma.WorkoutSectionTypeScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  subtitle: 'subtitle',
  description: 'description',
  validRepTypes: 'validRepTypes'
});

exports.Prisma.CollectionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description'
});

exports.Prisma.GymProfileScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description'
});

exports.Prisma.ScheduledWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  note: 'note',
  scheduledAt: 'scheduledAt',
  gymProfileId: 'gymProfileId',
  loggedWorkoutId: 'loggedWorkoutId',
  workoutId: 'workoutId',
  workoutPlanEnrolmentId: 'workoutPlanEnrolmentId',
  workoutPlanDayWorkoutId: 'workoutPlanDayWorkoutId'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  firebaseUid: 'firebaseUid',
  createdAt: 'createdAt',
  hasOnboarded: 'hasOnboarded',
  userProfileScope: 'userProfileScope',
  avatarUri: 'avatarUri',
  introVideoUri: 'introVideoUri',
  introVideoThumbUri: 'introVideoThumbUri',
  displayName: 'displayName',
  firstname: 'firstname',
  lastname: 'lastname',
  bio: 'bio',
  tagline: 'tagline',
  birthdate: 'birthdate',
  gender: 'gender',
  townCity: 'townCity',
  countryCode: 'countryCode',
  instagramUrl: 'instagramUrl',
  tiktokUrl: 'tiktokUrl',
  youtubeUrl: 'youtubeUrl',
  snapUrl: 'snapUrl',
  linkedinUrl: 'linkedinUrl'
});

exports.Prisma.UserBenchmarkGroupScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description'
});

exports.Prisma.UserBenchmarkScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  lastEntryAt: 'lastEntryAt',
  userId: 'userId',
  name: 'name',
  description: 'description',
  reps: 'reps',
  repType: 'repType',
  load: 'load',
  loadUnit: 'loadUnit',
  distanceUnit: 'distanceUnit',
  timeUnit: 'timeUnit',
  equipmentId: 'equipmentId',
  moveId: 'moveId',
  benchmarkType: 'benchmarkType'
});

exports.Prisma.UserBenchmarkEntryScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  completedOn: 'completedOn',
  score: 'score',
  note: 'note',
  videoUri: 'videoUri',
  videoThumbUri: 'videoThumbUri',
  userBenchmarkId: 'userBenchmarkId'
});

exports.Prisma.WorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  archived: 'archived',
  userId: 'userId',
  name: 'name',
  description: 'description',
  metaData: 'metaData',
  introVideoUri: 'introVideoUri',
  introVideoThumbUri: 'introVideoThumbUri',
  introAudioUri: 'introAudioUri',
  coverImageUri: 'coverImageUri',
  lengthMinutes: 'lengthMinutes',
  difficultyLevel: 'difficultyLevel',
  contentAccessScope: 'contentAccessScope'
});

exports.Prisma.WorkoutTagScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  tag: 'tag'
});

exports.Prisma.WorkoutSectionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  archived: 'archived',
  userId: 'userId',
  name: 'name',
  note: 'note',
  rounds: 'rounds',
  timecap: 'timecap',
  sortPosition: 'sortPosition',
  introVideoUri: 'introVideoUri',
  introVideoThumbUri: 'introVideoThumbUri',
  introAudioUri: 'introAudioUri',
  classVideoUri: 'classVideoUri',
  classVideoThumbUri: 'classVideoThumbUri',
  classAudioUri: 'classAudioUri',
  outroVideoUri: 'outroVideoUri',
  outroVideoThumbUri: 'outroVideoThumbUri',
  outroAudioUri: 'outroAudioUri',
  workoutId: 'workoutId',
  workoutSectionTypeId: 'workoutSectionTypeId'
});

exports.Prisma.WorkoutSetScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  sortPosition: 'sortPosition',
  rounds: 'rounds',
  duration: 'duration',
  workoutSectionId: 'workoutSectionId'
});

exports.Prisma.WorkoutSetIntervalBuyInScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  interval: 'interval',
  workoutMoveId: 'workoutMoveId',
  workoutSetId: 'workoutSetId'
});

exports.Prisma.WorkoutSetGeneratorScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  type: 'type',
  workoutMoveIndex: 'workoutMoveIndex',
  target: 'target',
  roundFrequency: 'roundFrequency',
  adjustAmount: 'adjustAmount',
  workoutSetId: 'workoutSetId'
});

exports.Prisma.WorkoutMoveScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  sortPosition: 'sortPosition',
  repType: 'repType',
  reps: 'reps',
  distanceUnit: 'distanceUnit',
  timeUnit: 'timeUnit',
  loadAmount: 'loadAmount',
  loadUnit: 'loadUnit',
  moveId: 'moveId',
  equipmentId: 'equipmentId',
  workoutSetId: 'workoutSetId'
});

exports.Prisma.WorkoutPlanScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  archived: 'archived',
  name: 'name',
  description: 'description',
  lengthWeeks: 'lengthWeeks',
  daysPerWeek: 'daysPerWeek',
  coverImageUri: 'coverImageUri',
  introVideoUri: 'introVideoUri',
  introVideoThumbUri: 'introVideoThumbUri',
  introAudioUri: 'introAudioUri',
  contentAccessScope: 'contentAccessScope'
});

exports.Prisma.WorkoutPlanDayScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  note: 'note',
  dayNumber: 'dayNumber',
  workoutPlanId: 'workoutPlanId'
});

exports.Prisma.WorkoutPlanDayWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  note: 'note',
  sortPosition: 'sortPosition',
  workoutId: 'workoutId',
  workoutPlanDayId: 'workoutPlanDayId'
});

exports.Prisma.WorkoutPlanEnrolmentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  startDate: 'startDate',
  completedPlanDayWorkoutIds: 'completedPlanDayWorkoutIds',
  workoutPlanId: 'workoutPlanId',
  userId: 'userId'
});

exports.Prisma.WorkoutPlanReviewScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  score: 'score',
  comment: 'comment',
  workoutPlanId: 'workoutPlanId'
});

exports.Prisma.LoggedWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  completedOn: 'completedOn',
  userId: 'userId',
  name: 'name',
  note: 'note',
  gymProfileId: 'gymProfileId',
  workoutId: 'workoutId'
});

exports.Prisma.LoggedWorkoutSectionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  note: 'note',
  timecap: 'timecap',
  sortPosition: 'sortPosition',
  timeTakenMs: 'timeTakenMs',
  lapTimesMs: 'lapTimesMs',
  repScore: 'repScore',
  loggedWorkoutId: 'loggedWorkoutId',
  workoutSectionTypeId: 'workoutSectionTypeId'
});

exports.Prisma.LoggedWorkoutSetScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  note: 'note',
  roundNumber: 'roundNumber',
  sortPosition: 'sortPosition',
  duration: 'duration',
  roundsCompleted: 'roundsCompleted',
  loggedWorkoutSectionId: 'loggedWorkoutSectionId'
});

exports.Prisma.LoggedWorkoutMoveScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  sortPosition: 'sortPosition',
  repType: 'repType',
  reps: 'reps',
  distance: 'distance',
  distanceUnit: 'distanceUnit',
  loadAmount: 'loadAmount',
  loadUnit: 'loadUnit',
  timeUnit: 'timeUnit',
  moveId: 'moveId',
  equipmentId: 'equipmentId',
  loggedWorkoutSetId: 'loggedWorkoutSetId'
});

exports.Prisma.ProgressJournalScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description'
});

exports.Prisma.ProgressJournalEntryScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  note: 'note',
  voiceNoteUri: 'voiceNoteUri',
  bodyweight: 'bodyweight',
  bodyweightUnit: 'bodyweightUnit',
  moodScore: 'moodScore',
  energyScore: 'energyScore',
  stressScore: 'stressScore',
  motivationScore: 'motivationScore',
  progressPhotoUris: 'progressPhotoUris',
  progressJournalId: 'progressJournalId'
});

exports.Prisma.ProgressJournalGoalScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description',
  deadline: 'deadline',
  completedDate: 'completedDate',
  progressJournalId: 'progressJournalId'
});

exports.Prisma.ProgressJournalGoalTagScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  tag: 'tag',
  hexColor: 'hexColor',
  userId: 'userId'
});

exports.Prisma.DiscoverFeaturedScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  tag: 'tag',
  name: 'name',
  tagline: 'tagline',
  description: 'description',
  coverImageUri: 'coverImageUri'
});

exports.Prisma.DiscoverWorkoutCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  active: 'active',
  name: 'name',
  tagline: 'tagline',
  description: 'description',
  coverImageUri: 'coverImageUri'
});

exports.Prisma.DiscoverWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  workoutId: 'workoutId',
  discoverWorkoutCategoryId: 'discoverWorkoutCategoryId'
});

exports.Prisma.DiscoverWorkoutPlanCategoryScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  active: 'active',
  name: 'name',
  tagline: 'tagline',
  description: 'description',
  coverImageUri: 'coverImageUri'
});

exports.Prisma.DiscoverWorkoutPlanScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  workoutPlanId: 'workoutPlanId',
  discoverWorkoutPlanCategoryId: 'discoverWorkoutPlanCategoryId'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.BodyAreaFrontBack = makeEnum({
  BACK: 'BACK',
  FRONT: 'FRONT',
  BOTH: 'BOTH'
});

exports.BodyAreaUpperLower = makeEnum({
  CORE: 'CORE',
  LOWER: 'LOWER',
  UPPER: 'UPPER'
});

exports.MoveScope = makeEnum({
  STANDARD: 'STANDARD',
  CUSTOM: 'CUSTOM'
});

exports.WorkoutMoveRepType = makeEnum({
  REPS: 'REPS',
  CALORIES: 'CALORIES',
  DISTANCE: 'DISTANCE',
  TIME: 'TIME'
});

exports.UserProfileScope = makeEnum({
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC'
});

exports.Gender = makeEnum({
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  NONBINARY: 'NONBINARY',
  NONE: 'NONE'
});

exports.LoadUnit = makeEnum({
  KG: 'KG',
  LB: 'LB',
  BODYWEIGHTPERCENT: 'BODYWEIGHTPERCENT',
  PERCENTMAX: 'PERCENTMAX'
});

exports.DistanceUnit = makeEnum({
  METRES: 'METRES',
  KILOMETRES: 'KILOMETRES',
  YARDS: 'YARDS',
  MILES: 'MILES'
});

exports.TimeUnit = makeEnum({
  HOURS: 'HOURS',
  MINUTES: 'MINUTES',
  SECONDS: 'SECONDS'
});

exports.BenchmarkType = makeEnum({
  MAXLOAD: 'MAXLOAD',
  FASTESTTIME: 'FASTESTTIME',
  UNBROKENREPS: 'UNBROKENREPS',
  UNBROKENTIME: 'UNBROKENTIME'
});

exports.DifficultyLevel = makeEnum({
  LIGHT: 'LIGHT',
  CHALLENGING: 'CHALLENGING',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  ELITE: 'ELITE'
});

exports.ContentAccessScope = makeEnum({
  PUBLIC: 'PUBLIC',
  GROUP: 'GROUP',
  PRIVATE: 'PRIVATE'
});

exports.WorkoutSetGeneratorType = makeEnum({
  LADDERUP: 'LADDERUP',
  LADDERDOWN: 'LADDERDOWN',
  PYRAMIDUP: 'PYRAMIDUP',
  PYRAMIDDOWN: 'PYRAMIDDOWN'
});

exports.WorkoutSetGeneratorTarget = makeEnum({
  REPS: 'REPS',
  LOAD: 'LOAD'
});

exports.BodyweightUnit = makeEnum({
  KG: 'KG',
  LB: 'LB'
});

exports.Prisma.ModelName = makeEnum({
  Admin: 'Admin',
  BodyArea: 'BodyArea',
  BodyAreaMoveScore: 'BodyAreaMoveScore',
  Equipment: 'Equipment',
  Move: 'Move',
  MoveType: 'MoveType',
  WorkoutGoal: 'WorkoutGoal',
  WorkoutSectionType: 'WorkoutSectionType',
  Collection: 'Collection',
  GymProfile: 'GymProfile',
  ScheduledWorkout: 'ScheduledWorkout',
  User: 'User',
  UserBenchmarkGroup: 'UserBenchmarkGroup',
  UserBenchmark: 'UserBenchmark',
  UserBenchmarkEntry: 'UserBenchmarkEntry',
  Workout: 'Workout',
  WorkoutTag: 'WorkoutTag',
  WorkoutSection: 'WorkoutSection',
  WorkoutSet: 'WorkoutSet',
  WorkoutSetIntervalBuyIn: 'WorkoutSetIntervalBuyIn',
  WorkoutSetGenerator: 'WorkoutSetGenerator',
  WorkoutMove: 'WorkoutMove',
  WorkoutPlan: 'WorkoutPlan',
  WorkoutPlanDay: 'WorkoutPlanDay',
  WorkoutPlanDayWorkout: 'WorkoutPlanDayWorkout',
  WorkoutPlanEnrolment: 'WorkoutPlanEnrolment',
  WorkoutPlanReview: 'WorkoutPlanReview',
  LoggedWorkout: 'LoggedWorkout',
  LoggedWorkoutSection: 'LoggedWorkoutSection',
  LoggedWorkoutSet: 'LoggedWorkoutSet',
  LoggedWorkoutMove: 'LoggedWorkoutMove',
  ProgressJournal: 'ProgressJournal',
  ProgressJournalEntry: 'ProgressJournalEntry',
  ProgressJournalGoal: 'ProgressJournalGoal',
  ProgressJournalGoalTag: 'ProgressJournalGoalTag',
  DiscoverFeatured: 'DiscoverFeatured',
  DiscoverWorkoutCategory: 'DiscoverWorkoutCategory',
  DiscoverWorkout: 'DiscoverWorkout',
  DiscoverWorkoutPlanCategory: 'DiscoverWorkoutPlanCategory',
  DiscoverWorkoutPlan: 'DiscoverWorkoutPlan'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

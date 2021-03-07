
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  warnEnvConflicts,
  getPrismaClient,
  debugLib,
  sqltag,
  empty,
  join,
  raw,
  Decimal
} = require('./runtime')

const path = require('path')
const debug = debugLib('prisma-client')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.17.0
 * Query Engine version: 3c463ebd78b1d21d8fdacdd27899e280cf686223
 */
Prisma.prismaVersion = {
  client: "2.17.0",
  engine: "3c463ebd78b1d21d8fdacdd27899e280cf686223"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


const dirnamePolyfill = path.join(process.cwd(), "prisma/generated/backupPrisma")
const dirname = __dirname.length === 1 ? dirnamePolyfill : __dirname

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

exports.Prisma.GymProfileScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description',
  postcode: 'postcode',
  bodyweightOnly: 'bodyweightOnly'
});

exports.Prisma.LoggedWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  summary: 'summary',
  description: 'description',
  createdAt: 'createdAt',
  completedOn: 'completedOn',
  completedById: 'completedById',
  notes: 'notes',
  videoUrl: 'videoUrl',
  videoThumbUrl: 'videoThumbUrl',
  imageUrl: 'imageUrl',
  duration: 'duration',
  workoutTypeId: 'workoutTypeId',
  originalWorkoutId: 'originalWorkoutId',
  scheduledWorkoutId: 'scheduledWorkoutId',
  gymProfileId: 'gymProfileId',
  workoutProgramEnrolmentId: 'workoutProgramEnrolmentId',
  workoutProgramWorkoutId: 'workoutProgramWorkoutId'
});

exports.Prisma.MoveScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  archived: 'archived',
  createdById: 'createdById',
  scope: 'scope',
  name: 'name',
  searchTerms: 'searchTerms',
  description: 'description',
  demoVideoUrl: 'demoVideoUrl',
  demoVideoThumbUrl: 'demoVideoThumbUrl',
  moveTypeId: 'moveTypeId',
  validRepTypes: 'validRepTypes'
});

exports.Prisma.MoveProfileScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description'
});

exports.Prisma.MoveTypeScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl'
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
  notes: 'notes',
  voiceNoteUrl: 'voiceNoteUrl',
  bodyweight: 'bodyweight',
  moodScore: 'moodScore',
  energyScore: 'energyScore',
  stressScore: 'stressScore',
  motivationScore: 'motivationScore',
  progressPhotoUrls: 'progressPhotoUrls',
  progressJournalId: 'progressJournalId'
});

exports.Prisma.ProgressJournalGoalScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
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

exports.Prisma.ScheduledWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  notes: 'notes',
  scheduledAt: 'scheduledAt',
  workoutId: 'workoutId',
  loggedWorkoutId: 'loggedWorkoutId',
  gymProfileId: 'gymProfileId'
});

exports.Prisma.TrainerAccountScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  firebaseUid: 'firebaseUid',
  createdAt: 'createdAt',
  hasOnboarded: 'hasOnboarded',
  userProfileScope: 'userProfileScope',
  avatarUrl: 'avatarUrl',
  introVideoUrl: 'introVideoUrl',
  introVideoThumbUrl: 'introVideoThumbUrl',
  coverImageUrl: 'coverImageUrl',
  displayName: 'displayName',
  firstname: 'firstname',
  lastname: 'lastname',
  themePreference: 'themePreference',
  bio: 'bio',
  tagline: 'tagline',
  birthdate: 'birthdate',
  gender: 'gender',
  height: 'height',
  weight: 'weight',
  townCity: 'townCity',
  countryCode: 'countryCode',
  instagramUrl: 'instagramUrl',
  tiktokUrl: 'tiktokUrl',
  youtubeUrl: 'youtubeUrl',
  snapUrl: 'snapUrl',
  linkedinUrl: 'linkedinUrl',
  unitSystem: 'unitSystem'
});

exports.Prisma.UserBenchmarkScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  createdById: 'createdById',
  name: 'name',
  description: 'description',
  reps: 'reps',
  repType: 'repType',
  load: 'load',
  loadUnit: 'loadUnit',
  distanceUnit: 'distanceUnit',
  scoreType: 'scoreType',
  moveId: 'moveId'
});

exports.Prisma.UserBenchmarkEntryScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  score: 'score',
  notes: 'notes',
  videoUrl: 'videoUrl',
  imageUrl: 'imageUrl',
  userBenchmarkId: 'userBenchmarkId'
});

exports.Prisma.UserCollectionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  name: 'name',
  description: 'description'
});

exports.Prisma.WorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  createdById: 'createdById',
  name: 'name',
  summary: 'summary',
  description: 'description',
  demoVideoUrl: 'demoVideoUrl',
  demoVideoThumbUrl: 'demoVideoThumbUrl',
  youtubeVideoUrl: 'youtubeVideoUrl',
  spotifyAudio: 'spotifyAudio',
  imageUrl: 'imageUrl',
  timecap: 'timecap',
  builderData: 'builderData',
  difficultyLevel: 'difficultyLevel',
  scope: 'scope',
  workoutTypeId: 'workoutTypeId'
});

exports.Prisma.WorkoutGoalScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  description: 'description',
  placeholderImageUrl: 'placeholderImageUrl'
});

exports.Prisma.WorkoutMoveScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  sortPosition: 'sortPosition',
  repType: 'repType',
  reps: 'reps',
  distanceUnit: 'distanceUnit',
  loadAmount: 'loadAmount',
  loadUnit: 'loadUnit',
  duration: 'duration',
  description: 'description',
  notes: 'notes',
  moveId: 'moveId',
  selectedEquipmentId: 'selectedEquipmentId',
  workoutSectionId: 'workoutSectionId'
});

exports.Prisma.WorkoutProgramScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl',
  videoUrl: 'videoUrl',
  videoThumbUrl: 'videoThumbUrl',
  youtubeVideoUrl: 'youtubeVideoUrl',
  scope: 'scope',
  createdById: 'createdById'
});

exports.Prisma.WorkoutProgramEnrolmentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  startDate: 'startDate',
  workoutProgramId: 'workoutProgramId',
  userId: 'userId'
});

exports.Prisma.WorkoutProgramReviewScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  score: 'score',
  comment: 'comment',
  workoutProgramId: 'workoutProgramId',
  userId: 'userId'
});

exports.Prisma.WorkoutProgramWorkoutScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  dayNumber: 'dayNumber',
  notes: 'notes',
  workoutProgramId: 'workoutProgramId',
  workoutId: 'workoutId'
});

exports.Prisma.WorkoutSectionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  sortPosition: 'sortPosition',
  notes: 'notes',
  timecap: 'timecap',
  duration: 'duration',
  rounds: 'rounds',
  workoutId: 'workoutId',
  loggedWorkoutId: 'loggedWorkoutId'
});

exports.Prisma.WorkoutTypeScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  subtitle: 'subtitle',
  description: 'description',
  placeholderImageUrl: 'placeholderImageUrl',
  scoreType: 'scoreType'
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

exports.ThemePreference = makeEnum({
  DARK: 'DARK',
  LIGHT: 'LIGHT'
});

exports.Gender = makeEnum({
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNSPECIFIED: 'UNSPECIFIED'
});

exports.UnitSystem = makeEnum({
  IMPERIAL: 'IMPERIAL',
  METRIC: 'METRIC'
});

exports.LoadUnit = makeEnum({
  KG: 'KG',
  LB: 'LB',
  BODYWEIGHTPERCENT: 'BODYWEIGHTPERCENT'
});

exports.DistanceUnit = makeEnum({
  METRES: 'METRES',
  KILOMETRES: 'KILOMETRES',
  YARDS: 'YARDS',
  MILES: 'MILES'
});

exports.BenchmarkScoreType = makeEnum({
  LOAD: 'LOAD',
  REPS: 'REPS',
  TIME: 'TIME'
});

exports.ContentAccessScope = makeEnum({
  OFFICIAL: 'OFFICIAL',
  PUBLIC: 'PUBLIC',
  GROUP: 'GROUP',
  PRIVATE: 'PRIVATE'
});

exports.WorkoutScoreType = makeEnum({
  AMREPS: 'AMREPS',
  FORTIME: 'FORTIME',
  FORLOAD: 'FORLOAD'
});

exports.Prisma.ModelName = makeEnum({
  Admin: 'Admin',
  BodyArea: 'BodyArea',
  BodyAreaMoveScore: 'BodyAreaMoveScore',
  Equipment: 'Equipment',
  GymProfile: 'GymProfile',
  LoggedWorkout: 'LoggedWorkout',
  Move: 'Move',
  MoveProfile: 'MoveProfile',
  MoveType: 'MoveType',
  ProgressJournal: 'ProgressJournal',
  ProgressJournalEntry: 'ProgressJournalEntry',
  ProgressJournalGoal: 'ProgressJournalGoal',
  ProgressJournalGoalTag: 'ProgressJournalGoalTag',
  ScheduledWorkout: 'ScheduledWorkout',
  TrainerAccount: 'TrainerAccount',
  User: 'User',
  UserBenchmark: 'UserBenchmark',
  UserBenchmarkEntry: 'UserBenchmarkEntry',
  UserCollection: 'UserCollection',
  Workout: 'Workout',
  WorkoutGoal: 'WorkoutGoal',
  WorkoutMove: 'WorkoutMove',
  WorkoutProgram: 'WorkoutProgram',
  WorkoutProgramEnrolment: 'WorkoutProgramEnrolment',
  WorkoutProgramReview: 'WorkoutProgramReview',
  WorkoutProgramWorkout: 'WorkoutProgramWorkout',
  WorkoutSection: 'WorkoutSection',
  WorkoutType: 'WorkoutType'
});


/**
 * DMMF
 */

// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */

const config = {
  "generator": {
    "name": "client",
    "provider": "prisma-client-js",
    "output": "/Users/richbeans/MyFiles/FitnessApps/Apps/benchmarkme-api/prisma/generated/backupPrisma",
    "binaryTargets": [],
    "previewFeatures": [],
    "config": {},
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../.env"
  },
  "sqliteDatasourceOverrides": [],
  "relativePath": "../..",
  "clientVersion": "2.17.0",
  "engineVersion": "3c463ebd78b1d21d8fdacdd27899e280cf686223",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql"
}
config.document = dmmf
config.dirname = dirname

/**
 * Only for env conflict warning
 * loading of env variable occurs in getPrismaClient
 */
const envPaths = {
  rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
  schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
}
warnEnvConflicts(envPaths)

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

/**
 * Build tool annotations
 * In order to make `ncc` and `@vercel/nft` happy.
 * The process.cwd() annotation is only needed for https://github.com/vercel/vercel/tree/master/packages/now-next
**/
path.join(__dirname, 'query-engine-darwin');
path.join(process.cwd(), './prisma/generated/backupPrisma/query-engine-darwin');

/**
 * Annotation for `@vercel/nft`
 * The process.cwd() annotation is only needed for https://github.com/vercel/vercel/tree/master/packages/now-next
**/
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), './prisma/generated/backupPrisma/schema.prisma');
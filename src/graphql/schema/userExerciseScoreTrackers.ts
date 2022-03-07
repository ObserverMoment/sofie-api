import { gql } from 'apollo-server-express'

/// Models that a user can use to track their personal bests / scores for both exercises (1 rep max etc) and for scored workouts (AMRAPS).
export default gql`
  type UserMaxLoadExerciseTracker {
    id: ID!
    createdAt: DateTime!
    reps: Int!
    loadUnit: LoadUnit!
    Move: Move!
    Equipment: Equipment
    ManualEntries: [UserMaxLoadTrackerManualEntry!]!
  }

  input CreateUserMaxLoadExerciseTrackerInput {
    reps: Int!
    loadUnit: LoadUnit!
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }

  type UserFastestTimeExerciseTracker {
    id: ID!
    createdAt: DateTime!
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit!
    loadAmount: Float!
    loadUnit: LoadUnit!
    Move: Move!
    Equipment: Equipment
    ManualEntries: [UserFastestTimeTrackerManualEntry!]!
  }

  input CreateUserFastestTimeExerciseTrackerInput {
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit!
    loadAmount: Float!
    loadUnit: LoadUnit!
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }

  type UserMaxUnbrokenExerciseTracker {
    id: ID!
    createdAt: DateTime!
    # When repType is TIME - scores are logged as / converted to milliseconds.
    # When repType is DISTANCE - scores are logged as distanceUnit.
    repType: WorkoutMoveRepType!
    loadAmount: Float!
    loadUnit: LoadUnit!
    distanceUnit: DistanceUnit!
    Move: Move!
    Equipment: Equipment
    ManualEntries: [UserMaxUnbrokenTrackerManualEntry!]!
  }

  input CreateUserMaxUnbrokenExerciseTrackerInput {
    # When repType is TIME - scores are logged as / converted to milliseconds.
    # When repType is DISTANCE - scores are logged as distanceUnit.
    repType: WorkoutMoveRepType!
    loadAmount: Float!
    loadUnit: LoadUnit!
    distanceUnit: DistanceUnit!
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }

  # Generally, exercise tracking widgets auto calc best scores based on user's log history.
  # However, users can also add manual entries which will be included in the generated PB reports.
  # They can add scores achieved outside of the app / not in a workout setting.
  type UserMaxLoadTrackerManualEntry {
    id: ID!
    createdAt: DateTime!
    completedOn: DateTime!
    loadAmount: Float!
    videoUri: String
    videoThumbUri: String
  }

  input CreateUserMaxLoadTrackerManualEntryInput {
    completedOn: DateTime!
    loadAmount: Float!
    videoUri: String
    videoThumbUri: String
    UserMaxLoadExerciseTracker: ConnectRelationInput!
  }

  type UserFastestTimeTrackerManualEntry {
    id: ID!
    createdAt: DateTime!
    completedOn: DateTime!
    timeTakenMs: Int!
    videoUri: String
    videoThumbUri: String
  }

  input CreateUserFastestTimeTrackerManualEntryInput {
    completedOn: DateTime!
    timeTakenMs: Int!
    videoUri: String
    videoThumbUri: String
    UserFastestTimeExerciseTracker: ConnectRelationInput!
  }

  type UserMaxUnbrokenTrackerManualEntry {
    id: ID!
    createdAt: DateTime!
    completedOn: DateTime!
    # Could be REPS, CALS, METRES or MILLISECONDS depending on the parent tracker repType settings.
    score: Int!
    videoUri: String
    videoThumbUri: String
  }

  input CreateUserMaxUnbrokenTrackerManualEntryInput {
    completedOn: DateTime!
    # Could be REPS, CALS, METRES or MILLISECONDS depending on the parent tracker repType settings.
    score: Int!
    videoUri: String
    videoThumbUri: String
    UserMaxUnbrokenExerciseTracker: ConnectRelationInput!
  }
`

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
    ExerciseTrackerManualEntries: [ExerciseTrackerManualEntry!]!
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
    ExerciseTrackerManualEntries: [ExerciseTrackerManualEntry!]!
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
    # When this is TIME - scores are logged as / converted to milliseconds. So no TimeUnit field is required on this model.
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit!
    loadAmount: Float!
    loadUnit: LoadUnit!
    Move: Move!
    Equipment: Equipment
    ExerciseTrackerManualEntries: [ExerciseTrackerManualEntry!]!
  }

  input CreateUserMaxUnbrokenExerciseTrackerInput {
    # When this is TIME - scores are logged as / converted to milliseconds. So no TimeUnit field is required on this model.
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit!
    loadAmount: Float!
    loadUnit: LoadUnit!
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }

  # Generally, exercise tracking widgets auto calc best scores based on user's log history.
  # However, users can also add manual entries which will be included in the generated PB reports.
  # They can add scores achieved outside of the app / not in a workout setting.
  type ExerciseTrackerManualEntry {
    id: ID!
    createdAt: DateTime!
    completedOn: DateTime!
    score: Float! # Will represent milliseconds, reps, cals or whatever the specified distance Unit of the parent tracker has been set as.
    videoUri: String
    videoThumbUri: String
  }

  input CreateExerciseTrackerManualEntryInput {
    completedOn: DateTime!
    # Will represent milliseconds, reps, cals or whatever the specified distance Unit of the parent tracker has been set as.
    score: Float!
    videoUri: String
    videoThumbUri: String
    # Attach to a parent tracker. Only one of these (XOR) should ever be present.
    UserMaxLoadExerciseTracker: ConnectRelationInput
    UserFastestTimeExerciseTracker: ConnectRelationInput
    UserMaxUnbrokenExerciseTracker: ConnectRelationInput
  }
`

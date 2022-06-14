import { gql } from 'apollo-server-express'

export default gql`
  ###### DEPRECATED ######
  # All their created and saved workouts of all types.
  type UserWorkoutSessions {
    ResistanceWorkouts: [ResistanceWorkout!]!
    SavedResistanceWorkouts: [ResistanceWorkout!]!
    CardioWorkouts: [CardioWorkout!]!
    SavedCardioWorkouts: [CardioWorkout!]!
    AmrapWorkouts: [AmrapWorkout!]!
    SavedAmrapWorkouts: [AmrapWorkout!]!
    ForTimeWorkouts: [ForTimeWorkout!]!
    SavedForTimeWorkouts: [ForTimeWorkout!]!
    IntervalWorkouts: [IntervalWorkout!]!
    SavedIntervalWorkouts: [IntervalWorkout!]!
    MobilityWorkouts: [MobilityWorkout!]!
    SavedMobilityWorkouts: [MobilityWorkout!]!
  }

  ###### DEPRECATED ######
  type WorkoutSession {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String
    introVideoUri: String
    introAudioUri: String
    coverImageUri: String
    introVideoThumbUri: String
    tags: [String!]!
    archived: Boolean!
    childrenOrder: [String!]!
    CardioWorkouts: [CardioWorkout!]!
    ResistanceWorkouts: [ResistanceWorkout!]!
    IntervalWorkouts: [IntervalWorkout!]!
    MobilityWorkouts: [MobilityWorkout!]!
    AmrapWorkouts: [AmrapWorkout!]!
    ForTimeWorkouts: [ForTimeWorkout!]!
    User: UserAvatarData!
  }

  # Just creates the basic required fields.
  input CreateWorkoutSessionInput {
    name: String!
  }

  input UpdateWorkoutSessionInput {
    id: ID!
    name: String
    description: String
    introVideoUri: String
    introAudioUri: String
    coverImageUri: String
    introVideoThumbUri: String
    archived: Boolean
    tags: [String!]
    childrenOrder: [String!]
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  # All their created and saved workouts of all types.
  type UserWorkoutSessions {
    ResistanceSessions: [ResistanceSession!]!
    SavedResistanceSessions: [ResistanceSession!]!
    CardioSessions: [CardioSession!]!
    SavedCardioSessions: [CardioSession!]!
    AmrapSessions: [AmrapSession!]!
    SavedAmrapSessions: [AmrapSession!]!
    ForTimeSessions: [ForTimeSession!]!
    SavedForTimeSessions: [ForTimeSession!]!
    IntervalSessions: [IntervalSession!]!
    SavedIntervalSessions: [IntervalSession!]!
    MobilitySessions: [MobilitySession!]!
    SavedMobilitySessions: [MobilitySession!]!
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
    CardioSessions: [CardioSession!]!
    ResistanceSessions: [ResistanceSession!]!
    IntervalSessions: [IntervalSession!]!
    MobilitySessions: [MobilitySession!]!
    AmrapSessions: [AmrapSession!]!
    ForTimeSessions: [ForTimeSession!]!
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

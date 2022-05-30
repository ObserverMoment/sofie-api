import { gql } from 'apollo-server-express'

export default gql`
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
    sessionOrder: [String!]!
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
    sessionOrder: [String!]
  }
`

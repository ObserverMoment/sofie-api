import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSessionSummary {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    archived: Boolean!
    name: String!
    description: String
    introVideoUri: String
    introAudioUri: String
    coverImageUri: String
    introVideoThumbUri: String
    User: UserAvatarData!
  }

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
`

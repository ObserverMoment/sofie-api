import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    userProfileScope: UserProfileScope!
    avatarUri: String
    introVideoUri: String
    introVideoThumbUri: String
    bio: String
    tagline: String
    birthdate: DateTime
    townCity: String
    countryCode: String
    displayName: String!
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    firstname: String
    lastname: String
    gender: Gender!
    hasOnboarded: Boolean!
    GymProfiles: [GymProfile!]
    ProgressJournalGoalTags: [ProgressJournalGoalTag!]
  }

  # Used for chat only - consider using UserSummary below and marging these two types.
  type UserAvatarData {
    id: ID!
    displayName: String!
    avatarUri: String
  }

  type UserSummary {
    id: ID!
    displayName: String!
    avatarUri: String
    userProfileScope: UserProfileScope!
  }

  # Only used for the currently logged in user to update themselves - so ID not required.
  input UpdateUserInput {
    userProfileScope: UserProfileScope
    avatarUri: String
    introVideoUri: String
    introVideoThumbUri: String
    bio: String
    tagline: String
    birthdate: DateTime
    townCity: String
    countryCode: String
    displayName: String
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    firstname: String
    gender: Gender
    hasOnboarded: Boolean
    lastname: String
  }

  type UserPublicProfile {
    id: ID!
    userProfileScope: UserProfileScope!
    avatarUri: String
    introVideoUri: String
    introVideoThumbUri: String
    bio: String
    tagline: String
    townCity: String
    instagramHandle: String
    tiktokHandle: String
    youtubeHandle: String
    linkedinHandle: String
    countryCode: String
    displayName: String!
    followerCount: Int
    postsCount: Int
    workoutCount: Int
    planCount: Int
    Clubs: [ClubSummary!]! # Public only
    LifetimeLogStatsSummary: LifetimeLogStatsSummary
    BenchmarksWithBestEntries: [UserBenchmarkWithBestEntry!]!
  }

  type UserPublicProfileSummary {
    id: ID!
    userProfileScope: UserProfileScope!
    avatarUri: String
    tagline: String
    townCity: String
    countryCode: String
    displayName: String!
    workoutCount: Int!
    planCount: Int!
    Clubs: [ClubSummary!]! # Public only
  }
`

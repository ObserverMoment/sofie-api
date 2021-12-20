import { gql } from 'apollo-server-express'

export default gql`
  type UserAvatarData {
    id: ID!
    displayName: String!
    avatarUri: String
  }

  type UserProfile {
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
    gender: Gender
    birthdate: DateTime
    followerCount: Int
    workoutCount: Int
    planCount: Int
    Clubs: [ClubSummary!]! # If UserProfile is Private this must be empty.
    LifetimeLogStatsSummary: LifetimeLogStatsSummary
    BenchmarksWithBestEntries: [UserBenchmarkWithBestEntry!]!
    Skills: [Skill!]!
  }

  type UserProfileSummary {
    id: ID!
    userProfileScope: UserProfileScope!
    avatarUri: String
    tagline: String
    townCity: String
    countryCode: String
    displayName: String!
    skills: [String!]!
    workoutCount: Int!
    planCount: Int!
    Clubs: [ClubSummary!]! # Public only
  }

  # Resolver should only return the updated fields plus an ID. Only the ID is required.
  type UpdateUserProfileResult {
    id: ID!
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
    instagramHandle: String
    tiktokHandle: String
    youtubeHandle: String
    linkedinHandle: String
    firstname: String
    gender: Gender
    hasOnboarded: Boolean
    lastname: String
  }

  # User can only update their own profile - so no ID required.
  input UpdateUserProfileInput {
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
    instagramHandle: String
    tiktokHandle: String
    youtubeHandle: String
    linkedinHandle: String
    firstname: String
    gender: Gender
    hasOnboarded: Boolean
    lastname: String
  }
`

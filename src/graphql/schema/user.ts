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
    workoutsPerWeekTarget: Int # Null when not requested by authed user.
    activeProgressWidgets: [String!] # Null when not requested by authed user.
    activeLogDataWidgets: [String!] # Null when not requested by authed user.
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
    Clubs: [ClubSummary!]!
  }

  # Return type for the UpdateUserProfile mutation - returns only updated fields plus the ID.
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
    workoutsPerWeekTarget: Int
    activeProgressWidgets: [String!]
    activeLogDataWidgets: [String!]
  }

  # User can only update their own profile - so no ID required.
  # Returns a [UpdateUserProfileResult]
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
    workoutsPerWeekTarget: Int
    activeProgressWidgets: [String!]
    activeLogDataWidgets: [String!]
  }
`

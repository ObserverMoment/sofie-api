import { gql } from 'apollo-server-express'

export default gql`
  # Note: Had issues generating the client side types when defining this as a union of possible types - so went with this stop gap.
  # Only one should be present. If none are present the client should just ignore that data.
  type UserRecentlyViewedObject {
    id: String!
    type: String!
    name: String!
  }

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
    workoutsPerWeekTarget: Int # Null when requested by non-authed user.
    activeProgressWidgets: [String!] # Null when requested by non-authed user.
    activeFitnessBenchmarks: [String!] # Null when requested by non-authed user.
    Clubs: [ClubSummary!]! # If UserProfile is Private this must be empty.
    LifetimeLogStatsSummary: LifetimeLogStatsSummary
    Skills: [Skill!]!
    # If being requested for a public profile, this can be null when the user has opted to not display these scores on their profile.
    bestBenchmarkScores: [BestBenchmarkScoreSummary!]
  }

  # Data to display top scores for benchmarks with scores submitted.
  type BestBenchmarkScoreSummary {
    benchmarkName: String!
    benchmarkType: FitnessBenchmarkScoreType!
    bestScore: Float!
    videoUri: String
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
    activeFitnessBenchmarks: [String!]
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
    activeFitnessBenchmarks: [String!]
  }
`

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
    tagline: String
    countryCode: String
    townCity: String
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
    avatarUri: String
    introVideoUri: String
    introVideoThumbUri: String
    bio: String
    tagline: String
    townCity: String
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    countryCode: String
    displayName: String!
    Workouts: [Workout!]!
    WorkoutPlans: [WorkoutPlan!]!
  }

  type UserPublicProfileSummary {
    id: ID!
    avatarUri: String
    tagline: String
    townCity: String
    countryCode: String
    displayName: String!
    numberPublicWorkouts: Int!
    numberPublicPlans: Int!
  }
`

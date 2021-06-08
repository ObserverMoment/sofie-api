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
    displayName: String
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    firstname: String
    lastname: String
    gender: Gender
    hasOnboarded: Boolean!
    GymProfiles: [GymProfile!]
    ProgressJournalGoalTags: [ProgressJournalGoalTag!]
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
    displayName: String
    CustomMoves: [Move!]
    Workouts: [Workout!]
    WorkoutPlans: [WorkoutPlan!]
  }

  type UserPrivateProfile {
    LoggedWorkouts: [LoggedWorkout!]
    Workouts: [Workout!]
    WorkoutPlans: [WorkoutPlan!]
    WorkoutPlanEnrolments: [WorkoutPlanEnrolment!]
  }
`

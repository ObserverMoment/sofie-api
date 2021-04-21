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
    city: String
    countryCode: String
    displayName: String!
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
    city: String
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
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    countryCode: String
    displayName: String
    CustomMoves: [Move!]
    Workouts: [Workout!]
    WorkoutPrograms: [WorkoutProgram!]
  }

  type UserPrivateProfile {
    LoggedWorkouts: [LoggedWorkout!]
    Workouts: [Workout!]
    WorkoutPrograms: [WorkoutProgram!]
    WorkoutProgramEnrolments: [WorkoutProgramEnrolment!]
  }
`

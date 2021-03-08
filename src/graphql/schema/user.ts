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
    displayName: String
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    firstname: String
    lastname: String
    themePreference: ThemePreference!
    gender: Gender
    hasOnboarded: Boolean!
    height: Float
    weight: Float
    unitSystem: UnitSystem
    GymProfiles: [GymProfile!]
    ProgressJournalGoalTags: [ProgressJournalGoalTag!]
  }

  input UpdateUserInput {
    id: ID!
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
    themePreference: ThemePreference
    gender: Gender
    hasOnboarded: Boolean
    height: Float
    lastname: String
    unitSystem: UnitSystem
    weight: Float
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

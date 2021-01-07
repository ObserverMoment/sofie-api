import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    userProfileScope: UserProfileScope!
    avatarUrl: String
    introVideoUrl: String
    introVideoThumbUrl: String
    coverImageUrl: String
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
    gymProfiles: [GymProfile!]
    moveProfiles: [MoveProfile!]
  }

  input UpdateUserInput {
    userProfileScope: UserProfileScope
    avatarUrl: String
    introVideoUrl: String
    introVideoThumbUrl: String
    coverImageUrl: String
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
    gymBox: String
    hasOnboarded: Boolean
    height: Float
    lastname: String
    unitSystem: UnitSystem
    weight: Float
  }

  type UserPublicProfile {
    id: ID!
    avatarUrl: String
    introVideoUrl: String
    introVideoThumbUrl: String
    coverImageUrl: String
    bio: String
    tagline: String
    instagramUrl: String
    tiktokUrl: String
    youtubeUrl: String
    snapUrl: String
    linkedinUrl: String
    countryCode: String
    displayName: String
    customMoves: [Move!]
    workouts: [Workout!]
    workoutPrograms: [WorkoutProgram!]
  }

  type UserPrivateProfile {
    loggedWorkouts: [LoggedWorkout!]
    workouts: [Workout!]
    workoutPrograms: [WorkoutProgram!]
    workoutProgramEnrolments: [WorkoutProgramEnrolment!]
  }
`

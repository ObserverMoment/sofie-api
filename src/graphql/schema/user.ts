import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    avatarUrl: String
    bio: String
    birthdate: DateTime
    city: String
    countryCode: String
    displayName: String
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
    avatarUrl: String
    bio: String
    birthdate: DateTime
    city: String
    countryCode: String
    displayName: String
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
`

import { gql } from 'apollo-server-express'

export default gql`
  type UserDayLogMood {
    id: ID!
    createdAt: DateTime!
    dayNumber: Int!
    moodScore: Int!
    energyScore: Int!
    tags: [String!]!
    textNote: String
  }

  input CreateUserDayLogMoodInput {
    dayNumber: Int!
    moodScore: Int!
    energyScore: Int!
    tags: [String!]
    textNote: String
  }

  input UpdateUserDayLogMoodInput {
    id: ID!
    moodScore: Int
    energyScore: Int
    tags: [String!]
    textNote: String
  }

  type UserMeditationLog {
    id: ID!
    createdAt: DateTime!
    dayNumber: Int!
    minutesLogged: Int!
    note: String
  }

  input CreateUserMeditationLogInput {
    dayNumber: Int!
    minutesLogged: Int!
    note: String
  }

  input UpdateUserMeditationLogInput {
    id: ID!
    minutesLogged: Int
    note: String
  }

  type UserMobilityLog {
    id: ID!
    createdAt: DateTime!
    dayNumber: Int!
    minutesLogged: Int!
    note: String
  }

  input CreateUserMobilityLogInput {
    dayNumber: Int!
    minutesLogged: Int!
    note: String
  }

  input UpdateUserMobilityLogInput {
    id: ID!
    minutesLogged: Int
    note: String
  }

  type UserEatWellLog {
    id: ID!
    createdAt: DateTime!
    dayNumber: Int!
    rating: UserDayLogRating!
    note: String
  }

  input CreateUserEatWellLogInput {
    dayNumber: Int!
    rating: UserDayLogRating!
    note: String
  }

  input UpdateUserEatWellLogInput {
    id: ID!
    rating: UserDayLogRating
    note: String
  }

  type UserSleepWellLog {
    id: ID!
    createdAt: DateTime!
    dayNumber: Int!
    rating: UserDayLogRating!
    minutesSlept: Int
    note: String
  }

  input CreateUserSleepWellLogInput {
    dayNumber: Int!
    rating: UserDayLogRating!
    minutesSlept: Int
    note: String
  }

  input UpdateUserSleepWellLogInput {
    id: ID!
    rating: UserDayLogRating
    minutesSlept: Int
    note: String
  }
`

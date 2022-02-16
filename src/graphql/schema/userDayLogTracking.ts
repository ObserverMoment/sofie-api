import { gql } from 'apollo-server-express'

export default gql`
  # Non editable (but can delete) momentary user input of how they are feeling in the moment.
  type UserDayLogMood {
    id: ID!
    createdAt: DateTime!
    moodScore: Int!
    energyScore: Int!
    tags: [String!]!
    note: String
  }

  input CreateUserDayLogMoodInput {
    moodScore: Int!
    energyScore: Int!
    tags: [String!]
    note: String
  }

  type UserMeditationLog {
    id: ID!
    createdAt: DateTime!
    year: Int!
    dayNumber: Int!
    minutesLogged: Int!
    note: String
  }

  input CreateUserMeditationLogInput {
    year: Int!
    dayNumber: Int!
    minutesLogged: Int!
    note: String
  }

  input UpdateUserMeditationLogInput {
    id: ID!
    minutesLogged: Int
    note: String
  }

  type UserEatWellLog {
    id: ID!
    createdAt: DateTime!
    year: Int!
    dayNumber: Int!
    rating: UserDayLogRating!
    note: String
  }

  input CreateUserEatWellLogInput {
    year: Int!
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
    year: Int!
    dayNumber: Int!
    rating: UserDayLogRating!
    minutesSlept: Int
    note: String
  }

  input CreateUserSleepWellLogInput {
    year: Int!
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

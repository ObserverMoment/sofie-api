import { gql } from 'apollo-server-express'

export default gql`
  type UserDayLog {
    id: ID!
    createdAt: DateTime!
    dayNumber: Int!
    eatWell: UserDayLogRating
    sleepWell: UserDayLogRating
    meditationMinutes: Int!
    stretchingMinutes: Int!
    UserDayLogMood: UserDayLogMood
  }

  input CreateUserDayLogInput {
    dayNumber: Int!
    eatWell: UserDayLogRating
    sleepWell: UserDayLogRating
    meditationMinutes: Int
    stretchingMinutes: Int
    UserDayLogMood: CreateUserDayLogMoodInput
  }

  input UpdateUserDayLogInput {
    id: ID!
    eatWell: UserDayLogRating
    sleepWell: UserDayLogRating
    meditationMinutes: Int
    stretchingMinutes: Int
  }

  type UserDayLogMood {
    id: ID!
    createdAt: DateTime!
    moodScore: Int!
    energyScore: Int!
    tags: [String!]!
    textNote: String
  }

  input CreateUserDayLogMoodInput {
    moodScore: Int!
    energyScore: Int!
    tags: [String!]
    textNote: String
    UserDayLog: ConnectRelationInput!
  }

  input UpdateUserDayLogMoodInput {
    id: ID!
    moodScore: Int
    energyScore: Int
    tags: [String!]
    textNote: String
  }

  type UserGoal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    deadline: DateTime
    completedDate: DateTime
  }

  input CreateUserGoalInput {
    name: String!
    description: String
    deadline: DateTime
  }

  input UpdateUserGoalInput {
    id: ID!
    name: String
    description: String
    completedDate: DateTime
    deadline: DateTime
  }
`

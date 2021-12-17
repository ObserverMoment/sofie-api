import { gql } from 'apollo-server-express'

export default gql`
  type JournalNote {
    id: ID!
    createdAt: DateTime!
    textNote: String
    voiceNoteUri: String
  }

  input CreateJournalNoteInput {
    textNote: String
    voiceNoteUri: String
  }

  input UpdateJournalNoteInput {
    id: ID!
    textNote: String
    voiceNoteUri: String
  }

  type JournalMood {
    id: ID!
    createdAt: DateTime!
    moodScore: Int
    energyScore: Int
    tags: [String!]!
    textNote: String
  }

  input CreateJournalMoodInput {
    moodScore: Int
    energyScore: Int
    tags: [String!]
    textNote: String
  }

  input UpdateJournalMoodInput {
    id: ID!
    moodScore: Int
    energyScore: Int
    tags: [String!]
    textNote: String
  }

  type JournalGoal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    deadline: DateTime
    completedDate: DateTime
  }

  input CreateJournalGoalInput {
    name: String!
    description: String
    deadline: DateTime
  }

  input UpdateJournalGoalInput {
    id: ID!
    name: String
    description: String
    completedDate: DateTime
    deadline: DateTime
  }
`

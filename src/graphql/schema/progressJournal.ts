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
    moodScore: Float
    energyScore: Float
    confidenceScore: Float
    motivationScore: Float
  }

  input CreateJournalMoodInput {
    moodScore: Float
    energyScore: Float
    confidenceScore: Float
    motivationScore: Float
  }

  input UpdateJournalMoodInput {
    id: ID!
    moodScore: Float
    energyScore: Float
    confidenceScore: Float
    motivationScore: Float
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

import { gql } from 'apollo-server-express'

export default gql`
  type ProgressJournal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    coverImageUri: String
    ProgressJournalEntries: [ProgressJournalEntry!]!
    ProgressJournalGoals: [ProgressJournalGoal!]!
  }

  input CreateProgressJournalInput {
    name: String!
    description: String
    coverImageUri: String
  }

  input UpdateProgressJournalInput {
    id: ID!
    name: String
    description: String
    coverImageUri: String
  }

  type ProgressJournalEntry {
    id: ID!
    createdAt: DateTime!
    note: String
    voiceNoteUri: String
    moodScore: Float
    energyScore: Float
    confidenceScore: Float
    motivationScore: Float
    ProgressJournal: ProgressJournal!
  }

  input CreateProgressJournalEntryInput {
    note: String
    voiceNoteUri: String
    moodScore: Float
    energyScore: Float
    confidenceScore: Float
    motivationScore: Float
    ProgressJournal: ConnectRelationInput!
  }

  input UpdateProgressJournalEntryInput {
    id: ID!
    note: String
    voiceNoteUri: String
    moodScore: Float
    energyScore: Float
    confidenceScore: Float
    motivationScore: Float
  }

  type ProgressJournalGoal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    deadline: DateTime
    completedDate: DateTime
    ProgressJournalGoalTags: [ProgressJournalGoalTag!]!
  }

  input CreateProgressJournalGoalInput {
    name: String!
    description: String
    deadline: DateTime
    ProgressJournal: ConnectRelationInput!
    ProgressJournalGoalTags: [ConnectRelationInput!]
  }

  input UpdateProgressJournalGoalInput {
    id: ID!
    name: String
    description: String
    completedDate: DateTime
    deadline: DateTime
    ProgressJournalGoalTags: [ConnectRelationInput!]
  }

  type ProgressJournalGoalTag {
    id: ID!
    createdAt: DateTime!
    tag: String!
    hexColor: String!
  }

  input CreateProgressJournalGoalTagInput {
    tag: String!
    hexColor: String!
  }

  input UpdateProgressJournalGoalTagInput {
    id: ID!
    tag: String
    hexColor: String
  }
`

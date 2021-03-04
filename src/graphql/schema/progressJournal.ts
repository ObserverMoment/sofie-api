import { gql } from 'apollo-server-express'

export default gql`
  type ProgressJournal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    ProgressJournalEntries: [ProgressJournalEntry!]
    ProgressJournalGoals: [ProgressJournalGoal!]
  }

  input CreateProgressJournalInput {
    name: String!
    description: String
  }

  input UpdateProgressJournalInput {
    id: ID!
    name: String
    description: String
  }

  type ProgressJournalEntry {
    id: ID!
    createdAt: DateTime!
    notes: String
    voiceNoteUri: String
    # Always save in KGs
    bodyweight: Float
    moodScore: Float
    energyScore: Float
    stressScore: Float
    motivationScore: Float
    progressPhotoUris: [String!]
    ProgressJournal: ProgressJournal!
  }

  input CreateProgressJournalEntryInput {
    notes: String
    voiceNoteUri: String
    # Always save in KGs
    bodyweight: Float
    moodScore: Float
    energyScore: Float
    stressScore: Float
    motivationScore: Float
    progressPhotoUris: [String!]
    ProgressJournal: ID!
  }

  input UpdateProgressJournalEntryInput {
    id: ID!
    notes: String
    voiceNoteUri: String
    # Always save in KGs
    bodyweight: Float
    moodScore: Float
    energyScore: Float
    stressScore: Float
    motivationScore: Float
    progressPhotoUris: [String!]
  }

  type ProgressJournalGoal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    deadline: DateTime
    completedDate: DateTime
    ProgressJournalGoalTags: [ProgressJournalGoalTag!]
  }

  input CreateProgressJournalGoalInput {
    name: String!
    description: String
    deadline: DateTime
    ProgressJournal: ID!
    ProgressJournalGoalTags: [ID!]
  }

  input UpdateProgressJournalGoalInput {
    id: ID!
    name: String
    description: String
    completedDate: DateTime
    deadline: DateTime
    ProgressJournalGoalTags: [ID!]
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

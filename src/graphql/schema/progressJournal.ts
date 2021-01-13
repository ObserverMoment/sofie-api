import { gql } from 'apollo-server-express'

export default gql`
  type ProgressJournal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    progressJournalEntries: [ProgressJournalEntry!]
    progressJournalGoals: [ProgressJournalGoal!]
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

  type ProgressJournalGoal {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    deadline: DateTime
    completedDate: DateTime
    progressJournalGoalTags: [ProgressJournalGoalTag!]
  }

  input CreateProgressJournalGoalInput {
    name: String!
    description: String
    deadline: DateTime
    progressJournal: ID!
    progressJournalGoalTags: [ID!]
  }

  input UpdateProgressJournalGoalInput {
    id: ID!
    name: String
    description: String
    completedDate: DateTime
    deadline: DateTime
    progressJournalGoalTags: [ID!]
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
    user: ID!
  }

  input UpdateProgressJournalGoalTagInput {
    id: ID!
    tag: String
    hexColor: String
  }

  type ProgressJournalEntry {
    id: ID!
    createdAt: DateTime!
    notes: String
    voiceNoteUrl: String
    # Always save in KGs
    bodyweight: Float
    moodScore: Float
    energyScore: Float
    stressScore: Float
    motivationScore: Float
    progressPhotoUrls: [String!]
  }

  input CreateProgressJournalEntryInput {
    notes: String
    voiceNoteUrl: String
    # Always save in KGs
    bodyweight: Float
    moodScore: Float
    energyScore: Float
    healthScore: Float
    fitnessScore: Float
    sleepScore: Float
    socialScore: Float
    progressPhotoUrls: [String!]
    progressJournal: ID!
  }

  input UpdateProgressJournalEntryInput {
    id: ID!
    notes: String
    voiceNoteUrl: String
    # Always save in KGs
    bodyweight: Float
    moodScore: Float
    energyScore: Float
    healthScore: Float
    fitnessScore: Float
    sleepScore: Float
    socialScore: Float
    progressPhotoUrls: [String!]
  }
`

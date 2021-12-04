import { gql } from 'apollo-server-express'

export default gql`
  type UserBenchmarkSummary {
    id: String!
    lastEntryAt: DateTime!
    name: String!
    equipmentInfo: String
    benchmarkType: BenchmarkType!
    loadUnit: LoadUnit!
  }

  # Display these publically
  type UserBenchmarkWithBestEntry {
    UserBenchmarkSummary: UserBenchmarkSummary!
    # Can be null if no entry has been made for this PB yet.
    BestEntry: UserBenchmarkEntry
  }

  type UserBenchmark {
    id: String!
    createdAt: DateTime!
    lastEntryAt: DateTime!
    name: String!
    description: String
    equipmentInfo: String
    benchmarkType: BenchmarkType!
    loadUnit: LoadUnit!
    UserBenchmarkEntries: [UserBenchmarkEntry!]!
    UserBenchmarkTags: [UserBenchmarkTag!]!
  }

  input CreateUserBenchmarkInput {
    name: String!
    description: String
    equipmentInfo: String
    benchmarkType: BenchmarkType!
    loadUnit: LoadUnit
    UserBenchmarkTags: [ConnectRelationInput!]
  }

  input UpdateUserBenchmarkInput {
    id: String!
    name: String
    description: String
    equipmentInfo: String
    benchmarkType: BenchmarkType!
    loadUnit: LoadUnit
    UserBenchmarkTags: [ConnectRelationInput!]
  }

  type UserBenchmarkEntry {
    id: String!
    createdAt: DateTime!
    completedOn: DateTime!
    score: Float!
    note: String
    videoUri: String
    videoThumbUri: String
  }

  input CreateUserBenchmarkEntryInput {
    completedOn: DateTime!
    score: Float!
    note: String
    videoUri: String
    videoThumbUri: String
    UserBenchmark: ConnectRelationInput!
  }

  input UpdateUserBenchmarkEntryInput {
    id: String!
    completedOn: DateTime
    score: Float
    note: String
    videoUri: String
    videoThumbUri: String
  }

  type UserBenchmarkTag {
    id: ID!
    name: String!
    description: String
  }

  input CreateUserBenchmarkTagInput {
    name: String!
    description: String
  }

  input UpdateUserBenchmarkTagInput {
    id: ID!
    name: String
    description: String
  }
`

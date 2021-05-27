import { gql } from 'apollo-server-express'

export default gql`
  type UserBenchmark {
    id: String!
    createdAt: DateTime!
    lastEntryAt: DateTime!
    name: String!
    description: String
    reps: Float
    repType: WorkoutMoveRepType!
    load: Float
    loadUnit: LoadUnit!
    timeUnit: TimeUnit!
    distanceUnit: DistanceUnit!
    benchmarkType: BenchmarkType!
    Equipment: Equipment
    Move: Move!
    UserBenchmarkEntries: [UserBenchmarkEntry!]!
  }

  input CreateUserBenchmarkInput {
    name: String!
    description: String
    reps: Float
    repType: WorkoutMoveRepType
    load: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    distanceUnit: DistanceUnit
    benchmarkType: BenchmarkType!
    Equipment: ConnectRelationInput
    Move: ConnectRelationInput!
  }

  input UpdateUserBenchmarkInput {
    id: String!
    name: String
    description: String
    reps: Float
    repType: WorkoutMoveRepType
    load: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    distanceUnit: DistanceUnit
    benchmarkType: BenchmarkType!
    Equipment: ConnectRelationInput
    Move: ConnectRelationInput
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
`

import { gql } from 'apollo-server-express'

export default gql`
  # User defined data analysis widget that scans log history for moves that match the specs defined in this object and displays progress graph and top scores.
  type MoveHistoryTrackerWidget {
    id: ID!
    createdAt: DateTime!
    sortPosition: Int!
    name: String!
    description: String
    benchmarkType: BenchmarkType!
    repType: WorkoutMoveRepType!
    reps: Float
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    Equipment: Equipment
    Move: Move!
  }

  type UserGoal {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
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

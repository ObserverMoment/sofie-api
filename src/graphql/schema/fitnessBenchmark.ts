import { gql } from 'apollo-server-express'

export default gql`
  type FitnessBenchmarkCategory {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String!
  }

  type FitnessBenchmark {
    id: ID!
    createdAt: DateTime!
    scope: FitnessBenchmarkScope!
    type: FitnessBenchmarkScoreType!
    name: String!
    description: String
    instructions: String
    instructionalVideoUri: String
    instructionalVideoThumbUri: String
    FitnessBenchmarkCategory: FitnessBenchmarkCategory!
    # Nullable when scores are not needed.
    FitnessBenchmarkScores: [FitnessBenchmarkScore!]
  }

  input CreateFitnessBenchmarkInput {
    scope: FitnessBenchmarkScope!
    type: FitnessBenchmarkScoreType!
    name: String!
    description: String
    instructions: String
    instructionalVideoUri: String
    instructionalVideoThumbUri: String
    FitnessBenchmarkCategory: ConnectRelationInput!
  }

  input UpdateFitnessBenchmarkInput {
    id: ID!
    scope: FitnessBenchmarkScope
    type: FitnessBenchmarkScoreType
    name: String
    description: String
    instructions: String
    instructionalVideoUri: String
    instructionalVideoThumbUri: String
    FitnessBenchmarkCategory: ConnectRelationInput
  }

  type FitnessBenchmarkScore {
    id: ID!
    createdAt: DateTime!
    completedOn: DateTime!
    # Units that this represents depends on FitnessBenchmarkScoreType.
    score: Float!
    note: String
    videoUri: String
    videoThumbUri: String
    User: UserAvatarData
  }

  input CreateFitnessBenchmarkScoreInput {
    completedOn: DateTime!
    # Units that this represents depends on FitnessBenchmarkScoreType.
    score: Float!
    note: String
    videoUri: String
    videoThumbUri: String
    FitnessBenchmark: ConnectRelationInput!
  }

  input UpdateFitnessBenchmarkScoreInput {
    id: ID!
    completedOn: DateTime
    # Units that this represents depends on FitnessBenchmarkScoreType.
    score: Float
    note: String
    videoUri: String
    videoThumbUri: String
  }

  type FitnessBenchmarkWorkout {
    id: ID!
    createdAt: DateTime!
    scope: FitnessBenchmarkScope!
    type: FitnessBenchmarkWorkoutScoreType!
    name: String!
    description: String
    instructions: String
    instructionalVideoUri: String
    instructionalVideoThumbUri: String
    # Must be 1 for AMRAPS. Can be > 1 for FORTIME.
    rounds: Int!
    # E.g. [10 calories air bike, 20m forward lunge, 10 muscle snatch, 10 air squats]
    # Must be same length as pointsForMoveCompleted[]
    moveDescriptions: [String!]!
    # E.g. [10, 5, 10, 10]
    # Must be same length as moveDescriptions[]
    pointsForMoveCompleted: [Int!]!
    # Nullable when scores are not needed.
    FitnessBenchmarkWorkoutScores: [FitnessBenchmarkWorkoutScore!]
  }

  input CreateFitnessBenchmarkWorkoutInput {
    scope: FitnessBenchmarkScope!
    type: FitnessBenchmarkWorkoutScoreType!
    name: String!
    description: String
    instructions: String
    instructionalVideoUri: String
    instructionalVideoThumbUri: String
    # Must be 1 for AMRAPS. Can be > 1 for FORTIME.
    rounds: Int!
    # E.g. [10 calories air bike, 20m forward lunge, 10 muscle snatch, 10 air squats]
    # Must be same length as pointsForMoveCompleted[]
    moveDescriptions: [String!]!
    # E.g. [10, 5, 10, 10]
    # Must be same length as moveDescriptions[]
    pointsForMoveCompleted: [Int!]!
  }

  input UpdateFitnessBenchmarkWorkoutInput {
    id: ID!
    scope: FitnessBenchmarkScope
    type: FitnessBenchmarkWorkoutScoreType
    name: String
    description: String
    instructions: String
    instructionalVideoUri: String
    instructionalVideoThumbUri: String
    # Must be 1 for AMRAPS. Can be > 1 for FORTIME.
    rounds: Int
    # E.g. [10 calories air bike, 20m forward lunge, 10 muscle snatch, 10 air squats]
    # Must be same length as pointsForMoveCompleted[]
    moveDescriptions: [String!]
    # E.g. [10, 5, 10, 10]
    # Must be same length as moveDescriptions[]
    pointsForMoveCompleted: [Int!]
  }

  type FitnessBenchmarkWorkoutScore {
    id: ID!
    createdAt: DateTime!
    completedOn: DateTime!
    # If AMRAP, this is REPS. If FORTIME, this is ms.
    score: Int!
    note: String
    User: UserAvatarData
  }

  input CreateFitnessBenchmarkWorkoutInput {
    completedOn: DateTime!
    # If AMRAP, this is REPS. If FORTIME, this is ms.
    score: Int!
    note: String
    FitnessBenchmarkWorkout: ConnectRelationInput!
  }
`

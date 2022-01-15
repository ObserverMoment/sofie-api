import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSet {
    id: ID!
    sortPosition: Int!
    duration: Int!
    # If there is more than one move then this is a superset
    # In a superset you do each workoutMove in the array one after another
    WorkoutMoves: [WorkoutMove!]!
  }

  input CreateWorkoutSetInput {
    sortPosition: Int!
    duration: Int
    WorkoutSection: ConnectRelationInput!
  }

  input UpdateWorkoutSetInput {
    id: ID!
    duration: Int
  }

  input CreateWorkoutSetWithWorkoutMovesInput {
    workoutSet: CreateWorkoutSetInput!
    workoutMoves: [CreateWorkoutMoveInSetInput!]!
  }

  input CreateWorkoutMoveInSetInput {
    sortPosition: Int!
    reps: Float!
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit
    loadAmount: Float!
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }
`

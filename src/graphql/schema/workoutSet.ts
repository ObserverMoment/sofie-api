import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSet {
    id: ID!
    sortPosition: Int!
    rounds: Int!
    notes: String
    # If there is more than one move then this is a superset
    # In a superset you do each workoutMove in the array one after another
    # And then repeat this process {rounds} times
    WorkoutMoves: [WorkoutMove!]!
    Generators: [WorkoutSetGenerator!]
  }

  input CreateWorkoutSetInput {
    sortPosition: Int!
    rounds: Int!
    notes: String
  }

  type WorkoutSetGenerator {
    id: ID!
    type: WorkoutSetGeneratorType!
    workoutMoveIndex: Int!
    target: WorkoutSetGeneratorTarget!
    roundFrequency: Int!
    adjustAmount: Float!
    WorkoutSet: WorkoutSet!
  }

  input CreateWorkoutSetGeneratorInput {
    type: WorkoutSetGeneratorType!
    workoutMoveIndex: Int!
    target: WorkoutSetGeneratorTarget!
    roundFrequency: Int!
    adjustAmount: Float!
    WorkoutSet: ID!
  }

  input UpdateWorkoutSetGeneratorInput {
    id: ID!
    type: WorkoutSetGeneratorType
    workoutMoveIndex: Int
    target: WorkoutSetGeneratorTarget
    roundFrequency: Int
    adjustAmount: Float
  }
`

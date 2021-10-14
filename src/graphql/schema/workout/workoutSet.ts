import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSet {
    id: ID!
    sortPosition: Int!
    rounds: Int!
    duration: Int!
    # If there is more than one move then this is a superset
    # In a superset you do each workoutMove in the array one after another
    # And then repeat this process {rounds} times
    WorkoutMoves: [WorkoutMove!]!
  }

  input CreateWorkoutSetInput {
    sortPosition: Int!
    rounds: Int
    duration: Int
    WorkoutSection: ConnectRelationInput!
  }

  input UpdateWorkoutSetInput {
    id: ID!
    rounds: Int
    duration: Int
  }
`

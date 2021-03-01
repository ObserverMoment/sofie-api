import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutMove {
    id: ID!
    notes: String
    sortPosition: Int!
    reps: Float!
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit!
    loadAmount: Float
    loadUnit: LoadUnit!
    Move: Move!
    Equipment: Equipment
  }

  input CreateWorkoutMoveInput {
    notes: String
    sortPosition: Int!
    reps: Float!
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit!
    loadAmount: Float
    loadUnit: LoadUnit!
    Move: ID!
    Equipment: ID
  }
`

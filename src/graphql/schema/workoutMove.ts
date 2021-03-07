import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutMove {
    id: ID!
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
    sortPosition: Int!
    reps: Float!
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ID!
    Equipment: ID
    WorkoutSet: ID!
  }

  input UpdateWorkoutMoveInput {
    id: ID!
    reps: Float
    repType: WorkoutMoveRepType
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ID
    Equipment: ID
  }
`

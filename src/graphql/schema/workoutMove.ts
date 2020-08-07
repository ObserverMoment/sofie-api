import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutMove {
    id: ID!
    description: String
    sortPosition: Int!
    reps: Float!
    repType: String!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    move: Move!
    selectedEquipment: Equipment
  }

  input CreateWorkoutMoveInput {
    description: String
    sortPosition: Int
    reps: Float
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    moveId: String!
    selectedEquipmentId: String
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutMove {
    id: ID!
    description: String
    notes: String
    sortPosition: Int!
    reps: Float!
    repType: String!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    """
    duration is used when logging workout moves - when rep type is not time it allows you to log how long the user took to complete one round of the section.
    """
    duration: Int
    move: Move!
    selectedEquipment: Equipment
  }

  input CreateWorkoutMoveInput {
    description: String
    notes: String
    sortPosition: Int!
    reps: Float
    repType: WorkoutMoveRepType!
    distanceUnit: DistanceUnit!
    loadAmount: Float
    loadUnit: LoadUnit!
    """
    duration is used when logging workout moves - when rep type is not time it allows you to log how long the user took to complete one round of the section.
    """
    duration: Int
    move: ID!
    selectedEquipment: ID
  }
`

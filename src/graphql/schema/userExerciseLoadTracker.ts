import { gql } from 'apollo-server-express'

/// Models that a user can use to track their personal bests / scores for both exercises (1 rep max etc) and for scored workouts (AMRAPS).
export default gql`
  type UserExerciseLoadTracker {
    id: ID!
    createdAt: DateTime!
    reps: Int!
    loadUnit: LoadUnit!
    Move: Move!
    Equipment: Equipment
  }

  input CreateUserExerciseLoadTrackerInput {
    reps: Int!
    loadUnit: LoadUnit!
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }
`

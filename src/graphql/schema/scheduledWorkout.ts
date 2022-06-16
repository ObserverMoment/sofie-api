import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    note: String
    GymProfile: GymProfile
    ResistanceWorkout: ResistanceWorkout
    CardioWorkout: ResistanceWorkout
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: DateTime!
    note: String
    GymProfile: ConnectRelationInput
    ResistanceWorkout: ConnectRelationInput
    CardioWorkout: ConnectRelationInput
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: DateTime
    note: String
    GymProfile: ConnectRelationInput
  }
`

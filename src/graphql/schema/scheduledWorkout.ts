import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    notes: String
    Workout: Workout!
    LoggedWorkout: LoggedWorkout
    GymProfile: GymProfile
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: DateTime!
    notes: String
    Workout: ID!
    GymProfile: ID
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: DateTime
    notes: String
    Workout: ID
    LoggedWorkout: ID
    GymProfile: ID
  }
`

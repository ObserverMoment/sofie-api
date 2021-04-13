import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    note: String
    Workout: Workout!
    LoggedWorkout: LoggedWorkout
    GymProfile: GymProfile
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: DateTime!
    note: String
    Workout: ID!
    GymProfile: ID
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: DateTime
    note: String
    Workout: ID
    LoggedWorkout: ID
    GymProfile: ID
  }
`

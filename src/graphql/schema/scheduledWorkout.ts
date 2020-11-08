import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    notes: String
    workoutId: ID
    loggedWorkoutId: ID
    gymProfileId: ID
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: DateTime!
    notes: String
    workoutId: ID
    gymProfileId: ID
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: DateTime
    notes: String
    workoutId: ID
    loggedWorkoutId: ID
    gymProfileId: ID
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: String!
    scheduledAt: String!
    notes: String
    workoutId: ID
    loggedWorkoutId: ID
    gymProfileId: ID
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: String!
    notes: String
    workoutId: ID
    gymProfileId: ID
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: String
    notes: String
    workoutId: ID
    loggedWorkoutId: ID
    gymProfileId: ID
  }
`

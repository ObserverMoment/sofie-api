import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    note: String
    loggedWorkoutId: ID
    workoutPlanEnrolmentId: ID
    GymProfile: GymProfile
    Workout: WorkoutSummary
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: DateTime!
    note: String
    Workout: ConnectRelationInput!
    GymProfile: ConnectRelationInput
    WorkoutPlanEnrolment: ConnectRelationInput
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: DateTime
    note: String
    Workout: ConnectRelationInput
    LoggedWorkout: ConnectRelationInput
    GymProfile: ConnectRelationInput
    WorkoutPlanEnrolment: ConnectRelationInput
  }
`

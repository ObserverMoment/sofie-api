import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    note: String
    loggedWorkoutId: ID
    workoutPlanName: String # Not a prisma model field.
    workoutPlanEnrolmentId: ID
    workoutPlanDayWorkoutId: ID
    GymProfile: GymProfile
    Workout: WorkoutSummary
  }

  input CreateScheduledWorkoutInput {
    scheduledAt: DateTime!
    note: String
    Workout: ConnectRelationInput!
    GymProfile: ConnectRelationInput
    WorkoutPlanEnrolment: ConnectRelationInput
    WorkoutPlanDayWorkout: ConnectRelationInput
  }

  input UpdateScheduledWorkoutInput {
    id: ID!
    scheduledAt: DateTime
    note: String
    LoggedWorkout: ConnectRelationInput
    GymProfile: ConnectRelationInput
  }
`

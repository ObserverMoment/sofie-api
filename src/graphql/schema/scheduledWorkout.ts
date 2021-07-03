import { gql } from 'apollo-server-express'

export default gql`
  type ScheduledWorkout {
    id: ID!
    createdAt: DateTime!
    scheduledAt: DateTime!
    note: String
    Workout: Workout
    LoggedWorkout: LoggedWorkout
    GymProfile: GymProfile
    workoutPlanEnrolmentId: ID
    workoutPlanDayWorkoutId: ID
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
    Workout: ConnectRelationInput
    LoggedWorkout: ConnectRelationInput
    GymProfile: ConnectRelationInput
    WorkoutPlanEnrolment: ConnectRelationInput
    WorkoutPlanDayWorkout: ConnectRelationInput
  }
`

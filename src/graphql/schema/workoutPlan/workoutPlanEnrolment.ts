import { gql } from 'apollo-server-express'

// Data for logged in user enrolments
export default gql`
  # Summary for displaying cards.
  type WorkoutPlanEnrolmentSummary {
    id: ID!
    startDate: DateTime!
    completedPlanDayWorkoutIds: [String!]!
    WorkoutPlan: WorkoutPlanSummary!
  }

  # Full data for details page.
  type WorkoutPlanEnrolmentWithPlan {
    WorkoutPlanEnrolment: WorkoutPlanEnrolment!
    WorkoutPlan: WorkoutPlan!
  }

  type WorkoutPlanEnrolment {
    id: ID!
    startDate: DateTime!
    completedPlanDayWorkoutIds: [String!]!
    User: UserSummary!
  }

  input UpdateWorkoutPlanEnrolmentInput {
    id: ID!
    startDate: DateTime
    completedPlanDayWorkoutIds: [String!]
  }
`

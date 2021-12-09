import { gql } from 'apollo-server-express'

// Data for logged in user enrolments
export default gql`
  # Summary for displaying cards.
  type WorkoutPlanEnrolmentSummary {
    id: ID!
    startDate: DateTime
    completedWorkoutsCount: Int!
    WorkoutPlan: WorkoutPlanSummary!
  }

  # Full data for details page.
  type WorkoutPlanEnrolmentWithPlan {
    WorkoutPlanEnrolment: WorkoutPlanEnrolment!
    WorkoutPlan: WorkoutPlan!
  }

  type WorkoutPlanEnrolment {
    id: ID!
    startDate: DateTime
    CompletedWorkoutPlanDayWorkouts: [CompletedWorkoutPlanDayWorkout!]!
    User: UserSummary!
  }

  type CompletedWorkoutPlanDayWorkout {
    id: ID!
    workoutPlanDayWorkoutId: ID!
    loggedWorkoutId: ID!
  }

  # Schedules all workouts in the plan (creates a ScheduledWorkout for each and adds to WorkoutPlanEnrolment.scheduledWorkouts[]) where day 1 is [startDate]
  # If WorkoutPlanEnrolment.scheduledWorkouts[] is not empty then it will delete all of these first. Use this to update schedule as well when changing start date.
  input CreateScheduleForPlanEnrolmentInput {
    workoutPlanEnrolmentId: ID!
    startDate: DateTime! # Should be a date and a time. The first workout of the day will be schduled at the time specified, subsequent workouts (when more than one per day) will be n (TBC) hours later.
  }

  input UpdateWorkoutPlanEnrolmentInput {
    id: ID!
    startDate: DateTime
    completedPlanDayWorkoutIds: [String!]
  }
`

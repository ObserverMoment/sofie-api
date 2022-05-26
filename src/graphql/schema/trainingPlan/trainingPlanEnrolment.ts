import { gql } from 'apollo-server-express'

// Data for logged in user enrolments
export default gql`
  # Summary for displaying cards.
  type TrainingPlanEnrolmentSummary {
    id: ID!
    startDate: DateTime
    completedWorkoutsCount: Int!
    TrainingPlan: TrainingPlanSummary!
  }

  # Full data for details page.
  type TrainingPlanEnrolmentWithPlan {
    TrainingPlanEnrolment: TrainingPlanEnrolment!
    TrainingPlan: TrainingPlan!
  }

  type TrainingPlanEnrolment {
    id: ID!
    startDate: DateTime
    CompletedTrainingPlanDayWorkouts: [CompletedTrainingPlanDayWorkout!]!
    User: UserAvatarData!
  }

  type CompletedTrainingPlanDayWorkout {
    id: ID!
    workoutPlanDayWorkoutId: ID!
    loggedWorkoutId: ID!
  }

  input CreateCompletedTrainingPlanDayWorkoutInput {
    workoutPlanEnrolmentId: ID!
    workoutPlanDayWorkoutId: ID!
    loggedWorkoutId: ID!
  }

  input DeleteCompletedTrainingPlanDayWorkoutInput {
    workoutPlanEnrolmentId: ID!
    workoutPlanDayWorkoutId: ID!
  }

  # Schedules all workouts in the plan (creates a ScheduledWorkout for each and adds to TrainingPlanEnrolment.scheduledWorkouts[]) where day 1 is [startDate]
  # If TrainingPlanEnrolment.scheduledWorkouts[] is not empty then it will delete all of these first. Use this to update schedule as well when changing start date.
  input CreateScheduleForPlanEnrolmentInput {
    workoutPlanEnrolmentId: ID!
    startDate: DateTime! # Should be a date and a time. The first workout of the day will be schduled at the time specified, subsequent workouts (when more than one per day) will be n (TBC) hours later.
  }
`

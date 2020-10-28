import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutProgram {
    id: ID!
    createdAt: String!
    name: String!
    description: String!
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    preciseSchedule: Boolean!
    frequencyPeriod: FrequencyPeriod
    frequencyAmount: Int
    scope: AccessScopeType!
    createdBy: User
    enrolments: [WorkoutProgramEnrolment!]
    workoutGoals: [WorkoutGoal!]!
    programWorkouts: [WorkoutProgramWorkout!]!
    programReviews: [WorkoutProgramReview!]
  }

  input CreateWorkoutProgramInput {
    name: String!
    description: String!
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    preciseSchedule: Boolean!
    frequencyPeriod: FrequencyPeriod
    frequencyAmount: Int
    workoutGoalIds: [ID!]!
    programWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  # Used when nested children have been updated. i.e programWorkouts.
  input DeepUpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    preciseSchedule: Boolean
    frequencyPeriod: FrequencyPeriod
    frequencyAmount: Int
    workoutGoalIds: [ID!]!
    programWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  input ShallowUpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    preciseSchedule: Boolean
    frequencyPeriod: FrequencyPeriod
    frequencyAmount: Int
    workoutGoalIds: [ID!]!
  }

  type WorkoutProgramWorkout {
    id: ID!
    dayNumber: Int!
    notes: String
    workout: Workout!
  }

  input CreateWorkoutProgramWorkoutInput {
    dayNumber: Int!
    notes: String
    workoutId: ID!
  }

  type WorkoutProgramEnrolment {
    id: ID!
    startDate: String
    user: User!
    loggedWorkouts: [LoggedWorkout!]
  }

  input AddEnrolmentToWorkoutProgram {
    userId: ID!
    workoutProgramId: ID!
  }

  input RemoveEnrolmentFromWorkoutProgram {
    userId: ID!
    workoutProgramId: ID!
  }

  type WorkoutProgramReview {
    id: ID!
    score: Float!
    comment: String
    user: User!
  }

  input CreateWorkoutProgramReviewInput {
    score: Float!
    comment: String
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutProgram {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    scope: AccessScopeType!
    createdBy: User
    enrolments: [WorkoutProgramEnrolment!]
    workoutGoals: [WorkoutGoal!]!
    programWorkouts: [WorkoutProgramWorkout!]!
    programReviews: [WorkoutProgramReview!]
  }

  input CreateWorkoutProgramInput {
    name: String!
    description: String
    scope: AccessScopeType!
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    workoutGoals: [ID!]!
    programWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  # Used when nested children have been updated. i.e programWorkouts.
  input DeepUpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    scope: AccessScopeType
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    workoutGoals: [ID!]!
    programWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  input ShallowUpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    scope: AccessScopeType
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    workoutGoals: [ID!]!
  }

  type WorkoutProgramWorkout {
    id: ID!
    dayNumber: Float!
    notes: String
    workout: Workout!
  }

  input CreateWorkoutProgramWorkoutInput {
    dayNumber: Float!
    notes: String
    workout: ID!
  }

  type WorkoutProgramEnrolment {
    id: ID!
    startDate: DateTime
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

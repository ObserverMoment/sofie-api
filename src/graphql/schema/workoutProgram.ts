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
    youtubeVideoUrl: String
    scope: AccessScopeType!
    createdBy: User
    enrolments: [WorkoutProgramEnrolment!]
    workoutGoals: [WorkoutGoal!]!
    workoutProgramWorkouts: [WorkoutProgramWorkout!]!
    workoutProgramReviews: [WorkoutProgramReview!]
  }

  input CreateWorkoutProgramInput {
    name: String!
    description: String
    scope: AccessScopeType!
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    youtubeVideoUrl: String
    workoutGoals: [ID!]!
    workoutProgramWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  # Used when nested children have been updated. i.e workoutProgramWorkouts.
  input DeepUpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    scope: AccessScopeType
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    youtubeVideoUrl: String
    workoutGoals: [ID!]!
    workoutProgramWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  input ShallowUpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    scope: AccessScopeType
    imageUrl: String
    videoUrl: String
    videoThumbUrl: String
    youtubeVideoUrl: String
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
    workoutProgram: WorkoutProgram!
    loggedWorkouts: [LoggedWorkout!]
  }

  input AddLoggedWorkoutToProgramEnrolmentInput {
    workoutProgramEnrolmentId: ID!
    loggedWorkout: CreateLoggedWorkoutInput!
  }

  type WorkoutProgramReview {
    id: ID!
    createdAt: DateTime!
    score: Float!
    comment: String
    user: User!
  }

  input CreateWorkoutProgramReviewInput {
    score: Float!
    comment: String
  }
`

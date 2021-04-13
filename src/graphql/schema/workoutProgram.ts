import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutProgram {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    User: User
    Enrolments: [WorkoutProgramEnrolment!]
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutProgramWorkouts: [WorkoutProgramWorkout!]!
    WorkoutProgramReviews: [WorkoutProgramReview!]
  }

  type WorkoutProgramWorkout {
    id: ID!
    dayNumber: Float!
    note: String
    Workout: Workout!
  }

  type WorkoutProgramEnrolment {
    id: ID!
    startDate: DateTime!
    User: User!
    WorkoutProgram: WorkoutProgram!
    LoggedWorkouts: [LoggedWorkout!]
  }

  type WorkoutProgramReview {
    id: ID!
    createdAt: DateTime!
    score: Float!
    comment: String
    User: User!
  }

  input CreateWorkoutProgramInput {
    name: String!
    description: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    WorkoutGoals: [ID!]
    WorkoutProgramWorkouts: [CreateWorkoutProgramWorkoutInput!]
  }

  input UpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ID!]
  }

  input CreateWorkoutProgramWorkoutInput {
    dayNumber: Float!
    note: String
    Workout: ID!
    WorkoutProgram: ID!
  }

  input UpdateWorkoutProgramWorkoutInput {
    id: ID!
    dayNumber: Float!
    note: String
    Workout: ID!
  }

  input CreateWorkoutProgramReviewInput {
    score: Float!
    comment: String
    WorkoutProgram: ID!
  }

  input UpdateWorkoutProgramReviewInput {
    id: ID!
    score: Float
    comment: String
  }
`

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

  input CreateWorkoutProgramInput {
    name: String!
    description: String
    coverImageUri: String
    introVideoUri: String
    introVideoUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    WorkoutGoals: [ID!]
    WorkoutProgramWorkouts: [CreateWorkoutProgramWorkoutInput!]!
  }

  input UpdateWorkoutProgramInput {
    id: ID!
    name: String
    description: String
    coverImageUri: String
    introVideoUri: String
    introVideoUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ID!]
    # If present - resolver will deep update - deleting all descendants and rebuilding based on this input.
    WorkoutProgramWorkouts: [UpdateWorkoutProgramWorkoutInput!]
  }

  type WorkoutProgramWorkout {
    id: ID!
    dayNumber: Float!
    notes: String
    Workout: Workout!
  }

  input CreateWorkoutProgramWorkoutInput {
    dayNumber: Float!
    notes: String
    Workout: ID!
  }

  input UpdateWorkoutProgramWorkoutInput {
    # When id is null a new workoutProgramWorkout will be created.
    # Otherwise the existing one will be updated.
    id: ID
    dayNumber: Float!
    notes: String
    Workout: ID!
  }

  type WorkoutProgramEnrolment {
    id: ID!
    startDate: DateTime
    User: User!
    WorkoutProgram: WorkoutProgram!
    LoggedWorkouts: [LoggedWorkout!]
  }

  input AddLoggedWorkoutToProgramEnrolmentInput {
    workoutProgramEnrolmentId: ID!
    LoggedWorkout: CreateLoggedWorkoutInput!
  }

  type WorkoutProgramReview {
    id: ID!
    createdAt: DateTime!
    score: Float!
    comment: String
    User: User!
  }

  input CreateWorkoutProgramReviewInput {
    score: Float!
    comment: String
  }
`

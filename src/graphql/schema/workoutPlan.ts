import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutPlan {
    id: ID!
    createdAt: DateTime!
    archived: Boolean!
    name: String!
    description: String
    lengthWeeks: Int!
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    User: UserSummary!
    Enrolments: [WorkoutPlanEnrolment!]!
    WorkoutPlanDays: [WorkoutPlanDay!]!
    WorkoutPlanReviews: [WorkoutPlanReview!]!
    WorkoutTags: [WorkoutTag!]!
  }

  # Just creates the basic required fields to make a fresh, empty plan in the DB ready for CRUDing.
  input CreateWorkoutPlanInput {
    name: String!
    lengthWeeks: Int!
    contentAccessScope: ContentAccessScope!
  }

  input UpdateWorkoutPlanInput {
    id: ID!
    archived: Boolean
    name: String
    description: String
    lengthWeeks: Int
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope
    WorkoutTags: [ConnectRelationInput!]
  }

  type WorkoutPlanDay {
    id: ID!
    note: String
    dayNumber: Int!
    WorkoutPlanDayWorkouts: [WorkoutPlanDayWorkout!]!
  }

  input CreateWorkoutPlanDayInput {
    dayNumber: Int!
    WorkoutPlan: ConnectRelationInput!
  }

  input UpdateWorkoutPlanDayInput {
    id: ID!
    note: String
    dayNumber: Int
  }

  type WorkoutPlanDayWorkout {
    id: ID!
    note: String
    sortPosition: Int!
    Workout: Workout!
  }

  input CreateWorkoutPlanDayWorkoutInput {
    note: String
    sortPosition: Int!
    WorkoutPlanDay: ConnectRelationInput!
    Workout: ConnectRelationInput!
  }

  # Sort position should be updated via the dedicated object reordering resolver.
  input UpdateWorkoutPlanDayWorkoutInput {
    id: ID!
    note: String
    WorkoutPlanDay: ConnectRelationInput
    Workout: ConnectRelationInput
  }

  type WorkoutPlanEnrolment {
    id: ID!
    startDate: DateTime!
    completedPlanDayWorkoutIds: [String!]!
    User: UserSummary!
    WorkoutPlan: WorkoutPlan!
  }

  input UpdateWorkoutPlanEnrolmentInput {
    id: ID!
    startDate: DateTime
    completedPlanDayWorkoutIds: [String!]
  }

  type WorkoutPlanReview {
    id: ID!
    createdAt: DateTime!
    score: Float!
    comment: String
    User: UserSummary!
  }

  input CreateWorkoutPlanReviewInput {
    score: Float!
    comment: String
    WorkoutPlan: ID!
  }

  input UpdateWorkoutPlanReviewInput {
    id: ID!
    score: Float
    comment: String
  }
`

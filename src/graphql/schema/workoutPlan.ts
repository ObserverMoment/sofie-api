import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutPlan {
    id: ID!
    createdAt: DateTime!
    archived: Boolean!
    name: String!
    description: String
    lengthWeeks: Int!
    daysPerWeek: Int!
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    User: UserSummary!
    WorkoutPlanEnrolments: [WorkoutPlanEnrolment!]!
    WorkoutPlanDays: [WorkoutPlanDay!]!
    WorkoutPlanReviews: [WorkoutPlanReview!]!
    WorkoutTags: [WorkoutTag!]!
  }

  # Just creates the basic required fields to make a fresh, empty plan in the DB ready for CRUDing.
  input CreateWorkoutPlanInput {
    name: String!
    contentAccessScope: ContentAccessScope!
  }

  input UpdateWorkoutPlanInput {
    id: ID!
    name: String
    description: String
    lengthWeeks: Int
    daysPerWeek: Int
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

  # When creating a new WorkoutPlanDay you start by adding a workout.
  # We create the WorkoutPlanDay and connect to the workout in a single op.
  input CreateWorkoutPlanDayWithWorkoutInput {
    dayNumber: Int!
    WorkoutPlan: ConnectRelationInput!
    Workout: ConnectRelationInput!
  }

  input UpdateWorkoutPlanDayInput {
    id: ID!
    note: String
    dayNumber: Int
  }

  # This resolver will first delete any WorkoutPlanDay that is currently assigned to [moveToDay] via the dayNumber field.
  input MoveWorkoutPlanDayToAnotherDayInput {
    id: ID!
    moveToDay: Int!
  }

  # This resolver will first delete any WorkoutPlanDay that is currently assigned to [copyToDay] via the dayNumber field.
  input CopyWorkoutPlanDayToAnotherDayInput {
    id: ID!
    copyToDay: Int!
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

  # Note: Sort position should be updated via the dedicated object reordering resolver.
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
    WorkoutPlan: ConnectRelationInput!
  }

  input UpdateWorkoutPlanReviewInput {
    id: ID!
    score: Float
    comment: String
  }
`

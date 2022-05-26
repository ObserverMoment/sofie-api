import { gql } from 'apollo-server-express'

export default gql`
  # Min data required to render a summary / card with key data for this plan.
  type TrainingPlanSummary {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    archived: Boolean!
    name: String!
    description: String
    coverImageUri: String
    lengthWeeks: Int!
    daysPerWeek: Int!
    workoutsCount: Int!
    User: UserAvatarData!
    enrolmentsCount: Int!
    goals: [WorkoutGoal!]!
    tags: [String!]!
    reviewScore: Float
    reviewCount: Int!
  }

  type TrainingPlan {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    archived: Boolean!
    name: String!
    description: String
    lengthWeeks: Int!
    daysPerWeek: Int!
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    User: UserAvatarData!
    TrainingPlanDays: [TrainingPlanDay!]!
    TrainingPlanReviews: [TrainingPlanReview!]!
    WorkoutTags: [WorkoutTag!]!
    TrainingPlanEnrolments: [TrainingPlanEnrolment!]!
  }

  # Just creates the basic required fields to make a fresh, empty plan in the DB ready for CRUDing.
  input CreateTrainingPlanInput {
    name: String!
    contentAccessScope: ContentAccessScope!
  }

  input UpdateTrainingPlanInput {
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

  type TrainingPlanDay {
    id: ID!
    note: String
    dayNumber: Int!
    TrainingPlanDayWorkouts: [TrainingPlanDayWorkout!]!
  }

  # When creating a new TrainingPlanDay you start by adding a workout.
  # We create the TrainingPlanDay and connect to the workout in a single op.
  input CreateTrainingPlanDayWithWorkoutInput {
    dayNumber: Int!
    TrainingPlan: ConnectRelationInput!
    WorkoutSession: ConnectRelationInput!
  }

  input UpdateTrainingPlanDayInput {
    id: ID!
    note: String
    dayNumber: Int
  }

  # This resolver will first delete any TrainingPlanDay that is currently assigned to [moveToDay] via the dayNumber field.
  input MoveTrainingPlanDayToAnotherDayInput {
    id: ID!
    moveToDay: Int!
  }

  # This resolver will first delete any TrainingPlanDay that is currently assigned to [copyToDay] via the dayNumber field.
  input CopyTrainingPlanDayToAnotherDayInput {
    id: ID!
    copyToDay: Int!
  }

  type TrainingPlanDayWorkout {
    id: ID!
    note: String
    sortPosition: Int!
    WorkoutSession: WorkoutSession!
  }

  input CreateTrainingPlanDayWorkoutInput {
    note: String
    sortPosition: Int!
    TrainingPlanDay: ConnectRelationInput!
    WorkoutSession: ConnectRelationInput!
  }

  # Note: Sort position should be updated via the dedicated object reordering resolver.
  input UpdateTrainingPlanDayWorkoutInput {
    id: ID!
    note: String
    TrainingPlanDay: ConnectRelationInput
    WorkoutSession: ConnectRelationInput
  }

  type TrainingPlanReview {
    id: ID!
    createdAt: DateTime!
    score: Float!
    comment: String
    User: UserAvatarData!
  }

  input CreateTrainingPlanReviewInput {
    score: Float!
    comment: String
    TrainingPlan: ConnectRelationInput!
  }

  input UpdateTrainingPlanReviewInput {
    id: ID!
    score: Float
    comment: String
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  ## Admin use only ##
  type PublicClubCountsAdmin {
    pending: Int!
    valid: Int!
    invalid: Int!
  }

  type PublicClubSummaryAdmin {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
  }

  type ClubWithMetaDataAdmin {
    id: ID!
    createdAt: DateTime!
    Owner: UserAvatarData!
    Admins: [UserAvatarData!]!
    Members: [UserAvatarData!]!
    name: String!
    description: String
    location: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    # Data should be viewable by club members only. Return null if not.
    Workouts: [WorkoutSummary!]
    WorkoutPlans: [WorkoutPlanSummary!]
    # Data should be viewable by club members, admins and owners only. Return null if not.
    ClubInviteTokens: [ClubInviteToken!]
    validated: PublicContentValidationStatus!
    reasonNotValidated: String
    metaTags: [String!]!
  }

  input UpdateClubMetaDataAdminInput {
    id: ID!
    validated: PublicContentValidationStatus
    reasonNotValidated: String
    metaTags: [String!]
  }
  ####

  type Club {
    id: ID!
    createdAt: DateTime!
    Owner: UserAvatarData!
    Admins: [UserAvatarData!]!
    Members: [UserAvatarData!]!
    name: String!
    description: String
    location: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    # Data should be viewable by club members only. Return null if not.
    Workouts: [WorkoutSummary!]
    WorkoutPlans: [WorkoutPlanSummary!]
    # Data should be viewable by club members, admins and owners only. Return null if not.
    ClubInviteTokens: [ClubInviteToken!]
  }

  # Use in lists etc where minimal data is needed.
  type ClubSummary {
    id: ID!
    createdAt: DateTime!
    Owner: UserAvatarData!
    Admins: [UserAvatarData!]!
    name: String!
    description: String
    location: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope!
    memberCount: Int!
    workoutCount: Int!
    planCount: Int!
  }

  ### DEPRECATED
  type ClubWorkouts {
    id: ID! # ClubId
    workouts: [WorkoutSummary!]!
  }
  ### DEPRECATED
  type ClubWorkoutPlans {
    id: ID! # ClubId
    workoutPlans: [WorkoutPlanSummary!]!
  }

  input CreateClubInput {
    name: String!
    description: String
    location: String
  }

  input UpdateClubSummaryInput {
    id: ID!
    name: String
    description: String
    location: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    contentAccessScope: ContentAccessScope
  }
  ### DEPRECATED
  input AddWorkoutToClubInput {
    id: ID!
    Workout: ConnectRelationInput!
  }
  ### DEPRECATED
  input RemoveWorkoutFromClubInput {
    id: ID!
    Workout: ConnectRelationInput!
  }
  ### DEPRECATED
  input AddWorkoutPlanToClubInput {
    id: ID!
    WorkoutPlan: ConnectRelationInput!
  }
  ### DEPRECATED
  input RemoveWorkoutPlanFromClubInput {
    id: ID!
    WorkoutPlan: ConnectRelationInput!
  }
`

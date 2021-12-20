import { gql } from 'apollo-server-express'

export default gql`
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

  type ClubMembers {
    Owner: ClubMemberSummary!
    Admins: [ClubMemberSummary!]!
    Members: [ClubMemberSummary!]
  }

  type ClubMemberSummary {
    id: ID!
    displayName: String!
    avatarUri: String
    townCity: String
    countryCode: String
    skills: [String!]!
  }

  input CreateClubInput {
    name: String!
    description: String
    location: String
  }

  input UpdateClubInput {
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

  input AddWorkoutToClubInput {
    id: ID!
    Workout: ConnectRelationInput!
  }

  input RemoveWorkoutFromClubInput {
    id: ID!
    Workout: ConnectRelationInput!
  }

  input AddWorkoutPlanToClubInput {
    id: ID!
    WorkoutPlan: ConnectRelationInput!
  }

  input RemoveWorkoutPlanFromClubInput {
    id: ID!
    WorkoutPlan: ConnectRelationInput!
  }

  #### ClubInviteToken ####
  type ClubInviteToken {
    id: ID! # Use the unique ID string as the 'token' string.
    createdAt: DateTime!
    active: Boolean!
    name: String!
    # How many times can this token be used.
    # 0 means unlimited.
    inviteLimit: Int!
    # Only updated by the sever when user joins via this token.
    # Compare this length with inviteLimit to check for expiry.
    joinedUserIds: [String!]!
    # Owner or admin of the group.
    User: UserAvatarData!
  }

  input CreateClubInviteTokenInput {
    name: String!
    inviteLimit: Int!
    Club: ConnectRelationInput!
  }

  input UpdateClubInviteTokenInput {
    id: ID!
    name: String
    inviteLimit: Int
    active: Boolean
  }
`

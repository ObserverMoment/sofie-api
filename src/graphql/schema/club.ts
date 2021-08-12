import { gql } from 'apollo-server-express'

export default gql`
  type Club {
    id: ID!
    createdAt: DateTime!
    Owner: UserSummary!
    Admins: [UserSummary!]!
    Members: [UserSummary!]!
    name: String!
    description: String
    location: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    Workouts: [Workout!]!
    WorkoutPlans: [WorkoutPlan!]!
    # Data should be viewable by admins and owners of groups only.
    ClubInviteTokens: [ClubInviteToken!]!
    JoinClubInvites: [JoinClubInvite!]!
    JoinClubRequests: [JoinClubRequest!]!
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

  #### JoinClubInvite ####
  # From club to user.
  type JoinClubInvite {
    id: ID!
    createdAt: DateTime!
    # Owner or admin of the club.
    Sender: UserSummary!
    # The user being invited
    Invited: UserSummary!
    # Owner or admin who accepts / rejects.
    Responder: UserSummary!
    status: JoinClubRequestStatus!
    respondedAt: DateTime
  }

  input CreateJoinClubInviteInput {
    Club: ConnectRelationInput!
    Sender: ConnectRelationInput!
    Invited: ConnectRelationInput!
  }

  input UpdateJoinClubInviteInput {
    id: ID!
    Responder: ConnectRelationInput!
    status: JoinClubRequestStatus!
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
    invitesUsed: Int!
    # Owner or admin of the group.
    User: UserSummary!
    # Only updated by the sever when user joins via this token.
    joinedUserIds: [String!]!
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

  #### JoinClubRequest ####
  # From user to club.
  type JoinClubRequest {
    id: ID!
    createdAt: DateTime!
    Applicant: UserSummary!
    status: JoinClubRequestStatus!
    # Owner or admin of the group.
    Responder: UserSummary
    respondedAt: DateTime
  }

  input CreateJoinClubRequestInput {
    Club: ConnectRelationInput!
    Applicant: ConnectRelationInput!
  }

  input UpdateJoinClubRequestInput {
    id: ID!
    Responder: ConnectRelationInput!
    status: JoinClubRequestStatus!
  }
`
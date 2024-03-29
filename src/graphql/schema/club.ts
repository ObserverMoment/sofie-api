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

  # For displaying basic club and user data in the club chat.
  type ClubChatSummary {
    id: ID!
    name: String!
    coverImageUri: String
    Owner: UserAvatarData!
    Admins: [UserAvatarData!]!
    Members: [UserAvatarData!]!
  }

  # Display the members of a club within Club/People - i.e only other club members should ever see this.
  type ClubMembers {
    id: ID! # ClubId
    Owner: ClubMemberSummary!
    Admins: [ClubMemberSummary!]!
    Members: [ClubMemberSummary!]!
  }

  type ClubMemberSummary {
    id: ID!
    displayName: String!
    avatarUri: String
    townCity: String
    countryCode: String
    tagline: String
    skills: [String!]!
  }

  type ClubInviteTokens {
    id: ID! # ClubId
    tokens: [ClubInviteToken!]!
  }

  type ClubWorkouts {
    id: ID! # ClubId
    workouts: [WorkoutSummary!]!
  }

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

  #### Club Member Notes ####
  #### For Owners and Admins of Clubs Only ####
  type ClubMemberNote {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    note: String!
    tags: [String!]!
    # User == Author
    User: UserAvatarData
  }

  ### Owners and Admins can create ####
  input CreateClubMemberNoteInput {
    clubId: ID!
    memberId: ID!
    note: String!
    tags: [String!]!
  }

  ### Only the owner of the note can modify it ###
  ### No delete functionality for notes - they should serve as a history ###
  input UpdateClubMemberNoteInput {
    id: ID!
    note: String
    tags: [String!]
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
  }

  input CreateClubInviteTokenInput {
    clubId: ID!
    name: String!
    inviteLimit: Int!
  }

  input UpdateClubInviteTokenInput {
    clubId: ID!
    id: ID!
    name: String
    inviteLimit: Int
    active: Boolean
  }

  input DeleteClubInviteTokenInput {
    clubId: ID!
    tokenId: ID!
  }
`

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
  }

  type JoinClubRequest {
    id: ID!
    createdAt: DateTime!
    # The applicant.
    RequestBy: UserSummary!
    status: JoinClubRequestStatus!
    respondedAt: DateTime
    # Owner or admin of the group.
    ResponseBy: UserSummary
  }
`

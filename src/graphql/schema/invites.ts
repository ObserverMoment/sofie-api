import { gql } from 'apollo-server-express'

export default gql`
  type InviteTokenError {
    message: String!
  }

  type ClubInviteTokenData {
    token: String!
    Club: Club!
  }

  union CheckClubInviteTokenResult = ClubInviteTokenData | InviteTokenError
`

import { gql } from 'apollo-server-express'

export default gql`
  # Return this if there is a problem with the invite token or if the User is already a member of the club.
  type InviteTokenError {
    message: String!
  }

  type ClubInviteTokenData {
    token: String!
    Club: ClubSummary!
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
  }

  union CheckClubInviteTokenResult = ClubInviteTokenData | InviteTokenError
`

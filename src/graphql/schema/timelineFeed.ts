import { gql } from 'apollo-server-express'

export default gql`
  # Minimal object data required for displaying a post in a user timeline / feed.
  type TimelinePostData {
    poster: TimelinePostDataUser!
    creator: TimelinePostDataUser!
    object: TimelinePostDataObject!
  }

  type TimelinePostDataUser {
    id: ID!
    displayName: String!
    avatarUri: String
  }

  # The referenced DB object. E.g Workout or Challenge.
  # Fields match those of workout and workout plan! New content objects should also follow this structure where possible.
  type TimelinePostDataObject {
    id: ID!
    type: TimelinePostType!
    name: String!
    introAudioUri: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
  }

  input TimelinePostDataRequestInput {
    # The id of the user who created the getstream activity (post).
    posterId: ID!
    # The database object ID that is being referenced by the getstream activity (post).
    objectId: ID!
    # The database object type that is being referenced by the getstream activity (post).
    objectType: TimelinePostType!
  }
`

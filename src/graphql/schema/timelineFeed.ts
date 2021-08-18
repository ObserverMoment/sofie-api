import { gql } from 'apollo-server-express'

export default gql`
  # Minimal object data required for displaying a post in a user timeline / feed.
  type TimelinePostData {
    userId: ID!
    userDisplayName: String!
    userAvatarUri: String
    # The id and the type of the referenced DB object.
    objectId: ID!
    objectType: TimelinePostType!
    title: String!
    audioUri: String
    imageUri: String
    videoUri: String
    videoThumbUri: String
  }

  input TimelinePostDataRequestInput {
    # The id of the user who created / owns the post.
    userId: ID!
    # The database object ID that is being referenced by the getstream activity (post).
    objectId: ID!
    # The database object type that is being referenced by the getstream activity (post).
    objectType: TimelinePostType!
  }
`

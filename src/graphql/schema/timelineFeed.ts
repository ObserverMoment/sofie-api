import { gql } from 'apollo-server-express'

export default gql`
  ##### For user_timeline feeds #####
  # Minimal object data required for displaying a post in a user timeline / feed.
  # Combine this with data from the GetStream activity  on the client.
  # This is just the object data from the DB - no post / activity info except the ID.
  type TimelinePostObjectData {
    activityId: String!
    poster: TimelinePostObjectDataUser!
    creator: TimelinePostObjectDataUser!
    object: TimelinePostObjectDataObject!
  }

  ##### For club_member_feeds #####
  # Full data required for displaying a club feed post on a timeline.
  # Club feeds are private and are handled server side. So the full object can be formed bu the API and returned ready for displaying.
  type TimelinePostFullData {
    activityId: String!
    postedAt: DateTime!
    caption: String
    tags: [String!]!
    poster: TimelinePostObjectDataUser!
    creator: TimelinePostObjectDataUser!
    object: TimelinePostObjectDataObject!
  }

  type TimelinePostObjectDataUser {
    id: ID!
    displayName: String!
    avatarUri: String
  }

  # The referenced DB object. E.g Workout or Challenge.
  # Fields match those of workout and workout plan! New content objects should also follow this structure where possible.
  type TimelinePostObjectDataObject {
    id: ID!
    type: TimelinePostType!
    name: String!
    introAudioUri: String
    coverImageUri: String
    introVideoUri: String
    introVideoThumbUri: String
  }

  input TimelinePostDataRequestInput {
    # The ID of the Getstream activity
    activityId: String!
    # The id of the user who created the getstream activity (post).
    posterId: ID!
    # The database object ID that is being referenced by the getstream activity (post).
    objectId: ID!
    # The database object type that is being referenced by the getstream activity (post).
    objectType: TimelinePostType!
  }
`

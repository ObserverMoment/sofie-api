import { gql } from 'apollo-server-express'

export default gql`
  ##### For Club Timeline V2 #####
  type StreamEnrichedActivity {
    id: String!
    actor: StreamFeedUser!
    verb: String!
    object: String!
    time: DateTime!
    # If the logged in user has liked this activity then the ID should be here.
    userLikeReactionId: String
    reactionCounts: StreamActivityReactionCounts
    extraData: StreamActivityExtraData!
  }

  type StreamActivityExtraData {
    creator: StreamFeedUser
    club: StreamFeedClub
    title: String
    caption: String
    tags: [String!]!
    articleUrl: String
    audioUrl: String
    imageUrl: String
    videoUrl: String
    originalPostId: String
  }

  type StreamActivityReactionCounts {
    likes: Int
    comments: Int
  }

  # Enriched Stream User. This data is being stored on the GetStream servers.
  type StreamFeedUser {
    id: String!
    data: StreamFeedUserData!
  }

  type StreamFeedUserData {
    name: String # displayName
    image: String # avatarUri
  }

  # Enriched Stream Club. This data is being stored on the GetStream servers under the 'club' collection.
  # Refs: https://getstream.io/activity-feeds/docs/flutter-dart/collections_references/
  type StreamFeedClub {
    id: String!
    data: StreamFeedClubData!
  }

  type StreamFeedClubData {
    name: String # name
    image: String # coverImageUri
  }

  # The inputs necessary to create a stream activity.
  input CreateStreamFeedActivityInput {
    # Ref to poster in format SU:id. Generated via [client.currentUser.ref]
    actor: String!
    # i.e post / pin / tweet etc.
    verb: String!
    # Ref to the content type in format feedPostType:id.
    # If shared content (workout, plam, log etc) then format will be [type:id]
    # If media only content (should be available to club posts only) it will be [type:timestamp].
    # I.e. [announcement], [video], [article]
    object: String!
    extraData: CreateStreamFeedActivityExtraDataInput!
  }

  input CreateStreamFeedActivityExtraDataInput {
    # Ref to creator of shared content. In format SU:id. Generated via [client.user.ref] or manually.
    creator: String
    # Title of the post
    title: String
    # Main content of the post
    caption: String
    tags: [String!]!
    # Media for the post. Only one of these should ever be present. Only Club owners.
    articleUrl: String
    audioUrl: String
    imageUrl: String
    videoUrl: String
    # For re-posts
    originalPostId: String
  }
`

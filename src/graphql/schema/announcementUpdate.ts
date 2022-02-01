import { gql } from 'apollo-server-express'

export default gql`
  type AnnouncementUpdate {
    id: ID!
    createdAt: DateTime!
    imageUri: String
    videoUri: String
    audioUri: String
    articleUrl: String
    title: String!
    subtitle: String
    bodyOne: String
    bodyTwo: String
    actions: [AnnouncementUpdateAction!]!
  }

  type AnnouncementUpdateAction {
    id: ID!
    createdAt: DateTime!
    text: String!
    routeTo: String!
  }

  input MarkAnnouncementUpdateAsSeenInput {
    userId: ID!
    announcementUpdateId: ID!
  }
`

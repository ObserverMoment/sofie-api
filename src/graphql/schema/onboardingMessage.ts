import { gql } from 'apollo-server-express'

export default gql`
  type OnboardingMessage {
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
  }

  input MarkOnboardingMessageAsSeenInput {
    userId: ID!
    onboardingMessageId: ID!
  }
`

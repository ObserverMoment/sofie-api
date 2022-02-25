import { gql } from 'apollo-server-express'

export default gql`
  type WelcomeTodoItem {
    id: ID!
    createdAt: DateTime!
    videoUri: String
    routeTo: String
    title: String!
  }

  input MarkWelcomeTodoItemAsSeenInput {
    userId: ID!
    welcomeTodoItemId: ID!
  }
`

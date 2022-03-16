import { gql } from 'apollo-server-express'

export default gql`
  type UserGoal {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String
    deadline: DateTime
    completedDate: DateTime
  }

  input CreateUserGoalInput {
    name: String!
    description: String
    deadline: DateTime
  }

  input UpdateUserGoalInput {
    id: ID!
    name: String
    description: String
    completedDate: DateTime
    deadline: DateTime
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type BodyTransformationPhoto {
    id: ID!
    createdAt: DateTime!
    takenOnDate: DateTime!
    bodyweight: Float
    note: String
    photoUri: String!
  }
  # No user needed as a User can only upload photos for their own account.
  # So logged in user id is used.
  input CreateBodyTransformationPhotoInput {
    takenOnDate: DateTime!
    bodyweight: Float
    note: String
    photoUri: String!
  }

  input UpdateBodyTransformationPhotoInput {
    id: ID!
    takenOnDate: DateTime
    bodyweight: Float
    note: String
    photoUri: String
  }
`

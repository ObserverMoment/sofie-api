import { gql } from 'apollo-server-express'

export default gql`
  type GymProfile {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String
    Equipments: [Equipment!]!
  }

  input CreateGymProfileInput {
    name: String!
    description: String
    Equipments: [ConnectRelationInput!]
  }

  input UpdateGymProfileInput {
    id: ID!
    name: String
    description: String
    Equipments: [ConnectRelationInput!]
  }
`

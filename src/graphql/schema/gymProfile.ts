import { gql } from 'apollo-server-express'

export default gql`
  type GymProfile {
    id: ID!
    name: String!
    description: String
    Equipments: [Equipment!]!
  }

  input CreateGymProfileInput {
    name: String!
    description: String
    # List of String (ID) ids to connect.
    Equipments: [ID!]!
  }

  input UpdateGymProfileInput {
    id: ID!
    name: String
    description: String
    # List of String (ID) ids to connect.
    Equipments: [ID!]
  }
`

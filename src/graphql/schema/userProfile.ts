import { gql } from 'apollo-server-express'

export default gql`
  type GymProfile {
    id: ID!
    name: String!
    description: String
    postcode: String
    bodyweightOnly: Boolean!
    user: User!
    availableEquipments: [Equipment!]
  }

  input CreateGymProfileInput {
    name: String!
    description: String
    postcode: String
    bodyweightOnly: Boolean
    # List of String (ID) ids to connect.
    availableEquipments: [ID!]
  }

  input UpdateGymProfileInput {
    id: ID!
    name: String
    description: String
    postcode: String
    bodyweightOnly: Boolean
    # List of String (ID) ids to connect.
    availableEquipments: [ID!]
  }

  type MoveProfile {
    id: ID!
    name: String!
    description: String
    user: User!
    requiredMoves: [Move!]
    excludedMoves: [Move!]
  }

  input CreateMoveProfileInput {
    name: String!
    description: String
    requiredMoveIds: [ID!]
    excludedMoveIds: [ID!]
  }

  input UpdateMoveProfileInput {
    id: ID!
    name: String
    description: String
    requiredMoveIds: [ID!]
    excludedMoveIds: [ID!]
  }
`

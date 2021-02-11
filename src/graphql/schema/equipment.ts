import { gql } from 'apollo-server-express'

export default gql`
  type Equipment {
    id: ID!
    name: String!
    altNames: String
    imageUrl: String
    loadAdjustable: Boolean!
  }

  input CreateEquipmentInput {
    name: String!
    altNames: String
    imageUrl: String
    loadAdjustable: Boolean!
  }

  input UpdateEquipmentInput {
    id: ID!
    name: String
    altNames: String
    imageUrl: String
    loadAdjustable: Boolean
  }
`

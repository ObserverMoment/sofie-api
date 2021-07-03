import { gql } from 'apollo-server-express'

export default gql`
  type Equipment {
    id: ID!
    name: String!
    altNames: String
    loadAdjustable: Boolean!
  }

  # For use by ADMIN user type only
  input CreateEquipmentInput {
    name: String!
    altNames: String
    loadAdjustable: Boolean!
  }

  # For use by ADMIN user type only
  input UpdateEquipmentInput {
    id: ID!
    name: String
    altNames: String
    loadAdjustable: Boolean
  }
`

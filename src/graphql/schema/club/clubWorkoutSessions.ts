import { gql } from 'apollo-server-express'

export default gql`
  type ClubResistanceWorkout {
    id: ID!
    name: String!
    coverImageUri: String
    ResistanceWorkout: ResistanceWorkout!
  }
`

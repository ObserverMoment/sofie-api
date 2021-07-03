import { gql } from 'apollo-server-express'

export default gql`
  type BodyArea {
    id: ID!
    name: String!
    altNames: String
    frontBack: BodyAreaFrontBack!
    upperLower: BodyAreaUpperLower!
  }

  type BodyAreaMoveScore {
    Move: Move!
    BodyArea: BodyArea!
    score: Int!
  }
`

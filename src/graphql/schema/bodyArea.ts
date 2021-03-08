import { gql } from 'apollo-server-express'

export default gql`
  type BodyArea {
    id: ID!
    name: String
    altNames: String
    BodyAreaMoveScores: [BodyAreaMoveScore!]!
    frontBack: BodyAreaFrontBack!
    upperLower: BodyAreaUpperLower!
  }

  type BodyAreaMoveScore {
    id: ID!
    Move: Move!
    BodyArea: BodyArea!
    score: Float!
  }
`

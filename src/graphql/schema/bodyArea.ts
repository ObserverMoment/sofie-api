import { gql } from 'apollo-server-express'

export default gql`
  type BodyArea {
    id: ID!
    name: String
    altNames: String
    bodyAreaMoveScores: [BodyAreaMoveScore!]!
    frontBack: BodyAreaFrontBack!
    upperLower: BodyAreaUpperLower!
  }

  type BodyAreaMoveScore {
    id: ID!
    move: Move!
    bodyArea: BodyArea!
    score: Float!
  }
`

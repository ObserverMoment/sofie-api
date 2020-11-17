import { gql } from 'apollo-server-express'

export default gql`
  type BodyArea {
    id: ID!
    name: String
    altNames: String
    bodyAreaMoveScores: [BodyAreaMoveScore!]!
  }

  type BodyAreaMoveScore {
    move: Move!
    bodyArea: BodyArea!
    score: Float!
  }
`

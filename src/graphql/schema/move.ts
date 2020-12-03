import { gql } from 'apollo-server-express'

export default gql`
  type Move {
    id: ID!
    name: String!
    searchTerms: String
    description: String
    demoVideoUrl: String
    scope: MoveScope!
    type: MoveType!
    validRepTypes: [WorkoutMoveRepType!]!
    requiredEquipments: [Equipment!]!
    selectableEquipments: [Equipment!]!
    bodyAreaMoveScores: [BodyAreaMoveScore!]
  }

  input CreateMoveInput {
    name: String!
    searchTerms: String
    description: String
    demoVideoUrl: String
    type: MoveType!
    validRepTypes: [WorkoutMoveRepType!]!
    requiredEquipments: [ID!]
    selectableEquipments: [ID!]
    bodyAreaMoveScores: [MoveBodyAreaMoveScoreInput!]
  }

  # Shallow update only - does not update body area move scores.
  input UpdateMoveInput {
    id: ID!
    name: String
    searchTerms: String
    description: String
    demoVideoUrl: String
    type: MoveType
    validRepTypes: [WorkoutMoveRepType!]
    requiredEquipments: [ID!]
    selectableEquipments: [ID!]
  }

  # A fresh array of bodyAreaMoveScores for a specified move ID.
  # Cascade delete all previous then rebuild fresh entries.
  input UpdateMoveBodyAreaMoveScoresInput {
    move: ID!
    bodyAreaMoveScores: [MoveBodyAreaMoveScoreInput!]!
  }

  # Input for a bodyAreaMoveScore - to update scores against a specified move ID.
  input MoveBodyAreaMoveScoreInput {
    bodyArea: ID!
    score: Float!
  }
`

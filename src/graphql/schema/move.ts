import { gql } from 'apollo-server-express'

export default gql`
  type Move {
    id: ID!
    name: String!
    searchTerms: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    scope: MoveScope!
    moveType: MoveType!
    validRepTypes: [WorkoutMoveRepType!]!
    requiredEquipments: [Equipment!]!
    selectableEquipments: [Equipment!]!
    bodyAreaMoveScores: [BodyAreaMoveScore!]
  }

  type MoveType {
    id: ID!
    name: String!
    description: String
    imageUrl: String
  }

  input CreateMoveInput {
    name: String!
    searchTerms: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    scope: MoveScope
    moveType: ID!
    # validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]!
    requiredEquipments: [ID!]
    selectableEquipments: [ID!]
    bodyAreaMoveScores: [MoveBodyAreaMoveScoreInput!]
  }

  # Shallow update only - does not update body area move scores.
  input ShallowUpdateMoveInput {
    id: ID!
    name: String
    searchTerms: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    scope: MoveScope
    moveType: ID
    # If included - validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]
    requiredEquipments: [ID!]
    selectableEquipments: [ID!]
  }

  # Deep update includes updates to the BodyAreaMoveScores
  # Includes fresh array of bodyAreaMoveScores for a specified move ID.
  # Cascade delete all previous then rebuild fresh entries.
  input DeepUpdateMoveInput {
    id: ID!
    name: String
    searchTerms: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    scope: MoveScope
    moveType: ID
    # If included - validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]
    requiredEquipments: [ID!]
    selectableEquipments: [ID!]
    bodyAreaMoveScores: [MoveBodyAreaMoveScoreInput!]!
  }

  # Input for a bodyAreaMoveScore - to update scores against a specified move ID.
  input MoveBodyAreaMoveScoreInput {
    bodyArea: ID!
    score: Float!
  }
`

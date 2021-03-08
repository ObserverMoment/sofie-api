import { gql } from 'apollo-server-express'

export default gql`
  type Move {
    id: ID!
    name: String!
    searchTerms: String
    description: String
    demoVideoUri: String
    demoVideoThumbUri: String
    scope: MoveScope!
    MoveType: MoveType!
    validRepTypes: [WorkoutMoveRepType!]!
    RequiredEquipments: [Equipment!]!
    SelectableEquipments: [Equipment!]!
    BodyAreaMoveScores: [BodyAreaMoveScore!]
  }

  type MoveType {
    id: ID!
    name: String!
    description: String
    imageUri: String
  }

  input CreateMoveInput {
    name: String!
    searchTerms: String
    description: String
    demoVideoUri: String
    demoVideoThumbUri: String
    scope: MoveScope
    MoveType: ID!
    # validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]!
    RequiredEquipments: [ID!]
    SelectableEquipments: [ID!]
    BodyAreaMoveScores: [BodyAreaMoveScoreInput!]
  }

  input UpdateMoveInput {
    id: ID!
    name: String
    searchTerms: String
    description: String
    demoVideoUri: String
    demoVideoThumbUri: String
    scope: MoveScope
    MoveType: ID
    # If included - validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]
    RequiredEquipments: [ID!]
    SelectableEquipments: [ID!]
    # If included resolver will delete all previous bodyAreaMoveScores and create new ones as per this field
    BodyAreaMoveScores: [BodyAreaMoveScoreInput!]
  }

  # Input for a bodyAreaMoveScore - to update scores against a specified move ID.
  input BodyAreaMoveScoreInput {
    BodyArea: ID!
    score: Float!
  }
`

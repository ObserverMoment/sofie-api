import { gql } from 'apollo-server-express'

export default gql`
  # All core / read only data that can be retrieved on app load
  type CoreData {
    bodyAreas: [BodyArea!]!
    equipment: [Equipment!]!
    moveTypes: [MoveType!]!
    workoutGoals: [WorkoutGoal!]!
    workoutSectionTypes: [WorkoutSectionType!]!
    standardMoves: [Move!]!
    progressWidgets: [ProgressWidget!]!
  }

  type BodyArea {
    id: ID!
    name: String!
    altNames: String
    frontBack: BodyAreaFrontBack!
    upperLower: BodyAreaUpperLower!
  }

  type BodyAreaMoveScore {
    BodyArea: BodyArea!
    score: Int!
  }

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

  type Move {
    id: ID!
    name: String!
    archived: Boolean!
    searchTerms: String
    description: String
    demoVideoUri: String
    demoVideoThumbUri: String
    scope: MoveScope!
    MoveType: MoveType!
    validRepTypes: [WorkoutMoveRepType!]!
    RequiredEquipments: [Equipment!]!
    SelectableEquipments: [Equipment!]!
    BodyAreaMoveScores: [BodyAreaMoveScore!]!
  }

  type MoveType {
    id: ID!
    name: String!
    description: String
    imageUri: String
  }

  # For user custom move CRUD
  input CreateMoveInput {
    name: String!
    searchTerms: String
    description: String
    demoVideoUri: String
    demoVideoThumbUri: String
    scope: MoveScope
    MoveType: ConnectRelationInput!
    # validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]!
    RequiredEquipments: [ConnectRelationInput!]
    SelectableEquipments: [ConnectRelationInput!]
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
    MoveType: ConnectRelationInput
    # If included - validRepTypes must include at least the enum TIME or an error will be thrown.
    validRepTypes: [WorkoutMoveRepType!]
    RequiredEquipments: [ConnectRelationInput!]
    SelectableEquipments: [ConnectRelationInput!]
    # If included resolver will delete all previous bodyAreaMoveScores and create new ones as per this field
    BodyAreaMoveScores: [BodyAreaMoveScoreInput!]
  }

  # Input for a bodyAreaMoveScore - to update scores against a specified move ID.
  input BodyAreaMoveScoreInput {
    BodyArea: ConnectRelationInput!
    score: Float!
  }

  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
    hexColor: String!
  }

  type WorkoutSectionType {
    id: ID!
    name: String!
    subtitle: String!
    description: String!
    validRepTypes: [WorkoutMoveRepType!]!
  }

  ### Widgets Data ####
  # Definitions for a set of pre-built but selectable widgets that the user can choose to display.
  type ProgressWidget {
    id: ID!
    createdAt: DateTime!
    name: String!
    subtitle: String
    description: String
  }
`

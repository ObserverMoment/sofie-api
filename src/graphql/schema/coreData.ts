import { gql } from 'apollo-server-express'

export default gql`
  # All core / read only data that can be retrieved on app load
  type CoreData {
    bodyAreas: [BodyArea!]!
    equipment: [Equipment!]!
    moveTypes: [MoveType!]!
    progressWidgets: [ProgressWidget!]!
    fitnessBenchmarkCategories: [FitnessBenchmarkCategory!]!
    # Deprecated
    workoutSectionTypes: [WorkoutSectionType!]!
    workoutGoals: [WorkoutGoal!]!
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

  ### Widgets Data ####
  # Definitions for a set of pre-built but selectable widgets that the user can choose to display.
  type ProgressWidget {
    id: ID!
    createdAt: DateTime!
    name: String!
    subtitle: String
    description: String
  }

  # DEPRECATED
  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
    hexColor: String!
  }

  # DEPRECATED
  type WorkoutSectionType {
    id: ID!
    name: String!
    subtitle: String!
    description: String!
    validRepTypes: [WorkoutMoveRepType!]!
  }
`

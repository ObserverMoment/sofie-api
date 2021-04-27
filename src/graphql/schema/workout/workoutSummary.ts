import { gql } from 'apollo-server-express'

/// Data tree for workout summary data required for workout lists.
/// [typename]Summary indicates that not all fields are available in this type.
/// used for displaying the minimal required in lists and summary cards.
export default gql`
  type WorkoutSummary {
    id: ID!
    # Ideally thiw would be required but needs to be nullable for now until this is resolved
    # So that Artemis type generation => DateTime coercers work.
    # https://github.com/comigor/artemis/issues/293
    createdAt: DateTime
    User: UserSummary
    name: String!
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel!
    contentAccessScope: ContentAccessScope!
    WorkoutGoals: [WorkoutGoal!]!
    WorkoutTags: [WorkoutTag!]!
    WorkoutSections: [WorkoutSectionSummary!]!
  }

  type WorkoutSectionSummary {
    id: ID!
    name: String
    timecap: Int
    sortPosition: Int!
    WorkoutSectionType: WorkoutSectionType!
    WorkoutSets: [WorkoutSetSummary!]!
  }

  type WorkoutSetSummary {
    id: ID!
    WorkoutMoves: [WorkoutMoveSummary!]!
  }

  type WorkoutMoveSummary {
    id: ID!
    Equipment: Equipment
    Move: MoveSummary!
  }

  type MoveSummary {
    id: ID!
    name: String!
    RequiredEquipments: [Equipment!]!
  }
`

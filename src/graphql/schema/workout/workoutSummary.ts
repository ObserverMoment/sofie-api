import { gql } from 'apollo-server-express'

/// Data tree for workout summary data required for workout lists.
/// [typename]Summary indicates that not all fields are available in this type.
/// used for displaying the minimal required in lists and summary cards.
export default gql`
  type WorkoutSummary {
    id: ID!
    createdAt: DateTime!
    creatorId: ID!
    creatorName: String!
    creatorAvatarUri: String
    name: String!
    description: String
    contentAccessScope: ContentAccessScope!
    lengthMinutes: Int
    difficultyLevel: DifficultyLevel!
    WorkoutGoals: [String!]!
    WorkoutTags: [String!]!
    WorkoutSections: [WorkoutSectionSummary!]!
    Moves: [String!]!
    Equipments: [String!]!
  }

  type WorkoutSectionSummary {
    name: String
    timecap: Int
    sortPosition: Int!
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    WorkoutSectionType: String!
  }
`

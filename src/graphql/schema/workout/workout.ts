import { gql } from 'apollo-server-express'

export default gql`
  type Workout {
    id: ID!
    # Ideally thiw would be required but needs to be nullable for now until this is resolved
    # So that Artemis type generation => DateTime coercers work.
    # https://github.com/comigor/artemis/issues/293
    createdAt: DateTime
    User: UserSummary!
    archived: Boolean!
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
    WorkoutSections: [WorkoutSection!]!
  }

  # Just creates the basic required fields.
  input CreateWorkoutInput {
    name: String!
    difficultyLevel: DifficultyLevel!
    contentAccessScope: ContentAccessScope!
  }

  input UpdateWorkoutInput {
    id: ID!
    archived: Boolean
    name: String
    description: String
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    coverImageUri: String
    difficultyLevel: DifficultyLevel
    contentAccessScope: ContentAccessScope
    WorkoutGoals: [ConnectRelationInput!]
    WorkoutTags: [ConnectRelationInput!]
  }

  type WorkoutGoal {
    id: ID!
    name: String!
    description: String!
  }

  type WorkoutTag {
    id: ID!
    User: User!
    tag: String!
  }

  input CreateWorkoutTagInput {
    tag: String!
  }

  input UpdateWorkoutTagInput {
    id: ID!
    tag: String!
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSection {
    id: ID!
    name: String!
    notes: String
    sortPosition: Int!
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
    Workout: Workout!
    WorkoutSectionType: WorkoutSectionType!
    WorkoutSets: [WorkoutSet!]!
    IntervalBuyIns: [WorkoutSectionIntervalBuyIn!]
  }

  input CreateWorkoutSectionInput {
    name: String!
    notes: String
    sortPosition: Int!
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
    WorkoutSectionType: ID!
  }

  input UpdateWorkoutSectionInput {
    id: ID!
    name: String
    notes: String
    sortPosition: Int
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
  }

  type WorkoutSectionIntervalBuyIn {
    id: ID!
    interval: Int!
    WorkoutMove: WorkoutMove!
  }

  input CreateWorkoutSectionIntervalBuyInInput {
    interval: Int!
    WorkoutMove: CreateWorkoutMoveInput!
    WorkoutSection: ID!
  }

  input UpdateWorkoutSectionIntervalBuyInInput {
    id: ID!
    interval: Int
    WorkoutMove: UpdateWorkoutMoveInput
  }
`

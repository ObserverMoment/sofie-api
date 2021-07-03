import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSection {
    id: ID!
    name: String
    note: String
    rounds: Int!
    timecap: Int
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
    WorkoutSectionType: WorkoutSectionType!
    WorkoutSets: [WorkoutSet!]!
  }

  input CreateWorkoutSectionInput {
    name: String
    note: String
    rounds: Int
    timecap: Int
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
    WorkoutSectionType: ConnectRelationInput!
    Workout: ConnectRelationInput!
  }

  input UpdateWorkoutSectionInput {
    id: ID!
    name: String
    note: String
    rounds: Int
    timecap: Int
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
    WorkoutSectionType: ConnectRelationInput
  }

  type WorkoutSectionType {
    id: ID!
    name: String!
    subtitle: String!
    description: String!
    validRepTypes: [WorkoutMoveRepType!]!
    WorkoutSections: [WorkoutSection!]!
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
  }
`

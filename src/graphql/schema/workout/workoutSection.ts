import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSection {
    id: ID!
    name: String
    note: String
    rounds: Int!
    timecap: Int!
    sortPosition: Int!
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
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
    WorkoutSectionType: ConnectRelationInput
  }
`

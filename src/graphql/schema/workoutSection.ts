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
    Workout: ID!
  }

  input UpdateWorkoutSectionInput {
    id: ID!
    name: String
    notes: String
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
`

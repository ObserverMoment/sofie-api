import { gql } from 'apollo-server-express'

///// builderData - shapes.
// type HiitCircuit {
//   numExercises: Int!
//   workPerExercise: Int!
//   restPerExercise: int! # Zero if no rest
//   restPerRound: Int! # Zero if no rest
// }

// type CircuitRace {
//   numExercises: Int!
// }

// type TabataSession {
//   tabatas: [Tabata!]!
// }

// type Tabata {
//   numExercises: Int!
//   sectionRest: Int! # Zero if no rest
// }

export default gql`
  type WorkoutType {
    id: ID!
    name: String
    description: String
    scoreType: WorkoutScoreType
    Workout: [Workout!]!
  }

  type Workout {
    id: ID!
    createdAt: String!
    name: String!
    summary: String
    description: String
    timecap: Int
    isCopy: Boolean
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    workoutType: WorkoutType!
    difficultyLevel: Int!
    scope: AccessScopeType!
    workoutSections: [WorkoutSection!]!
    builderData: JSON
  }

  input CreateWorkoutInput {
    name: String!
    summary: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    timecap: Int
    workoutTypeId: String!
    difficultyLevel: Int!
    scope: AccessScopeType!
    workoutSections: [CreateWorkoutSectionInput!]!
    builderData: JSON
  }

  input DeepUpdateWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    timecap: Int
    workoutTypeId: String
    difficultyLevel: Int
    scope: AccessScopeType
    workoutSections: [CreateWorkoutSectionInput!]!
    builderData: JSON
  }

  input ShallowUpdateWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    demoVideoUrl: String
    demoVideoThumbUrl: String
    youtubeVideoUrl: String
    spotifyAudio: String
    imageUrl: String
    timecap: Int
    difficultyLevel: Int
    scope: AccessScopeType
  }
`

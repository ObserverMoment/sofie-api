import { gql } from 'apollo-server-express'

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
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
    workoutSections: [WorkoutSection!]!
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
    difficultyLevel: DifficultyLevel!
    scope: AccessScopeType!
    workoutSections: [CreateWorkoutSectionInput!]!
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
    difficultyLevel: DifficultyLevel
    scope: AccessScopeType
    workoutSections: [CreateWorkoutSectionInput!]!
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
    difficultyLevel: DifficultyLevel
    scope: AccessScopeType
  }
`

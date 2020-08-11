import { gql } from 'apollo-server-express'

export default gql`
  type LoggedWorkout {
    id: ID!
    name: String!
    summary: String
    description: String
    completedOn: String!
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    workoutType: WorkoutType!
    difficultyLevel: DifficultyLevel!
    workoutSections: [WorkoutSection!]!
    originalWorkoutId: String
  }

  input CreateLoggedWorkoutInput {
    name: String
    summary: String
    description: String
    completedOn: String!
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    workoutTypeId: String!
    difficultyLevel: DifficultyLevel!
    workoutSections: [CreateWorkoutSectionInput!]!
    originalWorkoutId: String
  }

  input DeepUpdateLoggedWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    completedOn: String
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    workoutTypeId: String
    difficultyLevel: DifficultyLevel
    workoutSections: [CreateWorkoutSectionInput!]!
    originalWorkoutId: String
  }

  input ShallowUpdateLoggedWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    completedOn: String
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    difficultyLevel: DifficultyLevel
    originalWorkoutId: String
  }
`

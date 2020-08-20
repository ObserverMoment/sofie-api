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
    """
    In a loggedWorkout, when you are doing rounds of a section, each round gets entered as a separate section - with its own time log.
    """
    workoutSections: [WorkoutSection!]!
    originalWorkoutId: String
    originalWorkoutScope: AccessScopeType!
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
    originalWorkoutScope: AccessScopeType!
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
    difficultyLevel: DifficultyLevel
    workoutSections: [CreateWorkoutSectionInput!]!
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
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type LoggedWorkout {
    id: ID!
    name: String!
    summary: String
    description: String
    completedOn: DateTime!
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    workoutType: WorkoutType!
    difficultyLevel: Int!
    gymProfile: GymProfile
    """
    In a loggedWorkout, when you are doing rounds of a section, each round gets entered as a separate section - with its own time log.
    """
    workoutSections: [WorkoutSection!]!
    originalWorkoutId: String
    workoutProgramWorkout: WorkoutProgramWorkout
    scheduledWorkout: ScheduledWorkout
  }

  input CreateLoggedWorkoutInput {
    name: String
    summary: String
    description: String
    completedOn: DateTime!
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    workoutType: ID!
    gymProfile: ID
    workoutSections: [CreateWorkoutSectionInput!]!
    originalWorkout: ID!
    workoutProgramEnrolment: ID
    workoutProgramWorkout: ID
    scheduledWorkout: ID
  }

  input DeepUpdateLoggedWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    completedOn: DateTime
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    gymProfile: ID
    workoutSections: [CreateWorkoutSectionInput!]!
    workoutProgramEnrolment: ID
    workoutProgramWorkout: ID
    scheduledWorkout: ID
  }

  input ShallowUpdateLoggedWorkoutInput {
    id: ID!
    name: String
    summary: String
    description: String
    completedOn: DateTime
    notes: String
    videoUrl: String
    videoThumbUrl: String
    imageUrl: String
    duration: Int
    gymProfile: ID
    workoutProgramEnrolment: ID
    workoutProgramWorkout: ID
    scheduledWorkout: ID
  }
`

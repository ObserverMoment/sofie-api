import { gql } from 'apollo-server-express'

export default gql`
  type LoggedWorkout {
    id: ID!
    completedOn: DateTime!
    name: String!
    notes: String
    videoUri: String
    videoThumbUri: String
    imageUri: String
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
    Workout: Workout!
    ScheduledWorkout: ScheduledWorkout
    GymProfile: GymProfile
    WorkoutProgramWorkout: WorkoutProgramWorkout
    WorkoutProgramEnrolment: WorkoutProgramWorkout
  }

  input CreateLoggedWorkoutInput {
    completedOn: DateTime!
    name: String!
    notes: String
    videoUri: String
    videoThumbUri: String
    imageUri: String
    LoggedWorkoutSections: [CreateLoggedWorkoutSectionInput!]!
    Workout: ID!
    ScheduledWorkout: ID
    GymProfile: ID
    WorkoutProgramWorkout: ID
    WorkoutProgramEnrolment: ID
  }

  input UpdateLoggedWorkoutInput {
    id: ID!
    completedOn: DateTime
    name: String
    notes: String
    videoUri: String
    videoThumbUri: String
    imageUri: String
    LoggedWorkoutSections: [CreateLoggedWorkoutSectionInput!]
    Workout: ID
    ScheduledWorkout: ID
    GymProfile: ID
    WorkoutProgramWorkout: ID
    WorkoutProgramEnrolment: ID
  }

  type LoggedWorkoutSection {
    id: ID!
    sortPosition: Int!
    timeTakenMs: Int!
    notes: String
    WorkoutSectionType: WorkoutSectionType!
    LoggedWorkoutSets: [LoggedWorkoutSet!]!
    LoggedWorkout: LoggedWorkout!
  }

  input CreateLoggedWorkoutSectionInput {
    sortPosition: Int!
    timeTakenMs: Int!
    notes: String
    WorkoutSectionType: ID!
    LoggedWorkoutSets: [CreateLoggedWorkoutSetInput!]!
  }

  type LoggedWorkoutSet {
    id: ID!
    setIndex: Int!
    roundIndex: Int!
    timeTakenMs: Int
    LoggedWorkoutMoves: [LoggedWorkoutMove!]!
  }

  input CreateLoggedWorkoutSetInput {
    setIndex: Int!
    roundIndex: Int!
    timeTakenMs: Int
    LoggedWorkoutMoves: [CreateLoggedWorkoutMoveInput!]!
  }

  type LoggedWorkoutMove {
    id: ID!
    sortPosition: Int!
    timeTakenMs: Int
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit!
    loadAmount: Float
    loadUnit: LoadUnit!
    Move: Move!
    Equipment: Equipment
  }

  input CreateLoggedWorkoutMoveInput {
    sortPosition: Int!
    timeTakenMs: Int
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ID!
    Equipment: ID
  }
`

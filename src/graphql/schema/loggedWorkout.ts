import { gql } from 'apollo-server-express'

export default gql`
  #### Types / Return Values - Full Structure Retrievable ####
  type LoggedWorkout {
    id: ID!
    completedOn: DateTime!
    name: String!
    note: String
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
    Workout: Workout!
    ScheduledWorkout: ScheduledWorkout
    GymProfile: GymProfile
    WorkoutProgramWorkout: WorkoutProgramWorkout
    WorkoutProgramEnrolment: WorkoutProgramWorkout
  }

  type LoggedWorkoutSection {
    id: ID!
    name: String
    sectionIndex: Int!
    timecap: Int
    timeTakenMs: Int
    roundsCompleted: Int!
    laptimesMs: [Int!]!
    repScore: Int
    note: String
    WorkoutSectionType: WorkoutSectionType!
    LoggedWorkoutSets: [LoggedWorkoutSet!]!
    LoggedWorkout: LoggedWorkout!
  }

  type LoggedWorkoutSet {
    id: ID!
    setIndex: Int!
    roundsCompleted: Int!
    laptimesMs: [Int!]!
    timeTakenMs: Int
    LoggedWorkoutMoves: [LoggedWorkoutMove!]!
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

  #### Create Inputs - Full Structure Passed When Creating ####
  input CreateLoggedWorkoutInput {
    completedOn: DateTime!
    name: String!
    note: String
    LoggedWorkoutSections: [CreateLoggedWorkoutSectionInLoggedWorkoutInput!]!
    Workout: ConnectRelationInput
    ScheduledWorkout: ConnectRelationInput
    GymProfile: ConnectRelationInput
    WorkoutProgramWorkout: ConnectRelationInput
    WorkoutProgramEnrolment: ConnectRelationInput
  }

  input CreateLoggedWorkoutSectionInLoggedWorkoutInput {
    name: String
    sectionIndex: Int!
    roundsCompleted: Int!
    laptimesMs: [Int!]
    repScore: Int
    timecap: Int
    timeTakenMs: Int
    note: String
    WorkoutSectionType: ConnectRelationInput!
    LoggedWorkoutSets: [CreateLoggedWorkoutSetInLoggedSectionInput!]!
  }

  input CreateLoggedWorkoutSetInLoggedSectionInput {
    setIndex: Int!
    roundsCompleted: Int!
    laptimesMs: [Int!]
    timeTakenMs: Int
    LoggedWorkoutMoves: [CreateLoggedWorkoutMoveInLoggedSetInput!]!
  }

  input CreateLoggedWorkoutMoveInLoggedSetInput {
    sortPosition: Int!
    timeTakenMs: Int
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }

  #### Used when editing a logged workout that already exists ####
  #### Create and attach to parent ####
  input CreateLoggedWorkoutSectionInput {
    name: String
    sectionIndex: Int!
    roundsCompleted: Int!
    laptimesMs: [Int!]
    repScore: Int
    timeTakenMs: Int
    timecap: Int
    note: String
    WorkoutSectionType: ConnectRelationInput!
    LoggedWorkout: ConnectRelationInput!
  }

  input CreateLoggedWorkoutSetInput {
    setIndex: Int!
    roundsCompleted: Int!
    laptimesMs: [Int!]
    timeTakenMs: Int
    LoggedWorkoutSection: ConnectRelationInput!
  }

  input CreateLoggedWorkoutMoveInput {
    sortPosition: Int!
    timeTakenMs: Int
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
    LoggedWorkoutSet: ConnectRelationInput!
  }

  #### Update Inputs - Updates are made atomically at each level. (Non nested) ####
  input UpdateLoggedWorkoutInput {
    id: ID!
    completedOn: DateTime
    name: String
    note: String
    GymProfile: ConnectRelationInput
  }

  input UpdateLoggedWorkoutSectionInput {
    id: ID!
    name: String
    timeTakenMs: Int
    roundsCompleted: Int
    laptimesMs: [Int!]
    timecap: Int
    repScore: Int
    note: String
  }

  input UpdateLoggedWorkoutSetInput {
    id: ID!
    timeTakenMs: Int
    roundsCompleted: Int
    laptimesMs: [Int!]
  }

  input UpdateLoggedWorkoutMoveInput {
    id: ID!
    timeTakenMs: Int
    reps: Float
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ConnectRelationInput
    Equipment: ConnectRelationInput
  }
`

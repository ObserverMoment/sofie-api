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

  # roundTimesMs shape - for each section round number.
  # { sectionRoundNumber: {
  #   time: roundTimeMs,
  #   setId: { setRoundNumber: setTimeMs, setRoundNumber: setTimeMs },
  #   setId: { setRoundNumber: setTimeMs, setRoundNumber: setTimeMs }
  #  }
  # }
  type LoggedWorkoutSection {
    id: ID!
    name: String
    sortPosition: Int!
    timecap: Int
    roundsCompleted: Int!
    timeTakenMs: Int
    roundTimesMs: JSON!
    repScore: Int
    note: String
    WorkoutSectionType: WorkoutSectionType!
    LoggedWorkoutSets: [LoggedWorkoutSet!]!
    LoggedWorkout: LoggedWorkout!
  }

  type LoggedWorkoutSet {
    id: ID!
    note: String
    sortPosition: Int!
    roundsCompleted: Int!
    duration: Int
    LoggedWorkoutMoves: [LoggedWorkoutMove!]!
  }

  type LoggedWorkoutMove {
    id: ID!
    sortPosition: Int!
    note: String
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit!
    loadAmount: Float
    loadUnit: LoadUnit!
    timeUnit: TimeUnit!
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
    note: String
    sortPosition: Int!
    roundsCompleted: Int!
    timeTakenMs: Int
    roundTimesMs: JSON
    repScore: Int
    timecap: Int
    WorkoutSectionType: ConnectRelationInput!
    LoggedWorkoutSets: [CreateLoggedWorkoutSetInLoggedSectionInput!]!
  }

  input CreateLoggedWorkoutSetInLoggedSectionInput {
    sortPosition: Int!
    note: String
    roundsCompleted: Int!
    duration: Int
    LoggedWorkoutMoves: [CreateLoggedWorkoutMoveInLoggedSetInput!]!
  }

  input CreateLoggedWorkoutMoveInLoggedSetInput {
    sortPosition: Int!
    note: String
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    Move: ConnectRelationInput!
    Equipment: ConnectRelationInput
  }

  #### Used when editing a logged workout that already exists ####
  #### Create and attach to parent ####
  input CreateLoggedWorkoutSectionInput {
    name: String
    note: String
    sortPosition: Int!
    roundsCompleted: Int!
    timeTakenMs: Int
    roundTimesMs: JSON
    repScore: Int
    timecap: Int
    WorkoutSectionType: ConnectRelationInput!
    LoggedWorkout: ConnectRelationInput!
  }

  input CreateLoggedWorkoutSetInput {
    sortPosition: Int!
    note: String
    roundsCompleted: Int!
    duration: Int
    LoggedWorkoutSection: ConnectRelationInput!
  }

  input CreateLoggedWorkoutMoveInput {
    sortPosition: Int!
    note: String
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
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
    roundsCompleted: Int
    timeTakenMs: Int
    roundTimesMs: JSON
    timecap: Int
    repScore: Int
    note: String
  }

  input UpdateLoggedWorkoutSetInput {
    id: ID!
    note: String
    duration: Int
    roundsCompleted: Int
  }

  input UpdateLoggedWorkoutMoveInput {
    id: ID!
    note: String
    reps: Float
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    Move: ConnectRelationInput
    Equipment: ConnectRelationInput
  }
`

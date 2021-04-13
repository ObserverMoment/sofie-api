import { gql } from 'apollo-server-express'

export default gql`
  #### Types / Return Values - Full Structure Retrievable ####
  type LoggedWorkout {
    id: ID!
    completedOn: DateTime!
    name: String!
    note: String
    imageUri: String
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
    Workout: Workout!
    ScheduledWorkout: ScheduledWorkout
    GymProfile: GymProfile
    WorkoutProgramWorkout: WorkoutProgramWorkout
    WorkoutProgramEnrolment: WorkoutProgramWorkout
  }

  type LoggedWorkoutSection {
    id: ID!
    setIndex: Int!
    roundIndex: Int!
    timeTakenMs: Int!
    note: String
    WorkoutSectionType: WorkoutSectionType!
    LoggedWorkoutSets: [LoggedWorkoutSet!]!
    LoggedWorkout: LoggedWorkout!
  }

  type LoggedWorkoutSet {
    id: ID!
    setIndex: Int!
    roundIndex: Int!
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
    imageUri: String
    LoggedWorkoutSections: [CreateLoggedWorkoutSectionInLoggedWorkoutInput!]!
    Workout: ID!
    ScheduledWorkout: ID
    GymProfile: ID
    WorkoutProgramWorkout: ID
    WorkoutProgramEnrolment: ID
  }

  input CreateLoggedWorkoutSectionInLoggedWorkoutInput {
    sectionIndex: Int!
    roundIndex: Int!
    timeTakenMs: Int!
    note: String
    WorkoutSectionType: ID!
    LoggedWorkoutSets: [CreateLoggedWorkoutSetInLoggedSectionInput!]!
  }

  input CreateLoggedWorkoutSetInLoggedSectionInput {
    setIndex: Int!
    roundIndex: Int!
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
    Move: ID!
    Equipment: ID
  }

  #### Create and attach to parent ####
  input CreateLoggedWorkoutSectionInput {
    sectionIndex: Int!
    roundIndex: Int!
    timeTakenMs: Int!
    note: String
    WorkoutSectionType: ID!
    LoggedWorkout: ID!
  }

  input CreateLoggedWorkoutSetInput {
    setIndex: Int!
    roundIndex: Int!
    timeTakenMs: Int
    LoggedWorkoutSection: ID!
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
    LoggedWorkoutSet: ID!
  }

  #### Update Inputs - Updates are made atomically at each level. (Non nested) ####
  #### Relationships can be updated by passing the ID to the relationship name field. ####
  input UpdateLoggedWorkoutInput {
    id: ID!
    completedOn: DateTime
    name: String
    note: String
    imageUri: String
    ScheduledWorkout: ID
    GymProfile: ID
    WorkoutProgramWorkout: ID
    WorkoutProgramEnrolment: ID
  }

  input UpdateLoggedWorkoutSectionInput {
    id: ID!
    timeTakenMs: Int
    note: String
  }

  input UpdateLoggedWorkoutSetInput {
    id: ID!
    timeTakenMs: Int
  }

  input UpdateLoggedWorkoutMoveInput {
    id: ID!
    timeTakenMs: Int
    reps: Float
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    Move: ID
    Equipment: ID
  }
`

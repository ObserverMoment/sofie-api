import { gql } from 'apollo-server-express'

export default gql`
  # Workouts sessions completed + total time worked + ?
  type LifetimeLogStatsSummary {
    sessionsLogged: Int!
    minutesWorked: Int!
  }

  #### Types / Return Values - Full Structure Retrievable ####
  type LoggedWorkout {
    id: ID!
    completedOn: DateTime!
    name: String!
    note: String
    workoutId: ID # Scalar.
    User: UserAvatarData
    GymProfile: GymProfile
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
    WorkoutGoals: [WorkoutGoal!]!
  }

  type LoggedWorkoutSection {
    id: ID!
    name: String
    sortPosition: Int!
    timeTakenSeconds: Int!
    repScore: Int
    loggedWorkoutSectionData: LoggedWorkoutSectionData #### Deprecated ####
    WorkoutSectionType: WorkoutSectionType!
    LoggedWorkoutSets: [LoggedWorkoutSet!]!
    LoggedWorkout: LoggedWorkout!
  }

  type LoggedWorkoutSet {
    id: ID!
    sectionRoundNumber: Int!
    timeTakenSeconds: Int
    LoggedWorkoutMoves: [LoggedWorkoutMove!]!
  }

  type LoggedWorkoutMove {
    id: ID!
    sortPosition: Int!
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit!
    loadAmount: Float!
    loadUnit: LoadUnit!
    timeUnit: TimeUnit!
    Equipment: Equipment
    Move: Move!
  }

  #### Create Inputs - Nested create of LoggedWorkout + LoggedWorkoutSections etc ####
  input CreateLoggedWorkoutInput {
    completedOn: DateTime!
    name: String!
    note: String
    GymProfile: ConnectRelationInput
    Workout: ConnectRelationInput
    WorkoutGoals: [ConnectRelationInput!]!
    LoggedWorkoutSections: [CreateLoggedWorkoutSectionInLoggedWorkoutInput!]!
    # If the log should be connected to a ScheduledWorkout or a WorkoutPlanEnrolment then provide these.
    ScheduledWorkout: ConnectRelationInput
    # These objects are not related to the LoggedWorkout. We use them to create a CompletedWorkoutPlanDayWorkout - if they are both provided.
    WorkoutPlanDayWorkout: ConnectRelationInput
    WorkoutPlanEnrolment: ConnectRelationInput
  }

  input CreateLoggedWorkoutSectionInLoggedWorkoutInput {
    name: String
    sortPosition: Int!
    repScore: Int
    timeTakenSeconds: Int!
    loggedWorkoutSectionData: LoggedWorkoutSectionDataInput! #### Deprecated ####
    WorkoutSectionType: ConnectRelationInput!
    loggedWorkoutSet: CreateLoggedWorkoutSetInLoggedWorkoutSectionInput!
  }

  input CreateLoggedWorkoutSetInLoggedWorkoutSectionInput {
    sectionRoundNumber: Int!
    timeTakenSeconds: Int
    LoggedWorkoutMoves: CreateLoggedWorkoutMoveInLoggedWorkoutSetInput!
  }

  input CreateLoggedWorkoutMoveInLoggedWorkoutSetInput {
    sortPosition: Int!
    repType: WorkoutMoveRepType!
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    Equipment: ConnectRelationInput
    Move: ConnectRelationInput!
  }

  #### Update Inputs - Updates are made atomically at each level. (Non nested) ####
  input UpdateLoggedWorkoutInput {
    id: ID!
    completedOn: DateTime
    note: String
    GymProfile: ConnectRelationInput
    WorkoutGoals: [ConnectRelationInput!]!
  }

  input UpdateLoggedWorkoutSectionInput {
    id: ID!
    timeTakenSeconds: Int
    repScore: Int
    loggedWorkoutSectionData: LoggedWorkoutSectionDataInput #### Deprecated ####
  }

  input UpdateLoggedWorkoutSetInput {
    id: ID!
    timeTakenSeconds: Int
  }

  input UpdateLoggedWorkoutMoveInput {
    id: ID!
    repType: WorkoutMoveRepType
    reps: Float!
    distanceUnit: DistanceUnit
    loadAmount: Float
    loadUnit: LoadUnit
    timeUnit: TimeUnit
    Equipment: ConnectRelationInput
    Move: ConnectRelationInput
  }

  ######### Structure for JSON type in the database. ###########
  ######### Deprecated Jan 2022 #######
  type LoggedWorkoutSectionData {
    rounds: [WorkoutSectionRoundData!]!
  }

  type WorkoutSectionRoundData {
    timeTakenSeconds: Int!
    sets: [WorkoutSectionRoundSetData!]!
  }

  type WorkoutSectionRoundSetData {
    timeTakenSeconds: Int!
    # Comma separated list of the moves in the set. Including reps, move name and load.
    moves: String!
  }

  input LoggedWorkoutSectionDataInput {
    rounds: [WorkoutSectionRoundDataInput!]!
  }

  input WorkoutSectionRoundDataInput {
    timeTakenSeconds: Int!
    sets: [WorkoutSectionRoundSetDataInput!]!
  }

  input WorkoutSectionRoundSetDataInput {
    timeTakenSeconds: Int!
    # Comma separated list of the moves in the set. Including reps, move name and load.
    moves: String!
  }
`

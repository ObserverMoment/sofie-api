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
    WorkoutSectionType: WorkoutSectionType!
    LoggedWorkoutSets: [LoggedWorkoutSet!]!
  }

  type LoggedWorkoutSet {
    id: ID!
    sectionRoundNumber: Int!
    sortPosition: Int!
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
    WorkoutSectionType: ConnectRelationInput!
    LoggedWorkoutSets: [CreateLoggedWorkoutSetInLoggedWorkoutSectionInput!]!
  }

  input CreateLoggedWorkoutSetInLoggedWorkoutSectionInput {
    sectionRoundNumber: Int!
    sortPosition: Int!
    timeTakenSeconds: Int
    LoggedWorkoutMoves: [CreateLoggedWorkoutMoveInLoggedWorkoutSetInput!]!
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
`

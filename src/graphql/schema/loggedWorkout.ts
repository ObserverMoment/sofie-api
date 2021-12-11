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
    User: UserSummary!
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
    loggedWorkoutSectionData: LoggedWorkoutSectionData
    BodyAreas: [BodyArea!]!
    WorkoutSectionType: WorkoutSectionType!
    MoveTypes: [MoveType!]!
    LoggedWorkout: LoggedWorkout!
  }

  #### Create Inputs - Nested create of LoggedWorkout + LoggedWorkoutSections ####
  input CreateLoggedWorkoutInput {
    completedOn: DateTime!
    name: String!
    note: String
    LoggedWorkoutSections: [CreateLoggedWorkoutSectionInLoggedWorkoutInput!]!
    GymProfile: ConnectRelationInput
    Workout: ConnectRelationInput
    WorkoutGoals: [ConnectRelationInput!]!
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
    loggedWorkoutSectionData: LoggedWorkoutSectionDataInput!
    WorkoutSectionType: ConnectRelationInput!
    BodyAreas: [ConnectRelationInput!]!
    MoveTypes: [ConnectRelationInput!]!
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
    loggedWorkoutSectionData: LoggedWorkoutSectionDataInput
    BodyAreas: [ConnectRelationInput!]!
    MoveTypes: [ConnectRelationInput!]!
  }

  ######### Structure for JSON type in the database. ###########
  type LoggedWorkoutSectionData {
    rounds: [WorkoutSectionRoundData!]!
  }

  type WorkoutSectionRoundData {
    timeTakenSeconds: Int!
    sets: [WorkoutSectionRoundSetData!]!
  }

  type WorkoutSectionRoundSetData {
    rounds: Int!
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
    rounds: Int!
    timeTakenSeconds: Int!
    # Comma separated list of the moves in the set. Including reps, move name and load.
    moves: String!
  }
`

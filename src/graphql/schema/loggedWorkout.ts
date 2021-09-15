import { gql } from 'apollo-server-express'

export default gql`
  #### Types / Return Values - Full Structure Retrievable ####
  type LoggedWorkout {
    id: ID!
    completedOn: DateTime!
    name: String!
    note: String
    GymProfile: GymProfile
    LoggedWorkoutSections: [LoggedWorkoutSection!]!
    ScheduledWorkout: ScheduledWorkout
    Workout: Workout
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
    ScheduledWorkout: ConnectRelationInput
    Workout: ConnectRelationInput
    WorkoutGoals: [ConnectRelationInput!]!
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
  }

  input UpdateLoggedWorkoutSectionInput {
    id: ID!
    timeTakenSeconds: Int
    repScore: Int
    loggedWorkoutSectionData: LoggedWorkoutSectionDataInput
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

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
    note: String
    timecap: Int
    sortPosition: Int!
    timeTakenSeconds: Int!
    repScore: Int
    workoutSectionData: WorkoutSectionData
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
    note: String
    timecap: Int
    sortPosition: Int!
    repScore: Int
    timeTakenSeconds: Int!
    workoutSectionData: WorkoutSectionDataInput!
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
    note: String
    timeTakenSeconds: Int
    repScore: Int
    workoutSectionData: WorkoutSectionDataInput
  }

  ######### Structure for JSON type in the database. ###########
  type WorkoutSectionData {
    rounds: [WorkoutSectionRoundData!]!
  }

  type WorkoutSectionRoundData {
    timeTakenSeconds: Int!
    sets: [WorkoutSectionRoundSetData!]!
  }

  type WorkoutSectionRoundSetData {
    timeTakenSeconds: Int!
    move: String!
    load: String
    quantity: String!
  }

  input WorkoutSectionDataInput {
    rounds: [WorkoutSectionRoundDataInput!]!
  }

  input WorkoutSectionRoundDataInput {
    timeTakenSeconds: Int!
    sets: [WorkoutSectionRoundSetDataInput!]!
  }

  input WorkoutSectionRoundSetDataInput {
    timeTakenSeconds: Int!
    move: String!
    load: String
    quantity: String!
  }
`

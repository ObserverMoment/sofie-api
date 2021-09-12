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
  }

  type LoggedWorkoutSection {
    id: ID!
    name: String
    note: String
    timecap: Int
    sortPosition: Int!
    timeTakenMs: Int
    repScore: Int
    workoutSectionData: WorkoutSectionData!
    BodyAreas: [BodyArea!]!
    WorkoutSectionType: WorkoutSectionType!
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
  }

  input CreateLoggedWorkoutSectionInLoggedWorkoutInput {
    name: String
    note: String
    timecap: Int
    sortPosition: Int!
    repScore: Int
    timeTakenMs: Int
    workoutSectionData: WorkoutSectionDataInput!
    WorkoutSectionType: ConnectRelationInput!
    BodyAreas: [ConnectRelationInput!]!
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
    note: String
    timeTakenMs: Int
    timecap: Int
    repScore: Int
    workoutSectionData: WorkoutSectionDataInput
    BodyAreas: [ConnectRelationInput!]!
  }

  ######### Structure for JSON type in the database. ###########
  type WorkoutSectionData {
    rounds: [WorkoutSectionRoundData!]!
  }

  type WorkoutSectionRoundData {
    timeTakenMs: Int
    sets: [WorkoutSectionRoundSetData!]!
  }

  type WorkoutSectionRoundSetData {
    timeTakenMs: Int
    move: String!
    load: String
    quantity: String!
  }

  input WorkoutSectionDataInput {
    rounds: [WorkoutSectionRoundDataInput!]!
  }

  input WorkoutSectionRoundDataInput {
    timeTakenMs: Int
    sets: [WorkoutSectionRoundSetDataInput!]!
  }

  input WorkoutSectionRoundSetDataInput {
    timeTakenMs: Int
    move: String!
    load: String
    quantity: String!
  }
`

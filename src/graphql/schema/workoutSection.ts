import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSection {
    id: ID!
    name: String!
    notes: String
    sortPosition: Int!
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
    Workout: Workout!
    TrainingWorkoutSection: TrainingWorkoutSection
    TimedWorkoutSection: TimedWorkoutSection
    AmrapWorkoutSection: AmrapWorkoutSection
    FortimeWorkoutSection: FortimeWorkoutSection
    LastStandingWorkoutSection: LastStandingWorkoutSection
    WorkoutSectionType: WorkoutSectionType!
  }

  input CreateWorkoutSectionInput {
    name: String!
    notes: String
    sortPosition: Int!
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
    TrainingWorkoutSection: CreateTrainingWorkoutSectionInput
    TimedWorkoutSection: CreateTimedWorkoutSectionInput
    AmrapWorkoutSection: CreateAmrapWorkoutSectionInput
    FortimeWorkoutSection: CreateFortimeWorkoutSectionInput
    LastStandingWorkoutSection: CreateLastStandingWorkoutSectionInput
    WorkoutSectionType: ID!
  }

  input UpdateWorkoutSectionInput {
    id: ID!
    name: String
    notes: String
    sortPosition: Int
    introVideoUri: String
    introVideoThumbUri: String
    introAudioUri: String
    classVideoUri: String
    classVideoThumbUri: String
    classAudioUri: String
    outroVideoUri: String
    outroVideoThumbUri: String
    outroAudioUri: String
    TrainingWorkoutSection: CreateTrainingWorkoutSectionInput
    TimedWorkoutSection: CreateTimedWorkoutSectionInput
    AmrapWorkoutSection: CreateAmrapWorkoutSectionInput
    FortimeWorkoutSection: CreateFortimeWorkoutSectionInput
    LastStandingWorkoutSection: CreateLastStandingWorkoutSectionInput
    WorkoutSectionType: ID
  }

  type TimedWorkoutSection {
    id: ID!
    rounds: Int!
    WorkoutSets: [WorkoutSet!]!
  }

  input CreateTimedWorkoutSectionInput {
    rounds: Int!
    WorkoutSets: [CreateWorkoutSetInput!]!
  }

  type TrainingWorkoutSection {
    id: ID
    WorkoutSets: [WorkoutSet!]!
  }

  input CreateTrainingWorkoutSectionInput {
    WorkoutSets: [CreateWorkoutSetInput!]!
  }

  type AmrapWorkoutSection {
    id: ID
    timecap: Int!
    WorkoutSets: [WorkoutSet!]!
  }

  input CreateAmrapWorkoutSectionInput {
    timecap: Int!
    WorkoutSets: [CreateWorkoutSetInput!]!
  }

  type FortimeWorkoutSection {
    id: ID
    rounds: Int!
    timecap: Int
    WorkoutSets: [WorkoutSet!]!
  }

  input CreateFortimeWorkoutSectionInput {
    rounds: Int!
    timecap: Int
    WorkoutSets: [CreateWorkoutSetInput!]!
  }

  type LastStandingWorkoutSection {
    id: ID
    finishAfter: Int
    # Must have at least one timecap (time period)
    timecaps: [Int!]!
    WorkoutSets: [WorkoutSet!]!
  }

  input CreateLastStandingWorkoutSectionInput {
    finishAfter: Int
    # Must have at least one timecap (time period)
    timecaps: [Int!]!
    WorkoutSets: [CreateWorkoutSetInput!]!
  }

  type WorkoutSet {
    id: ID!
    sortPosition: Int!
    rounds: Int!
    notes: String
    # If there is more than one move then this is a superset
    # In a superset you do each workoutMove in the array one after another
    # And then repeat this process rounds times
    WorkoutMoves: [WorkoutMove!]!
  }

  input CreateWorkoutSetInput {
    sortPosition: Int!
    rounds: Int!
    notes: String
    WorkoutMoves: [CreateWorkoutMoveInput!]!
  }
`

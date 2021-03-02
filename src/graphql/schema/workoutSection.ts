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
    AmrapWorkoutSection: AmrapWorkoutSection
    LastStandingWorkoutSection: LastStandingWorkoutSection
    WorkoutSectionType: WorkoutSectionType!
    WorkoutSets: [WorkoutSet!]!
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
    AmrapWorkoutSection: CreateAmrapWorkoutSectionInput
    LastStandingWorkoutSection: CreateLastStandingWorkoutSectionInput
    WorkoutSectionType: ID!
    WorkoutSets: [CreateWorkoutSetInput!]!
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
    AmrapWorkoutSection: CreateAmrapWorkoutSectionInput
    LastStandingWorkoutSection: CreateLastStandingWorkoutSectionInput
    WorkoutSectionType: ID
    WorkoutSets: [CreateWorkoutSetInput!]
  }

  type TrainingWorkoutSection {
    id: ID
    rounds: Int!
  }

  input CreateTrainingWorkoutSectionInput {
    rounds: Int!
  }

  type AmrapWorkoutSection {
    id: ID
    timecap: Int!
  }

  input CreateAmrapWorkoutSectionInput {
    timecap: Int!
  }

  type LastStandingWorkoutSection {
    id: ID
    finishAfter: Int
    # Must have at least one timecap (time period)
    # This array will loop until finishAfter or until user quits
    timecaps: [Int!]!
  }

  input CreateLastStandingWorkoutSectionInput {
    finishAfter: Int
    # Must have at least one timecap (time period)
    timecaps: [Int!]!
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

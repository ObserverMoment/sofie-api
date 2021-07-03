import { gql } from 'apollo-server-express'

export default gql`
  input WorkoutFiltersInput {
    difficultyLevel: DifficultyLevel
    hasClassVideo: Boolean
    hasClassAudio: Boolean
    maxLength: Int
    minLength: Int
    workoutSectionTypes: [ID!]!
    workoutGoals: [ID!]!
    bodyweightOnly: Boolean
    availableEquipments: [ID!]!
    # Consider excluding custom moves from these two move filters?
    # The metaData generated for workouts (which includes body areas) would have to be updated every time a user changes their custom move. All workouts using this move would have to be found and updated every time they change the body areas...is this an issue? How valuable is it for users to be able to include their own or other users custom moves when searching.
    requiredMoves: [ID!]!
    excludedMoves: [ID!]!
    targetedBodyAreas: [ID!]!
  }

  input WorkoutPlanFiltersInput {
    difficultyLevel: DifficultyLevel
    lengthWeeks: Int
    daysPerWeek: Int
    workoutGoals: [ID!]!
    bodyweightOnly: Boolean
  }
`

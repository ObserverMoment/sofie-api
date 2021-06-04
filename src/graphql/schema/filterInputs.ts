import { gql } from 'apollo-server-express'

export default gql`
  # These fields match the fields in the Workout.metaData Json blob.
  input WorkoutFiltersInput {
    difficultyLevel: DifficultyLevel
    hasClassVideo: Boolean
    maxLength: Int
    minLength: Int
    workoutSectionTypes: [ID!]!
    workoutGoals: [ID!]!
    bodyweightOnly: Boolean
    availableEquipments: [ID!]!
    # Consider excluding custom moves from these two move filters?
    # The metaData generated for workouts (which includes body areas) would have to be updated every time a user changes their custom move. All workouts using this move would have to be found and updated every time they change the body areas...is this an issue? How valuable is it for users to be abl eto include their own or other users custom moves when searching.
    requiredMoves: [ID!]!
    excludedMoves: [ID!]!
    targetedBodyAreas: [ID!]!
  }
`

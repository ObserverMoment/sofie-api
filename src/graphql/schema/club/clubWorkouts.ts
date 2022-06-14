import { gql } from 'apollo-server-express'

export default gql`
  type ClubWorkouts {
    ResistanceWorkouts: [ResistanceWorkout!]!
    CardioWorkouts: [CardioWorkout!]!
    IntervalWorkouts: [IntervalWorkout!]!
    AmrapWorkouts: [AmrapWorkout!]!
    ForTimeWorkouts: [ForTimeWorkout!]!
    MobilityWorkouts: [MobilityWorkout!]!
  }

  type ClubResistanceWorkout {
    id: ID!
    name: String!
    coverImageUri: String
    ResistanceWorkout: ResistanceWorkout!
  }

  ### ClubWorkouts Pagination and Filtering ###
  # Resolver will only request type when input field is true #
  input ClubWorkoutsRequestTypes {
    resistanceWorkouts: Boolean
    cardioWorkouts: Boolean
    intervalWorkouts: Boolean
    amrapWorkouts: Boolean
    forTimeWorkouts: Boolean
    mobilityWorkouts: Boolean
  }

  input ClubWorkoutsCursors {
    resistanceWorkout: String
    cardioWorkout: String
    intervalWorkout: String
    amrapWorkout: String
    forTimeWorkout: String
    mobilityWorkout: String
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  """
  Enums
  """
  enum ContentAccessScope {
    PRIVATE
    PUBLIC
    GROUP
    OFFICIAL
  }

  enum BodyAreaFrontBack {
    BACK
    FRONT
    BOTH
  }

  enum BodyAreaUpperLower {
    CORE
    LOWER
    UPPER
  }

  enum DistanceUnit {
    METRES
    KILOMETRES
    YARDS
    MILES
  }

  enum Gender {
    MALE
    FEMALE
    NONBINARY
  }

  enum LoadUnit {
    KG
    LB
    BODYWEIGHTPERCENT
  }

  """
  Standard moves are built in / official.
  Custom moves are created by users.
  """
  enum MoveScope {
    STANDARD
    CUSTOM
  }

  enum ThemePreference {
    DARK
    LIGHT
  }

  enum UnitSystem {
    IMPERIAL
    METRIC
  }

  enum WorkoutMoveRepType {
    REPS
    CALORIES
    DISTANCE
    TIME
  }

  enum UserProfileScope {
    PRIVATE
    PUBLIC
  }
`

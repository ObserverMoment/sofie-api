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

  enum HeightUnit {
    CM
    IN
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

  enum ThemeName {
    DARK
    LIGHT
  }

  enum UnitSystem {
    IMPERIAL
    METRIC
  }

  enum WeightUnit {
    KG
    LB
  }

  enum WorkoutMoveRepType {
    REPS
    CALORIES
    DISTANCE
    TIME
  }

  enum WorkoutSetGeneratorTarget {
    REPS
    LOAD
  }

  enum WorkoutSetGeneratorType {
    LADDERUP
    LADDERDOWN
    PYRAMIDUP
    PYRAMIDDOWN
  }

  enum UserProfileScope {
    PRIVATE
    PUBLIC
  }
`

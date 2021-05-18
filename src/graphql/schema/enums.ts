import { gql } from 'apollo-server-express'

export default gql`
  """
  Enums
  """
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

  enum BodyweightUnit {
    KG
    LB
  }

  enum ContentAccessScope {
    PRIVATE
    PUBLIC
    GROUP
  }

  enum DifficultyLevel {
    LIGHT
    CHALLENGING
    INTERMEDIATE
    ADVANCED
    ELITE
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
    NONE
  }

  enum LoadUnit {
    KG
    LB
    BODYWEIGHTPERCENT
    PERCENTMAX
  }

  """
  Standard moves are built in / official.
  Custom moves are created by users.
  """
  enum MoveScope {
    STANDARD
    CUSTOM
  }

  enum TimeUnit {
    HOURS
    MINUTES
    SECONDS
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

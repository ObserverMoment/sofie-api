import { gql } from 'apollo-server-express'

export default gql`
  """
  Enums
  enums
  """
  enum AccessScopeType {
    PRIVATE
    PUBLIC
    PAID
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

  enum DifficultyLevel {
    ONE
    TWO
    THREE
    FOUR
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
    UNSPECIFIED
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

  enum MoveType {
    GENERAL
    CARDIO
    YOGAFLEX
    BARRE
    PILATES
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

  """
  AMREPS in reps
  TIME in seconds
  LOAD in kgs
  EMON in reps
  """
  enum WorkoutScoreType {
    AMREPS
    FORTIME
    FORLOAD
  }

  enum UserProfileScope {
    PRIVATE
    PUBLIC
  }

  """
  For generating rules which can adjust rep and load over the course of a workout
  """
  enum RuleAction {
    INCREASE
    DECREASE
    MULTIPLY
  }

  """
  For generating rules which can adjust rep and load over the course of a workout
  """
  enum RuleTarget {
    REPS
    LOAD
  }
`

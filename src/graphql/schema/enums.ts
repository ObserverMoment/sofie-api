import { gql } from 'apollo-server-express'

export default gql`
  """
  Enums
  """
  enum AccessScopeType {
    PRIVATE
    PUBLIC
    PAID
    OFFICIAL
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

  enum FrequencyPeriod {
    DAY
    TWODAYS
    WEEK
    TWOWEEKS
    MONTH
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

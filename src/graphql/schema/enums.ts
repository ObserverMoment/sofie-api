import { gql } from 'apollo-server-express'

export default gql`
  """
  Enums
  """
  enum AccessScopeType {
    OFFICIAL
    PUBLIC
    GROUP
    PRIVATE
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

  enum UserSubscriptionLevel {
    FREE
    PAID
  }

  enum Gender {
    MALE
    FEMALE
    UNSPECIFIED
  }

  enum DifficultyLevel {
    ONE
    TWO
    THREE
    FOUR
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

  enum UnitSystem {
    IMPERIAL
    METRIC
  }

  enum LoadUnit {
    KG
    LB
    BODYWEIGHTPERCENT
  }

  enum DistanceUnit {
    METRES
    KILOMETRES
    YARDS
    MILES
  }

  enum ThemePreference {
    DARK
    LIGHT
  }
`

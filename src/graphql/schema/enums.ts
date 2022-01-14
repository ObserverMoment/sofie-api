import { gql } from 'apollo-server-express'

export default gql`
  """
  Enums
  """
  enum BenchmarkType {
    AMRAP
    MAXLOAD
    FASTESTTIME
    UNBROKENREPS
    UNBROKENTIME
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

  enum BodyweightUnit {
    KG
    LB
  }

  enum ContentAccessScope {
    PRIVATE
    PUBLIC
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
    PNTS
  }

  enum JoinClubRequestStatus {
    PENDING
    ACCEPTED
    REJECTED
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

  enum PublicContentValidationStatus {
    VALID
    INVALID
    PENDINGUPDATED
    PENDING
  }

  enum TimelinePostType {
    ANNOUNCEMENT
    WORKOUT
    WORKOUTPLAN
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
  enum UserClubMemberStatus {
    OWNER
    ADMIN
    MEMBER
    NONE
  }
`

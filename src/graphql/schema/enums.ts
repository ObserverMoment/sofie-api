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

  enum FitnessBenchmarkScope {
    STANDARD # In-built
    CUSTOM # User defined
  }

  enum FitnessBenchmarkScoreType {
    # ms. 100m sprint. WorkoutMoveRepType == DISTANCE
    # Implementation: Stopwatch Timer + input
    FASTESTTIMEDISTANCE
    # ms. 100 burpees. WorkoutMoveRepType == REPS
    # Implementation: Stopwatch Timer + input
    # AKA ForTime
    FASTESTTIMEREPS
    # m. Standing Broad Jump. Farmers Carry. WorkoutMoveRepType == NA / IGNORED
    # Implementation: Distance Input
    LONGESTDISTANCE
    # kg. 1 rep bench press. WorkoutMoveRepType == REPS
    # Implementation: Load Input
    MAXLOAD
    # 2 minute air squat. WorkoutMoveRepType == TIME
    # Implementation: Countdown Timer + Reps Input
    # AKA AMRAP
    TIMEDMAXREPS
    # max unbroken pull ups. WorkoutMoveRepType == REPS
    # Implementation: Reps Input
    UNBROKENMAXREPS
    # ms plank hold. WorkoutMoveRepType == TIME
    # Implementation: Stopwatch Timer + input
    UNBROKENMAXTIME
  }

  enum FitnessBenchmarkWorkoutScoreType {
    AMRAP
    FORTIME
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

  enum UserDayLogRating {
    GOOD
    AVERAGE
    BAD
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

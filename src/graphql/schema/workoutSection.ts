import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSection {
    id: ID!
    notes: String
    timecap: Int
    """
    duration is used when logging - it allows you to log how long the user took to complete one round of the section.
    """
    duration: Int
    rounds: Int!
    sortPosition: Int!
    workoutMoves: [WorkoutMove!]
    workout: Workout!
    # roundAdjustRules: [RoundAdjustRule!]
  }

  input CreateWorkoutSectionInput {
    notes: String
    timecap: Int
    duration: Int
    sortPosition: Int!
    rounds: Int!
    workoutMoves: [CreateWorkoutMoveInput!]!
    # roundAdjustRules: [CreateRoundAdjustRuleInput!]
  }

  # type RoundAdjustRule {
  #   id: ID!
  #   target: RuleTarget
  #   action: RuleAction
  #   amount: Float
  #   roundFrequency: Int
  # }

  # input CreateRoundAdjustRuleInput {
  #   target: RuleTarget!
  #   action: RuleAction!
  #   amount: Float!
  #   roundFrequency: Int!
  # }
`

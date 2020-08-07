import { gql } from 'apollo-server-express'

export default gql`
  type WorkoutSection {
    id: ID!
    notes: String
    timecap: Int
    rounds: Int!
    repPyramid: Boolean
    repPyramidStructure: [Int!]
    weightPyramid: Boolean
    weightPyramidStructure: [Int!]
    sortPosition: Int!
    workoutMoves: [WorkoutMove!]
    workout: Workout!
    roundAdjustRules: [RoundAdjustRule!]
  }

  input CreateWorkoutSectionInput {
    id: ID
    notes: String
    timecap: Int
    sortPosition: Int
    rounds: Int
    workoutMoves: [CreateWorkoutMoveInput!]!
    roundAdjustRules: [CreateRoundAdjustRuleInput!]
  }

  type RoundAdjustRule {
    id: ID!
    target: RuleTarget
    action: RuleAction
    amount: Float
    roundFrequency: Int
  }

  input CreateRoundAdjustRuleInput {
    target: RuleTarget!
    action: RuleAction!
    amount: Float!
    roundFrequency: Int!
  }
`

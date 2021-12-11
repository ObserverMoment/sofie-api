import { gql } from 'apollo-server-express'

export default gql`
  type Collection {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    Workouts: [WorkoutSummary!]!
    WorkoutPlans: [WorkoutPlanSummary!]!
  }

  input CreateCollectionInput {
    name: String!
    description: String
  }

  input UpdateCollectionInput {
    id: ID!
    name: String
    description: String
  }

  input AddWorkoutToCollectionInput {
    collectionId: ID!
    Workout: ConnectRelationInput!
  }

  input RemoveWorkoutFromCollectionInput {
    collectionId: ID!
    Workout: ConnectRelationInput!
  }

  input AddWorkoutPlanToCollectionInput {
    collectionId: ID!
    WorkoutPlan: ConnectRelationInput!
  }

  input RemoveWorkoutPlanFromCollectionInput {
    collectionId: ID!
    WorkoutPlan: ConnectRelationInput!
  }
`

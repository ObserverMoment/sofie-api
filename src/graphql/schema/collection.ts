import { gql } from 'apollo-server-express'

export default gql`
  type Collection {
    id: ID!
    createdAt: DateTime!
    User: UserSummary!
    name: String!
    description: String
    Workouts: [Workout!]!
    WorkoutPlans: [WorkoutPlan!]!
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

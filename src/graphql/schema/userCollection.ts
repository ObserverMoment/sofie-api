import { gql } from 'apollo-server-express'

export default gql`
  type UserCollection {
    id: ID!
    createdAt: DateTime!
    name: String!
    description: String
    Workouts: [Workout!]!
    WorkoutPlans: [WorkoutPlan!]!
  }

  input CreateUserCollectionInput {
    name: String!
    description: String
  }

  input UpdateUserCollectionInput {
    id: ID!
    name: String
    description: String
  }

  input AddWorkoutToCollectionInput {
    id: ID! # Collection ID
    Workout: ConnectRelationInput!
  }
  input RemoveWorkoutFromCollectionInput {
    id: ID! # Collection ID
    Workout: ConnectRelationInput!
  }

  input AddWorkoutPlanToCollectionInput {
    id: ID! # Collection ID
    WorkoutPlan: ConnectRelationInput!
  }

  input RemoveWorkoutPlanFromCollectionInput {
    id: ID! # Collection ID
    WorkoutPlan: ConnectRelationInput!
  }
`

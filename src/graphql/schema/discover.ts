import { gql } from 'apollo-server-express'

export default gql`
  type DiscoverFeatured {
    id: String!
    createdAt: DateTime!
    tag: String!
    name: String!
    tagline: String!
    description: String!
    coverImageUri: String!
  }

  type DiscoverWorkoutCategory {
    id: String!
    createdAt: DateTime!
    active: Boolean!
    name: String!
    tagline: String!
    description: String!
    coverImageUri: String!
    DiscoverWorkouts: [DiscoverWorkout!]!
  }

  type DiscoverWorkout {
    id: String!
    createdAt: DateTime!
    Workout: Workout!
    DiscoverWorkoutCategory: DiscoverWorkoutCategory!
  }

  type DiscoverWorkoutPlanCategory {
    id: String!
    createdAt: DateTime!
    active: Boolean!
    name: String!
    tagline: String!
    description: String!
    coverImageUri: String!
    DiscoverWorkoutPlans: [DiscoverWorkoutPlan!]!
  }

  type DiscoverWorkoutPlan {
    id: String!
    createdAt: DateTime!
    WorkoutPlan: WorkoutPlan!
    DiscoverWorkoutPlanCategory: DiscoverWorkoutPlanCategory!
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  type LikedWorkout {
    id: ID!
    createdAt: String!
    user: User!
    workout: Workout!
    notes: String
  }

  input CreateLikedWorkoutInput {
    userId: ID!
    workoutId: ID!
    notes: String
  }

  input DeleteLikedWorkoutInput {
    userId: ID!
    workoutId: ID!
  }
`

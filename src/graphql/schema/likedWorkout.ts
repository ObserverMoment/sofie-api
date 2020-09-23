import { gql } from 'apollo-server-express'

export default gql`
  type LikedWorkout {
    createdAt: String!
    user: User!
    workout: Workout!
    notes: String
  }
`

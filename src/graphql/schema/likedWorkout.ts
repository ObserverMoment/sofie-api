import { gql } from 'apollo-server-express'

export default gql`
  type LikedWorkout {
    createdAt: DateTime!
    user: User!
    workout: Workout!
    notes: String
  }
`

const { gql } = require('apollo-server-express')
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    hello: String
    moves: [Move!]!
  }

  type Move {
    id: ID!
    name: String!
  }
`

module.exports = typeDefs

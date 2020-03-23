const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./graphQL/resolvers')
const typeDefs = require('./graphQL/typeDefs')
const prisma = require('./prisma/initClient')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      prisma
    }
  }
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

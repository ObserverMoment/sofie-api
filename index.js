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

const PORT = process.env.PORT || 4000

app.listen({ port: PORT }, () => console.log(`🚀 Server ready on port ${PORT}`))

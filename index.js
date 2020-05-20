const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./graphQL/resolvers')
const typeDefs = require('./graphQL/typeDefs')
const applyMiddleware = require('./graphQL/middleware/applyMiddleware')
const helmet = require('./graphQL/middleware/helmet')
const getSelectedFields = require('./graphQL/middleware/getSelectedFields')
const {
  createWorldRecordsFromWorkoutIdLoader,
  createWorkoutSectionsAndMovesFromWorkoutIdLoader
} = require('./graphQL/dataloaders')

const middlewareMappings = [
  {
    type: 'all', // Either 'all', 'root' or 'field'
    middlewares: [helmet, getSelectedFields]
  }
]

applyMiddleware(resolvers, middlewareMappings)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    worldRecordsFromWorkoutIdLoader: createWorldRecordsFromWorkoutIdLoader(),
    workoutSectionsAndMovesFromWorkoutIdLoader: createWorkoutSectionsAndMovesFromWorkoutIdLoader()
  })
})

const app = express()
server.applyMiddleware({ app })

const PORT = process.env.PORT || 4000

app.listen({ port: PORT }, () => console.log(`🚀 Server ready on port ${PORT}`))

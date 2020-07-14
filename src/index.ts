import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './graphql/resolvers'
import { schema } from './graphql/schema'
import applyMiddleware from './graphql/middleware/applyMiddleware'
import helmet from './graphql/middleware/helmet'
import getSelectedFields from './graphql/middleware/getSelectedFields'
import { PrismaClient } from '@prisma/client'
import { Context } from './types'

const prisma = new PrismaClient({
  debug: true,
  log: ['info', 'query', 'warn'],
  errorFormat: 'pretty',
})

const middlewareMappings = [
  {
    type: 'all', // Either 'all', 'root' or 'field'
    middlewares: [helmet, getSelectedFields],
  },
]

applyMiddleware(resolvers, middlewareMappings)

// https://github.com/prisma-labs/graphqlgen/issues/15
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers as any,
  context: () => ({ prisma } as Context),
})

const app = express()
server.applyMiddleware({ app })

const PORT = process.env.PORT || 4000

app.listen({ port: PORT }, () => console.log(`🚀 Server ready on port ${PORT}`))

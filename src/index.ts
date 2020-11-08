import { ApolloServer, ResolverFn } from 'apollo-server'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaClient } from '@prisma/client'
import { PrismaSelect } from '@paljs/plugins'
import { Context } from './types'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLResolveInfo } from 'graphql'

require('dotenv').config()

const prisma = new PrismaClient({
  debug: true,
  log: ['info', 'query', 'warn'],
  errorFormat: 'pretty',
})

const selectMiddleware = async (
  resolve: ResolverFn,
  root: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const result = new PrismaSelect(info).value
  if (Object.keys(result.select).length > 0) {
    context = {
      ...context,
      ...result,
    }
  }
  return resolve(root, args, context, info)
}

// TODO: Add hemlmet middleware back in to catch errors and wrap all in trycatch
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: { log: (e) => console.error(e) },
})

// https://github.com/prisma-labs/graphqlgen/issues/15
const server = new ApolloServer({
  schema: applyMiddleware(schema, selectMiddleware),
  context: () => ({ prisma } as Context),
})

const PORT = process.env.PORT || 4000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

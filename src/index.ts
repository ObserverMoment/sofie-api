import { ApolloServer, ResolverFn } from 'apollo-server'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaClient, Prisma as PrismaOriginal } from '@prisma/client'
import { PrismaSelect } from '@paljs/plugins'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLResolveInfo } from 'graphql'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'

require('dotenv').config()

// https://paljs.com/plugins/delete/
class Prisma extends PrismaClient {
  constructor(options?: PrismaOriginal.PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

export interface Context {
  // PrismaClient type is not declared here because of clash between Prisma return types and GraphQL schema types and input definitions. Is a known issue with some workarounds available in Prisma docs.
  prisma: any
  // https://paljs.com/plugins/select
  select?: any
}

const prisma = new Prisma({
  log: ['info', 'query', 'warn', 'error'],
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

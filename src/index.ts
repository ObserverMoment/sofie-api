import { ApolloServer, ResolverFn } from 'apollo-server'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaClient, Prisma as PrismaOriginal } from '@prisma/client'
import { PrismaSelect } from '@paljs/plugins'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLResolveInfo } from 'graphql'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { usersFirebaseSDK, adminsFirebaseSDK } from './lib/firebaseAdmin'

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
  id: string
  userType: 'ADMIN' | 'USER'
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
  context: async ({ req }) => {
    console.log(JSON.stringify(req.headers.authorization))
    if (!req.headers.authorization) {
      throw Error(
        'Please provide a valid access token against the header "authorization"',
      )
    }

    // decode token function //
    let decodedToken
    if (req.headers.userType === 'ADMIN') {
      decodedToken = await adminsFirebaseSDK
        .auth()
        .verifyIdToken(req.headers.authorization)
    } else if (req.headers.userType === 'USER') {
      decodedToken = await usersFirebaseSDK
        .auth()
        .verifyIdToken(req.headers.authorization)
    } else {
      throw Error(
        'Please provide a valid user type against the header "userType"',
      )
    }

    if (!decodedToken || !decodedToken.uid) {
      throw Error('The access token you provided was not valid')
    }
    // decode token function = returns decoded token //

    // Create admin context function //
    let databaseId
    if (req.headers.userType === 'ADMIN') {
      const admin = await prisma.admin.findUnique({
        where: {
          firebaseUid: decodedToken.uid,
        },
        select: {
          id: true,
        },
      })
      if (!admin) {
        throw Error(
          'We could not find a valid admin with this id in the database',
        )
      } else {
        return { prisma, id: admin.id, userType: 'ADMIN' } as Context
      }
      // Create admin context function //
      // Create user context function //
    } else if (req.headers.userType === 'USER') {
      const user = await prisma.user.findUnique({
        where: {
          firebaseUid: decodedToken.uid,
        },
        select: {
          id: true,
        },
      })
      if (!user) {
        throw Error(
          'We could not find a valid user with this id in the database',
        )
      } else {
        return { prisma, id: user.id, userType: 'USER' } as Context
      }
      // Create user context function //
    }
  },
})

const PORT = process.env.PORT || 4000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

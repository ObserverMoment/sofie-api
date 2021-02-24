import { ApolloServer, AuthenticationError, ResolverFn } from 'apollo-server'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaClient, Prisma as PrismaOriginal } from '@prisma/client'
import { PrismaSelect } from '@paljs/plugins'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLResolveInfo } from 'graphql'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { firebaseVerifyToken } from './lib/firebaseAdmin'

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

export type ContextUserType = 'ADMIN' | 'USER'

export interface Context {
  // PrismaClient type is not declared here because of clash between Prisma return types and GraphQL schema types and input definitions. Is a known issue with some workarounds available in Prisma docs.
  prisma: any
  // https://paljs.com/plugins/select
  select?: any
  authedUserId: string
  userType: ContextUserType
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

const createAdminContext = async (uid: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      firebaseUid: uid,
    },
    select: {
      id: true,
    },
  })
  if (!admin) {
    throw new AuthenticationError(
      'We could not find a valid admin with this id in the database',
    )
  } else {
    return { prisma, authedUserId: admin.id, userType: 'ADMIN' } as Context
  }
}

const createUserContext = async (uid: string) => {
  const user = await prisma.user.findUnique({
    where: {
      firebaseUid: uid,
    },
    select: {
      id: true,
    },
  })
  if (!user) {
    throw new AuthenticationError(
      'We could not find a valid user with this id in the database',
    )
  } else {
    return { prisma, authedUserId: user.id, userType: 'USER' } as Context
  }
}

// https://github.com/prisma-labs/graphqlgen/issues/15
const server = new ApolloServer({
  cors: {
    origin: process.env.ADMIN_APP_CLIENT_URL,
  },
  schema: applyMiddleware(schema, selectMiddleware),
  context: async ({ req }) => {
    const userType = req.headers['user-type']
    const authToken = req.headers.authorization

    if (!authToken) {
      throw new AuthenticationError(
        'Please provide a valid access token against the header "authorization"',
      )
    }

    // decode token function //
    const decodedToken = await firebaseVerifyToken(
      authToken,
      userType as ContextUserType,
    )

    if (!decodedToken || !decodedToken.uid) {
      throw new AuthenticationError(
        'The access token you provided was not valid',
      )
    }

    return userType === 'ADMIN'
      ? createAdminContext(decodedToken.uid)
      : createUserContext(decodedToken.uid)
  },
})

const PORT = process.env.PORT || 4000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

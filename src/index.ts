import express from 'express'
import http from 'http'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaSelect } from '@paljs/plugins'
import { PrismaClient } from '@prisma/client'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { DocumentNode, GraphQLResolveInfo } from 'graphql'
import { firebaseVerifyToken } from './lib/firebaseAdmin'
import { initGetStreamClients } from './lib/getStream'
import registerNewUser from './restApi/registerNewUser'
import currentUser from './restApi/currentUser'
import dotenv from 'dotenv'
import { Resolvers } from './generated/graphql'

dotenv.config()

initGetStreamClients()

export type ContextUserType = 'ADMIN' | 'USER'

export interface Context {
  prisma: PrismaClient
  // https://paljs.com/plugins/select
  select?: any
  authedUserId: string
  userType: ContextUserType
}

const prisma = new PrismaClient({
  log: ['info', 'query', 'warn', 'error'],
  errorFormat: 'pretty',
})

const selectMiddleware = async (
  resolve: any,
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

// CORS configuration
const corsOptions = {
  origin: process.env.ADMIN_APP_CLIENT_URL,
  credentials: true,
}

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: Resolvers<any>,
) {
  const app = express()
  const httpServer = http.createServer(app)

  // RESTful Setup // - used for registration and auth.
  app.post('/api/user/register', (req, res) =>
    registerNewUser(req, res, prisma),
  )
  app.post('/api/user/current', (req, res) => currentUser(req, res, prisma))

  // GraphQL Setup //
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  // https://github.com/prisma-labs/graphqlgen/issues/15
  const server = new ApolloServer({
    schema: applyMiddleware(schema, selectMiddleware),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      const userType = req.headers['user-type']
      const authToken = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null

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

  await server.start()
  server.applyMiddleware({ app, cors: corsOptions })

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000
  httpServer.listen({ port: PORT }, () =>
    console.log(`🚀  Server ready at port ${PORT}`),
  )
}

startApolloServer(typeDefs, resolvers)

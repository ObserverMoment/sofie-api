import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/typeDefs'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaClient } from '@prisma/client'
import { PrismaSelect } from '@paljs/plugins'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLResolveInfo } from 'graphql'
import { firebaseVerifyToken } from './lib/firebaseAdmin'
import registerNewUser from './restApi/registerNewUser'
import currentUser from './restApi/currentUser'

require('dotenv').config()

export type ContextUserType = 'ADMIN' | 'USER'

export interface Context {
  prisma: PrismaClient
  // https://paljs.com/plugins/select
  select?: any
  authedUserId: string
  userType: ContextUserType
}

// https://www.npmjs.com/package/apollo-server-express
async function startExpressApolloServer() {
  const app = express()

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

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: { log: (e: any) => console.error(e) },
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
    schema: applyMiddleware(schema, selectMiddleware),
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

  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000

  // RESTful endpoints - used for registration and auth.
  app.post('/api/user/register', (req, res) =>
    registerNewUser(req, res, prisma),
  )
  app.post('/api/user/current', (req, res) => currentUser(req, res, prisma))

  // CORS configuration
  const corsOptions = {
    origin: process.env.ADMIN_APP_CLIENT_URL,
    credentials: true,
  }

  await server.start()

  server.applyMiddleware({ app, cors: corsOptions })

  app.listen(PORT, () => {
    console.log(`🚀  Server ready at port ${PORT}`)
  })
}

startExpressApolloServer()

import { ApolloError } from 'apollo-server-express'
import { Context } from '../../types'
import { GraphQLResolveInfo } from 'graphql'

async function helmet(
  parent: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo,
  next: Function,
) {
  try {
    const returnVal = await next()
    if (returnVal instanceof Error) {
      throw returnVal
    }
    return returnVal
  } catch (err) {
    console.error(err)
    return new ApolloError(
      "Something happened which shouldn't have. The API may be broken...",
    )
  }
}

export default helmet

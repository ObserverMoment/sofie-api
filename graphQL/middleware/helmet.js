const { ApolloError } = require('apollo-server-express')

async function helmet (parent, args, context, info, next) {
  try {
    const returnVal = await next()
    if (returnVal instanceof Error) {
      throw Error(returnVal)
    }
    return returnVal
  } catch (err) {
    console.error(err)
    return new ApolloError(
      "Something happened which shouldn't have. The API may be broken..."
    )
  }
}

module.exports = helmet

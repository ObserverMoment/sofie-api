// Middleware composer inspired by koa-compose (async onion).
// https://github.com/koajs/compose/blob/master/index.js
const composeMiddleware = (middlewares, resolver) => {
  if (!Array.isArray(middlewares)) {
    throw new TypeError('Middlewares must be an array!')
  }
  for (const fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middlewares array must be composed of functions!')
    }
  }
  return async (root, args, context, info) => {
    // last called middleware #
    let index = -1
    // i: middleware function index
    async function dispatch (i) {
      if (i <= index) {
        throw Error('next() called multiple times in the same middleware')
      }
      index = i
      const isResolver = i === middlewares.length
      const nextFn = isResolver ? resolver : middlewares[i]
      if (isResolver) {
        return nextFn(root, args, context, info)
      } else {
        return nextFn(root, args, context, info, () => dispatch(i + 1))
      }
    }
    return dispatch(0)
  }
}

/*
    Example shape of middlewareMappings object
    const middlewareMappings = [
    {
        type: 'field', // Either 'all', 'root' or 'field'
        keys: ['Query.hello'], // Use dot notation to specify subfields
        middlewares: [helmet, addName]
    },
    {
        type: 'root', // Either 'all', 'root' or 'field'
        keys: ['Query'], // Root query fields - will recursively wrap all sub fields
        middlewares: [helmet]
    }
]
*/

const applyMiddleware = (resolvers, middlewareMappings) => {
  middlewareMappings.forEach(mapping => {
    const { type, keys, middlewares } = mapping
    if (!middlewares) {
      throw Error(
        `applyMiddleWare Error: You did not provide middlewares for this mapping: type: ${type} -> ${keys}`
      )
    }
    if (type !== 'all' && !keys) {
      throw Error(
        `applyMiddleWare Error: You did not provide keys for this mapping: type: ${type} -> ${middlewares}`
      )
    }
    if (type === 'all') {
      // Wrap every field resolver
      Object.keys(resolvers).forEach(rootKey => {
        Object.keys(resolvers[rootKey]).forEach(field => {
          const originalResolver = resolvers[rootKey][field]
          resolvers[rootKey][field] = composeMiddleware(
            middlewares,
            originalResolver
          )
        })
      })
    } else if (type === 'root') {
      // Wrap all the direct children only of the specified root key.
      keys.forEach(rootKey => {
        Object.keys(resolvers[rootKey]).forEach(field => {
          const originalResolver = resolvers[rootKey][field]
          resolvers[rootKey][field] = composeMiddleware(
            middlewares,
            originalResolver
          )
        })
      })
    } else if (type === 'field') {
      // Just wrap these fields. Eg. 'Query.move'.
      keys.forEach(field => {
        const keys = field.split('.')
        const depth = keys.length
        keys.reduce((resolversSlice, key, index) => {
          if (index + 1 === depth) {
            // Correct depth for overwrite.
            const originalResolver = resolversSlice[key]
            resolversSlice[key] = composeMiddleware(
              middlewares,
              originalResolver
            )
          }
          return resolvers[key]
        }, resolvers)
      })
    } else {
      throw Error('applyMiddleWare Error: type must be either field or root.')
    }
  })
}

module.exports = applyMiddleware

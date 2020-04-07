const { parseResolveInfo } = require('graphql-parse-resolve-info')

// Creates an array of promise returning functions then returns when all are resolved.
// Tasks: Array of things on which the function should act.
// NOTE: the fn function needs to return a promise.
function parallel (array, fn) {
  return Promise.all(array.map(i => fn(i)))
}

function pipe (...fns) {
  return param => fns.reduce((result, fn) => fn(result), param)
}

// Returns a select argument object for prisma queries, for each type found in the GraphQL 'info' object.
function extractSelectedFields (info) {
  const types = Object.keys(parseResolveInfo(info).fieldsByTypeName)
  return types.reduce((mapping, nextType) => {
    const fields = Object.keys(
      parseResolveInfo(info).fieldsByTypeName[nextType]
    )
    mapping[nextType] = fields.reduce(
      (acum, next) => ({
        ...acum,
        [next]: true
      }),
      {}
    )
    return mapping
  }, {})
}

module.exports = {
  parallel,
  pipe,
  extractSelectedFields
}

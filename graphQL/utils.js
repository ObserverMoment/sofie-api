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

// Pass in a field (refs a model from the graphql query) returned by extractSelectedFields function
// plus an array of strings representing the models to which the selected model is related
// These fields get removed from the eventual select arg which is passed to prisma
// This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
// These relational calls are made via the resolver schema subfields and are handled by Dataloaders
function stripRelationsFromSelected (selectedObject = {}, excludedFields = []) {
  return Object.keys(selectedObject).reduce(
    (acum, nextKey) => ({
      ...acum,
      [nextKey]: !excludedFields.includes(nextKey) || false
    }),
    {}
  )
}

module.exports = {
  parallel,
  pipe,
  extractSelectedFields,
  stripRelationsFromSelected
}

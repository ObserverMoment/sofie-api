import { parseResolveInfo } from 'graphql-parse-resolve-info'
import { GraphQLResolveInfo } from 'graphql'

// Creates an array of promise returning functions then returns when all are resolved.
// Tasks: Array of things on which the function should act.
// NOTE: the fn function needs to return a promise.
function parallel(array: any[], fn: Function) {
  return Promise.all(array.map((i) => fn(i)))
}

function pipe(...fns: Function[]) {
  return (param: any) => fns.reduce((result, fn) => fn(result), param)
}

// Returns a select argument object for prisma queries, for each type found in the GraphQL 'info' object.
function extractSelectedFields(info: GraphQLResolveInfo) {
  if (!info) return {}
  const resolveInfo = parseResolveInfo(info) || { fieldsByTypeName: {} }
  const types = Object.keys(resolveInfo.fieldsByTypeName)

  return types.reduce((mapping, nextType) => {
    const fields = Object.keys(resolveInfo.fieldsByTypeName[nextType])
    mapping[nextType] = fields.reduce(
      (acum, next) => ({
        ...acum,
        [next]: true,
      }),
      {},
    )
    return mapping
  }, {} as { [key: string]: { [key: string]: boolean } })
}

// Pass in a field (refs a model from the graphql query) returned by extractSelectedFields function
// plus an array of strings representing the models to which the selected model is related
// These fields get removed from the eventual select arg which is passed to prisma
// This avoids duplicating calls - caused by prisma's select functionality also being able to select relations.
// These relational calls are made via the resolver schema subfields and are handled by Dataloaders
function stripRelationsFromSelected(
  selectedObject = {},
  excludedFields: String[] = [],
) {
  return Object.keys(selectedObject).reduce(
    (acum, nextKey) => ({
      ...acum,
      [nextKey]: !excludedFields.includes(nextKey) || false,
    }),
    {},
  )
}

export { parallel, pipe, extractSelectedFields, stripRelationsFromSelected }

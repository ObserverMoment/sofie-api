const { extractSelectedFields } = require('../utils')

// Adds an object onto context which reveals the fields that the client as requested.
/*
    selected {
        WorldRecord: { id: true, notes: true, recordType: true, recordValue: true },
        [TypeName]: { key: boolean }
    }
    NOTE: Prisma types should align with GraphQL types.
    Use: { select: selected.WorldRecord } in prisma findOne or findMany
*/
async function getSelectedFields (parent, args, context, info, next) {
  context.selected = extractSelectedFields(info)
  const returnVal = await next()
  return returnVal
}

module.exports = getSelectedFields

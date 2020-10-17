import { extractSelectedFields } from '../utils'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../../types'

// Adds an object onto context which reveals the fields that the client as requested.
// Optionally removes model names to avoid nested reads (specifically caused by prisma nexted select functionality)
/*
    selected {
        WorldRecord: { id: true, notes: true, recordType: true, recordValue: true },
        [TypeName]: { key: boolean }
    }
    NOTE: Prisma types should align with GraphQL types.
    Use: { select: selected.WorldRecord } in prisma findOne or findMany
*/
async function getSelectedFields(
  parent: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo,
  next: Function,
) {
  context.selected = extractSelectedFields(info)
  const returnVal = await next()
  return returnVal
}

export default getSelectedFields
import { Context } from '../..'
import { QueryUserCustomMovesArgs } from '../../generated/graphql'

// Move scopes are 'STANDARD' or 'CUSTOM'.
const standardMoves = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.move.findMany({ where: { scope: 'STANDARD' }, select })

const userCustomMoves = async (
  r: any,
  { authedUserId }: QueryUserCustomMovesArgs,
  { prisma, select }: Context,
) =>
  prisma.move.findMany({
    where: { createdBy: { id: authedUserId }, scope: 'CUSTOM' },
    select,
  })

export { standardMoves, userCustomMoves }

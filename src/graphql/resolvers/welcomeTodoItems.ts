import { Context } from '../..'
import {
  MutationMarkWelcomeTodoItemAsSeenArgs,
  WelcomeTodoItem,
} from '../../generated/graphql'

///// Queries /////
export const welcomeTodoItems = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const items = await prisma.welcomeTodoItem.findMany({
    where: {
      UsersMarkedSeen: {
        none: {
          id: authedUserId,
        },
      },
    },
    select,
  })

  return items as WelcomeTodoItem[]
}
////// Mutations /////
export const markWelcomeTodoItemAsSeen = async (
  r: any,
  { data }: MutationMarkWelcomeTodoItemAsSeenArgs,
  { authedUserId, prisma }: Context,
) => {
  const updated = await prisma.welcomeTodoItem.update({
    where: {
      id: data.welcomeTodoItemId,
    },
    data: {
      UsersMarkedSeen: {
        connect: { id: authedUserId },
      },
    },
    select: {
      id: true,
    },
  })

  return updated.id
}

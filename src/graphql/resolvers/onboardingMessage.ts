import { Context } from '../..'
import {
  MutationMarkOnboardingMessageAsSeenArgs,
  OnboardingMessage,
} from '../../generated/graphql'

///// Queries /////
export const onboardingMessages = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const messages = await prisma.onboardingMessage.findMany({
    where: {
      UsersMarkedSeen: {
        none: {
          id: authedUserId,
        },
      },
    },
    select,
  })

  return messages as OnboardingMessage[]
}
////// Mutations /////
export const markOnboardingMessageAsSeen = async (
  r: any,
  { data }: MutationMarkOnboardingMessageAsSeenArgs,
  { authedUserId, prisma }: Context,
) => {
  const updated = await prisma.onboardingMessage.update({
    where: {
      id: data.onboardingMessageId,
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

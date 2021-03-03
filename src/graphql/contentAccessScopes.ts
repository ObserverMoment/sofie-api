import { PrismaExtended } from '..'

import { ApolloError } from 'apollo-server-errors'

export class AccessScopeError extends ApolloError {
  constructor(message: string = 'You do not have access to this data.') {
    super(message, 'ACCESS_DENIED')

    Object.defineProperty(this, 'name', { value: 'AccessScopeError' })
  }
}

/// Must match the prisma model names as per prisma[modelName].findUnique()
export type ContentObjectType =
  | 'workout'
  | 'loggedWorkout'
  | 'loggedWorkoutSection'
  | 'loggedWorkoutSet'
  | 'loggedWorkoutMove'

export async function checkUserAccessScope(
  objectId: string,
  objectType: ContentObjectType,
  authedUserId: string,
  prisma: any,
): Promise<void> {
  const obj = await prisma[objectType].findUnique({
    where: {
      id: objectId,
    },
  })
  if (!obj || obj.userId !== authedUserId) {
    throw new AccessScopeError()
  }
}

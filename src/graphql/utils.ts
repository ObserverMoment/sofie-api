import { ApolloError } from 'apollo-server-errors'
import { ContextUserType } from '..'

export class AccessScopeError extends ApolloError {
  constructor(message: string = 'You do not have access to this data.') {
    super(message, 'ACCESS_DENIED')

    Object.defineProperty(this, 'name', { value: 'AccessScopeError' })
  }
}

/// Must match the prisma model names as per prisma[modelName].findUnique()
export type ContentObjectType =
  | 'gymProfile'
  | 'loggedWorkout'
  | 'loggedWorkoutSection'
  | 'loggedWorkoutSet'
  | 'loggedWorkoutMove'
  | 'move'
  | 'progressJournal'
  | 'progressJournalGoal'
  | 'progressJournalGoalTag'
  | 'progressJournalEntry'
  | 'scheduledWorkout'
  | 'workout'

/// Checks that a user has access to a single object in the database.
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

/// Checks that a user has access to a list of objects of a single type in the database.
export async function checkUserAccessScopeMulti(
  objectIds: string[],
  objectType: ContentObjectType,
  authedUserId: string,
  prisma: any,
): Promise<void> {
  const sections = await prisma[objectType].findMany({
    where: {
      id: { in: objectIds },
    },
  })

  if (
    sections.length !== objectIds.length ||
    sections.some((s: any) => s.userId !== authedUserId)
  ) {
    throw new AccessScopeError()
  }
}

interface ReorderData {
  id: string
  sortPosition: number
}

/// Check if user has access rights and then updates sort positions.
// The ops are transactional and if one fails then all will roll back.
export async function checkAndReorderObjects<T>(
  data: ReorderData[],
  objectType: ContentObjectType,
  authedUserId: string,
  prisma: any,
  select: any,
): Promise<T[]> {
  checkUserAccessScopeMulti(
    data.map(({ id }) => id),
    objectType,
    authedUserId,
    prisma,
  )

  const ops = data.map(({ id, sortPosition }) =>
    prisma[objectType].update({
      where: { id },
      data: { sortPosition },
      select,
    }),
  )

  return prisma.$transaction(ops)
}

export function checkIsAdmin(userType: ContextUserType) {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError(
      'Only admins can access this data of functionality.',
    )
  }
}

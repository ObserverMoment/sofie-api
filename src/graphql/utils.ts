import { ApolloError } from 'apollo-server-errors'
import { ContextUserType } from '..'

export class AccessScopeError extends ApolloError {
  constructor(message: string = 'You do not have access to this data.') {
    super(message, 'ACCESS_DENIED')

    Object.defineProperty(this, 'name', { value: 'AccessScopeError' })
  }
}

/// Must match the prisma model names as per prisma[modelName].findUnique()
/// i.e. be camelCase.
export type ContentObjectType =
  | 'bodyTrackingEntry'
  | 'collection'
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
  | 'workoutSection'
  | 'workoutSet'
  | 'workoutSetIntervalBuyIn'
  | 'workoutSetGenerator'
  | 'workoutMove'
  | 'workoutPlan'
  | 'workoutPlanDay'
  | 'workoutPlanDayWorkout'
  | 'workoutPlanEnrolment'
  | 'workoutPlanReview'
  | 'workoutTag'
  | 'userBenchmark'
  | 'userBenchmarkEntry'
  | 'userBenchmarkTag'

/// Checks that a user has access to a single object in the database.
/// Checks for ownership so cannot use this cor checking, for example, access to group scoped content.
export async function checkUserOwnsObject(
  objectId: string,
  objectType: ContentObjectType,
  authedUserId: string,
  prisma: any,
): Promise<void> {
  const obj = await prisma[objectType].findUnique({
    where: {
      id: objectId,
    },
    select: {
      userId: true,
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
  const items = await prisma[objectType].findMany({
    where: {
      id: { in: objectIds },
    },
    select: {
      userId: true,
    },
  })

  if (
    items.length !== objectIds.length ||
    items.some((i: any) => i.userId !== authedUserId)
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

interface AffectedItem {
  id: string
  sortPosition: number
}

interface ReorderItemsForInsertDeleteProps {
  sortPosition: number
  reorderType: ReorderType
  parentId: string
  parentType: ContentObjectType
  objectType: ContentObjectType
  prisma: any
}

type ReorderType = 'insert' | 'delete'

/// Use before inserting an intem into a list via create or via duplicate ops.
/// All items that have a sortPosition >= the passed sortPosition will have sortPosition incremented.
export async function reorderItemsForInsertDelete({
  sortPosition,
  reorderType,
  parentId,
  parentType,
  objectType,
  prisma,
}: ReorderItemsForInsertDeleteProps) {
  const parentIdKey = `${parentType}Id`
  try {
    // All items with sortPosition greater than or equal to the new section will be affected.
    // When creating a new item at the end of the list, [affected] will be empty.
    const affected: AffectedItem[] = await prisma[objectType].findMany({
      where: {
        [parentIdKey]: parentId,
        sortPosition: {
          gte: sortPosition,
        },
      },
      select: {
        id: true,
        sortPosition: true,
      },
    })

    await prisma.$transaction(
      affected.map(({ id, sortPosition }) =>
        prisma[objectType].update({
          where: { id },
          data: {
            sortPosition:
              reorderType === 'insert' ? sortPosition + 1 : sortPosition - 1,
          },
        }),
      ),
    )
  } catch (e) {
    console.log(e)
    throw new ApolloError(
      `reorderItemsForInsertDelete: There was an issue reordering the ${objectType}s.`,
    )
  }
}

export function checkIsAdmin(userType: ContextUserType) {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError(
      'Only admins can access this data of functionality.',
    )
  }
}

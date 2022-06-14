import { PrismaClient } from '.prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { ContextUserType } from '..'

export class AccessScopeError extends ApolloError {
  constructor(message: string = 'You do not have access to this data.') {
    super(message, 'ACCESS_DENIED')

    Object.defineProperty(this, 'name', { value: 'AccessScopeError' })
  }
}

export async function checkUserProfileIsPublic(
  id: string,
  prisma: PrismaClient,
) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { userProfileScope: true },
  })
  if (user?.userProfileScope !== 'PUBLIC') {
    throw new AccessScopeError(
      'This profile is private, you do not have access.',
    )
  }
}

/// Must match the prisma model names as per prisma[modelName].findUnique()
/// i.e. be camelCase.
export type ContentObjectType =
  | 'bodyTrackingEntry'
  | 'clubAnnouncement'
  | 'clubMemberNote'
  | 'collection'
  | 'fitnessBenchmark'
  | 'fitnessBenchmarkScore'
  | 'fitnessBenchmarkWorkout'
  | 'fitnessBenchmarkWorkoutScore'
  | 'gymProfile'
  | 'loggedWorkout'
  | 'loggedWorkoutSection'
  | 'loggedWorkoutSet'
  | 'loggedWorkoutMove'
  | 'move'
  | 'scheduledWorkout'
  | 'skill'
  | 'workoutWorkout'
  | 'amrapWorkout'
  | 'amrapSection'
  | 'amrapMove'
  | 'cardioWorkout'
  | 'cardioExercise'
  | 'forTimeWorkout'
  | 'forTimeSection'
  | 'forTimeMove'
  | 'intervalWorkout'
  | 'intervalExercise'
  | 'intervalSet'
  | 'mobilityWorkout'
  | 'resistanceWorkout'
  | 'savedResistanceWorkout'
  | 'resistanceExercise'
  | 'resistanceSet'
  | 'workoutTag'
  | 'userDayLogMood'
  | 'userEatWellLog'
  | 'userGoal'
  | 'userMeditationLog'
  | 'userSleepWellLog'
  | 'userExerciseLoadTracker'
  // Deprecated
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

export function checkIsAdmin(userType: ContextUserType) {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError(
      'Only admins can access this data of functionality.',
    )
  }
}

//// User Recently Viewed /////
/// Adds an object as a string formatted [type:id] to User.recentlyViewed.
/// Ensuring that there are max 10 items in the list.
export async function addObjectToUserRecentlyViewed(
  resolverName: string, // Eg. 'workoutById', 'createWorkoutPlan'
  resolverArgs: any, // The id of the object should be either at [args.id] or [args.data.id]
  userId: string,
  prisma: PrismaClient,
) {
  let typeAndId: string

  switch (resolverName) {
    case 'resistanceWorkoutById':
      typeAndId = `resistanceWorkout:${resolverArgs.id}`
      break

    default:
      throw new Error(
        `${resolverName} is not a valid resolver name for the function [addObjectToUserRecentlyViewed]`,
      )
  }

  const prev = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      recentlyViewedObjects: true,
    },
  })

  if (prev) {
    /// Filter out any previous entry for this [typeAndId] before prepending the new one.
    /// Max of 20 recently viewed.
    const updated = [
      typeAndId,
      ...prev.recentlyViewedObjects.filter((o) => o !== typeAndId),
    ].slice(0, 20)

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        recentlyViewedObjects: updated,
      },
    })
  }
}

/// When updating objects that have scalar string lists as field. Eg sessionOrder, activeWidgets etc. We need to check first if the user has passed that field in the input data, and then handle the different ways in which the data could have been passed. i.e an empty list, filled list or null. Passing null and passing and empty list will both cause the list to be 'cleared'.
export function processStringListUpdateInputData(
  data: any,
  propertyKey: string,
): string[] | undefined {
  if (data.hasOwnProperty(propertyKey)) {
    if (data[propertyKey]) {
      /// Data is neither null nor an empty list.
      return data[propertyKey]
    } else {
      /// Data is either null or an empty list.
      return []
    }
  } else {
    return undefined
  }
}

export function processNumberListUpdateInputData(
  data: any,
  propertyKey: string,
): number[] | undefined {
  if (data.hasOwnProperty(propertyKey)) {
    if (data[propertyKey]) {
      /// Data is neither null nor an empty list.
      return data[propertyKey]
    } else {
      /// Data is either null or an empty list.
      return []
    }
  } else {
    return undefined
  }
}

//// Deprecated - Reordering of this type no longer needed ////
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
    // All items with sortPosition greater than or equal to the new object will be affected.
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

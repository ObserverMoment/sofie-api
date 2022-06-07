/// FOR USE WHEN MAINTAINING workoutSession.childrenOrder [] /////

import { ApolloError } from 'apollo-server-errors'

////// Workout Session Sort Order related //////
export async function pushNewChildToOrder(
  workoutSessionId: string,
  childId: string,
  prisma: any,
) {
  await prisma.workoutSession.update({
    where: { id: workoutSessionId },
    data: {
      childrenOrder: {
        push: childId,
      },
    },
  })
}

/// Allows pushing an array of child IDs to the order array.

export async function pushNewChildrenToOrder(
  workoutSessionId: string,
  childIds: string[],
  prisma: any,
) {
  await prisma.workoutSession.update({
    where: { id: workoutSessionId },
    data: {
      childrenOrder: {
        push: childIds,
      },
    },
  })
}

export async function duplicateNewChildToOrder(
  workoutSessionId: string,
  originalChildrenOrder: string[],
  originalChildId: string,
  newChildId: string,
  prisma: any,
) {
  const originalIndex = originalChildrenOrder.indexOf(originalChildId)

  originalChildrenOrder.splice(originalIndex, 0, newChildId)

  await prisma.workoutSession.update({
    where: { id: workoutSessionId },
    data: {
      childrenOrder: originalChildrenOrder,
    },
  })
}

export async function deleteChildFromOrder(
  workoutSessionId: string,
  originalChildrenOrder: string[],
  deletedChildId: string,
  prisma: any,
) {
  await prisma.workoutSession.update({
    where: { id: workoutSessionId },
    data: {
      childrenOrder: originalChildrenOrder.filter((o) => o !== deletedChildId),
    },
  })
}

/// Also includes parents of sortable types.
type SortableType = 'resistanceSession' | 'resistanceExercise' | 'resistanceSet'

interface Sortable {
  id: string
  sortPosition: number
}

//// For use when duplicating a sortable object.
export async function insertObjectAndReorderSiblings(
  type: SortableType,
  originalItems: Sortable[],
  newItem: Sortable,
  newItemSortPosition: number,
  prisma: any,
) {
  /// Splice in new object and then update all sortPositions.
  originalItems
    .sort((a, b) => a.sortPosition - b.sortPosition)
    .splice(newItemSortPosition, 0, newItem)

  // Can't be inside a prisma.$transaction because this method is usually being called from inside an async transaction.
  await Promise.all(
    originalItems.map((e, i) =>
      prisma[type].update({
        where: { id: e.id },
        data: {
          sortPosition: i,
        },
      }),
    ),
  )
}

export async function reorderSortableObject(
  objectType: SortableType,
  objectId: string,
  parentType: SortableType,
  parentId: string,
  newSortPosition: number,
  prisma: any,
) {
  const parentIdKey = `${parentType}Id`

  try {
    const originalItems: Sortable[] = await prisma[objectType].findMany({
      where: {
        [parentIdKey]: parentId,
      },
      select: {
        id: true,
        sortPosition: true,
      },
    })

    const items = originalItems.filter((i) => i.id !== objectId)

    /// Splice in new object and then update all sortPositions.
    items
      .sort((a, b) => a.sortPosition - b.sortPosition)
      .splice(newSortPosition, 0, {
        id: objectId,
        sortPosition: newSortPosition,
      })

    await prisma.$transaction(
      items.map((e, i) =>
        prisma[objectType].update({
          where: { id: e.id },
          data: {
            sortPosition: i,
          },
        }),
      ),
    )
  } catch (e) {
    console.log(e)
    throw new ApolloError(
      `reorderSortableObject: There was an issue reordering the ${objectType}.`,
    )
  }
}

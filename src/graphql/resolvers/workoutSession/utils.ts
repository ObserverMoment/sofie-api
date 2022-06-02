type ParentType =
  | 'workoutSession'
  | 'amrapSession'
  | 'amrapSection'
  | 'cardioSession'
  | 'forTimeSession'
  | 'forTimeSection'
  | 'resistanceSession'
  | 'resistanceExercise'

////// Child Sort Order related //////
export async function pushNewChildToOrder(
  parentType: ParentType,
  parentId: string,
  childId: string,
  prisma: any,
) {
  await prisma[parentType].update({
    where: { id: parentId },
    data: {
      childrenOrder: {
        push: childId,
      },
    },
  })
}

export async function duplicateNewChildToOrder(
  parentType: ParentType,
  parentId: string,
  originalChildrenOrder: string[],
  originalChildId: string,
  newChildId: string,
  prisma: any,
) {
  const originalIndex = originalChildrenOrder.indexOf(originalChildId)

  originalChildrenOrder.splice(originalIndex, 0, newChildId)

  await prisma[parentType].update({
    where: { id: parentId },
    data: {
      childrenOrder: originalChildrenOrder,
    },
  })
}

export async function deleteChildFromOrder(
  parentType: ParentType,
  parentId: string,
  originalChildrenOrder: string[],
  deletedChildId: string,
  prisma: any,
) {
  await prisma[parentType].update({
    where: { id: parentId },
    data: {
      childrenOrder: originalChildrenOrder.filter((o) => o !== deletedChildId),
    },
  })
}

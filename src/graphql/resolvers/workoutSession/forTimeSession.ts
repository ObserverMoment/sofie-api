import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ForTimeMove,
  ForTimeSection,
  ForTimeSession,
  MutationCreateForTimeMoveArgs,
  MutationCreateForTimeSectionArgs,
  MutationCreateForTimeSessionArgs,
  MutationDeleteForTimeMoveArgs,
  MutationDeleteForTimeSessionArgs,
  MutationDuplicateForTimeMoveArgs,
  MutationDuplicateForTimeSectionArgs,
  MutationDuplicateForTimeSessionArgs,
  MutationUpdateForTimeMoveArgs,
  MutationUpdateForTimeSectionArgs,
  MutationUpdateForTimeSessionArgs,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  processStringListUpdateInputData,
} from '../../utils'
import {
  deleteChildFromOrder,
  duplicateNewChildToOrder,
  pushNewChildToOrder,
} from './utils'

//// Mutations ////
//// ForTime Session ////
export const createForTimeSession = async (
  r: any,
  { data }: MutationCreateForTimeSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.WorkoutSession.id,
    'workoutSession',
    authedUserId,
    prisma,
  )

  const forTimeSession = await prisma.$transaction(async (prisma) => {
    const forTimeSession = await prisma.forTimeSession.create({
      data: {
        WorkoutSession: {
          connect: data.WorkoutSession,
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    await pushNewChildToOrder(
      'workoutSession',
      data.WorkoutSession.id,
      (forTimeSession as any).id,
      prisma,
    )

    return forTimeSession
  })

  if (forTimeSession) {
    return forTimeSession as ForTimeSession
  } else {
    throw new ApolloError('createForTimeSession: There was an issue.')
  }
}

export const updateForTimeSession = async (
  r: any,
  { data }: MutationUpdateForTimeSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'forTimeSession', authedUserId, prisma)

  const updated = await prisma.forTimeSession.update({
    where: { id: data.id },
    data: {
      ...data,
      timecapSeconds: data.timecapSeconds || undefined,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as ForTimeSession
  } else {
    throw new ApolloError('updateForTimeSession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateForTimeSession = async (
  r: any,
  { id }: MutationDuplicateForTimeSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeSession', authedUserId, prisma)

  // Get original full data
  const original = await prisma.forTimeSession.findUnique({
    where: { id },
    include: {
      WorkoutSession: true, // Needed to get the original session position.
      ForTimeSections: {
        include: {
          ForTimeMoves: {
            include: {
              Move: true,
              Equipment: true,
            },
          },
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateForTimeSession: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.forTimeSession.create({
      data: {
        name: original.name,
        note: original.note,
        repeats: original.repeats,
        timecapSeconds: original.timecapSeconds,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },
        WorkoutSession: {
          connect: { id: original.workoutSessionId },
        },
        ForTimeSections: {
          create: original.ForTimeSections.map((s) => ({
            name: s.name,
            note: s.note,
            childrenOrder: s.childrenOrder,
            User: {
              connect: { id: authedUserId },
            },
            ForTimeMoves: {
              create: s.ForTimeMoves.map((m) => ({
                note: m.note,
                Move: {
                  connect: { id: m.moveId },
                },
                Equipment: m.equipmentId
                  ? { connect: { id: m.equipmentId } }
                  : undefined,
                User: {
                  connect: { id: authedUserId },
                },
              })),
            },
          })),
        },
      },
      select,
    })

    await duplicateNewChildToOrder(
      'workoutSession',
      original.workoutSessionId,
      original.WorkoutSession.childrenOrder,
      original.id,
      (copy as any).id,
      prisma,
    )

    return copy
  })

  if (copy) {
    return copy as ForTimeSession
  } else {
    throw new ApolloError('duplicateForTimeSession: There was an issue.')
  }
}

export const deleteForTimeSession = async (
  r: any,
  { id }: MutationDeleteForTimeSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeSession', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.forTimeSession.delete({
      where: { id },
      select: {
        id: true,
        WorkoutSession: {
          select: {
            id: true,
            childrenOrder: true,
          },
        },
      },
    })

    await deleteChildFromOrder(
      'workoutSession',
      deleted.WorkoutSession.id,
      deleted.WorkoutSession.childrenOrder,
      deleted.id,
      prisma,
    )

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteForTimeSession: There was an issue.`)
    throw new ApolloError('deleteForTimeSession: There was an issue.')
  }
}

//// ForTime Section ////
export const createForTimeSection = async (
  r: any,
  { data }: MutationCreateForTimeSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ForTimeSession.id,
    'forTimeSession',
    authedUserId,
    prisma,
  )

  const forTimeSection = await prisma.$transaction(async (prisma) => {
    const forTimeSection = await prisma.forTimeSection.create({
      data: {
        ForTimeSession: {
          connect: data.ForTimeSession,
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    await pushNewChildToOrder(
      'forTimeSession',
      data.ForTimeSession.id,
      (forTimeSection as any).id,
      prisma,
    )

    return forTimeSection
  })

  if (forTimeSection) {
    return forTimeSection as ForTimeSection
  } else {
    throw new ApolloError('createForTimeSection: There was an issue.')
  }
}

export const updateForTimeSection = async (
  r: any,
  { data }: MutationUpdateForTimeSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'forTimeSection', authedUserId, prisma)

  const updated = await prisma.forTimeSection.update({
    where: { id: data.id },
    data: {
      ...data,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as ForTimeSection
  } else {
    throw new ApolloError('updateForTimeSection: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateForTimeSection = async (
  r: any,
  { id }: MutationDuplicateForTimeSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeSection', authedUserId, prisma)

  // Get original full data
  const original = await prisma.forTimeSection.findUnique({
    where: { id },
    include: {
      ForTimeSession: true,
      ForTimeMoves: {
        include: {
          Move: true,
          Equipment: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateForTimeSection: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.forTimeSection.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },
        ForTimeSession: { connect: { id: original.forTimeSessionId } },
        ForTimeMoves: {
          create: original.ForTimeMoves.map((m) => ({
            note: m.note,
            Move: {
              connect: { id: m.moveId },
            },
            Equipment: m.equipmentId
              ? { connect: { id: m.equipmentId } }
              : undefined,
            User: {
              connect: { id: authedUserId },
            },
          })),
        },
      },
      select,
    })

    await duplicateNewChildToOrder(
      'forTimeSession',
      original.ForTimeSession.id,
      original.ForTimeSession.childrenOrder,
      original.id,
      (copy as any).id,
      prisma,
    )

    return copy
  })

  if (copy) {
    return copy as ForTimeSection
  } else {
    throw new ApolloError('duplicateForTimeSection: There was an issue.')
  }
}

export const deleteForTimeSection = async (
  r: any,
  { id }: MutationDeleteForTimeSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeSection', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.forTimeSection.delete({
      where: { id },
      select: {
        id: true,
        ForTimeSession: {
          select: { id: true, childrenOrder: true },
        },
      },
    })

    await deleteChildFromOrder(
      'forTimeSession',
      deleted.ForTimeSession.id,
      deleted.ForTimeSession.childrenOrder,
      deleted.id,
      prisma,
    )

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteForTimeSection: There was an issue.`)
    throw new ApolloError('deleteForTimeSection: There was an issue.')
  }
}

//// ForTime Move ////
export const createForTimeMove = async (
  r: any,
  { data }: MutationCreateForTimeMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ForTimeSection.id,
    'forTimeSection',
    authedUserId,
    prisma,
  )

  const forTimeMove = await prisma.$transaction(async (prisma) => {
    const forTimeMove = await prisma.forTimeMove.create({
      data: {
        ForTimeSection: {
          connect: data.ForTimeSection,
        },
        Move: { connect: data.Move },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    await pushNewChildToOrder(
      'forTimeSection',
      data.ForTimeSection.id,
      (forTimeMove as any).id,
      prisma,
    )

    return forTimeMove
  })

  if (forTimeMove) {
    return forTimeMove as ForTimeMove
  } else {
    throw new ApolloError('createForTimeMove: There was an issue.')
  }
}

export const updateForTimeMove = async (
  r: any,
  { data }: MutationUpdateForTimeMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'forTimeMove', authedUserId, prisma)

  const updated = await prisma.forTimeMove.update({
    where: { id: data.id },
    data: {
      ...data,
      Move: data.Move ? { connect: data.Move } : undefined,
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
    },
    select,
  })

  if (updated) {
    return updated as ForTimeMove
  } else {
    throw new ApolloError('updateForTimeMove: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateForTimeMove = async (
  r: any,
  { id }: MutationDuplicateForTimeMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeMove', authedUserId, prisma)

  // Get original full data
  const original = await prisma.forTimeMove.findUnique({
    where: { id },
    include: {
      ForTimeSection: true,
      Move: true,
      Equipment: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateForTimeMove: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.forTimeMove.create({
      data: {
        note: original.note,
        ForTimeSection: { connect: { id: original.forTimeSectionId } },
        Move: {
          connect: { id: original.moveId },
        },
        Equipment: original.equipmentId
          ? { connect: { id: original.equipmentId } }
          : undefined,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    await duplicateNewChildToOrder(
      'forTimeSection',
      original.ForTimeSection.id,
      original.ForTimeSection.childrenOrder,
      original.id,
      (copy as any).id,
      prisma,
    )

    return copy
  })

  if (copy) {
    return copy as ForTimeMove
  } else {
    throw new ApolloError('duplicateForTimeMove: There was an issue.')
  }
}

export const deleteForTimeMove = async (
  r: any,
  { id }: MutationDeleteForTimeMoveArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeMove', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.forTimeMove.delete({
      where: { id },
      select: {
        id: true,
        ForTimeSection: {
          select: {
            id: true,
            childrenOrder: true,
          },
        },
      },
    })

    await deleteChildFromOrder(
      'forTimeSection',
      deleted.ForTimeSection.id,
      deleted.ForTimeSection.childrenOrder,
      deleted.id,
      prisma,
    )

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteForTimeMove: There was an issue.`)
    throw new ApolloError('deleteForTimeMove: There was an issue.')
  }
}
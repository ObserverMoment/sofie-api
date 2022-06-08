import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ResistanceExercise,
  ResistanceSession,
  ResistanceSet,
  MutationCreateResistanceExerciseArgs,
  MutationCreateResistanceSessionArgs,
  MutationCreateResistanceSetArgs,
  MutationDeleteResistanceExerciseArgs,
  MutationDeleteResistanceSessionArgs,
  MutationDeleteResistanceSetArgs,
  MutationDuplicateResistanceExerciseArgs,
  MutationDuplicateResistanceSessionArgs,
  MutationDuplicateResistanceSetArgs,
  MutationUpdateResistanceExerciseArgs,
  MutationUpdateResistanceSessionArgs,
  MutationUpdateResistanceSetArgs,
  MutationReorderResistanceExerciseArgs,
  MutationReorderResistanceSetArgs,
  QueryResistanceSessionByIdArgs,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { insertObjectAndReorderSiblings, reorderSortableObject } from './utils'

// //// Queries ////
// /// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
// // Logged in user only.
export const userResistanceSessions = async (
  r: any,
  a: any,
  { select, authedUserId, prisma }: Context,
) => {
  const userWorkoutSessions = await prisma.resistanceSession.findMany({
    where: {
      userId: authedUserId,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select,
  })

  return userWorkoutSessions as ResistanceSession[]
}

export const resistanceSessionById = async (
  r: any,
  { id }: QueryResistanceSessionByIdArgs,
  { select, prisma }: Context,
) => {
  const workoutSession = await prisma.resistanceSession.findUnique({
    where: { id },
    select,
  })

  if (workoutSession) {
    return workoutSession as ResistanceSession
  } else {
    console.error(
      `resistanceSessionById: Could not find a session with id ${id}`,
    )
    return null
  }
}

//// Mutations ////
//// Resistance Session ////
export const createResistanceSession = async (
  r: any,
  { data }: MutationCreateResistanceSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const resistanceSession = await prisma.$transaction(async (prisma) => {
    const resistanceSession = await prisma.resistanceSession.create({
      data: {
        ...data,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return resistanceSession
  })

  if (resistanceSession) {
    return resistanceSession as ResistanceSession
  } else {
    throw new ApolloError('createResistanceSession: There was an issue.')
  }
}

export const updateResistanceSession = async (
  r: any,
  { data }: MutationUpdateResistanceSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'resistanceSession', authedUserId, prisma)

  const updated = await prisma.resistanceSession.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as ResistanceSession
  } else {
    throw new ApolloError('updateResistanceSession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateResistanceSession = async (
  r: any,
  { id }: MutationDuplicateResistanceSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceSession', authedUserId, prisma)

  // Get original full data
  const original = await prisma.resistanceSession.findUnique({
    where: { id },
    include: {
      ResistanceExercises: {
        include: {
          ResistanceSets: {
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
    throw new ApolloError(
      'duplicateResistanceSession: Could not retrieve data.',
    )
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.resistanceSession.create({
      data: {
        name: original.name,
        note: original.note,
        User: {
          connect: { id: authedUserId },
        },
        ResistanceExercises: {
          create: original.ResistanceExercises.map((e) => ({
            note: e.note,
            sortPosition: e.sortPosition,
            User: {
              connect: { id: authedUserId },
            },
            ResistanceSets: {
              create: e.ResistanceSets.map((s) => ({
                note: s.note,
                sortPosition: s.sortPosition,
                reps: s.reps,
                repType: s.repType,
                Move: {
                  connect: { id: s.moveId },
                },
                Equipment: s.equipmentId
                  ? { connect: { id: s.equipmentId } }
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

    return copy
  })

  if (copy) {
    return copy as ResistanceSession
  } else {
    throw new ApolloError('duplicateResistanceSession: There was an issue.')
  }
}

export const deleteResistanceSession = async (
  r: any,
  { id }: MutationDeleteResistanceSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceSession', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.resistanceSession.delete({
      where: { id },
      select: {
        id: true,
      },
    })

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteResistanceSession: There was an issue.`)
    throw new ApolloError('deleteResistanceSession: There was an issue.')
  }
}

//// Resistance Exercise ////
//// Create, Duplicate and Delete ops return the updated parent.
//// Returns parent ResistanceSession which has childrenOrder info
//// Always created with child resistanceSets sideposted (nested writes)
export const createResistanceExercise = async (
  r: any,
  { data }: MutationCreateResistanceExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ResistanceSession.id,
    'resistanceSession',
    authedUserId,
    prisma,
  )

  const created = await prisma.$transaction(async (prisma) => {
    /// How many exercises are the already in this session. Use this to calculate the new exercise [sortPosition]. sortPosition should be zero indexed.
    const prevExerciseCount = await prisma.resistanceExercise.count({
      where: {
        resistanceSessionId: data.ResistanceSession.id,
      },
    })

    const created = await prisma.resistanceExercise.create({
      data: {
        sortPosition: prevExerciseCount,
        ResistanceSession: {
          connect: data.ResistanceSession,
        },
        ResistanceSets: {
          create: data.ResistanceSets.map((s, i) => ({
            sortPosition: i,
            repType: s.repType,
            reps: s.reps,
            Move: {
              connect: { id: s.Move.id },
            },
            Equipment: s.Equipment
              ? { connect: { id: s.Equipment.id } }
              : undefined,
            User: {
              connect: { id: authedUserId },
            },
          })),
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return created
  })

  if (created) {
    return created as ResistanceExercise
  } else {
    throw new ApolloError('createResistanceExercise: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
// NOTE: [select] object must include [id] and [sortPosition]
export const duplicateResistanceExercise = async (
  r: any,
  { id }: MutationDuplicateResistanceExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceExercise', authedUserId, prisma)

  // Get original full data
  const original = await prisma.resistanceExercise.findUnique({
    where: { id },
    include: {
      ResistanceSession: true,
      ResistanceSets: {
        include: {
          Move: true,
          Equipment: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError(
      'duplicateResistanceExercise: Could not retrieve data.',
    )
  }

  const updatedExercises = await prisma.$transaction(async (prisma) => {
    const prevExercises = await prisma.resistanceExercise.findMany({
      where: {
        resistanceSessionId: original.ResistanceSession.id,
      },
      select: {
        id: true,
        sortPosition: true,
      },
    })

    const newItemSortPosition = original.sortPosition + 1

    // Create a new copy.
    const copy = await prisma.resistanceExercise.create({
      data: {
        sortPosition: newItemSortPosition,
        note: original.note,
        ResistanceSession: { connect: { id: original.resistanceSessionId } },
        User: {
          connect: { id: authedUserId },
        },
        ResistanceSets: {
          create: original.ResistanceSets.map((s) => ({
            sortPosition: s.sortPosition,
            note: s.note,
            reps: s.reps,
            repType: s.repType,
            Move: {
              connect: { id: s.moveId },
            },
            Equipment: s.equipmentId
              ? { connect: { id: s.equipmentId } }
              : undefined,
            User: {
              connect: { id: authedUserId },
            },
          })),
        },
      },
      select: {
        id: true,
        sortPosition: true,
      },
    })

    await insertObjectAndReorderSiblings(
      'resistanceExercise',
      prevExercises,
      {
        id: copy.id,
        sortPosition: copy.sortPosition,
      },
      newItemSortPosition,
      prisma,
    )

    const updated = await prisma.resistanceExercise.findMany({
      where: {
        resistanceSessionId: original.ResistanceSession.id,
      },
      select,
    })

    return updated
  })

  if (updatedExercises) {
    return updatedExercises as ResistanceExercise[]
  } else {
    throw new ApolloError('duplicateResistanceExercise: There was an issue.')
  }
}

export const updateResistanceExercise = async (
  r: any,
  { data }: MutationUpdateResistanceExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'resistanceExercise', authedUserId, prisma)

  const updated = await prisma.resistanceExercise.update({
    where: { id: data.id },
    data,
    select,
  })

  if (updated) {
    return updated as ResistanceExercise
  } else {
    throw new ApolloError('updateResistanceExercise: There was an issue.')
  }
}

export const deleteResistanceExercise = async (
  r: any,
  { id }: MutationDeleteResistanceExerciseArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceExercise', authedUserId, prisma)

  const deleted = await prisma.resistanceExercise.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteResistanceExercise: There was an issue.`)
    throw new ApolloError('deleteResistanceExercise: There was an issue.')
  }
}

export const reorderResistanceExercise = async (
  r: any,
  { id, moveTo }: MutationReorderResistanceExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceExercise', authedUserId, prisma)

  const withParent = await prisma.resistanceExercise.findUnique({
    where: { id },
    select: {
      resistanceSessionId: true,
    },
  })

  if (!withParent) {
    throw new ApolloError(
      'reorderResistanceExercise: Could not retrieve parent data.',
    )
  }

  const parentId = withParent.resistanceSessionId

  await reorderSortableObject(
    'resistanceExercise',
    id,
    'resistanceSession',
    parentId,
    moveTo,
    prisma,
  )

  const updated = await prisma.resistanceExercise.findMany({
    where: {
      resistanceSessionId: parentId,
    },
    select,
  })

  if (updated) {
    return updated as ResistanceExercise[]
  } else {
    console.error(`reorderResistanceExercise: There was an issue.`)
    throw new ApolloError('reorderResistanceExercise: There was an issue.')
  }
}

//// Resistance Set ////
//// Create, Duplicate and Delete ops return the updated parent.
//// Returns parent ResistanceSession which has childrenOrder info
export const createResistanceSet = async (
  r: any,
  { data }: MutationCreateResistanceSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ResistanceExercise.id,
    'resistanceExercise',
    authedUserId,
    prisma,
  )

  const resistanceSet = await prisma.$transaction(async (prisma) => {
    /// How many sets are the already in this exercise. Use this to calculate the new set [sortPosition]. sortPosition should be zero indexed.
    /// This resolver will create a new set with the same settings as the last set in the exercise, except with the specified move. i.e. same repType and same reps.
    const prevSets = await prisma.resistanceSet.findMany({
      where: {
        resistanceExerciseId: data.ResistanceExercise.id,
      },
      select: {
        reps: true,
        repType: true,
        sortPosition: true,
      },
    })

    const sorted = prevSets.sort((a, b) => a.sortPosition - b.sortPosition)

    const resistanceSet = await prisma.resistanceSet.create({
      data: {
        sortPosition: prevSets.length,
        reps: sorted[sorted.length - 1].reps,
        repType: sorted[sorted.length - 1].repType,
        ResistanceExercise: {
          connect: data.ResistanceExercise,
        },
        Move: { connect: data.Move },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return resistanceSet
  })

  if (resistanceSet) {
    return resistanceSet as ResistanceSet
  } else {
    throw new ApolloError('createResistanceSet: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
// NOTE: {select} object must include [id] and [sortPosition]
export const duplicateResistanceSet = async (
  r: any,
  { id }: MutationDuplicateResistanceSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceSet', authedUserId, prisma)

  // Get original full data
  const original = await prisma.resistanceSet.findUnique({
    where: { id },
    include: {
      ResistanceExercise: true,
      Move: true,
      Equipment: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateResistanceSet: Could not retrieve data.')
  }

  const updatedSets = await prisma.$transaction(async (prisma) => {
    const prevSets = await prisma.resistanceSet.findMany({
      where: {
        resistanceExerciseId: original.ResistanceExercise.id,
      },
      select: {
        id: true,
        sortPosition: true,
      },
    })

    const newItemSortPosition = original.sortPosition + 1

    // Create a new copy.
    const copy = await prisma.resistanceSet.create({
      data: {
        sortPosition: newItemSortPosition,
        note: original.note,
        reps: original.reps,
        repType: original.repType,
        ResistanceExercise: { connect: { id: original.resistanceExerciseId } },
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
      select: {
        id: true,
        sortPosition: true,
      },
    })

    await insertObjectAndReorderSiblings(
      'resistanceSet',
      prevSets,
      {
        id: copy.id,
        sortPosition: copy.sortPosition,
      },
      newItemSortPosition,
      prisma,
    )

    const updated = await prisma.resistanceSet.findMany({
      where: {
        resistanceExerciseId: original.ResistanceExercise.id,
      },
      select,
    })

    return updated
  })

  if (updatedSets) {
    return updatedSets as ResistanceSet[]
  } else {
    throw new ApolloError('duplicateResistanceSet: There was an issue.')
  }
}

export const updateResistanceSet = async (
  r: any,
  { data }: MutationUpdateResistanceSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'resistanceSet', authedUserId, prisma)

  const updated = await prisma.resistanceSet.update({
    where: { id: data.id },
    data: {
      ...data,
      reps: data.reps || undefined,
      repType: data.repType || undefined,
      Move: data.Move ? { connect: data.Move } : undefined,
      Equipment: data.hasOwnProperty('Equipment')
        ? data.Equipment
          ? { connect: data.Equipment }
          : { disconnect: true }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as ResistanceSet
  } else {
    throw new ApolloError('updateResistanceSet: There was an issue.')
  }
}

export const deleteResistanceSet = async (
  r: any,
  { id }: MutationDeleteResistanceSetArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceSet', authedUserId, prisma)

  const deleted = await prisma.resistanceSet.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteResistanceSet: There was an issue.`)
    throw new ApolloError('deleteResistanceSet: There was an issue.')
  }
}

export const reorderResistanceSet = async (
  r: any,
  { id, moveTo }: MutationReorderResistanceSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceSet', authedUserId, prisma)

  const withParent = await prisma.resistanceSet.findUnique({
    where: { id },
    select: {
      resistanceExerciseId: true,
    },
  })

  if (!withParent) {
    throw new ApolloError(
      'reorderResistanceSet: Could not retrieve parent data.',
    )
  }

  const parentId = withParent.resistanceExerciseId

  await reorderSortableObject(
    'resistanceSet',
    id,
    'resistanceExercise',
    parentId,
    moveTo,
    prisma,
  )

  const updated = await prisma.resistanceSet.findMany({
    where: {
      resistanceExerciseId: parentId,
    },
    select,
  })

  if (updated) {
    return updated as ResistanceSet[]
  } else {
    console.error(`reorderResistanceSet: There was an issue.`)
    throw new ApolloError('reorderResistanceSet: There was an issue.')
  }
}

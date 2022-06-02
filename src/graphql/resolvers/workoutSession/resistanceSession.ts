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
//// Resistance Session ////
export const createResistanceSession = async (
  r: any,
  { data }: MutationCreateResistanceSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.WorkoutSession.id,
    'workoutSession',
    authedUserId,
    prisma,
  )

  const resistanceSession = await prisma.$transaction(async (prisma) => {
    const resistanceSession = await prisma.resistanceSession.create({
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
      (resistanceSession as any).id,
      prisma,
    )

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
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
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
      WorkoutSession: true,
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
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },
        WorkoutSession: { connect: { id: original.workoutSessionId } },
        ResistanceExercises: {
          create: original.ResistanceExercises.map((e) => ({
            note: e.note,
            childrenOrder: e.childrenOrder,
            User: {
              connect: { id: authedUserId },
            },
            ResistanceSets: {
              create: e.ResistanceSets.map((s) => ({
                note: s.note,
                reps: s.reps,
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
    console.error(`deleteResistanceSession: There was an issue.`)
    throw new ApolloError('deleteResistanceSession: There was an issue.')
  }
}

//// Resistance Section ////
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

  const resistanceExercise = await prisma.$transaction(async (prisma) => {
    const resistanceExercise = await prisma.resistanceExercise.create({
      data: {
        ResistanceSets: data.ResistanceSets
          ? {
              create: data.ResistanceSets.map((s) => ({
                reps: s.reps || undefined,
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
            }
          : undefined,
        ResistanceSession: {
          connect: data.ResistanceSession,
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    await pushNewChildToOrder(
      'resistanceSession',
      data.ResistanceSession.id,
      (resistanceExercise as any).id,
      prisma,
    )

    return resistanceExercise
  })

  if (resistanceExercise) {
    return resistanceExercise as ResistanceExercise
  } else {
    throw new ApolloError('createResistanceExercise: There was an issue.')
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
    data: {
      ...data,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as ResistanceExercise
  } else {
    throw new ApolloError('updateResistanceExercise: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
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

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.resistanceExercise.create({
      data: {
        note: original.note,
        childrenOrder: original.childrenOrder,
        ResistanceSession: { connect: { id: original.resistanceSessionId } },
        User: {
          connect: { id: authedUserId },
        },
        ResistanceSets: {
          create: original.ResistanceSets.map((s) => ({
            note: s.note,
            reps: s.reps,
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
      select,
    })

    await duplicateNewChildToOrder(
      'resistanceSession',
      original.ResistanceSession.id,
      original.ResistanceSession.childrenOrder,
      original.id,
      (copy as any).id,
      prisma,
    )

    return copy
  })

  if (copy) {
    return copy as ResistanceExercise
  } else {
    throw new ApolloError('duplicateResistanceExercise: There was an issue.')
  }
}

export const deleteResistanceExercise = async (
  r: any,
  { id }: MutationDeleteResistanceExerciseArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceExercise', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.resistanceExercise.delete({
      where: { id },
      select: {
        id: true,
        ResistanceSession: { select: { id: true, childrenOrder: true } },
      },
    })

    await deleteChildFromOrder(
      'resistanceSession',
      deleted.ResistanceSession.id,
      deleted.ResistanceSession.childrenOrder,
      deleted.id,
      prisma,
    )

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteResistanceExercise: There was an issue.`)
    throw new ApolloError('deleteResistanceExercise: There was an issue.')
  }
}

//// Resistance Set ////
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
    const resistanceSet = await prisma.resistanceSet.create({
      data: {
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

    await pushNewChildToOrder(
      'resistanceExercise',
      data.ResistanceExercise.id,
      (resistanceSet as any).id,
      prisma,
    )

    return resistanceSet
  })

  if (resistanceSet) {
    return resistanceSet as ResistanceSet
  } else {
    throw new ApolloError('createResistanceSet: There was an issue.')
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
      Move: data.Move ? { connect: data.Move } : undefined,
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
    },
    select,
  })

  if (updated) {
    return updated as ResistanceSet
  } else {
    throw new ApolloError('updateResistanceSet: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
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

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.resistanceSet.create({
      data: {
        note: original.note,
        reps: original.reps,
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
      select,
    })

    await duplicateNewChildToOrder(
      'resistanceExercise',
      original.ResistanceExercise.id,
      original.ResistanceExercise.childrenOrder,
      original.id,
      (copy as any).id,
      prisma,
    )

    return copy
  })

  if (copy) {
    return copy as ResistanceSet
  } else {
    throw new ApolloError('duplicateResistanceSet: There was an issue.')
  }
}

export const deleteResistanceSet = async (
  r: any,
  { id }: MutationDeleteResistanceSetArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceSet', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.resistanceSet.delete({
      where: { id },
      select: {
        id: true,
        ResistanceExercise: {
          select: {
            id: true,
            childrenOrder: true,
          },
        },
      },
    })

    await deleteChildFromOrder(
      'resistanceExercise',
      deleted.ResistanceExercise.id,
      deleted.ResistanceExercise.childrenOrder,
      deleted.id,
      prisma,
    )

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteResistanceSet: There was an issue.`)
    throw new ApolloError('deleteResistanceSet: There was an issue.')
  }
}

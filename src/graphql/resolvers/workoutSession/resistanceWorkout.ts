import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ResistanceExercise,
  ResistanceWorkout,
  ResistanceSet,
  MutationCreateResistanceExerciseArgs,
  MutationCreateResistanceWorkoutArgs,
  MutationCreateResistanceSetArgs,
  MutationDeleteResistanceExerciseArgs,
  MutationDeleteResistanceWorkoutArgs,
  MutationDeleteResistanceSetArgs,
  MutationDuplicateResistanceExerciseArgs,
  MutationDuplicateResistanceWorkoutArgs,
  MutationDuplicateResistanceSetArgs,
  MutationUpdateResistanceExerciseArgs,
  MutationUpdateResistanceWorkoutArgs,
  MutationUpdateResistanceSetArgs,
  MutationReorderResistanceExerciseArgs,
  MutationReorderResistanceSetArgs,
  QueryResistanceWorkoutByIdArgs,
  MutationCreateSavedResistanceWorkoutArgs,
  MutationDeleteSavedResistanceWorkoutArgs,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { insertObjectAndReorderSiblings, reorderSortableObject } from './utils'

// //// Queries ////
// /// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
// // Logged in user only.
export const userCreatedResistanceWorkouts = async (
  r: any,
  a: any,
  { select, authedUserId, prisma }: Context,
) => {
  const sessions = await prisma.resistanceWorkout.findMany({
    where: {
      userId: authedUserId,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select,
  })

  return sessions as ResistanceWorkout[]
}

export const userSavedResistanceWorkouts = async (
  r: any,
  a: any,
  { select, authedUserId, prisma }: Context,
) => {
  const saved = await prisma.savedResistanceWorkout.findMany({
    where: {
      userId: authedUserId,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: {
      ResistanceWorkout: {
        select,
      },
    },
  })

  return saved.map((s) => s.ResistanceWorkout as any) as ResistanceWorkout[]
}

export const resistanceWorkoutById = async (
  r: any,
  { id }: QueryResistanceWorkoutByIdArgs,
  { select, prisma }: Context,
) => {
  const workoutSession = await prisma.resistanceWorkout.findUnique({
    where: { id },
    select,
  })

  if (workoutSession) {
    return workoutSession as ResistanceWorkout
  } else {
    console.error(
      `resistanceWorkoutById: Could not find a session with id ${id}`,
    )
    return null
  }
}

//// Mutations ////
//// Resistance Session ////
export const createResistanceWorkout = async (
  r: any,
  { data }: MutationCreateResistanceWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const resistanceWorkout = await prisma.resistanceWorkout.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (resistanceWorkout) {
    return resistanceWorkout as ResistanceWorkout
  } else {
    throw new ApolloError('createResistanceWorkout: There was an issue.')
  }
}

export const updateResistanceWorkout = async (
  r: any,
  { data }: MutationUpdateResistanceWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'resistanceWorkout', authedUserId, prisma)

  const updated = await prisma.resistanceWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    return updated as ResistanceWorkout
  } else {
    throw new ApolloError('updateResistanceWorkout: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateResistanceWorkout = async (
  r: any,
  { id }: MutationDuplicateResistanceWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceWorkout', authedUserId, prisma)

  // Get original full data
  const original = await prisma.resistanceWorkout.findUnique({
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
      'duplicateResistanceWorkout: Could not retrieve data.',
    )
  }

  // Create a new copy.
  const copy = await prisma.resistanceWorkout.create({
    data: {
      name: `${original.name} - copy`,
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

  if (copy) {
    return copy as ResistanceWorkout
  } else {
    throw new ApolloError('duplicateResistanceWorkout: There was an issue.')
  }
}

export const deleteResistanceWorkout = async (
  r: any,
  { id }: MutationDeleteResistanceWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'resistanceWorkout', authedUserId, prisma)

  const deleted = await prisma.resistanceWorkout.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteResistanceWorkout: There was an issue.`)
    throw new ApolloError('deleteResistanceWorkout: There was an issue.')
  }
}

export const createSavedResistanceWorkout = async (
  r: any,
  { id }: MutationCreateSavedResistanceWorkoutArgs,
  { select, authedUserId, prisma }: Context,
) => {
  const session = await prisma.resistanceWorkout.findUnique({
    where: { id },
    select: {
      userId: true,
    },
  })

  if (!session) {
    throw new ApolloError(
      `toggleSaveResistanceWorkout: Could not find a session with ID ${id}`,
    )
  }

  if (session.userId !== authedUserId) {
    throw new ApolloError(
      `toggleSaveResistanceWorkout: You cannot save your own created sessions.`,
    )
  }

  const savedResistanceWorkout = await prisma.savedResistanceWorkout.create({
    data: {
      ResistanceWorkout: { connect: { id } },
      User: { connect: { id: authedUserId } },
    },
    select: {
      ResistanceWorkout: {
        select,
      },
    },
  })

  if (savedResistanceWorkout) {
    return savedResistanceWorkout.ResistanceWorkout as ResistanceWorkout
  } else {
    console.error(`toggleSaveResistanceWorkout: There was an issue.`)
    throw new ApolloError('toggleSaveResistanceWorkout: There was an issue.')
  }
}

export const deleteSavedResistanceWorkout = async (
  r: any,
  { savedResistanceWorkoutId }: MutationDeleteSavedResistanceWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(
    savedResistanceWorkoutId,
    'savedResistanceWorkout',
    authedUserId,
    prisma,
  )
  const deleted = await prisma.savedResistanceWorkout.delete({
    where: { id: savedResistanceWorkoutId },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteSavedResistanceWorkout: There was an issue.`)
    throw new ApolloError('deleteSavedResistanceWorkout: There was an issue.')
  }
}

//// Resistance Exercise ////
//// Create, Duplicate and Delete ops return the updated parent.
//// Returns parent ResistanceWorkout which has childrenOrder info
//// Always created with child resistanceSets sideposted (nested writes)
export const createResistanceExercise = async (
  r: any,
  { data }: MutationCreateResistanceExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ResistanceWorkout.id,
    'resistanceWorkout',
    authedUserId,
    prisma,
  )

  const created = await prisma.$transaction(async (prisma) => {
    /// How many exercises are the already in this session. Use this to calculate the new exercise [sortPosition]. sortPosition should be zero indexed.
    const prevExerciseCount = await prisma.resistanceExercise.count({
      where: {
        resistanceWorkoutId: data.ResistanceWorkout.id,
      },
    })

    const created = await prisma.resistanceExercise.create({
      data: {
        sortPosition: prevExerciseCount,
        ResistanceWorkout: {
          connect: data.ResistanceWorkout,
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
      ResistanceWorkout: true,
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
        resistanceWorkoutId: original.ResistanceWorkout.id,
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
        ResistanceWorkout: { connect: { id: original.resistanceWorkoutId } },
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
        resistanceWorkoutId: original.ResistanceWorkout.id,
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
      resistanceWorkoutId: true,
    },
  })

  if (!withParent) {
    throw new ApolloError(
      'reorderResistanceExercise: Could not retrieve parent data.',
    )
  }

  const parentId = withParent.resistanceWorkoutId

  await reorderSortableObject(
    'resistanceExercise',
    id,
    'resistanceWorkout',
    parentId,
    moveTo,
    prisma,
  )

  const updated = await prisma.resistanceExercise.findMany({
    where: {
      resistanceWorkoutId: parentId,
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
//// Returns parent ResistanceWorkout which has childrenOrder info
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

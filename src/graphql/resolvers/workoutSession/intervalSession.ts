import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  IntervalExercise,
  IntervalSession,
  IntervalSet,
  MutationCreateIntervalExerciseArgs,
  MutationCreateIntervalSessionArgs,
  MutationCreateIntervalSetArgs,
  MutationDeleteIntervalExerciseArgs,
  MutationDeleteIntervalSessionArgs,
  MutationDeleteIntervalSetArgs,
  MutationDuplicateIntervalExerciseArgs,
  MutationDuplicateIntervalSessionArgs,
  MutationDuplicateIntervalSetArgs,
  MutationUpdateIntervalExerciseArgs,
  MutationUpdateIntervalSessionArgs,
  MutationUpdateIntervalSetArgs,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  processStringListUpdateInputData,
  processNumberListUpdateInputData,
} from '../../utils'

//// Mutations ////
//// Interval Session ////
export const createIntervalSession = async (
  r: any,
  { data }: MutationCreateIntervalSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const intervalSession = await prisma.intervalSession.create({
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

  if (intervalSession) {
    return intervalSession as IntervalSession
  } else {
    throw new ApolloError('createIntervalSession: There was an issue.')
  }
}

export const updateIntervalSession = async (
  r: any,
  { data }: MutationUpdateIntervalSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'intervalSession', authedUserId, prisma)

  const updated = await prisma.intervalSession.update({
    where: { id: data.id },
    data: {
      ...data,
      repeats: data.repeats || undefined,
      intervalExerciseOrder: processStringListUpdateInputData(
        data,
        'intervalExerciseOrder',
      ),
      intervals: processNumberListUpdateInputData(data, 'intervals'),
    },
    select,
  })

  if (updated) {
    return updated as IntervalSession
  } else {
    throw new ApolloError('updateIntervalSession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateIntervalSession = async (
  r: any,
  { id }: MutationDuplicateIntervalSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'intervalSession', authedUserId, prisma)

  // Get original full data
  const original = await prisma.intervalSession.findUnique({
    where: { id },
    include: {
      IntervalExercises: {
        include: {
          IntervalSets: {
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
    throw new ApolloError('duplicateIntervalSession: Could not retrieve data.')
  }

  // Create a new copy.
  const copy = await prisma.intervalSession.create({
    data: {
      name: original.name,
      note: original.note,
      repeats: original.repeats,
      intervalExerciseOrder: original.intervalExerciseOrder,
      intervals: original.intervals,
      WorkoutSession: { connect: { id: original.workoutSessionId } },
      User: {
        connect: { id: authedUserId },
      },
      IntervalExercises: {
        create: original.IntervalExercises.map((e) => ({
          note: e.note,
          intervalSetOrder: e.intervalSetOrder,
          User: {
            connect: { id: authedUserId },
          },
          IntervalSets: {
            create: e.IntervalSets.map((s) => ({
              note: s.note,
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
    return copy as IntervalSession
  } else {
    throw new ApolloError('duplicateIntervalSession: There was an issue.')
  }
}

export const deleteIntervalSession = async (
  r: any,
  { id }: MutationDeleteIntervalSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'intervalSession', authedUserId, prisma)

  const deleted = await prisma.intervalSession.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteIntervalSession: There was an issue.`)
    throw new ApolloError('deleteIntervalSession: There was an issue.')
  }
}

//// Interval Section ////
export const createIntervalExercise = async (
  r: any,
  { data }: MutationCreateIntervalExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const intervalExercise = await prisma.intervalExercise.create({
    data: {
      IntervalSession: {
        connect: data.IntervalSession,
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (intervalExercise) {
    return intervalExercise as IntervalExercise
  } else {
    throw new ApolloError('createIntervalExercise: There was an issue.')
  }
}

export const updateIntervalExercise = async (
  r: any,
  { data }: MutationUpdateIntervalExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'intervalExercise', authedUserId, prisma)

  const updated = await prisma.intervalExercise.update({
    where: { id: data.id },
    data: {
      ...data,
      intervalSetOrder: processStringListUpdateInputData(
        data,
        'intervalSetOrder',
      ),
    },
    select,
  })

  if (updated) {
    return updated as IntervalExercise
  } else {
    throw new ApolloError('updateIntervalExercise: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateIntervalExercise = async (
  r: any,
  { id }: MutationDuplicateIntervalExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'intervalExercise', authedUserId, prisma)

  // Get original full data
  const original = await prisma.intervalExercise.findUnique({
    where: { id },
    include: {
      IntervalSets: {
        include: {
          Move: true,
          Equipment: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateIntervalExercise: Could not retrieve data.')
  }

  // Create a new copy.
  const copy = await prisma.intervalExercise.create({
    data: {
      note: original.note,
      intervalSetOrder: original.intervalSetOrder,
      IntervalSession: { connect: { id: original.intervalSessionId } },
      User: {
        connect: { id: authedUserId },
      },
      IntervalSets: {
        create: original.IntervalSets.map((s) => ({
          note: s.note,
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

  if (copy) {
    return copy as IntervalExercise
  } else {
    throw new ApolloError('duplicateIntervalExercise: There was an issue.')
  }
}

export const deleteIntervalExercise = async (
  r: any,
  { id }: MutationDeleteIntervalExerciseArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'intervalExercise', authedUserId, prisma)

  const deleted = await prisma.intervalExercise.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteIntervalExercise: There was an issue.`)
    throw new ApolloError('deleteIntervalExercise: There was an issue.')
  }
}

//// Interval Set ////
export const createIntervalSet = async (
  r: any,
  { data }: MutationCreateIntervalSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const intervalSet = await prisma.intervalSet.create({
    data: {
      IntervalExercise: {
        connect: data.IntervalExercise,
      },
      Move: { connect: data.Move },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (intervalSet) {
    return intervalSet as IntervalSet
  } else {
    throw new ApolloError('createIntervalSet: There was an issue.')
  }
}

export const updateIntervalSet = async (
  r: any,
  { data }: MutationUpdateIntervalSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'intervalSet', authedUserId, prisma)

  const updated = await prisma.intervalSet.update({
    where: { id: data.id },
    data: {
      ...data,
      Move: data.Move ? { connect: data.Move } : undefined,
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
    },
    select,
  })

  if (updated) {
    return updated as IntervalSet
  } else {
    throw new ApolloError('updateIntervalSet: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateIntervalSet = async (
  r: any,
  { id }: MutationDuplicateIntervalSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'intervalSet', authedUserId, prisma)

  // Get original full data
  const original = await prisma.intervalSet.findUnique({
    where: { id },
    include: {
      Move: true,
      Equipment: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateIntervalSet: Could not retrieve data.')
  }

  // Create a new copy.
  const copy = await prisma.intervalSet.create({
    data: {
      note: original.note,
      IntervalExercise: { connect: { id: original.intervalExerciseId } },
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

  if (copy) {
    return copy as IntervalSet
  } else {
    throw new ApolloError('duplicateIntervalSet: There was an issue.')
  }
}

export const deleteIntervalSet = async (
  r: any,
  { id }: MutationDeleteIntervalSetArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'intervalSet', authedUserId, prisma)

  const deleted = await prisma.intervalSet.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteIntervalSet: There was an issue.`)
    throw new ApolloError('deleteIntervalSet: There was an issue.')
  }
}

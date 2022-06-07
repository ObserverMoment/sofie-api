import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  CardioExercise,
  CardioSession,
  MutationCreateCardioExerciseArgs,
  MutationCreateCardioSessionArgs,
  MutationDeleteCardioExerciseArgs,
  MutationDeleteCardioSessionArgs,
  MutationDuplicateCardioExerciseArgs,
  MutationDuplicateCardioSessionArgs,
  MutationUpdateCardioExerciseArgs,
  MutationUpdateCardioSessionArgs,
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
//// Cardio Session ////
export const createCardioSession = async (
  r: any,
  { data }: MutationCreateCardioSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.WorkoutSession.id,
    'workoutSession',
    authedUserId,
    prisma,
  )

  const cardioSession = await prisma.$transaction(async (prisma) => {
    const cardioSession = await prisma.cardioSession.create({
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
      data.WorkoutSession.id,
      (cardioSession as any).id,
      prisma,
    )

    return cardioSession
  })

  if (cardioSession) {
    return cardioSession as CardioSession
  } else {
    throw new ApolloError('createCardioSession: There was an issue.')
  }
}

export const updateCardioSession = async (
  r: any,
  { data }: MutationUpdateCardioSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'cardioSession', authedUserId, prisma)

  const updated = await prisma.cardioSession.update({
    where: { id: data.id },
    data: {
      ...data,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as CardioSession
  } else {
    throw new ApolloError('updateCardioSession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateCardioSession = async (
  r: any,
  { id }: MutationDuplicateCardioSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'cardioSession', authedUserId, prisma)

  // Get original full data
  const original = await prisma.cardioSession.findUnique({
    where: { id },
    include: {
      WorkoutSession: true,
      CardioExercises: {
        include: {
          Move: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateCardioSession: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.cardioSession.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,
        WorkoutSession: {
          connect: { id: original.workoutSessionId },
        },
        User: {
          connect: { id: authedUserId },
        },
        CardioExercises: {
          create: original.CardioExercises.map((e) => ({
            note: e.note,
            time: e.time,
            timeUnit: e.timeUnit,
            distance: e.distance,
            distanceUnit: e.distanceUnit,
            cardioZone: e.cardioZone,
            Move: {
              connect: { id: e.moveId },
            },
            User: {
              connect: { id: authedUserId },
            },
          })),
        },
      },
      select,
    })

    await duplicateNewChildToOrder(
      original.workoutSessionId,
      original.WorkoutSession.childrenOrder,
      original.id,
      (copy as any).id,
      prisma,
    )

    return copy
  })

  if (copy) {
    return copy as CardioSession
  } else {
    throw new ApolloError('duplicateCardioSession: There was an issue.')
  }
}

export const deleteCardioSession = async (
  r: any,
  { id }: MutationDeleteCardioSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'cardioSession', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.cardioSession.delete({
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
    console.error(`deleteCardioSession: There was an issue.`)
    throw new ApolloError('deleteCardioSession: There was an issue.')
  }
}

////// Cardio Exercise ///////
export const createCardioExercise = async (
  r: any,
  { data }: MutationCreateCardioExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.CardioSession.id,
    'cardioSession',
    authedUserId,
    prisma,
  )

  const cardioExercise = await prisma.$transaction(async (prisma) => {
    const cardioExercise = await prisma.cardioExercise.create({
      data: {
        Move: {
          connect: data.Move,
        },
        CardioSession: {
          connect: data.CardioSession,
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return cardioExercise
  })

  if (cardioExercise) {
    return cardioExercise as CardioExercise
  } else {
    throw new ApolloError('createCardioExercise: There was an issue.')
  }
}

export const updateCardioExercise = async (
  r: any,
  { data }: MutationUpdateCardioExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'cardioExercise', authedUserId, prisma)

  const updated = await prisma.cardioExercise.update({
    where: { id: data.id },
    data: {
      ...data,
      timeUnit: data.timeUnit || undefined,
      distanceUnit: data.distanceUnit || undefined,
      cardioZone: data.cardioZone || undefined,
      Move: data.Move ? { connect: data.Move } : undefined,
    },
    select,
  })

  if (updated) {
    return updated as CardioExercise
  } else {
    throw new ApolloError('updateCardioExercise: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateCardioExercise = async (
  r: any,
  { id }: MutationDuplicateCardioExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'cardioExercise', authedUserId, prisma)

  // Get original full data
  const original = await prisma.cardioExercise.findUnique({
    where: { id },
    include: {
      Move: true,
      CardioSession: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateCardioExercise: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy. Do not copy across the media or meta data and adjust the name.
    const copy = await prisma.cardioExercise.create({
      data: {
        note: original.note,
        time: original.time,
        timeUnit: original.timeUnit,
        distance: original.distance,
        distanceUnit: original.distanceUnit,
        cardioZone: original.cardioZone,
        Move: {
          connect: { id: original.moveId },
        },
        User: {
          connect: { id: authedUserId },
        },
        CardioSession: {
          connect: { id: original.cardioSessionId },
        },
      },
      select,
    })

    return copy
  })

  if (copy) {
    return copy as CardioExercise
  } else {
    throw new ApolloError('duplicateCardioExercise: There was an issue.')
  }
}

export const deleteCardioExercise = async (
  r: any,
  { id }: MutationDeleteCardioExerciseArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'cardioExercise', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.cardioExercise.delete({
      where: { id },
      select: {
        id: true,
        CardioSession: {
          select: { id: true, childrenOrder: true },
        },
      },
    })

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteCardioExercise: There was an issue.`)
    throw new ApolloError('deleteCardioExercise: There was an issue.')
  }
}

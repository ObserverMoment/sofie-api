import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  CardioExercise,
  CardioWorkout,
  MutationCreateCardioExerciseArgs,
  MutationCreateCardioWorkoutArgs,
  MutationDeleteCardioExerciseArgs,
  MutationDeleteCardioWorkoutArgs,
  MutationDuplicateCardioExerciseArgs,
  MutationDuplicateCardioWorkoutArgs,
  MutationUpdateCardioExerciseArgs,
  MutationUpdateCardioWorkoutArgs,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  processStringListUpdateInputData,
} from '../../utils'

//// Mutations ////
//// Cardio Session ////
export const createCardioWorkout = async (
  r: any,
  { data }: MutationCreateCardioWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const cardioWorkout = await prisma.$transaction(async (prisma) => {
    const cardioWorkout = await prisma.cardioWorkout.create({
      data: {
        name: data.name,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return cardioWorkout
  })

  if (cardioWorkout) {
    return cardioWorkout as CardioWorkout
  } else {
    throw new ApolloError('createCardioWorkout: There was an issue.')
  }
}

export const updateCardioWorkout = async (
  r: any,
  { data }: MutationUpdateCardioWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'cardioWorkout', authedUserId, prisma)

  const updated = await prisma.cardioWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as CardioWorkout
  } else {
    throw new ApolloError('updateCardioWorkout: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateCardioWorkout = async (
  r: any,
  { id }: MutationDuplicateCardioWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'cardioWorkout', authedUserId, prisma)

  // Get original full data
  const original = await prisma.cardioWorkout.findUnique({
    where: { id },
    include: {
      CardioExercises: {
        include: {
          Move: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateCardioWorkout: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.cardioWorkout.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,

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

    return copy
  })

  if (copy) {
    return copy as CardioWorkout
  } else {
    throw new ApolloError('duplicateCardioWorkout: There was an issue.')
  }
}

export const deleteCardioWorkout = async (
  r: any,
  { id }: MutationDeleteCardioWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'cardioWorkout', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.cardioWorkout.delete({
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
    console.error(`deleteCardioWorkout: There was an issue.`)
    throw new ApolloError('deleteCardioWorkout: There was an issue.')
  }
}

////// Cardio Exercise ///////
export const createCardioExercise = async (
  r: any,
  { data }: MutationCreateCardioExerciseArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.CardioWorkout.id,
    'cardioWorkout',
    authedUserId,
    prisma,
  )

  const cardioExercise = await prisma.$transaction(async (prisma) => {
    const cardioExercise = await prisma.cardioExercise.create({
      data: {
        Move: {
          connect: data.Move,
        },
        CardioWorkout: {
          connect: data.CardioWorkout,
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
      CardioWorkout: true,
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
        CardioWorkout: {
          connect: { id: original.cardioWorkoutId },
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
        CardioWorkout: {
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

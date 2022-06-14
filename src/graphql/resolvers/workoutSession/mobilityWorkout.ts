import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MobilityWorkout,
  MutationCreateMobilityWorkoutArgs,
  MutationDeleteMobilityWorkoutArgs,
  MutationDuplicateMobilityWorkoutArgs,
  MutationUpdateMobilityWorkoutArgs,
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
//// Mobility Session ////
export const createMobilityWorkout = async (
  r: any,
  { data }: MutationCreateMobilityWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const mobilityWorkout = await prisma.$transaction(async (prisma) => {
    const mobilityWorkout = await prisma.mobilityWorkout.create({
      data: {
        name: data.name,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return mobilityWorkout
  })

  if (mobilityWorkout) {
    return mobilityWorkout as MobilityWorkout
  } else {
    throw new ApolloError('createMobilityWorkout: There was an issue.')
  }
}

export const updateMobilityWorkout = async (
  r: any,
  { data }: MutationUpdateMobilityWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'mobilityWorkout', authedUserId, prisma)

  const updated = await prisma.mobilityWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
      MobilityMoves: data.hasOwnProperty('MobilityMoves')
        ? data.MobilityMoves
          ? { connect: data.MobilityMoves }
          : { set: [] }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as MobilityWorkout
  } else {
    throw new ApolloError('updateMobilityWorkout: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateMobilityWorkout = async (
  r: any,
  { id }: MutationDuplicateMobilityWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'mobilityWorkout', authedUserId, prisma)

  // Get original full data
  const original = await prisma.mobilityWorkout.findUnique({
    where: { id },
    include: {
      MobilityMoves: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateMobilityWorkout: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.mobilityWorkout.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },
        MobilityMoves: {
          connect: original.MobilityMoves.map((m) => ({
            id: m.id,
          })),
        },
      },
      select,
    })

    return copy
  })

  if (copy) {
    return copy as MobilityWorkout
  } else {
    throw new ApolloError('duplicateMobilityWorkout: There was an issue.')
  }
}

export const deleteMobilityWorkout = async (
  r: any,
  { id }: MutationDeleteMobilityWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'mobilityWorkout', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.mobilityWorkout.delete({
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
    console.error(`deleteMobilityWorkout: There was an issue.`)
    throw new ApolloError('deleteMobilityWorkout: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MobilitySession,
  MutationCreateMobilitySessionArgs,
  MutationDeleteMobilitySessionArgs,
  MutationDuplicateMobilitySessionArgs,
  MutationUpdateMobilitySessionArgs,
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
export const createMobilitySession = async (
  r: any,
  { data }: MutationCreateMobilitySessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const mobilitySession = await prisma.$transaction(async (prisma) => {
    const mobilitySession = await prisma.mobilitySession.create({
      data: {
        name: data.name,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return mobilitySession
  })

  if (mobilitySession) {
    return mobilitySession as MobilitySession
  } else {
    throw new ApolloError('createMobilitySession: There was an issue.')
  }
}

export const updateMobilitySession = async (
  r: any,
  { data }: MutationUpdateMobilitySessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'mobilitySession', authedUserId, prisma)

  const updated = await prisma.mobilitySession.update({
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
    return updated as MobilitySession
  } else {
    throw new ApolloError('updateMobilitySession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateMobilitySession = async (
  r: any,
  { id }: MutationDuplicateMobilitySessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'mobilitySession', authedUserId, prisma)

  // Get original full data
  const original = await prisma.mobilitySession.findUnique({
    where: { id },
    include: {
      MobilityMoves: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateMobilitySession: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.mobilitySession.create({
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
    return copy as MobilitySession
  } else {
    throw new ApolloError('duplicateMobilitySession: There was an issue.')
  }
}

export const deleteMobilitySession = async (
  r: any,
  { id }: MutationDeleteMobilitySessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'mobilitySession', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.mobilitySession.delete({
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
    console.error(`deleteMobilitySession: There was an issue.`)
    throw new ApolloError('deleteMobilitySession: There was an issue.')
  }
}

//// Mutations ////

import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  AmrapSession,
  MutationCreateAmrapSessionArgs,
  MutationDeleteAmrapSessionArgs,
  MutationDuplicateAmrapSessionArgs,
  MutationUpdateAmrapSessionArgs,
} from '../../../generated/graphql'
import { checkUserOwnsObject, processListUpdateInputData } from '../../utils'

//// Amrap Session ////
export const createAmrapSession = async (
  r: any,
  { data }: MutationCreateAmrapSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const amrapSession = await prisma.amrapSession.create({
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

  if (amrapSession) {
    return amrapSession as AmrapSession
  } else {
    throw new ApolloError('createAmrapSession: There was an issue.')
  }
}

export const updateAmrapSession = async (
  r: any,
  { data }: MutationUpdateAmrapSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'amrapSession', authedUserId, prisma)

  const updated = await prisma.amrapSession.update({
    where: { id: data.id },
    data: {
      ...data,
      sectionOrder: processListUpdateInputData(data, 'sectionOrder'),
    },
    select,
  })

  if (updated) {
    return updated as AmrapSession
  } else {
    throw new ApolloError('updateAmrapSession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateAmrapSession = async (
  r: any,
  { id }: MutationDuplicateAmrapSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapSession', authedUserId, prisma)

  // Get original full data
  const original = await prisma.amrapSession.findUnique({
    where: { id },
    include: {
      AmrapSections: {
        include: {
          AmrapMoves: {
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
    throw new ApolloError('duplicateAmrapSession: Could not retrieve data.')
  }

  // Create a new copy.
  const copy = await prisma.amrapSession.create({
    data: {
      name: original.name,
      note: original.note,
      sectionOrder: original.sectionOrder,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSession: {
        connect: { id: original.workoutSessionId },
      },
      AmrapSections: {
        create: original.AmrapSections.map((s) => ({
          name: s.name,
          note: s.note,
          moveOrder: s.moveOrder,
          User: {
            connect: { id: authedUserId },
          },
          AmrapMoves: s.AmrapMoves.map((m) => ({
            note: m.note,
            Move: {
              connect: { id: m.moveId },
            },
            Equipment: { connect: m.equipmentId || undefined },
            User: {
              connect: { id: authedUserId },
            },
          })),
        })),
      },
    },
    select,
  })

  if (copy) {
    return copy as AmrapSession
  } else {
    throw new ApolloError('duplicateAmrapSession: There was an issue.')
  }
}

export const deleteAmrapSession = async (
  r: any,
  { id }: MutationDeleteAmrapSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapSession', authedUserId, prisma)

  const deleted = await prisma.amrapSession.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteAmrapSession: There was an issue.`)
    throw new ApolloError('deleteCardioSession: There was an issue.')
  }
}

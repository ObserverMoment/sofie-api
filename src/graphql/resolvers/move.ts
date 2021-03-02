import { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server'
import { Context, ContextUserType } from '../..'
import {
  CreateMoveInput,
  UpdateMoveInput,
  Move,
  MutationCreateMoveArgs,
  MutationDeleteMoveByIdArgs,
  MutationUpdateMoveArgs,
} from '../../generated/graphql'
import { checkMoveMediaForDeletion, deleteFiles } from '../../uploadcare'

//// Queries ////
// Move scopes are 'STANDARD' or 'CUSTOM'.
const standardMoves = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.move.findMany({
    where: { scope: 'STANDARD', archived: false },
    select,
  })

const userCustomMoves = async (
  r: any,
  a: any,
  { authedUserId, prisma, select }: Context,
) =>
  prisma.move.findMany({
    where: {
      Creator: { id: authedUserId },
      scope: 'CUSTOM',
      archived: false,
    },
    select,
  })

//// Mutations ////
/// Move mutations for custom moves only - for updating official moves see officialData resolvers ////
const createMove = async (
  r: any,
  { data }: MutationCreateMoveArgs,
  { authedUserId, userType, prisma, select }: Context,
) => {
  validateCreateMoveInput(data, userType)
  return prisma.move.create({
    data: {
      ...data,
      Creator:
        userType === 'ADMIN' || !authedUserId
          ? undefined
          : {
              connect: { id: authedUserId },
            },
      MoveType: {
        connect: {
          id: data.MoveType,
        },
      },
      scope: data.scope || 'CUSTOM',
      RequiredEquipments: {
        connect: data.RequiredEquipments
          ? data.RequiredEquipments.map((id: string) => ({ id }))
          : undefined,
      },
      SelectableEquipments: {
        connect: data.SelectableEquipments
          ? data.SelectableEquipments.map((id: string) => ({ id }))
          : undefined,
      },
      BodyAreaMoveScores: {
        create: data.BodyAreaMoveScores
          ? data.BodyAreaMoveScores.map((bams) => ({
              BodyArea: {
                connect: { id: bams.BodyArea },
              },
              score: bams.score,
            }))
          : undefined,
      },
    } as Prisma.MoveCreateInput,
    select,
  })
}

const updateMove = async (
  r: any,
  { data }: MutationUpdateMoveArgs,
  { userType, prisma, select }: Context,
) => {
  validateUpdateMoveInput(data, userType)
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion: string[] | null = await checkMoveMediaForDeletion(
    prisma,
    data,
  )

  if (data.BodyAreaMoveScores) {
    // Deep update required
    // Delete all descendants - this will delete all bodyAreaMoveScores via cascade deletes.
    // https://paljs.com/plugins/delete/
    await prisma.onDelete({
      model: 'BodyAreaMoveScore',
      where: { moveId: data.id },
      deleteParent: false, // If false, just the descendants will be deleted.
    })
  }

  const updatedMove: Move = await prisma.move.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      RequiredEquipments: {
        set: data.RequiredEquipments
          ? data.RequiredEquipments.map((id: string) => ({ id }))
          : [],
      },
      MoveType: {
        connect: {
          id: data.MoveType || undefined,
        },
      },
      scope: data.scope || 'CUSTOM',
      SelectableEquipments: {
        set: data.SelectableEquipments
          ? data.SelectableEquipments.map((id: string) => ({ id }))
          : [],
      },
    },
    BodyAreaMoveScores: data.BodyAreaMoveScores
      ? {
          create: data.BodyAreaMoveScores
            ? data.BodyAreaMoveScores.map((bams) => ({
                BodyArea: {
                  connect: { id: bams.BodyArea },
                },
                score: bams.score,
              }))
            : undefined,
        }
      : null,
    select,
  } as Prisma.MoveUpdateInput)

  if (updatedMove && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }
  return updatedMove
}

const deleteMoveById = async (
  r: any,
  { moveId }: MutationDeleteMoveByIdArgs,
  { prisma }: Context,
) => {
  // Is this move part of any workoutMoves (is it part of any workouts)?
  const numWorkoutMoves: number = await prisma.workoutMove.count({
    where: {
      Move: { id: moveId },
    },
  })

  if (numWorkoutMoves > 0) {
    // Yes - then don't delete just archive. Mark for periodic cleanup.

    const archivedMove: Move = await prisma.move.update({
      where: {
        id: moveId,
      },
      data: {
        archived: true,
      },
      select: {
        id: true,
      },
    } as Prisma.MoveUpdateInput)
    return archivedMove.id
  } else {
    // No - then continue with delete as below.
    // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
    await prisma.onDelete({
      model: 'Move',
      where: { id: moveId },
      deleteParent: false, // If false, just the descendants will be deleted.
    })

    const select: Prisma.MoveSelect = {
      id: true,
      demoVideoUri: true,
      demoVideoThumbUri: true,
    }

    // Delete move and get back related uploaded media files.
    const deletedMove: Move = await prisma.move.delete({
      where: { id: moveId },
      select,
    })

    // Check if there is media to be deleted from the uploadcare server.
    if (deletedMove) {
      if (deletedMove.demoVideoUri) {
        const fileIdsForDeletion: string[] = []
        fileIdsForDeletion.push(deletedMove.demoVideoUri)
        if (deletedMove.demoVideoThumbUri) {
          fileIdsForDeletion.push(deletedMove.demoVideoThumbUri)
        }
        await deleteFiles(fileIdsForDeletion)
      }
      return deletedMove.id
    } else {
      return null
    }
  }
}

//// Input validation ////
/**
 * All moves must always have at least TIME as a rep type.
 * Returns true if passes, throws an ApolloError if fails.
 */
function validateCreateMoveInput(
  data: CreateMoveInput,
  userType: ContextUserType,
) {
  if (data.scope === 'STANDARD' && userType !== 'ADMIN') {
    throw new ApolloError('Only ADMINS can create Official (STANDARD) moves.')
  }
  if (!data.validRepTypes) {
    throw new ApolloError(
      'No ValidRepTypes supplied: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }
  if (!data.validRepTypes.includes('TIME')) {
    throw new ApolloError(
      'ValidRepTypes does not include TIME: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }
  if (data.BodyAreaMoveScores != null && data.BodyAreaMoveScores.length > 0) {
    // Check to make sure that (if supplied) the body area move scores sum to 100.
    const totalBodyAreaScores = data.BodyAreaMoveScores.reduce(
      (acum, b) => acum + b.score,
      0,
    )
    if (totalBodyAreaScores != 100) {
      throw new ApolloError(
        `BodyAreaMoveScores must sum to a total of 100 points for any given move being created or updated. You tried to submit this move with a total of ${totalBodyAreaScores}.`,
      )
    }
  }
}

function validateUpdateMoveInput(
  data: UpdateMoveInput,
  userType: ContextUserType,
) {
  if (data.scope === 'STANDARD' && userType !== 'ADMIN') {
    throw new ApolloError('Only ADMINS can update Official (STANDARD) moves.')
  }
  if (data.validRepTypes && !data.validRepTypes.includes('TIME')) {
    throw new ApolloError(
      'ValidRepTypes does not include TIME: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }
  if (data.BodyAreaMoveScores != null && data.BodyAreaMoveScores.length > 0) {
    // Check to make sure that (if supplied) the body area move scores sum to 100.
    const totalBodyAreaScores = data.BodyAreaMoveScores.reduce(
      (acum, b) => acum + b.score,
      0,
    )
    if (totalBodyAreaScores != 100) {
      throw new ApolloError(
        `BodyAreaMoveScores must sum to a total of 100 points for any given Move being created or updated. You tried to submit this move with a total of ${totalBodyAreaScores}.`,
      )
    }
  }
}

export {
  standardMoves,
  userCustomMoves,
  createMove,
  updateMove,
  deleteMoveById,
}

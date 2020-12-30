import { WorkoutMove, WorkoutMoveRepType } from '@prisma/client'
import { ApolloError } from 'apollo-server'
import { Context } from '../..'
import {
  CreateMoveInput,
  DeepUpdateMoveInput,
  Move,
  MutationCreateMoveArgs,
  MutationDeepUpdateMoveArgs,
  MutationDeleteMoveByIdArgs,
  MutationShallowUpdateMoveArgs,
  QueryUserCustomMovesArgs,
  ShallowUpdateMoveInput,
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
  { authedUserId }: QueryUserCustomMovesArgs,
  { prisma, select }: Context,
) =>
  prisma.move.findMany({
    where: {
      createdBy: { id: authedUserId },
      scope: 'CUSTOM',
      archived: false,
    },
    select,
  })

//// Mutations ////
const createMove = async (
  r: any,
  { authedUserId, data }: MutationCreateMoveArgs,
  { prisma, select }: Context,
) => {
  return validateCreateMoveInput(data, async () =>
    prisma.move.create({
      data: {
        ...data,
        createdBy: {
          connect: { id: authedUserId },
        },
        requiredEquipments: {
          connect: data.requiredEquipments
            ? data.requiredEquipments.map((id: string) => ({ id }))
            : undefined,
        },
        selectableEquipments: {
          connect: data.selectableEquipments
            ? data.selectableEquipments.map((id: string) => ({ id }))
            : undefined,
        },
        bodyAreaMoveScores: {
          create: data.bodyAreaMoveScores
            ? data.bodyAreaMoveScores.map((bams) => ({
                bodyArea: {
                  connect: { id: bams.bodyArea },
                },
                score: bams.score,
              }))
            : undefined,
        },
      },
      select,
    }),
  )
}

const shallowUpdateMove = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateMoveArgs,
  { prisma, select }: Context,
) => {
  return validateShallowUpdateMoveInput(data, async () => {
    // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
    const fileIdsForDeletion: string[] | null = await checkMoveMediaForDeletion(
      prisma,
      data,
    )

    const updatedMove: Move = await prisma.move.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        requiredEquipments: {
          set: data.requiredEquipments
            ? data.requiredEquipments.map((id: string) => ({ id }))
            : [],
        },
        selectableEquipments: {
          set: data.selectableEquipments
            ? data.selectableEquipments.map((id: string) => ({ id }))
            : [],
        },
      },
      select,
    })

    if (updatedMove && fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updatedMove
  })
}

const deepUpdateMove = async (
  r: any,
  { authedUserId, data }: MutationDeepUpdateMoveArgs,
  { prisma, select }: Context,
) => {
  return validateDeepUpdateMoveInput(data, async () => {
    // // Delete all previous bodyAreaMoveScores - as this is a deep update.
    await prisma.bodyAreaMoveScore.deleteMany({
      where: {
        move: { id: data.id },
      },
    })

    // Check if any media files need to be updated. Only delete files from the uploadcare server after the rest of the transaction is complete.
    const fileIdsForDeletion: string[] | null = await checkMoveMediaForDeletion(
      prisma,
      data,
    )

    const updatedMove: Move = await prisma.move.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        requiredEquipments: {
          set: data.requiredEquipments
            ? data.requiredEquipments.map((id: string) => ({ id }))
            : [],
        },
        selectableEquipments: {
          set: data.selectableEquipments
            ? data.selectableEquipments.map((id: string) => ({ id }))
            : [],
        },
        bodyAreaMoveScores: {
          create: data.bodyAreaMoveScores
            ? data.bodyAreaMoveScores.map((bams) => ({
                bodyArea: {
                  connect: { id: bams.bodyArea },
                },
                score: bams.score,
              }))
            : undefined,
        },
      },
      select,
    })

    if (updatedMove && fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updatedMove
  })
}

const deleteMoveById = async (
  r: any,
  { authedUserId, moveId }: MutationDeleteMoveByIdArgs,
  { prisma }: Context,
) => {
  // Is this move part of any workoutMoves (is it part of any workouts)?
  const numWorkoutMoves: number = await prisma.workoutMove.count({
    where: {
      move: { id: moveId },
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
    })
    return archivedMove.id
  } else {
    // No - then continue with delete as below.
    // Cascade delete reliant descendants with https://paljs.com/plugins/delete/
    await prisma.onDelete({
      model: 'Move',
      where: { id: moveId },
      deleteParent: false, // If false, just the descendants will be deleted.
    })

    // Delete move and get back related uploaded media files.
    const deletedMove: Move = await prisma.move.delete({
      where: { id: moveId },
      select: {
        id: true,
        demoVideoUrl: true,
        demoVideoThumbUrl: true,
      },
    })

    // Check if there is media to be deleted from the uploadcare server.
    if (deletedMove) {
      if (deletedMove.demoVideoUrl) {
        const fileIdsForDeletion: string[] = []
        fileIdsForDeletion.push(deletedMove.demoVideoUrl)
        if (deletedMove.demoVideoThumbUrl) {
          fileIdsForDeletion.push(deletedMove.demoVideoThumbUrl)
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
async function validateCreateMoveInput(
  data: CreateMoveInput,
  resolver: () => Promise<Move>,
) {
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
  if (data.bodyAreaMoveScores != null && data.bodyAreaMoveScores.length > 0) {
    // Check to make sure that (if supplied) the body area move scores sum to 100.
    const totalBodyAreaScores = data.bodyAreaMoveScores.reduce(
      (acum, b) => acum + b.score,
      0,
    )
    if (totalBodyAreaScores != 100) {
      throw new ApolloError(
        `BodyAreaMoveScores must sum to a total of 100 points for any given move being created or updated. You tried to submit this move with a total of ${totalBodyAreaScores}.`,
      )
    }
  }

  return resolver()
}

async function validateShallowUpdateMoveInput(
  data: ShallowUpdateMoveInput,
  resolver: () => Promise<Move>,
) {
  if (data.validRepTypes && !data.validRepTypes.includes('TIME')) {
    throw new ApolloError(
      'ValidRepTypes does not include TIME: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }

  return resolver()
}

async function validateDeepUpdateMoveInput(
  data: DeepUpdateMoveInput,
  resolver: () => Promise<Move>,
) {
  if (data.validRepTypes && !data.validRepTypes.includes('TIME')) {
    throw new ApolloError(
      'ValidRepTypes does not include TIME: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }
  if (data.bodyAreaMoveScores != null && data.bodyAreaMoveScores.length > 0) {
    // Check to make sure that (if supplied) the body area move scores sum to 100.
    const totalBodyAreaScores = data.bodyAreaMoveScores.reduce(
      (acum, b) => acum + b.score,
      0,
    )
    if (totalBodyAreaScores != 100) {
      throw new ApolloError(
        `BodyAreaMoveScores must sum to a total of 100 points for any given move being created or updated. You tried to submit this move with a total of ${totalBodyAreaScores}.`,
      )
    }
  }

  return resolver()
}

export {
  standardMoves,
  userCustomMoves,
  createMove,
  shallowUpdateMove,
  deepUpdateMove,
  deleteMoveById,
}

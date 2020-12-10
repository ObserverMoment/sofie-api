import { WorkoutMoveRepType } from '@prisma/client'
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
  prisma.move.findMany({ where: { scope: 'STANDARD' }, select })

const userCustomMoves = async (
  r: any,
  { authedUserId }: QueryUserCustomMovesArgs,
  { prisma, select }: Context,
) =>
  prisma.move.findMany({
    where: { createdBy: { id: authedUserId }, scope: 'CUSTOM' },
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
  return validateUpdateMoveInput(data, async () => {
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
  return validateUpdateMoveInput(data, async () => {
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
  return resolver()
}

async function validateUpdateMoveInput(
  data: ShallowUpdateMoveInput | DeepUpdateMoveInput,
  resolver: () => Promise<Move>,
) {
  if (data.validRepTypes && !data.validRepTypes.includes('TIME')) {
    throw new ApolloError(
      'ValidRepTypes does not include TIME: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
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

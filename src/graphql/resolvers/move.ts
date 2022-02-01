import { PrismaPromise } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context, ContextUserType } from '../..'
import {
  CreateMoveInput,
  UpdateMoveInput,
  Move,
  MutationCreateMoveArgs,
  MutationUpdateMoveArgs,
  BodyAreaMoveScoreInput,
  MoveScope,
  WorkoutMoveRepType,
} from '../../generated/graphql'
import { checkMoveMediaForDeletion, deleteFiles } from '../../lib/uploadcare'
import { checkUserOwnsObject } from '../utils'

//// Queries ////
// Move scopes are 'STANDARD' or 'CUSTOM'.
export const customMoves = async (
  r: any,
  a: any,
  { authedUserId, prisma, select }: Context,
) => {
  const moves = await prisma.move.findMany({
    where: {
      User: { id: authedUserId },
      scope: 'CUSTOM',
      archived: false,
    },
    select,
  })
  return moves as Move[]
}

//// Mutations ////
export const createMove = async (
  r: any,
  { data }: MutationCreateMoveArgs,
  { authedUserId, userType, prisma, select }: Context,
) => {
  validateCreateMoveInput(data, userType)
  const move = await prisma.move.create({
    data: {
      ...data,
      User:
        userType === 'ADMIN' || !authedUserId
          ? undefined
          : {
              connect: { id: authedUserId },
            },
      MoveType: {
        connect: {
          id: data.MoveType.id,
        },
      },
      scope: data.scope || 'CUSTOM',
      RequiredEquipments: {
        connect: data.RequiredEquipments ? data.RequiredEquipments : undefined,
      },
      SelectableEquipments: {
        connect: data.SelectableEquipments
          ? data.SelectableEquipments
          : undefined,
      },
      BodyAreaMoveScores: {
        create: data.BodyAreaMoveScores
          ? data.BodyAreaMoveScores.map((bams) => ({
              BodyArea: {
                connect: { id: bams.BodyArea.id },
              },
              score: bams.score,
            }))
          : undefined,
      },
    },
    select,
  })
  return move as Move
}

export const updateMove = async (
  r: any,
  { data }: MutationUpdateMoveArgs,
  { authedUserId, userType, prisma, select }: Context,
) => {
  if (userType !== 'ADMIN') {
    await checkUserOwnsObject(data.id, 'move', authedUserId, prisma)
  }

  validateUpdateMoveInput(data, userType)

  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion: string[] | null = await checkMoveMediaForDeletion(
    prisma,
    data,
  )

  const deleteBodyAreaMovesScores = data.BodyAreaMoveScores
    ? prisma.bodyAreaMoveScore.deleteMany({
        where: {
          Move: { id: data.id },
        },
      })
    : null

  const updateMove = prisma.move.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      name: data.name || undefined,
      validRepTypes: data.validRepTypes || undefined,
      RequiredEquipments: {
        set: data.RequiredEquipments
          ? data.RequiredEquipments.map(({ id }) => ({ id }))
          : [],
      },
      MoveType: data.MoveType
        ? {
            connect: {
              id: data.MoveType.id,
            },
          }
        : undefined,
      scope: data.scope || 'CUSTOM',
      SelectableEquipments: {
        set: data.SelectableEquipments
          ? data.SelectableEquipments.map(({ id }) => ({ id }))
          : [],
      },
      BodyAreaMoveScores: {
        create: data.BodyAreaMoveScores
          ? data.BodyAreaMoveScores.map((bams) => ({
              BodyArea: {
                connect: { id: bams.BodyArea.id },
              },
              score: bams.score,
            }))
          : undefined,
      },
    },
    select,
  })

  const ops = [deleteBodyAreaMovesScores, updateMove].filter(
    (x) => !!x,
  ) as PrismaPromise<any>[]

  const [_, updatedMove] = await prisma.$transaction(ops)

  if (updatedMove) {
    if (fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updatedMove as Move
  } else {
    throw new ApolloError('updateMove: There was an issue.')
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
  validateScope(data.scope, userType)
  if (!data.validRepTypes) {
    throw new ApolloError(
      'No ValidRepTypes supplied: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }
  validateRepTypes(data.validRepTypes)
  if (data.BodyAreaMoveScores && data.BodyAreaMoveScores.length > 0) {
    validateBodyAreaMoveScoresInput(data.BodyAreaMoveScores)
  }
}

function validateUpdateMoveInput(
  data: UpdateMoveInput,
  userType: ContextUserType,
) {
  validateScope(data.scope, userType)
  if (data.validRepTypes) {
    validateRepTypes(data.validRepTypes)
  }
  if (data.BodyAreaMoveScores && data.BodyAreaMoveScores.length > 0) {
    validateBodyAreaMoveScoresInput(data.BodyAreaMoveScores)
  }
}

function validateScope(
  scope: MoveScope | null | undefined,
  userType: ContextUserType,
) {
  if (scope === 'STANDARD' && userType !== 'ADMIN') {
    throw new ApolloError('Only ADMINS can update Official (STANDARD) moves.')
  }
}

function validateRepTypes(validRepTypes: WorkoutMoveRepType[]) {
  if (!validRepTypes.includes('TIME')) {
    throw new ApolloError(
      'ValidRepTypes does not include TIME: A move must always have at least the valid rep type TIME. Please ensure that your valid rep types array includes the string "TIME" or that the array is null if you do not wish to make any changes during an update operation',
    )
  }
}

function validateBodyAreaMoveScoresInput(
  bodyAreaMoveScores: BodyAreaMoveScoreInput[],
) {
  // Check to make sure that the body area move scores sum to 100.
  const totalBodyAreaScores = bodyAreaMoveScores.reduce(
    (acum, b) => acum + b.score,
    0,
  )
  if (totalBodyAreaScores !== 100) {
    throw new ApolloError(
      `BodyAreaMoveScores must sum to a total of 100 points for any given Move being created or updated. You tried to submit this move with a total of ${totalBodyAreaScores}.`,
    )
  }
}

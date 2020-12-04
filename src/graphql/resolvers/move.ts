import { Context } from '../..'
import {
  Move,
  MutationCreateMoveArgs,
  MutationShallowUpdateMoveArgs,
  MutationUpdateMoveBodyAreaScoresArgs,
  QueryUserCustomMovesArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../uploadcare'

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
) =>
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
  })

const shallowUpdateMove = async (
  r: any,
  { authedUserId, data }: MutationShallowUpdateMoveArgs,
  { prisma, select }: Context,
) => {
  const updatedMove: Move = await prisma.move.update({
    where: {
      id: data.id,
      createdBy: { id: authedUserId },
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

  // Once update transaction is complete. Check to see if media should be deleted.
  const oldMove: Move = await prisma.move.findUnique({
    where: {
      id: data.id,
    },
    select: {
      demoVideoUrl: true,
    },
  })

  if (
    oldMove.demoVideoUrl != null &&
    data.hasOwnProperty('demoVideoUrl') &&
    data.demoVideoUrl != oldMove.demoVideoUrl
  ) {
    await deleteFiles([oldMove.demoVideoUrl])
  }

  return updatedMove
}

const updateMoveBodyAreaScores = async (
  r: any,
  { authedUserId, data }: MutationUpdateMoveBodyAreaScoresArgs,
  { prisma, select }: Context,
) => {
  // Delete all previous bodyAreaMoveScores.
  await prisma.bodyAreaMoveScores.deleteMany({
    where: {
      move: { id: data.move },
    },
  })

  // Then create all the necessary new ones and return the updated move.
  return prisma.move.update({
    where: {
      id: data.move,
      createdBy: { id: authedUserId },
    },
    data: {
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
}

export {
  standardMoves,
  userCustomMoves,
  createMove,
  shallowUpdateMove,
  updateMoveBodyAreaScores,
}

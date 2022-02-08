import { Context } from '../..'
import {
  CoreData,
  Equipment,
  MutationCreateEquipmentArgs,
  MutationUpdateEquipmentArgs,
} from '../../generated/graphql'
import { checkIsAdmin } from '../utils'

//// Queries ////
//// Run this on app load ////
export const coreData = async (r: any, a: any, { prisma }: Context) => {
  const coreData = await Promise.all([
    prisma.bodyArea.findMany(),
    prisma.equipment.findMany(),
    prisma.moveType.findMany(),
    prisma.workoutGoal.findMany(),
    prisma.workoutSectionType.findMany(),
    prisma.move.findMany({
      where: { scope: 'STANDARD' },
      include: {
        MoveType: true,
        BodyAreaMoveScores: {
          include: {
            BodyArea: true,
          },
        },
        RequiredEquipments: true,
        SelectableEquipments: true,
      },
    }),
    prisma.progressWidget.findMany(),
    prisma.logDataWidget.findMany(),
  ])

  return {
    bodyAreas: coreData[0],
    equipment: coreData[1],
    moveTypes: coreData[2],
    workoutGoals: coreData[3],
    workoutSectionTypes: coreData[4],
    standardMoves: coreData[5],
    progressWidgets: coreData[6],
    logDataWidgets: coreData[7],
  } as CoreData
}

//// ADMIN USE ONLY ////
//// Mutations ////
export const createEquipment = async (
  r: any,
  { data }: MutationCreateEquipmentArgs,
  { userType, prisma, select }: Context,
) => {
  checkIsAdmin(userType)
  const equipment = await prisma.equipment.create({ data, select })
  return equipment as Equipment
}

export const updateEquipment = async (
  r: any,
  { data }: MutationUpdateEquipmentArgs,
  { userType, prisma, select }: Context,
) => {
  checkIsAdmin(userType)
  const equipment = await prisma.equipment.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      name: data.name || undefined,
      loadAdjustable:
        data.loadAdjustable !== null ? data.loadAdjustable : undefined,
    },
    select,
  })
  return equipment as Equipment
}

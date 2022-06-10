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
  const coreData = await prisma.$transaction([
    prisma.bodyArea.findMany(),
    prisma.equipment.findMany(),
    prisma.moveType.findMany(),
    prisma.progressWidget.findMany(),
    prisma.fitnessBenchmarkCategory.findMany(),
    //// deprecated.
    prisma.workoutGoal.findMany(),
    prisma.workoutSectionType.findMany(),
  ])

  return {
    bodyAreas: coreData[0],
    equipment: coreData[1],
    moveTypes: coreData[2],
    progressWidgets: coreData[3],
    fitnessBenchmarkCategories: coreData[4],
    //// deprecated.
    workoutGoals: coreData[5],
    workoutSectionTypes: coreData[6],
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

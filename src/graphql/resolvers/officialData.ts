import { Context } from '../..'
import {
  BodyArea,
  Equipment,
  MoveType,
  MutationCreateEquipmentArgs,
  MutationUpdateEquipmentArgs,
  WorkoutGoal,
  WorkoutSectionType,
} from '../../generated/graphql'
import { checkIsAdmin } from '../utils'

export const bodyAreas = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const bodyAreas = await prisma.bodyArea.findMany({ select })
  return bodyAreas as BodyArea[]
}

export const equipments = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const equipments = await prisma.equipment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select,
  })
  return equipments as Equipment[]
}

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

export const moveTypes = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const moveTypes = await prisma.moveType.findMany({ select })
  return moveTypes as MoveType[]
}

export const workoutGoals = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const workoutGoals = await prisma.workoutGoal.findMany({ select })
  return workoutGoals as WorkoutGoal[]
}

export const workoutSectionTypes = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const workoutSectionTypes = await prisma.workoutSectionType.findMany({
    select,
  })
  return workoutSectionTypes as WorkoutSectionType[]
}

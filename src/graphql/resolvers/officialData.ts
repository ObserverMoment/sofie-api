import { Context } from '../..'
import {
  MutationCreateEquipmentArgs,
  MutationUpdateEquipmentArgs,
} from '../../generated/graphql'

const bodyAreas = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.bodyArea.findMany({ select })

const equipments = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.equipment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select,
  })

const createEquipment = async (
  r: any,
  { data }: MutationCreateEquipmentArgs,
  { prisma, select }: Context,
) => prisma.equipment.create({ data, select })

const updateEquipment = async (
  r: any,
  { data }: MutationUpdateEquipmentArgs,
  { prisma, select }: Context,
) =>
  prisma.equipment.update({
    where: {
      id: data.id,
    },
    data,
    select,
  })

const workoutGoals = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.workoutGoal.findMany({ select })

const moveTypes = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.moveType.findMany({ select })

const workoutTypes = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.workoutType.findMany({ select })

export {
  bodyAreas,
  equipments,
  createEquipment,
  updateEquipment,
  workoutGoals,
  moveTypes,
  workoutTypes,
}

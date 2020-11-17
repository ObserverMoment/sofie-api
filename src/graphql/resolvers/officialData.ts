import { Context } from '../..'

const moves = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.move.findMany({ select })

const bodyAreas = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.bodyArea.findMany({ select })

const equipments = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.equipment.findMany({ select })

const workoutGoals = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.workoutGoal.findMany({ select })

const workoutTypes = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.workoutType.findMany({ select })

export { moves, bodyAreas, equipments, workoutGoals, workoutTypes }

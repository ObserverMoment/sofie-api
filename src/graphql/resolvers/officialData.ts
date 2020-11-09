import { Context } from '../..'

const officialMoves = async (r: any, a: any, { prisma, select }: Context) =>
  prisma.move.findMany({ select })

const officialEquipments = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => prisma.equipment.findMany({ select })

const officialWorkoutGoals = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => prisma.workoutGoal.findMany({ select })

const officialWorkoutTypes = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => prisma.workoutType.findMany({ select })

export {
  officialMoves,
  officialEquipments,
  officialWorkoutGoals,
  officialWorkoutTypes,
}

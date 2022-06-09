import { Prisma } from '@prisma/client'
import { Context } from '../../..'
import { UserWorkoutSessions } from '../../../generated/graphql'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
// Logged in user only.
// Gets both created and saved workouts of all types.
export const userWorkoutSessions = async (
  r: any,
  a: any,
  { select, authedUserId, prisma }: Context,
) => {
  const data: any = {
    where: { userId: authedUserId },
    orderBy: { updatedAt: 'desc' },
    select,
  }

  const allWorkouts: any = await prisma.$transaction([
    prisma.resistanceSession.findMany(data),
    prisma.savedResistanceSession.findMany(data),
    prisma.cardioSession.findMany(data),
    prisma.savedCardioSession.findMany(data),
    prisma.amrapSession.findMany(data),
    prisma.savedAmrapSession.findMany(data),
    prisma.forTimeSession.findMany(data),
    prisma.savedForTimeSession.findMany(data),
    prisma.intervalSession.findMany(data),
    prisma.savedIntervalSession.findMany(data),
    prisma.mobilitySession.findMany(data),
    prisma.savedMobilitySession.findMany(data),
  ])

  return {
    ResistanceSessions: allWorkouts[0],
    SavedResistanceSessions: allWorkouts[1],
    CardioSessions: allWorkouts[2],
    SavedCardioSessions: allWorkouts[3],
    AmrapSessions: allWorkouts[4],
    SavedAmrapSessions: allWorkouts[5],
    ForTimeSessions: allWorkouts[6],
    SavedForTimeSessions: allWorkouts[7],
    IntervalSessions: allWorkouts[8],
    SavedIntervalSessions: allWorkouts[9],
    MobilitySessions: allWorkouts[10],
    SavedMobilitySessions: allWorkouts[11],
  }
}

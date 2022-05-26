import { Context } from '../../..'
import {
  QueryWorkoutSessionByIdArgs,
  WorkoutSession,
  WorkoutSessionSummary,
} from '../../../generated/graphql'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination

// Logged in user only. Never retrieve archived.
export const userWorkoutSessions = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const userWorkoutSessions = await prisma.workoutSession.findMany({
    where: {
      userId: authedUserId,
      archived: false,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: {
      id: true,
    },
  })

  return userWorkoutSessions as WorkoutSessionSummary[]
}

export const workoutSessionById = async (
  r: any,
  { id }: QueryWorkoutSessionByIdArgs,
  { select, prisma }: Context,
) => {
  const workoutSession = await prisma.workoutSession.findUnique({
    where: { id },
    select: {
      id: true,
    },
  })

  if (workoutSession) {
    return workoutSession as WorkoutSession
  } else {
    console.error(`workoutSessionById: Could not find a workout with id ${id}`)
    return null
  }
}

//// Mutations ////

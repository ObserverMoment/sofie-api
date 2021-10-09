import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  Club,
  MutationAddWorkoutPlanToClubArgs,
  MutationAddWorkoutToClubArgs,
  MutationRemoveWorkoutFromClubArgs,
  MutationRemoveWorkoutPlanFromClubArgs,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { checkUserIsOwnerOrAdminOfClub } from './utils'

export const addWorkoutToClub = async (
  r: any,
  { workoutId, clubId }: MutationAddWorkoutToClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(workoutId, 'workout', authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      Workouts: {
        connect: { id: workoutId },
      },
    },
    select,
  })

  if (updated) {
    return updated as Club
  } else {
    throw new ApolloError('addWorkoutToClub: There was an issue.')
  }
}

export const removeWorkoutFromClub = async (
  r: any,
  { workoutId, clubId }: MutationRemoveWorkoutFromClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(workoutId, 'workout', authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      Workouts: {
        disconnect: { id: workoutId },
      },
    },
    select,
  })

  if (updated) {
    return updated as Club
  } else {
    throw new ApolloError('removeWorkoutFromClub: There was an issue.')
  }
}

export const addWorkoutPlanToClub = async (
  r: any,
  { workoutPlanId, clubId }: MutationAddWorkoutPlanToClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(workoutPlanId, 'workoutPlan', authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      WorkoutPlans: {
        connect: { id: workoutPlanId },
      },
    },
    select,
  })

  if (updated) {
    return updated as Club
  } else {
    throw new ApolloError('addWorkoutPlanToClub: There was an issue.')
  }
}

export const removeWorkoutPlanFromClub = async (
  r: any,
  { workoutPlanId, clubId }: MutationRemoveWorkoutPlanFromClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(workoutPlanId, 'workoutPlan', authedUserId, prisma)

  const updated = await prisma.club.update({
    where: { id: clubId },
    data: {
      WorkoutPlans: {
        disconnect: { id: workoutPlanId },
      },
    },
    select,
  })

  if (updated) {
    return updated as Club
  } else {
    throw new ApolloError('removeWorkoutPlanFromClub: There was an issue.')
  }
}

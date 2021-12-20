import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  Club,
  MutationAddWorkoutPlanToClubArgs,
  MutationAddWorkoutToClubArgs,
  MutationRemoveWorkoutFromClubArgs,
  MutationRemoveWorkoutPlanFromClubArgs,
  QueryClubWorkoutPlansArgs,
  QueryClubWorkoutsArgs,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import {
  selectForWorkoutPlanSummary,
  selectForWorkoutSummary,
} from '../selectDefinitions'
import { formatWorkoutSummaries } from '../workout/utils'
import { formatWorkoutPlanSummaries } from '../workoutPlan/utils'
import { checkUserIsMemberOfClub, checkUserIsOwnerOrAdminOfClub } from './utils'

////// Queries ////////
export const clubWorkouts = async (
  r: any,
  { clubId }: QueryClubWorkoutsArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check that user is a member.
  await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: {
      Workouts: {
        select: selectForWorkoutSummary,
      },
    },
  })

  if (!club) {
    throw new ApolloError(
      `clubWorkouts: Unable to retrieve data for club ${clubId}.`,
    )
  } else {
    return formatWorkoutSummaries(club.Workouts)
  }
}

export const clubWorkoutPlans = async (
  r: any,
  { clubId }: QueryClubWorkoutPlansArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check that user is a member.
  await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: {
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (!club) {
    throw new ApolloError(
      `clubWorkoutPlans: Unable to retrieve data for club ${clubId}.`,
    )
  } else {
    return formatWorkoutPlanSummaries(club.WorkoutPlans)
  }
}

////// Mutations ///////
export const addWorkoutToClub = async (
  r: any,
  { workoutId, clubId }: MutationAddWorkoutToClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(workoutId, 'workout', authedUserId, prisma)

  const updated: any = await prisma.club.update({
    where: { id: clubId },
    data: {
      Workouts: {
        connect: { id: workoutId },
      },
    },
    select: {
      ...select,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    updated.Workouts = formatWorkoutSummaries(updated.Workouts)
    updated.WorkoutPlans = formatWorkoutPlanSummaries(updated.WorkoutPlans)
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

  const updated: any = await prisma.club.update({
    where: { id: clubId },
    data: {
      Workouts: {
        disconnect: { id: workoutId },
      },
    },
    select: {
      ...select,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    updated.Workouts = formatWorkoutSummaries(updated.Workouts)
    updated.WorkoutPlans = formatWorkoutPlanSummaries(updated.WorkoutPlans)
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

  const updated: any = await prisma.club.update({
    where: { id: clubId },
    data: {
      WorkoutPlans: {
        connect: { id: workoutPlanId },
      },
    },
    select: {
      ...select,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    updated.Workouts = formatWorkoutSummaries(updated.Workouts)
    updated.WorkoutPlans = formatWorkoutPlanSummaries(updated.WorkoutPlans)
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

  const updated: any = await prisma.club.update({
    where: { id: clubId },
    data: {
      WorkoutPlans: {
        disconnect: { id: workoutPlanId },
      },
    },
    select: {
      ...select,
      Workouts: {
        select: selectForWorkoutSummary,
      },
      WorkoutPlans: {
        select: selectForWorkoutPlanSummary,
      },
    },
  })

  if (updated) {
    updated.Workouts = formatWorkoutSummaries(updated.Workouts)
    updated.WorkoutPlans = formatWorkoutPlanSummaries(updated.WorkoutPlans)
    return updated as Club
  } else {
    throw new ApolloError('removeWorkoutPlanFromClub: There was an issue.')
  }
}

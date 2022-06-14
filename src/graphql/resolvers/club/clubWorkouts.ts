import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ClubResistanceWorkout,
  MutationAddResistanceWorkoutToClubArgs,
  MutationRemoveResistanceWorkoutFromClubArgs,
  QueryUserClubsResistanceWorkoutsArgs,
  ResistanceWorkout,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { checkUserIsOwnerOrAdminOfClub } from './utils'

////// Queries ///////
/// Retrieves (with optional pagination and filtering) all resistance sessions from all Circles in which the user is a member.
export const userClubsResistanceWorkouts = async (
  r: any,
  { cursor, take }: QueryUserClubsResistanceWorkoutsArgs,
  { select, authedUserId, prisma }: Context,
) => {
  try {
    const workoutsWithClubs: any[] = await prisma.resistanceWorkout.findMany({
      where: {
        Clubs: {
          some: { Members: { some: { id: authedUserId } } },
        },
      },
      select: {
        ...select.ResistanceWorkout.select,
        Clubs: {
          where: {
            Members: { some: { id: authedUserId } },
          },
        },
      },
      take: take ?? 50,
      orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    })

    return workoutsWithClubs.map((w) => ({
      id: w.Clubs[0].id,
      name: w.Clubs[0].name,
      coverImageUri: w.Clu[0].coverImageUri,
      ResistanceWorkout: w,
    })) as ClubResistanceWorkout[]
  } catch (e: any) {
    console.log(e)
    throw new ApolloError(e.toString())
  }
}

////// Mutations ///////
export const addResistanceWorkoutToClub = async (
  r: any,
  { workoutId, clubId }: MutationAddResistanceWorkoutToClubArgs,
  { select, authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(
    workoutId,
    'resistanceWorkout',
    authedUserId,
    prisma,
  )

  const updated = await prisma.resistanceWorkout.update({
    where: { id: workoutId },
    data: {
      Clubs: {
        connect: { id: clubId },
      },
    },
    select,
  })

  if (updated) {
    return updated as ResistanceWorkout
  } else {
    throw new ApolloError('addResistanceWorkoutToClub: There was an issue.')
  }
}

export const removeResistanceWorkoutFromClub = async (
  r: any,
  { workoutId, clubId }: MutationRemoveResistanceWorkoutFromClubArgs,
  { select, authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
  await checkUserOwnsObject(
    workoutId,
    'resistanceWorkout',
    authedUserId,
    prisma,
  )

  const updated = await prisma.resistanceWorkout.update({
    where: { id: workoutId },
    data: {
      Clubs: {
        disconnect: { id: clubId },
      },
    },
    select,
  })

  if (updated) {
    return updated as ResistanceWorkout
  } else {
    throw new ApolloError(
      'removeResistanceWorkoutFromClub: There was an issue.',
    )
  }
}

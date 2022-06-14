import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ClubResistanceWorkout,
  ClubWorkouts,
  MutationAddResistanceWorkoutToClubArgs,
  MutationRemoveResistanceWorkoutFromClubArgs,
  QueryClubWorkoutsArgs,
  QueryUserClubsResistanceWorkoutsArgs,
  ResistanceWorkout,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import { checkUserIsMemberOfClub, checkUserIsOwnerOrAdminOfClub } from './utils'

////// Queries ///////
export const clubWorkouts = async (
  r: any,
  { clubId, cursors, requestTypes, take }: QueryClubWorkoutsArgs,
  { select, authedUserId, prisma }: Context,
) => {
  try {
    await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

    const data: any = await prisma.club.findUnique({
      where: { id: clubId },
      select: {
        ResistanceWorkouts: requestTypes.resistanceWorkouts
          ? {
              take: take ?? 50,
              skip: cursors.resistanceWorkout ? 1 : 0,
              orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
              cursor: cursors.resistanceWorkout
                ? {
                    id: cursors.resistanceWorkout!,
                  }
                : undefined,
              select: select.ResistanceWorkouts.select,
            }
          : undefined,
      },
    })

    if (data) {
      return {
        ResistanceWorkouts: data.ResistanceWorkouts,
        CardioWorkouts: [],
        IntervalWorkouts: [],
        AmrapWorkouts: [],
        ForTimeWorkouts: [],
        MobilityWorkouts: [],
      } as ClubWorkouts
    } else {
      throw new ApolloError('clubWorkouts: There was an issue.')
    }
  } catch (e: any) {
    console.error(e)
    throw new ApolloError(e.toString())
  }
}

/// Retrieves (with optional pagination and filtering) all resistance sessions from all Clubs in which the user is a member.
export const userClubsResistanceWorkouts = async (
  r: any,
  { cursor, take }: QueryUserClubsResistanceWorkoutsArgs,
  { select, authedUserId, prisma }: Context,
) => {
  try {
    const workoutsWithClubs: any[] = await prisma.resistanceWorkout.findMany({
      where: {
        OR: [
          {
            Clubs: {
              some: { Owner: { id: authedUserId } },
            },
          },
          {
            Clubs: {
              some: { Admins: { some: { id: authedUserId } } },
            },
          },
          {
            Clubs: {
              some: { Members: { some: { id: authedUserId } } },
            },
          },
        ],
      },

      select: {
        ...select.ResistanceWorkout.select,
        Clubs: {
          where: {
            OR: [
              {
                Owner: { id: authedUserId },
              },
              {
                Admins: { some: { id: authedUserId } },
              },
              {
                Members: { some: { id: authedUserId } },
              },
            ],
          },
        },
      },
      take: take ?? 50,
      skip: cursor ? 1 : 0,
      orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
    })

    return workoutsWithClubs.map((w) => {
      return {
        id: w.Clubs[0].id,
        name: w.Clubs[0].name,
        coverImageUri: w.Clubs[0].coverImageUri,
        ResistanceWorkout: w,
      }
    }) as ClubResistanceWorkout[]
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

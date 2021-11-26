import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  Club,
  ClubSummary,
  MutationCreateClubArgs,
  MutationDeleteClubByIdArgs,
  MutationUpdateClubArgs,
  QueryClubByIdArgs,
  QueryClubSummariesByIdArgs,
} from '../../../generated/graphql'
import {
  createStreamClubMemberChat,
  deleteStreamClubMemberChat,
} from '../../../lib/getStream'
import { checkClubMediaForDeletion, deleteFiles } from '../../../lib/uploadcare'
import {
  formatWorkoutSummaries,
  selectForWorkoutSummary,
} from '../workout/utils'
import {
  formatWorkoutPlanSummaries,
  selectForWorkoutPlanSummary,
} from '../workoutPlan/utils'
import { checkUserIsOwnerOrAdminOfClub, ClubMemberType } from './utils'

//// Queries ////
export const userClubs = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: {
      OR: [
        { Owner: { id: authedUserId } },
        { Admins: { some: { id: authedUserId } } },
        { Members: { some: { id: authedUserId } } },
      ],
    },
    select,
  })
  return clubs as ClubSummary[]
}

// ClubFinder functionality - filtering and ranking etc.
export const publicClubs = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select,
  })
  return clubs as ClubSummary[]
}

/// Just the bare minumum data such as name and cover image.
/// Only public data should be serialized here.
export const clubSummariesById = async (
  r: any,
  { ids }: QueryClubSummariesByIdArgs,
  { select, prisma }: Context,
) => {
  const clubs = await prisma.club.findMany({
    where: { id: { in: ids } },
    select,
  })
  return clubs as ClubSummary[]
}

export const clubById = async (
  r: any,
  { id }: QueryClubByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const club: any = await prisma.club.findUnique({
    where: { id },
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

  if (!club) {
    throw new ApolloError('clubById: Could not find a club with this ID.')
  }

  const memberType: ClubMemberType =
    club!.Owner.id === authedUserId
      ? 'OWNER'
      : club!.Admins.some((a: any) => a.id === authedUserId)
      ? 'ADMIN'
      : club!.Members.some((m: any) => m.id === authedUserId)
      ? 'MEMBER'
      : 'NONE'

  if (memberType === 'OWNER' || memberType === 'ADMIN') {
    return {
      ...club,
      Workouts: formatWorkoutSummaries(club.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(club.WorkoutPlans),
    } as Club
  } else if (memberType === 'MEMBER') {
    // Exclude the membership related data.
    const clubMemberData = {
      id: club.id,
      createdAt: club.createdAt,
      Owner: club.Owner,
      Admins: club.Admins,
      Members: club.Members,
      name: club.name,
      description: club.description,
      location: club.location,
      coverImageUri: club.coverImageUri,
      introVideoUri: club.introVideoUri,
      introVideoThumbUri: club.introVideoThumbUri,
      introAudioUri: club.introAudioUri,
      contentAccessScope: club.contentAccessScope,
      Workouts: formatWorkoutSummaries(club.Workouts),
      WorkoutPlans: formatWorkoutPlanSummaries(club.WorkoutPlans),
    }

    return clubMemberData as Club
  } else {
    // Exclude all member content
    const clubNonMemberData = {
      id: club.id,
      createdAt: club.createdAt,
      Owner: club.Owner,
      Admins: club.Admins,
      Members: club.Members,
      name: club.name,
      description: club.description,
      location: club.location,
      coverImageUri: club.coverImageUri,
      introVideoUri: club.introVideoUri,
      introVideoThumbUri: club.introVideoThumbUri,
      introAudioUri: club.introAudioUri,
      contentAccessScope: club.contentAccessScope,
    }

    return clubNonMemberData as Club
  }
}

//// Mutations ////
export const createClub = async (
  r: any,
  { data }: MutationCreateClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const club = await prisma.club.create({
    data: {
      ...data,
      Owner: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (club) {
    await createStreamClubMemberChat((club as Club).id, authedUserId)
    return club as Club
  } else {
    throw new ApolloError('createClub: There was an issue.')
  }
}

export const updateClub = async (
  r: any,
  { data }: MutationUpdateClubArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(data.id, authedUserId, prisma)

  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion: string[] | null = await checkClubMediaForDeletion(
    prisma,
    data,
  )

  const updated: any = await prisma.club.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
    },
    select: {
      ...select,
      Workouts: {
        select: selectForWorkoutSummary,
      },
    },
  })

  updated.Workouts = formatWorkoutSummaries(updated.Workouts)

  if (updated) {
    if (fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updated as Club
  } else {
    throw new ApolloError('updateClub: There was an issue.')
  }
}

export const deleteClubById = async (
  r: any,
  { id }: MutationDeleteClubByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserIsOwnerOrAdminOfClub(id, authedUserId, prisma)

  const deleted = await prisma.club.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    await deleteStreamClubMemberChat(deleted.id)
    return deleted.id
  } else {
    throw new ApolloError('deleteClubById: There was an issue.')
  }
}

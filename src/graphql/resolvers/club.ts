import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  Club,
  MutationCreateClubArgs,
  MutationUpdateClubArgs,
  QueryClubByIdArgs,
} from '../../generated/graphql'
import { checkClubMediaForDeletion, deleteFiles } from '../../lib/uploadcare'
import { checkUserOwnsObject } from '../utils'

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
  return clubs as Club[]
}

export const clubById = async (
  r: any,
  { id }: QueryClubByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const club = await prisma.club.findUnique({
    where: { id },
    select,
  })
  return club as Club
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
  await checkUserOwnsObject(data.id, 'club', authedUserId, prisma)

  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion: string[] | null = await checkClubMediaForDeletion(
    prisma,
    data,
  )

  const updated = await prisma.club.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (updated) {
    if (fileIdsForDeletion) {
      await deleteFiles(fileIdsForDeletion)
    }
    return updated as Club
  } else {
    throw new ApolloError('updateClub: There was an issue.')
  }
}

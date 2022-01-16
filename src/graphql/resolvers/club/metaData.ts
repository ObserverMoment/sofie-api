import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ClubMetaData,
  ClubWithMetaData,
  MutationUpdateClubMetaDataArgs,
  QueryAdminPublicWorkoutPlansArgs,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicClubs = async (
  r: any,
  { status }: QueryAdminPublicWorkoutPlansArgs,
  { prisma, select }: Context,
) => {
  const publicClubs = await prisma.club.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      validated: status,
    },
    take: 10,
    orderBy: {
      id: 'desc',
    },
    select,
  })

  return publicClubs as ClubWithMetaData[]
}

export const updateClubMetaData = async (
  r: any,
  { data }: MutationUpdateClubMetaDataArgs,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError()
  }

  const updated = await prisma.club.update({
    where: { id: data.id },
    data: {
      ...data,
      validated: data.validated || undefined,
      metaTags: data.metaTags || undefined,
    },
    select: {
      id: true,
      validated: true,
      metaTags: true,
      reasonNotValidated: true,
    },
  })

  if (updated) {
    return updated as ClubMetaData
  } else {
    throw new ApolloError('updateClubMetaData: There was an issue.')
  }
}

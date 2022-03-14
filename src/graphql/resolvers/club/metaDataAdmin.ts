import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ClubWithMetaDataAdmin,
  MutationUpdateClubMetaDataAdminArgs,
  PublicClubSummaryAdmin,
  QueryAdminPublicClubByIdArgs,
  QueryAdminPublicClubsCountArgs,
  QueryAdminPublicClubSummariesArgs,
} from '../../../generated/graphql'
import { AccessScopeError } from '../../utils'

//// NOTE: Admin Only Access to these resolvers ////

//// Queries ////
export const adminPublicClubsCount = async (
  r: any,
  { status }: QueryAdminPublicClubsCountArgs,
  { prisma, userType }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const count = await prisma.club.count({
    where: {
      contentAccessScope: 'PUBLIC',
      validated: status,
    },
  })

  return count
}

/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const adminPublicClubSummaries = async (
  r: any,
  { status }: QueryAdminPublicClubSummariesArgs,
  { prisma, userType, select }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const publicClubs = await prisma.club.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      validated: status,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select,
  })

  return publicClubs as PublicClubSummaryAdmin[]
}

export const adminPublicClubById = async (
  r: any,
  { id }: QueryAdminPublicClubByIdArgs,
  { prisma, userType, select }: Context,
) => {
  if (userType !== 'ADMIN') {
    throw new AccessScopeError('Only admins can access this data')
  }

  const club = await prisma.club.findUnique({
    where: {
      id,
    },
    select,
  })

  return club as ClubWithMetaDataAdmin
}

export const updateClubMetaDataAdmin = async (
  r: any,
  { data }: MutationUpdateClubMetaDataAdminArgs,
  { prisma, select, userType }: Context,
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
    select,
  })

  if (updated) {
    return updated as ClubWithMetaDataAdmin
  } else {
    throw new ApolloError('updateClubMetaDataAdmin: There was an issue.')
  }
}

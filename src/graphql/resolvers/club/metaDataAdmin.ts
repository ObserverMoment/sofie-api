import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ClubWithMetaDataAdmin,
  MutationUpdateClubMetaDataAdminArgs,
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

  return publicClubs as ClubWithMetaDataAdmin[]
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

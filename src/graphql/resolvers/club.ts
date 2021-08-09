import { Context } from '../..'
import { Club, QueryClubByIdArgs } from '../../generated/graphql'

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

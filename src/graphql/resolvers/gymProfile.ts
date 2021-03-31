import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  GymProfile,
  MutationCreateGymProfileArgs,
  MutationDeleteGymProfileByIdArgs,
  MutationUpdateGymProfileArgs,
} from '../../generated/graphql'
import { checkUserOwnsObject } from '../utils'

// The authed users' gym profiles.
export const gymProfiles = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const gymProfiles = await prisma.gymProfile.findMany({
    where: { userId: authedUserId },
    select,
  })
  return gymProfiles as GymProfile[]
}

export const createGymProfile = async (
  r: any,
  { data }: MutationCreateGymProfileArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const gymProfile = await prisma.gymProfile.create({
    data: {
      ...data,
      Equipments: {
        connect: data.Equipments
          ? data.Equipments.map((id: string) => ({ id }))
          : undefined,
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (gymProfile) {
    return gymProfile as GymProfile
  } else {
    throw new ApolloError('createGymProfile: There was an issue.')
  }
}

export const updateGymProfile = async (
  r: any,
  { data }: MutationUpdateGymProfileArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'gymProfile', authedUserId, prisma)
  const updated = await prisma.gymProfile.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      Equipments: {
        set: data.Equipments
          ? data.Equipments.map((id: string) => ({ id }))
          : undefined,
      },
    },
    select,
  })

  if (updated) {
    return updated as GymProfile
  } else {
    throw new ApolloError('updateGymProfile: There was an issue.')
  }
}

export const deleteGymProfileById = async (
  r: any,
  { id }: MutationDeleteGymProfileByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'gymProfile', authedUserId, prisma)
  const deleted = await prisma.gymProfile.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteGymProfileById: There was an issue.')
  }
}

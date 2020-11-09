import { Context } from '../..'
import {
  MutationCreateGymProfileArgs,
  MutationCreateUserArgs,
  MutationDeleteGymProfileByIdArgs,
  MutationUpdateGymProfileArgs,
  MutationUpdateUserArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryUserByUidArgs,
} from '../../generated/graphql'

//// Queries ////
const checkUniqueDisplayName = async (
  r: any,
  { displayName }: QueryCheckUniqueDisplayNameArgs,
  { prisma }: Context,
) => {
  const user = await prisma.user.findOne({
    where: { displayName },
  })
  return user == null
}

const userByUid = async (
  r: any,
  { uid }: QueryUserByUidArgs,
  { select, prisma }: Context,
) =>
  prisma.user.findOne({
    where: { firebaseUid: uid },
    select,
  })

//// Mutations ////
const createUser = async (
  r: any,
  { uid }: MutationCreateUserArgs,
  { select, prisma }: Context,
) => {
  return prisma.user.create({
    data: {
      firebaseUid: uid,
    },
    select,
  })
}

const updateUser = async (
  r: any,
  { id, data }: MutationUpdateUserArgs,
  { select, prisma }: Context,
) =>
  prisma.user.update({
    where: { id },
    data,
    select,
  })

const createGymProfile = async (
  r: any,
  { authedUserId, data }: MutationCreateGymProfileArgs,
  { select, prisma }: Context,
) =>
  prisma.gymProfile.create({
    data: {
      ...data,
      availableEquipments: {
        connect: data.availableEquipments
          ? data.availableEquipments.map((id: string) => ({ id }))
          : [],
      },
      user: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

const updateGymProfile = async (
  r: any,
  { authedUserId, data }: MutationUpdateGymProfileArgs,
  { select, prisma }: Context,
) =>
  prisma.gymProfile.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      availableEquipments: {
        set: data.availableEquipments
          ? data.availableEquipments.map((id: string) => ({ id }))
          : [],
      },
    },
    select,
  })

const deleteGymProfileById = async (
  r: any,
  { authedUserId, gymProfileId }: MutationDeleteGymProfileByIdArgs,
  { prisma }: Context,
) => {
  const { id } = await prisma.gymProfile.delete({
    where: {
      id: gymProfileId,
    },
  })
  return id
}

export {
  checkUniqueDisplayName,
  userByUid,
  createUser,
  updateUser,
  createGymProfile,
  updateGymProfile,
  deleteGymProfileById,
}

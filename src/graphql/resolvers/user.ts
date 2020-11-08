import { LikedWorkout } from '@prisma/client'
import {
  MutationCreateGymProfileArgs,
  MutationCreateUserArgs,
  MutationDeleteGymProfileArgs,
  MutationUpdateGymProfileArgs,
  MutationUpdateUserArgs,
  QueryCheckUniqueDisplayNameArgs,
  QueryLikedWorkoutsArgs,
  QueryScheduledWorkoutsArgs,
  QueryUserByUidArgs,
} from '../../generated/graphql'
import { Context } from '../../types'

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

const likedWorkouts = async (
  r: any,
  { authedUserId }: QueryLikedWorkoutsArgs,
  { prisma }: Context,
) => {
  const likedWorkouts: LikedWorkout[] = await prisma.likedWorkout.findMany({
    where: {
      user: { id: authedUserId },
    },
  })
  return likedWorkouts.map(
    (likedWorkout: LikedWorkout) => likedWorkout.workoutId,
  )
}

const scheduledWorkouts = async (
  r: any,
  { authedUserId }: QueryScheduledWorkoutsArgs,
  { select, prisma }: Context,
) =>
  prisma.scheduledWorkout.findMany({
    where: {
      user: { id: authedUserId },
    },
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

const deleteGymProfile = async (
  r: any,
  { authedUserId, gymProfileId }: MutationDeleteGymProfileArgs,
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
  likedWorkouts,
  scheduledWorkouts,
  userByUid,
  createUser,
  updateUser,
  createGymProfile,
  updateGymProfile,
  deleteGymProfile,
}

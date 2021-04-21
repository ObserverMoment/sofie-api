import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutArgs,
  MutationMakeCopyWorkoutByIdArgs,
  MutationSoftDeleteWorkoutByIdArgs,
  MutationUpdateWorkoutArgs,
  QueryWorkoutByIdArgs,
  Workout,
  WorkoutSummary,
} from '../../../generated/graphql'
import { AccessScopeError, checkUserOwnsObject } from '../../utils'
import {
  checkWorkoutMediaForDeletion,
  deleteFiles,
} from '../../../uploadcare/index'
import { Prisma } from '@prisma/client'

//// Queries ////
export const officialWorkouts = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const officialWorkouts = await prisma.workout.findMany({
    where: { contentAccessScope: 'OFFICIAL' },
    select,
  })
  return officialWorkouts as WorkoutSummary[]
}

export const publicWorkouts = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const publicWorkouts = await prisma.workout.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select,
  })
  return publicWorkouts as WorkoutSummary[]
}

// All user workouts, both public and private
export const userWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userWorkouts = await prisma.workout.findMany({
    where: { userId: authedUserId },
    select,
  })
  return userWorkouts as WorkoutSummary[]
}

export const workoutById = async (
  r: any,
  { id }: QueryWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workout: any = await prisma.workout.findUnique({
    where: { id },
    select: {
      ...select,
      contentAccessScope: true,
      userId: true,
    },
  })

  if (workout) {
    // Check that the user has access. Will need to add a group check here as well once groups are implemented.
    if ((workout as any).contentAccessScope === 'PRIVATE') {
      if ((workout as any).userId !== authedUserId) {
        throw new AccessScopeError()
      }
    }
    return workout as Workout
  } else {
    throw new ApolloError('workoutProgramById: There was an issue.')
  }
}

//// Mutations ////
export const createWorkout = async (
  r: any,
  { data }: MutationCreateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workout = await prisma.workout.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (workout) {
    return workout as Workout
  } else {
    throw new ApolloError('createWorkout: There was an issue.')
  }
}

export const updateWorkout = async (
  r: any,
  { data }: MutationUpdateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workout', authedUserId, prisma)
  const mediaFileUrisForDeletion: string[] = await checkWorkoutMediaForDeletion(
    prisma,
    data,
  )

  const updated = await prisma.workout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      difficultyLevel: data.difficultyLevel || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
      // Note: You should not pass 'null' to a relationship field. It will be parsed as 'no input' and ignored.
      // To remove all related items of this type pass an empty array.
      // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records
      WorkoutGoals: {
        set: data.WorkoutGoals
          ? data.WorkoutGoals.map(({ id }) => ({ id }))
          : undefined,
      },
      WorkoutTags: {
        set: data.WorkoutTags
          ? data.WorkoutTags.map(({ id }) => ({ id }))
          : undefined,
      },
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as Workout
  } else {
    throw new ApolloError('updateWorkout: There was an issue.')
  }
}

export const softDeleteWorkoutById = async (
  r: any,
  { id }: MutationSoftDeleteWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workout', authedUserId, prisma)

  const archived = await prisma.workout.update({
    where: { id },
    data: { archived: true },
    select: { id: true },
  })

  if (archived) {
    return archived.id
  } else {
    throw new ApolloError('softDeleteWorkoutById: There was an issue.')
  }
}

// Makes a full copy of the workout and returns it.
// Adds '- copy' to the name.
export const makeCopyWorkoutById = async (
  r: any,
  { id }: MutationMakeCopyWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Get original workout full data
  const original = await prisma.workout.findUnique({
    where: { id },
    include: {
      WorkoutGoals: true,
      WorkoutTags: true,
      WorkoutSections: {
        include: {
          WorkoutSets: {
            include: {
              Generators: true,
              WorkoutMoves: true,
              IntervalBuyIn: {
                include: {
                  WorkoutMove: true,
                },
              },
            },
          },
        },
      },
    },
  })

  // Check that the user has auth to make a copy
  if (!original) {
    throw new ApolloError(
      'makeCopyWorkoutById: Could not retrieve data for this workout.',
    )
  }
  // Check that the user has access. Will need to add a group check here as well once groups are implemented.
  if (original.contentAccessScope === 'PRIVATE') {
    if (original.userId !== authedUserId) {
      throw new AccessScopeError()
    }
  }
  // Create a new copy.
  const copy = await prisma.workout.create({
    data: {
      ...original,
      name: `${original.name} - copy`,
      createdAt: undefined,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutGoals: {
        connect: original.WorkoutGoals.map(({ id }) => ({ id })),
      },
      WorkoutTags: {
        connect: original.WorkoutTags.map(({ id }) => ({ id })),
      },
      WorkoutSections: {
        create: original.WorkoutSections.map((section) => ({
          ...section,
          createdAt: undefined,
          User: {
            connect: { id: authedUserId },
          },
          WorkoutSectionType: {
            connect: { id: section.workoutSectionTypeId },
          },
          WorkoutSets: {
            create: section.WorkoutSets.map((set) => ({
              ...set,
              createdAt: undefined,
              User: {
                connect: { id: authedUserId },
              },
              Generators: {
                create: set.Generators.map((gen) => ({
                  ...gen,
                })),
              },
              IntervalBuyIn: set.IntervalBuyIn
                ? {
                    create: {
                      ...set.IntervalBuyIn,
                      createdAt: undefined,
                      User: {
                        connect: { id: authedUserId },
                      },
                      WorkoutMove: {
                        create: {
                          ...set.IntervalBuyIn.WorkoutMove,
                          createdAt: undefined,
                          User: {
                            connect: { id: authedUserId },
                          },
                          Move: {
                            connect: {
                              id: set.IntervalBuyIn.WorkoutMove.moveId,
                            },
                          },
                          Equipment: {
                            connect: {
                              id: set.IntervalBuyIn.WorkoutMove.equipmentId
                                ? set.IntervalBuyIn.WorkoutMove.equipmentId
                                : undefined,
                            },
                          },
                        },
                      },
                    },
                  }
                : undefined,
              WorkoutMoves: {
                create: set.WorkoutMoves.map((workoutMove) => ({
                  ...workoutMove,
                  createdAt: undefined,
                  User: {
                    connect: { id: authedUserId },
                  },
                  Move: {
                    connect: { id: workoutMove.moveId },
                  },
                  Equipment: {
                    connect: {
                      id: workoutMove.equipmentId
                        ? workoutMove.equipmentId
                        : undefined,
                    },
                  },
                })),
              },
            })),
          },
        })),
      },
    } as Prisma.WorkoutCreateInput,
    select,
  })

  if (copy) {
    return copy as Workout
  } else {
    throw new ApolloError('makeCopyWorkoutById: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutArgs,
  MutationMakeCopyWorkoutByIdArgs,
  MutationSoftDeleteWorkoutByIdArgs,
  MutationUpdateWorkoutArgs,
  QueryWorkoutByIdArgs,
  Workout,
} from '../../../generated/graphql'
import { AccessScopeError, checkUserOwnsObject } from '../../utils'
import {
  checkWorkoutMediaForDeletion,
  deleteFiles,
} from '../../../uploadcare/index'
import { Prisma } from '@prisma/client'

//// Queries ////
export const publicWorkouts = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const publicWorkouts = await prisma.workout.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select,
  })
  return publicWorkouts as Workout[]
}

// All user workouts, both public and private, but not archived.
export const userWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userWorkouts = await prisma.workout.findMany({
    where: { userId: authedUserId, archived: false },
    select,
  })
  return userWorkouts as Workout[]
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
    if (workout.contentAccessScope === 'PRIVATE') {
      if (workout.userId !== authedUserId) {
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
      archived: data.archived != null ? data.archived : undefined,
      name: data.name || undefined,
      difficultyLevel: data.difficultyLevel || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
      // Note: You should not pass 'null' to a relationship field. It will be parsed as 'no input' and ignored.
      // To remove all related items of this type pass an empty array.
      // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records
      WorkoutGoals: {
        set: data.WorkoutGoals ? data.WorkoutGoals : undefined,
      },
      WorkoutTags: {
        set: data.WorkoutTags ? data.WorkoutTags : undefined,
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
// Does not copy across any media.
export const duplicateWorkoutById = async (
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
  // Create a new copy. Do not copy across the media and adjust the name.
  const copy = await prisma.workout.create({
    data: {
      name: `${original.name} - copy`,
      description: original.description,
      difficultyLevel: original.difficultyLevel,
      contentAccessScope: 'PRIVATE',
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
          name: section.name,
          note: section.note,
          rounds: section.rounds,
          timecap: section.timecap,
          sortPosition: section.sortPosition,
          User: {
            connect: { id: authedUserId },
          },
          WorkoutSectionType: {
            connect: { id: section.workoutSectionTypeId },
          },
          WorkoutSets: {
            create: section.WorkoutSets.map((set) => ({
              sortPosition: set.sortPosition,
              rounds: set.rounds,
              duration: set.duration,
              Generators: {
                create: set.Generators.map((g) => ({
                  type: g.type,
                  target: g.target,
                  workoutMoveIndex: g.workoutMoveIndex,
                  roundFrequency: g.roundFrequency,
                  adjustAmount: g.adjustAmount,
                  User: {
                    connect: { id: authedUserId },
                  },
                })),
              },
              User: {
                connect: { id: authedUserId },
              },
              IntervalBuyIn: set.IntervalBuyIn
                ? {
                    create: {
                      interval: set.IntervalBuyIn.interval,
                      WorkoutMove: {
                        connect: { id: set.IntervalBuyIn.workoutMoveId },
                      },
                    },
                  }
                : undefined,
              WorkoutMoves: {
                create: set.WorkoutMoves.map((workoutMove) => ({
                  sortPosition: workoutMove.sortPosition,
                  reps: workoutMove.reps,
                  repType: workoutMove.repType,
                  distanceUnit: workoutMove.distanceUnit,
                  loadAmount: workoutMove.loadAmount,
                  loadUnit: workoutMove.loadUnit,
                  timeUnit: workoutMove.timeUnit,
                  User: {
                    connect: { id: authedUserId },
                  },
                  Move: {
                    connect: { id: workoutMove.moveId },
                  },
                  Equipment: workoutMove.equipmentId
                    ? {
                        connect: {
                          id: workoutMove.equipmentId,
                        },
                      }
                    : undefined,
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
    throw new ApolloError('duplicateWorkoutById: There was an issue.')
  }
}

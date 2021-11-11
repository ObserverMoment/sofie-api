import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutArgs,
  MutationMakeCopyWorkoutByIdArgs,
  MutationUpdateWorkoutArgs,
  QueryPublicWorkoutsArgs,
  QueryWorkoutByIdArgs,
  Workout,
} from '../../../generated/graphql'
import { checkUserOwnsObject } from '../../utils'
import {
  checkWorkoutMediaForDeletion,
  deleteFiles,
} from '../../../lib/uploadcare'
import { Prisma } from '@prisma/client'
import {
  formatWorkoutFiltersInput,
  formatWorkoutSectionFiltersInput,
  updateWorkoutMetaData,
} from './utils'
import { WorkoutFullData } from '../../../types'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const publicWorkouts = async (
  r: any,
  { filters, take, cursor }: QueryPublicWorkoutsArgs,
  { select, prisma }: Context,
) => {
  const publicWorkouts = await prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
      archived: false,
      AND: filters ? formatWorkoutFiltersInput(filters) : [],
      WorkoutSections: filters
        ? formatWorkoutSectionFiltersInput(filters)
        : undefined,
    },
    take: take ?? 50,
    skip: cursor ? 1 : 0,
    orderBy: {
      id: 'desc',
    },
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
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
    orderBy: {
      id: 'desc',
    },
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
    return workout as Workout
  } else {
    throw new ApolloError('workoutById: There was an issue.')
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
    await updateWorkoutMetaData(prisma, (workout as Workout).id)
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
      WorkoutGoals: data.hasOwnProperty('WorkoutGoals')
        ? {
            set: data.WorkoutGoals !== null ? data.WorkoutGoals : undefined,
          }
        : undefined,
      WorkoutTags: data.hasOwnProperty('WorkoutTags')
        ? {
            set: data.WorkoutTags !== null ? data.WorkoutTags : undefined,
          }
        : undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    if (data.hasOwnProperty('WorkoutGoals')) {
      await updateWorkoutMetaData(prisma, (updated as Workout).id)
    }
    return updated as Workout
  } else {
    throw new ApolloError('updateWorkout: There was an issue.')
  }
}

// Makes a full copy of the workout and returns it.
// Adds '- copy' to the name.
// Does not copy across any media.
// Functionality is only available on workouts that the user owns.
export const duplicateWorkoutById = async (
  r: any,
  { id }: MutationMakeCopyWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workout', authedUserId, prisma)

  // Get original workout full data
  const original: WorkoutFullData | null = await prisma.workout.findUnique({
    where: { id },
    include: {
      WorkoutGoals: true,
      WorkoutTags: true,
      WorkoutSections: {
        include: {
          WorkoutSectionType: true,
          WorkoutSets: {
            include: {
              WorkoutMoves: {
                include: {
                  Move: true,
                  Equipment: true,
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

  // Create a new copy. Do not copy across the media and adjust the name.
  const copy = await prisma.workout.create({
    data: {
      name: `${original.name} - copy`,
      description: original.description,
      difficultyLevel: original.difficultyLevel,
      contentAccessScope: 'PRIVATE',
      metaData: original.metaData,
      lengthMinutes: original.lengthMinutes,
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
              User: {
                connect: { id: authedUserId },
              },
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

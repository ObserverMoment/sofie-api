import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutArgs,
  MutationMakeCopyWorkoutByIdArgs,
  MutationUpdateWorkoutArgs,
  QueryPublicWorkoutsArgs,
  QueryUserPublicWorkoutsArgs,
  QueryWorkoutByIdArgs,
  Workout,
  WorkoutSummary,
} from '../../../generated/graphql'
import { addObjectToUserRecentlyViewed, checkUserOwnsObject } from '../../utils'
import {
  checkWorkoutMediaForDeletion,
  deleteFiles,
} from '../../../lib/uploadcare'
import { Prisma, PublicContentValidationStatus } from '@prisma/client'
import {
  formatWorkoutFiltersInput,
  formatWorkoutSectionFiltersInput,
  updateWorkoutMetaData,
  formatWorkoutSummaries,
} from './utils'
import { WorkoutFullDataPayload } from '../../../types'
import { selectForWorkoutSummary } from '../selectDefinitions'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export const publicWorkouts = async (
  r: any,
  { filters, take, cursor }: QueryPublicWorkoutsArgs,
  { prisma }: Context,
) => {
  const publicWorkouts = await prisma.workout.findMany({
    where: {
      validated: PublicContentValidationStatus.VALID,
      contentAccessScope: 'PUBLIC',
      archived: false,
      AND: filters ? formatWorkoutFiltersInput(filters) : [],
      WorkoutSections: filters
        ? formatWorkoutSectionFiltersInput(filters)
        : undefined,
    },
    take: take ?? 50,
    skip: cursor ? 1 : 0,
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    select: selectForWorkoutSummary,
  })

  return formatWorkoutSummaries(publicWorkouts) as WorkoutSummary[]
}

// All user created workouts by user ID. If user is the logged in user, then get all,
// Otherwise just get public. Never get archived.
export const userWorkouts = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const userWorkouts = await prisma.workout.findMany({
    where: {
      userId: authedUserId,
      archived: false,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: selectForWorkoutSummary,
  })

  console.log(userWorkouts)

  return formatWorkoutSummaries(userWorkouts) as WorkoutSummary[]
}

export const userPublicWorkouts = async (
  r: any,
  { userId }: QueryUserPublicWorkoutsArgs,
  { prisma }: Context,
) => {
  const userWorkouts = await prisma.workout.findMany({
    where: {
      userId: userId,
      archived: false,
      contentAccessScope: 'PUBLIC',
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: selectForWorkoutSummary,
  })

  return formatWorkoutSummaries(userWorkouts) as WorkoutSummary[]
}

export const workoutById = async (
  r: any,
  { id }: QueryWorkoutByIdArgs,
  { select, prisma }: Context,
) => {
  const workout: any = await prisma.workout.findUnique({
    where: { id },
    select,
  })

  if (workout) {
    return workout as Workout
  } else {
    console.error(`workoutById: Could not find a workout with id ${id}`)
    return null
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
    await addObjectToUserRecentlyViewed(
      'createWorkout',
      { id: (workout as Workout).id },
      authedUserId,
      prisma,
    )
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
  const original: WorkoutFullDataPayload | null =
    await prisma.workout.findUnique({
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

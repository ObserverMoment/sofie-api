import {
  CreateAmrapWorkoutSectionInput,
  CreateLastStandingWorkoutSectionInput,
  CreateTrainingWorkoutSectionInput,
  CreateWorkoutSectionInput,
  MutationCreateWorkoutArgs,
  MutationDeleteWorkoutByIdArgs,
  MutationDeleteWorkoutSectionsByIdArgs,
  MutationUpdateWorkoutSectionsArgs,
  QueryWorkoutByIdArgs,
  UpdateWorkoutSectionInput,
  Workout,
} from '../../generated/graphql'

import { buildWorkoutSectionsData } from '../workoutBuilders'

import { Context } from '../..'
import { ApolloError } from 'apollo-server'
import { AccessScopeError, checkUserAccessScope } from '../utils'

// DB Ids for the different workout section types.
const sectionSubTypes: { [key: string]: string[] } = {
  TrainingWorkoutSection: ['0', '1', '3', '4', '5'],
  AmrapWorkoutSection: ['2'],
  LastStandingWorkoutSection: ['6'],
}

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
  return officialWorkouts as Workout[]
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
  return publicWorkouts as Workout[]
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
  return userWorkouts as Workout[]
}

export const workoutById = async (
  r: any,
  { id }: QueryWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workout = await prisma.workout.findUnique({
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
  validateCreateWorkoutSectionsInput(data.WorkoutSections)
  return prisma.workout.create({
    data: {
      ...data,
      WorkoutGoals: {
        connect: data.WorkoutGoals
          ? data.WorkoutGoals.map((id) => ({ id }))
          : undefined,
      },
      WorkoutSections: {
        create: buildWorkoutSectionsData(data.WorkoutSections),
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })
}

export const softDeleteWorkoutById = async (
  r: any,
  { id }: MutationDeleteWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserAccessScope(id, 'workout', authedUserId, prisma)
  // Get all media file uris from descendants
  const archived = await prisma.workout.update({
    where: { id },
    data: { archived: true },
  })

  if (archived) {
    return archived.id
  } else {
    throw new ApolloError('softDeleteWorkoutById: There was an issue.')
  }
}

/// If you are sending any workout sub section data then you must also send WorkoutSectionType - otherwise this will throw.
export const updateWorkoutSection = async (
  r: any,
  { data }: MutationUpdateWorkoutSectionsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  validateUpdateWorkoutSectionsInput(data)
  return (prisma as Prisma).$transaction
  return prisma.workoutSection.updateMany({
    where: {
      id: { in: [] },
    },
  })
}

export const deleteWorkoutSectionById = async (
  r: any,
  { workoutSectionIds }: MutationDeleteWorkoutSectionsByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {}

//// Input validation ////
/**
 * Workout Sections Input Validation
 */
export type AnyWorkoutSectionInput =
  | CreateTrainingWorkoutSectionInput
  | CreateAmrapWorkoutSectionInput
  | CreateLastStandingWorkoutSectionInput

function checkSubTypesProvided(
  section: CreateWorkoutSectionInput | UpdateWorkoutSectionInput,
): [number, string | null] {
  let subTypeKey: string | null = null
  const numSubTypesProvided: number = Object.keys(sectionSubTypes).reduce(
    (acum, type) => {
      if ((section as any)[type]) {
        if (
          section.WorkoutSectionType &&
          sectionSubTypes[type].includes(section.WorkoutSectionType)
        ) {
          // The workoutSectionType matches the section sub data provided.
          subTypeKey = type
        } else {
          throw new ApolloError(
            'validateWorkoutSectionsInput: The workout section type does not match the section sub types, or you have not provided the workoutSectionType field when you have provided a workout section sub type field.',
          )
        }
        return acum++
      } else {
        return acum
      }
    },
    0,
  )
  return [numSubTypesProvided, subTypeKey]
}

function workoutMovesDataHasError(
  section: CreateWorkoutSectionInput | UpdateWorkoutSectionInput,
): boolean {
  return (
    !section.WorkoutSets ||
    section.WorkoutSets.some((set) =>
      set.WorkoutMoves.some(
        (workoutMove) =>
          (workoutMove.repType === 'DISTANCE' && !workoutMove.distanceUnit) ||
          (workoutMove.loadAmount && !workoutMove.loadUnit),
      ),
    )
  )
}

function validateCreateWorkoutSectionsInput(data: CreateWorkoutSectionInput[]) {
  // Check that only one section subtype is being provided and that it matches the provided workoutType.
  // Similar to this check for exclusive-belongs-to pattern.
  // https://hashrocket.com/blog/posts/modeling-polymorphic-associations-in-a-relational-database
  for (let section of data) {
    const [numSubTypesProvided, subTypeKey] = checkSubTypesProvided(section)

    if (numSubTypesProvided > 1) {
      throw new ApolloError(
        'validateCreateWorkoutSectionsInput: One (or zero) "section subtype" data object exactly per section must be provided when updating. You have provided more than one.',
      )
    }
    if (numSubTypesProvided !== 1) {
      throw new ApolloError(
        'validateCreateWorkoutSectionsInput: One "section subtype" data object exactly per section must be provided when creating',
      )
    }
    if (!subTypeKey) {
      throw new ApolloError(
        'validateCreateWorkoutSectionsInput: Could not validate the section subtype against the workoutSectionType provided. One "section subtype" data object exactly per section must be provided, as well as the workoutSectionType, and they must match.',
      )
    }
    if (workoutMovesDataHasError(section)) {
      throw new ApolloError(
        'validateCreateWorkoutSectionsInput: Invalid WorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
      )
    }
  }
}

function validateUpdateWorkoutSectionsInput(data: UpdateWorkoutSectionInput[]) {
  // Check that only one section subtype is being provided and that it matches the provided workoutType.
  // Similar to this check for exclusive-belongs-to pattern.
  // https://hashrocket.com/blog/posts/modeling-polymorphic-associations-in-a-relational-database
  for (let section of data) {
    const [numSubTypesProvided, subTypeKey] = checkSubTypesProvided(section)
    if (numSubTypesProvided == 0) {
      // Make sure they have not passed a workoutsectionType update - these muct always be passed together.
      if (section.WorkoutSectionType) {
        throw new ApolloError(
          'validateUpdateWorkoutSectionsInput: If you provide a workoutSectionType then you must also provide some workout section subtype data.',
        )
      }
    } else {
      if (numSubTypesProvided !== 1) {
        throw new ApolloError(
          'validateUpdateWorkoutSectionsInput: One "section subtype" data object exactly per section must be provided',
        )
      }
      if (!subTypeKey) {
        throw new ApolloError(
          'validateUpdateWorkoutSectionsInput: Could not validate the section subtype data. One "section subtype" data object exactly per section must be provided and it must match the workoutSectionType.',
        )
      }
    }

    if (section.WorkoutSets) {
      if (workoutMovesDataHasError(section)) {
        throw new ApolloError(
          'validateUpdateWorkoutSectionsInput: Invalid WorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
        )
      }
    }
  }
}

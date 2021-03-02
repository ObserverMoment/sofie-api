import {
  CreateAmrapWorkoutSectionInput,
  CreateLastStandingWorkoutSectionInput,
  CreateTrainingWorkoutSectionInput,
  CreateWorkoutSectionInput,
  MutationCreateWorkoutArgs,
  MutationDeleteWorkoutByIdArgs,
  MutationDeleteWorkoutSectionsByIdArgs,
  MutationShallowUpdateWorkoutArgs,
  MutationUpdateWorkoutSectionsArgs,
  QueryWorkoutByIdArgs,
  UpdateWorkoutSectionInput,
} from '../../generated/graphql'

import { buildWorkoutSectionsData } from '../workoutBuilders'

import { checkWorkoutMediaForDeletion, deleteFiles } from '../../uploadcare'

import { Context } from '../..'
import { ApolloError } from 'apollo-server'

// DB Ids for the different workout section types.
const sectionSubTypes: { [key: string]: string[] } = {
  TrainingWorkoutSection: ['0', '1', '3', '4', '5'],
  AmrapWorkoutSection: ['2'],
  LastStandingWorkoutSection: ['6'],
}

//// Queries ////
const officialWorkouts = async (r: any, a: any, { select, prisma }: Context) =>
  prisma.workout.findMany({
    where: { contentAccessScope: 'OFFICIAL' },
    select,
  })

const publicWorkouts = async (r: any, a: any, { select, prisma }: Context) =>
  prisma.workout.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select,
  })

// All user workouts, both public and private
const userWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.workout.findMany({
    where: { userId: authedUserId },
    select,
  })

const workoutById = async (
  r: any,
  { workoutId }: QueryWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workout: any = await prisma.workout.findFirst({
    where: {
      id: workoutId,
      contentAccessScope: 'PUBLIC',
    },
    select: { ...select, contentAccessScope: true, userId: true },
  })
  if (!workout) {
    throw new ApolloError(
      `workoutById: We could not find a workout with id ${workoutId}.`,
    )
  } else {
    if (
      workout.contentAccessScope === 'PRIVATE' &&
      workout.userId !== authedUserId
    ) {
      throw new ApolloError(
        `workoutById: You are not the owner of PRIVATE workout with id ${workoutId} - so you cannot access it.`,
      )
    } else {
      // TODO: Handle group scoped workout access check - will need to check that the person owns, is admin or or is a member of the group
      return workout
    }
  }
}

//// Mutations ////
const createWorkout = async (
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

const shallowUpdateWorkout = async (
  r: any,
  { data }: MutationShallowUpdateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user scope.
  const workout = await prisma.workout.findUnique({
    where: {
      id: data.id,
    },
    select: {
      userId: true,
    },
  })
  if (!workout || workout.userId !== authedUserId) {
    throw new ApolloError(
      `shallowUpdateWorkout: You are not the owner of workout with id ${data.id} - so you cannot access it.`,
    )
  } else {
    // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
    const fileIdsForDeletion:
      | string[]
      | null = await checkWorkoutMediaForDeletion(prisma, data)

    const updatedWorkout = await prisma.workout.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        // Fields that are required in the db need to be set as 'undefined' if they are null or if they are not provided.
        // Otherwise the type mapping between prisma and graphql codegen will fail.
        // Prisma treats 'undefined' as an instruction to do nothing with this field.
        name: data.name || undefined,
        difficultyLevel: data.difficultyLevel || undefined,
        contentAccessScope: data.contentAccessScope || undefined,
        WorkoutGoals: data.WorkoutGoals
          ? { set: data.WorkoutGoals.map((id) => ({ id })) }
          : undefined,
      },
      select,
    })

    if (!updatedWorkout) {
      throw new ApolloError(
        'shallowUpdateWorkout: Sorry, there was an issue updating this workout.',
      )
    } else {
      if (fileIdsForDeletion) {
        await deleteFiles(fileIdsForDeletion)
      }
      return updatedWorkout
    }
  }
}

const deleteWorkoutById = async (
  r: any,
  { workoutId }: MutationDeleteWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // Get all media file uris from descendants
  const workoutForDeletion = await prisma.workout.findUnique({
    where: { id: workoutId },
    select: {
      id: true,
      introVideoUri: true,
      introVideoThumbUri: true,
      introAudioUri: true,
      coverImageUri: true,
      WorkoutSections: true,
      userId: true,
    },
  })

  if (!workoutForDeletion) {
    throw new ApolloError(
      `deleteWorkoutById: Sorry, we could not find workout with ID ${workoutId} to delete it.`,
    )
  } else {
    if (workoutForDeletion.userId !== authedUserId) {
      throw new ApolloError(
        `deleteWorkoutById: Sorry, you are not authorised to delete workout with ID ${workoutId}.`,
      )
    }

    const fileIdsForDeletion: string[] = [
      workoutForDeletion.introVideoUri,
      workoutForDeletion.introVideoThumbUri,
      workoutForDeletion.introAudioUri,
      workoutForDeletion.coverImageUri,
      ...workoutForDeletion.WorkoutSections.map((section) => [
        section.introAudioUri,
        section.introVideoUri,
        section.introVideoThumbUri,
        section.classAudioUri,
        section.classVideoUri,
        section.classVideoThumbUri,
        section.outroAudioUri,
        section.outroVideoUri,
        section.outroVideoThumbUri,
      ]),
    ]
      .flat()
      .filter((x) => !!x) as string[]

    // Cascade delete Workout and descendants with https://paljs.com/plugins/delete/
    // Monitor Prisma roadmap for when this can be defined in the schema.
    const res = await prisma.onDelete({
      model: 'Workout',
      where: { id: workoutId, userId: authedUserId },
      deleteParent: true, // If false, just the descendants will be deleted.
    })

    // Is this a valid check for successful cascade delete??
    if (res && res.count && res.count > 0) {
      // Check if there is media to be deleted from the uploadcare server.
      if (fileIdsForDeletion.length > 0) {
        await deleteFiles(fileIdsForDeletion)
      }
      return workoutForDeletion.id
    } else {
      return null
    }
  }
}

/// If you are sending any workout sub section data then you must also send WorkoutSectionType - otherwise this will throw.
const updateWorkoutSections = async (
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

const deleteWorkoutSectionsById = async (
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

export {
  officialWorkouts,
  publicWorkouts,
  userWorkouts,
  workoutById,
  createWorkout,
  shallowUpdateWorkout,
  deleteWorkoutById,
  updateWorkoutSections,
  deleteWorkoutSectionsById,
}

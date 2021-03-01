import { Prisma } from '@prisma/client'
import {
  CreateAmrapWorkoutSectionInput,
  CreateFortimeWorkoutSectionInput,
  CreateLastStandingWorkoutSectionInput,
  CreateTimedWorkoutSectionInput,
  CreateTrainingWorkoutSectionInput,
  CreateWorkoutSectionInput,
  MutationCreateWorkoutArgs,
  MutationDeleteWorkoutByIdArgs,
  MutationDeleteWorkoutSectionsByIdArgs,
  MutationShallowUpdateWorkoutArgs,
  MutationUpdateWorkoutSectionsArgs,
  QueryWorkoutByIdArgs,
  Workout,
} from '../../generated/graphql'

import { buildWorkoutSectionsData } from '../workoutBuilders'

import { checkWorkoutMediaForDeletion, deleteFiles } from '../../uploadcare'

import { Context } from '../..'
import { ApolloError } from 'apollo-server'

//// Queries ////
const officialWorkouts = async (r: any, a: any, { select, prisma }: Context) =>
  prisma.workout.findMany({
    where: { contentAccessScope: 'OFFICIAL' },
    select,
  })

const publicWorkouts = async (r: any, a: any, { select, prisma }: Context) =>
  prisma.workout.findMany({
    where: {
      contentAccessScope: 'PUBLIC',
    },
    select,
  })

// All user workouts, both public and private
const userWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.workout.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })

// Public workouts only via this resolver.
const workoutById = async (
  r: any,
  { workoutId }: QueryWorkoutByIdArgs,
  { select, prisma }: Context,
) =>
  prisma.workout.findUnique({
    where: {
      id: workoutId,
      contentAccessScope: 'PUBLIC',
    },
    select,
  })

//// Mutations ////
const createWorkout = async (
  r: any,
  { data }: MutationCreateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  return validateWorkoutSectionsInput(data.WorkoutSections, async () => {
    return prisma.workout.create({
      data: {
        ...data,
        WorkoutSections: {
          create: buildWorkoutSectionsData(data.WorkoutSections),
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })
  })
}

const shallowUpdateWorkout = async (
  r: any,
  { data }: MutationShallowUpdateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileIdsForDeletion:
    | string[]
    | null = await checkWorkoutMediaForDeletion(prisma, data)

  const updatedWorkout: Workout = await prisma.workout.update({
    where: {
      id: data.id,
      userId: authedUserId,
    },
    data,
    select,
  })

  if (updatedWorkout && fileIdsForDeletion) {
    await deleteFiles(fileIdsForDeletion)
  }
  return updatedWorkout
}

const deleteWorkoutById = async (
  r: any,
  { workoutId }: MutationDeleteWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // Get all media file uris from descendants
  const workoutForDeletion: Workout = await prisma.workout.findUnique({
    where: { id: workoutId, userId: authedUserId },
    select: {
      id: true,
      introVideoUri: true,
      introVideoThumbUri: true,
      introAudioUri: true,
      coverImageUri: true,
      WorkoutSections: true,
    },
  })

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
  const { count }: Prisma.BatchPayload = await prisma.onDelete({
    model: 'Workout',
    where: { id: workoutId, userId: authedUserId },
    deleteParent: true, // If false, just the descendants will be deleted.
  })

  // Is this a valid check for successful cascade delete??
  if (count && count > 0) {
    // Check if there is media to be deleted from the uploadcare server.
    if (fileIdsForDeletion.length > 0) {
      await deleteFiles(fileIdsForDeletion)
    }
    return workoutForDeletion.id
  } else {
    return null
  }
}

const updateWorkoutSections = async (
  r: any,
  { data }: MutationUpdateWorkoutSectionsArgs,
  { authedUserId, select, prisma }: Context,
) => {}

const deleteWorkoutSectionsById = async (
  r: any,
  { workoutSectionIds }: MutationDeleteWorkoutSectionsByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {}

//// Input validation ////
/**
 * Workout Sections Input Validation
 */
// DB Ids for the different workout types.
const sectionSubTypes: { [key: string]: string[] } = {
  TrainingWorkoutSection: ['1'],
  TimedWorkoutSection: ['0', '4', '5'],
  AmrapWorkoutSection: ['2'],
  FortimeWorkoutSection: ['3'],
  LastStandingWorkoutSection: ['6'],
}

export type AnyWorkoutSectionInput =
  | CreateTimedWorkoutSectionInput
  | CreateTrainingWorkoutSectionInput
  | CreateAmrapWorkoutSectionInput
  | CreateFortimeWorkoutSectionInput
  | CreateLastStandingWorkoutSectionInput

function validateWorkoutSectionsInput(
  data: CreateWorkoutSectionInput[],
  resolver: () => Promise<Workout>,
) {
  // Check that only one section subtype is being provided and that it matches the provided workoutType.
  // Similar to this check for exclusive-belongs-to pattern.
  // https://hashrocket.com/blog/posts/modeling-polymorphic-associations-in-a-relational-database
  for (let section of data) {
    let subTypeKey: string | null = null
    if (
      Object.keys(sectionSubTypes).reduce((acum, type) => {
        if ((section as any)[type]) {
          if (sectionSubTypes[type].includes(section.WorkoutSectionType)) {
            subTypeKey = type
            return acum++
          } else {
            throw new ApolloError(
              'validateWorkoutSectionsInput: The workout section type does not match the sub section type',
            )
          }
        } else {
          return acum
        }
      }, 0) !== 1
    ) {
      throw new ApolloError(
        'validateWorkoutSectionsInput: One "section subtype" exactly per section must be provided',
      )
    }
    if (!subTypeKey) {
      throw new ApolloError(
        'validateWorkoutSectionsInput: Could not find the subtype. One "section subtype" exactly per section must be provided',
      )
    }
    // Check that all of the workoutmoves have the correct fields
    const subSectionData: AnyWorkoutSectionInput = section[subTypeKey]
    if (
      (subSectionData as AnyWorkoutSectionInput).WorkoutSets.some((set) =>
        set.WorkoutMoves.some(
          (workoutMove) =>
            (workoutMove.repType === 'DISTANCE' && !workoutMove.distanceUnit) ||
            (workoutMove.loadAmount && !workoutMove.loadUnit),
        ),
      )
    ) {
      throw new ApolloError(
        'Invalid WorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
      )
    }
  }
  return resolver()
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

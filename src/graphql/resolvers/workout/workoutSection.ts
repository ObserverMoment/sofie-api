import { ApolloError } from 'apollo-server'
import { Context } from '../../..'
import {
  MutationCreateWorkoutSectionArgs,
  MutationReorderWorkoutSectionsArgs,
  MutationSoftDeleteWorkoutSectionByIdArgs,
  MutationUpdateWorkoutSectionArgs,
  WorkoutSection,
} from '../../../generated/graphql'
import { checkUserOwnsObject, checkAndReorderObjects } from '../../utils'
import {
  checkWorkoutSectionMediaForDeletion,
  deleteFiles,
} from '../../../uploadcare/index'

export const createWorkoutSection = async (
  r: any,
  { data }: MutationCreateWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Check user owns the parent.
  await checkUserOwnsObject(data.Workout, 'workout', authedUserId, prisma)

  const workoutSection = await prisma.workoutSection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSectionType: {
        connect: { id: data.WorkoutSectionType },
      },
      Workout: {
        connect: {
          id: data.Workout,
        },
      },
    },
    select,
  })

  if (workoutSection) {
    return workoutSection as WorkoutSection
  } else {
    throw new ApolloError('createWorkoutSection: There was an issue.')
  }
}

export const updateWorkoutSection = async (
  r: any,
  { data }: MutationUpdateWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutSection', authedUserId, prisma)
  const mediaFileUrisForDeletion: string[] = await checkWorkoutSectionMediaForDeletion(
    prisma,
    data,
  )
  const updated = await prisma.workoutSection.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      // Never update a single section's sort position - use the dedicated re-order resolvers instead..
      sortPosition: undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as WorkoutSection
  } else {
    throw new ApolloError('updateWorkoutSection: There was an issue.')
  }
}
export const softDeleteWorkoutSectionById = async (
  r: any,
  { id }: MutationSoftDeleteWorkoutSectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutSection', authedUserId, prisma)
  const archived = await prisma.workoutSection.update({
    where: { id },
    data: { archived: true },
    select: { id: true },
  })

  if (archived) {
    return archived.id
  } else {
    throw new ApolloError('softDeleteWorkoutSectionById: There was an issue.')
  }
}

export const reorderWorkoutSections = async (
  r: any,
  { data }: MutationReorderWorkoutSectionsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: WorkoutSection[] = await checkAndReorderObjects<WorkoutSection>(
    data,
    'workoutSection',
    authedUserId,
    prisma,
    select,
  )

  if (updated) {
    return updated
  } else {
    throw new ApolloError('reorderWorkoutSections: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutSectionArgs,
  MutationDeleteWorkoutSectionByIdArgs,
  MutationReorderWorkoutSectionsArgs,
  MutationUpdateWorkoutSectionArgs,
  SortPositionUpdated,
  WorkoutSection,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  checkAndReorderObjects,
  AccessScopeError,
  reorderItemsForInsertDelete,
} from '../../utils'
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
  await checkUserOwnsObject(data.Workout.id, 'workout', authedUserId, prisma)

  // Update all sortPositions for all other workout sections in the workout.
  await reorderItemsForInsertDelete({
    reorderType: 'insert',
    sortPosition: data.sortPosition,
    parentId: data.Workout.id,
    parentType: 'workout',
    objectType: 'workoutSection',
    prisma: prisma,
  })

  // Create the new workout section.
  // NOTE: Ideally this would be part of the above transaction so full rollback could occur in event of an error.
  const workoutSection = await prisma.workoutSection.create({
    data: {
      ...data,
      // Will default to 1 in the DB.
      rounds: data.rounds || undefined,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSectionType: {
        connect: { id: data.WorkoutSectionType.id },
      },
      Workout: {
        connect: {
          id: data.Workout.id,
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
      rounds: data.rounds || undefined,
      // Never update a single section's sort position - use the dedicated re-order resolvers instead..
      sortPosition: undefined,
      WorkoutSectionType: data.WorkoutSectionType
        ? { connect: { id: data.WorkoutSectionType.id } }
        : undefined,
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

export const deleteWorkoutSectionById = async (
  r: any,
  { id }: MutationDeleteWorkoutSectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // To check user access, get descendant ids and to get media uris back.
  const sectionForDeletion = await prisma.workoutSection.findUnique({
    where: { id },
    select: {
      id: true,
      sortPosition: true,
      userId: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
      classAudioUri: true,
      classVideoUri: true,
      classVideoThumbUri: true,
      outroAudioUri: true,
      outroVideoUri: true,
      outroVideoThumbUri: true,
      workoutId: true,
    },
  })

  if (!sectionForDeletion || sectionForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    const setsForDeletion = await prisma.workoutSet.findMany({
      where: {
        workoutSectionId: id,
      },
      select: {
        id: true,
      },
    })

    const setIds = setsForDeletion.map((s) => s.id)

    const ops = [
      prisma.workoutMove.deleteMany({
        where: { workoutSetId: { in: setIds } },
      }),
      prisma.workoutSet.deleteMany({
        where: { id: { in: setIds } },
      }),
      prisma.workoutSection.delete({ where: { id }, select: { id: true } }),
    ]

    const [_, __, deleted] = await prisma.$transaction(ops)

    if (deleted) {
      // Reorder remaing sections.
      await reorderItemsForInsertDelete({
        reorderType: 'delete',
        sortPosition: sectionForDeletion.sortPosition,
        parentId: sectionForDeletion.workoutId,
        parentType: 'workout',
        objectType: 'workoutSection',
        prisma: prisma,
      })

      // Run media cleanup.
      const {
        introAudioUri,
        introVideoUri,
        introVideoThumbUri,
        classAudioUri,
        classVideoUri,
        classVideoThumbUri,
        outroAudioUri,
        outroVideoUri,
        outroVideoThumbUri,
      } = sectionForDeletion

      const forDeletion = [
        introAudioUri,
        introVideoUri,
        introVideoThumbUri,
        classAudioUri,
        classVideoUri,
        classVideoThumbUri,
        outroAudioUri,
        outroVideoUri,
        outroVideoThumbUri,
      ].filter((x) => x) as string[]

      await deleteFiles(forDeletion)
      return sectionForDeletion.id
    } else {
      throw new ApolloError('deleteWorkoutSectionById: There was an issue.')
    }
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
    return updated.map((u) => ({
      id: u.id,
      sortPosition: u.sortPosition,
    })) as SortPositionUpdated[]
  } else {
    throw new ApolloError('reorderWorkoutSections: There was an issue.')
  }
}

import { PublicContentValidationStatus } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Context } from '../../..'
import {
  MutationCreateWorkoutPlanArgs,
  MutationCreateWorkoutPlanReviewArgs,
  MutationDeleteWorkoutPlanReviewByIdArgs,
  MutationUpdateWorkoutPlanArgs,
  MutationUpdateWorkoutPlanReviewArgs,
  WorkoutPlan,
  WorkoutPlanReview,
  QueryWorkoutPlanByIdArgs,
  WorkoutPlanDay,
  MutationUpdateWorkoutPlanDayArgs,
  MutationCreateWorkoutPlanDayWorkoutArgs,
  WorkoutPlanDayWorkout,
  MutationUpdateWorkoutPlanDayWorkoutArgs,
  MutationDeleteWorkoutPlanDayWorkoutByIdArgs,
  MutationReorderWorkoutPlanDayWorkoutsArgs,
  SortPositionUpdated,
  MutationCreateWorkoutPlanDayWithWorkoutArgs,
  MutationMoveWorkoutPlanDayToAnotherDayArgs,
  MutationCopyWorkoutPlanDayToAnotherDayArgs,
  MutationDeleteWorkoutPlanDaysByIdArgs,
  QueryPublicWorkoutPlansArgs,
  WorkoutPlanSummary,
  QueryUserPublicWorkoutPlansArgs,
} from '../../../generated/graphql'
import {
  checkWorkoutPlanMediaForDeletion,
  deleteFiles,
} from '../../../lib/uploadcare'
import {
  addObjectToUserRecentlyViewed,
  checkAndReorderObjects,
  checkUserOwnsObject,
} from '../../utils'
import { selectForWorkoutPlanSummary } from '../selectDefinitions'
import {
  formatWorkoutPlanFiltersInput,
  formatWorkoutPlanSummaries,
} from './utils'

//// Queries ////
export const publicWorkoutPlans = async (
  r: any,
  { filters, take, cursor }: QueryPublicWorkoutPlansArgs,
  { prisma }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      validated: PublicContentValidationStatus.VALID,
      contentAccessScope: 'PUBLIC',
      archived: false,
      AND: filters ? formatWorkoutPlanFiltersInput(filters) : [],
    },
    take: take ?? 50,
    skip: cursor ? 1 : 0,
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    select: selectForWorkoutPlanSummary,
  })

  return formatWorkoutPlanSummaries(workoutPlans) as WorkoutPlanSummary[]
}

// All user created plans by user ID. If user is the logged in user, then get all,
// Otherwise just get public. Never get archived.
export const userWorkoutPlans = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      userId: authedUserId,
      archived: false,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: selectForWorkoutPlanSummary,
  })

  return formatWorkoutPlanSummaries(workoutPlans) as WorkoutPlanSummary[]
}

export const userPublicWorkoutPlans = async (
  r: any,
  { userId }: QueryUserPublicWorkoutPlansArgs,
  { prisma }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: {
      userId: userId,
      archived: false,
      contentAccessScope: 'PUBLIC',
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: selectForWorkoutPlanSummary,
  })

  return formatWorkoutPlanSummaries(workoutPlans) as WorkoutPlanSummary[]
}

export const workoutPlanById = async (
  r: any,
  { id }: QueryWorkoutPlanByIdArgs,
  { prisma, select }: Context,
) => {
  const workoutPlan = await prisma.workoutPlan.findUnique({
    where: { id },
    select,
  })

  if (workoutPlan) {
    return workoutPlan as WorkoutPlan
  } else {
    console.error(`workoutPlanById: Could not find a workoutPlan with id ${id}`)
    return null
  }
}

//// Mutations ////
export const createWorkoutPlan = async (
  r: any,
  { data }: MutationCreateWorkoutPlanArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutPlan = await prisma.workoutPlan.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (workoutPlan) {
    await addObjectToUserRecentlyViewed(
      'createWorkoutPlan',
      { id: (workoutPlan as WorkoutPlan).id },
      authedUserId,
      prisma,
    )
    return workoutPlan as WorkoutPlan
  } else {
    throw new ApolloError('createWorkoutPlan: There was an issue.')
  }
}

//// Shallow Update of Workout Program Fields ////
export const updateWorkoutPlan = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutPlan', authedUserId, prisma)
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileUrisForDeletion: string[] | null =
    await checkWorkoutPlanMediaForDeletion(prisma, data)

  const updated = await prisma.workoutPlan.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      lengthWeeks: data.lengthWeeks || undefined,
      daysPerWeek: data.daysPerWeek || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
      /// Pass an empty array to unset / disconnect all tags.
      WorkoutTags: data.hasOwnProperty('WorkoutTags')
        ? {
            set: data.WorkoutTags !== null ? data.WorkoutTags : undefined,
          }
        : undefined,
    },
    select,
  })

  if (updated) {
    if (fileUrisForDeletion && fileUrisForDeletion.length > 0) {
      await deleteFiles(fileUrisForDeletion)
    }
    return updated as WorkoutPlan
  } else {
    throw new ApolloError('updateWorkoutPlan: There was an issue.')
  }
}

//// Workout Program Days ////
export const createWorkoutPlanDayWithWorkout = async (
  r: any,
  { data }: MutationCreateWorkoutPlanDayWithWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.WorkoutPlan.id,
    'workoutPlan',
    authedUserId,
    prisma,
  )

  const workoutPlanDay = await prisma.workoutPlanDay.create({
    data: {
      dayNumber: data.dayNumber,
      User: { connect: { id: authedUserId } },
      WorkoutPlan: {
        connect: data.WorkoutPlan,
      },
      WorkoutPlanDayWorkouts: {
        create: [
          {
            sortPosition: 0,
            Workout: { connect: data.Workout },
            User: { connect: { id: authedUserId } },
          },
        ],
      },
    },
    select,
  })

  if (workoutPlanDay) {
    return workoutPlanDay as WorkoutPlanDay
  } else {
    throw new ApolloError(
      'createWorkoutPlanDayWithWorkout: There was an issue.',
    )
  }
}

export const updateWorkoutPlanDay = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanDayArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutPlanDay', authedUserId, prisma)

  const updated = await prisma.workoutPlanDay.update({
    where: { id: data.id },
    data: {
      ...data,
      dayNumber: data.dayNumber || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanDay
  } else {
    throw new ApolloError('updateWorkoutPlanDay: There was an issue.')
  }
}

export const moveWorkoutPlanDayToAnotherDay = async (
  r: any,
  { data }: MutationMoveWorkoutPlanDayToAnotherDayArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutPlanDay', authedUserId, prisma)

  // Check if the moveTo day has already been assigned. If it has then delete the plan day that has been assigned to it.
  const previousData = await prisma.workoutPlanDay.findFirst({
    where: {
      dayNumber: data.moveToDay,
    },
    select: {
      id: true,
    },
  })

  let updatedResult

  const updateOp = prisma.workoutPlanDay.update({
    where: { id: data.id },
    data: {
      dayNumber: data.moveToDay,
    },
    select,
  })

  if (previousData !== null) {
    const deletePrevPlanDayWorkouts = prisma.workoutPlanDayWorkout.deleteMany({
      where: { WorkoutPlanDay: { id: previousData.id } },
    })

    const deletePrevPlanDay = prisma.workoutPlanDay.delete({
      where: { id: previousData.id },
    })

    const [_, __, updated] = await prisma.$transaction([
      deletePrevPlanDayWorkouts,
      deletePrevPlanDay,
      updateOp,
    ])
    updatedResult = updated
  } else {
    updatedResult = await updateOp
  }

  if (updatedResult) {
    return updatedResult as WorkoutPlanDay
  } else {
    throw new ApolloError('moveWorkoutPlanDayToAnotherDay: There was an issue.')
  }
}

export const copyWorkoutPlanDayToAnotherDay = async (
  r: any,
  { data }: MutationCopyWorkoutPlanDayToAnotherDayArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutPlanDay', authedUserId, prisma)

  const dataToCopy = await prisma.workoutPlanDay.findUnique({
    where: { id: data.id },
    select: {
      note: true,
      workoutPlanId: true,
      WorkoutPlanDayWorkouts: {
        select: {
          note: true,
          sortPosition: true,
          workoutId: true,
        },
      },
    },
  })

  if (!dataToCopy) {
    throw new ApolloError(
      'moveWorkoutPlanDayToAnotherDay: Unable to find the original WorkoutPlanDay to make a copy of it.',
    )
  }

  // Check if the copyTo day has already been assigned. If it has then delete the plan day that has been assigned to it.
  const previousData = await prisma.workoutPlanDay.findFirst({
    where: {
      dayNumber: data.copyToDay,
    },
    select: {
      id: true,
    },
  })

  let updatedResult

  const createOp = prisma.workoutPlanDay.create({
    data: {
      dayNumber: data.copyToDay,
      note: dataToCopy.note,
      User: { connect: { id: authedUserId } },
      WorkoutPlan: {
        connect: { id: dataToCopy.workoutPlanId },
      },
      WorkoutPlanDayWorkouts: {
        create: dataToCopy.WorkoutPlanDayWorkouts.map((wData) => ({
          note: wData.note,
          sortPosition: wData.sortPosition,
          Workout: { connect: { id: wData.workoutId } },
          User: { connect: { id: authedUserId } },
        })),
      },
    },
    select,
  })

  if (previousData !== null) {
    const deletePrevPlanDayWorkouts = prisma.workoutPlanDayWorkout.deleteMany({
      where: { WorkoutPlanDay: { id: previousData.id } },
    })

    const deletePrevPlanDay = prisma.workoutPlanDay.delete({
      where: { id: previousData.id },
    })

    const [_, __, updated] = await prisma.$transaction([
      deletePrevPlanDayWorkouts,
      deletePrevPlanDay,
      createOp,
    ])
    updatedResult = updated
  } else {
    updatedResult = await createOp
  }

  if (updatedResult) {
    return updatedResult as WorkoutPlanDay
  } else {
    throw new ApolloError('copyWorkoutPlanDayToAnotherDay: There was an issue.')
  }
}

/// Allows deleting multiple (or one) WorkoutPlanDay at once.
// Functionality originally built so that the client can reduce the length of a WorkoutPlan and easily delete all the removed days in a single call.
export const deleteWorkoutPlanDaysById = async (
  r: any,
  { ids }: MutationDeleteWorkoutPlanDaysByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await Promise.all(
    ids.map(async (id) => {
      await checkUserOwnsObject(id, 'workoutPlanDay', authedUserId, prisma)
    }),
  )

  const deletePlanDayWorkouts = prisma.workoutPlanDayWorkout.deleteMany({
    where: { workoutPlanDayId: { in: ids } },
  })

  const deletePlanDay = prisma.workoutPlanDay.deleteMany({
    where: { id: { in: ids } },
  })

  const [_, deleted] = await prisma.$transaction([
    deletePlanDayWorkouts,
    deletePlanDay,
  ])

  if (deleted.count == ids.length) {
    return ids
  } else {
    throw new ApolloError('deleteWorkoutPlanDaysById: There was an issue.')
  }
}

//// Workout Program Day Workouts ////
export const createWorkoutPlanDayWorkout = async (
  r: any,
  { data }: MutationCreateWorkoutPlanDayWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.WorkoutPlanDay.id,
    'workoutPlanDay',
    authedUserId,
    prisma,
  )

  const workoutPlanDayWorkout = await prisma.workoutPlanDayWorkout.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      WorkoutPlanDay: {
        connect: data.WorkoutPlanDay,
      },
      Workout: {
        connect: data.Workout,
      },
    },
    select,
  })

  if (workoutPlanDayWorkout) {
    return workoutPlanDayWorkout as WorkoutPlanDayWorkout
  } else {
    throw new ApolloError('createWorkoutPlanDayWorkout: There was an issue.')
  }
}

export const updateWorkoutPlanDayWorkout = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanDayWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'workoutPlanDayWorkout',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutPlanDayWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      sortPosition: undefined,
      Workout: data.Workout ? { connect: data.Workout } : undefined,
      WorkoutPlanDay: data.WorkoutPlanDay
        ? { connect: data.WorkoutPlanDay }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanDayWorkout
  } else {
    throw new ApolloError('updateWorkoutPlanDayWorkout: There was an issue.')
  }
}

export const deleteWorkoutPlanDayWorkoutById = async (
  r: any,
  { id }: MutationDeleteWorkoutPlanDayWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlanDayWorkout', authedUserId, prisma)

  const deleted = await prisma.workoutPlanDayWorkout.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteWorkoutPlanDayWorkoutById: There was an issue.',
    )
  }
}

export const reorderWorkoutPlanDayWorkouts = async (
  r: any,
  { data }: MutationReorderWorkoutPlanDayWorkoutsArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const updated: WorkoutPlanDayWorkout[] =
    await checkAndReorderObjects<WorkoutPlanDayWorkout>(
      data,
      'workoutPlanDayWorkout',
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
    throw new ApolloError('reorderWorkoutPlanDayWorkouts: There was an issue.')
  }
}

//// Reviews ////
export const createWorkoutPlanReview = async (
  r: any,
  { data }: MutationCreateWorkoutPlanReviewArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutPlanReview = await prisma.workoutPlanReview.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutPlan: {
        connect: data.WorkoutPlan,
      },
    },
    select,
  })

  if (workoutPlanReview) {
    return workoutPlanReview as WorkoutPlanReview
  } else {
    throw new ApolloError('createWorkoutPlanReview: There was an issue.')
  }
}

export const updateWorkoutPlanReview = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanReviewArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutPlanReview', authedUserId, prisma)

  const updated = await prisma.workoutPlanReview.update({
    where: { id: data.id },
    data: {
      ...data,
      score: data.score || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanReview
  } else {
    throw new ApolloError('updateWorkoutPlanReview: There was an issue.')
  }
}

export const deleteWorkoutPlanReviewById = async (
  r: any,
  { id }: MutationDeleteWorkoutPlanReviewByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlanReview', authedUserId, prisma)

  const deleted = await prisma.workoutPlanReview.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutPlanReviewById: There was an issue.')
  }
}

import { ApolloError } from 'apollo-server-express'
import { Context } from '../..'
import {
  MutationCreateWorkoutPlanArgs,
  MutationCreateWorkoutPlanEnrolmentArgs,
  MutationCreateWorkoutPlanReviewArgs,
  MutationSoftDeleteWorkoutPlanByIdArgs,
  MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  MutationDeleteWorkoutPlanReviewByIdArgs,
  MutationUpdateWorkoutPlanArgs,
  MutationUpdateWorkoutPlanReviewArgs,
  WorkoutPlan,
  WorkoutPlanEnrolment,
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
  MutationUpdateWorkoutPlanEnrolmentArgs,
  MutationCreateWorkoutPlanDayWithWorkoutArgs,
  MutationMoveWorkoutPlanDayToAnotherDayArgs,
  MutationCopyWorkoutPlanDayToAnotherDayArgs,
  MutationDeleteWorkoutPlanDaysByIdArgs,
  QueryUserWorkoutPlanEnrolmentByIdArgs,
} from '../../generated/graphql'
import { checkWorkoutPlanMediaForDeletion, deleteFiles } from '../../uploadcare'
import {
  AccessScopeError,
  checkAndReorderObjects,
  checkUserOwnsObject,
} from '../utils'

//// Queries ////
export const publicWorkoutPlans = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: { contentAccessScope: 'PUBLIC', archived: false },
    select,
  })
  return workoutPlans as WorkoutPlan[]
}

export const userWorkoutPlans = async (
  r: any,
  a: any,
  { authedUserId, prisma, select }: Context,
) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: { userId: authedUserId, archived: false },
    select,
  })

  return workoutPlans as WorkoutPlan[]
}

export const workoutPlanById = async (
  r: any,
  { id }: QueryWorkoutPlanByIdArgs,
  { authedUserId, prisma, select }: Context,
) => {
  const workoutPlan = await prisma.workoutPlan.findUnique({
    where: { id },
    select: {
      ...select,
      contentAccessScope: true,
      userId: true,
    },
  })

  if (workoutPlan) {
    // Check that the user has access. Will need to add a group check here as well once groups are implemented.
    if ((workoutPlan as any).contentAccessScope === 'PRIVATE') {
      if ((workoutPlan as any).userId !== authedUserId) {
        throw new AccessScopeError()
      }
    }
    return workoutPlan as WorkoutPlan
  } else {
    throw new ApolloError('workoutPlanById: There was an issue.')
  }
}

// Gets all a users workout plan enrolments.
export const userWorkoutPlanEnrolments = async (
  r: any,
  a: any,
  { authedUserId, prisma, select }: Context,
) => {
  const enrolments = await prisma.workoutPlanEnrolment.findMany({
    where: {
      userId: authedUserId,
    },
    select,
  })
  return enrolments as WorkoutPlanEnrolment[]
}

export const userWorkoutPlanEnrolmentById = async (
  r: any,
  { id }: QueryUserWorkoutPlanEnrolmentByIdArgs,
  { authedUserId, prisma, select }: Context,
) => {
  const enrolment = await prisma.workoutPlanEnrolment.findUnique({
    where: { id },
    select: {
      ...select,
      userId: true,
    },
  })

  if (enrolment) {
    // Check that the user has access.
    if ((enrolment as any).userId !== authedUserId) {
      throw new AccessScopeError()
    }
    return enrolment as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('userWorkoutPlanEnrolmentById: There was an issue.')
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
      archived:
        data.hasOwnProperty('archived') && data.archived != null
          ? data.archived
          : undefined,
      contentAccessScope: data.contentAccessScope || undefined,
      /// Pass an empty array to unset / disconnect all tags.
      WorkoutTags: data.hasOwnProperty('WorkoutTags')
        ? {
            set: data.WorkoutTags != null ? data.WorkoutTags : undefined,
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

export const softDeleteWorkoutPlanById = async (
  r: any,
  { id }: MutationSoftDeleteWorkoutPlanByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlan', authedUserId, prisma)

  const archived = await prisma.workoutPlan.update({
    where: { id },
    data: { archived: true },
    select: { id: true },
  })

  if (archived) {
    return archived.id
  } else {
    throw new ApolloError('softDeleteWorkoutPlanById: There was an issue.')
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

  if (previousData != null) {
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

  if (previousData != null) {
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

//// Enrolments ////
export const createWorkoutPlanEnrolment = async (
  r: any,
  { workoutPlanId }: MutationCreateWorkoutPlanEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutPlanEnrolment = await prisma.workoutPlanEnrolment.create({
    data: {
      User: {
        connect: { id: authedUserId },
      },
      WorkoutPlan: {
        connect: { id: workoutPlanId },
      },
    },
    select,
  })

  if (workoutPlanEnrolment) {
    return workoutPlanEnrolment as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('createWorkoutPlanEnrolment: There was an issue.')
  }
}

export const updateWorkoutPlanEnrolment = async (
  r: any,
  { data }: MutationUpdateWorkoutPlanEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'workoutPlanEnrolment',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutPlanEnrolment.update({
    where: { id: data.id },
    data: {
      ...data,
      completedPlanDayWorkoutIds: data.hasOwnProperty(
        'completedPlanDayWorkoutIds',
      )
        ? {
            set:
              data.completedPlanDayWorkoutIds != null
                ? data.completedPlanDayWorkoutIds
                : undefined,
          }
        : undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutPlanEnrolment
  } else {
    throw new ApolloError('updateWorkoutPlanEnrolment: There was an issue.')
  }
}

export const deleteWorkoutPlanEnrolmentById = async (
  r: any,
  { id }: MutationDeleteWorkoutPlanEnrolmentByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutPlanEnrolment', authedUserId, prisma)

  const deleted = await prisma.workoutPlanEnrolment.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutPlanEnrolmentById: There was an issue.')
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

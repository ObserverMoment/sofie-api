import { ApolloError } from 'apollo-server'
import { Context } from '../..'
import {
  MutationCreateWorkoutProgramArgs,
  MutationCreateWorkoutProgramEnrolmentArgs,
  MutationCreateWorkoutProgramReviewArgs,
  MutationCreateWorkoutProgramWorkoutArgs,
  MutationSoftDeleteWorkoutProgramByIdArgs,
  MutationDeleteWorkoutProgramEnrolmentByIdArgs,
  MutationDeleteWorkoutProgramReviewByIdArgs,
  MutationDeleteWorkoutProgramWorkoutByIdArgs,
  MutationUpdateWorkoutProgramArgs,
  MutationUpdateWorkoutProgramReviewArgs,
  MutationUpdateWorkoutProgramWorkoutArgs,
  QueryUserWorkoutProgramEnrolmentsArgs,
  QueryWorkoutProgramByIdArgs,
  WorkoutProgram,
  WorkoutProgramEnrolment,
  WorkoutProgramReview,
  WorkoutProgramWorkout,
} from '../../generated/graphql'
import {
  checkWorkoutProgramMediaForDeletion,
  deleteFiles,
} from '../../uploadcare'
import {
  AccessScopeError,
  checkUserOwnsObject,
  checkUserOwnsParentWorkoutProgram,
} from '../utils'

//// Queries ////
export const officialWorkoutPrograms = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const workoutPrograms = await prisma.workoutProgram.findMany({
    where: { contentAccessScope: 'OFFICIAL', archived: false },
    select,
  })
  return workoutPrograms as WorkoutProgram[]
}

export const publicWorkoutPrograms = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) => {
  const workoutPrograms = await prisma.workoutProgram.findMany({
    where: { contentAccessScope: 'PUBLIC', archived: false },
    select,
  })
  return workoutPrograms as WorkoutProgram[]
}

export const userWorkoutPrograms = async (
  r: any,
  a: any,
  { authedUserId, prisma, select }: Context,
) => {
  const workoutPrograms = await prisma.workoutProgram.findMany({
    where: { userId: authedUserId, archived: false },
    select,
  })
  return workoutPrograms as WorkoutProgram[]
}

export const workoutProgramById = async (
  r: any,
  { id }: QueryWorkoutProgramByIdArgs,
  { authedUserId, prisma, select }: Context,
) => {
  const workoutProgram = await prisma.workoutProgram.findUnique({
    where: { id },
    select: {
      ...select,
      contentAccessScope: true,
      userId: true,
    },
  })

  if (workoutProgram) {
    // Check that the user has access. Will need to add a group check here as well once groups are implemented.
    if ((workoutProgram as any).contentAccessScope === 'PRIVATE') {
      if ((workoutProgram as any).userId !== authedUserId) {
        throw new AccessScopeError()
      }
    }
    return workoutProgram as WorkoutProgram
  } else {
    throw new ApolloError('workoutProgramById: There was an issue.')
  }
}

// Gets all a users enrolments for a given WorkoutProgram.
// Users can enrol in a plan multiple times if they want.
export const userWorkoutProgramEnrolments = async (
  r: any,
  { workoutProgramId }: QueryUserWorkoutProgramEnrolmentsArgs,
  { authedUserId, prisma, select }: Context,
) => {
  const enrolments = await prisma.workoutProgramEnrolment.findMany({
    where: {
      userId: authedUserId,
      workoutProgramId,
    },
    select,
  })
  return enrolments as WorkoutProgramEnrolment[]
}

//// Mutations ////
export const createWorkoutProgram = async (
  r: any,
  { data }: MutationCreateWorkoutProgramArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutProgram = await prisma.workoutProgram.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutGoals: {
        connect: data.WorkoutGoals
          ? data.WorkoutGoals.map((id) => ({ id }))
          : undefined,
      },
      WorkoutProgramWorkouts: {
        create: data.WorkoutProgramWorkouts
          ? data.WorkoutProgramWorkouts.map((pw) => ({
              ...pw,
              Workout: {
                connect: { id: pw.Workout },
              },
            }))
          : undefined,
      },
    },
    select,
  })

  if (workoutProgram) {
    return workoutProgram as WorkoutProgram
  } else {
    throw new ApolloError('createWorkoutProgram: There was an issue.')
  }
}

//// Shallow Update of Workout Program Fields ////
export const updateWorkoutProgram = async (
  r: any,
  { data }: MutationUpdateWorkoutProgramArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutProgram', authedUserId, prisma)
  // Check if any media files need to be updated. Only delete files from the server after the rest of the transaction is complete.
  const fileUrisForDeletion:
    | string[]
    | null = await checkWorkoutProgramMediaForDeletion(prisma, data)

  const updated = await prisma.workoutProgram.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
      WorkoutGoals: {
        connect: data.WorkoutGoals
          ? data.WorkoutGoals.map((id) => ({ id }))
          : undefined,
      },
    },
    select,
  })

  if (updated) {
    if (fileUrisForDeletion && fileUrisForDeletion.length > 0) {
      await deleteFiles(fileUrisForDeletion)
    }
    return updated as WorkoutProgram
  } else {
    throw new ApolloError('updateWorkoutProgram: There was an issue.')
  }
}

export const softDeleteWorkoutProgramById = async (
  r: any,
  { id }: MutationSoftDeleteWorkoutProgramByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutProgram', authedUserId, prisma)

  const archived = await prisma.workoutProgram.update({
    where: { id },
    data: { archived: true },
    select: { id: true },
  })

  if (archived) {
    return archived.id
  } else {
    throw new ApolloError('softDeleteWorkoutProgramById: There was an issue.')
  }
}

//// Workout Program Workouts ////
export const createWorkoutProgramWorkout = async (
  r: any,
  { data }: MutationCreateWorkoutProgramWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.WorkoutProgram,
    'workoutProgram',
    authedUserId,
    prisma,
  )

  const workoutProgramWorkout = await prisma.workoutProgramWorkout.create({
    data: {
      ...data,
      Workout: {
        connect: { id: data.Workout },
      },
      WorkoutProgram: {
        connect: { id: data.WorkoutProgram },
      },
    },
    select,
  })

  if (workoutProgramWorkout) {
    return workoutProgramWorkout as WorkoutProgramWorkout
  } else {
    throw new ApolloError('createWorkoutProgramWorkout: There was an issue.')
  }
}

export const updateWorkoutProgramWorkout = async (
  r: any,
  { data }: MutationUpdateWorkoutProgramWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsParentWorkoutProgram(data.id, authedUserId, prisma)

  const updated = await prisma.workoutProgramWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      Workout: {
        connect: { id: data.Workout },
      },
    },
    select,
  })

  if (updated) {
    return updated as WorkoutProgramWorkout
  } else {
    throw new ApolloError('updateWorkoutProgramWorkout: There was an issue.')
  }
}

export const deleteWorkoutProgramWorkoutById = async (
  r: any,
  { id }: MutationDeleteWorkoutProgramWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsParentWorkoutProgram(id, authedUserId, prisma)

  const deleted = await prisma.workoutProgramWorkout.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteWorkoutProgramWorkoutById: There was an issue.',
    )
  }
}

//// Enrolments ////
export const createWorkoutProgramEnrolment = async (
  r: any,
  { workoutProgramId }: MutationCreateWorkoutProgramEnrolmentArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutProgramEnrolment = await prisma.workoutProgramEnrolment.create({
    data: {
      User: {
        connect: { id: authedUserId },
      },
      WorkoutProgram: {
        connect: { id: workoutProgramId },
      },
    },
    select,
  })

  if (workoutProgramEnrolment) {
    return workoutProgramEnrolment as WorkoutProgramEnrolment
  } else {
    throw new ApolloError('createWorkoutProgramEnrolment: There was an issue.')
  }
}

export const deleteWorkoutProgramEnrolmentById = async (
  r: any,
  { id }: MutationDeleteWorkoutProgramEnrolmentByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutProgramEnrolment', authedUserId, prisma)

  const deleted = await prisma.workoutProgramEnrolment.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError(
      'deleteWorkoutProgramEnrolmentById: There was an issue.',
    )
  }
}

//// Reviews ////
export const createWorkoutProgramReview = async (
  r: any,
  { data }: MutationCreateWorkoutProgramReviewArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutProgramReview = await prisma.workoutProgramReview.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutProgram: {
        connect: { id: data.WorkoutProgram },
      },
    },
    select,
  })

  if (workoutProgramReview) {
    return workoutProgramReview as WorkoutProgramReview
  } else {
    throw new ApolloError('createWorkoutProgramReview: There was an issue.')
  }
}

export const updateWorkoutProgramReview = async (
  r: any,
  { data }: MutationUpdateWorkoutProgramReviewArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.id,
    'workoutProgramReview',
    authedUserId,
    prisma,
  )

  const updated = await prisma.workoutProgramReview.update({
    where: { id: data.id },
    data: {
      ...data,
      score: data.score || undefined,
    },
    select,
  })

  if (updated) {
    return updated as WorkoutProgramReview
  } else {
    throw new ApolloError('updateWorkoutProgramReview: There was an issue.')
  }
}

export const deleteWorkoutProgramReviewById = async (
  r: any,
  { id }: MutationDeleteWorkoutProgramReviewByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutProgramReview', authedUserId, prisma)

  const deleted = await prisma.workoutProgramReview.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteWorkoutProgramReviewById: There was an issue.')
  }
}

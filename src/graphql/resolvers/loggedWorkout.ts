import { ApolloError } from 'apollo-server'
import { Context } from '../..'
import {
  CreateLoggedWorkoutInput,
  LoggedWorkout,
  LoggedWorkoutMove,
  LoggedWorkoutSection,
  LoggedWorkoutSet,
  MutationCreateLoggedWorkoutArgs,
  MutationCreateLoggedWorkoutMoveArgs,
  MutationCreateLoggedWorkoutSectionArgs,
  MutationCreateLoggedWorkoutSetArgs,
  MutationDeleteLoggedWorkoutByIdArgs,
  MutationDeleteLoggedWorkoutMoveByIdArgs,
  MutationDeleteLoggedWorkoutSectionByIdArgs,
  MutationDeleteLoggedWorkoutSetByIdArgs,
  MutationReorderLoggedWorkoutMovesArgs,
  MutationReorderLoggedWorkoutSectionsArgs,
  MutationReorderLoggedWorkoutSetsArgs,
  MutationUpdateLoggedWorkoutArgs,
  MutationUpdateLoggedWorkoutMoveArgs,
  MutationUpdateLoggedWorkoutSectionArgs,
  MutationUpdateLoggedWorkoutSetArgs,
} from '../../generated/graphql'
import { deleteFiles } from '../../uploadcare'
import { AccessScopeError, checkUserAccessScope } from '../contentAccessScopes'

//// Queries ////
export const userLoggedWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) =>
  prisma.loggedWorkout.findMany({
    where: {
      User: { id: authedUserId },
    },
    select,
  })

//// Mutations ////
/// Creates the full structure down to workout moves ////
export const createLoggedWorkout = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  validateCreateLoggedWorkoutInput(data)
  const loggedWorkout = await prisma.loggedWorkout.create({
    data: {
      ...data,
      User: {
        connect: {
          id: authedUserId,
        },
      },
      LoggedWorkoutSections: {
        create: data.LoggedWorkoutSections.map((section) => ({
          ...section,
          User: { connect: { id: authedUserId } },
          WorkoutSectionType: {
            connect: { id: section.WorkoutSectionType },
          },
          LoggedWorkoutSets: {
            create: section.LoggedWorkoutSets
              ? section.LoggedWorkoutSets.map((set) => ({
                  ...set,
                  User: { connect: { id: authedUserId } },
                  LoggedWorkoutMoves: {
                    create: set.LoggedWorkoutMoves.map((workoutMove) => ({
                      ...workoutMove,
                      User: { connect: { id: authedUserId } },
                      Equipment: {
                        connect: {
                          id: workoutMove.Equipment || undefined,
                        },
                      },
                      move: {
                        connect: { id: workoutMove.Move },
                      },
                    })),
                  },
                }))
              : undefined,
          },
        })),
      },
      Workout: {
        connect: { id: data.Workout || undefined },
      },
      GymProfile: {
        connect: { id: data.GymProfile || undefined },
      },
      ScheduledWorkout: {
        connect: { id: data.ScheduledWorkout || undefined },
      },
      // Connect to the enrolment (single instance of a user being enrolled in a plan)
      // And to the specific session (via workoutProgramWorkout) within the program.
      WorkoutProgramEnrolment: {
        connect: { id: data.WorkoutProgramEnrolment || undefined },
      },
      WorkoutProgramWorkout: {
        connect: { id: data.WorkoutProgramWorkout || undefined },
      },
    },
    select,
  })

  if (loggedWorkout) {
    return loggedWorkout as LoggedWorkout
  } else {
    throw new ApolloError('createLoggedWorkout: There was an issue.')
  }
}

export const updateLoggedWorkout = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  checkUserAccessScope(data.id, 'loggedWorkout', authedUserId, prisma)
  const updated = await prisma.loggedWorkout.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      name: data.name || undefined,
      GymProfile: {
        connect: { id: data.GymProfile || undefined },
      },
      ScheduledWorkout: {
        connect: { id: data.ScheduledWorkout || undefined },
      },
      // Connect to the enrolment (single instance of a user being enrolled in a plan)
      // And to the specific session within the plan (via workoutProgramWorkout).
      WorkoutProgramEnrolment: {
        connect: { id: data.WorkoutProgramEnrolment || undefined },
      },
      WorkoutProgramWorkout: {
        connect: { id: data.WorkoutProgramWorkout || undefined },
      },
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkout
  } else {
    throw new ApolloError('updateLoggedWorkout: There was an issue.')
  }
}

//// Deletes the logged workout AND all of its children ////
export const deleteLoggedWorkoutById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  // Get original LoggedWorkout and all its sections.
  // To check user access and to get all media uris back.
  const logForDeletion: any = await prisma.loggedWorkout.findUnique({
    where: { id },
    select: {
      id: true,
      imageUri: true,
      userId: true,
    },
  })

  if (!logForDeletion || logForDeletion.userId !== authedUserId) {
    throw new AccessScopeError()
  } else {
    // Cascade delete loggedWorkout and all descendants with https://paljs.com/plugins/delete/
    const res = await prisma.onDelete({
      model: 'LoggedWorkout',
      where: { id: id },
      deleteParent: true, // If false, just the descendants will be deleted and return value will be void
    })

    if (res && res.count > 0) {
      if (logForDeletion.imageUri) {
        await deleteFiles([logForDeletion.imageUri])
      }
      return logForDeletion.id
    } else {
      throw new ApolloError('deleteLoggedWorkoutById: There was an issue.')
    }
  }
}

export const createLoggedWorkoutSection = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkoutSection = await prisma.loggedWorkoutSection.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutSectionType: {
        connect: { id: data.WorkoutSectionType },
      },
      LoggedWorkout: {
        connect: {
          id: data.LoggedWorkout,
        },
      },
    },
    select,
  })

  if (loggedWorkoutSection) {
    return loggedWorkoutSection as LoggedWorkoutSection
  } else {
    throw new ApolloError('createLoggedWorkoutSection: There was an issue.')
  }
}

export const updateLoggedWorkoutSection = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  checkUserAccessScope(data.id, 'loggedWorkoutSection', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutSection.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      timeTakenMs: data.timeTakenMs || undefined,
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutSection
  } else {
    throw new ApolloError('updateLoggedWorkoutSection: There was an issue.')
  }
}

//// Deletes the section and all of its children ////
export const deleteLoggedWorkoutSectionById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutSectionByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  checkUserAccessScope(id, 'loggedWorkoutSection', authedUserId, prisma)
  // Cascade delete it and all its descendants with https://paljs.com/plugins/delete/
  const res = await prisma.onDelete({
    model: 'LoggedWorkoutSection',
    where: { id: id },
    deleteParent: true, // If false, just the descendants will be deleted and return value will be void
  })

  if (res && res.count > 0) {
    return id
  } else {
    throw new ApolloError('deleteLoggedWorkoutSectionById: There was an issue.')
  }
}

export const createLoggedWorkoutSet = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkoutSet = await prisma.loggedWorkoutSet.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
      LoggedWorkoutSection: {
        connect: { id: data.LoggedWorkoutSection },
      },
    },
    select,
  })

  if (loggedWorkoutSet) {
    return loggedWorkoutSet as LoggedWorkoutSet
  } else {
    throw new ApolloError('createLoggedWorkoutSet: There was an issue.')
  }
}

export const updateLoggedWorkoutSet = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutSetArgs,
  { authedUserId, select, prisma }: Context,
) => {
  checkUserAccessScope(data.id, 'loggedWorkoutSet', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutSet.update({
    where: {
      id: data.id,
    },
    data,
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutSet
  } else {
    throw new ApolloError('updateLoggedWorkoutSet: There was an issue.')
  }
}

//// Deletes the loggedWorkoutSet and its loggedWorkoutMoves
export const deleteLoggedWorkoutSetById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutSetByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  checkUserAccessScope(id, 'loggedWorkoutSet', authedUserId, prisma)

  const deleteLoggedWorkoutSet = prisma.loggedWorkoutSet.delete({
    where: { id },
  })
  const deleteLoggedWorkoutMoves = prisma.loggedWorkoutMove.deleteMany({
    where: {
      LoggedWorkoutSet: { id },
    },
  })

  const [_, deleted] = await prisma.$transaction([
    deleteLoggedWorkoutMoves,
    deleteLoggedWorkoutSet,
  ])

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteLoggedWorkoutSetById: There was an issue.')
  }
}

export const createLoggedWorkoutMove = async (
  r: any,
  { data }: MutationCreateLoggedWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const loggedWorkoutmove = await prisma.loggedWorkoutMove.create({
    data: {
      ...data,
      User: { connect: { id: authedUserId } },
      Move: {
        connect: { id: data.Move },
      },
      Equipment: {
        connect: { id: data.Equipment || undefined },
      },
      LoggedWorkoutSet: {
        connect: { id: data.LoggedWorkoutSet },
      },
    },
    select,
  })

  if (loggedWorkoutmove) {
    return loggedWorkoutmove as LoggedWorkoutMove
  } else {
    throw new ApolloError('createLoggedWorkoutMove: There was an issue.')
  }
}

export const updateLoggedWorkoutMove = async (
  r: any,
  { data }: MutationUpdateLoggedWorkoutMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  checkUserAccessScope(data.id, 'loggedWorkoutMove', authedUserId, prisma)
  const updated = await prisma.loggedWorkoutMove.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      reps: data.reps || undefined,
      Move: {
        connect: { id: data.Move || undefined },
      },
      Equipment: {
        connect: { id: data.Equipment || undefined },
      },
    },
    select,
  })

  if (updated) {
    return updated as LoggedWorkoutMove
  } else {
    throw new ApolloError('updateLoggedWorkoutMove: There was an issue.')
  }
}

export const deleteLoggedWorkoutMoveById = async (
  r: any,
  { id }: MutationDeleteLoggedWorkoutMoveByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  checkUserAccessScope(id, 'loggedWorkoutMove', authedUserId, prisma)
  const deleted = await prisma.loggedWorkoutMove.delete({
    where: { id },
  })

  if (deleted) {
    return deleted.id
  } else {
    throw new ApolloError('deleteLoggedWorkoutMoveById: There was an issue.')
  }
}

export const reorderLoggedWorkoutSections = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutSectionsArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check access scope applies to all section ids
  // Update all sections - sortPosition
  // Get the full object and return? Or just the id and sortPosition field
}

export const reorderLoggedWorkoutSets = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutSetsArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check access scope applies to all section ids
  // Update all sections - sortPosition
  // Get the full object and return? Or just the id and sortPosition field
}

export const reorderLoggedWorkoutMoves = async (
  r: any,
  { data }: MutationReorderLoggedWorkoutMovesArgs,
  { authedUserId, prisma }: Context,
) => {
  // Check access scope applies to all section ids
  // Update all sections - sortPosition
  // Get the full object and return? Or just the id and sortPosition field
}

//// TODO: Extrack workout move input validation and add it to the create and update workoutMove resolvers.
//// Do any of the other resolovers require validation?

//// Input validation ////
/**
 * LoggedWorkoutMove Validation
 */
function validateCreateLoggedWorkoutInput(data: CreateLoggedWorkoutInput) {
  // Check all logged workout moves for valid inputs
  if (
    data.LoggedWorkoutSections &&
    data.LoggedWorkoutSections.some((section) =>
      section.LoggedWorkoutSets.some((set) =>
        set.LoggedWorkoutMoves.some(
          (workoutMove) =>
            (workoutMove.repType === 'DISTANCE' && !workoutMove.distanceUnit) ||
            (workoutMove.loadAmount && !workoutMove.loadUnit),
        ),
      ),
    )
  ) {
    throw new ApolloError(
      'Invalid loggedWorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
    )
  }
}

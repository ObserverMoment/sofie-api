import { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationCreateWorkoutSessionArgs,
  MutationDuplicateWorkoutSessionArgs,
  MutationUpdateWorkoutSessionArgs,
  QueryWorkoutSessionByIdArgs,
  WorkoutSession,
} from '../../../generated/graphql'
import {
  checkWorkoutSessionMediaForDeletion,
  deleteFiles,
} from '../../../lib/uploadcare'
import { WorkoutSessionFullDataPayload } from '../../../types'
import {
  addObjectToUserRecentlyViewed,
  checkUserOwnsObject,
  processListUpdateInputData,
} from '../../utils'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination

// Logged in user only. Never retrieve archived.
export const userWorkoutSessions = async (
  r: any,
  a: any,
  { authedUserId, prisma }: Context,
) => {
  const userWorkoutSessions = await prisma.workoutSession.findMany({
    where: {
      userId: authedUserId,
      archived: false,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select: {
      id: true,
    },
  })

  return userWorkoutSessions as WorkoutSession[]
}

export const workoutSessionById = async (
  r: any,
  { id }: QueryWorkoutSessionByIdArgs,
  { select, prisma }: Context,
) => {
  const workoutSession = await prisma.workoutSession.findUnique({
    where: { id },
    select,
  })

  if (workoutSession) {
    return workoutSession as WorkoutSession
  } else {
    console.error(`workoutSessionById: Could not find a workout with id ${id}`)
    return null
  }
}

//// Mutations ////
export const createWorkoutSession = async (
  r: any,
  { data }: MutationCreateWorkoutSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workoutSession = await prisma.workoutSession.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (workoutSession) {
    // await updateWorkoutMetaData(prisma, (workout as Workout).id)
    await addObjectToUserRecentlyViewed(
      'createWorkoutSession',
      { id: (workoutSession as WorkoutSession).id },
      authedUserId,
      prisma,
    )
    return workoutSession as WorkoutSession
  } else {
    throw new ApolloError('createWorkoutSession: There was an issue.')
  }
}

export const updateWorkoutSession = async (
  r: any,
  { data }: MutationUpdateWorkoutSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'workoutSession', authedUserId, prisma)
  const mediaFileUrisForDeletion: string[] =
    await checkWorkoutSessionMediaForDeletion(prisma, data)

  const updated = await prisma.workoutSession.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      tags: processListUpdateInputData(data, 'tags'),
      sessionOrder: processListUpdateInputData(data, 'sessionOrder'),
      archived: data.archived || undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    await addObjectToUserRecentlyViewed(
      'updateWorkoutSession',
      { id: (updated as WorkoutSession).id },
      authedUserId,
      prisma,
    )

    return updated as WorkoutSession
  } else {
    throw new ApolloError('updateWorkoutSession: There was an issue.')
  }
}

// Makes a full copy of the workout and returns it.
// Adds '- copy' to the name.
// Does not copy across any media.
// Functionality is only available on workoutSessions that the user owns.
export const duplicateWorkoutSession = async (
  r: any,
  { id }: MutationDuplicateWorkoutSessionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutSession', authedUserId, prisma)

  // Get original full data
  const original: WorkoutSessionFullDataPayload | null =
    await prisma.workoutSession.findUnique({
      where: { id },
      include: {
        CardioSessions: {
          include: {
            CardioExercises: {
              include: {
                Move: true,
              },
            },
          },
        },
        ResistanceSessions: {
          include: {
            ResistanceExercises: {
              include: {
                ResistanceSets: {
                  include: {
                    Move: true,
                    Equipment: true,
                  },
                },
              },
            },
          },
        },
        IntervalSessions: {
          include: {
            IntervalExercises: {
              include: {
                IntervalSets: {
                  include: {
                    Move: true,
                    Equipment: true,
                  },
                },
              },
            },
          },
        },
        AmrapSessions: {
          include: {
            AmrapSections: {
              include: {
                AmrapMoves: {
                  include: {
                    Move: true,
                    Equipment: true,
                  },
                },
              },
            },
          },
        },
        ForTimeSessions: {
          include: {
            ForTimeSections: {
              include: {
                ForTimeMoves: {
                  include: {
                    Move: true,
                    Equipment: true,
                  },
                },
              },
            },
          },
        },
        MobilitySessions: {
          include: {
            MobilityMoves: true,
          },
        },
      },
    })

  if (!original) {
    throw new ApolloError(
      'duplicateWorkoutSession: Could not retrieve data for this workoutSession.',
    )
  }

  // Create a new copy. Do not copy across the media or meta data and adjust the name.
  const copy = await prisma.workoutSession.create({
    data: {
      name: `${original.name} - copy`,
      description: original.description,
      User: {
        connect: { id: authedUserId },
      },
    } as Prisma.WorkoutSessionCreateInput,
    select,
  })

  if (copy) {
    return copy as WorkoutSession
  } else {
    throw new ApolloError('duplicateWorkoutSession: There was an issue.')
  }
}

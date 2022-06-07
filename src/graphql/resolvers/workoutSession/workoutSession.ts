import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  MutationCreateWorkoutSessionArgs,
  MutationDeleteWorkoutSessionArgs,
  MutationDuplicateWorkoutSessionArgs,
  MutationUpdateWorkoutSessionArgs,
  QueryWorkoutSessionByIdArgs,
  WorkoutSession,
} from '../../../generated/graphql'
import {
  checkWorkoutSessionMediaForDeletion,
  deleteFiles,
} from '../../../lib/uploadcare'
import { WorkoutSessionFullDataPayload } from '../../../../types/workoutSessionTypes'
import {
  checkUserOwnsObject,
  processStringListUpdateInputData,
} from '../../utils'
import { Prisma } from '@prisma/client'

//// Queries ////
/// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
// Logged in user only.
export const userWorkoutSessions = async (
  r: any,
  a: any,
  { select, authedUserId, prisma }: Context,
) => {
  const userWorkoutSessions = await prisma.workoutSession.findMany({
    where: {
      userId: authedUserId,
    },
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
    select,
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
      tags: processStringListUpdateInputData(data, 'tags'),
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
      archived: data.archived || undefined,
    },
    select,
  })

  if (updated) {
    if (mediaFileUrisForDeletion.length > 0) {
      await deleteFiles(mediaFileUrisForDeletion)
    }
    return updated as WorkoutSession
  } else {
    throw new ApolloError('updateWorkoutSession: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Does not copy across any media.
// Functionality is only available on objects that the user owns.
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
      tags: original.tags,
      childrenOrder: original.childrenOrder,
      CardioSessions: {
        create: original.CardioSessions.map((s) => ({
          name: s.name,
          note: s.note,
          childrenOrder: s.childrenOrder,
          User: {
            connect: { id: authedUserId },
          },
          CardioExercises: {
            create: s.CardioExercises.map((e) => ({
              note: e.note,
              time: e.time,
              timeUnit: e.timeUnit,
              distance: e.distance,
              distanceUnit: e.distanceUnit,
              cardioZone: e.cardioZone,
              Move: {
                connect: { id: e.moveId },
              },
              User: {
                connect: { id: authedUserId },
              },
            })),
          },
        })),
      },
      ResistanceSessions: {
        create: original.ResistanceSessions.map((s) => ({
          name: s.name,
          note: s.note,

          User: {
            connect: { id: authedUserId },
          },
          ResistanceExercises: {
            create: s.ResistanceExercises.map((e) => ({
              sortPosition: e.sortPosition,
              note: e.note,
              User: {
                connect: { id: authedUserId },
              },
              ResistanceSets: {
                create: e.ResistanceSets.map((s) => ({
                  sortPosition: s.sortPosition,
                  note: s.note,
                  reps: s.reps,
                  repType: s.repType,
                  Move: {
                    connect: { id: s.moveId },
                  },
                  Equipment: s.equipmentId
                    ? { connect: { id: s.equipmentId } }
                    : undefined,
                  User: {
                    connect: { id: authedUserId },
                  },
                })),
              },
            })),
          },
        })),
      },
      IntervalSessions: {
        create: original.IntervalSessions.map((s) => ({
          name: s.name,
          note: s.note,
          repeats: s.repeats,
          childrenOrder: s.childrenOrder,
          intervals: s.intervals,
          User: {
            connect: { id: authedUserId },
          },
          IntervalExercises: {
            create: s.IntervalExercises.map((e) => ({
              note: e.note,
              childrenOrder: e.childrenOrder,
              User: {
                connect: { id: authedUserId },
              },
              IntervalSets: {
                create: e.IntervalSets.map((s) => ({
                  note: s.note,
                  Move: {
                    connect: { id: s.moveId },
                  },
                  Equipment: s.equipmentId
                    ? { connect: { id: s.equipmentId } }
                    : undefined,
                  User: {
                    connect: { id: authedUserId },
                  },
                })),
              },
            })),
          },
        })),
      },
      AmrapSessions: {
        create: original.AmrapSessions.map((s) => ({
          name: s.name,
          note: s.note,
          childrenOrder: s.childrenOrder,
          User: {
            connect: { id: authedUserId },
          },
          AmrapSections: {
            create: s.AmrapSections.map((s) => ({
              name: s.name,
              note: s.note,
              childrenOrder: s.childrenOrder,
              User: {
                connect: { id: authedUserId },
              },
              AmrapMoves: {
                create: s.AmrapMoves.map((m) => ({
                  note: m.note,
                  Move: {
                    connect: { id: m.moveId },
                  },
                  Equipment: m.equipmentId
                    ? { connect: { id: m.equipmentId } }
                    : undefined,
                  User: {
                    connect: { id: authedUserId },
                  },
                })),
              },
            })),
          },
        })),
      },
      ForTimeSessions: {
        create: original.ForTimeSessions.map((s) => ({
          name: s.name,
          note: s.note,
          repeats: s.repeats,
          timecapSeconds: s.timecapSeconds,
          childrenOrder: s.childrenOrder,
          User: {
            connect: { id: authedUserId },
          },
          ForTimeSections: {
            create: s.ForTimeSections.map((s) => ({
              name: s.name,
              note: s.note,
              childrenOrder: s.childrenOrder,
              User: {
                connect: { id: authedUserId },
              },
              ForTimeMoves: {
                create: s.ForTimeMoves.map((m) => ({
                  note: m.note,
                  Move: {
                    connect: { id: m.moveId },
                  },
                  Equipment: m.equipmentId
                    ? { connect: { id: m.equipmentId } }
                    : undefined,
                  User: {
                    connect: { id: authedUserId },
                  },
                })),
              },
            })),
          },
        })),
      },
      MobilitySessions: {
        create: original.MobilitySessions.map((s) => ({
          name: s.name,
          note: s.note,
          childrenOrder: s.childrenOrder,
          User: {
            connect: { id: authedUserId },
          },
          MobilityMoves: {
            connect: s.MobilityMoves.map((m) => ({
              id: m.id,
            })),
          },
        })),
      },
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (copy) {
    return copy as WorkoutSession
  } else {
    throw new ApolloError('duplicateWorkoutSession: There was an issue.')
  }
}

export const deleteWorkoutSession = async (
  r: any,
  { id }: MutationDeleteWorkoutSessionArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'workoutSession', authedUserId, prisma)

  /// 1. Get all media uris from the session and children.
  const original = await prisma.workoutSession.findUnique({
    where: { id },
    select: {
      coverImageUri: true,
      introAudioUri: true,
      introVideoUri: true,
      introVideoThumbUri: true,
      IntervalSessions: {
        select: {
          audioUri: true,
          videoUri: true,
          videoThumbUri: true,
        },
      },
      MobilitySessions: {
        select: {
          audioUri: true,
          videoUri: true,
          videoThumbUri: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError(
      'deleteWorkoutSession: Could not retrieve media data for this workoutSession.',
    )
  }

  const mediaFiles = [
    original.coverImageUri,
    original.introAudioUri,
    original.introVideoUri,
    original.introVideoThumbUri,
    ...original.IntervalSessions.flatMap((s) => [
      s.audioUri,
      s.videoUri,
      s.videoThumbUri,
    ]),
    ...original.MobilitySessions.flatMap((s) => [
      s.audioUri,
      s.videoUri,
      s.videoThumbUri,
    ]),
  ].filter((x) => x) as string[]

  if (mediaFiles.length) {
    await deleteFiles(mediaFiles)
  }

  /// 2. Delete the workout session which will cascade delete all children.
  const deleted = await prisma.workoutSession.delete({
    where: { id },
    select: { id: true },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteWorkoutSession: There was an issue.`)
    throw new ApolloError('deleteWorkoutSession: There was an issue.')
  }
}

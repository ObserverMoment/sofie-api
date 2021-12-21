import { Prisma, PrismaClient } from '@prisma/client'
import {
  Equipment,
  WorkoutFiltersInput,
  WorkoutSummary,
} from '../../../generated/graphql'
import { validateWorkoutMetaData } from '../../../lib/jsonValidation'
import { WorkoutMetaDataPayload, WorkoutSummaryPayload } from '../../../types'

export function formatWorkoutSummaries(
  workouts: WorkoutSummaryPayload[],
): WorkoutSummary[] {
  return workouts.map((w) => formatWorkoutSummary(w))
}

export function formatWorkoutSummary(
  workout: WorkoutSummaryPayload,
): WorkoutSummary {
  return {
    id: workout.id,
    createdAt: workout.createdAt,
    archived: workout.archived,
    name: workout.name,
    User: workout.User,
    lengthMinutes: workout.lengthMinutes,
    coverImageUri: workout.coverImageUri,
    description: workout.description,
    difficultyLevel: workout.difficultyLevel,
    loggedSessionsCount: workout._count?.LoggedWorkouts || 0,
    hasClassVideo: workout.WorkoutSections.some((ws) => ws.classVideoUri),
    hasClassAudio: workout.WorkoutSections.some((ws) => ws.classAudioUri),
    equipments: uniqueEquipmentsInWorkout(workout).map((e) => e.name),
    tags: workoutSectionTypesAndTags(workout),
  }
}

export function uniqueEquipmentsInWorkout(
  workout: WorkoutSummaryPayload,
): Equipment[] {
  const uniqueEquipmentIds: string[] = [] // For quick look up.
  const uniqueEquipments: Equipment[] = []

  for (const wSection of workout.WorkoutSections) {
    for (const wSet of wSection.WorkoutSets) {
      for (const wMove of wSet.WorkoutMoves) {
        // Selectable
        if (
          wMove.Equipment &&
          !uniqueEquipmentIds.includes(wMove.Equipment.id)
        ) {
          uniqueEquipmentIds.push(wMove.Equipment.id)
          uniqueEquipments.push(wMove.Equipment)
        }
        // Required
        for (const equipment of wMove.Move.RequiredEquipments) {
          if (!uniqueEquipmentIds.includes(equipment.id)) {
            uniqueEquipmentIds.push(equipment.id)
            uniqueEquipments.push(equipment)
          }
        }
      }
    }
  }

  return uniqueEquipments
}

export function workoutSectionTypesAndTags(
  workout: WorkoutSummaryPayload,
): string[] {
  const uniqueTags: string[] = []

  for (const wSection of workout.WorkoutSections) {
    if (!uniqueTags.includes(wSection.WorkoutSectionType.name)) {
      uniqueTags.push(wSection.WorkoutSectionType.name)
    }
  }

  uniqueTags.concat(workout.WorkoutGoals.map((goal) => goal.name))
  uniqueTags.concat(workout.WorkoutTags.map((tag) => tag.tag))

  return uniqueTags
}

export function formatWorkoutFiltersInput(filters: WorkoutFiltersInput) {
  return [
    {
      difficultyLevel: filters.difficultyLevel
        ? { equals: filters.difficultyLevel }
        : {},
    },
    {
      lengthMinutes: filters.minLength ? { gte: filters.minLength } : {},
    },
    {
      lengthMinutes: filters.maxLength ? { lte: filters.maxLength } : {},
    },
    filters.workoutGoals.length > 0
      ? {
          WorkoutGoals: {
            some: { id: { in: filters.workoutGoals } },
          },
        }
      : {},
    ...formatMetaDataFilter(filters),
  ]
}

export function formatWorkoutSectionFiltersInput(filters: WorkoutFiltersInput) {
  return {
    some: {
      AND: [
        /// hasClassVideo and hasClassAudio can both be null (ignore), true (require) or false (exclude)
        filters.hasOwnProperty('hasClassVideo') &&
        filters.hasClassVideo === true
          ? {
              classVideoUri: { not: null },
            }
          : {},
        filters.hasOwnProperty('hasClassAudio') &&
        filters.hasClassAudio === true
          ? {
              classVideoUri: { not: null },
            }
          : {},
        filters.workoutSectionTypes.length
          ? {
              workoutSectionTypeId: { in: filters.workoutSectionTypes },
            }
          : {},
      ],
    },
    every: {
      AND: [
        /// hasClassVideo and hasClassAudio can both be null (ignore), true (require) or false (exclude)
        filters.hasOwnProperty('hasClassVideo') &&
        filters.hasClassVideo === false
          ? {
              classVideoUri: { equals: null },
            }
          : {},
        filters.hasOwnProperty('hasClassAudio') &&
        filters.hasClassAudio === false
          ? {
              classVideoUri: { equals: null },
            }
          : {},
        formatWorkoutSetsFilters(filters),
      ],
    },
  }
}

export const kBodyweightEquipmentId = 'b95da267-c036-4caa-9294-d1fab9b3d2e8'

export function formatWorkoutSetsFilters(filters: WorkoutFiltersInput) {
  const excludedMoves = filters.excludedMoves.length
    ? { id: { notIn: filters.excludedMoves } }
    : {}

  // filters.bodyweightOnly is handled in the meta data filters.
  // !filters.bodyweightOnly is handled here.
  if (!filters.bodyweightOnly && filters.availableEquipments?.length) {
    return {
      WorkoutSets: {
        every: {
          WorkoutMoves: {
            every: {
              Move: {
                ...excludedMoves,
                RequiredEquipments: {
                  every: { id: { in: filters.availableEquipments } },
                },
              },
              OR: [
                { equipmentId: { equals: kBodyweightEquipmentId } },
                { equipmentId: { in: filters.availableEquipments } },
              ],
            },
          },
        },
      },
    }
  } else if (filters.excludedMoves.length) {
    return {
      WorkoutSets: {
        every: {
          WorkoutMoves: {
            every: {
              Move: excludedMoves,
            },
          },
        },
      },
    }
  } else {
    return {}
  }
}

export function formatMetaDataFilter(filters: WorkoutFiltersInput) {
  const result = []

  // bodyweightOnly can be null (ignore), true or false (must match booleans).
  if (
    filters.hasOwnProperty('bodyweightOnly') &&
    filters.bodyweightOnly !== null
  ) {
    result.push({
      metaData: {
        path: ['bodyweightOnly'],
        equals: filters.bodyweightOnly,
      },
    })
  }

  if (filters.requiredMoves.length) {
    result.push({
      metaData: {
        path: ['moves'],
        array_contains: filters.requiredMoves,
      },
    })
  }

  if (filters.targetedBodyAreas.length) {
    result.push({
      metaData: {
        path: ['bodyAreas'],
        array_contains: filters.targetedBodyAreas,
      },
    })
  }

  return result
}

/// Methods to update the workout meta data. Eventually these should probably run in the background rather than being called directly from the resolvers.
export async function updateWorkoutMetaDataFromWorkoutSection(
  prisma: PrismaClient,
  workoutSectionId: string,
) {
  const data = await prisma.workoutSection.findUnique({
    where: { id: workoutSectionId },
    select: {
      Workout: { select: { id: true } },
    },
  })

  if (data?.Workout.id === null) {
    throw Error(
      '[updateWorkoutMetaDataJsonFromWorkoutSection] could not find parent workout. The meta data was not updated',
    )
  }

  await updateWorkoutMetaData(prisma, data!.Workout.id)
}

export async function updateWorkoutMetaDataFromWorkoutSet(
  prisma: PrismaClient,
  workoutSetId: string,
) {
  const data = await prisma.workoutSet.findUnique({
    where: { id: workoutSetId },
    select: {
      WorkoutSection: {
        select: {
          Workout: { select: { id: true } },
        },
      },
    },
  })

  if (data?.WorkoutSection.Workout.id === null) {
    throw Error(
      '[updateWorkoutMetaDataJsonFromWorkoutSet] could not find parent workout. The meta data was not updated',
    )
  }

  await updateWorkoutMetaData(prisma, data!.WorkoutSection.Workout.id)
}

export async function updateWorkoutMetaDataFromWorkoutMove(
  prisma: PrismaClient,
  workoutMoveId: string,
) {
  const data = await prisma.workoutMove.findUnique({
    where: { id: workoutMoveId },
    select: {
      WorkoutSet: {
        select: {
          WorkoutSection: {
            select: {
              Workout: { select: { id: true } },
            },
          },
        },
      },
    },
  })

  if (data?.WorkoutSet.WorkoutSection.Workout.id === null) {
    throw Error(
      '[updateWorkoutMetaDataJsonFromWorkoutMove] could not find parent workout. The meta data was not updated',
    )
  }

  await updateWorkoutMetaData(
    prisma,
    data!.WorkoutSet.WorkoutSection.Workout.id,
  )
}

/// Updates a workouts meta data based on its current state.
export async function updateWorkoutMetaData(
  prisma: PrismaClient,
  workoutId: string,
) {
  const workout: WorkoutMetaDataPayload | null =
    await prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        WorkoutSections: {
          include: {
            WorkoutSets: {
              include: {
                WorkoutMoves: {
                  include: {
                    Equipment: true,
                    Move: {
                      include: {
                        RequiredEquipments: true,
                        BodyAreaMoveScores: {
                          include: {
                            BodyArea: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

  if (!workout) {
    throw Error(
      `[updateWorkoutMetaDataJson]. Unable to find workout with id ${workoutId}. The meta data was not updated!`,
    )
  }

  let dataAsSets = {
    moves: new Set<string>(),
    bodyAreas: new Set<string>(),
  }

  let requiresEquipment = false

  workout.WorkoutSections.forEach((workoutSection) => {
    workoutSection.WorkoutSets.forEach((workoutSet) => {
      workoutSet.WorkoutMoves.forEach((workoutMove) => {
        // Equipment check
        if (
          workoutMove.Move.RequiredEquipments.length > 0 ||
          (workoutMove.Equipment !== null &&
            workoutMove.Equipment.id !== kBodyweightEquipmentId)
        ) {
          requiresEquipment = true
        }
        // moves
        dataAsSets.moves.add(workoutMove.moveId)
        // bodyAreas
        workoutMove.Move.BodyAreaMoveScores.forEach((bams) => {
          dataAsSets.bodyAreas.add(bams.bodyAreaId)
        })
      })
    })
  })

  const metaData = {
    bodyweightOnly: !requiresEquipment,
    moves: Array.from(dataAsSets.moves),
    bodyAreas: Array.from(dataAsSets.bodyAreas),
  }

  const valid = validateWorkoutMetaData(metaData)
  if (!valid) {
    console.log(metaData)
    throw new Error(
      'An invalid meta data object was generated so the meta data was not saved.',
    )
  }

  const data: Prisma.WorkoutUpdateInput = {
    metaData: metaData,
  }

  await prisma.workout.update({
    where: { id: workout.id },
    data,
  })
}

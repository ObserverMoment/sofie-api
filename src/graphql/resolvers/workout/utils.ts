import { PrismaClient } from '@prisma/client'
import { WorkoutFiltersInput } from '../../../generated/graphql'
import { WorkoutMetaDataPayload } from '../../../types'

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

  if (filters.bodyweightOnly) {
    /// Ensure that required equipments is empty and that Equipment is either null or equal to bodyweightId
    return {
      WorkoutSets: {
        every: {
          WorkoutMoves: {
            every: {
              Move: {
                ...excludedMoves,
                RequiredEquipments: {
                  every: { id: { in: [] } },
                },
              },
              OR: [
                { equipmentId: { equals: null } },
                { equipmentId: { equals: kBodyweightEquipmentId } },
              ],
            },
          },
        },
      },
    }
  } else if (filters.availableEquipments.length) {
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

  if (filters.workoutGoals.length) {
    result.push({
      metaData: {
        path: ['workoutGoals'],
        array_contains: filters.workoutGoals,
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

  if (data?.Workout.id == null) {
    throw Error(
      '[updateWorkoutMetaDataJsonFromWorkoutSection] could not find parent workout. The meta data was not updated',
    )
  }

  await updateWorkoutMetaData(prisma, data.Workout.id)
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

  if (data?.WorkoutSection.Workout.id == null) {
    throw Error(
      '[updateWorkoutMetaDataJsonFromWorkoutSet] could not find parent workout. The meta data was not updated',
    )
  }

  await updateWorkoutMetaData(prisma, data.WorkoutSection.Workout.id)
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

  if (data?.WorkoutSet.WorkoutSection.Workout.id == null) {
    throw Error(
      '[updateWorkoutMetaDataJsonFromWorkoutMove] could not find parent workout. The meta data was not updated',
    )
  }

  await updateWorkoutMetaData(prisma, data.WorkoutSet.WorkoutSection.Workout.id)
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
        WorkoutGoals: true,
        WorkoutSections: {
          include: {
            WorkoutSets: {
              include: {
                WorkoutMoves: {
                  include: {
                    Move: {
                      include: {
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
    workoutGoals: new Set<string>(workout.WorkoutGoals.map((g) => g.id)),
    moves: new Set<string>(),
    bodyAreas: new Set<string>(),
  }

  workout.WorkoutSections.forEach((workoutSection) => {
    workoutSection.WorkoutSets.forEach((workoutSet) => {
      workoutSet.WorkoutMoves.forEach((workoutMove) => {
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
    workoutGoals: Array.from(dataAsSets.workoutGoals),
    moves: Array.from(dataAsSets.moves),
    bodyAreas: Array.from(dataAsSets.bodyAreas),
  }

  await prisma.workout.update({
    where: { id: workout.id },
    data: {
      metaData: metaData,
    },
  })
}

import { WorkoutFiltersInput } from '../../../generated/graphql'

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
        filters.hasClassVideo
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
    every: formatEquipmentFilters(filters),
  }
}

export const kBodyweightEquipmentId = 'b95da267-c036-4caa-9294-d1fab9b3d2e8'
export function formatEquipmentFilters(filters: WorkoutFiltersInput) {
  if (filters.bodyweightOnly) {
    /// Ensure that required equipments is empty and that Equipment is either null or equal to bodyweightId
    return {
      WorkoutSets: {
        every: {
          WorkoutMoves: {
            every: {
              Move: {
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

  console.log(filters.excludedMoves)
  if (filters.excludedMoves.length) {
    result.push({
      NOT: {
        metaData: { path: ['moves'], array_contains: filters.excludedMoves },
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

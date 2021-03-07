import {
  MutationCreateWorkoutArgs,
  MutationMakeCopyWorkoutByIdArgs,
  MutationSoftDeleteWorkoutByIdArgs,
  MutationUpdateWorkoutArgs,
  QueryWorkoutByIdArgs,
  Workout,
} from '../../generated/graphql'

import { Context } from '../..'
import { ApolloError } from 'apollo-server'
import { AccessScopeError, checkUserAccessScope } from '../utils'
import { Prisma } from '@prisma/client'

//// Queries ////
export const officialWorkouts = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const officialWorkouts = await prisma.workout.findMany({
    where: { contentAccessScope: 'OFFICIAL' },
    select,
  })
  return officialWorkouts as Workout[]
}

export const publicWorkouts = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const publicWorkouts = await prisma.workout.findMany({
    where: { contentAccessScope: 'PUBLIC' },
    select,
  })
  return publicWorkouts as Workout[]
}

// All user workouts, both public and private
export const userWorkouts = async (
  r: any,
  a: any,
  { authedUserId, select, prisma }: Context,
) => {
  const userWorkouts = await prisma.workout.findMany({
    where: { userId: authedUserId },
    select,
  })
  return userWorkouts as Workout[]
}

export const workoutById = async (
  r: any,
  { id }: QueryWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workout = await prisma.workout.findUnique({
    where: { id },
    select: {
      ...select,
      contentAccessScope: true,
      userId: true,
    },
  })

  if (workout) {
    // Check that the user has access. Will need to add a group check here as well once groups are implemented.
    if ((workout as any).contentAccessScope === 'PRIVATE') {
      if ((workout as any).userId !== authedUserId) {
        throw new AccessScopeError()
      }
    }
    return workout as Workout
  } else {
    throw new ApolloError('workoutProgramById: There was an issue.')
  }
}

//// Mutations ////
export const createWorkout = async (
  r: any,
  { data }: MutationCreateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const workout = await prisma.workout.create({
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
    },
    select,
  })

  if (workout) {
    return workout as Workout
  } else {
    throw new ApolloError('createWorkout: There was an issue.')
  }
}

export const updateWorkout = async (
  r: any,
  { data }: MutationUpdateWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserAccessScope(data.id, 'workout', authedUserId, prisma)

  const updated = await prisma.workout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      difficultyLevel: data.difficultyLevel || undefined,
      contentAccessScope: data.contentAccessScope || undefined,
      // Note: You should not pass 'null' to a relationship field. It will be parsed as 'no input' and ignored.
      // To remove all related items of this type pass an empty array.
      // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records
      WorkoutGoals: {
        set: data.WorkoutGoals
          ? data.WorkoutGoals.map((id) => ({ id }))
          : undefined,
      },
    },
    select,
  })

  if (updated) {
    return updated as Workout
  } else {
    throw new ApolloError('updateWorkout: There was an issue.')
  }
}

export const softDeleteWorkoutById = async (
  r: any,
  { id }: MutationSoftDeleteWorkoutByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserAccessScope(id, 'workout', authedUserId, prisma)

  const archived = await prisma.workout.update({
    where: { id },
    data: { archived: true },
  })

  if (archived) {
    return archived.id
  } else {
    throw new ApolloError('softDeleteWorkoutById: There was an issue.')
  }
}

// Makes a full copy of the workout and returns it.
// Adds '- copy' to the name.
export const makeCopyWorkoutById = async (
  r: any,
  { id }: MutationMakeCopyWorkoutByIdArgs,
  { authedUserId, select, prisma }: Context,
) => {
  // Get original workout full data
  const original = await prisma.workout.findUnique({
    where: { id },
    include: {
      WorkoutGoals: true,
      WorkoutSections: {
        include: {
          IntervalBuyIns: {
            include: {
              WorkoutMove: true,
            },
          },
          WorkoutSets: {
            include: {
              Generators: true,
              WorkoutMoves: true,
            },
          },
        },
      },
    },
  })

  // Check that the user has auth to make a copy
  if (!original) {
    throw new ApolloError(
      'makeCopyWorkoutById: Could not retrieve data for this workout.',
    )
  }
  // Check that the user has access. Will need to add a group check here as well once groups are implemented.
  if (original.contentAccessScope === 'PRIVATE') {
    if (original.userId !== authedUserId) {
      throw new AccessScopeError()
    }
  }
  // Create a new copy.
  const copy = await prisma.workout.create({
    data: {
      ...original,
      name: `${original.name} - copy`,
      User: {
        connect: { id: authedUserId },
      },
      WorkoutGoals: {
        connect: original.WorkoutGoals.map(({ id }) => ({ id })),
      },
      WorkoutSections: {
        create: original.WorkoutSections.map((section) => ({
          ...section,
          WorkoutSectionType: {
            connect: { id: section.workoutSectionTypeId },
          },
          WorkoutSets: {
            create: section.WorkoutSets.map((set) => ({
              ...set,
              Generators: {
                create: set.Generators.map((gen) => ({
                  ...gen,
                })),
              },
              WorkoutMoves: {
                create: set.WorkoutMoves.map((workoutMove) => ({
                  ...workoutMove,
                  Move: {
                    connect: { id: workoutMove.moveId },
                  },
                  Equipment: {
                    connect: {
                      id: workoutMove.equipmentId
                        ? workoutMove.equipmentId
                        : undefined,
                    },
                  },
                })),
              },
            })),
          },
          IntervalBuyIns: {
            create: section.IntervalBuyIns.map((buyIn) => ({
              ...buyIn,
              WorkoutMove: {
                create: {
                  ...buyIn.WorkoutMove,
                  Move: {
                    connect: { id: buyIn.WorkoutMove.moveId },
                  },
                  Equipment: {
                    connect: {
                      id: buyIn.WorkoutMove.equipmentId
                        ? buyIn.WorkoutMove.equipmentId
                        : undefined,
                    },
                  },
                },
              },
            })),
          },
        })),
      },
    } as Prisma.WorkoutCreateInput,
    select,
  })

  if (copy) {
    return copy as Workout
  } else {
    throw new ApolloError('makeCopyWorkoutById: There was an issue.')
  }
}

export const createWorkoutSection = async () => {}
export const updateWorkoutSection = async () => {}
export const deleteWorkoutSectionById = async () => {}

export const createWorkoutSectionIntervalBuyIn = async () => {}
export const updateWorkoutSectionIntervalBuyIn = async () => {}
export const deleteWorkoutSectionIntervalBuyInById = async () => {}

export const createWorkoutSet = async () => {}
export const updateWorkoutSet = async () => {}
export const deleteWorkoutSetById = async () => {}

export const createWorkoutSetGenerator = async () => {}
export const updateWorkoutSetGenerator = async () => {}
export const deleteWorkoutSetGeneratorById = async () => {}

export const createWorkoutMove = async () => {}
export const updateWorkoutMove = async () => {}
export const deleteWorkoutMoveById = async () => {}

// //// Input validation ////
/////// GET FROM SPREADSHEET //////
////// Sections: Rounds / Timecap combination matches workoutSection type.
////// Sections: If has interval buy in, make sure the workoutSection type allows this.
////// Sets: Rounds / Timecap combination matches owning workoutSection type.
///// Workout Moves: All have a rep type which is one of the owning sections validRepTypes.
///// Workout Moves: If load then load unit, if distance then distance unit.
// /**
//  * Workout Sections Input Validation
//  */
// export type AnyWorkoutSectionInput =
//   | CreateTrainingWorkoutSectionInput
//   | CreateAmrapWorkoutSectionInput
//   | CreateLastStandingWorkoutSectionInput

// function checkSubTypesProvided(
//   section: CreateWorkoutSectionInput | UpdateWorkoutSectionInput,
// ): [number, string | null] {
//   let subTypeKey: string | null = null
//   const numSubTypesProvided: number = Object.keys(sectionSubTypes).reduce(
//     (acum, type) => {
//       if ((section as any)[type]) {
//         if (
//           section.WorkoutSectionType &&
//           sectionSubTypes[type].includes(section.WorkoutSectionType)
//         ) {
//           // The workoutSectionType matches the section sub data provided.
//           subTypeKey = type
//         } else {
//           throw new ApolloError(
//             'validateWorkoutSectionsInput: The workout section type does not match the section sub types, or you have not provided the workoutSectionType field when you have provided a workout section sub type field.',
//           )
//         }
//         return acum++
//       } else {
//         return acum
//       }
//     },
//     0,
//   )
//   return [numSubTypesProvided, subTypeKey]
// }

// function workoutMovesDataHasError(
//   section: CreateWorkoutSectionInput | UpdateWorkoutSectionInput,
// ): boolean {
//   return (
//     !section.WorkoutSets ||
//     section.WorkoutSets.some((set) =>
//       set.WorkoutMoves.some(
//         (workoutMove) =>
//           (workoutMove.repType === 'DISTANCE' && !workoutMove.distanceUnit) ||
//           (workoutMove.loadAmount && !workoutMove.loadUnit),
//       ),
//     )
//   )
// }

// function validateCreateWorkoutSectionsInput(data: CreateWorkoutSectionInput[]) {
//   // Check that only one section subtype is being provided and that it matches the provided workoutType.
//   // Similar to this check for exclusive-belongs-to pattern.
//   // https://hashrocket.com/blog/posts/modeling-polymorphic-associations-in-a-relational-database
//   for (let section of data) {
//     const [numSubTypesProvided, subTypeKey] = checkSubTypesProvided(section)

//     if (numSubTypesProvided > 1) {
//       throw new ApolloError(
//         'validateCreateWorkoutSectionsInput: One (or zero) "section subtype" data object exactly per section must be provided when updating. You have provided more than one.',
//       )
//     }
//     if (numSubTypesProvided !== 1) {
//       throw new ApolloError(
//         'validateCreateWorkoutSectionsInput: One "section subtype" data object exactly per section must be provided when creating',
//       )
//     }
//     if (!subTypeKey) {
//       throw new ApolloError(
//         'validateCreateWorkoutSectionsInput: Could not validate the section subtype against the workoutSectionType provided. One "section subtype" data object exactly per section must be provided, as well as the workoutSectionType, and they must match.',
//       )
//     }
//     if (workoutMovesDataHasError(section)) {
//       throw new ApolloError(
//         'validateCreateWorkoutSectionsInput: Invalid WorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
//       )
//     }
//   }
// }

// function validateUpdateWorkoutSectionsInput(data: UpdateWorkoutSectionInput[]) {
//   // Check that only one section subtype is being provided and that it matches the provided workoutType.
//   // Similar to this check for exclusive-belongs-to pattern.
//   // https://hashrocket.com/blog/posts/modeling-polymorphic-associations-in-a-relational-database
//   for (let section of data) {
//     const [numSubTypesProvided, subTypeKey] = checkSubTypesProvided(section)
//     if (numSubTypesProvided == 0) {
//       // Make sure they have not passed a workoutsectionType update - these muct always be passed together.
//       if (section.WorkoutSectionType) {
//         throw new ApolloError(
//           'validateUpdateWorkoutSectionsInput: If you provide a workoutSectionType then you must also provide some workout section subtype data.',
//         )
//       }
//     } else {
//       if (numSubTypesProvided !== 1) {
//         throw new ApolloError(
//           'validateUpdateWorkoutSectionsInput: One "section subtype" data object exactly per section must be provided',
//         )
//       }
//       if (!subTypeKey) {
//         throw new ApolloError(
//           'validateUpdateWorkoutSectionsInput: Could not validate the section subtype data. One "section subtype" data object exactly per section must be provided and it must match the workoutSectionType.',
//         )
//       }
//     }

//     if (section.WorkoutSets) {
//       if (workoutMovesDataHasError(section)) {
//         throw new ApolloError(
//           'validateUpdateWorkoutSectionsInput: Invalid WorkoutMove input: Rep type of DISTANCE requires that distance unit be specified and a non-null loadAmount requires that loadUnit be specified. One of these was missing for one or more of the loggedWorkoutMoves you submitted',
//         )
//       }
//     }
//   }
// }

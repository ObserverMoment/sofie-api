import { PrismaClient, WorkoutSection } from '@prisma/client'
import {
  DeepUpdateWorkoutInput,
  CreateLoggedWorkoutInput,
  CreateWorkoutSectionInput,
  DeepUpdateLoggedWorkoutInput,
} from '../generated/graphql'

// Top level models which hold all the data needed to build a workout.
enum WorkoutParentType {
  WORKOUT,
  LOGGEDWORKOUT,
}

/** Used for deleting all descendents of either a workout or a loggedWorkout. */

async function deleteAllDescendents(
  prisma: PrismaClient,
  parentId: string,
  parent: WorkoutParentType,
) {
  const where =
    parent == WorkoutParentType.WORKOUT
      ? {
          workoutId: parentId,
        }
      : {
          loggedWorkoutId: parentId,
        }

  ///// Use this to delete all children of workout
  await prisma.workoutSection.deleteMany({
    where: { workout: { id: parentId } },
  })
  /// Then use cascade deletes to ensure that all workoutmoves of these workout sections are also deleted.
  /////
  // Get all workoutSection children of the workout.
  const workoutSections: WorkoutSection[] = await prisma.workoutSection.findMany(
    { where },
  )

  const sectionIds = ([] as string[]).concat(
    ...workoutSections.map((ws: WorkoutSection) => ws.id),
  )

  // Delete all roundAdjustRules from these workoutSections.
  await prisma.roundAdjustRule.deleteMany({
    where: {
      workoutSectionId: {
        in: sectionIds,
      },
    },
  })

  // Delete all moves from these workoutSections.
  await prisma.workoutMove.deleteMany({
    where: {
      workoutSectionId: {
        in: sectionIds,
      },
    },
  })

  // Then delete all workoutSections.
  await prisma.workoutSection.deleteMany({
    where: {
      id: {
        in: sectionIds,
      },
    },
  })

  return true
}

function buildCreateLoggedWorkoutData(
  authedUserId: string,
  loggedWorkoutData: CreateLoggedWorkoutInput,
) {
  const originalWorkoutId = loggedWorkoutData.originalWorkoutId

  const workoutTypeId = loggedWorkoutData.workoutTypeId

  // Format for optional connect fields passed as an ID - empty {} will be ignored.
  const gymProfile = loggedWorkoutData.gymProfileId
    ? {
        gymProfile: {
          connect: { id: loggedWorkoutData.gymProfileId || undefined },
        },
      }
    : {}

  const formattedLoggedWorkoutData: any = {
    ...loggedWorkoutData,
    originalWorkout: {
      connect: {
        id: originalWorkoutId || undefined,
      },
    },
    completedOn: new Date(loggedWorkoutData.completedOn),
    completedBy: {
      connect: {
        id: authedUserId,
      },
    },
    ...gymProfile,
    workoutType: {
      connect: { id: workoutTypeId || undefined },
    },
    workoutSections: buildWorkoutSectionsData(
      loggedWorkoutData.workoutSections,
    ),
  }

  // Prisma will not be expecting these fields and will error.
  delete formattedLoggedWorkoutData.originalWorkoutId
  delete formattedLoggedWorkoutData.workoutTypeId
  delete formattedLoggedWorkoutData.gymProfileId

  return formattedLoggedWorkoutData
}

function buildUpdateWorkoutData(workoutData: DeepUpdateWorkoutInput) {
  const workoutType = workoutData.workoutType
    ? {
        workoutType: { connect: { id: workoutData.workoutType } },
      }
    : {}

  return {
    ...workoutData,
    ...workoutType,
    workoutSections: buildWorkoutSectionsData(workoutData.workoutSections),
  }
}

function buildUpdateLoggedWorkoutData(
  loggedWorkoutData: DeepUpdateLoggedWorkoutInput,
) {
  // Format for when field is optional, empty object will be ignored.
  const completedOn = loggedWorkoutData.completedOn
    ? { completedOn: new Date(loggedWorkoutData.completedOn) }
    : {}

  const gymProfile = loggedWorkoutData.gymProfileId
    ? {
        gymProfile: {
          connect: { id: loggedWorkoutData.gymProfileId || undefined },
        },
      }
    : {}
  return {
    ...loggedWorkoutData,
    ...completedOn,
    ...gymProfile,
    workoutSections: buildWorkoutSectionsData(
      loggedWorkoutData.workoutSections,
    ),
  }
}

export function buildWorkoutSectionsData(
  workoutSections: Array<CreateWorkoutSectionInput>,
) {
  return workoutSections
    ? workoutSections.map((section) => ({
        ...section,
        workoutMoves: {
          create: section.workoutMoves
            ? section.workoutMoves.map((workoutMove) => ({
                ...workoutMove,
                selectedEquipment: {
                  // Can't pass null to prisma connect calls - must be undefined
                  connect: {
                    id: workoutMove.selectedEquipment || undefined,
                  },
                },
                move: {
                  // workoutMove.move is the String ID of the move.
                  connect: { id: workoutMove.move || undefined },
                },
              }))
            : [],
        },
      }))
    : []
}

export {
  deleteAllDescendents,
  buildUpdateWorkoutData,
  buildCreateLoggedWorkoutData,
  buildUpdateLoggedWorkoutData,
  WorkoutParentType,
}

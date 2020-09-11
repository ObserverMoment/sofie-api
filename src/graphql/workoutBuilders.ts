import { PrismaClient, WorkoutSection } from '@prisma/client'
import {
  CreateWorkoutInput,
  DeepUpdateWorkoutInput,
  CreateLoggedWorkoutInput,
  CreateWorkoutSectionInput,
  LoggedWorkout,
  Workout,
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

function buildCreateWorkoutData(
  authedUserId: string,
  workoutData: CreateWorkoutInput,
) {
  const workoutTypeId = workoutData.workoutTypeId

  const formattedWorkoutData: any = {
    ...workoutData,
    createdBy: { connect: { id: authedUserId } },
    workoutType: {
      connect: { id: workoutTypeId || undefined },
    },
    workoutSections: buildWorkoutSectionsData(workoutData.workoutSections),
  }

  delete formattedWorkoutData.workoutTypeId

  return formattedWorkoutData
}

function buildCreateLoggedWorkoutData(
  authedUserId: string,
  loggedWorkoutData: CreateLoggedWorkoutInput,
) {
  const originalWorkoutId = loggedWorkoutData.originalWorkoutId

  const workoutTypeId = loggedWorkoutData.workoutTypeId

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
    workoutType: {
      connect: { id: workoutTypeId || undefined },
    },
    workoutSections: buildWorkoutSectionsData(
      loggedWorkoutData.workoutSections,
    ),
  }

  delete formattedLoggedWorkoutData.originalWorkoutId
  delete formattedLoggedWorkoutData.workoutTypeId

  return formattedLoggedWorkoutData
}

function buildUpdateWorkoutData(workoutData: DeepUpdateWorkoutInput) {
  const workoutType = workoutData.workoutTypeId
    ? {
        workoutType: { connect: { id: workoutData.workoutTypeId } },
      }
    : {}

  delete workoutData.workoutTypeId
  return {
    ...workoutData,
    ...workoutType,
    workoutSections: buildWorkoutSectionsData(workoutData.workoutSections),
  }
}

function buildUpdateLoggedWorkoutData(
  loggedWorkoutData: DeepUpdateLoggedWorkoutInput,
) {
  const completedOn = loggedWorkoutData.completedOn
    ? { completedOn: new Date(loggedWorkoutData.completedOn) }
    : {}
  return {
    ...loggedWorkoutData,
    ...completedOn,
    workoutSections: buildWorkoutSectionsData(
      loggedWorkoutData.workoutSections,
    ),
  }
}

function buildWorkoutSectionsData(
  workoutSections: Array<CreateWorkoutSectionInput>,
) {
  return {
    create: [
      ...workoutSections.map((section) => ({
        ...section,
        workoutMoves: {
          create: [
            ...section.workoutMoves.map((workoutMove) => {
              const { selectedEquipmentId } = workoutMove
              const selectedEquipment = selectedEquipmentId
                ? {
                    connect: {
                      // Can't pass null to prisma connect calls - must be undefined
                      id: workoutMove.selectedEquipmentId || undefined,
                    },
                  }
                : undefined
              const workoutMoveData: any = {
                ...workoutMove,
                selectedEquipment,
                move: {
                  connect: { id: workoutMove.moveId || undefined },
                },
              }
              delete workoutMoveData.selectedEquipmentId
              delete workoutMoveData.moveId
              return workoutMoveData
            }),
          ],
        },
        roundAdjustRules: {
          create: section.roundAdjustRules,
        },
      })),
    ],
  }
}

export {
  deleteAllDescendents,
  buildCreateWorkoutData,
  buildUpdateWorkoutData,
  buildCreateLoggedWorkoutData,
  buildUpdateLoggedWorkoutData,
  WorkoutParentType,
}

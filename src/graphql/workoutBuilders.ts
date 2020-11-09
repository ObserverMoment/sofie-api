import { CreateWorkoutSectionInput } from '../generated/graphql'

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
                selectedEquipment: workoutMove.selectedEquipment
                  ? {
                      connect: {
                        id: workoutMove.selectedEquipment,
                      },
                    }
                  : undefined,
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

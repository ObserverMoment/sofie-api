import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  ForTimeMove,
  ForTimeSection,
  ForTimeWorkout,
  MutationCreateForTimeMoveArgs,
  MutationCreateForTimeSectionArgs,
  MutationCreateForTimeWorkoutArgs,
  MutationDeleteForTimeMoveArgs,
  MutationDeleteForTimeWorkoutArgs,
  MutationDuplicateForTimeMoveArgs,
  MutationDuplicateForTimeSectionArgs,
  MutationDuplicateForTimeWorkoutArgs,
  MutationUpdateForTimeMoveArgs,
  MutationUpdateForTimeSectionArgs,
  MutationUpdateForTimeWorkoutArgs,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  processStringListUpdateInputData,
} from '../../utils'

//// Mutations ////
//// ForTime Session ////
export const createForTimeWorkout = async (
  r: any,
  { data }: MutationCreateForTimeWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const forTimeWorkout = await prisma.$transaction(async (prisma) => {
    const forTimeWorkout = await prisma.forTimeWorkout.create({
      data: {
        name: data.name,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return forTimeWorkout
  })

  if (forTimeWorkout) {
    return forTimeWorkout as ForTimeWorkout
  } else {
    throw new ApolloError('createForTimeWorkout: There was an issue.')
  }
}

export const updateForTimeWorkout = async (
  r: any,
  { data }: MutationUpdateForTimeWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'forTimeWorkout', authedUserId, prisma)

  const updated = await prisma.forTimeWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      timecapSeconds: data.timecapSeconds || undefined,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as ForTimeWorkout
  } else {
    throw new ApolloError('updateForTimeWorkout: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateForTimeWorkout = async (
  r: any,
  { id }: MutationDuplicateForTimeWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeWorkout', authedUserId, prisma)

  // Get original full data
  const original = await prisma.forTimeWorkout.findUnique({
    where: { id },
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
  })

  if (!original) {
    throw new ApolloError('duplicateForTimeWorkout: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.forTimeWorkout.create({
      data: {
        name: original.name,
        note: original.note,
        repeats: original.repeats,
        timecapSeconds: original.timecapSeconds,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },

        ForTimeSections: {
          create: original.ForTimeSections.map((s) => ({
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
      },
      select,
    })

    return copy
  })

  if (copy) {
    return copy as ForTimeWorkout
  } else {
    throw new ApolloError('duplicateForTimeWorkout: There was an issue.')
  }
}

export const deleteForTimeWorkout = async (
  r: any,
  { id }: MutationDeleteForTimeWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeWorkout', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.forTimeWorkout.delete({
      where: { id },
      select: {
        id: true,
      },
    })

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteForTimeWorkout: There was an issue.`)
    throw new ApolloError('deleteForTimeWorkout: There was an issue.')
  }
}

//// ForTime Section ////
export const createForTimeSection = async (
  r: any,
  { data }: MutationCreateForTimeSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ForTimeWorkout.id,
    'forTimeWorkout',
    authedUserId,
    prisma,
  )

  const forTimeSection = await prisma.$transaction(async (prisma) => {
    const forTimeSection = await prisma.forTimeSection.create({
      data: {
        ForTimeWorkout: {
          connect: data.ForTimeWorkout,
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return forTimeSection
  })

  if (forTimeSection) {
    return forTimeSection as ForTimeSection
  } else {
    throw new ApolloError('createForTimeSection: There was an issue.')
  }
}

export const updateForTimeSection = async (
  r: any,
  { data }: MutationUpdateForTimeSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'forTimeSection', authedUserId, prisma)

  const updated = await prisma.forTimeSection.update({
    where: { id: data.id },
    data: {
      ...data,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as ForTimeSection
  } else {
    throw new ApolloError('updateForTimeSection: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateForTimeSection = async (
  r: any,
  { id }: MutationDuplicateForTimeSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeSection', authedUserId, prisma)

  // Get original full data
  const original = await prisma.forTimeSection.findUnique({
    where: { id },
    include: {
      ForTimeWorkout: true,
      ForTimeMoves: {
        include: {
          Move: true,
          Equipment: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateForTimeSection: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.forTimeSection.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },
        ForTimeWorkout: { connect: { id: original.forTimeWorkoutId } },
        ForTimeMoves: {
          create: original.ForTimeMoves.map((m) => ({
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
      },
      select,
    })

    return copy
  })

  if (copy) {
    return copy as ForTimeSection
  } else {
    throw new ApolloError('duplicateForTimeSection: There was an issue.')
  }
}

export const deleteForTimeSection = async (
  r: any,
  { id }: MutationDeleteForTimeWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeSection', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.forTimeSection.delete({
      where: { id },
      select: {
        id: true,
        ForTimeWorkout: {
          select: { id: true, childrenOrder: true },
        },
      },
    })

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteForTimeSection: There was an issue.`)
    throw new ApolloError('deleteForTimeSection: There was an issue.')
  }
}

//// ForTime Move ////
export const createForTimeMove = async (
  r: any,
  { data }: MutationCreateForTimeMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.ForTimeSection.id,
    'forTimeSection',
    authedUserId,
    prisma,
  )

  const forTimeMove = await prisma.$transaction(async (prisma) => {
    const forTimeMove = await prisma.forTimeMove.create({
      data: {
        ForTimeSection: {
          connect: data.ForTimeSection,
        },
        Move: { connect: data.Move },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return forTimeMove
  })

  if (forTimeMove) {
    return forTimeMove as ForTimeMove
  } else {
    throw new ApolloError('createForTimeMove: There was an issue.')
  }
}

export const updateForTimeMove = async (
  r: any,
  { data }: MutationUpdateForTimeMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'forTimeMove', authedUserId, prisma)

  const updated = await prisma.forTimeMove.update({
    where: { id: data.id },
    data: {
      ...data,
      Move: data.Move ? { connect: data.Move } : undefined,
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
    },
    select,
  })

  if (updated) {
    return updated as ForTimeMove
  } else {
    throw new ApolloError('updateForTimeMove: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateForTimeMove = async (
  r: any,
  { id }: MutationDuplicateForTimeMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeMove', authedUserId, prisma)

  // Get original full data
  const original = await prisma.forTimeMove.findUnique({
    where: { id },
    include: {
      ForTimeSection: true,
      Move: true,
      Equipment: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateForTimeMove: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.forTimeMove.create({
      data: {
        note: original.note,
        ForTimeSection: { connect: { id: original.forTimeSectionId } },
        Move: {
          connect: { id: original.moveId },
        },
        Equipment: original.equipmentId
          ? { connect: { id: original.equipmentId } }
          : undefined,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return copy
  })

  if (copy) {
    return copy as ForTimeMove
  } else {
    throw new ApolloError('duplicateForTimeMove: There was an issue.')
  }
}

export const deleteForTimeMove = async (
  r: any,
  { id }: MutationDeleteForTimeMoveArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'forTimeMove', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.forTimeMove.delete({
      where: { id },
      select: {
        id: true,
        ForTimeSection: {
          select: {
            id: true,
            childrenOrder: true,
          },
        },
      },
    })

    return deleted
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteForTimeMove: There was an issue.`)
    throw new ApolloError('deleteForTimeMove: There was an issue.')
  }
}

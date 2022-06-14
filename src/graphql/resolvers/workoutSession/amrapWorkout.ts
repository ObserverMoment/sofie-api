import { ApolloError } from 'apollo-server-errors'
import { Context } from '../../..'
import {
  AmrapMove,
  AmrapSection,
  AmrapWorkout,
  MutationCreateAmrapMoveArgs,
  MutationCreateAmrapSectionArgs,
  MutationCreateAmrapWorkoutArgs,
  MutationDeleteAmrapMoveArgs,
  MutationDeleteAmrapWorkoutArgs,
  MutationDuplicateAmrapMoveArgs,
  MutationDuplicateAmrapSectionArgs,
  MutationDuplicateAmrapWorkoutArgs,
  MutationUpdateAmrapMoveArgs,
  MutationUpdateAmrapSectionArgs,
  MutationUpdateAmrapWorkoutArgs,
} from '../../../generated/graphql'
import {
  checkUserOwnsObject,
  processStringListUpdateInputData,
} from '../../utils'

//// Mutations ////
//// Amrap Session ////
export const createAmrapWorkout = async (
  r: any,
  { data }: MutationCreateAmrapWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const amrapWorkout = await prisma.$transaction(async (prisma) => {
    const amrapWorkout = await prisma.amrapWorkout.create({
      data: {
        name: data.name,
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })
    return amrapWorkout as AmrapWorkout
  })

  if (amrapWorkout) {
    return amrapWorkout as AmrapWorkout
  } else {
    throw new ApolloError('createAmrapWorkout: There was an issue.')
  }
}

export const updateAmrapWorkout = async (
  r: any,
  { data }: MutationUpdateAmrapWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'amrapWorkout', authedUserId, prisma)

  const updated = await prisma.amrapWorkout.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as AmrapWorkout
  } else {
    throw new ApolloError('updateAmrapWorkout: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateAmrapWorkout = async (
  r: any,
  { id }: MutationDuplicateAmrapWorkoutArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapWorkout', authedUserId, prisma)

  // Get original full data.
  const original = await prisma.amrapWorkout.findUnique({
    where: { id },
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
  })

  if (!original) {
    throw new ApolloError('duplicateAmrapWorkout: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.amrapWorkout.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },

        AmrapSections: {
          create: original.AmrapSections.map((s) => ({
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
      },
      select,
    })

    return copy
  })

  if (copy) {
    return copy as AmrapWorkout
  } else {
    throw new ApolloError('duplicateAmrapWorkout: There was an issue.')
  }
}

export const deleteAmrapWorkout = async (
  r: any,
  { id }: MutationDeleteAmrapWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapWorkout', authedUserId, prisma)

  const deleted = await prisma.amrapWorkout.delete({
    where: { id },
    select: {
      id: true,
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteAmrapWorkout: There was an issue.`)
    throw new ApolloError('deleteAmrapWorkout: There was an issue.')
  }
}

//// Amrap Section ////
export const createAmrapSection = async (
  r: any,
  { data }: MutationCreateAmrapSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.AmrapWorkout.id,
    'amrapWorkout',
    authedUserId,
    prisma,
  )

  const amrapSection = await prisma.$transaction(async (prisma) => {
    const amrapSection = await prisma.amrapSection.create({
      data: {
        AmrapWorkout: {
          connect: data.AmrapWorkout,
        },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return amrapSection
  })

  if (amrapSection) {
    return amrapSection as AmrapSection
  } else {
    throw new ApolloError('createAmrapSection: There was an issue.')
  }
}

export const updateAmrapSection = async (
  r: any,
  { data }: MutationUpdateAmrapSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'amrapSection', authedUserId, prisma)

  const updated = await prisma.amrapSection.update({
    where: { id: data.id },
    data: {
      ...data,
      childrenOrder: processStringListUpdateInputData(data, 'childrenOrder'),
    },
    select,
  })

  if (updated) {
    return updated as AmrapSection
  } else {
    throw new ApolloError('updateAmrapSection: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateAmrapSection = async (
  r: any,
  { id }: MutationDuplicateAmrapSectionArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapSection', authedUserId, prisma)

  // Get original full data
  const original = await prisma.amrapSection.findUnique({
    where: { id },
    include: {
      AmrapWorkout: true,
      AmrapMoves: {
        include: {
          Move: true,
          Equipment: true,
        },
      },
    },
  })

  if (!original) {
    throw new ApolloError('duplicateAmrapSection: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.amrapSection.create({
      data: {
        name: original.name,
        note: original.note,
        childrenOrder: original.childrenOrder,
        User: {
          connect: { id: authedUserId },
        },
        AmrapWorkout: { connect: { id: original.amrapWorkoutId } },
        AmrapMoves: {
          create: original.AmrapMoves.map((m) => ({
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
    return copy as AmrapSection
  } else {
    throw new ApolloError('duplicateAmrapSection: There was an issue.')
  }
}

export const deleteAmrapSection = async (
  r: any,
  { id }: MutationDeleteAmrapWorkoutArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapSection', authedUserId, prisma)

  const deleted = await prisma.amrapSection.delete({
    where: { id },
    select: {
      id: true,
      AmrapWorkout: {
        select: { id: true, childrenOrder: true },
      },
    },
  })

  if (deleted) {
    return deleted.id
  } else {
    console.error(`deleteAmrapSection: There was an issue.`)
    throw new ApolloError('deleteAmrapSection: There was an issue.')
  }
}

//// Amrap Move ////
export const createAmrapMove = async (
  r: any,
  { data }: MutationCreateAmrapMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(
    data.AmrapSection.id,
    'amrapSection',
    authedUserId,
    prisma,
  )

  const amrapMove = await prisma.$transaction(async (prisma) => {
    const amrapMove = await prisma.amrapMove.create({
      data: {
        AmrapSection: {
          connect: data.AmrapSection,
        },
        Move: { connect: data.Move },
        User: {
          connect: { id: authedUserId },
        },
      },
      select,
    })

    return amrapMove
  })

  if (amrapMove) {
    return amrapMove as AmrapMove
  } else {
    throw new ApolloError('createAmrapMove: There was an issue.')
  }
}

export const updateAmrapMove = async (
  r: any,
  { data }: MutationUpdateAmrapMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'amrapMove', authedUserId, prisma)

  const updated = await prisma.amrapMove.update({
    where: { id: data.id },
    data: {
      ...data,
      Move: data.Move ? { connect: data.Move } : undefined,
      Equipment: data.Equipment ? { connect: data.Equipment } : undefined,
    },
    select,
  })

  if (updated) {
    return updated as AmrapMove
  } else {
    throw new ApolloError('updateAmrapMove: There was an issue.')
  }
}

// Makes a full copy of the object and returns it.
// Functionality is only available on objects that the user owns.
export const duplicateAmrapMove = async (
  r: any,
  { id }: MutationDuplicateAmrapMoveArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapMove', authedUserId, prisma)

  // Get original full data
  const original = await prisma.amrapMove.findUnique({
    where: { id },
    include: {
      AmrapSection: true,
      Move: true,
      Equipment: true,
    },
  })

  if (!original) {
    throw new ApolloError('duplicateAmrapMove: Could not retrieve data.')
  }

  const copy = await prisma.$transaction(async (prisma) => {
    // Create a new copy.
    const copy = await prisma.amrapMove.create({
      data: {
        note: original.note,
        AmrapSection: { connect: { id: original.amrapSectionId } },
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
    return copy as AmrapMove
  } else {
    throw new ApolloError('duplicateAmrapMove: There was an issue.')
  }
}

export const deleteAmrapMove = async (
  r: any,
  { id }: MutationDeleteAmrapMoveArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'amrapMove', authedUserId, prisma)

  const deleted = await prisma.$transaction(async (prisma) => {
    const deleted = await prisma.amrapMove.delete({
      where: { id },
      select: {
        id: true,
        AmrapSection: {
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
    console.error(`deleteAmrapMove: There was an issue.`)
    throw new ApolloError('deleteAmrapMove: There was an issue.')
  }
}

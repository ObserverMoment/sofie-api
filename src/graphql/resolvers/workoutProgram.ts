import { Context } from '../..'
import { QueryPrivateWorkoutProgramsArgs } from '../../generated/graphql'

//// Queries
const officialWorkoutPrograms = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: { scope: 'OFFICIAL' },
    select,
  })

const publicWorkoutPrograms = async (
  r: any,
  a: any,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: { scope: 'PUBLIC' },
    select,
  })

const privateWorkoutPrograms = async (
  r: any,
  { authedUserId }: QueryPrivateWorkoutProgramsArgs,
  { prisma, select }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: {
      scope: 'PRIVATE',
      createdById: authedUserId,
    },
    select,
  })

//// Mutations
// const createWorkoutProgram = async (
//   r: any,
//   { authedUserId, data }: any,
//   { prisma, select }: Context,
// ) => {
//   return prisma.workoutProgram.create({
//     data: {
//       name: 'hello',
//       description: 'hi',
//       createdBy: {
//         connect: { id: authedUserId },
//       },
//       workoutGoals: {
//         connect: data.workoutGoalIds.map((id) => ({ id })),
//       },
//       programWorkouts: {
//         create: data.programWorkouts.map((pw) => ({
//           dayNumber: pw.dayNumber,
//           notes: pw.notes,
//           workout: {
//             connect: { id: pw.workoutId },
//           },
//         })),
//       },
//     },
//     select,
//   })
// }

export {
  officialWorkoutPrograms,
  publicWorkoutPrograms,
  privateWorkoutPrograms,
}

// import { ApolloError } from 'apollo-server-errors'
// import { Context } from '../../..'
// import {
//   MutationAddWorkoutPlanToClubArgs,
//   MutationAddWorkoutToClubArgs,
//   MutationRemoveWorkoutFromClubArgs,
//   MutationRemoveWorkoutPlanFromClubArgs,
//   QueryClubWorkoutPlansArgs,
//   QueryClubWorkoutsArgs,
// } from '../../../generated/graphql'
// import { checkUserOwnsObject } from '../../utils'
// import {
//   selectForWorkoutPlanSummary,
//   selectForWorkoutSummary,
// } from '../selectDefinitions'
// import { formatWorkoutSummaries } from '../workout/utils'
// import { formatWorkoutPlanSummaries } from '../workoutPlan/utils'
// import { checkUserIsMemberOfClub, checkUserIsOwnerOrAdminOfClub } from './utils'

// ////// Queries ////////
// export const clubWorkouts = async (
//   r: any,
//   { clubId }: QueryClubWorkoutsArgs,
//   { authedUserId, prisma }: Context,
// ) => {
//   // Check that user is a member.
//   await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

//   const club = await prisma.club.findUnique({
//     where: { id: clubId },
//     select: {
//       Workouts: {
//         select: selectForWorkoutSummary,
//       },
//     },
//   })

//   if (!club) {
//     throw new ApolloError(
//       `clubWorkouts: Unable to retrieve data for club ${clubId}.`,
//     )
//   } else {
//     return { id: clubId, workouts: formatWorkoutSummaries(club.Workouts) }
//   }
// }

// export const clubWorkoutPlans = async (
//   r: any,
//   { clubId }: QueryClubWorkoutPlansArgs,
//   { authedUserId, prisma }: Context,
// ) => {
//   // Check that user is a member.
//   await checkUserIsMemberOfClub(clubId, authedUserId, prisma)

//   const club = await prisma.club.findUnique({
//     where: { id: clubId },
//     select: {
//       WorkoutPlans: {
//         select: selectForWorkoutPlanSummary,
//       },
//     },
//   })

//   if (!club) {
//     throw new ApolloError(
//       `clubWorkoutPlans: Unable to retrieve data for club ${clubId}.`,
//     )
//   } else {
//     return {
//       id: clubId,
//       workoutPlans: formatWorkoutPlanSummaries(club.WorkoutPlans),
//     }
//   }
// }

// ////// Mutations ///////
// export const addWorkoutToClub = async (
//   r: any,
//   { workoutId, clubId }: MutationAddWorkoutToClubArgs,
//   { authedUserId, prisma }: Context,
// ) => {
//   await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
//   await checkUserOwnsObject(workoutId, 'workout', authedUserId, prisma)

//   const updated = await prisma.club.update({
//     where: { id: clubId },
//     data: {
//       Workouts: {
//         connect: { id: workoutId },
//       },
//     },
//     select: {
//       Workouts: {
//         select: selectForWorkoutSummary,
//       },
//     },
//   })

//   if (updated) {
//     return { id: clubId, workouts: formatWorkoutSummaries(updated.Workouts) }
//   } else {
//     throw new ApolloError('addWorkoutToClub: There was an issue.')
//   }
// }

// export const removeWorkoutFromClub = async (
//   r: any,
//   { workoutId, clubId }: MutationRemoveWorkoutFromClubArgs,
//   { authedUserId, prisma }: Context,
// ) => {
//   await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
//   await checkUserOwnsObject(workoutId, 'workout', authedUserId, prisma)

//   const updated = await prisma.club.update({
//     where: { id: clubId },
//     data: {
//       Workouts: {
//         disconnect: { id: workoutId },
//       },
//     },
//     select: {
//       Workouts: {
//         select: selectForWorkoutSummary,
//       },
//     },
//   })

//   if (updated) {
//     return { id: clubId, workouts: formatWorkoutSummaries(updated.Workouts) }
//   } else {
//     throw new ApolloError('removeWorkoutFromClub: There was an issue.')
//   }
// }

// export const addWorkoutPlanToClub = async (
//   r: any,
//   { workoutPlanId, clubId }: MutationAddWorkoutPlanToClubArgs,
//   { authedUserId, prisma }: Context,
// ) => {
//   await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
//   await checkUserOwnsObject(workoutPlanId, 'workoutPlan', authedUserId, prisma)

//   const updated = await prisma.club.update({
//     where: { id: clubId },
//     data: {
//       WorkoutPlans: {
//         connect: { id: workoutPlanId },
//       },
//     },
//     select: {
//       WorkoutPlans: {
//         select: selectForWorkoutPlanSummary,
//       },
//     },
//   })

//   if (updated) {
//     return {
//       id: clubId,
//       workoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
//     }
//   } else {
//     throw new ApolloError('addWorkoutPlanToClub: There was an issue.')
//   }
// }

// export const removeWorkoutPlanFromClub = async (
//   r: any,
//   { workoutPlanId, clubId }: MutationRemoveWorkoutPlanFromClubArgs,
//   { authedUserId, prisma }: Context,
// ) => {
//   await checkUserIsOwnerOrAdminOfClub(clubId, authedUserId, prisma)
//   await checkUserOwnsObject(workoutPlanId, 'workoutPlan', authedUserId, prisma)

//   const updated = await prisma.club.update({
//     where: { id: clubId },
//     data: {
//       WorkoutPlans: {
//         disconnect: { id: workoutPlanId },
//       },
//     },
//     select: {
//       WorkoutPlans: {
//         select: selectForWorkoutPlanSummary,
//       },
//     },
//   })

//   if (updated) {
//     return {
//       id: clubId,
//       workoutPlans: formatWorkoutPlanSummaries(updated.WorkoutPlans),
//     }
//   } else {
//     throw new ApolloError('removeWorkoutPlanFromClub: There was an issue.')
//   }
// }

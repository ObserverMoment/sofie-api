import { Context } from '../..'
import {
  QueryTextSearchCreatorsArgs,
  QueryTextSearchWorkoutProgramsArgs,
  QueryTextSearchWorkoutsArgs,
} from '../../generated/graphql'

const textSearchWorkouts = async (
  r: any,
  { text }: QueryTextSearchWorkoutsArgs,
  { select, prisma }: Context,
) =>
  prisma.workout.findMany({
    where: {
      NOT: {
        scope: 'PRIVATE',
      },
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })

const textSearchWorkoutPrograms = async (
  r: any,
  { text }: QueryTextSearchWorkoutProgramsArgs,
  { select, prisma }: Context,
) =>
  prisma.workoutProgram.findMany({
    where: {
      NOT: {
        scope: 'PRIVATE',
      },
      name: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })

const textSearchCreators = async (
  r: any,
  { text }: QueryTextSearchCreatorsArgs,
  { select, prisma }: Context,
) =>
  prisma.user.findMany({
    where: {
      userProfileScope: 'PUBLIC',
      displayName: {
        contains: text,
        mode: 'insensitive',
      },
    },
    select,
  })

export { textSearchWorkouts, textSearchWorkoutPrograms, textSearchCreators }

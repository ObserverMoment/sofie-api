import { QueryLoggedWorkoutsArgs } from '../../generated/graphql'
import { Context } from '../../types'

const loggedWorkouts = async (
  r: any,
  { authedUserId }: QueryLoggedWorkoutsArgs,
  { select, prisma }: Context,
) =>
  prisma.loggedWorkout.findMany({
    where: {
      completedBy: { id: authedUserId },
    },
    select,
  })

export { loggedWorkouts }

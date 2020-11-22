import { BatchPayload, PrismaClient } from '@prisma/client'

async function workoutCascadeDeletes(prisma: PrismaClient, workoutId: string) {
  // Delete LikedWorkouts
  await prisma.likedWorkout.deleteMany({
    where: {
      workoutId,
    },
  })

  // Delete ScheduledWorkouts
  await prisma.scheduledWorkout.deleteMany({
    where: {
      workoutId,
    },
  })
}

export { workoutCascadeDeletes }

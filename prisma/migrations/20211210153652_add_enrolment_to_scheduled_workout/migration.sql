-- AlterTable
ALTER TABLE "ScheduledWorkout" ADD COLUMN     "workoutPlanDayWorkoutId" TEXT;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_workoutPlanDayWorkoutId_fkey" FOREIGN KEY ("workoutPlanDayWorkoutId") REFERENCES "WorkoutPlanDayWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

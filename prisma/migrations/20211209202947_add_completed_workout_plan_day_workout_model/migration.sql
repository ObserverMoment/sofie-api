/*
  Warnings:

  - You are about to drop the column `completedPlanDayWorkoutIds` on the `WorkoutPlanEnrolment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlanEnrolment" DROP COLUMN "completedPlanDayWorkoutIds",
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "startDate" DROP DEFAULT;

-- CreateTable
CREATE TABLE "CompletedWorkoutPlanDayWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutPlanDayWorkoutId" TEXT NOT NULL,
    "loggedWorkoutId" TEXT,
    "workoutPlanEnrolmentId" TEXT NOT NULL,

    CONSTRAINT "CompletedWorkoutPlanDayWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompletedWorkoutPlanDayWorkout_loggedWorkoutId_key" ON "CompletedWorkoutPlanDayWorkout"("loggedWorkoutId");

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" ADD CONSTRAINT "CompletedWorkoutPlanDayWorkout_workoutPlanDayWorkoutId_fkey" FOREIGN KEY ("workoutPlanDayWorkoutId") REFERENCES "WorkoutPlanDayWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" ADD CONSTRAINT "CompletedWorkoutPlanDayWorkout_loggedWorkoutId_fkey" FOREIGN KEY ("loggedWorkoutId") REFERENCES "LoggedWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPlanDayWorkout" ADD CONSTRAINT "CompletedWorkoutPlanDayWorkout_workoutPlanEnrolmentId_fkey" FOREIGN KEY ("workoutPlanEnrolmentId") REFERENCES "WorkoutPlanEnrolment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

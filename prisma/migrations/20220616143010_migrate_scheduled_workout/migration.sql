/*
  Warnings:

  - You are about to drop the column `workoutId` on the `ScheduledWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `trainingPlanId` on the `WorkoutTag` table. All the data in the column will be lost.
  - You are about to drop the `LoggedWorkoutWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduledWorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlanDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlanEnrolment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlanReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClubToTrainingPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToTrainingPlan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[scheduledWorkoutId]` on the table `LoggedWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LoggedWorkoutWorkout" DROP CONSTRAINT "LoggedWorkoutWorkout_gymProfileId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutWorkout" DROP CONSTRAINT "LoggedWorkoutWorkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkout" DROP CONSTRAINT "ScheduledWorkout_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_cardioWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_gymProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_resistanceWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlan" DROP CONSTRAINT "TrainingPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanDay" DROP CONSTRAINT "TrainingPlanDay_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanDay" DROP CONSTRAINT "TrainingPlanDay_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanEnrolment" DROP CONSTRAINT "TrainingPlanEnrolment_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanEnrolment" DROP CONSTRAINT "TrainingPlanEnrolment_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanReview" DROP CONSTRAINT "TrainingPlanReview_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanReview" DROP CONSTRAINT "TrainingPlanReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutTag" DROP CONSTRAINT "WorkoutTag_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToTrainingPlan" DROP CONSTRAINT "_ClubToTrainingPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToTrainingPlan" DROP CONSTRAINT "_ClubToTrainingPlan_B_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToTrainingPlan" DROP CONSTRAINT "_CollectionToTrainingPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToTrainingPlan" DROP CONSTRAINT "_CollectionToTrainingPlan_B_fkey";

-- AlterTable
ALTER TABLE "LoggedWorkout" ADD COLUMN     "scheduledWorkoutId" TEXT;

-- AlterTable
ALTER TABLE "ScheduledWorkout" DROP COLUMN "workoutId",
ADD COLUMN     "cardioWorkoutId" TEXT,
ADD COLUMN     "resistanceWorkoutId" TEXT;

-- AlterTable
ALTER TABLE "WorkoutTag" DROP COLUMN "trainingPlanId";

-- DropTable
DROP TABLE "LoggedWorkoutWorkout";

-- DropTable
DROP TABLE "ScheduledWorkoutSession";

-- DropTable
DROP TABLE "TrainingPlan";

-- DropTable
DROP TABLE "TrainingPlanDay";

-- DropTable
DROP TABLE "TrainingPlanEnrolment";

-- DropTable
DROP TABLE "TrainingPlanReview";

-- DropTable
DROP TABLE "_ClubToTrainingPlan";

-- DropTable
DROP TABLE "_CollectionToTrainingPlan";

-- CreateIndex
CREATE UNIQUE INDEX "LoggedWorkout_scheduledWorkoutId_key" ON "LoggedWorkout"("scheduledWorkoutId");

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_cardioWorkoutId_fkey" FOREIGN KEY ("cardioWorkoutId") REFERENCES "CardioWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_resistanceWorkoutId_fkey" FOREIGN KEY ("resistanceWorkoutId") REFERENCES "ResistanceWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

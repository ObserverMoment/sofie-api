/*
  Warnings:

  - You are about to drop the column `workoutSessionId` on the `AmrapSession` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `CardioSession` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `ForTimeSession` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `IntervalSession` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `LoggedWorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `MobilitySession` table. All the data in the column will be lost.
  - You are about to drop the column `workoutSessionId` on the `ResistanceSession` table. All the data in the column will be lost.
  - You are about to drop the `CompletedTrainingPlanDayWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduledWorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlanDayWorkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClubToWorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToWorkoutSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AmrapSession" DROP CONSTRAINT "AmrapSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CardioSession" DROP CONSTRAINT "CardioSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTrainingPlanDayWorkout" DROP CONSTRAINT "CompletedTrainingPlanDayWorkout_loggedWorkoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTrainingPlanDayWorkout" DROP CONSTRAINT "CompletedTrainingPlanDayWorkout_trainingPlanDayWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTrainingPlanDayWorkout" DROP CONSTRAINT "CompletedTrainingPlanDayWorkout_trainingPlanEnrolmentId_fkey";

-- DropForeignKey
ALTER TABLE "ForTimeSession" DROP CONSTRAINT "ForTimeSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IntervalSession" DROP CONSTRAINT "IntervalSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutSession" DROP CONSTRAINT "LoggedWorkoutSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "MobilitySession" DROP CONSTRAINT "MobilitySession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceSession" DROP CONSTRAINT "ResistanceSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_gymProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_loggedWorkoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_trainingPlanDayWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_trainingPlanEnrolmentId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledWorkoutSession" DROP CONSTRAINT "ScheduledWorkoutSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanDayWorkout" DROP CONSTRAINT "TrainingPlanDayWorkout_trainingPlanDayId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanDayWorkout" DROP CONSTRAINT "TrainingPlanDayWorkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlanDayWorkout" DROP CONSTRAINT "TrainingPlanDayWorkout_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToWorkoutSession" DROP CONSTRAINT "_ClubToWorkoutSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToWorkoutSession" DROP CONSTRAINT "_ClubToWorkoutSession_B_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToWorkoutSession" DROP CONSTRAINT "_CollectionToWorkoutSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToWorkoutSession" DROP CONSTRAINT "_CollectionToWorkoutSession_B_fkey";

-- AlterTable
ALTER TABLE "AmrapSession" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "CardioSession" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "ForTimeSession" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "IntervalSession" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "LoggedWorkoutSession" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "MobilitySession" DROP COLUMN "workoutSessionId";

-- AlterTable
ALTER TABLE "ResistanceSession" DROP COLUMN "workoutSessionId";

-- DropTable
DROP TABLE "CompletedTrainingPlanDayWorkout";

-- DropTable
DROP TABLE "ScheduledWorkoutSession";

-- DropTable
DROP TABLE "TrainingPlanDayWorkout";

-- DropTable
DROP TABLE "WorkoutSession";

-- DropTable
DROP TABLE "_ClubToWorkoutSession";

-- DropTable
DROP TABLE "_CollectionToWorkoutSession";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "objects" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

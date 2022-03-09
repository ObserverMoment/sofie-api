/*
  Warnings:

  - You are about to drop the column `scoreUnit` on the `FitnessBenchmark` table. All the data in the column will be lost.
  - You are about to drop the column `standardFitnessTestCategoryId` on the `FitnessBenchmark` table. All the data in the column will be lost.
  - You are about to drop the `FitnessBenchmarkUserScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFastestTimeExerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFastestTimeTrackerManualEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMaxLoadExerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMaxLoadTrackerManualEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMaxUnbrokenExerciseTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMaxUnbrokenTrackerManualEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fitnessBenchmarkCategoryId` to the `FitnessBenchmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `FitnessBenchmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `FitnessBenchmark` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FitnessBenchmarkScope" AS ENUM ('STANDARD', 'CUSTOM');

-- CreateEnum
CREATE TYPE "FitnessBenchmarkScoreType" AS ENUM ('FASTESTTIMEDISTANCE', 'FASTESTTIMEREPS', 'LONGESTDISTANCE', 'MAXLOAD', 'TIMEDMAXREPS', 'UNBROKENMAXREPS', 'UNBROKENMAXTIME');

-- CreateEnum
CREATE TYPE "FitnessBenchmarkWorkoutScoreType" AS ENUM ('AMRAP', 'FORTIME');

-- DropForeignKey
ALTER TABLE "FitnessBenchmark" DROP CONSTRAINT "FitnessBenchmark_standardFitnessTestCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkUserScore" DROP CONSTRAINT "FitnessBenchmarkUserScore_standardFitnessTestId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkUserScore" DROP CONSTRAINT "FitnessBenchmarkUserScore_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFastestTimeExerciseTracker" DROP CONSTRAINT "UserFastestTimeExerciseTracker_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserFastestTimeExerciseTracker" DROP CONSTRAINT "UserFastestTimeExerciseTracker_moveId_fkey";

-- DropForeignKey
ALTER TABLE "UserFastestTimeExerciseTracker" DROP CONSTRAINT "UserFastestTimeExerciseTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFastestTimeTrackerManualEntry" DROP CONSTRAINT "UserFastestTimeTrackerManualEntry_userFastestTimeExerciseT_fkey";

-- DropForeignKey
ALTER TABLE "UserFastestTimeTrackerManualEntry" DROP CONSTRAINT "UserFastestTimeTrackerManualEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxLoadExerciseTracker" DROP CONSTRAINT "UserMaxLoadExerciseTracker_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxLoadExerciseTracker" DROP CONSTRAINT "UserMaxLoadExerciseTracker_moveId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxLoadExerciseTracker" DROP CONSTRAINT "UserMaxLoadExerciseTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxLoadTrackerManualEntry" DROP CONSTRAINT "UserMaxLoadTrackerManualEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxLoadTrackerManualEntry" DROP CONSTRAINT "UserMaxLoadTrackerManualEntry_userMaxLoadExerciseTrackerId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxUnbrokenExerciseTracker" DROP CONSTRAINT "UserMaxUnbrokenExerciseTracker_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxUnbrokenExerciseTracker" DROP CONSTRAINT "UserMaxUnbrokenExerciseTracker_moveId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxUnbrokenExerciseTracker" DROP CONSTRAINT "UserMaxUnbrokenExerciseTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxUnbrokenTrackerManualEntry" DROP CONSTRAINT "UserMaxUnbrokenTrackerManualEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMaxUnbrokenTrackerManualEntry" DROP CONSTRAINT "UserMaxUnbrokenTrackerManualEntry_userMaxUnbrokenExerciseT_fkey";

-- AlterTable
ALTER TABLE "FitnessBenchmark" DROP COLUMN "scoreUnit",
DROP COLUMN "standardFitnessTestCategoryId",
ADD COLUMN     "fitnessBenchmarkCategoryId" TEXT NOT NULL,
ADD COLUMN     "instructionalVideoThumbUri" TEXT,
ADD COLUMN     "scope" "FitnessBenchmarkScope" NOT NULL,
ADD COLUMN     "type" "FitnessBenchmarkScoreType" NOT NULL,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "FitnessBenchmarkUserScore";

-- DropTable
DROP TABLE "UserFastestTimeExerciseTracker";

-- DropTable
DROP TABLE "UserFastestTimeTrackerManualEntry";

-- DropTable
DROP TABLE "UserMaxLoadExerciseTracker";

-- DropTable
DROP TABLE "UserMaxLoadTrackerManualEntry";

-- DropTable
DROP TABLE "UserMaxUnbrokenExerciseTracker";

-- DropTable
DROP TABLE "UserMaxUnbrokenTrackerManualEntry";

-- DropEnum
DROP TYPE "FitnessBenchmarkScoreUnit";

-- CreateTable
CREATE TABLE "FitnessBenchmarkScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "userId" TEXT NOT NULL,
    "fitnessBenchmarkId" TEXT NOT NULL,

    CONSTRAINT "FitnessBenchmarkScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitnessBenchmarkWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scope" "FitnessBenchmarkScope" NOT NULL,
    "type" "FitnessBenchmarkWorkoutScoreType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructions" TEXT,
    "instructionalVideoUri" TEXT,
    "instructionalVideoThumbUri" TEXT,
    "rounds" INTEGER NOT NULL DEFAULT 1,
    "moveDescriptions" TEXT[],
    "pointsForMoveCompleted" INTEGER[],
    "userId" TEXT,

    CONSTRAINT "FitnessBenchmarkWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitnessBenchmarkWorkoutScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "fitnessBenchmarkWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FitnessBenchmarkWorkoutScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExerciseLoadTracker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,

    CONSTRAINT "UserExerciseLoadTracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FitnessBenchmark" ADD CONSTRAINT "FitnessBenchmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmark" ADD CONSTRAINT "FitnessBenchmark_fitnessBenchmarkCategoryId_fkey" FOREIGN KEY ("fitnessBenchmarkCategoryId") REFERENCES "FitnessBenchmarkCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkScore" ADD CONSTRAINT "FitnessBenchmarkScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkScore" ADD CONSTRAINT "FitnessBenchmarkScore_fitnessBenchmarkId_fkey" FOREIGN KEY ("fitnessBenchmarkId") REFERENCES "FitnessBenchmark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkWorkout" ADD CONSTRAINT "FitnessBenchmarkWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkWorkoutScore" ADD CONSTRAINT "FitnessBenchmarkWorkoutScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkWorkoutScore" ADD CONSTRAINT "FitnessBenchmarkWorkoutScore_fitnessBenchmarkWorkoutId_fkey" FOREIGN KEY ("fitnessBenchmarkWorkoutId") REFERENCES "FitnessBenchmarkWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseLoadTracker" ADD CONSTRAINT "UserExerciseLoadTracker_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseLoadTracker" ADD CONSTRAINT "UserExerciseLoadTracker_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseLoadTracker" ADD CONSTRAINT "UserExerciseLoadTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `UserBenchmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBenchmarkEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FitnessBenchmarkScoreUnit" AS ENUM ('TIMEMAX', 'TIMEMIN', 'DISTANCE', 'REPS', 'LOAD');

-- DropForeignKey
ALTER TABLE "UserBenchmark" DROP CONSTRAINT "UserBenchmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBenchmarkEntry" DROP CONSTRAINT "UserBenchmarkEntry_userBenchmarkId_fkey";

-- DropForeignKey
ALTER TABLE "UserBenchmarkEntry" DROP CONSTRAINT "UserBenchmarkEntry_userId_fkey";

-- DropTable
DROP TABLE "UserBenchmark";

-- DropTable
DROP TABLE "UserBenchmarkEntry";

-- CreateTable
CREATE TABLE "FitnessBenchmarkCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "FitnessBenchmarkCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitnessBenchmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructions" TEXT,
    "instructionalVideoUri" TEXT,
    "scoreUnit" "FitnessBenchmarkScoreUnit" NOT NULL,
    "standardFitnessTestCategoryId" TEXT NOT NULL,

    CONSTRAINT "FitnessBenchmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitnessBenchmarkUserScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "standardFitnessTestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FitnessBenchmarkUserScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FitnessBenchmark" ADD CONSTRAINT "FitnessBenchmark_standardFitnessTestCategoryId_fkey" FOREIGN KEY ("standardFitnessTestCategoryId") REFERENCES "FitnessBenchmarkCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkUserScore" ADD CONSTRAINT "FitnessBenchmarkUserScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkUserScore" ADD CONSTRAINT "FitnessBenchmarkUserScore_standardFitnessTestId_fkey" FOREIGN KEY ("standardFitnessTestId") REFERENCES "FitnessBenchmark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

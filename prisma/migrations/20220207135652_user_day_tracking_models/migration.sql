/*
  Warnings:

  - You are about to drop the `JournalGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JournalMood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JournalNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserDayLogRating" AS ENUM ('GOOD', 'AVERAGE', 'BAD');

-- DropForeignKey
ALTER TABLE "JournalGoal" DROP CONSTRAINT "JournalGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "JournalMood" DROP CONSTRAINT "JournalMood_userId_fkey";

-- DropForeignKey
ALTER TABLE "JournalNote" DROP CONSTRAINT "JournalNote_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "holidayDayAssigned" INTEGER[],
ADD COLUMN     "streakTrackingStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "workoutsPerWeekTarget" INTEGER NOT NULL DEFAULT 3;

-- DropTable
DROP TABLE "JournalGoal";

-- DropTable
DROP TABLE "JournalMood";

-- DropTable
DROP TABLE "JournalNote";

-- CreateTable
CREATE TABLE "UserDayLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayNumber" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "eatWell" "UserDayLogRating",
    "sleepWell" "UserDayLogRating",
    "meditationMinutes" INTEGER NOT NULL DEFAULT 0,
    "stretchingMinutes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserDayLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDayLogMood" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moodScore" INTEGER NOT NULL,
    "energyScore" INTEGER NOT NULL,
    "tags" TEXT[],
    "textNote" TEXT,
    "userDayLogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDayLogMood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDayLog_dayNumber_userId_key" ON "UserDayLog"("dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDayLogMood_userDayLogId_key" ON "UserDayLogMood"("userDayLogId");

-- AddForeignKey
ALTER TABLE "UserDayLog" ADD CONSTRAINT "UserDayLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDayLogMood" ADD CONSTRAINT "UserDayLogMood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDayLogMood" ADD CONSTRAINT "UserDayLogMood_userDayLogId_fkey" FOREIGN KEY ("userDayLogId") REFERENCES "UserDayLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

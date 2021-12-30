/*
  Warnings:

  - You are about to drop the `ProgressJournal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgressJournalEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgressJournalGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProgressJournalGoalTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBenchmarkTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProgressJournalGoalToProgressJournalGoalTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserBenchmarkToUserBenchmarkTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgressJournal" DROP CONSTRAINT "ProgressJournal_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressJournalEntry" DROP CONSTRAINT "ProgressJournalEntry_progressJournalId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressJournalEntry" DROP CONSTRAINT "ProgressJournalEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressJournalGoal" DROP CONSTRAINT "ProgressJournalGoal_progressJournalId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressJournalGoal" DROP CONSTRAINT "ProgressJournalGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressJournalGoalTag" DROP CONSTRAINT "ProgressJournalGoalTag_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBenchmarkTag" DROP CONSTRAINT "UserBenchmarkTag_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProgressJournalGoalToProgressJournalGoalTag" DROP CONSTRAINT "_ProgressJournalGoalToProgressJournalGoalTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgressJournalGoalToProgressJournalGoalTag" DROP CONSTRAINT "_ProgressJournalGoalToProgressJournalGoalTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserBenchmarkToUserBenchmarkTag" DROP CONSTRAINT "_UserBenchmarkToUserBenchmarkTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBenchmarkToUserBenchmarkTag" DROP CONSTRAINT "_UserBenchmarkToUserBenchmarkTag_B_fkey";

-- DropTable
DROP TABLE "ProgressJournal";

-- DropTable
DROP TABLE "ProgressJournalEntry";

-- DropTable
DROP TABLE "ProgressJournalGoal";

-- DropTable
DROP TABLE "ProgressJournalGoalTag";

-- DropTable
DROP TABLE "UserBenchmarkTag";

-- DropTable
DROP TABLE "_ProgressJournalGoalToProgressJournalGoalTag";

-- DropTable
DROP TABLE "_UserBenchmarkToUserBenchmarkTag";

-- CreateTable
CREATE TABLE "JournalNote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voiceNoteUri" TEXT,
    "textNote" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JournalNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalMood" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moodScore" DOUBLE PRECISION,
    "energyScore" DOUBLE PRECISION,
    "motivationScore" DOUBLE PRECISION,
    "confidenceScore" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JournalMood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "JournalGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JournalNote" ADD CONSTRAINT "JournalNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalMood" ADD CONSTRAINT "JournalMood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalGoal" ADD CONSTRAINT "JournalGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

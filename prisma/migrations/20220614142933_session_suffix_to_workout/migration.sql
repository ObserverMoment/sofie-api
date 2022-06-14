/*
  Warnings:

  - You are about to drop the column `amrapSessionId` on the `AmrapSection` table. All the data in the column will be lost.
  - You are about to drop the column `cardioSessionId` on the `CardioExercise` table. All the data in the column will be lost.
  - You are about to drop the column `forTimeSessionId` on the `ForTimeSection` table. All the data in the column will be lost.
  - You are about to drop the column `intervalSessionId` on the `IntervalExercise` table. All the data in the column will be lost.
  - You are about to drop the column `resistanceSessionId` on the `ResistanceExercise` table. All the data in the column will be lost.
  - You are about to drop the `AmrapSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardioSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForTimeSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IntervalSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoggedWorkoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MobilitySession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResistanceSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedAmrapSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedCardioSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedForTimeSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedIntervalSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedMobilitySession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedResistanceSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MobilityMoveToMobilitySession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amrapWorkoutId` to the `AmrapSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardioWorkoutId` to the `CardioExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forTimeWorkoutId` to the `ForTimeSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intervalWorkoutId` to the `IntervalExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resistanceWorkoutId` to the `ResistanceExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AmrapSection" DROP CONSTRAINT "AmrapSection_amrapSessionId_fkey";

-- DropForeignKey
ALTER TABLE "AmrapSession" DROP CONSTRAINT "AmrapSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "CardioExercise" DROP CONSTRAINT "CardioExercise_cardioSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CardioSession" DROP CONSTRAINT "CardioSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "ForTimeSection" DROP CONSTRAINT "ForTimeSection_forTimeSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ForTimeSession" DROP CONSTRAINT "ForTimeSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "IntervalExercise" DROP CONSTRAINT "IntervalExercise_intervalSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IntervalSession" DROP CONSTRAINT "IntervalSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutSession" DROP CONSTRAINT "LoggedWorkoutSession_gymProfileId_fkey";

-- DropForeignKey
ALTER TABLE "LoggedWorkoutSession" DROP CONSTRAINT "LoggedWorkoutSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "MobilitySession" DROP CONSTRAINT "MobilitySession_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceExercise" DROP CONSTRAINT "ResistanceExercise_resistanceSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceSession" DROP CONSTRAINT "ResistanceSession_clubId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceSession" DROP CONSTRAINT "ResistanceSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedAmrapSession" DROP CONSTRAINT "SavedAmrapSession_amrapSessionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedAmrapSession" DROP CONSTRAINT "SavedAmrapSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCardioSession" DROP CONSTRAINT "SavedCardioSession_cardioSessionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCardioSession" DROP CONSTRAINT "SavedCardioSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedForTimeSession" DROP CONSTRAINT "SavedForTimeSession_forTimeSessionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedForTimeSession" DROP CONSTRAINT "SavedForTimeSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedIntervalSession" DROP CONSTRAINT "SavedIntervalSession_intervalSessionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedIntervalSession" DROP CONSTRAINT "SavedIntervalSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedMobilitySession" DROP CONSTRAINT "SavedMobilitySession_mobilitySessionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedMobilitySession" DROP CONSTRAINT "SavedMobilitySession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedResistanceSession" DROP CONSTRAINT "SavedResistanceSession_resistanceSessionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedResistanceSession" DROP CONSTRAINT "SavedResistanceSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MobilityMoveToMobilitySession" DROP CONSTRAINT "_MobilityMoveToMobilitySession_A_fkey";

-- DropForeignKey
ALTER TABLE "_MobilityMoveToMobilitySession" DROP CONSTRAINT "_MobilityMoveToMobilitySession_B_fkey";

-- AlterTable
ALTER TABLE "AmrapSection" DROP COLUMN "amrapSessionId",
ADD COLUMN     "amrapWorkoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CardioExercise" DROP COLUMN "cardioSessionId",
ADD COLUMN     "cardioWorkoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForTimeSection" DROP COLUMN "forTimeSessionId",
ADD COLUMN     "forTimeWorkoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IntervalExercise" DROP COLUMN "intervalSessionId",
ADD COLUMN     "intervalWorkoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ResistanceExercise" DROP COLUMN "resistanceSessionId",
ADD COLUMN     "resistanceWorkoutId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AmrapSession";

-- DropTable
DROP TABLE "CardioSession";

-- DropTable
DROP TABLE "ForTimeSession";

-- DropTable
DROP TABLE "IntervalSession";

-- DropTable
DROP TABLE "LoggedWorkoutSession";

-- DropTable
DROP TABLE "MobilitySession";

-- DropTable
DROP TABLE "ResistanceSession";

-- DropTable
DROP TABLE "SavedAmrapSession";

-- DropTable
DROP TABLE "SavedCardioSession";

-- DropTable
DROP TABLE "SavedForTimeSession";

-- DropTable
DROP TABLE "SavedIntervalSession";

-- DropTable
DROP TABLE "SavedMobilitySession";

-- DropTable
DROP TABLE "SavedResistanceSession";

-- DropTable
DROP TABLE "_MobilityMoveToMobilitySession";

-- CreateTable
CREATE TABLE "CardioWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "childrenOrder" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "CardioWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCardioWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardioWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedCardioWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResistanceWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    "clubId" TEXT,

    CONSTRAINT "ResistanceWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedResistanceWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resistanceWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedResistanceWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervalWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "audioUri" TEXT,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "repeats" INTEGER NOT NULL DEFAULT 1,
    "childrenOrder" TEXT[],
    "intervals" INTEGER[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "IntervalWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedIntervalWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "intervalWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedIntervalWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmrapWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "childrenOrder" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "AmrapWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedAmrapWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amrapWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedAmrapWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForTimeWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "repeats" INTEGER NOT NULL DEFAULT 1,
    "timecapSeconds" INTEGER NOT NULL DEFAULT 0,
    "childrenOrder" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForTimeWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedForTimeWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "forTimeWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedForTimeWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilityWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "audioUri" TEXT,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "childrenOrder" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "MobilityWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMobilityWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mobilityWorkoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedMobilityWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedWorkoutWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "gymProfileId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LoggedWorkoutWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MobilityMoveToMobilityWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedCardioWorkout_cardioWorkoutId_userId_key" ON "SavedCardioWorkout"("cardioWorkoutId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedResistanceWorkout_resistanceWorkoutId_userId_key" ON "SavedResistanceWorkout"("resistanceWorkoutId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedIntervalWorkout_intervalWorkoutId_userId_key" ON "SavedIntervalWorkout"("intervalWorkoutId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedAmrapWorkout_amrapWorkoutId_userId_key" ON "SavedAmrapWorkout"("amrapWorkoutId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedForTimeWorkout_forTimeWorkoutId_userId_key" ON "SavedForTimeWorkout"("forTimeWorkoutId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedMobilityWorkout_mobilityWorkoutId_userId_key" ON "SavedMobilityWorkout"("mobilityWorkoutId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_MobilityMoveToMobilityWorkout_AB_unique" ON "_MobilityMoveToMobilityWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_MobilityMoveToMobilityWorkout_B_index" ON "_MobilityMoveToMobilityWorkout"("B");

-- AddForeignKey
ALTER TABLE "CardioWorkout" ADD CONSTRAINT "CardioWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCardioWorkout" ADD CONSTRAINT "SavedCardioWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCardioWorkout" ADD CONSTRAINT "SavedCardioWorkout_cardioWorkoutId_fkey" FOREIGN KEY ("cardioWorkoutId") REFERENCES "CardioWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioExercise" ADD CONSTRAINT "CardioExercise_cardioWorkoutId_fkey" FOREIGN KEY ("cardioWorkoutId") REFERENCES "CardioWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceWorkout" ADD CONSTRAINT "ResistanceWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceWorkout" ADD CONSTRAINT "ResistanceWorkout_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedResistanceWorkout" ADD CONSTRAINT "SavedResistanceWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedResistanceWorkout" ADD CONSTRAINT "SavedResistanceWorkout_resistanceWorkoutId_fkey" FOREIGN KEY ("resistanceWorkoutId") REFERENCES "ResistanceWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceExercise" ADD CONSTRAINT "ResistanceExercise_resistanceWorkoutId_fkey" FOREIGN KEY ("resistanceWorkoutId") REFERENCES "ResistanceWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalWorkout" ADD CONSTRAINT "IntervalWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedIntervalWorkout" ADD CONSTRAINT "SavedIntervalWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedIntervalWorkout" ADD CONSTRAINT "SavedIntervalWorkout_intervalWorkoutId_fkey" FOREIGN KEY ("intervalWorkoutId") REFERENCES "IntervalWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalExercise" ADD CONSTRAINT "IntervalExercise_intervalWorkoutId_fkey" FOREIGN KEY ("intervalWorkoutId") REFERENCES "IntervalWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapWorkout" ADD CONSTRAINT "AmrapWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAmrapWorkout" ADD CONSTRAINT "SavedAmrapWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAmrapWorkout" ADD CONSTRAINT "SavedAmrapWorkout_amrapWorkoutId_fkey" FOREIGN KEY ("amrapWorkoutId") REFERENCES "AmrapWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSection" ADD CONSTRAINT "AmrapSection_amrapWorkoutId_fkey" FOREIGN KEY ("amrapWorkoutId") REFERENCES "AmrapWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeWorkout" ADD CONSTRAINT "ForTimeWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedForTimeWorkout" ADD CONSTRAINT "SavedForTimeWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedForTimeWorkout" ADD CONSTRAINT "SavedForTimeWorkout_forTimeWorkoutId_fkey" FOREIGN KEY ("forTimeWorkoutId") REFERENCES "ForTimeWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSection" ADD CONSTRAINT "ForTimeSection_forTimeWorkoutId_fkey" FOREIGN KEY ("forTimeWorkoutId") REFERENCES "ForTimeWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityWorkout" ADD CONSTRAINT "MobilityWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMobilityWorkout" ADD CONSTRAINT "SavedMobilityWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMobilityWorkout" ADD CONSTRAINT "SavedMobilityWorkout_mobilityWorkoutId_fkey" FOREIGN KEY ("mobilityWorkoutId") REFERENCES "MobilityWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutWorkout" ADD CONSTRAINT "LoggedWorkoutWorkout_gymProfileId_fkey" FOREIGN KEY ("gymProfileId") REFERENCES "GymProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutWorkout" ADD CONSTRAINT "LoggedWorkoutWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MobilityMoveToMobilityWorkout" ADD CONSTRAINT "_MobilityMoveToMobilityWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "MobilityMove"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MobilityMoveToMobilityWorkout" ADD CONSTRAINT "_MobilityMoveToMobilityWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "MobilityWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

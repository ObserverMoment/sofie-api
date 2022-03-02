/*
  Warnings:

  - You are about to drop the `ExerciseTrackerManualEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" DROP CONSTRAINT "ExerciseTrackerManualEntry_userExerciseTrackerMaxLoadId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" DROP CONSTRAINT "ExerciseTrackerManualEntry_userFastestTimeExerciseTrackerI_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" DROP CONSTRAINT "ExerciseTrackerManualEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" DROP CONSTRAINT "ExerciseTrackerManualEntry_userMaxUnbrokenExerciseTrackerI_fkey";

-- DropTable
DROP TABLE "ExerciseTrackerManualEntry";

-- CreateTable
CREATE TABLE "UserMaxLoadTrackerManualEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "loadAmount" DOUBLE PRECISION NOT NULL,
    "videoUri" TEXT,
    "userMaxLoadExerciseTrackerId" TEXT NOT NULL,

    CONSTRAINT "UserMaxLoadTrackerManualEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFastestTimeTrackerManualEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "loadAmount" DOUBLE PRECISION NOT NULL,
    "videoUri" TEXT,
    "userFastestTimeExerciseTrackerId" TEXT NOT NULL,

    CONSTRAINT "UserFastestTimeTrackerManualEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMaxUnbrokenTrackerManualEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "loadAmount" DOUBLE PRECISION NOT NULL,
    "videoUri" TEXT,
    "userMaxUnbrokenExerciseTrackerId" TEXT NOT NULL,

    CONSTRAINT "UserMaxUnbrokenTrackerManualEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMaxLoadTrackerManualEntry" ADD CONSTRAINT "UserMaxLoadTrackerManualEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxLoadTrackerManualEntry" ADD CONSTRAINT "UserMaxLoadTrackerManualEntry_userMaxLoadExerciseTrackerId_fkey" FOREIGN KEY ("userMaxLoadExerciseTrackerId") REFERENCES "UserMaxLoadExerciseTracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFastestTimeTrackerManualEntry" ADD CONSTRAINT "UserFastestTimeTrackerManualEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFastestTimeTrackerManualEntry" ADD CONSTRAINT "UserFastestTimeTrackerManualEntry_userFastestTimeExerciseT_fkey" FOREIGN KEY ("userFastestTimeExerciseTrackerId") REFERENCES "UserFastestTimeExerciseTracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxUnbrokenTrackerManualEntry" ADD CONSTRAINT "UserMaxUnbrokenTrackerManualEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxUnbrokenTrackerManualEntry" ADD CONSTRAINT "UserMaxUnbrokenTrackerManualEntry_userMaxUnbrokenExerciseT_fkey" FOREIGN KEY ("userMaxUnbrokenExerciseTrackerId") REFERENCES "UserMaxUnbrokenExerciseTracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

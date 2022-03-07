/*
  Warnings:

  - You are about to drop the `UserScoredWorkoutTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExerciseTrackerManualEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserScoredWorkoutTracker" DROP CONSTRAINT "UserScoredWorkoutTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserScoredWorkoutTracker" DROP CONSTRAINT "UserScoredWorkoutTracker_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" DROP CONSTRAINT "WorkoutExerciseTrackerManualEntry_userExerciseTrackerMaxLo_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" DROP CONSTRAINT "WorkoutExerciseTrackerManualEntry_userFastestTimeExerciseT_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" DROP CONSTRAINT "WorkoutExerciseTrackerManualEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" DROP CONSTRAINT "WorkoutExerciseTrackerManualEntry_userMaxUnbrokenExerciseT_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" DROP CONSTRAINT "WorkoutExerciseTrackerManualEntry_userScoredWorkoutTracker_fkey";

-- DropTable
DROP TABLE "UserScoredWorkoutTracker";

-- DropTable
DROP TABLE "WorkoutExerciseTrackerManualEntry";

-- CreateTable
CREATE TABLE "ExerciseTrackerManualEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "userExerciseTrackerMaxLoadId" TEXT,
    "userFastestTimeExerciseTrackerId" TEXT,
    "userMaxUnbrokenExerciseTrackerId" TEXT,

    CONSTRAINT "ExerciseTrackerManualEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" ADD CONSTRAINT "ExerciseTrackerManualEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" ADD CONSTRAINT "ExerciseTrackerManualEntry_userExerciseTrackerMaxLoadId_fkey" FOREIGN KEY ("userExerciseTrackerMaxLoadId") REFERENCES "UserMaxLoadExerciseTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" ADD CONSTRAINT "ExerciseTrackerManualEntry_userFastestTimeExerciseTrackerI_fkey" FOREIGN KEY ("userFastestTimeExerciseTrackerId") REFERENCES "UserFastestTimeExerciseTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseTrackerManualEntry" ADD CONSTRAINT "ExerciseTrackerManualEntry_userMaxUnbrokenExerciseTrackerI_fkey" FOREIGN KEY ("userMaxUnbrokenExerciseTrackerId") REFERENCES "UserMaxUnbrokenExerciseTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

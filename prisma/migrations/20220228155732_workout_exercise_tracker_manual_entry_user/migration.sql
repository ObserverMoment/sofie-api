/*
  Warnings:

  - Added the required column `userId` to the `WorkoutExerciseTrackerManualEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExerciseTrackerManualEntry" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" ADD CONSTRAINT "WorkoutExerciseTrackerManualEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "FitnessBenchmark" DROP CONSTRAINT "FitnessBenchmark_fitnessBenchmarkCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmark" DROP CONSTRAINT "FitnessBenchmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkScore" DROP CONSTRAINT "FitnessBenchmarkScore_fitnessBenchmarkId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkScore" DROP CONSTRAINT "FitnessBenchmarkScore_userId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkWorkout" DROP CONSTRAINT "FitnessBenchmarkWorkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkWorkoutScore" DROP CONSTRAINT "FitnessBenchmarkWorkoutScore_fitnessBenchmarkWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "FitnessBenchmarkWorkoutScore" DROP CONSTRAINT "FitnessBenchmarkWorkoutScore_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserExerciseLoadTracker" DROP CONSTRAINT "UserExerciseLoadTracker_userId_fkey";

-- AddForeignKey
ALTER TABLE "FitnessBenchmark" ADD CONSTRAINT "FitnessBenchmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmark" ADD CONSTRAINT "FitnessBenchmark_fitnessBenchmarkCategoryId_fkey" FOREIGN KEY ("fitnessBenchmarkCategoryId") REFERENCES "FitnessBenchmarkCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkScore" ADD CONSTRAINT "FitnessBenchmarkScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkScore" ADD CONSTRAINT "FitnessBenchmarkScore_fitnessBenchmarkId_fkey" FOREIGN KEY ("fitnessBenchmarkId") REFERENCES "FitnessBenchmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkWorkout" ADD CONSTRAINT "FitnessBenchmarkWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkWorkoutScore" ADD CONSTRAINT "FitnessBenchmarkWorkoutScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FitnessBenchmarkWorkoutScore" ADD CONSTRAINT "FitnessBenchmarkWorkoutScore_fitnessBenchmarkWorkoutId_fkey" FOREIGN KEY ("fitnessBenchmarkWorkoutId") REFERENCES "FitnessBenchmarkWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseLoadTracker" ADD CONSTRAINT "UserExerciseLoadTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

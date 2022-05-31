-- DropForeignKey
ALTER TABLE "AmrapMove" DROP CONSTRAINT "AmrapMove_amrapSectionId_fkey";

-- DropForeignKey
ALTER TABLE "AmrapSection" DROP CONSTRAINT "AmrapSection_amrapSessionId_fkey";

-- DropForeignKey
ALTER TABLE "AmrapSession" DROP CONSTRAINT "AmrapSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CardioExercise" DROP CONSTRAINT "CardioExercise_cardioSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CardioSession" DROP CONSTRAINT "CardioSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ForTimeMove" DROP CONSTRAINT "ForTimeMove_forTimeSectionId_fkey";

-- DropForeignKey
ALTER TABLE "ForTimeSection" DROP CONSTRAINT "ForTimeSection_forTimeSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ForTimeSession" DROP CONSTRAINT "ForTimeSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IntervalExercise" DROP CONSTRAINT "IntervalExercise_intervalSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IntervalSession" DROP CONSTRAINT "IntervalSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IntervalSet" DROP CONSTRAINT "IntervalSet_intervalExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceExercise" DROP CONSTRAINT "ResistanceExercise_resistanceSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceSession" DROP CONSTRAINT "ResistanceSession_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "ResistanceSet" DROP CONSTRAINT "ResistanceSet_resistanceExerciseId_fkey";

-- AlterTable
ALTER TABLE "IntervalSession" ADD COLUMN     "audioUri" TEXT,
ADD COLUMN     "videoThumbUri" TEXT,
ADD COLUMN     "videoUri" TEXT;

-- AlterTable
ALTER TABLE "MobilitySession" ADD COLUMN     "audioUri" TEXT,
ADD COLUMN     "videoThumbUri" TEXT,
ADD COLUMN     "videoUri" TEXT;

-- AddForeignKey
ALTER TABLE "CardioSession" ADD CONSTRAINT "CardioSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioExercise" ADD CONSTRAINT "CardioExercise_cardioSessionId_fkey" FOREIGN KEY ("cardioSessionId") REFERENCES "CardioSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSession" ADD CONSTRAINT "ResistanceSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceExercise" ADD CONSTRAINT "ResistanceExercise_resistanceSessionId_fkey" FOREIGN KEY ("resistanceSessionId") REFERENCES "ResistanceSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSet" ADD CONSTRAINT "ResistanceSet_resistanceExerciseId_fkey" FOREIGN KEY ("resistanceExerciseId") REFERENCES "ResistanceExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSession" ADD CONSTRAINT "IntervalSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalExercise" ADD CONSTRAINT "IntervalExercise_intervalSessionId_fkey" FOREIGN KEY ("intervalSessionId") REFERENCES "IntervalSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSet" ADD CONSTRAINT "IntervalSet_intervalExerciseId_fkey" FOREIGN KEY ("intervalExerciseId") REFERENCES "IntervalExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSession" ADD CONSTRAINT "AmrapSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSection" ADD CONSTRAINT "AmrapSection_amrapSessionId_fkey" FOREIGN KEY ("amrapSessionId") REFERENCES "AmrapSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapMove" ADD CONSTRAINT "AmrapMove_amrapSectionId_fkey" FOREIGN KEY ("amrapSectionId") REFERENCES "AmrapSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSession" ADD CONSTRAINT "ForTimeSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSection" ADD CONSTRAINT "ForTimeSection_forTimeSessionId_fkey" FOREIGN KEY ("forTimeSessionId") REFERENCES "ForTimeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeMove" ADD CONSTRAINT "ForTimeMove_forTimeSectionId_fkey" FOREIGN KEY ("forTimeSectionId") REFERENCES "ForTimeSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

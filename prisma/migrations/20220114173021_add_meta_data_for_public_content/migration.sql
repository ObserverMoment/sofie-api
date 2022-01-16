-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "metaTags" TEXT[],
ADD COLUMN     "reasonNotValidated" TEXT,
ADD COLUMN     "validated" BOOLEAN;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "metaTags" TEXT[],
ADD COLUMN     "reasonNotValidated" TEXT,
ADD COLUMN     "validated" BOOLEAN;

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "difficultyLevel" "DifficultyLevel",
ADD COLUMN     "metaTags" TEXT[],
ADD COLUMN     "reasonNotValidated" TEXT,
ADD COLUMN     "validated" BOOLEAN;

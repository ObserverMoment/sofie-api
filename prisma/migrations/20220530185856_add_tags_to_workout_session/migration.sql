/*
  Warnings:

  - You are about to drop the column `difficultyLevel` on the `TrainingPlan` table. All the data in the column will be lost.
  - You are about to drop the column `metaTags` on the `TrainingPlan` table. All the data in the column will be lost.
  - You are about to drop the column `difficultyLevel` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `metaTags` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrainingPlan" DROP COLUMN "difficultyLevel",
DROP COLUMN "metaTags";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "difficultyLevel",
DROP COLUMN "metaTags",
ADD COLUMN     "tags" TEXT[];

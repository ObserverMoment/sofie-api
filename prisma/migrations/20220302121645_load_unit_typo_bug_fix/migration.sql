/*
  Warnings:

  - You are about to drop the column `LoadUnit` on the `UserMaxLoadExerciseTracker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserMaxLoadExerciseTracker" DROP COLUMN "LoadUnit",
ADD COLUMN     "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG';

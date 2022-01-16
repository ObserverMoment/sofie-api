/*
  Warnings:

  - You are about to drop the column `loggedWorkoutSectionData` on the `LoggedWorkoutSection` table. All the data in the column will be lost.
  - You are about to drop the column `rounds` on the `WorkoutSet` table. All the data in the column will be lost.
  - You are about to drop the `_BodyAreaToLoggedWorkoutSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LoggedWorkoutSectionToMoveType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BodyAreaToLoggedWorkoutSection" DROP CONSTRAINT "_BodyAreaToLoggedWorkoutSection_A_fkey";

-- DropForeignKey
ALTER TABLE "_BodyAreaToLoggedWorkoutSection" DROP CONSTRAINT "_BodyAreaToLoggedWorkoutSection_B_fkey";

-- DropForeignKey
ALTER TABLE "_LoggedWorkoutSectionToMoveType" DROP CONSTRAINT "_LoggedWorkoutSectionToMoveType_A_fkey";

-- DropForeignKey
ALTER TABLE "_LoggedWorkoutSectionToMoveType" DROP CONSTRAINT "_LoggedWorkoutSectionToMoveType_B_fkey";

-- AlterTable
ALTER TABLE "LoggedWorkoutSection" DROP COLUMN "loggedWorkoutSectionData";

-- AlterTable
ALTER TABLE "WorkoutSet" DROP COLUMN "rounds";

-- DropTable
DROP TABLE "_BodyAreaToLoggedWorkoutSection";

-- DropTable
DROP TABLE "_LoggedWorkoutSectionToMoveType";

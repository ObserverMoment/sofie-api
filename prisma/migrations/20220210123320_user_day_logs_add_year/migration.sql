/*
  Warnings:

  - A unique constraint covering the columns `[year,dayNumber,userId]` on the table `UserEatWellLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,dayNumber,userId]` on the table `UserMeditationLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,dayNumber,userId]` on the table `UserSleepWellLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `UserEatWellLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `UserMeditationLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `UserSleepWellLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserEatWellLog_dayNumber_userId_key";

-- DropIndex
DROP INDEX "UserMeditationLog_dayNumber_userId_key";

-- DropIndex
DROP INDEX "UserSleepWellLog_dayNumber_userId_key";

-- AlterTable
ALTER TABLE "UserEatWellLog" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserMeditationLog" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserSleepWellLog" ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserEatWellLog_year_dayNumber_userId_key" ON "UserEatWellLog"("year", "dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMeditationLog_year_dayNumber_userId_key" ON "UserMeditationLog"("year", "dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSleepWellLog_year_dayNumber_userId_key" ON "UserSleepWellLog"("year", "dayNumber", "userId");

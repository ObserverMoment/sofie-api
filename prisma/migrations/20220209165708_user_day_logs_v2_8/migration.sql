/*
  Warnings:

  - You are about to drop the column `dayNumber` on the `UserDayLogMood` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserDayLogMood_dayNumber_userId_key";

-- AlterTable
ALTER TABLE "UserDayLogMood" DROP COLUMN "dayNumber";

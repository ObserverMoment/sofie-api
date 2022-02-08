/*
  Warnings:

  - You are about to drop the column `textNote` on the `UserDayLogMood` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `UserEatWellLog` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `UserSleepWellLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDayLogMood" DROP COLUMN "textNote",
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserEatWellLog" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserMeditationLog" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserMobilityLog" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserSleepWellLog" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT;

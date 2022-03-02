/*
  Warnings:

  - You are about to drop the column `loadAmount` on the `UserFastestTimeTrackerManualEntry` table. All the data in the column will be lost.
  - You are about to drop the column `loadAmount` on the `UserMaxUnbrokenTrackerManualEntry` table. All the data in the column will be lost.
  - Added the required column `timeTakenMs` to the `UserFastestTimeTrackerManualEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `UserMaxUnbrokenTrackerManualEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFastestTimeTrackerManualEntry" DROP COLUMN "loadAmount",
ADD COLUMN     "timeTakenMs" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserMaxUnbrokenTrackerManualEntry" DROP COLUMN "loadAmount",
ADD COLUMN     "score" INTEGER NOT NULL;

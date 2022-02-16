/*
  Warnings:

  - You are about to drop the column `holidayDayAssigned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClubMemberNote" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "holidayDayAssigned",
ADD COLUMN     "recentlyViewedObjects" TEXT[];

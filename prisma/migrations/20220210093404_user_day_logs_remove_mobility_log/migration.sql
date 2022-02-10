/*
  Warnings:

  - You are about to drop the `UserMobilityLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserMobilityLog" DROP CONSTRAINT "UserMobilityLog_userId_fkey";

-- DropTable
DROP TABLE "UserMobilityLog";

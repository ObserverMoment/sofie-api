/*
  Warnings:

  - You are about to drop the column `activeLogDataWidgets` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activeLogDataWidgets",
ADD COLUMN     "activeFitnessBenchmarks" TEXT[];

-- DropEnum
DROP TYPE "BenchmarkType";

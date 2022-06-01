/*
  Warnings:

  - You are about to drop the column `setOrder` on the `ResistanceSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResistanceSession" DROP COLUMN "setOrder",
ADD COLUMN     "exerciseOrder" TEXT[];

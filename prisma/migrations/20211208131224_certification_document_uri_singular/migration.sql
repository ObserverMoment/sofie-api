/*
  Warnings:

  - You are about to drop the column `documentUris` on the `Certification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "documentUris",
ADD COLUMN     "documentUri" TEXT;

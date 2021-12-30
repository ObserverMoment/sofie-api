/*
  Warnings:

  - You are about to drop the column `confidenceScore` on the `JournalMood` table. All the data in the column will be lost.
  - You are about to drop the column `motivationScore` on the `JournalMood` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JournalMood" DROP COLUMN "confidenceScore",
DROP COLUMN "motivationScore",
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "textNote" TEXT;

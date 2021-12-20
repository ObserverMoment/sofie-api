/*
  Warnings:

  - Made the column `moodScore` on table `JournalMood` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energyScore` on table `JournalMood` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JournalMood" ALTER COLUMN "moodScore" SET NOT NULL,
ALTER COLUMN "energyScore" SET NOT NULL;

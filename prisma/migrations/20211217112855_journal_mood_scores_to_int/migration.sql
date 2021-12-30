/*
  Warnings:

  - You are about to alter the column `moodScore` on the `JournalMood` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `energyScore` on the `JournalMood` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "JournalMood" ALTER COLUMN "moodScore" SET DATA TYPE INTEGER,
ALTER COLUMN "energyScore" SET DATA TYPE INTEGER;

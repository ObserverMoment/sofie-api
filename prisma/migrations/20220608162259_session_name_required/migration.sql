/*
  Warnings:

  - Made the column `name` on table `AmrapSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `CardioSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `ForTimeSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `IntervalSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `MobilitySession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `ResistanceSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AmrapSession" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "CardioSession" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "ForTimeSession" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "IntervalSession" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "MobilitySession" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "ResistanceSession" ALTER COLUMN "name" SET NOT NULL;

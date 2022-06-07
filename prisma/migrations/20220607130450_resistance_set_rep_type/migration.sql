/*
  Warnings:

  - The `reps` column on the `ResistanceSet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `repType` to the `ResistanceSet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResistanceSetRepType" AS ENUM ('REPS', 'SECONDS', 'MINUTES', 'CALORIES', 'METRES');

-- AlterTable
ALTER TABLE "ResistanceSet" ADD COLUMN     "repType" "ResistanceSetRepType" NOT NULL,
DROP COLUMN "reps",
ADD COLUMN     "reps" INTEGER[];

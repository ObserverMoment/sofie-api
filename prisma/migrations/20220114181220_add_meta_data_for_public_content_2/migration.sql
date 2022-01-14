/*
  Warnings:

  - The `validated` column on the `Club` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `validated` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `validated` column on the `WorkoutPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PublicContentValidationStatus" AS ENUM ('VALID', 'INVALID', 'PENDING');

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "validated",
ADD COLUMN     "validated" "PublicContentValidationStatus" NOT NULL DEFAULT E'PENDING';

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "validated",
ADD COLUMN     "validated" "PublicContentValidationStatus" NOT NULL DEFAULT E'PENDING';

-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "validated",
ADD COLUMN     "validated" "PublicContentValidationStatus" NOT NULL DEFAULT E'PENDING';

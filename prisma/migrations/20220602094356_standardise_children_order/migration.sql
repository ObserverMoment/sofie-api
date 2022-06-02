/*
  Warnings:

  - You are about to drop the column `moveOrder` on the `AmrapSection` table. All the data in the column will be lost.
  - You are about to drop the column `sectionOrder` on the `AmrapSession` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseOrder` on the `CardioSession` table. All the data in the column will be lost.
  - You are about to drop the column `moveOrder` on the `ForTimeSection` table. All the data in the column will be lost.
  - You are about to drop the column `sectionOrder` on the `ForTimeSession` table. All the data in the column will be lost.
  - You are about to drop the column `intervalSetOrder` on the `IntervalExercise` table. All the data in the column will be lost.
  - You are about to drop the column `intervalExerciseOrder` on the `IntervalSession` table. All the data in the column will be lost.
  - You are about to drop the column `moveOrder` on the `MobilitySession` table. All the data in the column will be lost.
  - You are about to drop the column `setOrder` on the `ResistanceExercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseOrder` on the `ResistanceSession` table. All the data in the column will be lost.
  - You are about to drop the column `sessionOrder` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AmrapSection" DROP COLUMN "moveOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "AmrapSession" DROP COLUMN "sectionOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "CardioSession" DROP COLUMN "exerciseOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "ForTimeSection" DROP COLUMN "moveOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "ForTimeSession" DROP COLUMN "sectionOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "IntervalExercise" DROP COLUMN "intervalSetOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "IntervalSession" DROP COLUMN "intervalExerciseOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "MobilitySession" DROP COLUMN "moveOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "ResistanceExercise" DROP COLUMN "setOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "ResistanceSession" DROP COLUMN "exerciseOrder",
ADD COLUMN     "childrenOrder" TEXT[];

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "sessionOrder",
ADD COLUMN     "childrenOrder" TEXT[];

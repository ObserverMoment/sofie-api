/*
  Warnings:

  - You are about to drop the column `childrenOrder` on the `ResistanceExercise` table. All the data in the column will be lost.
  - You are about to drop the column `childrenOrder` on the `ResistanceSession` table. All the data in the column will be lost.
  - Added the required column `sortPosition` to the `ResistanceExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sortPosition` to the `ResistanceSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResistanceExercise" DROP COLUMN "childrenOrder",
ADD COLUMN     "sortPosition" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ResistanceSession" DROP COLUMN "childrenOrder";

-- AlterTable
ALTER TABLE "ResistanceSet" ADD COLUMN     "sortPosition" INTEGER NOT NULL;

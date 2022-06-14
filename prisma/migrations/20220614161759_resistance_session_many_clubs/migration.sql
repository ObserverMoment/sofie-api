/*
  Warnings:

  - You are about to drop the column `clubId` on the `ResistanceWorkout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResistanceWorkout" DROP CONSTRAINT "ResistanceWorkout_clubId_fkey";

-- AlterTable
ALTER TABLE "ResistanceWorkout" DROP COLUMN "clubId";

-- CreateTable
CREATE TABLE "_ClubToResistanceWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToResistanceWorkout_AB_unique" ON "_ClubToResistanceWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToResistanceWorkout_B_index" ON "_ClubToResistanceWorkout"("B");

-- AddForeignKey
ALTER TABLE "_ClubToResistanceWorkout" ADD CONSTRAINT "_ClubToResistanceWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToResistanceWorkout" ADD CONSTRAINT "_ClubToResistanceWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "ResistanceWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

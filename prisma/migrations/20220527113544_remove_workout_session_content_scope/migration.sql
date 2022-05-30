/*
  Warnings:

  - You are about to drop the column `clubId` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_clubId_fkey";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "clubId";

-- CreateTable
CREATE TABLE "_ClubToWorkoutSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToWorkoutSession_AB_unique" ON "_ClubToWorkoutSession"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToWorkoutSession_B_index" ON "_ClubToWorkoutSession"("B");

-- AddForeignKey
ALTER TABLE "_ClubToWorkoutSession" ADD CONSTRAINT "_ClubToWorkoutSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToWorkoutSession" ADD CONSTRAINT "_ClubToWorkoutSession_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

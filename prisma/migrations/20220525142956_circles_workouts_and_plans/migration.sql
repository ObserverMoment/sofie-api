/*
  Warnings:

  - You are about to drop the column `description` on the `MobilitySession` table. All the data in the column will be lost.
  - You are about to drop the column `durationMinutes` on the `MobilitySession` table. All the data in the column will be lost.
  - You are about to drop the column `contentAccessScope` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the column `lengthMinutes` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MobilitySession" DROP COLUMN "description",
DROP COLUMN "durationMinutes",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "contentAccessScope",
DROP COLUMN "lengthMinutes",
ADD COLUMN     "circleId" TEXT;

-- CreateTable
CREATE TABLE "TrainingPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CircleToTrainingPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CircleToTrainingPlan_AB_unique" ON "_CircleToTrainingPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_CircleToTrainingPlan_B_index" ON "_CircleToTrainingPlan"("B");

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CircleToTrainingPlan" ADD CONSTRAINT "_CircleToTrainingPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CircleToTrainingPlan" ADD CONSTRAINT "_CircleToTrainingPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `trainingPlanId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `circleId` on the `WorkoutSession` table. All the data in the column will be lost.
  - You are about to drop the `Circle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CircleInviteToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CircleMemberNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CircleToTrainingPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_circle_admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_circle_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Circle" DROP CONSTRAINT "Circle_userId_fkey";

-- DropForeignKey
ALTER TABLE "CircleInviteToken" DROP CONSTRAINT "CircleInviteToken_circleId_fkey";

-- DropForeignKey
ALTER TABLE "CircleInviteToken" DROP CONSTRAINT "CircleInviteToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "CircleMemberNote" DROP CONSTRAINT "CircleMemberNote_circleId_fkey";

-- DropForeignKey
ALTER TABLE "CircleMemberNote" DROP CONSTRAINT "CircleMemberNote_memberId_fkey";

-- DropForeignKey
ALTER TABLE "CircleMemberNote" DROP CONSTRAINT "CircleMemberNote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_circleId_fkey";

-- DropForeignKey
ALTER TABLE "_CircleToTrainingPlan" DROP CONSTRAINT "_CircleToTrainingPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_CircleToTrainingPlan" DROP CONSTRAINT "_CircleToTrainingPlan_B_fkey";

-- DropForeignKey
ALTER TABLE "_circle_admin" DROP CONSTRAINT "_circle_admin_A_fkey";

-- DropForeignKey
ALTER TABLE "_circle_admin" DROP CONSTRAINT "_circle_admin_B_fkey";

-- DropForeignKey
ALTER TABLE "_circle_member" DROP CONSTRAINT "_circle_member_A_fkey";

-- DropForeignKey
ALTER TABLE "_circle_member" DROP CONSTRAINT "_circle_member_B_fkey";

-- AlterTable
ALTER TABLE "Club" ALTER COLUMN "validated" SET DEFAULT E'VALID';

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "trainingPlanId";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "circleId",
ADD COLUMN     "clubId" TEXT;

-- DropTable
DROP TABLE "Circle";

-- DropTable
DROP TABLE "CircleInviteToken";

-- DropTable
DROP TABLE "CircleMemberNote";

-- DropTable
DROP TABLE "_CircleToTrainingPlan";

-- DropTable
DROP TABLE "_circle_admin";

-- DropTable
DROP TABLE "_circle_member";

-- CreateTable
CREATE TABLE "_CollectionToWorkoutSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToTrainingPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToTrainingPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToWorkoutSession_AB_unique" ON "_CollectionToWorkoutSession"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToWorkoutSession_B_index" ON "_CollectionToWorkoutSession"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToTrainingPlan_AB_unique" ON "_CollectionToTrainingPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToTrainingPlan_B_index" ON "_CollectionToTrainingPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToTrainingPlan_AB_unique" ON "_ClubToTrainingPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToTrainingPlan_B_index" ON "_ClubToTrainingPlan"("B");

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToWorkoutSession" ADD CONSTRAINT "_CollectionToWorkoutSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToWorkoutSession" ADD CONSTRAINT "_CollectionToWorkoutSession_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToTrainingPlan" ADD CONSTRAINT "_CollectionToTrainingPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToTrainingPlan" ADD CONSTRAINT "_CollectionToTrainingPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToTrainingPlan" ADD CONSTRAINT "_ClubToTrainingPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToTrainingPlan" ADD CONSTRAINT "_ClubToTrainingPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

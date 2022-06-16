/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "ScheduledWorkoutSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "resistanceWorkoutId" TEXT,
    "cardioWorkoutId" TEXT,
    "gymProfileId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ScheduledWorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledWorkoutSession_gymProfileId_key" ON "ScheduledWorkoutSession"("gymProfileId");

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_gymProfileId_fkey" FOREIGN KEY ("gymProfileId") REFERENCES "GymProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_cardioWorkoutId_fkey" FOREIGN KEY ("cardioWorkoutId") REFERENCES "CardioWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_resistanceWorkoutId_fkey" FOREIGN KEY ("resistanceWorkoutId") REFERENCES "ResistanceWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

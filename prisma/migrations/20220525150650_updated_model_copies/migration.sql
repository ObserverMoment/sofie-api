/*
  Warnings:

  - Added the required column `name` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "trainingPlanId" TEXT;

-- AlterTable
ALTER TABLE "TrainingPlan" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coverImageUri" TEXT,
ADD COLUMN     "daysPerWeek" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "difficultyLevel" "DifficultyLevel",
ADD COLUMN     "introAudioUri" TEXT,
ADD COLUMN     "introVideoThumbUri" TEXT,
ADD COLUMN     "introVideoUri" TEXT,
ADD COLUMN     "lengthWeeks" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "metaTags" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutTag" ADD COLUMN     "trainingPlanId" TEXT;

-- CreateTable
CREATE TABLE "ScheduledWorkoutSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "gymProfileId" TEXT,
    "loggedWorkoutSessionId" TEXT,
    "userId" TEXT NOT NULL,
    "workoutSessionId" TEXT,
    "trainingPlanEnrolmentId" TEXT,
    "trainingPlanDayWorkoutId" TEXT,

    CONSTRAINT "ScheduledWorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedWorkoutSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "gymProfileId" TEXT,
    "userId" TEXT NOT NULL,
    "workoutSessionId" TEXT,

    CONSTRAINT "LoggedWorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanDay" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "dayNumber" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingPlanId" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanDayWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "sortPosition" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutSessionId" TEXT NOT NULL,
    "trainingPlanDayId" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanDayWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanEnrolment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "trainingPlanId" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanEnrolment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedTrainingPlanDayWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainingPlanDayWorkoutId" TEXT NOT NULL,
    "loggedWorkoutSessionId" TEXT,
    "trainingPlanEnrolmentId" TEXT NOT NULL,

    CONSTRAINT "CompletedTrainingPlanDayWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanReview" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "trainingPlanId" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledWorkoutSession_loggedWorkoutSessionId_key" ON "ScheduledWorkoutSession"("loggedWorkoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CompletedTrainingPlanDayWorkout_loggedWorkoutSessionId_key" ON "CompletedTrainingPlanDayWorkout"("loggedWorkoutSessionId");

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_gymProfileId_fkey" FOREIGN KEY ("gymProfileId") REFERENCES "GymProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_loggedWorkoutSessionId_fkey" FOREIGN KEY ("loggedWorkoutSessionId") REFERENCES "LoggedWorkoutSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_trainingPlanDayWorkoutId_fkey" FOREIGN KEY ("trainingPlanDayWorkoutId") REFERENCES "TrainingPlanDayWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutSession" ADD CONSTRAINT "ScheduledWorkoutSession_trainingPlanEnrolmentId_fkey" FOREIGN KEY ("trainingPlanEnrolmentId") REFERENCES "TrainingPlanEnrolment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSession" ADD CONSTRAINT "LoggedWorkoutSession_gymProfileId_fkey" FOREIGN KEY ("gymProfileId") REFERENCES "GymProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSession" ADD CONSTRAINT "LoggedWorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSession" ADD CONSTRAINT "LoggedWorkoutSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlan" ADD CONSTRAINT "TrainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanDay" ADD CONSTRAINT "TrainingPlanDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanDay" ADD CONSTRAINT "TrainingPlanDay_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanDayWorkout" ADD CONSTRAINT "TrainingPlanDayWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanDayWorkout" ADD CONSTRAINT "TrainingPlanDayWorkout_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanDayWorkout" ADD CONSTRAINT "TrainingPlanDayWorkout_trainingPlanDayId_fkey" FOREIGN KEY ("trainingPlanDayId") REFERENCES "TrainingPlanDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanEnrolment" ADD CONSTRAINT "TrainingPlanEnrolment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanEnrolment" ADD CONSTRAINT "TrainingPlanEnrolment_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTrainingPlanDayWorkout" ADD CONSTRAINT "CompletedTrainingPlanDayWorkout_loggedWorkoutSessionId_fkey" FOREIGN KEY ("loggedWorkoutSessionId") REFERENCES "LoggedWorkoutSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTrainingPlanDayWorkout" ADD CONSTRAINT "CompletedTrainingPlanDayWorkout_trainingPlanDayWorkoutId_fkey" FOREIGN KEY ("trainingPlanDayWorkoutId") REFERENCES "TrainingPlanDayWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTrainingPlanDayWorkout" ADD CONSTRAINT "CompletedTrainingPlanDayWorkout_trainingPlanEnrolmentId_fkey" FOREIGN KEY ("trainingPlanEnrolmentId") REFERENCES "TrainingPlanEnrolment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanReview" ADD CONSTRAINT "TrainingPlanReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanReview" ADD CONSTRAINT "TrainingPlanReview_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTag" ADD CONSTRAINT "WorkoutTag_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

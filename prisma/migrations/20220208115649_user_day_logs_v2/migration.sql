/*
  Warnings:

  - You are about to drop the column `userDayLogId` on the `UserDayLogMood` table. All the data in the column will be lost.
  - You are about to drop the `UserDayLog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dayNumber,userId]` on the table `UserDayLogMood` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayNumber` to the `UserDayLogMood` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserDayLog" DROP CONSTRAINT "UserDayLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserDayLogMood" DROP CONSTRAINT "UserDayLogMood_userDayLogId_fkey";

-- DropIndex
DROP INDEX "UserDayLogMood_userDayLogId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeLogDataWidgets" TEXT[],
ADD COLUMN     "activeProgressWidgets" TEXT[];

-- AlterTable
ALTER TABLE "UserDayLogMood" DROP COLUMN "userDayLogId",
ADD COLUMN     "dayNumber" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserDayLog";

-- CreateTable
CREATE TABLE "OnboardingMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUri" TEXT,
    "videoUri" TEXT,
    "audioUri" TEXT,
    "articleUrl" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "bodyOne" TEXT,
    "bodyTwo" TEXT,

    CONSTRAINT "OnboardingMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgresWidget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProgresWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogDataWidgets" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "LogDataWidgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveHistoryTrackerWidget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortPosition" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "benchmarkType" "BenchmarkType" NOT NULL DEFAULT E'MAXLOAD',
    "repType" "WorkoutMoveRepType" NOT NULL,
    "reps" DOUBLE PRECISION,
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT E'METRES',
    "loadAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "timeUnit" "TimeUnit" NOT NULL DEFAULT E'SECONDS',
    "equipmentId" TEXT,
    "moveId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MoveHistoryTrackerWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMeditationLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayNumber" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "minutesLogged" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserMeditationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMobilityLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayNumber" INTEGER NOT NULL,
    "minutesLogged" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserMobilityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEatWellLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayNumber" INTEGER NOT NULL,
    "rating" "UserDayLogRating" NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserEatWellLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSleepWellLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayNumber" INTEGER NOT NULL,
    "rating" "UserDayLogRating" NOT NULL,
    "minutesSlept" INTEGER NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSleepWellLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OnboardingMessageToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMeditationLog_dayNumber_userId_key" ON "UserMeditationLog"("dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMobilityLog_dayNumber_userId_key" ON "UserMobilityLog"("dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEatWellLog_dayNumber_userId_key" ON "UserEatWellLog"("dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSleepWellLog_dayNumber_userId_key" ON "UserSleepWellLog"("dayNumber", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_OnboardingMessageToUser_AB_unique" ON "_OnboardingMessageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OnboardingMessageToUser_B_index" ON "_OnboardingMessageToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "UserDayLogMood_dayNumber_userId_key" ON "UserDayLogMood"("dayNumber", "userId");

-- AddForeignKey
ALTER TABLE "MoveHistoryTrackerWidget" ADD CONSTRAINT "MoveHistoryTrackerWidget_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveHistoryTrackerWidget" ADD CONSTRAINT "MoveHistoryTrackerWidget_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveHistoryTrackerWidget" ADD CONSTRAINT "MoveHistoryTrackerWidget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMeditationLog" ADD CONSTRAINT "UserMeditationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMobilityLog" ADD CONSTRAINT "UserMobilityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEatWellLog" ADD CONSTRAINT "UserEatWellLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSleepWellLog" ADD CONSTRAINT "UserSleepWellLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnboardingMessageToUser" ADD FOREIGN KEY ("A") REFERENCES "OnboardingMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OnboardingMessageToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

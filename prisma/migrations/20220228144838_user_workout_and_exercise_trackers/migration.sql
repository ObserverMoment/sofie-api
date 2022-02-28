/*
  Warnings:

  - You are about to drop the `MoveHistoryTrackerWidget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MoveHistoryTrackerWidget" DROP CONSTRAINT "MoveHistoryTrackerWidget_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "MoveHistoryTrackerWidget" DROP CONSTRAINT "MoveHistoryTrackerWidget_moveId_fkey";

-- DropForeignKey
ALTER TABLE "MoveHistoryTrackerWidget" DROP CONSTRAINT "MoveHistoryTrackerWidget_userId_fkey";

-- DropTable
DROP TABLE "MoveHistoryTrackerWidget";

-- CreateTable
CREATE TABLE "UserScoredWorkoutTracker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "UserScoredWorkoutTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMaxLoadExerciseTracker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "LoadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,

    CONSTRAINT "UserMaxLoadExerciseTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFastestTimeExerciseTracker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "repType" "WorkoutMoveRepType" NOT NULL DEFAULT E'REPS',
    "reps" DOUBLE PRECISION NOT NULL,
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT E'METRES',
    "loadAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,

    CONSTRAINT "UserFastestTimeExerciseTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMaxUnbrokenExerciseTracker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "repType" "WorkoutMoveRepType" NOT NULL DEFAULT E'REPS',
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT E'METRES',
    "loadAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,

    CONSTRAINT "UserMaxUnbrokenExerciseTracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExerciseTrackerManualEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "userScoredWorkoutTrackerId" TEXT,
    "userExerciseTrackerMaxLoadId" TEXT,
    "userFastestTimeExerciseTrackerId" TEXT,
    "userMaxUnbrokenExerciseTrackerId" TEXT,

    CONSTRAINT "WorkoutExerciseTrackerManualEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserScoredWorkoutTracker" ADD CONSTRAINT "UserScoredWorkoutTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScoredWorkoutTracker" ADD CONSTRAINT "UserScoredWorkoutTracker_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxLoadExerciseTracker" ADD CONSTRAINT "UserMaxLoadExerciseTracker_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxLoadExerciseTracker" ADD CONSTRAINT "UserMaxLoadExerciseTracker_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxLoadExerciseTracker" ADD CONSTRAINT "UserMaxLoadExerciseTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFastestTimeExerciseTracker" ADD CONSTRAINT "UserFastestTimeExerciseTracker_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFastestTimeExerciseTracker" ADD CONSTRAINT "UserFastestTimeExerciseTracker_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFastestTimeExerciseTracker" ADD CONSTRAINT "UserFastestTimeExerciseTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxUnbrokenExerciseTracker" ADD CONSTRAINT "UserMaxUnbrokenExerciseTracker_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxUnbrokenExerciseTracker" ADD CONSTRAINT "UserMaxUnbrokenExerciseTracker_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMaxUnbrokenExerciseTracker" ADD CONSTRAINT "UserMaxUnbrokenExerciseTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" ADD CONSTRAINT "WorkoutExerciseTrackerManualEntry_userScoredWorkoutTracker_fkey" FOREIGN KEY ("userScoredWorkoutTrackerId") REFERENCES "UserScoredWorkoutTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" ADD CONSTRAINT "WorkoutExerciseTrackerManualEntry_userExerciseTrackerMaxLo_fkey" FOREIGN KEY ("userExerciseTrackerMaxLoadId") REFERENCES "UserMaxLoadExerciseTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" ADD CONSTRAINT "WorkoutExerciseTrackerManualEntry_userFastestTimeExerciseT_fkey" FOREIGN KEY ("userFastestTimeExerciseTrackerId") REFERENCES "UserFastestTimeExerciseTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseTrackerManualEntry" ADD CONSTRAINT "WorkoutExerciseTrackerManualEntry_userMaxUnbrokenExerciseT_fkey" FOREIGN KEY ("userMaxUnbrokenExerciseTrackerId") REFERENCES "UserMaxUnbrokenExerciseTracker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

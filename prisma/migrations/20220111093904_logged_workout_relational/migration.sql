-- CreateTable
CREATE TABLE "LoggedWorkoutSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionRoundNumber" INTEGER NOT NULL,
    "timeTakenSeconds" INTEGER,
    "loggedWorkoutSectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LoggedWorkoutSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedWorkoutMove" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortPosition" INTEGER NOT NULL,
    "repType" "WorkoutMoveRepType" NOT NULL,
    "reps" DOUBLE PRECISION NOT NULL,
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT E'METRES',
    "loadAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "timeUnit" "TimeUnit" NOT NULL DEFAULT E'SECONDS',
    "equipmentId" TEXT,
    "moveId" TEXT NOT NULL,
    "loggedWorkoutSetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LoggedWorkoutMove_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSet" ADD CONSTRAINT "LoggedWorkoutSet_loggedWorkoutSectionId_fkey" FOREIGN KEY ("loggedWorkoutSectionId") REFERENCES "LoggedWorkoutSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSet" ADD CONSTRAINT "LoggedWorkoutSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_loggedWorkoutSetId_fkey" FOREIGN KEY ("loggedWorkoutSetId") REFERENCES "LoggedWorkoutSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutMove" ADD CONSTRAINT "LoggedWorkoutMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

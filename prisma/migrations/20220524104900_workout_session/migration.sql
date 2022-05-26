-- CreateEnum
CREATE TYPE "CardioZone" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateTable
CREATE TABLE "MobilityMove" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "scope" "MoveScope" NOT NULL DEFAULT E'CUSTOM',
    "name" TEXT NOT NULL,
    "searchTerms" TEXT,
    "description" TEXT,
    "demoVideoUri" TEXT,
    "demoVideoThumbUri" TEXT,
    "userId" TEXT,
    "mobilityMoveTypeId" TEXT,

    CONSTRAINT "MobilityMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilityMoveType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUri" TEXT,

    CONSTRAINT "MobilityMoveType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contentAccessScope" "ContentAccessScope" NOT NULL DEFAULT E'PRIVATE',
    "introVideoUri" TEXT,
    "introAudioUri" TEXT,
    "coverImageUri" TEXT,
    "introVideoThumbUri" TEXT,
    "lengthMinutes" INTEGER,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "sessionOrder" TEXT[],
    "userId" TEXT NOT NULL,
    "metaTags" TEXT[],
    "difficultyLevel" "DifficultyLevel",

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardioSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "exerciseOrder" TEXT[],
    "workoutSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CardioSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardioExercise" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "time" DOUBLE PRECISION,
    "timeUnit" "TimeUnit" NOT NULL DEFAULT E'SECONDS',
    "distance" DOUBLE PRECISION,
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT E'METRES',
    "cardioZone" "CardioZone" NOT NULL,
    "moveId" TEXT NOT NULL,
    "cardioSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CardioExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResistanceSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "setOrder" TEXT[],
    "workoutSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResistanceSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResistanceExercise" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "setOrder" TEXT[],
    "resistanceSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResistanceExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResistanceSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "reps" INTEGER NOT NULL,
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,
    "resistanceExerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResistanceSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervalSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "repeats" INTEGER NOT NULL DEFAULT 1,
    "intervalExerciseOrder" TEXT[],
    "intervals" INTEGER[],
    "workoutSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IntervalSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervalExercise" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "intervalSetOrder" TEXT[],
    "intervalSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IntervalExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervalSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,
    "intervalExerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IntervalSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmrapSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "sectionOrder" TEXT[],
    "workoutSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AmrapSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmrapSection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "moveOrder" TEXT[],
    "amrapSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AmrapSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmrapMove" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,
    "amrapSectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AmrapMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForTimeSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "repeats" INTEGER NOT NULL DEFAULT 1,
    "timecapSeconds" INTEGER NOT NULL DEFAULT 0,
    "sectionOrder" TEXT[],
    "workoutSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForTimeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForTimeSection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "moveOrder" TEXT[],
    "forTimeSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForTimeSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForTimeMove" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,
    "forTimeSectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ForTimeMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilitySession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "durationMinutes" INTEGER NOT NULL,
    "moveOrder" TEXT[],
    "workoutSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MobilitySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MobilityMoveToMobilitySession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MobilityMoveToMobilitySession_AB_unique" ON "_MobilityMoveToMobilitySession"("A", "B");

-- CreateIndex
CREATE INDEX "_MobilityMoveToMobilitySession_B_index" ON "_MobilityMoveToMobilitySession"("B");

-- AddForeignKey
ALTER TABLE "MobilityMove" ADD CONSTRAINT "MobilityMove_mobilityMoveTypeId_fkey" FOREIGN KEY ("mobilityMoveTypeId") REFERENCES "MobilityMoveType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityMove" ADD CONSTRAINT "MobilityMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioSession" ADD CONSTRAINT "CardioSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioSession" ADD CONSTRAINT "CardioSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioExercise" ADD CONSTRAINT "CardioExercise_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioExercise" ADD CONSTRAINT "CardioExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioExercise" ADD CONSTRAINT "CardioExercise_cardioSessionId_fkey" FOREIGN KEY ("cardioSessionId") REFERENCES "CardioSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSession" ADD CONSTRAINT "ResistanceSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSession" ADD CONSTRAINT "ResistanceSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceExercise" ADD CONSTRAINT "ResistanceExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceExercise" ADD CONSTRAINT "ResistanceExercise_resistanceSessionId_fkey" FOREIGN KEY ("resistanceSessionId") REFERENCES "ResistanceSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSet" ADD CONSTRAINT "ResistanceSet_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSet" ADD CONSTRAINT "ResistanceSet_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSet" ADD CONSTRAINT "ResistanceSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResistanceSet" ADD CONSTRAINT "ResistanceSet_resistanceExerciseId_fkey" FOREIGN KEY ("resistanceExerciseId") REFERENCES "ResistanceExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSession" ADD CONSTRAINT "IntervalSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSession" ADD CONSTRAINT "IntervalSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalExercise" ADD CONSTRAINT "IntervalExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalExercise" ADD CONSTRAINT "IntervalExercise_intervalSessionId_fkey" FOREIGN KEY ("intervalSessionId") REFERENCES "IntervalSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSet" ADD CONSTRAINT "IntervalSet_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSet" ADD CONSTRAINT "IntervalSet_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSet" ADD CONSTRAINT "IntervalSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSet" ADD CONSTRAINT "IntervalSet_intervalExerciseId_fkey" FOREIGN KEY ("intervalExerciseId") REFERENCES "IntervalExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSession" ADD CONSTRAINT "AmrapSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSession" ADD CONSTRAINT "AmrapSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSection" ADD CONSTRAINT "AmrapSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapSection" ADD CONSTRAINT "AmrapSection_amrapSessionId_fkey" FOREIGN KEY ("amrapSessionId") REFERENCES "AmrapSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapMove" ADD CONSTRAINT "AmrapMove_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapMove" ADD CONSTRAINT "AmrapMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapMove" ADD CONSTRAINT "AmrapMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrapMove" ADD CONSTRAINT "AmrapMove_amrapSectionId_fkey" FOREIGN KEY ("amrapSectionId") REFERENCES "AmrapSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSession" ADD CONSTRAINT "ForTimeSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSession" ADD CONSTRAINT "ForTimeSession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSection" ADD CONSTRAINT "ForTimeSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeSection" ADD CONSTRAINT "ForTimeSection_forTimeSessionId_fkey" FOREIGN KEY ("forTimeSessionId") REFERENCES "ForTimeSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeMove" ADD CONSTRAINT "ForTimeMove_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeMove" ADD CONSTRAINT "ForTimeMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeMove" ADD CONSTRAINT "ForTimeMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForTimeMove" ADD CONSTRAINT "ForTimeMove_forTimeSectionId_fkey" FOREIGN KEY ("forTimeSectionId") REFERENCES "ForTimeSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilitySession" ADD CONSTRAINT "MobilitySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilitySession" ADD CONSTRAINT "MobilitySession_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MobilityMoveToMobilitySession" ADD CONSTRAINT "_MobilityMoveToMobilitySession_A_fkey" FOREIGN KEY ("A") REFERENCES "MobilityMove"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MobilityMoveToMobilitySession" ADD CONSTRAINT "_MobilityMoveToMobilitySession_B_fkey" FOREIGN KEY ("B") REFERENCES "MobilitySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

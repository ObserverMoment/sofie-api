-- CreateTable
CREATE TABLE "SavedCardioSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardioSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedCardioSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedResistanceSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resistanceSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedResistanceSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedIntervalSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "intervalSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedIntervalSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedAmrapSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amrapSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedAmrapSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedForTimeSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "forTimeSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedForTimeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMobilitySession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mobilitySessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedMobilitySession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedCardioSession_cardioSessionId_userId_key" ON "SavedCardioSession"("cardioSessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedResistanceSession_resistanceSessionId_userId_key" ON "SavedResistanceSession"("resistanceSessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedIntervalSession_intervalSessionId_userId_key" ON "SavedIntervalSession"("intervalSessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedAmrapSession_amrapSessionId_userId_key" ON "SavedAmrapSession"("amrapSessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedForTimeSession_forTimeSessionId_userId_key" ON "SavedForTimeSession"("forTimeSessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedMobilitySession_mobilitySessionId_userId_key" ON "SavedMobilitySession"("mobilitySessionId", "userId");

-- AddForeignKey
ALTER TABLE "SavedCardioSession" ADD CONSTRAINT "SavedCardioSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCardioSession" ADD CONSTRAINT "SavedCardioSession_cardioSessionId_fkey" FOREIGN KEY ("cardioSessionId") REFERENCES "CardioSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedResistanceSession" ADD CONSTRAINT "SavedResistanceSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedResistanceSession" ADD CONSTRAINT "SavedResistanceSession_resistanceSessionId_fkey" FOREIGN KEY ("resistanceSessionId") REFERENCES "ResistanceSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedIntervalSession" ADD CONSTRAINT "SavedIntervalSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedIntervalSession" ADD CONSTRAINT "SavedIntervalSession_intervalSessionId_fkey" FOREIGN KEY ("intervalSessionId") REFERENCES "IntervalSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAmrapSession" ADD CONSTRAINT "SavedAmrapSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAmrapSession" ADD CONSTRAINT "SavedAmrapSession_amrapSessionId_fkey" FOREIGN KEY ("amrapSessionId") REFERENCES "AmrapSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedForTimeSession" ADD CONSTRAINT "SavedForTimeSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedForTimeSession" ADD CONSTRAINT "SavedForTimeSession_forTimeSessionId_fkey" FOREIGN KEY ("forTimeSessionId") REFERENCES "ForTimeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMobilitySession" ADD CONSTRAINT "SavedMobilitySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMobilitySession" ADD CONSTRAINT "SavedMobilitySession_mobilitySessionId_fkey" FOREIGN KEY ("mobilitySessionId") REFERENCES "MobilitySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `bodyweightUnit` on the `ProgressJournal` table. All the data in the column will be lost.
  - You are about to drop the column `bodyweight` on the `ProgressJournalEntry` table. All the data in the column will be lost.
  - You are about to drop the `BodyTransformationPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BodyTransformationPhoto" DROP CONSTRAINT "BodyTransformationPhoto_userId_fkey";

-- AlterTable
ALTER TABLE "ProgressJournal" DROP COLUMN "bodyweightUnit";

-- AlterTable
ALTER TABLE "ProgressJournalEntry" DROP COLUMN "bodyweight";

-- DropTable
DROP TABLE "BodyTransformationPhoto";

-- CreateTable
CREATE TABLE "BodyTrackingEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fatPercent" DOUBLE PRECISION,
    "bodyweight" DOUBLE PRECISION,
    "bodyweightUnit" "BodyweightUnit" NOT NULL DEFAULT E'KG',
    "photoUris" TEXT[],
    "note" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BodyTrackingEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BodyTrackingEntry" ADD CONSTRAINT "BodyTrackingEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "ResistanceSession" ADD COLUMN     "clubId" TEXT;

-- AddForeignKey
ALTER TABLE "ResistanceSession" ADD CONSTRAINT "ResistanceSession_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

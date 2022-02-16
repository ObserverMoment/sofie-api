-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ClubMemberNote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "tags" TEXT[],
    "authorId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "ClubMemberNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubMemberNote" ADD CONSTRAINT "ClubMemberNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMemberNote" ADD CONSTRAINT "ClubMemberNote_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubMemberNote" ADD CONSTRAINT "ClubMemberNote_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

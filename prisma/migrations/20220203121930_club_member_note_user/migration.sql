/*
  Warnings:

  - You are about to drop the column `authorId` on the `ClubMemberNote` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ClubMemberNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClubMemberNote" DROP CONSTRAINT "ClubMemberNote_authorId_fkey";

-- AlterTable
ALTER TABLE "ClubMemberNote" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClubMemberNote" ADD CONSTRAINT "ClubMemberNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

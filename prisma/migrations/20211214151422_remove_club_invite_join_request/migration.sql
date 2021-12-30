/*
  Warnings:

  - You are about to drop the `JoinClubInvite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JoinClubRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JoinClubInvite" DROP CONSTRAINT "JoinClubInvite_clubId_fkey";

-- DropForeignKey
ALTER TABLE "JoinClubInvite" DROP CONSTRAINT "JoinClubInvite_invitedId_fkey";

-- DropForeignKey
ALTER TABLE "JoinClubInvite" DROP CONSTRAINT "JoinClubInvite_responderId_fkey";

-- DropForeignKey
ALTER TABLE "JoinClubInvite" DROP CONSTRAINT "JoinClubInvite_senderId_fkey";

-- DropForeignKey
ALTER TABLE "JoinClubRequest" DROP CONSTRAINT "JoinClubRequest_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "JoinClubRequest" DROP CONSTRAINT "JoinClubRequest_clubId_fkey";

-- DropForeignKey
ALTER TABLE "JoinClubRequest" DROP CONSTRAINT "JoinClubRequest_responderId_fkey";

-- DropTable
DROP TABLE "JoinClubInvite";

-- DropTable
DROP TABLE "JoinClubRequest";

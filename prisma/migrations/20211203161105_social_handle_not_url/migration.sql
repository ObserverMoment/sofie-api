/*
  Warnings:

  - You are about to drop the column `instagramUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `snapUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tiktokUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "instagramUrl",
DROP COLUMN "linkedinUrl",
DROP COLUMN "snapUrl",
DROP COLUMN "tiktokUrl",
DROP COLUMN "youtubeUrl",
ADD COLUMN     "instagramHandle" TEXT,
ADD COLUMN     "linkedinHandle" TEXT,
ADD COLUMN     "snapHandle" TEXT,
ADD COLUMN     "tiktokHandle" TEXT,
ADD COLUMN     "youtubeHandle" TEXT;

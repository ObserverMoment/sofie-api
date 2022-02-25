/*
  Warnings:

  - You are about to drop the column `articleUrl` on the `OnboardingMessage` table. All the data in the column will be lost.
  - You are about to drop the column `audioUri` on the `OnboardingMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnboardingMessage" DROP COLUMN "articleUrl",
DROP COLUMN "audioUri",
ADD COLUMN     "routeTo" TEXT;

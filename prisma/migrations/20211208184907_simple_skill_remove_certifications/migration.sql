/*
  Warnings:

  - You are about to drop the column `description` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `Certification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_userId_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "description",
ADD COLUMN     "awardingBody" TEXT,
ADD COLUMN     "certificateRef" TEXT,
ADD COLUMN     "certification" TEXT,
ADD COLUMN     "documentUri" TEXT;

-- DropTable
DROP TABLE "Certification";

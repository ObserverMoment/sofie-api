/*
  Warnings:

  - You are about to drop the `ProgresWidget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProgresWidget";

-- CreateTable
CREATE TABLE "ProgressWidget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,

    CONSTRAINT "ProgressWidget_pkey" PRIMARY KEY ("id")
);

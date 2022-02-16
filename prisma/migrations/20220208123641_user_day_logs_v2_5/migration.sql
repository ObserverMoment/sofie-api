/*
  Warnings:

  - You are about to drop the `LogDataWidgets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LogDataWidgets";

-- CreateTable
CREATE TABLE "LogDataWidget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,

    CONSTRAINT "LogDataWidget_pkey" PRIMARY KEY ("id")
);

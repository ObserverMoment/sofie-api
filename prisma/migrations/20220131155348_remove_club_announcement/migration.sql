/*
  Warnings:

  - You are about to drop the `ClubAnnouncement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubAnnouncement" DROP CONSTRAINT "ClubAnnouncement_clubId_fkey";

-- DropForeignKey
ALTER TABLE "ClubAnnouncement" DROP CONSTRAINT "ClubAnnouncement_userId_fkey";

-- DropTable
DROP TABLE "ClubAnnouncement";

-- CreateTable
CREATE TABLE "AnnouncementUpdate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUri" TEXT,
    "videoUri" TEXT,
    "audioUri" TEXT,
    "articleUrl" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "bodyOne" TEXT,
    "bodyTwo" TEXT,

    CONSTRAINT "AnnouncementUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnouncementUpdateAction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "routeTo" TEXT NOT NULL,
    "announcementUpdateId" TEXT NOT NULL,

    CONSTRAINT "AnnouncementUpdateAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnouncementUpdateAction" ADD CONSTRAINT "AnnouncementUpdateAction_announcementUpdateId_fkey" FOREIGN KEY ("announcementUpdateId") REFERENCES "AnnouncementUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

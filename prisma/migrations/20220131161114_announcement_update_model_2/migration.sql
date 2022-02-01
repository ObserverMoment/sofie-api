-- CreateTable
CREATE TABLE "_AnnouncementUpdateToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnnouncementUpdateToUser_AB_unique" ON "_AnnouncementUpdateToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AnnouncementUpdateToUser_B_index" ON "_AnnouncementUpdateToUser"("B");

-- AddForeignKey
ALTER TABLE "_AnnouncementUpdateToUser" ADD FOREIGN KEY ("A") REFERENCES "AnnouncementUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnnouncementUpdateToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

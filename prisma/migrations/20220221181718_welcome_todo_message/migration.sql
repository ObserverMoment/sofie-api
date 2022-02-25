/*
  Warnings:

  - You are about to drop the `OnboardingMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OnboardingMessageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OnboardingMessageToUser" DROP CONSTRAINT "_OnboardingMessageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OnboardingMessageToUser" DROP CONSTRAINT "_OnboardingMessageToUser_B_fkey";

-- DropTable
DROP TABLE "OnboardingMessage";

-- DropTable
DROP TABLE "_OnboardingMessageToUser";

-- CreateTable
CREATE TABLE "WelcomeTodoItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoUri" TEXT,
    "routeTo" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "WelcomeTodoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWelcomeTodoItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWelcomeTodoItem_AB_unique" ON "_UserToWelcomeTodoItem"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWelcomeTodoItem_B_index" ON "_UserToWelcomeTodoItem"("B");

-- AddForeignKey
ALTER TABLE "_UserToWelcomeTodoItem" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWelcomeTodoItem" ADD FOREIGN KEY ("B") REFERENCES "WelcomeTodoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

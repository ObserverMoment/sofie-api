-- CreateTable
CREATE TABLE "Circle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "coverImageUri" TEXT,
    "introVideoUri" TEXT,
    "introVideoThumbUri" TEXT,
    "introAudioUri" TEXT,
    "userId" TEXT NOT NULL,
    "contentAccessScope" "ContentAccessScope" NOT NULL DEFAULT E'PRIVATE',
    "validated" "PublicContentValidationStatus" NOT NULL DEFAULT E'VALID',
    "reasonNotValidated" TEXT,
    "metaTags" TEXT[],

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircleMemberNote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "tags" TEXT[],
    "userId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,

    CONSTRAINT "CircleMemberNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircleInviteToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "inviteLimit" INTEGER NOT NULL DEFAULT 0,
    "joinedUserIds" TEXT[],
    "name" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CircleInviteToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_circle_admin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_circle_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Circle_name_key" ON "Circle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_circle_admin_AB_unique" ON "_circle_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_circle_admin_B_index" ON "_circle_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_circle_member_AB_unique" ON "_circle_member"("A", "B");

-- CreateIndex
CREATE INDEX "_circle_member_B_index" ON "_circle_member"("B");

-- AddForeignKey
ALTER TABLE "Circle" ADD CONSTRAINT "Circle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleMemberNote" ADD CONSTRAINT "CircleMemberNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleMemberNote" ADD CONSTRAINT "CircleMemberNote_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleMemberNote" ADD CONSTRAINT "CircleMemberNote_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleInviteToken" ADD CONSTRAINT "CircleInviteToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleInviteToken" ADD CONSTRAINT "CircleInviteToken_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_circle_admin" ADD CONSTRAINT "_circle_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_circle_admin" ADD CONSTRAINT "_circle_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_circle_member" ADD CONSTRAINT "_circle_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_circle_member" ADD CONSTRAINT "_circle_member_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

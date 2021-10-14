-- CreateEnum
CREATE TYPE "BenchmarkType" AS ENUM ('UNBROKENREPS', 'UNBROKENTIME', 'MAXLOAD', 'FASTESTTIME', 'AMRAP');

-- CreateEnum
CREATE TYPE "BodyAreaFrontBack" AS ENUM ('BACK', 'FRONT', 'BOTH');

-- CreateEnum
CREATE TYPE "BodyAreaUpperLower" AS ENUM ('CORE', 'LOWER', 'UPPER');

-- CreateEnum
CREATE TYPE "BodyweightUnit" AS ENUM ('KG', 'LB');

-- CreateEnum
CREATE TYPE "ContentAccessScope" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('LIGHT', 'CHALLENGING', 'INTERMEDIATE', 'ADVANCED', 'ELITE');

-- CreateEnum
CREATE TYPE "DistanceUnit" AS ENUM ('METRES', 'KILOMETRES', 'YARDS', 'MILES');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NONBINARY', 'PNTS');

-- CreateEnum
CREATE TYPE "HeightUnit" AS ENUM ('CM', 'IN');

-- CreateEnum
CREATE TYPE "JoinClubRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LoadUnit" AS ENUM ('KG', 'LB', 'BODYWEIGHTPERCENT', 'PERCENTMAX');

-- CreateEnum
CREATE TYPE "MoveScope" AS ENUM ('STANDARD', 'CUSTOM');

-- CreateEnum
CREATE TYPE "TimeUnit" AS ENUM ('HOURS', 'MINUTES', 'SECONDS');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LB');

-- CreateEnum
CREATE TYPE "WorkoutMoveRepType" AS ENUM ('REPS', 'CALORIES', 'DISTANCE', 'TIME');

-- CreateEnum
CREATE TYPE "WorkoutSetGeneratorTarget" AS ENUM ('REPS', 'LOAD');

-- CreateEnum
CREATE TYPE "WorkoutSetGeneratorType" AS ENUM ('LADDERUP', 'LADDERDOWN', 'PYRAMIDUP', 'PYRAMIDDOWN');

-- CreateEnum
CREATE TYPE "UserProfileScope" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyArea" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "altNames" TEXT,
    "frontBack" "BodyAreaFrontBack" NOT NULL DEFAULT E'FRONT',
    "upperLower" "BodyAreaUpperLower" NOT NULL DEFAULT E'UPPER',

    CONSTRAINT "BodyArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyAreaMoveScore" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moveId" TEXT NOT NULL,
    "bodyAreaId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "BodyAreaMoveScore_pkey" PRIMARY KEY ("moveId","bodyAreaId")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "altNames" TEXT,
    "loadAdjustable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "scope" "MoveScope" NOT NULL DEFAULT E'CUSTOM',
    "name" TEXT NOT NULL,
    "searchTerms" TEXT,
    "description" TEXT,
    "demoVideoUri" TEXT,
    "demoVideoThumbUri" TEXT,
    "moveTypeId" TEXT,
    "validRepTypes" "WorkoutMoveRepType"[],
    "userId" TEXT,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUri" TEXT,

    CONSTRAINT "MoveType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hexColor" TEXT NOT NULL,

    CONSTRAINT "WorkoutGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSectionType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "validRepTypes" "WorkoutMoveRepType"[],

    CONSTRAINT "WorkoutSectionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymProfile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GymProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutId" TEXT,
    "loggedWorkoutId" TEXT,
    "gymProfileId" TEXT,
    "note" TEXT,
    "workoutPlanEnrolmentId" TEXT,

    CONSTRAINT "ScheduledWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "userProfileScope" "UserProfileScope" NOT NULL DEFAULT E'PRIVATE',
    "avatarUri" TEXT,
    "introVideoUri" TEXT,
    "introVideoThumbUri" TEXT,
    "displayName" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "bio" TEXT,
    "tagline" TEXT,
    "birthdate" TIMESTAMP(3),
    "gender" "Gender" NOT NULL DEFAULT E'PNTS',
    "townCity" TEXT,
    "countryCode" TEXT,
    "instagramUrl" TEXT,
    "tiktokUrl" TEXT,
    "youtubeUrl" TEXT,
    "snapUrl" TEXT,
    "linkedinUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBenchmarkTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "UserBenchmarkTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBenchmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEntryAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "benchmarkType" "BenchmarkType" NOT NULL DEFAULT E'MAXLOAD',
    "equipmentInfo" TEXT,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',

    CONSTRAINT "UserBenchmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBenchmarkEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "completedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "videoUri" TEXT,
    "videoThumbUri" TEXT,
    "userBenchmarkId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserBenchmarkEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
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

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubInviteToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL,
    "inviteLimit" INTEGER NOT NULL DEFAULT 0,
    "clubId" TEXT NOT NULL,
    "joinedUserIds" TEXT[],
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClubInviteToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinClubRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "JoinClubRequestStatus" NOT NULL DEFAULT E'PENDING',
    "respondedAt" TIMESTAMP(3),
    "applicantId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "responderId" TEXT,

    CONSTRAINT "JoinClubRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinClubInvite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitedId" TEXT NOT NULL,
    "status" "JoinClubRequestStatus" NOT NULL DEFAULT E'PENDING',
    "respondedAt" TIMESTAMP(3),
    "clubId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "responderId" TEXT,

    CONSTRAINT "JoinClubInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "introVideoUri" TEXT,
    "introAudioUri" TEXT,
    "coverImageUri" TEXT,
    "contentAccessScope" "ContentAccessScope" NOT NULL DEFAULT E'PRIVATE',
    "userId" TEXT NOT NULL,
    "introVideoThumbUri" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "difficultyLevel" "DifficultyLevel" NOT NULL DEFAULT E'INTERMEDIATE',
    "lengthMinutes" INTEGER,
    "metaData" JSONB,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "WorkoutTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortPosition" INTEGER NOT NULL,
    "introVideoUri" TEXT,
    "introAudioUri" TEXT,
    "classAudioUri" TEXT,
    "workoutId" TEXT NOT NULL,
    "name" TEXT,
    "classVideoUri" TEXT,
    "introVideoThumbUri" TEXT,
    "workoutSectionTypeId" TEXT NOT NULL,
    "classVideoThumbUri" TEXT,
    "rounds" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "timecap" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WorkoutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortPosition" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL DEFAULT 1,
    "workoutSectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,

    CONSTRAINT "WorkoutSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutMove" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortPosition" INTEGER NOT NULL,
    "repType" "WorkoutMoveRepType" NOT NULL,
    "reps" DOUBLE PRECISION NOT NULL,
    "distanceUnit" "DistanceUnit" NOT NULL DEFAULT E'METRES',
    "loadAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loadUnit" "LoadUnit" NOT NULL DEFAULT E'KG',
    "moveId" TEXT NOT NULL,
    "equipmentId" TEXT,
    "workoutSetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeUnit" "TimeUnit" NOT NULL DEFAULT E'SECONDS',

    CONSTRAINT "WorkoutMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverImageUri" TEXT,
    "introVideoUri" TEXT,
    "introVideoThumbUri" TEXT,
    "introAudioUri" TEXT,
    "contentAccessScope" "ContentAccessScope" NOT NULL DEFAULT E'PRIVATE',
    "userId" TEXT NOT NULL,
    "lengthWeeks" INTEGER NOT NULL DEFAULT 2,
    "daysPerWeek" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlanDay" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "dayNumber" INTEGER NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPlanDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlanDayWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "sortPosition" INTEGER NOT NULL,
    "workoutId" TEXT NOT NULL,
    "workoutPlanDayId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPlanDayWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlanEnrolment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "completedPlanDayWorkoutIds" TEXT[],

    CONSTRAINT "WorkoutPlanEnrolment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlanReview" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "workoutPlanId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPlanReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedWorkout" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedOn" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workoutId" TEXT,
    "note" TEXT,
    "gymProfileId" TEXT,

    CONSTRAINT "LoggedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedWorkoutSection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loggedWorkoutId" TEXT NOT NULL,
    "workoutSectionTypeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "sortPosition" INTEGER NOT NULL,
    "repScore" INTEGER,
    "timeTakenSeconds" INTEGER NOT NULL DEFAULT 1800,
    "loggedWorkoutSectionData" JSONB,

    CONSTRAINT "LoggedWorkoutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyTransformationPhoto" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bodyweight" DOUBLE PRECISION,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    "photoUri" TEXT NOT NULL,
    "takenOnDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyTransformationPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressJournal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverImageUri" TEXT,
    "bodyweightUnit" "BodyweightUnit" NOT NULL DEFAULT E'KG',

    CONSTRAINT "ProgressJournal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressJournalEntry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voiceNoteUri" TEXT,
    "bodyweight" DOUBLE PRECISION,
    "moodScore" DOUBLE PRECISION,
    "energyScore" DOUBLE PRECISION,
    "motivationScore" DOUBLE PRECISION,
    "progressJournalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "note" TEXT,
    "confidenceScore" DOUBLE PRECISION,

    CONSTRAINT "ProgressJournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressJournalGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "progressJournalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProgressJournalGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressJournalGoalTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag" TEXT NOT NULL,
    "hexColor" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProgressJournalGoalTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BodyAreaToLoggedWorkoutSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EquipmentToGymProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_moveToRequiredEquipments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_moveToSelectableEquipments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LoggedWorkoutSectionToMoveType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LoggedWorkoutToWorkoutGoal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WorkoutToWorkoutGoal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToWorkoutPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_admin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserBenchmarkToUserBenchmarkTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubToWorkoutPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WorkoutToWorkoutTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WorkoutPlanToWorkoutTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProgressJournalGoalToProgressJournalGoalTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_firebaseUid_key" ON "Admin"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "BodyArea_name_key" ON "BodyArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledWorkout_loggedWorkoutId_key" ON "ScheduledWorkout"("loggedWorkoutId");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_displayName_key" ON "User"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "_BodyAreaToLoggedWorkoutSection_AB_unique" ON "_BodyAreaToLoggedWorkoutSection"("A", "B");

-- CreateIndex
CREATE INDEX "_BodyAreaToLoggedWorkoutSection_B_index" ON "_BodyAreaToLoggedWorkoutSection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToGymProfile_AB_unique" ON "_EquipmentToGymProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToGymProfile_B_index" ON "_EquipmentToGymProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_moveToRequiredEquipments_AB_unique" ON "_moveToRequiredEquipments"("A", "B");

-- CreateIndex
CREATE INDEX "_moveToRequiredEquipments_B_index" ON "_moveToRequiredEquipments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_moveToSelectableEquipments_AB_unique" ON "_moveToSelectableEquipments"("A", "B");

-- CreateIndex
CREATE INDEX "_moveToSelectableEquipments_B_index" ON "_moveToSelectableEquipments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LoggedWorkoutSectionToMoveType_AB_unique" ON "_LoggedWorkoutSectionToMoveType"("A", "B");

-- CreateIndex
CREATE INDEX "_LoggedWorkoutSectionToMoveType_B_index" ON "_LoggedWorkoutSectionToMoveType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LoggedWorkoutToWorkoutGoal_AB_unique" ON "_LoggedWorkoutToWorkoutGoal"("A", "B");

-- CreateIndex
CREATE INDEX "_LoggedWorkoutToWorkoutGoal_B_index" ON "_LoggedWorkoutToWorkoutGoal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutToWorkoutGoal_AB_unique" ON "_WorkoutToWorkoutGoal"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutToWorkoutGoal_B_index" ON "_WorkoutToWorkoutGoal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToWorkout_AB_unique" ON "_CollectionToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToWorkout_B_index" ON "_CollectionToWorkout"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToWorkoutPlan_AB_unique" ON "_CollectionToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToWorkoutPlan_B_index" ON "_CollectionToWorkoutPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_member_AB_unique" ON "_member"("A", "B");

-- CreateIndex
CREATE INDEX "_member_B_index" ON "_member"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBenchmarkToUserBenchmarkTag_AB_unique" ON "_UserBenchmarkToUserBenchmarkTag"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBenchmarkToUserBenchmarkTag_B_index" ON "_UserBenchmarkToUserBenchmarkTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToWorkout_AB_unique" ON "_ClubToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToWorkout_B_index" ON "_ClubToWorkout"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToWorkoutPlan_AB_unique" ON "_ClubToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToWorkoutPlan_B_index" ON "_ClubToWorkoutPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutToWorkoutTag_AB_unique" ON "_WorkoutToWorkoutTag"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutToWorkoutTag_B_index" ON "_WorkoutToWorkoutTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutPlanToWorkoutTag_AB_unique" ON "_WorkoutPlanToWorkoutTag"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutPlanToWorkoutTag_B_index" ON "_WorkoutPlanToWorkoutTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProgressJournalGoalToProgressJournalGoalTag_AB_unique" ON "_ProgressJournalGoalToProgressJournalGoalTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProgressJournalGoalToProgressJournalGoalTag_B_index" ON "_ProgressJournalGoalToProgressJournalGoalTag"("B");

-- AddForeignKey
ALTER TABLE "BodyAreaMoveScore" ADD CONSTRAINT "BodyAreaMoveScore_bodyAreaId_fkey" FOREIGN KEY ("bodyAreaId") REFERENCES "BodyArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyAreaMoveScore" ADD CONSTRAINT "BodyAreaMoveScore_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_moveTypeId_fkey" FOREIGN KEY ("moveTypeId") REFERENCES "MoveType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymProfile" ADD CONSTRAINT "GymProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_gymProfileId_fkey" FOREIGN KEY ("gymProfileId") REFERENCES "GymProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_loggedWorkoutId_fkey" FOREIGN KEY ("loggedWorkoutId") REFERENCES "LoggedWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_workoutPlanEnrolmentId_fkey" FOREIGN KEY ("workoutPlanEnrolmentId") REFERENCES "WorkoutPlanEnrolment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkTag" ADD CONSTRAINT "UserBenchmarkTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmark" ADD CONSTRAINT "UserBenchmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkEntry" ADD CONSTRAINT "UserBenchmarkEntry_userBenchmarkId_fkey" FOREIGN KEY ("userBenchmarkId") REFERENCES "UserBenchmark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBenchmarkEntry" ADD CONSTRAINT "UserBenchmarkEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubInviteToken" ADD CONSTRAINT "ClubInviteToken_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubInviteToken" ADD CONSTRAINT "ClubInviteToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubRequest" ADD CONSTRAINT "JoinClubRequest_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubRequest" ADD CONSTRAINT "JoinClubRequest_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubRequest" ADD CONSTRAINT "JoinClubRequest_responderId_fkey" FOREIGN KEY ("responderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubInvite" ADD CONSTRAINT "JoinClubInvite_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubInvite" ADD CONSTRAINT "JoinClubInvite_invitedId_fkey" FOREIGN KEY ("invitedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubInvite" ADD CONSTRAINT "JoinClubInvite_responderId_fkey" FOREIGN KEY ("responderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinClubInvite" ADD CONSTRAINT "JoinClubInvite_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTag" ADD CONSTRAINT "WorkoutTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSection" ADD CONSTRAINT "WorkoutSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSection" ADD CONSTRAINT "WorkoutSection_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSection" ADD CONSTRAINT "WorkoutSection_workoutSectionTypeId_fkey" FOREIGN KEY ("workoutSectionTypeId") REFERENCES "WorkoutSectionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_workoutSectionId_fkey" FOREIGN KEY ("workoutSectionId") REFERENCES "WorkoutSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutMove" ADD CONSTRAINT "WorkoutMove_workoutSetId_fkey" FOREIGN KEY ("workoutSetId") REFERENCES "WorkoutSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDay" ADD CONSTRAINT "WorkoutPlanDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDay" ADD CONSTRAINT "WorkoutPlanDay_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" ADD CONSTRAINT "WorkoutPlanDayWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" ADD CONSTRAINT "WorkoutPlanDayWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanDayWorkout" ADD CONSTRAINT "WorkoutPlanDayWorkout_workoutPlanDayId_fkey" FOREIGN KEY ("workoutPlanDayId") REFERENCES "WorkoutPlanDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanEnrolment" ADD CONSTRAINT "WorkoutPlanEnrolment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanEnrolment" ADD CONSTRAINT "WorkoutPlanEnrolment_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanReview" ADD CONSTRAINT "WorkoutPlanReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanReview" ADD CONSTRAINT "WorkoutPlanReview_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_gymProfileId_fkey" FOREIGN KEY ("gymProfileId") REFERENCES "GymProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSection" ADD CONSTRAINT "LoggedWorkoutSection_loggedWorkoutId_fkey" FOREIGN KEY ("loggedWorkoutId") REFERENCES "LoggedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSection" ADD CONSTRAINT "LoggedWorkoutSection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkoutSection" ADD CONSTRAINT "LoggedWorkoutSection_workoutSectionTypeId_fkey" FOREIGN KEY ("workoutSectionTypeId") REFERENCES "WorkoutSectionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyTransformationPhoto" ADD CONSTRAINT "BodyTransformationPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressJournal" ADD CONSTRAINT "ProgressJournal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressJournalEntry" ADD CONSTRAINT "ProgressJournalEntry_progressJournalId_fkey" FOREIGN KEY ("progressJournalId") REFERENCES "ProgressJournal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressJournalEntry" ADD CONSTRAINT "ProgressJournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressJournalGoal" ADD CONSTRAINT "ProgressJournalGoal_progressJournalId_fkey" FOREIGN KEY ("progressJournalId") REFERENCES "ProgressJournal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressJournalGoal" ADD CONSTRAINT "ProgressJournalGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressJournalGoalTag" ADD CONSTRAINT "ProgressJournalGoalTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyAreaToLoggedWorkoutSection" ADD FOREIGN KEY ("A") REFERENCES "BodyArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyAreaToLoggedWorkoutSection" ADD FOREIGN KEY ("B") REFERENCES "LoggedWorkoutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToGymProfile" ADD FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToGymProfile" ADD FOREIGN KEY ("B") REFERENCES "GymProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_moveToRequiredEquipments" ADD FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_moveToRequiredEquipments" ADD FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_moveToSelectableEquipments" ADD FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_moveToSelectableEquipments" ADD FOREIGN KEY ("B") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggedWorkoutSectionToMoveType" ADD FOREIGN KEY ("A") REFERENCES "LoggedWorkoutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggedWorkoutSectionToMoveType" ADD FOREIGN KEY ("B") REFERENCES "MoveType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggedWorkoutToWorkoutGoal" ADD FOREIGN KEY ("A") REFERENCES "LoggedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggedWorkoutToWorkoutGoal" ADD FOREIGN KEY ("B") REFERENCES "WorkoutGoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutGoal" ADD FOREIGN KEY ("A") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutGoal" ADD FOREIGN KEY ("B") REFERENCES "WorkoutGoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToWorkout" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToWorkout" ADD FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToWorkoutPlan" ADD FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToWorkoutPlan" ADD FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member" ADD FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBenchmarkToUserBenchmarkTag" ADD FOREIGN KEY ("A") REFERENCES "UserBenchmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBenchmarkToUserBenchmarkTag" ADD FOREIGN KEY ("B") REFERENCES "UserBenchmarkTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToWorkout" ADD FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToWorkout" ADD FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToWorkoutPlan" ADD FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToWorkoutPlan" ADD FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutTag" ADD FOREIGN KEY ("A") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutToWorkoutTag" ADD FOREIGN KEY ("B") REFERENCES "WorkoutTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutPlanToWorkoutTag" ADD FOREIGN KEY ("A") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutPlanToWorkoutTag" ADD FOREIGN KEY ("B") REFERENCES "WorkoutTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgressJournalGoalToProgressJournalGoalTag" ADD FOREIGN KEY ("A") REFERENCES "ProgressJournalGoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgressJournalGoalToProgressJournalGoalTag" ADD FOREIGN KEY ("B") REFERENCES "ProgressJournalGoalTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

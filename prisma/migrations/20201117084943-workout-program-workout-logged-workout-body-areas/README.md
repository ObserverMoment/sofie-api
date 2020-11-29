# Migration `20201117084943-workout-program-workout-logged-workout-body-areas`

This migration has been generated by ObserverMoment at 11/17/2020, 8:49:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "LoggedWorkout" DROP CONSTRAINT "LoggedWorkout_workoutProgramEnrolmentId_fkey"

ALTER TABLE "LoggedWorkout" DROP COLUMN "workoutProgramEnrolmentId"

ALTER TABLE "WorkoutProgramWorkout" ADD COLUMN     "loggedWorkoutId" TEXT

CREATE TABLE "BodyArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "altNames" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "BodyAreaMoveScore" (
    "moveId" TEXT NOT NULL,
    "bodyAreaId" TEXT NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("moveId","bodyAreaId")
)

CREATE UNIQUE INDEX "BodyArea.name_unique" ON "BodyArea"("name")

CREATE UNIQUE INDEX "WorkoutProgramWorkout_loggedWorkoutId_unique" ON "WorkoutProgramWorkout"("loggedWorkoutId")

ALTER TABLE "BodyAreaMoveScore" ADD FOREIGN KEY("moveId")REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "BodyAreaMoveScore" ADD FOREIGN KEY("bodyAreaId")REFERENCES "BodyArea"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "WorkoutProgramWorkout" ADD FOREIGN KEY("loggedWorkoutId")REFERENCES "LoggedWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201113121438-liked-workout-program-2..20201117084943-workout-program-workout-logged-workout-body-areas
--- datamodel.dml
+++ datamodel.dml
@@ -6,11 +6,28 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
+model BodyArea {
+  id                 String              @id @default(uuid())
+  name               String              @unique
+  altNames           String?
+  bodyAreaMoveScores BodyAreaMoveScore[]
+}
+
+model BodyAreaMoveScore {
+  move       Move     @relation(fields: [moveId], references: [id])
+  moveId     String
+  bodyArea   BodyArea @relation(fields: [bodyAreaId], references: [id])
+  bodyAreaId String
+  score      Float
+
+  @@id([moveId, bodyAreaId])
+}
+
 model Equipment {
   id                 String        @id @default(uuid())
   name               String        @unique
   altNames           String?
@@ -59,35 +76,32 @@
 }
 // Data from a completed workout. Also inlcudes relation to the 'original' workout
 model LoggedWorkout {
-  id                        String                   @id @default(uuid())
-  name                      String
-  summary                   String?
-  description               String?
-  createdAt                 DateTime                 @default(now())
-  completedOn               DateTime
-  completedBy               User                     @relation(fields: [completedById], references: [id])
-  completedById             String
-  notes                     String?
-  videoUrl                  String?
-  videoThumbUrl             String?
-  imageUrl                  String?
-  duration                  Int?
-  workoutType               WorkoutType              @relation(fields: [workoutTypeId], references: [id])
-  workoutTypeId             String
+  id                    String                 @id @default(uuid())
+  name                  String
+  summary               String?
+  description           String?
+  createdAt             DateTime               @default(now())
+  completedOn           DateTime
+  completedBy           User                   @relation(fields: [completedById], references: [id])
+  completedById         String
+  notes                 String?
+  videoUrl              String?
+  videoThumbUrl         String?
+  imageUrl              String?
+  duration              Int?
+  workoutType           WorkoutType            @relation(fields: [workoutTypeId], references: [id])
+  workoutTypeId         String
   /// @onDelete(CASCADE)
-  workoutSections           WorkoutSection[]
-  originalWorkout           Workout?                 @relation(fields: [originalWorkoutId], references: [id])
-  originalWorkoutId         String?
-  scheduledWorkout          ScheduledWorkout?
-  scheduledWorkoutId        String?
-  gymProfile                GymProfile?              @relation(fields: [gymProfileId], references: [id])
-  gymProfileId              String?
-  // Logged workouts against a particular user and program in which they are enrolled.
-  // Enables tracking of completeness of the program and also history / score generation.
-  workoutProgramEnrolment   WorkoutProgramEnrolment? @relation(fields: [workoutProgramEnrolmentId], references: [id])
-  workoutProgramEnrolmentId String?
+  workoutSections       WorkoutSection[]
+  originalWorkout       Workout?               @relation(fields: [originalWorkoutId], references: [id])
+  originalWorkoutId     String?
+  scheduledWorkout      ScheduledWorkout?
+  scheduledWorkoutId    String?
+  workoutProgramWorkout WorkoutProgramWorkout?
+  gymProfile            GymProfile?            @relation(fields: [gymProfileId], references: [id])
+  gymProfileId          String?
 }
 model Move {
   id                      String               @id @default(uuid())
@@ -107,8 +121,9 @@
   selectableEquipments    Equipment[]          @relation("moveToSelectableEquipments", references: [id])
   requiredForMoveProfiles MoveProfile[]        @relation("requiredMoves", references: [id])
   excludedForMoveProfiles MoveProfile[]        @relation("excludedMoves", references: [id])
   workoutMoves            WorkoutMove[]
+  bodyAreaMoveScores      BodyAreaMoveScore[]
 }
 model MoveProfile {
   id            String  @id @default(uuid())
@@ -255,16 +270,15 @@
   likes           LikedWorkoutProgram[]
 }
 model WorkoutProgramEnrolment {
-  id               String          @id @default(uuid())
-  createdAt        DateTime        @default(now())
-  startDate        DateTime?       @default(now())
-  workoutProgram   WorkoutProgram  @relation(fields: [workoutProgramId], references: [id])
+  id               String         @id @default(uuid())
+  createdAt        DateTime       @default(now())
+  startDate        DateTime?      @default(now())
+  workoutProgram   WorkoutProgram @relation(fields: [workoutProgramId], references: [id])
   workoutProgramId String
-  user             User            @relation(fields: [userId], references: [id])
+  user             User           @relation(fields: [userId], references: [id])
   userId           String
-  loggedWorkouts   LoggedWorkout[]
 }
 model WorkoutProgramReview {
   id               String         @id @default(uuid())
@@ -287,8 +301,10 @@
   workoutProgram   WorkoutProgram @relation(fields: [workoutProgramId], references: [id])
   workoutProgramId String
   workout          Workout        @relation(fields: [workoutId], references: [id])
   workoutId        String
+  loggedWorkout    LoggedWorkout? @relation(fields: [loggedWorkoutId], references: [id])
+  loggedWorkoutId  String?
 }
 // Need to implement some more solid polymorphism here if we want to allow a workoutSection
 // to be on a workout or a loggedWorkout
```


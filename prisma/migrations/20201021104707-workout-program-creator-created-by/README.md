# Migration `20201021104707-workout-program-creator-created-by`

This migration has been generated by ObserverMoment at 10/21/2020, 11:47:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."WorkoutProgram" DROP CONSTRAINT "WorkoutProgram_creatorId_fkey"

ALTER TABLE "public"."WorkoutProgram" DROP COLUMN "creatorId",
ADD COLUMN "createdById" text   NOT NULL 

ALTER TABLE "public"."WorkoutProgram" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020203106-workout-program-workout-notes..20201021104707-workout-program-creator-created-by
--- datamodel.dml
+++ datamodel.dml
@@ -6,9 +6,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Equipment {
   id                 String        @id @default(uuid())
@@ -219,10 +219,10 @@
   preciseSchedule Boolean?                  @default(false)
   frequencyPeriod FrequencyPeriod?          @default(WEEK)
   frequencyAmount Int?                      @default(3)
   scope           AccessScopeType           @default(PRIVATE)
-  creator         User                      @relation(fields: [creatorId], references: [id])
-  creatorId       String
+  createdBy       User                      @relation(fields: [createdById], references: [id])
+  createdById     String
   enrolments      WorkoutProgramEnrolment[]
   workoutGoals    WorkoutGoal[]
   programWorkouts WorkoutProgramWorkout[]
   programReviews  WorkoutProgramReview[]
```


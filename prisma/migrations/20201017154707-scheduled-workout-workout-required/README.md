# Migration `20201017154707-scheduled-workout-workout-required`

This migration has been generated by ObserverMoment at 10/17/2020, 4:47:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."ScheduledWorkout" ALTER COLUMN "workoutId" SET NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201014155535-gym-profile-bodyweight-only..20201017154707-scheduled-workout-workout-required
--- datamodel.dml
+++ datamodel.dml
@@ -6,9 +6,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 // model ScoreSubmission {
 //   id                     String                @default(uuid()) @id
@@ -196,10 +196,10 @@
   user            User           @relation(fields: [userId], references: [id])
   userId          String
   notes           String?
   scheduledAt     DateTime       @default(now())
-  workout         Workout?       @relation(fields: [workoutId], references: [id])
-  workoutId       String?
+  workout         Workout        @relation(fields: [workoutId], references: [id])
+  workoutId       String
   loggedWorkout   LoggedWorkout? @relation(fields: [loggedWorkoutId], references: [id])
   loggedWorkoutId String?
   gymProfile      GymProfile?    @relation(fields: [gymProfileId], references: [id])
   gymProfileId    String?
```


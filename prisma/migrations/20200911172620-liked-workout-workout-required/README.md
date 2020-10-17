# Migration `20200911172620-liked-workout-workout-required`

This migration has been generated by ObserverMoment at 9/11/2020, 6:26:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."LikedWorkout" ALTER COLUMN "workoutId" SET NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200911163746-liked-workout-2..20200911172620-liked-workout-workout-required
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
@@ -205,10 +205,10 @@
   createdAt DateTime @default(now())
   user      User     @relation(fields: [userId], references: [id])
   userId    String
   notes     String?
-  workout   Workout? @relation(fields: [workoutId], references: [id])
-  workoutId String?
+  workout   Workout  @relation(fields: [workoutId], references: [id])
+  workoutId String
   // likedworkoutTags LikedWorkoutTag[]
 }
 // Need to implement some more solid polymorphism here if we want to allow a workoutSection
```


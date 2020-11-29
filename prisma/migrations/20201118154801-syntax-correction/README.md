# Migration `20201118154801-syntax-correction`

This migration has been generated by ObserverMoment at 11/18/2020, 3:48:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201118104545-standardise-naming..20201118154801-syntax-correction
--- datamodel.dml
+++ datamodel.dml
@@ -6,9 +6,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model BodyArea {
   id                 String              @id @default(uuid())
@@ -99,9 +99,10 @@
   scheduledWorkout          ScheduledWorkout?
   scheduledWorkoutId        String?
   gymProfile                GymProfile?              @relation(fields: [gymProfileId], references: [id])
   gymProfileId              String?
-  WorkoutProgramEnrolment   WorkoutProgramEnrolment? @relation(fields: [workoutProgramEnrolmentId], references: [id])
+  // Need to connect to both the enrolment and the programWorkout to ensure ease of lookup.
+  workoutProgramEnrolment   WorkoutProgramEnrolment? @relation(fields: [workoutProgramEnrolmentId], references: [id])
   workoutProgramEnrolmentId String?
   workoutProgramWorkout     WorkoutProgramWorkout?   @relation(fields: [workoutProgramWorkoutId], references: [id])
   workoutProgramWorkoutId   String?
 }
```


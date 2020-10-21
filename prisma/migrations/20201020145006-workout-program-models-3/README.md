# Migration `20201020145006-workout-program-models-3`

This migration has been generated by ObserverMoment at 10/20/2020, 3:50:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020144522-workout-program-models-2..20201020145006-workout-program-models-3
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
@@ -222,10 +222,10 @@
   creator         User                      @relation(fields: [creatorId], references: [id])
   creatorId       String
   enrolments      WorkoutProgramEnrolment[]
   goals           WorkoutGoal[]
-  workouts        WorkoutProgramWorkout[]
-  reviews         WorkoutProgramReview[]
+  programWorkouts WorkoutProgramWorkout[]
+  programReviews  WorkoutProgramReview[]
 }
 model WorkoutProgramEnrolment {
   id               String          @id @default(uuid())
```


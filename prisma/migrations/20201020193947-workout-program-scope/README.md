# Migration `20201020193947-workout-program-scope`

This migration has been generated by ObserverMoment at 10/20/2020, 8:39:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."WorkoutProgram" ADD COLUMN "scope" "AccessScopeType"  NOT NULL DEFAULT E'PRIVATE'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020145006-workout-program-models-3..20201020193947-workout-program-scope
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
@@ -218,8 +218,9 @@
   videoThumbUrl   String?
   preciseSchedule Boolean?                  @default(false)
   frequencyPeriod FrequencyPeriod?          @default(WEEK)
   frequencyAmount Int?                      @default(3)
+  scope           AccessScopeType           @default(PRIVATE)
   creator         User                      @relation(fields: [creatorId], references: [id])
   creatorId       String
   enrolments      WorkoutProgramEnrolment[]
   goals           WorkoutGoal[]
```


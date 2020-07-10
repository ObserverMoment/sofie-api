# Migration `20200709170757-workout-move-reps-to-float`

This migration has been generated by ObserverMoment at 7/9/2020, 5:07:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."WorkoutMove" DROP COLUMN "reps",
ADD COLUMN "reps" Decimal(65,30)   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200702112753-revert--workout-demo-video-thumb-url..20200709170757-workout-move-reps-to-float
--- datamodel.dml
+++ datamodel.dml
@@ -6,9 +6,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Benchmark {
   id               String          @default(uuid()) @id
@@ -134,9 +134,9 @@
   id                  String             @default(uuid()) @id
   createdAt           DateTime           @default(now())
   sortPosition        Int
   repType             WorkoutMoveRepType @default(REPS)
-  reps                Int?
+  reps                Float?
   loadAmountKgs       Float?
   distanceUnit        DistanceUnit       @default(METRES)
   description         String?
   move                Move               @relation(fields: [moveId], references: [id])
```


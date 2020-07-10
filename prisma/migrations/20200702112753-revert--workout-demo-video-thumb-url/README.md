# Migration `20200702112753-revert--workout-demo-video-thumb-url`

This migration has been generated by ObserverMoment at 7/2/2020, 11:27:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Workout" DROP COLUMN "demoVideoThumbUrl";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200702112017-user-follows-cleanup-workout-demo-video-thumb-url..20200702112753-revert--workout-demo-video-thumb-url
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
@@ -170,9 +170,8 @@
   name              String
   summary           String?
   description       String?
   demoVideoUrl      String?
-  demoVideoThumbUrl String?
   imageUrl          String?
   timecap           Int?
   difficultyLevel   DifficultyLevel    @default(ONE)
   scope             AccessScopeType    @default(PRIVATE)
```


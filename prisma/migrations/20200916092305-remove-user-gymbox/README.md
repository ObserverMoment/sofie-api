# Migration `20200916092305-remove-user-gymbox`

This migration has been generated by ObserverMoment at 9/16/2020, 10:23:05 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" DROP COLUMN "gymBox"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200916091440-scheduled-workout-and-workout-location..20200916092305-remove-user-gymbox
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
@@ -325,9 +325,8 @@
   birthdate         DateTime?
   gender            Gender?
   height            Float?
   weight            Float?
-  gymBox            String?
   townCity          String?
   countryCode       String?
   unitSystem        UnitSystem         @default(METRIC)
   // scoreSubmissions                   ScoreSubmission[]
```


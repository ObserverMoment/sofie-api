# Migration `20201014141437-equipment-load-adjustable-correction`

This migration has been generated by ObserverMoment at 10/14/2020, 3:14:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Equipment" DROP COLUMN "loadAjustable",
ADD COLUMN "loadAdjustable" boolean   NOT NULL DEFAULT true
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201014140202-equipment-load-adjustable..20201014141437-equipment-load-adjustable-correction
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
@@ -105,9 +105,9 @@
 model Equipment {
   id                 String        @id @default(uuid())
   name               String        @unique
   imageUrl           String?
-  loadAjustable      Boolean       @default(true)
+  loadAdjustable     Boolean       @default(true)
   requiredForMoves   Move[]        @relation("moveToRequiredEquipments", references: [id])
   selectableForMoves Move[]        @relation("moveToSelectableEquipments", references: [id])
   WorkoutMove        WorkoutMove[]
   gymProfiles        GymProfile[]
```


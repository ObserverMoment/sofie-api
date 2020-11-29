# Migration `20201127102800-user-intro-video-url`

This migration has been generated by ObserverMoment at 11/27/2020, 10:28:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "introVideoUrl" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201126145218-user-social-links-2..20201127102800-user-intro-video-url
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
@@ -166,8 +166,9 @@
   createdAt                DateTime                  @default(now())
   hasOnboarded             Boolean                   @default(false)
   userProfileScope         UserProfileScope          @default(PRIVATE)
   avatarUrl                String?
+  introVideoUrl            String?
   displayName              String?                   @unique
   firstname                String?
   lastname                 String?
   themePreference          ThemePreference           @default(DARK)
```


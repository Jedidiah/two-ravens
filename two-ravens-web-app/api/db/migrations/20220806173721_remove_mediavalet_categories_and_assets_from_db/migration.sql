/*
  Warnings:

  - You are about to drop the `MediavaletAsset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MediavaletCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mediavaletRootCategoryId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN "mediavaletRootCategoryId" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MediavaletAsset";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MediavaletCategory";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "cameraTrapBatchId" TEXT NOT NULL,
    "assetId" TEXT,
    CONSTRAINT "Photo_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_cameraTrapBatchId_fkey" FOREIGN KEY ("cameraTrapBatchId") REFERENCES "CameraTrapBatch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("assetId", "cameraTrapBatchId", "cameraTrapId", "date", "id") SELECT "assetId", "cameraTrapBatchId", "cameraTrapId", "date", "id" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE UNIQUE INDEX "Photo_assetId_key" ON "Photo"("assetId");
CREATE TABLE "new_CameraTrap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "mediavaletCategoryId" TEXT,
    "mediavaletDownloadsFolderId" TEXT
);
INSERT INTO "new_CameraTrap" ("deviceId", "id", "mediavaletCategoryId", "mediavaletDownloadsFolderId") SELECT "deviceId", "id", "mediavaletCategoryId", "mediavaletDownloadsFolderId" FROM "CameraTrap";
DROP TABLE "CameraTrap";
ALTER TABLE "new_CameraTrap" RENAME TO "CameraTrap";
CREATE UNIQUE INDEX "CameraTrap_deviceId_key" ON "CameraTrap"("deviceId");
CREATE UNIQUE INDEX "CameraTrap_mediavaletCategoryId_key" ON "CameraTrap"("mediavaletCategoryId");
CREATE UNIQUE INDEX "CameraTrap_mediavaletDownloadsFolderId_key" ON "CameraTrap"("mediavaletDownloadsFolderId");
CREATE TABLE "new_CameraTrapBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "mediavaletCategoryId" TEXT,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'approval',
    CONSTRAINT "CameraTrapBatch_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CameraTrapBatch" ("cameraTrapId", "dateEnd", "dateStart", "id", "location", "mediavaletCategoryId", "status") SELECT "cameraTrapId", "dateEnd", "dateStart", "id", "location", "mediavaletCategoryId", "status" FROM "CameraTrapBatch";
DROP TABLE "CameraTrapBatch";
ALTER TABLE "new_CameraTrapBatch" RENAME TO "CameraTrapBatch";
CREATE UNIQUE INDEX "CameraTrapBatch_mediavaletCategoryId_key" ON "CameraTrapBatch"("mediavaletCategoryId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Account_mediavaletRootCategoryId_key" ON "Account"("mediavaletRootCategoryId");

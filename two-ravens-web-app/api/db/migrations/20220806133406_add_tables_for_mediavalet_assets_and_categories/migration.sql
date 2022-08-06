/*
  Warnings:

  - You are about to drop the column `url` on the `Photo` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "MediavaletAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "thumb" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "categories" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',
    "altText" TEXT DEFAULT '',
    "dateCaptured" TEXT
);

-- CreateTable
CREATE TABLE "MediavaletCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentId" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "cameraTrapBatchId" TEXT NOT NULL,
    "assetId" TEXT,
    CONSTRAINT "Photo_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_cameraTrapBatchId_fkey" FOREIGN KEY ("cameraTrapBatchId") REFERENCES "CameraTrapBatch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "MediavaletAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("cameraTrapBatchId", "cameraTrapId", "date", "id") SELECT "cameraTrapBatchId", "cameraTrapId", "date", "id" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE UNIQUE INDEX "Photo_assetId_key" ON "Photo"("assetId");
CREATE TABLE "new_CameraTrapBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "mediavaletCategoryId" TEXT,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'approval',
    CONSTRAINT "CameraTrapBatch_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CameraTrapBatch_mediavaletCategoryId_fkey" FOREIGN KEY ("mediavaletCategoryId") REFERENCES "MediavaletCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CameraTrapBatch" ("cameraTrapId", "dateEnd", "dateStart", "id", "location", "status") SELECT "cameraTrapId", "dateEnd", "dateStart", "id", "location", "status" FROM "CameraTrapBatch";
DROP TABLE "CameraTrapBatch";
ALTER TABLE "new_CameraTrapBatch" RENAME TO "CameraTrapBatch";
CREATE UNIQUE INDEX "CameraTrapBatch_mediavaletCategoryId_key" ON "CameraTrapBatch"("mediavaletCategoryId");
CREATE TABLE "new_CameraTrap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "mediavaletCategoryId" TEXT,
    "mediavaletDownloadsFolderId" TEXT,
    CONSTRAINT "CameraTrap_mediavaletCategoryId_fkey" FOREIGN KEY ("mediavaletCategoryId") REFERENCES "MediavaletCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CameraTrap" ("deviceId", "id") SELECT "deviceId", "id" FROM "CameraTrap";
DROP TABLE "CameraTrap";
ALTER TABLE "new_CameraTrap" RENAME TO "CameraTrap";
CREATE UNIQUE INDEX "CameraTrap_deviceId_key" ON "CameraTrap"("deviceId");
CREATE UNIQUE INDEX "CameraTrap_mediavaletCategoryId_key" ON "CameraTrap"("mediavaletCategoryId");
CREATE UNIQUE INDEX "CameraTrap_mediavaletDownloadsFolderId_key" ON "CameraTrap"("mediavaletDownloadsFolderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

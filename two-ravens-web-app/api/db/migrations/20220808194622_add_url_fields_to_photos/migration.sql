/*
  Warnings:

  - Added the required column `large` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medium` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `small` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumb` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CameraTrapEvent" ADD COLUMN "cameraLocationX" DECIMAL;
ALTER TABLE "CameraTrapEvent" ADD COLUMN "cameraLocationY" DECIMAL;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "cameraTrapBatchId" TEXT,
    "assetId" TEXT,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT DEFAULT '',
    "altText" TEXT DEFAULT '',
    "thumb" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    CONSTRAINT "Photo_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_cameraTrapBatchId_fkey" FOREIGN KEY ("cameraTrapBatchId") REFERENCES "CameraTrapBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("assetId", "cameraTrapBatchId", "cameraTrapId", "date", "id") SELECT "assetId", "cameraTrapBatchId", "cameraTrapId", "date", "id" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE UNIQUE INDEX "Photo_assetId_key" ON "Photo"("assetId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CameraTrap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL DEFAULT 'gardepro',
    "project" TEXT,
    "mediavaletCategoryId" TEXT,
    "mediavaletDownloadsFolderId" TEXT
);
INSERT INTO "new_CameraTrap" ("deviceId", "id", "mediavaletCategoryId", "mediavaletDownloadsFolderId") SELECT "deviceId", "id", "mediavaletCategoryId", "mediavaletDownloadsFolderId" FROM "CameraTrap";
DROP TABLE "CameraTrap";
ALTER TABLE "new_CameraTrap" RENAME TO "CameraTrap";
CREATE UNIQUE INDEX "CameraTrap_deviceId_key" ON "CameraTrap"("deviceId");
CREATE UNIQUE INDEX "CameraTrap_mediavaletCategoryId_key" ON "CameraTrap"("mediavaletCategoryId");
CREATE UNIQUE INDEX "CameraTrap_mediavaletDownloadsFolderId_key" ON "CameraTrap"("mediavaletDownloadsFolderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

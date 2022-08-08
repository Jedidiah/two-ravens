/*
  Warnings:

  - Added the required column `deviceId` to the `CameraTrapEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CameraTrapEvent" (
    "areaDeployed" TEXT,
    "cameraAttachmentPosition" TEXT,
    "cameraHeight" DECIMAL,
    "cameraLocation" TEXT NOT NULL,
    "cameraMake" TEXT,
    "cameraProcedure" TEXT NOT NULL,
    "cameraSitePhoto" TEXT,
    "cameraTarget" TEXT,
    "cameraTrapId" TEXT,
    "cameraWorking" BOOLEAN NOT NULL,
    "comments" TEXT,
    "date" DATETIME NOT NULL,
    "datetimeUpdated" DATETIME NOT NULL,
    "deviceId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT DEFAULT '-',
    "staffName" TEXT DEFAULT '-',
    "userEmail" TEXT,
    "userFullname" TEXT,
    "userUsername" TEXT,
    CONSTRAINT "CameraTrapEvent_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CameraTrapEvent" ("areaDeployed", "cameraAttachmentPosition", "cameraHeight", "cameraLocation", "cameraMake", "cameraProcedure", "cameraSitePhoto", "cameraTarget", "cameraTrapId", "cameraWorking", "comments", "date", "datetimeUpdated", "id", "projectName", "staffName", "userEmail", "userFullname", "userUsername") SELECT "areaDeployed", "cameraAttachmentPosition", "cameraHeight", "cameraLocation", "cameraMake", "cameraProcedure", "cameraSitePhoto", "cameraTarget", "cameraTrapId", "cameraWorking", "comments", "date", "datetimeUpdated", "id", "projectName", "staffName", "userEmail", "userFullname", "userUsername" FROM "CameraTrapEvent";
DROP TABLE "CameraTrapEvent";
ALTER TABLE "new_CameraTrapEvent" RENAME TO "CameraTrapEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

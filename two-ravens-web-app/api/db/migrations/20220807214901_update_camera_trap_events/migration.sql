/*
  Warnings:

  - You are about to drop the column `datetime_updated` on the `CameraTrapEvent` table. All the data in the column will be lost.
  - Added the required column `datetimeUpdated` to the `CameraTrapEvent` table without a default value. This is not possible if the table is not empty.

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
    "cameraTrapId" TEXT NOT NULL,
    "cameraWorking" BOOLEAN NOT NULL,
    "comments" TEXT,
    "date" DATETIME NOT NULL,
    "datetimeUpdated" DATETIME NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT DEFAULT '-',
    "staffName" TEXT DEFAULT '-',
    "userEmail" TEXT,
    "userFullname" TEXT,
    "userUsername" TEXT,
    CONSTRAINT "CameraTrapEvent_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CameraTrapEvent" ("areaDeployed", "cameraAttachmentPosition", "cameraHeight", "cameraLocation", "cameraMake", "cameraProcedure", "cameraSitePhoto", "cameraTarget", "cameraTrapId", "cameraWorking", "comments", "date", "id", "projectName", "staffName") SELECT "areaDeployed", "cameraAttachmentPosition", "cameraHeight", "cameraLocation", "cameraMake", "cameraProcedure", "cameraSitePhoto", "cameraTarget", "cameraTrapId", "cameraWorking", "comments", "date", "id", "projectName", "staffName" FROM "CameraTrapEvent";
DROP TABLE "CameraTrapEvent";
ALTER TABLE "new_CameraTrapEvent" RENAME TO "CameraTrapEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

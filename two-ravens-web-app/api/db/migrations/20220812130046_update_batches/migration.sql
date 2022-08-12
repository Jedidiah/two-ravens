/*
  Warnings:

  - You are about to drop the column `mediavaletCategoryId` on the `CameraTrapBatch` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CameraTrapBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'approval',
    "" TEXT,
    "eventEndId" TEXT,
    CONSTRAINT "CameraTrapBatch_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CameraTrapBatch" ("cameraTrapId", "dateEnd", "dateStart", "id", "location", "status") SELECT "cameraTrapId", "dateEnd", "dateStart", "id", "location", "status" FROM "CameraTrapBatch";
DROP TABLE "CameraTrapBatch";
ALTER TABLE "new_CameraTrapBatch" RENAME TO "CameraTrapBatch";
CREATE UNIQUE INDEX "CameraTrapBatch__key" ON "CameraTrapBatch"("");
CREATE UNIQUE INDEX "CameraTrapBatch_eventEndId_key" ON "CameraTrapBatch"("eventEndId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - A unique constraint covering the columns `[mediavaletProcessedFolderId]` on the table `CameraTrap` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CameraTrap" ADD COLUMN "mediavaletProcessedFolderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CameraTrap_mediavaletProcessedFolderId_key" ON "CameraTrap"("mediavaletProcessedFolderId");

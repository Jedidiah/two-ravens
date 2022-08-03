-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "settings" TEXT NOT NULL DEFAULT '{}',
    "mediavaletRefreshToken" TEXT,
    "mediavaletToken" TEXT,
    "mediavaletTokenExpiry" TEXT,
    "docusignAuthToken" TEXT,
    "docusignAuthTokenExpiry" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,
    "accountId" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CameraTrap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CameraTrapEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "projectName" TEXT DEFAULT '-',
    "staffName" TEXT DEFAULT '-',
    "datetime_updated" DATETIME NOT NULL,
    "cameraLocation" TEXT NOT NULL,
    "cameraProcedure" TEXT NOT NULL,
    "cameraAttachmentPosition" TEXT,
    "cameraHeight" DECIMAL,
    "areaDeployed" TEXT,
    "cameraMake" TEXT,
    "cameraTarget" TEXT,
    "cameraSitePhoto" TEXT,
    "cameraWorking" BOOLEAN NOT NULL,
    "comments" TEXT,
    CONSTRAINT "CameraTrapEvent_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CameraTrapBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'approval',
    CONSTRAINT "CameraTrapBatch_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CameraTrapBatchApproval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "approvedImages" TEXT NOT NULL,
    "rejectedImages" TEXT NOT NULL,
    CONSTRAINT "CameraTrapBatchApproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CameraTrapBatchApproval_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "CameraTrapBatch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "cameraTrapId" TEXT NOT NULL,
    "cameraTrapBatchId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "Photo_cameraTrapId_fkey" FOREIGN KEY ("cameraTrapId") REFERENCES "CameraTrap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_cameraTrapBatchId_fkey" FOREIGN KEY ("cameraTrapBatchId") REFERENCES "CameraTrapBatch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CameraTrap_deviceId_key" ON "CameraTrap"("deviceId");

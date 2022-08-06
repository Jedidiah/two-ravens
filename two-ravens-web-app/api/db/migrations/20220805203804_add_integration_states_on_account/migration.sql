-- AlterTable
ALTER TABLE "Account" ADD COLUMN "docusignIntegrationStatus" TEXT DEFAULT 'unconnected';
ALTER TABLE "Account" ADD COLUMN "esriIntegrationStatus" TEXT DEFAULT 'unconnected';
ALTER TABLE "Account" ADD COLUMN "mediavaletIntegrationStatus" TEXT DEFAULT 'unconnected';

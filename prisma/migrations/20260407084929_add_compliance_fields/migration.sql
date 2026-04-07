-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "confirmedHash" TEXT;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "confirmedHash" TEXT,
ADD COLUMN     "constructionName" TEXT,
ADD COLUMN     "constructionPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "constructionPeriodStart" TIMESTAMP(3),
ADD COLUMN     "constructionSite" TEXT,
ADD COLUMN     "defectWarranty" TEXT,
ADD COLUMN     "paymentTerms" TEXT;

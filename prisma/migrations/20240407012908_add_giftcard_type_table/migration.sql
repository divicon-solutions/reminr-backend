/*
  Warnings:

  - You are about to drop the column `giftCardType` on the `Redeem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Redeem" DROP COLUMN "giftCardType",
ADD COLUMN     "expiryAt" TIMESTAMP(3),
ADD COLUMN     "giftCardTypeId" TEXT;

-- DropEnum
DROP TYPE "GiftCardType";

-- CreateTable
CREATE TABLE "GiftCardType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GiftCardType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Redeem" ADD CONSTRAINT "Redeem_giftCardTypeId_fkey" FOREIGN KEY ("giftCardTypeId") REFERENCES "GiftCardType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

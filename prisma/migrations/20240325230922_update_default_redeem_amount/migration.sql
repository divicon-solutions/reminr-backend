/*
  Warnings:

  - Made the column `redeemedAmount` on table `Incentive` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Incentive" ALTER COLUMN "redeemedAmount" SET NOT NULL,
ALTER COLUMN "redeemedAmount" SET DEFAULT 0;

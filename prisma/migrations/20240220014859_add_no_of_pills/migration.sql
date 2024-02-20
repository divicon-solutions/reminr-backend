/*
  Warnings:

  - Added the required column `noOfPills` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "noOfPills" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "dosage" DROP NOT NULL;

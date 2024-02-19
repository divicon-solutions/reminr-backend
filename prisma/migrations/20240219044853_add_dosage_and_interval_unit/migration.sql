/*
  Warnings:

  - The `intervalUnit` column on the `Medication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `dosage` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IntervalUnit" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "dosage" TEXT NOT NULL,
DROP COLUMN "intervalUnit",
ADD COLUMN     "intervalUnit" "IntervalUnit";

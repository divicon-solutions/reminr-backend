/*
  Warnings:

  - Added the required column `time` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "time" TIME NOT NULL DEFAULT '08:00:00';
ALTER TABLE "Medication" ALTER COLUMN "time" DROP DEFAULT;
